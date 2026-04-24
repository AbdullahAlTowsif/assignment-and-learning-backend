import { z } from "zod";
import { Role } from "../../../../prisma/generated/prisma/enums";

const createUser = z.object({
    name: z.string({
        error: "Name is required!",
    }),
    email: z.string({
        error: "Email is required!",
    }),
    password: z.string({
        error: "Password is required",
    }),
    role: z.enum([Role.STUDENT, Role.INSTRUCTOR]).default(Role.STUDENT),
});


export const UserValidation = {
    createUser
};