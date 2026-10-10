type StoreDetailSectionProps = {
  title: string;
  icon: React.ReactNode;
  children: React.ReactNode;
};

export function StoreDetailSection({
  title,
  icon,
  children,
}: StoreDetailSectionProps) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
      <div className="flex items-center gap-3">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#FA52A8]/10 text-[#FA52A8]">
          {icon}
        </span>
        <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
      </div>
      <div className="mt-3 text-sm text-zinc-600">{children}</div>
    </section>
  );
}
