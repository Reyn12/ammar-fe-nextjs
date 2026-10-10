"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import {
  onAuthStateChanged,
  signInWithPopup,
  signOut as firebaseSignOut,
} from "firebase/auth";

import { setAuthTokenGetter } from "@/shared/lib/api-client";
import {
  createGoogleProvider,
  getFirebaseAuth,
  isFirebaseConfigured,
} from "@/shared/lib/firebase";

export type AuthUser = {
  name: string;
  email: string;
  photoUrl: string | null;
};

type AuthStatus = "loading" | "signedOut" | "signedIn";

type AuthContextValue = {
  user: AuthUser | null;
  status: AuthStatus;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | null>(null);

/** Login customer dengan Google lewat Firebase Authentication. */
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [status, setStatus] = useState<AuthStatus>(
    isFirebaseConfigured ? "loading" : "signedOut",
  );

  useEffect(() => {
    const auth = getFirebaseAuth();
    if (!auth) return;

    setAuthTokenGetter(async () => (await auth.currentUser?.getIdToken()) ?? null);

    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser?.email) {
        setUser({
          name: firebaseUser.displayName ?? firebaseUser.email,
          email: firebaseUser.email,
          photoUrl: firebaseUser.photoURL,
        });
        setStatus("signedIn");
      } else {
        setUser(null);
        setStatus("signedOut");
      }
    });

    return () => {
      unsubscribe();
      setAuthTokenGetter(null);
    };
  }, []);

  const signInWithGoogle = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (!auth) throw new Error("Login Google belum dikonfigurasi.");

    try {
      await signInWithPopup(auth, createGoogleProvider());
    } catch (error) {
      const code = (error as { code?: string }).code;
      // User menutup popup: bukan error yang perlu ditampilkan.
      if (
        code === "auth/popup-closed-by-user" ||
        code === "auth/cancelled-popup-request"
      ) {
        return;
      }
      throw new Error("Gagal masuk dengan Google. Coba lagi.");
    }
  }, []);

  const signOut = useCallback(async () => {
    const auth = getFirebaseAuth();
    if (auth) await firebaseSignOut(auth);
  }, []);

  const value = useMemo(
    () => ({ user, status, signInWithGoogle, signOut }),
    [user, status, signInWithGoogle, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth harus dipakai di dalam AuthProvider");
  }
  return context;
}
