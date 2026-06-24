import type { MenuCustomization } from "./menu-customization";

export type MenuItemKind = "simple" | "configurable";

export type MenuItem = {
  id: string;
  imageUrl: string;
  name: string;
  /** Harga dasar sebelum variant/addon */
  price: number;
  kind: MenuItemKind;
  /** Wajib ada kalau kind = "configurable" */
  customization?: MenuCustomization;
};
