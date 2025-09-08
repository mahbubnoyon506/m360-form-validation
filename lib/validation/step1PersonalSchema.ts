import { z } from "zod";
import { differenceInYears } from "date-fns";

export const step1PersonalSchema = z.object({
fullName: z
  .string()
  .optional()
  .refine((val) => (val ?? "").trim().length > 0, {
    message: "Full Name is required",
  })
  .refine((val) => ((val ?? "").trim().split(" ").length >= 2), {
    message: "Full Name must have at least 2 words",
  }),
  
email: z
  .string()
  .optional()
  .refine((val) => (val ?? "").trim().length > 0, { message: "Email is required" })
  .refine((val) => /^\S+@\S+\.\S+$/.test(val ?? ""), { message: "Please enter a valid email" }),

phoneNumber: z
  .string()
  .optional()
  .refine((val) => (val ?? "").trim().length > 0, { message: "Phone Number is required" })
  .refine((val) => /^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/.test(val ?? ""), {
    message: "Phone number must be in the format +1-123-456-7890",
  }),

dateOfBirth: z
  .string()
  .optional()
  .refine((val) => (val ?? "").trim().length > 0, { message: "Date of Birth is required" })
  .refine((val) => {
    const date = new Date(val ?? "");
    return !isNaN(date.getTime()) && differenceInYears(new Date(), date) >= 18;
  }, { message: "You must be at least 18 years old" }),

  profilePicture: z
    .any()
    .optional()
    .refine(
      (file) =>
        file == null ||
        (typeof file === "object" &&
          ["image/jpeg", "image/png"].includes(file.type) &&
          file.size <= 2 * 1024 * 1024),
      "Profile picture must be JPG/PNG and max 2MB"
    ),
});

export type Step1PersonalType = z.infer<typeof step1PersonalSchema>;
