/** Pilihan user saat tambah menu ke cart */
export type CartSelection = {
  /** groupId -> choiceId */
  variants: Record<string, string>;
  /** groupId -> choiceId[] */
  addons: Record<string, string[]>;
};

export type CartLineItem = {
  /** Unik per kombinasi menu + variant + addon */
  lineKey: string;
  menuItemId: string;
  quantity: number;
  selection: CartSelection;
  unitPrice: number;
};

export type CartState = {
  lines: Record<string, CartLineItem>;
};
