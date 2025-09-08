"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { Button } from "../../../components/ui/button";
import {
  step1PersonalSchema,
  Step1PersonalType,
} from "@/lib/validation/step1PersonalSchema";
import { Input } from "@/components/ui/input";
import FileUploadField from "@/components/FormFields/FileUploadField";

type Props = {
  defaultValues?: Step1PersonalType;
  onNext: (data: Step1PersonalType) => void;
};

export default function Step1Personal({ defaultValues, onNext }: Props) {
  const methods = useForm<Step1PersonalType>({
    resolver: zodResolver(step1PersonalSchema),
    defaultValues: defaultValues || {
      fullName: "",
      email: "",
      phoneNumber: "",
      dateOfBirth: undefined,
      profilePicture: undefined,
    },
  });

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

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

  return (
    <FormProvider {...methods}>
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

        <FileUploadField
          name="profilePicture"
          label="Profile Picture (optional)"
          accept="image/jpeg,image/png"
          maxSizeMB={2}
        />

        <div className="flex justify-end">
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}
