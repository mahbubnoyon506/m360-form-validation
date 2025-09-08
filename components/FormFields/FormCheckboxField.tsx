"use client";

import { Controller, Control } from "react-hook-form";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface FormCheckboxFieldProps {
  name: string;
  label: string;
  control: Control<any>;
  disabled?: boolean;
}

export function FormCheckboxField({
  name,
  label,
  control,
  disabled,
}: FormCheckboxFieldProps) {
  return (
    <div>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={field.value}
              onCheckedChange={(checked) => field.onChange(checked)}
              disabled={disabled}
            />
            <Label>{field.value ? `${label} ✅` : label}</Label>
            {fieldState.error && (
              <p className="text-red-500 text-sm">{fieldState.error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
}
