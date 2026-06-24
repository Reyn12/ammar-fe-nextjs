import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";

const DEFAULT_IMAGE = "/images/img_menu_dummy.png";
const DEFAULT_PRICE = 15000;

function toItemId(sectionId: string, name: string) {
  const slug = name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

  return `${sectionId}-${slug}`;
}

export function createMenuItem(
  sectionId: string,
  name: string,
  price = DEFAULT_PRICE,
  overrides: Partial<Pick<MenuItem, "kind" | "customization">> = {},
): MenuItem {
  return {
    id: toItemId(sectionId, name),
    imageUrl: DEFAULT_IMAGE,
    name: name.toUpperCase(),
    price,
    kind: overrides.kind ?? "simple",
    customization: overrides.customization,
  };
}

export function createMenuSection(
  id: string,
  title: string,
  names: string[],
  priceOverrides: Record<string, number> = {},
): { id: string; title: string; items: MenuItem[] } {
  return {
    id,
    title,
    items: names.map((name) =>
      createMenuItem(id, name, priceOverrides[name] ?? DEFAULT_PRICE),
    ),
  };
}
