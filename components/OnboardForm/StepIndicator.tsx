"use client";

const steps = [
  "Personal Info",
  "Job Details",
  "Skills",
  "Emergency Contact",
  "Review & Submit",
];

type Props = {
  currentStep: number;
};

export default function StepIndicator({ currentStep }: Props) {
  return (
    <div className="flex justify-between mb-6">
      {steps.map((label, index) => {
        const stepNum = index + 1;
        const isActive = stepNum === currentStep;
        const isCompleted = stepNum < currentStep;

        return (
          <div key={label} className="flex-1 flex flex-col items-center">
            <div
              className={`w-8 h-8 flex items-center justify-center rounded-full border-2 
                ${
                  isActive
                    ? "bg-blue-600 text-white border-blue-600"
                    : isCompleted
                    ? "bg-green-500 text-white border-green-500"
                    : "border-gray-400 text-gray-500"
                }`}
            >
              {isCompleted ? "✓" : stepNum}
            </div>
            <span className="text-xs mt-1 text-center">{label}</span>
          </div>
        );
      })}
    </div>
  );
}
