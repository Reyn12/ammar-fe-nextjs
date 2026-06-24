import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";
import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";

export function findMenuItemById(
  sections: MenuSection[],
  itemId: string,
): MenuItem | undefined {
  for (const section of sections) {
    const item = section.items.find((menuItem) => menuItem.id === itemId);
    if (item) return item;
  }

  return undefined;
}
