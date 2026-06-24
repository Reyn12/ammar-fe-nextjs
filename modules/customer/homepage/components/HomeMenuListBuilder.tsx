import type { MenuSection } from "@/modules/customer/homepage/types/menu-section";

import { HomeMenuListItem } from "./HomeMenuListItem";

type HomeMenuListBuilderProps = {
  sections: MenuSection[];
  getQuantity: (itemId: string) => number;
  onAddItem: (itemId: string) => void;
  onIncrementItem: (itemId: string) => void;
  onDecrementItem: (itemId: string) => void;
};

export function HomeMenuListBuilder({
  sections,
  getQuantity,
  onAddItem,
  onIncrementItem,
  onDecrementItem,
}: HomeMenuListBuilderProps) {
  return (
    <div className="flex flex-col gap-6">
      {sections.map((section) => (
        <section key={section.id} className="flex flex-col gap-4">
          <div className="w-full rounded-lg bg-[#FA52A8] px-4 py-3">
            <p className="text-center text-sm font-bold text-white">
              {section.title}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {section.items.map((item) => (
              <HomeMenuListItem
                key={item.id}
                imageUrl={item.imageUrl}
                name={item.name}
                price={item.price}
                quantity={getQuantity(item.id)}
                onAdd={() => onAddItem(item.id)}
                onIncrement={() => onIncrementItem(item.id)}
                onDecrement={() => onDecrementItem(item.id)}
              />
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
