// app/onboarding/utils/salaryUtils.ts

export const isSalaryValid = (jobType: string, salary: number) => {
  if (jobType === "Full-time") return salary >= 30000 && salary <= 200000;
  if (jobType === "Contract") return salary >= 50 && salary <= 150;
  return true;
};

export const getSalaryLabel = (jobType: string) =>
  jobType === "Contract" ? "Hourly Rate ($)" : "Annual Salary ($)";
