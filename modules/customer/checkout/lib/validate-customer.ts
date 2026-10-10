export type CustomerInfo = {
  name: string;
  phone: string;
  email: string;
};

export type CustomerInfoErrors = Partial<Record<keyof CustomerInfo, string>>;

export const EMPTY_CUSTOMER_INFO: CustomerInfo = {
  name: "",
  phone: "",
  email: "",
};

export function validateCustomerInfo(info: CustomerInfo): CustomerInfoErrors {
  const errors: CustomerInfoErrors = {};
  const phone = info.phone.replace(/[\s-]/g, "");
  const email = info.email.trim();

  if (info.name.trim().length < 2) errors.name = "Nama wajib diisi";

  if (!phone) errors.phone = "No. telepon wajib diisi";
  else if (!/^(\+62|62|0)8\d{7,12}$/.test(phone))
    errors.phone = "Format nomor tidak valid, contoh 081234567890";

  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    errors.email = "Format email tidak valid";

  return errors;
}
