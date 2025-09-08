import { z } from "zod";
import { differenceInYears } from "date-fns";

export const step1PersonalSchema = z.object({
  fullName: z
    .string()
    .min(2, "Full Name must have at least 2 words")
    .refine((val) => val.trim().split(" ").length >= 2, {
      message: "Full Name must have at least 2 words",
    }),
  email: z.string().email("Invalid email"),
  phoneNumber: z
    .string()
    .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Invalid phone number format (+1-123-456-7890)"),
dateOfBirth: z
  .string()
  .refine((val) => {
    const date = new Date(val);
    return !isNaN(date.getTime()) && differenceInYears(new Date(), date) >= 18;
  }, {
    message: "You must be at least 18 years old",
  }),
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
