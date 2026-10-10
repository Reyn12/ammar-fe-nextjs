export class ApiError extends Error {
  constructor(
    message: string,
    readonly status: number,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export const BRANCH_ID = process.env.NEXT_PUBLIC_BRANCH_ID ?? "1";

type TokenGetter = () => Promise<string | null>;

let tokenGetter: TokenGetter | null = null;

/** Didaftarkan AuthProvider supaya setiap request membawa token login kalau ada. */
export function setAuthTokenGetter(getter: TokenGetter | null) {
  tokenGetter = getter;
}

async function authHeaders(): Promise<Record<string, string>> {
  try {
    const token = await tokenGetter?.();
    return token ? { Authorization: `Bearer ${token}` } : {};
  } catch {
    return {};
  }
}

type ErrorBody = {
  message?: string;
  errors?: Record<string, string[]>;
};

/** Ambil pesan yang paling berguna dari error Laravel (422 berisi daftar field). */
async function toApiError(response: Response) {
  let message = `Request gagal (${response.status})`;

  try {
    const body = (await response.json()) as ErrorBody;
    const firstFieldError = body.errors && Object.values(body.errors)[0]?.[0];
    message = firstFieldError ?? body.message ?? message;
  } catch {
    // body bukan JSON, pakai pesan default
  }

  return new ApiError(message, response.status);
}

/** GET ke /api/v1/... (diteruskan Next.js ke Laravel lewat rewrite). */
export async function apiGet<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    headers: { Accept: "application/json", ...(await authHeaders()) },
    signal,
  });

  if (!response.ok) throw await toApiError(response);

  return (await response.json()) as T;
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const response = await fetch(`/api/v1${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      ...(await authHeaders()),
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) throw await toApiError(response);

  return (await response.json()) as T;
}
