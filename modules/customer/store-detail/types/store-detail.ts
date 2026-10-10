import type { OrderType } from "@/modules/customer/homepage/types/order";

export type StoreOpeningHour = {
  day: string;
  /** Format "HH:mm-HH:mm" */
  hours: string;
};

export type StoreDetail = {
  name: string;
  description: string;
  address: string;
  phone: string;
  openingHours: StoreOpeningHour[];
  orderTypes: OrderType[];
};
