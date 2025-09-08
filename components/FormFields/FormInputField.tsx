import { Input } from "@/components/ui/input";
import { Controller, useFormContext } from "react-hook-form";

type Props = {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  min?: string | number;
  max?: string | number;
};

export default function FormInputField({
  name,
  label,
  type = "text",
  placeholder,
  required,
  min,
  max,
}: Props) {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const error = errors[name as keyof typeof errors];

  return (
    <div className="mb-4">
      <label className="block font-medium mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <Input
            {...field}
            type={type}
            placeholder={placeholder}
            min={type === "date" ? min : undefined}
            max={type === "date" ? max : undefined}
            value={type === "number" ? field.value ?? "" : field.value}
            onChange={(e) =>
              field.onChange(
                type === "number" ? e.target.valueAsNumber ?? 0 : e.target.value
              )
            }
          />
        )}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">
          {(error as any).message?.toString()}
        </p>
      )}
    </div>
  );
}
