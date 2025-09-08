"use client";

import { useState, useEffect } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { mockManagers } from "@/lib/mockData";

type ManagerComboboxProps = {
  department: string;
  value: string;
  onChange: (val: string) => void;
};

export default function ManagerCombobox({
  department,
  value,
  onChange,
}: ManagerComboboxProps) {
  const [query, setQuery] = useState("");
  const [filteredManagers, setFilteredManagers] = useState(mockManagers);

  useEffect(() => {
    const list = mockManagers.filter((m) => m.department === department);
    setFilteredManagers(list);
  }, [department]);

  const filtered =
    query === ""
      ? filteredManagers
      : filteredManagers.filter((m) =>
          m.name.toLowerCase().includes(query.toLowerCase())
        );

  const selectedManager = mockManagers.find((m) => m.id === value);

  return (
    <Combobox value={selectedManager?.id || ""} onValueChange={onChange}>
      <ComboboxInput
        placeholder="Select Manager"
        value={selectedManager?.name || query}
        onValueChange={(val) => setQuery(val)}
        className="w-full border rounded px-2 py-1"
      />
      {filtered.length > 0 && (
        <ComboboxList className="absolute w-full mt-1 bg-white border rounded max-h-40 overflow-auto z-10">
          {filtered.map((manager) => (
            <ComboboxItem key={manager.id} value={manager.id}>
              {manager.name}
            </ComboboxItem>
          ))}
        </ComboboxList>
      )}
    </Combobox>
  );
}
