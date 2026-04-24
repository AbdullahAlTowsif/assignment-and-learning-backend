import { Role } from "../../../prisma/generated/prisma/enums";

export type IJWTPayload = {
    id: string;
    email: string;
    role: Role
}
