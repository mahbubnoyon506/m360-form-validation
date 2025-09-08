"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import {
  step1PersonalSchema,
  Step1PersonalType,
} from "@/lib/validation/step1PersonalSchema";
import FileUploadField from "@/components/FormFields/FileUploadField";
import FormInputField from "@/components/FormFields/FormInputField";

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
        <FormInputField
          name="fullName"
          label="Full Name"
          placeholder="John Doe"
          required
        />
        <FormInputField
          name="email"
          label="Email"
          placeholder="example@mail.com"
          required
        />
        <FormInputField
          name="phoneNumber"
          label="Phone Number"
          placeholder="+1-123-456-7890"
          required
        />
        <FormInputField
          name="dateOfBirth"
          label="Date of Birth"
          type="date"
          required
        />
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
