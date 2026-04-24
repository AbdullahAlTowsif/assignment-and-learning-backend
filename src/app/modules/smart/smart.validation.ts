import { z } from "zod";

export const generateFeedbackValidation = z.object({
    studentNote: z.string().min(1),
});

export const improveDescriptionValidation = z.object({
    description: z.string().min(1),
});
