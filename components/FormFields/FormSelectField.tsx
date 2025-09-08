"use client";

import { Controller, Control } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Option {
  value: string | number;
  label: string;
}

interface FormSelectFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  options: Option[];
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}

export function FormSelectField({
  name,
  label,
  control,
  options,
  placeholder,
  required,
  disabled,
}: FormSelectFieldProps) {
  return (
    <div>
      <label className="block font-medium mb-1">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <>
            <Select
              value={field.value ? String(field.value) : ""}
              onValueChange={(val) =>
                field.onChange(
                  typeof field.value === "number" ? Number(val) : val
                )
              }
              disabled={disabled}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder || "Select an option"} />
              </SelectTrigger>
              <SelectContent>
                {options.map((item) => (
                  <SelectItem key={item.value} value={String(item.value)}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {fieldState.error && (
              <p className="text-red-500 text-sm mt-1">
                {fieldState.error.message}
              </p>
            )}
          </>
        )}
      />
    </div>
  );
}
