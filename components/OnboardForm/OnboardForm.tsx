// app/onboarding/page.tsx
"use client";

import { useState } from "react";
import Step1Personal from "./steps/Step1Personal";
import Step2Job from "./steps/Step2Job";
import Step3Skills from "./steps/Step3Skills";
import Step4Emergency from "./steps/Step4Emergency";
import Step5Review from "./steps/Step5Review";

import { useUnsavedChangesWarning } from "./hooks/useUnsavedChangesWarning";
import { getAge } from "@/lib/ageUtils";
import StepIndicator from "./StepIndicator";
import Progress from "./Progress";

export default function OnboardForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<any>({});
  const totalSteps = 5;

  const nextStep = (data: any) => {
    setFormData({ ...formData, ...data });
    setStep(step + 1);
  };

  const prevStep = () => setStep(step - 1);

  const submitFinal = () => {
    console.log("Final Form Data:", formData);
    alert("✅ Form submitted! Check console for data.");
  };

  const employeeAge = formData?.dateOfBirth ? getAge(formData.dateOfBirth) : 0;

  // Unsaved changes warning
  useUnsavedChangesWarning(step < totalSteps);

  return (
    <div className="max-w-3xl mx-auto">
      <StepIndicator currentStep={step} />
      <Progress step={step} totalSteps={totalSteps} />

      {step === 1 && (
        <Step1Personal defaultValues={formData} onNext={nextStep} />
      )}
      {step === 2 && (
        <Step2Job
          defaultValues={formData}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 3 && (
        <Step3Skills
          defaultValues={formData}
          department={formData.department}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 4 && (
        <Step4Emergency
          defaultValues={formData}
          employeeAge={employeeAge}
          onNext={nextStep}
          onBack={prevStep}
        />
      )}
      {step === 5 && (
        <Step5Review
          formData={formData}
          onSubmitFinal={submitFinal}
          onBack={prevStep}
        />
      )}
    </div>
  );
}
