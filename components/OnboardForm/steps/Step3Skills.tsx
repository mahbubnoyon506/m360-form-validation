"use client";

import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import {
  step3SkillsSchema,
  Step3SkillsType,
} from "@/lib/validation/step3SkillsSchema";
import { skillsByDepartment } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import FormInputField from "@/components/FormFields/FormInputField";
import { FormCheckboxField } from "@/components/FormFields/FormCheckboxField";
import { FormCheckboxGroup } from "@/components/FormFields/FormCheckboxGroup";

type Props = {
  defaultValues?: Step3SkillsType;
  department: keyof typeof skillsByDepartment;
  onNext: (data: Step3SkillsType) => void;
  onBack: () => void;
};

export default function Step3Skills({
  defaultValues,
  department,
  onNext,
  onBack,
}: Props) {
  const methods = useForm<Step3SkillsType>({
    resolver: zodResolver(step3SkillsSchema),
    defaultValues: defaultValues || {
      primarySkills: [],
      experience: {},
      workingHours: { start: "09:00", end: "17:00" },
      remotePreference: 0,
      managerApproved: false,
      extraNotes: "",
    },
  });
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = methods;
  const primarySkillsRaw = watch("primarySkills");
  const primarySkills = Array.isArray(primarySkillsRaw)
    ? primarySkillsRaw
    : typeof primarySkillsRaw === "string"
    ? [primarySkillsRaw]
    : [];
  const remotePreference = watch("remotePreference");

  const availableSkills = skillsByDepartment[department] || [];

  useEffect(() => {
    if (remotePreference > 50) {
      setValue("managerApproved", watch("managerApproved") || false);
    } else {
      setValue("managerApproved", false);
    }
  }, [remotePreference, setValue, watch]);

  const onSubmit = (data: Step3SkillsType) => {
    onNext(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormCheckboxGroup
          name="primarySkills"
          label="Primary Skills (Select at least 3)"
          control={control}
          options={availableSkills}
        />

        {primarySkills.length > 0 && (
          <div>
            <label className="block font-medium mb-2">
              Experience (years) for each skill
            </label>
            {primarySkills.map((skill: string) => (
              <div key={skill} className="flex items-center space-x-2 mb-2">
                <span className="w-32">{skill}</span>
                <FormInputField
                  type="number"
                  name={`experience.${skill}`}
                  label=""
                  placeholder=""
                  required
                />
              </div>
            ))}
          </div>
        )}

        {/* Working Hours */}
        <div>
          <label className="block font-medium mb-2">
            Preferred Working Hours
          </label>
          <div className="flex items-center space-x-2">
            <Input type="time" {...register("workingHours.start")} />
            <span>to</span>
            <Input type="time" {...register("workingHours.end")} />
          </div>
          {errors.workingHours && (
            <p className="text-red-500 text-sm">
              {errors.workingHours.message}
            </p>
          )}
        </div>

        <FormInputField
          type="number"
          name="remotePreference"
          label="Remote Work Preference (%)"
          placeholder=""
          min={0}
          max={100}
          required
        />

        {/* Manager Approval */}
        {remotePreference > 50 && (
          <FormCheckboxField
            name="managerApproved"
            label="Manager Approved"
            control={control}
          />
        )}

        {/* Extra Notes */}
        <div>
          <label className="block font-medium mb-2">
            Extra Notes (optional, max 500 chars)
          </label>
          <Textarea
            {...register("extraNotes")}
            className="input w-full border"
            maxLength={500}
          />
        </div>

        {/* Navigation Buttons */}
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
