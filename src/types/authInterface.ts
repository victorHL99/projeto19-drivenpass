import { users } from "@prisma/client";

export type CreateAuthUser = Omit<users, 'id' | 'createdAt'>;
