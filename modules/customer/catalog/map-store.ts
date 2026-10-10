import type { ApiBranch } from "@/modules/customer/catalog/api-types";
import type { OrderType } from "@/modules/customer/homepage/types/order";
import type { StoreDetail } from "@/modules/customer/store-detail/types/store-detail";

const DAY_NAMES = ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"];

const ORDER_TYPE_FROM_API: Record<string, OrderType> = {
  dine_in: "dine-in",
  takeaway: "takeaway",
};

export function mapBranch(branch: ApiBranch): StoreDetail {
  const openingHours = DAY_NAMES.map((day, index) => {
    const entry = branch.opening_hours.find(
      (hour) => hour.day_of_week === index + 1,
    );
    const isOpen = entry && !entry.is_closed && entry.open_time && entry.close_time;

    return {
      day,
      hours: isOpen ? `${entry.open_time}-${entry.close_time}` : "Tutup",
    };
  });

  return {
    name: branch.name,
    description: branch.description ?? "",
    address: branch.address,
    phone: branch.phone ?? "-",
    openingHours,
    orderTypes: branch.order_types.flatMap((type) =>
      ORDER_TYPE_FROM_API[type] ? [ORDER_TYPE_FROM_API[type]] : [],
    ),
  };
}
