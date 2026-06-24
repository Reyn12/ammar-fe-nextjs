export type MenuOptionChoice = {
  id: string;
  label: string;
  /** Tambahan harga di atas base price menu */
  priceDelta: number;
};

/** Pilih satu opsi wajib, misal: Level pedas, Ukuran */
export type MenuVariantGroup = {
  id: string;
  label: string;
  required: true;
  choices: MenuOptionChoice[];
};

/** Opsional, bisa pilih lebih dari satu, misal: Extra telur, Extra sambal */
export type MenuAddonGroup = {
  id: string;
  label: string;
  required?: false;
  minSelect?: number;
  maxSelect?: number;
  choices: MenuOptionChoice[];
};

export type MenuCustomization = {
  variantGroups: MenuVariantGroup[];
  addonGroups: MenuAddonGroup[];
};
