import type { CartSelection } from "@/modules/customer/homepage/types/cart";
import type { MenuItem } from "@/modules/customer/homepage/types/menu-item";

/** Ringkasan pilihan variant/addon, mis. "Bakar, Lv 1, Extra Telur" */
export function describeSelection(item: MenuItem, selection: CartSelection) {
  const labels: string[] = [];

  for (const group of item.customization?.variantGroups ?? []) {
    const choice = group.choices.find(
      (option) => option.id === selection.variants[group.id],
    );
    if (choice) labels.push(choice.label);
  }

  for (const group of item.customization?.addonGroups ?? []) {
    const choiceIds = selection.addons[group.id] ?? [];
    for (const choiceId of choiceIds) {
      const choice = group.choices.find((option) => option.id === choiceId);
      if (choice) labels.push(choice.label);
    }
  }

  return labels.join(", ");
}
