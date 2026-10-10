import { EMPTY_CART_SELECTION } from "@/modules/customer/homepage/lib/cart";
import type { CartSelection } from "@/modules/customer/homepage/types/cart";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";

export function createDefaultCartSelection(item: MenuItem): CartSelection {
  const variants: Record<string, string> = {};

  for (const group of item.customization?.variantGroups ?? []) {
    const firstChoice = group.choices[0];
    if (firstChoice) {
      variants[group.id] = firstChoice.id;
    }
  }

  return {
    variants,
    addons: {},
  };
}

export function isCartSelectionValid(
  item: MenuItem,
  selection: CartSelection,
): boolean {
  for (const group of item.customization?.variantGroups ?? []) {
    const choiceId = selection.variants[group.id];
    if (!choiceId) return false;

    const isValidChoice = group.choices.some((choice) => choice.id === choiceId);
    if (!isValidChoice) return false;
  }

  return true;
}

export function toggleAddonChoice(
  selection: CartSelection,
  groupId: string,
  choiceId: string,
): CartSelection {
  const currentChoices = selection.addons[groupId] ?? [];
  const isSelected = currentChoices.includes(choiceId);

  const nextChoices = isSelected
    ? currentChoices.filter((id) => id !== choiceId)
    : [...currentChoices, choiceId];

  return {
    ...selection,
    addons: {
      ...selection.addons,
      [groupId]: nextChoices,
    },
  };
}

export function setVariantChoice(
  selection: CartSelection,
  groupId: string,
  choiceId: string,
): CartSelection {
  return {
    ...selection,
    variants: {
      ...selection.variants,
      [groupId]: choiceId,
    },
  };
}

export { EMPTY_CART_SELECTION };
