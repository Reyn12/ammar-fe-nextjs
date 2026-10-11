import type { MenuCustomization } from "./menu-customization";

export type MenuItemKind = "simple" | "configurable";

export type MenuItemComponent = {
  name: string;
  qty: number;
};

export type MenuItem = {
  id: string;
  imageUrl: string;
  name: string;
  /** Harga dasar sebelum variant/addon */
  price: number;
  kind: MenuItemKind;
  /** false = habis; default dianggap tersedia */
  isAvailable?: boolean;
  /** Isi paket (menu paket saja), mis. "1× Nasi Putih Porsi" */
  components?: MenuItemComponent[];
  /** Wajib ada kalau kind = "configurable" */
  customization?: MenuCustomization;
};
