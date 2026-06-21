import type { MenuCategory } from "@/modules/customer/domain/constants/menu-categories";
import { cn } from "@/shared/lib/cn";

type HomeCategoryTabsProps = {
  categories: MenuCategory[];
  activeCategoryId: string;
  onSelectCategory: (categoryId: string) => void;
};

export function HomeCategoryTabs({
  categories,
  activeCategoryId,
  onSelectCategory,
}: HomeCategoryTabsProps) {
  return (
    <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
      <div className="flex w-max gap-6">
        {categories.map((category) => {
          const isActive = category.id === activeCategoryId;

          return (
            <button
              key={category.id}
              type="button"
              onClick={() => onSelectCategory(category.id)}
              className={cn(
                "shrink-0 border-b-2 pb-2 text-xs font-bold uppercase tracking-wide text-zinc-900 transition-colors",
                isActive ? "border-[#FA52A8]" : "border-transparent",
              )}
            >
              {category.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
