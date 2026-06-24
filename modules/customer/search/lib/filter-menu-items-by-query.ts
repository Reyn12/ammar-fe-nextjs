import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";
import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";

export type SearchMenuResult = MenuItem & {
  sectionTitle: string;
};

export function filterMenuItemsByQuery(
  sections: MenuSection[],
  query: string,
): SearchMenuResult[] {
  const normalizedQuery = query.trim().toLowerCase();
  if (!normalizedQuery) return [];

  return sections.flatMap((section) =>
    section.items
      .filter((item) => item.name.toLowerCase().includes(normalizedQuery))
      .map((item) => ({
        ...item,
        sectionTitle: section.title,
      })),
  );
}

export function getSearchResultSectionLabel(sectionTitle: string) {
  return sectionTitle.replace(/^MENU\s+/i, "");
}
