"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  step5ReviewSchema,
  Step5ReviewType,
} from "@/lib/validation/step5ReviewSchema";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type Props = {
  formData: any;
  onSubmitFinal: () => void;
  onBack: () => void;
};

export default function Step5Review({
  formData,
  onSubmitFinal,
  onBack,
}: Props) {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Step5ReviewType>({
    resolver: zodResolver(step5ReviewSchema),
    defaultValues: {
      confirm: false,
    },
  });

  const submitHandler = () => {
    onSubmitFinal();
  };

  const renderData = (data: any) => {
    return Object.entries(data).map(([key, value]) => {
      if (typeof value === "object" && value !== null) {
        return (
          <div key={key} className="ml-4">
            <strong>{key}:</strong>
            {renderData(value)}
          </div>
        );
      }
      return (
        <div key={key}>
          <strong>{key}:</strong> {String(value)}
        </div>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="space-y-6">
      <div className="p-4 border rounded bg-gray-50">
        <h2 className="font-bold mb-2">Review Your Information</h2>
        {renderData(formData)}
      </div>

      <div>
        <Controller
          name="confirm"
          control={control}
          render={({ field }) => (
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
                id="confirm"
              />
              <Label htmlFor="confirm">
                I confirm all information is correct
              </Label>
            </div>
          )}
        />
        {errors.confirm && (
          <p className="text-red-500 text-sm">{errors.confirm.message}</p>
        )}
      </div>

      <div className="flex justify-between">
        <Button type="button" variant="secondary" onClick={onBack}>
          Back
        </Button>
        <Button type="submit">Submit</Button>
      </div>
    </form>
  );
}
