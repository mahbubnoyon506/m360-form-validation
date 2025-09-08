import { z } from "zod";

export const step3SkillsSchema = z.object({
  primarySkills: z
    .array(z.string())
    .min(3, "Select at least 3 primary skills"),
  experience: z.record(z.string(), z.number().min(0).max(50)),
  workingHours: z.object({
    start: z.string(), // HH:mm format
    end: z.string(),
  }).refine((val) => val.start < val.end, {
    message: "Start time must be before end time",
  }),
  remotePreference: z.number().min(0).max(100),
  managerApproved: z.boolean().optional(),
  extraNotes: z.string().max(500).optional(),
});

export type Step3SkillsType = z.infer<typeof step3SkillsSchema>;
