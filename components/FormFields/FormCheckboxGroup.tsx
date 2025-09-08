"use client";

import { Controller, Control } from "react-hook-form";

interface FormCheckboxGroupProps {
  name: string;
  label: string;
  control: Control<any>;
  options: string[];
  required?: boolean;
}

export function FormCheckboxGroup({
  name,
  label,
  control,
  options,
}: FormCheckboxGroupProps) {
  return (
    <div>
      <label className="block font-medium mb-2">{label}</label>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState }) => {
          const handleChange = (value: string) => {
            if (field.value?.includes(value)) {
              field.onChange(field.value.filter((v: string) => v !== value));
            } else {
              field.onChange([...(field.value || []), value]);
            }
          };

          return (
            <>
              <div className="grid grid-cols-2 gap-2">
                {options.map((option) => (
                  <label
                    key={option}
                    className="flex items-center space-x-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={field.value?.includes(option) || false}
                      onChange={() => handleChange(option)}
                    />
                    <span>{option}</span>
                  </label>
                ))}
              </div>
              {fieldState.error && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldState.error.message}
                </p>
              )}
            </>
          );
        }}
      />
    </div>
  );
}
