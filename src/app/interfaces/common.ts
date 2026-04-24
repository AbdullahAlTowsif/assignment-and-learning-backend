import { Role } from "../../../prisma/generated/prisma/enums";

export type IJWTPayload = {
    email: string;
    role: Role
}
