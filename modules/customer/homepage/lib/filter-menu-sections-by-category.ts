import {
  MENU_CATEGORY_SECTION_IDS,
} from "@/modules/customer/homepage/constants/menu-categories";
import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";

export function filterMenuSectionsByCategory(
  sections: MenuSection[],
  categoryId: string,
): MenuSection[] {
  if (categoryId === "semua") {
    return sections;
  }

  const sectionIds = MENU_CATEGORY_SECTION_IDS[categoryId];
  if (!sectionIds) return sections;

  return sections.filter((section) => sectionIds.includes(section.id));
}
