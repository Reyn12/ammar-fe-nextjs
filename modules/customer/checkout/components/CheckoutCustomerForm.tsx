import type {
  CustomerInfo,
  CustomerInfoErrors,
} from "@/modules/customer/checkout/lib/validate-customer";
import { cn } from "@/shared/lib/cn";

type CheckoutCustomerFormProps = {
  value: CustomerInfo;
  errors: CustomerInfoErrors;
  onChange: (value: CustomerInfo) => void;
};

type FieldProps = {
  label: string;
  required?: boolean;
  error?: string;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
};

function Field({ label, required, error, inputProps }: FieldProps) {
  return (
    <label className="flex flex-col gap-1">
      <span className="text-xs font-medium text-zinc-700">
        {label}
        {required ? (
          <span className="text-[#FA52A8]"> *</span>
        ) : (
          <span className="font-normal text-zinc-400"> (opsional)</span>
        )}
      </span>
      <input
        {...inputProps}
        className={cn(
          "w-full rounded-lg border bg-white px-3 py-2.5 text-sm text-zinc-900 outline-none transition placeholder:text-zinc-400 focus:ring-2",
          error
            ? "border-red-400 focus:ring-red-200"
            : "border-zinc-300 focus:border-[#FA52A8] focus:ring-[#FA52A8]/20",
        )}
      />
      {error && <span className="text-xs text-red-500">{error}</span>}
    </label>
  );
}

export function CheckoutCustomerForm({
  value,
  errors,
  onChange,
}: CheckoutCustomerFormProps) {
  return (
    <section className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-100">
      <h2 className="text-sm font-semibold text-zinc-900">Data pemesan</h2>
      <div className="mt-3 flex flex-col gap-3">
        <Field
          label="Nama"
          required
          error={errors.name}
          inputProps={{
            type: "text",
            autoComplete: "name",
            placeholder: "Nama kamu",
            value: value.name,
            onChange: (event) => onChange({ ...value, name: event.target.value }),
          }}
        />
        <Field
          label="No. WhatsApp"
          required
          error={errors.phone}
          inputProps={{
            type: "tel",
            autoComplete: "tel",
            inputMode: "tel",
            placeholder: "081234567890",
            value: value.phone,
            onChange: (event) =>
              onChange({ ...value, phone: event.target.value }),
          }}
        />
      </div>
    </section>
  );
}
