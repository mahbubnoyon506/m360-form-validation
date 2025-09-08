"use client";

import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import { Button } from "../ui/button";

type FileUploadFieldProps = {
  name: string;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
};

export default function FileUploadField({
  name,
  label,
  accept,
  maxSizeMB = 2,
}: FileUploadFieldProps) {
  const { control, setValue, watch } = useFormContext();
  const file = watch(name);
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    let url: string | undefined;
    if (file instanceof File) {
      url = URL.createObjectURL(file);
      setPreview(url);
    } else if (typeof file === "string") {
      setPreview(file);
    } else {
      setPreview(null);
    }
    return () => {
      if (url) URL.revokeObjectURL(url);
    };
  }, [file]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;

    if (selectedFile.size > maxSizeMB * 1024 * 1024) {
      alert(`File must be smaller than ${maxSizeMB} MB`);
      return;
    }

    setValue(name, selectedFile, { shouldValidate: true });
  };

  const removeFile = () => {
    setValue(name, null, { shouldValidate: true });
  };

  return (
    <div className="space-y-2">
      {label && <label className="block font-medium">{label}</label>}
      <input type="file" accept={accept} onChange={handleChange} />
      {preview && (
        <div className="mt-2 flex flex-col items-start gap-2">
          <img
            src={preview}
            alt="Preview"
            className="w-24 h-24 rounded-full object-cover border"
          />
          <Button type="button" variant="secondary" onClick={removeFile}>
            Remove
          </Button>
        </div>
      )}
    </div>
  );
}
