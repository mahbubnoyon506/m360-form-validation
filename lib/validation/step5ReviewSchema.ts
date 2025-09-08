import { z } from "zod";

export const step5ReviewSchema = z.object({
  confirm: z.boolean().refine((val) => val === true, {
    message: "You must confirm that all information is correct",
  }),
});

export type Step5ReviewType = z.infer<typeof step5ReviewSchema>;
