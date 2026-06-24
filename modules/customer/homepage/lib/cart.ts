import type { CartLineItem, CartSelection, CartState } from "@/modules/customer/homepage/types/cart";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";

export const EMPTY_CART_SELECTION: CartSelection = {
  variants: {},
  addons: {},
};

function sortRecord(record: Record<string, string>) {
  return Object.fromEntries(
    Object.entries(record).sort(([left], [right]) => left.localeCompare(right)),
  );
}

function sortAddonRecord(record: Record<string, string[]>) {
  return Object.fromEntries(
    Object.entries(record)
      .sort(([left], [right]) => left.localeCompare(right))
      .map(([groupId, choiceIds]) => [
        groupId,
        [...choiceIds].sort((left, right) => left.localeCompare(right)),
      ]),
  );
}

export function buildCartLineKey(
  menuItemId: string,
  selection: CartSelection,
) {
  return JSON.stringify({
    menuItemId,
    variants: sortRecord(selection.variants),
    addons: sortAddonRecord(selection.addons),
  });
}

export function calculateCartUnitPrice(
  item: MenuItem,
  selection: CartSelection,
) {
  let total = item.price;

  for (const group of item.customization?.variantGroups ?? []) {
    const choiceId = selection.variants[group.id];
    const choice = group.choices.find((option) => option.id === choiceId);
    if (choice) total += choice.priceDelta;
  }

  for (const group of item.customization?.addonGroups ?? []) {
    const choiceIds = selection.addons[group.id] ?? [];

    for (const choiceId of choiceIds) {
      const choice = group.choices.find((option) => option.id === choiceId);
      if (choice) total += choice.priceDelta;
    }
  }

  return total;
}

export function getCartQuantityByMenuItemId(
  cart: CartState,
  menuItemId: string,
) {
  return Object.values(cart.lines).reduce((total, line) => {
    if (line.menuItemId !== menuItemId) return total;
    return total + line.quantity;
  }, 0);
}

export function getCartSummary(cart: CartState) {
  return Object.values(cart.lines).reduce(
    (summary, line) => ({
      itemCount: summary.itemCount + line.quantity,
      total: summary.total + line.unitPrice * line.quantity,
    }),
    { itemCount: 0, total: 0 },
  );
}

export function addMenuItemToCart(
  cart: CartState,
  item: MenuItem,
  selection: CartSelection = EMPTY_CART_SELECTION,
): CartState {
  const lineKey = buildCartLineKey(item.id, selection);
  const existingLine = cart.lines[lineKey];

  const nextLine: CartLineItem = {
    lineKey,
    menuItemId: item.id,
    quantity: (existingLine?.quantity ?? 0) + 1,
    selection,
    unitPrice: calculateCartUnitPrice(item, selection),
  };

  return {
    lines: {
      ...cart.lines,
      [lineKey]: nextLine,
    },
  };
}

export function decrementMenuItemByMenuItemId(
  cart: CartState,
  menuItemId: string,
): CartState {
  const line = Object.values(cart.lines).find(
    (cartLine) => cartLine.menuItemId === menuItemId,
  );
  if (!line) return cart;

  return decrementCartLine(cart, line.lineKey);
}

export function decrementCartLine(
  cart: CartState,
  lineKey: string,
): CartState {
  const existingLine = cart.lines[lineKey];
  if (!existingLine) return cart;

  if (existingLine.quantity <= 1) {
    const { [lineKey]: _, ...rest } = cart.lines;
    return { lines: rest };
  }

  return {
    lines: {
      ...cart.lines,
      [lineKey]: {
        ...existingLine,
        quantity: existingLine.quantity - 1,
      },
    },
  };
}
