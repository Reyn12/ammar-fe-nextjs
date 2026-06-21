const stats = [
  { label: "Total Customers", value: "128" },
  { label: "Active Orders", value: "34" },
  { label: "Revenue", value: "Rp 12.4jt" },
];

export function DashboardPage() {
  return (
    <div className="space-y-6">
      <section>
        <h1 className="text-2xl font-semibold text-slate-900">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-600">
          Template admin siap. Nanti fitur ditambah per modul di sini.
        </p>
      </section>

      <section className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm"
          >
            <p className="text-sm text-slate-500">{stat.label}</p>
            <p className="mt-2 text-2xl font-semibold text-slate-900">
              {stat.value}
            </p>
          </article>
        ))}
      </section>

      <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-sm font-semibold text-slate-900">Activity</h2>
        <p className="mt-2 text-sm text-slate-600">
          Placeholder content area. Sidebar navigasi sudah aktif di layout
          admin.
        </p>
      </section>
    </div>
  );
}
