import { CustomerShell } from "@/modules/customer";

export default function CustomerLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <CustomerShell>{children}</CustomerShell>;
}
