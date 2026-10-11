import type {
  ApiAddonGroup,
  ApiMenuCategory,
  ApiProduct,
} from "@/modules/customer/catalog/api-types";
import type {
  MenuAddonGroup,
  MenuCustomization,
  MenuVariantGroup,
} from "@/modules/customer/homepage/types/menu-customization";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";
import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";

const FALLBACK_IMAGE = "/images/img_menu_dummy.png";

/** Gambar dari backend dilayani lewat rewrite /be-assets supaya tidak terikat domain backend. */
function toAssetUrl(imageUrl: string | null) {
  if (!imageUrl) return FALLBACK_IMAGE;

  try {
    const { pathname } = new URL(imageUrl, "http://placeholder.local");
    return pathname.startsWith("/images/") || pathname.startsWith("/storage/")
      ? `/be-assets${pathname}`
      : imageUrl;
  } catch {
    return FALLBACK_IMAGE;
  }
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function mapChoices(group: ApiAddonGroup) {
  return group.addons
    .filter((addon) => addon.is_available)
    .map((addon) => ({
      id: String(addon.id),
      label: addon.name,
      priceDelta: addon.price,
    }));
}

function mapCustomization(groups: ApiAddonGroup[]): MenuCustomization | undefined {
  if (groups.length === 0) return undefined;

  const variantGroups: MenuVariantGroup[] = groups
    .filter((group) => group.type === "variant")
    .map((group) => ({
      id: String(group.id),
      label: group.name,
      required: true,
      choices: mapChoices(group),
    }));

  const addonGroups: MenuAddonGroup[] = groups
    .filter((group) => group.type === "addon")
    .map((group) => ({
      id: String(group.id),
      label: group.name,
      minSelect: group.min_qty,
      maxSelect: group.max_qty,
      choices: mapChoices(group),
    }));

  return { variantGroups, addonGroups };
}

function mapComponents(components: ApiProduct["components"]): MenuItem["components"] {
  const mapped = (components ?? []).flatMap((component) =>
    component.name ? [{ name: component.name, qty: component.qty }] : [],
  );

  return mapped.length > 0 ? mapped : undefined;
}

export function mapProduct(product: ApiProduct): MenuItem {
  const customization = mapCustomization(product.addon_groups);

  return {
    id: String(product.id),
    imageUrl: toAssetUrl(product.image_url),
    name: product.name,
    price: product.price,
    kind: customization ? "configurable" : "simple",
    customization,
    isAvailable: product.is_available,
    components: mapComponents(product.components),
  };
}

export function mapMenuCategories(categories: ApiMenuCategory[]): MenuSection[] {
  return categories.map((category) => ({
    // id dibuat dari nama kategori supaya cocok dengan MENU_CATEGORY_SECTION_IDS
    id: slugify(category.name),
    title: category.name.toUpperCase(),
    items: category.products.map(mapProduct),
  }));
}
