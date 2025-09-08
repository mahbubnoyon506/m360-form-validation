import { z } from "zod";

export const step4EmergencySchema = z.object({
  contactName: z.string().min(1, "Contact name is required"),
  relationship: z.string().min(1, "Relationship is required"),
  phoneNumber: z
    .string()
    .regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Invalid phone number format (+1-123-456-7890)"),
  guardianName: z.string().optional(),
  guardianPhone: z.string().regex(/^\+\d{1,3}-\d{3}-\d{3}-\d{4}$/, "Invalid phone number format").optional(),
}).refine((data) => {
  // If guardianName is provided, guardianPhone must exist
  if (data.guardianName && !data.guardianPhone) return false;
  if (!data.guardianName && data.guardianPhone) return false;
  return true;
}, {
  message: "Both Guardian Name and Phone must be provided if age < 21",
  path: ["guardianName"],
});

export type Step4EmergencyType = z.infer<typeof step4EmergencySchema>;
