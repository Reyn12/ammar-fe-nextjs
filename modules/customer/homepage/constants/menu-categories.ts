export type MenuCategory = {
  id: string;
  label: string;
};

export const HOME_MENU_CATEGORIES: MenuCategory[] = [
  { id: "semua", label: "SEMUA" },
  { id: "paket-hemat", label: "MENU PAKET HEMAT" },
  { id: "makanan", label: "MAKANAN" },
  { id: "ikan-lauk", label: "IKAN & LAUK UTAMA" },
  { id: "minuman", label: "MINUMAN" },
  { id: "snack", label: "SNACK" },
];

export const MENU_CATEGORY_SECTION_IDS: Record<string, string[]> = {
  "paket-hemat": ["menu-paket"],
  makanan: ["menu-makanan", "menu-lain"],
  "ikan-lauk": ["menu-ikan-lauk"],
  minuman: ["menu-minuman"],
  snack: ["menu-cemilan"],
};
