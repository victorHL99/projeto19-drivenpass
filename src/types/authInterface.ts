import { users } from "@prisma/client";

export type CreateAuthUser = Omit<users, 'id' | 'createdAt'>;

export type TypeAction = "login" | "signup";