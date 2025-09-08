"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

import { format } from "date-fns";

import { Button } from "../../../components/ui/button";
import {
  step1PersonalSchema,
  Step1PersonalType,
} from "@/lib/validation/step1PersonalSchema";
import { Input } from "@/components/ui/input";
import Image from "next/image";

type Props = {
  defaultValues?: Step1PersonalType;
  onNext: (data: Step1PersonalType) => void;
};

export default function Step1Personal({ defaultValues, onNext }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step1PersonalType>({
    resolver: zodResolver(step1PersonalSchema),
    defaultValues: defaultValues || {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: undefined,
      profilePicture: undefined,
    },
  });

  const onSubmit = (data: Step1PersonalType) => {
    if (
      data.profilePicture &&
      typeof data.profilePicture === "object" &&
      "length" in data.profilePicture
    ) {
      data.profilePicture = data.profilePicture[0];
    }
    onNext(data);
  };

  const [preview, setPreview] = useState<string | null>(null);

  const file = watch("profilePicture");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      if (selectedFile.size > 2 * 1024 * 1024) {
        alert("File must be less than 2MB");
        return;
      }
      setValue("profilePicture", selectedFile, { shouldValidate: true });
      setPreview(URL.createObjectURL(selectedFile));
    }
  };

  const removeFile = () => {
    setValue("profilePicture", null, { shouldValidate: true });
    setPreview(null);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-medium">Full Name</label>
        <Input {...register("fullName")} placeholder="John Doe" />
        {errors.fullName && (
          <p className="text-red-500 text-sm">{errors.fullName.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Email</label>
        <Input
          {...register("email")}
          type="email"
          placeholder="example@mail.com"
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Phone Number</label>
        <Input {...register("phoneNumber")} placeholder="+1-123-456-7890" />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Date of Birth</label>
        <Controller
          control={control}
          name="dateOfBirth"
          render={({ field }) => (
            <Input
              type="date"
              {...field}
              max={format(new Date(), "yyyy-MM-dd")}
              value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
            />
          )}
        />
        {errors.dateOfBirth && (
          <p className="text-red-500 text-sm">{errors.dateOfBirth.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="block font-medium">Profile Picture (optional)</label>
        <input
          type="file"
          accept="image/jpeg,image/png"
          onChange={handleFileChange}
        />
        {errors.profilePicture && (
          <p className="text-red-500 text-sm">
            {errors.profilePicture.message as string}
          </p>
        )}

        {preview && (
          <div className="mt-2 flex flex-col items-start gap-2">
            <Image
              src={preview}
              alt="Profile Preview"
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

      <div className="flex justify-end">
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
