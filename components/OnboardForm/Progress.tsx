"use client";

type Props = {
  step: number;
  totalSteps: number;
};

export default function Progress({ step, totalSteps }: Props) {
  const percent = Math.round((step / totalSteps) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between mb-2">
        <span className="text-sm font-medium">
          Step {step} of {totalSteps}
        </span>
        <span className="text-sm font-medium">{percent}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-blue-600 h-2 rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
