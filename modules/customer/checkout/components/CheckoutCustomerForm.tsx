import { gooeyToast } from "goey-toast";

import { useAuth } from "@/modules/customer/auth/auth-context";
import { GoogleSignInButton } from "@/modules/customer/auth/GoogleSignInButton";
import type {
  CustomerInfo,
  CustomerInfoErrors,
} from "@/modules/customer/checkout/lib/validate-customer";
import { cn } from "@/shared/lib/cn";
import { isFirebaseConfigured } from "@/shared/lib/firebase";

type CheckoutCustomerFormProps = {
  value: CustomerInfo;
  errors: CustomerInfoErrors;
  onChange: (value: CustomerInfo) => void;
};

type FieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

function Field({ label, required, error, inputProps }: FieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-zinc-700">
        {label}
        {required ? (
          <span className="text-[#FA52A8]"> *</span>
        ) : (
          <span className="font-normal text-zinc-400"> (opsional)</span>
        )}
      </span>
      <input
        {...inputProps}
        className={cn(
          "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:ring-2",
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-zinc-300 focus:border-[#FA52A8] focus:ring-[#FA52A8]/20",
        )}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function CheckoutCustomerForm({
  value,
  errors,
  onChange,
}: CheckoutCustomerFormProps) {
  const { user, status, signInWithGoogle } = useAuth();

  // Pilih akun Google lain (popup selalu menampilkan pemilih akun).
  const handleChangeAccount = async () => {
    try {
      await signInWithGoogle();
    } catch (error) {
      gooeyToast.error(
        error instanceof Error ? error.message : "Gagal mengganti akun Google",
      );
    }
  };

  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
      <h2 className="text-sm font-semibold text-zinc-900">Data pemesan</h2>
      <div className="mt-3 flex flex-col gap-3">
        <Field
          label="Nama"
          required
          error={errors.name}
          inputProps={{
            type: "text",
            autoComplete: "name",
            placeholder: "Nama kamu",
            value: value.name,
            onChange: (event) => onChange({ ...value, name: event.target.value }),
          }}
        />
        <Field
          label="No. WhatsApp"
          required
          error={errors.phone}
          inputProps={{
            type: "tel",
            autoComplete: "tel",
            inputMode: "tel",
            placeholder: "081234567890",
            value: value.phone,
            onChange: (event) =>
              onChange({ ...value, phone: event.target.value }),
          }}
        />

        {(isFirebaseConfigured || user) && (
          <div className="flex flex-col gap-1.5">
            <span className="text-xs font-medium text-zinc-700">
              Email
              <span className="font-normal text-zinc-400"> (opsional)</span>
            </span>

            {status === "loading" ? (
              <div className="h-[46px] animate-pulse rounded-lg bg-zinc-100" />
            ) : user ? (
              <div className="flex items-center gap-3 rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2.5">
                {user.photoUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element -- foto profil Google
                  <img
                    src={user.photoUrl}
                    alt=""
                    referrerPolicy="no-referrer"
                    className="h-8 w-8 shrink-0 rounded-full object-cover"
                  />
                ) : (
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#FA52A8]/10 text-sm font-bold text-[#FA52A8]">
                    {user.name.charAt(0).toUpperCase()}
                  </span>
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm text-zinc-900">{user.email}</p>
                  <p className="text-[11px] text-zinc-500">
                    Dari akun Google · pesanan tersimpan di riwayatmu
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => void handleChangeAccount()}
                  className="shrink-0 text-xs font-medium text-[#FA52A8]"
                >
                  Ganti
                </button>
              </div>
            ) : (
              <>
                <GoogleSignInButton label="Isi dengan Google" />
                <p className="text-xs text-zinc-500">
                  Nama dan email terisi otomatis dari akun Google, dan pesananmu
                  tersimpan di riwayat.
                </p>
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
