import { Role } from "../../../prisma/generated/prisma/enums";

export interface CreateUserInput {
  name: string;
  email: string;
  password: string;
  role?: Role; // Optional, defaults to STUDENT in schema
}