import { users, sessions } from "@prisma/client";

export type CreateAuthUser = Omit<users, 'id' | 'createdAt'>;

export type TypeAction = "login" | "signup";

export type TypeSession = Omit<sessions, 'id' | 'createdAt'>;