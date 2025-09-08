"use client";

import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";

import {
  step3SkillsSchema,
  Step3SkillsType,
} from "@/lib/validation/step3SkillsSchema";
import { skillsByDepartment } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

type Props = {
  defaultValues?: Step3SkillsType;
  department: string;
  onNext: (data: Step3SkillsType) => void;
  onBack: () => void;
};

export default function Step3Skills({
  defaultValues,
  department,
  onNext,
  onBack,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<Step3SkillsType>({
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

  const primarySkillsRaw = watch("primarySkills");
  const primarySkills = Array.isArray(primarySkillsRaw)
    ? primarySkillsRaw
    : typeof primarySkillsRaw === "string"
    ? [primarySkillsRaw]
    : [];
  const remotePreference = watch("remotePreference");

  const availableSkills = skillsByDepartment[department] || [];

  // Automatically add managerApproved field if remotePreference > 50%
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
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-medium mb-2">
          Primary Skills (Select at least 3)
        </label>
        <div className="grid grid-cols-2 gap-2">
          {availableSkills.map((skill) => (
            <div key={skill} className="flex items-center space-x-2">
              <input
                type="checkbox"
                value={skill}
                {...register("primarySkills")}
                checked={
                  Array.isArray(primarySkills) && primarySkills.includes(skill)
                }
              />
              <span>{skill}</span>
            </div>
          ))}
        </div>
        {errors.primarySkills && (
          <p className="text-red-500 text-sm">{errors.primarySkills.message}</p>
        )}
      </div>

      {primarySkills.length > 0 && (
        <div>
          <label className="block font-medium mb-2">
            Experience (years) for each skill
          </label>
          {primarySkills.map((skill) => (
            <div key={skill} className="flex items-center space-x-2 mb-2">
              <span className="w-32">{skill}</span>
              <Input
                type="number"
                min={0}
                max={50}
                {...register(`experience.${skill}` as const, {
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}
        </div>
      )}

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
          <p className="text-red-500 text-sm">{errors.workingHours.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium mb-2">
          Remote Work Preference (%)
        </label>
        <Input
          type="number"
          {...register("remotePreference", { valueAsNumber: true })}
          min={0}
          max={100}
        />
      </div>

      {remotePreference > 50 && (
        <div>
          <Controller
            name="managerApproved"
            control={control}
            render={({ field }) => (
              <Checkbox {...field}>
                {field.value ? "Manager Approved ✅" : "Manager Approved"}
              </Checkbox>
            )}
          />
          {errors.managerApproved && (
            <p className="text-red-500 text-sm">
              {errors.managerApproved.message}
            </p>
          )}
        </div>
      )}

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

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Next</Button>
      </div>
    </form>
  );
}
