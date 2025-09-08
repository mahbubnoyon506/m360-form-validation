// app/onboarding/steps/Step2Job.tsx
"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";

import { Button } from "../../../components/ui/button";

import { step2JobSchema, Step2JobType } from "@/lib/validation/step2JobSchema";
import { mockManagers } from "@/lib/mockData";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type Props = {
  defaultValues?: Step2JobType;
  onNext: (data: Step2JobType) => void;
  onBack: () => void;
};

export default function Step2Job({ defaultValues, onNext, onBack }: Props) {
  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = useForm<Step2JobType>({
    resolver: zodResolver(step2JobSchema),
    defaultValues: defaultValues || {
      department: "Engineering",
      positionTitle: "",
      startDate: undefined,
      jobType: "Full-time",
      salary: undefined,
      managerId: "",
    },
  });

  const department = watch("department");
  const jobType = watch("jobType");

  const [filteredManagers, setFilteredManagers] = useState(mockManagers);

  useEffect(() => {
    const managers = mockManagers.filter((m) => m.department === department);
    setFilteredManagers(managers);
    // Reset managerId if department changed
    setValue("managerId", "");
  }, [department, setValue]);

  const onSubmit = (data: Step2JobType) => {
    onNext(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block font-medium">Department</label>
        <Controller
          control={control}
          name="department"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Relationship" />
              </SelectTrigger>
              <SelectContent>
                {["Engineering", "Marketing", "Sales", "HR", "Finance"].map(
                  (item) => (
                    <SelectItem key={item} value={item}>
                      {" "}
                      {item}
                    </SelectItem>
                  )
                )}
              </SelectContent>
            </Select>
          )}
        />
        {errors.department && (
          <p className="text-red-500 text-sm">{errors.department.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Position Title</label>
        <Input {...register("positionTitle")} placeholder="Software Engineer" />
        {errors.positionTitle && (
          <p className="text-red-500 text-sm">{errors.positionTitle.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Start Date</label>
        <Controller
          control={control}
          name="startDate"
          render={({ field }) => (
            <Input
              type="date"
              {...field}
              value={field.value ? format(field.value, "yyyy-MM-dd") : ""}
              min={format(new Date(), "yyyy-MM-dd")}
              max={format(addDays(new Date(), 90), "yyyy-MM-dd")}
            />
          )}
        />
        {errors.startDate && (
          <p className="text-red-500 text-sm">{errors.startDate.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Job Type</label>
        <Controller
          control={control}
          name="jobType"
          render={({ field }) => (
            <RadioGroup {...field}>
              {["Full-time", "Part-time", "Contract"].map((type) => (
                <div key={type} className="flex items-center space-x-2">
                  <RadioGroupItem value={type} />
                  <span>{type}</span>
                </div>
              ))}
            </RadioGroup>
          )}
        />
        {errors.jobType && (
          <p className="text-red-500 text-sm">{errors.jobType.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">
          {jobType === "Contract" ? "Hourly Rate ($)" : "Annual Salary ($)"}
        </label>
        <Input type="number" {...register("salary", { valueAsNumber: true })} />
        {errors.salary && (
          <p className="text-red-500 text-sm">{errors.salary.message}</p>
        )}
      </div>

      <div>
        <label className="block font-medium">Manager</label>
        <Controller
          control={control}
          name="managerId"
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Manager" />
              </SelectTrigger>
              <SelectContent>
                {filteredManagers.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        {errors.managerId && (
          <p className="text-red-500 text-sm">{errors.managerId.message}</p>
        )}
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
