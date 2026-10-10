import { Suspense } from "react";

import { PaymentPage } from "@/modules/customer";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <PaymentPage />
    </Suspense>
  );
}
