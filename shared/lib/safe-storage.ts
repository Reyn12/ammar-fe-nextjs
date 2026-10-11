/**
 * Pembungkus localStorage yang aman: tidak melempar error saat storage diblokir
 * (mode privat, kuota penuh) dan membuang data yang sudah kedaluwarsa.
 */

type Stored<T> = { savedAt: number; value: T };

export function readStored<T>(key: string, maxAgeMs?: number): T | null {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return null;

    const parsed = JSON.parse(raw) as Stored<T>;
    if (maxAgeMs !== undefined && Date.now() - parsed.savedAt > maxAgeMs) {
      window.localStorage.removeItem(key);
      return null;
    }

    return parsed.value;
  } catch {
    return null;
  }
}

export function writeStored<T>(key: string, value: T): void {
  try {
    window.localStorage.setItem(
      key,
      JSON.stringify({ savedAt: Date.now(), value } satisfies Stored<T>),
    );
  } catch {
    // storage penuh / diblokir: abaikan, data tetap ada di memori
  }
}

export function removeStored(key: string): void {
  try {
    window.localStorage.removeItem(key);
  } catch {
    // diabaikan
  }
}
