import { z } from "zod";

export const createSubmissionValidation = z.object({
    studentUrl: z.string(),
    studentNote: z.string().min(1),
    assignmentId: z.string(),
});

export const updateSubmissionValidation = z.object({
    studentUrl: z.string().optional(),
    studentNote: z.string().optional(),
});

export const reviewSubmissionValidation = z.object({
    status: z.enum(["PENDING", "ACCEPTED", "NEEDS_IMPROVEMENT"]),
    feedback: z.string().min(1),
});
