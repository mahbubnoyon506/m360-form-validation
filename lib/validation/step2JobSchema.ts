import { z } from "zod";
import { addDays, isBefore, isWeekend } from "date-fns";

export const step2JobSchema = z
  .object({
    department: z.enum(["Engineering", "Marketing", "Sales", "HR", "Finance"])
      .refine((val) => !!val, { message: "Department is required" }),
    positionTitle: z.string().min(3, "Position title must be at least 3 characters"),
    startDate: z.string(),
    jobType: z.enum(["Full-time", "Part-time", "Contract"]),
    salary: z.number(),
    managerId: z.string().min(1, "Manager is required"),
  })
  .superRefine((data, ctx) => {
    const date = new Date(data.startDate);
    const today = new Date();
    const maxFuture = addDays(today, 90);

    if (isNaN(date.getTime())) {
      ctx.addIssue({
        path: ["startDate"],
        message: "Invalid date format",
        code: z.ZodIssueCode.custom,
      });
    } else {
      if (isBefore(date, today)) {
        ctx.addIssue({
          path: ["startDate"],
          message: "Start date cannot be in past",
          code: z.ZodIssueCode.custom,
        });
      }
      if (isBefore(maxFuture, date)) {
        ctx.addIssue({
          path: ["startDate"],
          message: "Start date cannot be more than 90 days in the future",
          code: z.ZodIssueCode.custom,
        });
      }
      if (
        (data.department === "HR" || data.department === "Finance") &&
        isWeekend(date)
      ) {
        ctx.addIssue({
          path: ["startDate"],
          message: "Start date cannot be on weekend for HR/Finance",
          code: z.ZodIssueCode.custom,
        });
      }
    }

    // salary validations
    if (data.jobType === "Full-time" && (data.salary < 30000 || data.salary > 200000)) {
      ctx.addIssue({
        path: ["salary"],
        message: "Invalid salary based on job type",
        code: z.ZodIssueCode.custom,
      });
    }
    if (data.jobType === "Contract" && (data.salary < 50 || data.salary > 150)) {
      ctx.addIssue({
        path: ["salary"],
        message: "Invalid salary based on job type",
        code: z.ZodIssueCode.custom,
      });
    }
  });

export type Step2JobType = z.infer<typeof step2JobSchema>;
