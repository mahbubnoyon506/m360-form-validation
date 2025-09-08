"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export const ComboboxContext = React.createContext<any>(null);

type ComboboxProps = React.PropsWithChildren<{
  value?: string;
  onValueChange?: (value: string) => void;
}>;

export function Combobox({ children, value, onValueChange }: ComboboxProps) {
  return (
    <ComboboxContext.Provider value={{ value, onValueChange }}>
      <div className="relative">{children}</div>
    </ComboboxContext.Provider>
  );
}

export function ComboboxInput({
  value,
  onValueChange,
  placeholder,
  className,
}: {
  value?: string;
  onValueChange?: (val: string) => void;
  placeholder?: string;
  className?: string;
}) {
  return (
    <input
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => onValueChange?.(e.target.value)}
      className={cn("w-full border rounded px-2 py-1", className)}
    />
  );
}

export function ComboboxList({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <ul
      className={cn(
        "absolute w-full mt-1 bg-white border rounded max-h-40 overflow-auto z-10",
        className
      )}
    >
      {children}
    </ul>
  );
}

export function ComboboxItem({
  children,
  value,
}: {
  children: React.ReactNode;
  value: string;
}) {
  const { onValueChange } = React.useContext(ComboboxContext);
  return (
    <li
      onClick={() => onValueChange?.(value)}
      className="p-2 cursor-pointer hover:bg-blue-500 hover:text-white rounded"
    >
      {children}
    </li>
  );
}
