"use client";

import OnboardForm from "@/components/OnboardForm/OnboardForm";

export default function Home() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">
        Employee Onboarding
      </h1>
      <OnboardForm />
    </div>
  );
}
