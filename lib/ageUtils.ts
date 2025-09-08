// app/onboarding/utils/ageUtils.ts
import { differenceInYears } from "date-fns";

export const getAge = (dob: Date | string) => {
  const date = typeof dob === "string" ? new Date(dob) : dob;
  return differenceInYears(new Date(), date);
};
