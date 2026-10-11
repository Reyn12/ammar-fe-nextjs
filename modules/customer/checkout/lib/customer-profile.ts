import type { CustomerInfo } from "@/modules/customer/checkout/lib/validate-customer";
import { readStored, writeStored } from "@/shared/lib/safe-storage";

const PROFILE_STORAGE_KEY = "ammar:customer-profile";

/** Yang disimpan hanya nama & nomor WhatsApp; email selalu dari akun Google. */
export type SavedCustomerProfile = Pick<CustomerInfo, "name" | "phone">;

export function loadCustomerProfile(): Partial<SavedCustomerProfile> {
  const saved = readStored<SavedCustomerProfile>(PROFILE_STORAGE_KEY);

  return {
    ...(typeof saved?.name === "string" && saved.name ? { name: saved.name } : {}),
    ...(typeof saved?.phone === "string" && saved.phone ? { phone: saved.phone } : {}),
  };
}

export function saveCustomerProfile(info: CustomerInfo): void {
  writeStored<SavedCustomerProfile>(PROFILE_STORAGE_KEY, {
    name: info.name,
    phone: info.phone,
  });
}
