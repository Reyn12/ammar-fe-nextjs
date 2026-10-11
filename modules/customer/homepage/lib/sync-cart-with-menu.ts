import { calculateCartUnitPrice } from "@/modules/customer/homepage/lib/cart";
import { findMenuItemById } from "@/modules/customer/homepage/lib/find-menu-item-by-id";
import { isCartSelectionValid } from "@/modules/customer/homepage/lib/menu-selection";
import type { CartLineItem, CartState } from "@/modules/customer/homepage/types/cart";
import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";

/**
 * Samakan cart yang dipulihkan dari localStorage dengan menu terbaru: buang menu yang sudah
 * tidak ada / pilihannya tidak lagi valid, dan hitung ulang harga. Mengembalikan objek yang sama
 * kalau tidak ada yang berubah.
 */
export function syncCartWithMenu(cart: CartState, sections: MenuSection[]): CartState {
  let changed = false;
  const lines: Record<string, CartLineItem> = {};

  for (const line of Object.values(cart.lines)) {
    const item = findMenuItemById(sections, line.menuItemId);

    if (!item || !isCartSelectionValid(item, line.selection)) {
      changed = true;
      continue;
    }

    const unitPrice = calculateCartUnitPrice(item, line.selection);
    if (unitPrice !== line.unitPrice) changed = true;

    lines[line.lineKey] = { ...line, unitPrice };
  }

  return changed ? { lines } : cart;
}
