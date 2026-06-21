import {
  HOME_MENU_ALL_CATEGORY_ID,
  MENU_CATEGORY_SECTION_IDS,
} from "@/modules/customer/homepage/constants/menu-categories";
import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";

export function filterMenuSectionsByCategory(
  sections: MenuSection[],
  categoryId: string,
): MenuSection[] {
  if (categoryId === HOME_MENU_ALL_CATEGORY_ID) {
    return sections;
  }

  const sectionIds = MENU_CATEGORY_SECTION_IDS[categoryId];
  if (!sectionIds) return sections;

  return sections.filter((section) => sectionIds.includes(section.id));
}
