"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useFormContext } from "react-hook-form";

interface FileUploadFieldProps {
  name: string;
  label?: string;
  accept?: string;
  maxSizeMB?: number;
  preview?: boolean;
}

export default function FileUploadField({
  name,
  label = "Upload File",
  accept = "image/jpeg,image/png",
  maxSizeMB = 2,
  preview = true,
}: FileUploadFieldProps) {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const file = watch(name);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // Generate preview when file changes
  useEffect(() => {
    if (file instanceof File) {
      const objectUrl = URL.createObjectURL(file);
      setPreviewUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }
    setPreviewUrl(null);
  }, [file]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > maxSizeMB * 1024 * 1024) {
        alert(`File must be less than ${maxSizeMB}MB`);
        return;
      }
      setValue(name, selectedFile, { shouldValidate: true });
    }
  };

  const removeFile = () => {
    setValue(name, null, { shouldValidate: true });
    setPreviewUrl(null);
  };

  return (
    <div className="space-y-2">
      {label && <label className="block font-medium">{label}</label>}

      <input type="file" accept={accept} onChange={handleFileChange} />

      {errors[name] && (
        <p className="text-red-500 text-sm">
          {errors[name]?.message as string}
        </p>
      )}

      {preview && previewUrl && (
        <div className="mt-2 flex flex-col items-start gap-2">
          <Image
            src={previewUrl}
            alt="Preview"
            width={120}
            height={120}
            className="rounded-full object-cover border"
          />
          <button
            type="button"
            onClick={removeFile}
            className="text-sm text-red-600 hover:underline"
          >
            Remove
          </button>
        </div>
      )}
    </div>
  );
}
