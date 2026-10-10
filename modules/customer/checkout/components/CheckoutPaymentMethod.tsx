import { HomeOrderTypeRadio } from "@/modules/customer/homepage/components/HomeOrderTypeRadio";
import {
  PAYMENT_METHODS,
  PAYMENT_METHOD_DESCRIPTION,
  PAYMENT_METHOD_LABEL,
  type PaymentMethod,
} from "@/modules/customer/homepage/types/payment";
import { cn } from "@/shared/lib/cn";

type CheckoutPaymentMethodProps = {
  value: PaymentMethod | null;
  onChange: (method: PaymentMethod) => void;
};

export function CheckoutPaymentMethod({
  value,
  onChange,
}: CheckoutPaymentMethodProps) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
      <h2 className="text-sm font-semibold text-zinc-900">Metode pembayaran</h2>
      <div className="mt-3 flex flex-col gap-2">
        {PAYMENT_METHODS.map((method) => {
          const isActive = value === method;
          return (
            <button
              key={method}
              type="button"
              onClick={() => onChange(method)}
              className={cn(
                "flex w-full items-center justify-between gap-3 rounded-xl border px-3 py-3 text-left transition-all",
                isActive
                  ? "border-[#FA52A8] bg-[#FA52A8]/5"
                  : "border-zinc-200 hover:border-zinc-300",
              )}
            >
              <div>
                <p
                  className={cn(
                    "text-sm font-semibold",
                    isActive ? "text-[#FA52A8]" : "text-zinc-900",
                  )}
                >
                  {PAYMENT_METHOD_LABEL[method]}
                </p>
                <p className="text-xs text-zinc-500">
                  {PAYMENT_METHOD_DESCRIPTION[method]}
                </p>
              </div>
              <HomeOrderTypeRadio isActive={isActive} />
            </button>
          );
        })}
      </div>
    </section>
  );
}
