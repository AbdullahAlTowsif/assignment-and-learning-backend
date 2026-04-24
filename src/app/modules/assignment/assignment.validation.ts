import { z } from "zod";

export const createAssignmentValidation = z.object({
    title: z.string().min(1),
    description: z.string().min(1),
    deadline: z.string(),
    difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]),
});

export const updateAssignmentValidation = z.object({
    title: z.string().optional(),
    description: z.string().optional(),
    deadline: z.string().optional(),
    difficulty: z.enum(["BEGINNER", "INTERMEDIATE", "ADVANCED"]).optional(),
});
