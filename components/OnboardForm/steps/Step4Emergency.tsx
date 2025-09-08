"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../../../components/ui/button";
import {
  step4EmergencySchema,
  Step4EmergencyType,
} from "@/lib/validation/step4EmergencySchema";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

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
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step4EmergencyType>({
    resolver: zodResolver(step4EmergencySchema),
    defaultValues: defaultValues || {
      contactName: "",
      relationship: "",
      phoneNumber: "",
      guardianName: "",
      guardianPhone: "",
    },
  });

  const onSubmit = (data: Step4EmergencyType) => {
    onNext(data);
  };

  const showGuardian = employeeAge < 21;

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-medium">Emergency Contact Name</label>
        <Input {...register("contactName")} placeholder="Jane Doe" />
        {errors.contactName && (
          <p className="text-red-500 text-sm">{errors.contactName.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Relationship</label>
        <Controller
          control={control}
          name="relationship"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Relationship" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Parent">Parent</SelectItem>
                <SelectItem value="Sibling">Sibling</SelectItem>
                <SelectItem value="Spouse">Spouse</SelectItem>
                <SelectItem value="Friend">Friend</SelectItem>
              </SelectContent>
            </Select>
          )}
        />
        {errors.relationship && (
          <p className="text-red-500 text-sm">{errors.relationship.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Phone Number</label>
        <Input {...register("phoneNumber")} placeholder="+1-123-456-7890" />
        {errors.phoneNumber && (
          <p className="text-red-500 text-sm">{errors.phoneNumber.message}</p>
        )}
      </div>

      {showGuardian && (
        <>
          <div>
            <label className="block font-medium">Guardian Name</label>
            <Input {...register("guardianName")} placeholder="John Doe" />
            {errors.guardianName && (
              <p className="text-red-500 text-sm">
                {errors.guardianName.message}
              </p>
            )}
          </div>

          <div>
            <label className="block font-medium">Guardian Phone</label>
            <Input
              {...register("guardianPhone")}
              placeholder="+1-123-456-7890"
            />
            {errors.guardianPhone && (
              <p className="text-red-500 text-sm">
                {errors.guardianPhone.message}
              </p>
            )}
          </div>
        </>
      )}

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
