"use client";

import { useForm, Controller, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { addDays, format } from "date-fns";
import { Button } from "../../../components/ui/button";
import { step2JobSchema, Step2JobType } from "@/lib/validation/step2JobSchema";
import { mockManagers } from "@/lib/mockData";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import FormInputField from "@/components/FormFields/FormInputField";
import { FormSelectField } from "@/components/FormFields/FormSelectField";

type Props = {
  defaultValues?: Step2JobType;
  onNext: (data: Step2JobType) => void;
  onBack: () => void;
};

export default function Step2Job({ defaultValues, onNext, onBack }: Props) {
  const methods = useForm<Step2JobType>({
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

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue,
  } = methods;

  const department = watch("department");
  const jobType = watch("jobType");

  const [filteredManagers, setFilteredManagers] = useState(mockManagers);

  useEffect(() => {
    const managers = mockManagers.filter((m) => m.department === department);
    setFilteredManagers(managers);
    setValue("managerId", "");
  }, [department, setValue]);

  const onSubmit = (data: Step2JobType) => {
    onNext(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <FormSelectField
          name="department"
          label="Department"
          control={control}
          options={[
            { value: "Engineering", label: "Engineering" },
            { value: "Marketing", label: "Marketing" },
            { value: "Sales", label: "Sales" },
            { value: "HR", label: "HR" },
            { value: "Finance", label: "Finance" },
          ]}
          placeholder="Select Department"
        />

        <FormInputField
          name="positionTitle"
          label="Position Title"
          placeholder="Software Engineer"
          required
        />

        <FormInputField
          name="startDate"
          type="date"
          label="Start Date"
          required
          min={format(new Date(), "yyyy-MM-dd")}
          max={format(addDays(new Date(), 90), "yyyy-MM-dd")}
        />

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

        <FormInputField
          name="salary"
          type="number"
          label={
            jobType === "Contract" ? "Hourly Rate ($)" : "Annual Salary ($)"
          }
          placeholder=""
          required
        />

        <FormSelectField
          name="managerId"
          label="Manager"
          control={control}
          options={filteredManagers.map((m) => ({
            value: m.id,
            label: m.name,
          }))}
          placeholder="Select Manager"
        />

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
