"use client";

import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import {
  step4EmergencySchema,
  Step4EmergencyType,
} from "@/lib/validation/step4EmergencySchema";
import FormInputField from "@/components/FormFields/FormInputField";
import { FormSelectField } from "@/components/FormFields/FormSelectField";

type Props = {
  defaultValues?: Step4EmergencyType;
  employeeAge: number;
  onNext: (data: Step4EmergencyType) => void;
  onBack: () => void;
};

export default function Step4Emergency({
  defaultValues,
  employeeAge,
  onNext,
  onBack,
}: Props) {
  const methods = useForm<Step4EmergencyType>({
    resolver: zodResolver(step4EmergencySchema),
    defaultValues: defaultValues || {
      contactName: "",
      relationship: "",
      phoneNumber: "",
      guardianName: "",
      guardianPhone: "",
    },
  });
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = methods;

  const onSubmit = (data: Step4EmergencyType) => {
    onNext(data);
  };

  const showGuardian = employeeAge < 21;

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormInputField
          name="contactName"
          label="Emergency Contact Name"
          placeholder="Jane Doe"
          required
        />

        <FormSelectField
          name="relationship"
          label="Relationship"
          control={control}
          options={[
            { value: "Parent", label: "Parent" },
            { value: "Sibling", label: "Sibling" },
            { value: "Spouse", label: "Spouse" },
            { value: "Friend", label: "Friend" },
          ]}
          placeholder="Select Relationship"
        />

        <FormInputField
          name="phoneNumber"
          label="Phone Number"
          placeholder="+1-123-456-7890"
          required
        />

        {showGuardian && (
          <>
            <FormInputField
              name="guardianName"
              label="Guardian Name"
              placeholder="John Doe"
              required
            />

            <FormInputField
              name="guardianPhone"
              label="Guardian Phone"
              placeholder="+1-123-456-7890"
              required
            />
          </>
        )}

        <div className="flex justify-between">
          <Button type="button" variant="secondary" onClick={onBack}>
            Back
          </Button>
          <Button type="submit">Next</Button>
        </div>
      </form>
    </FormProvider>
  );
}
