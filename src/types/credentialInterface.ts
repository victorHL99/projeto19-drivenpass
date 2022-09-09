import { credentials } from "@prisma/client";

export type CredentialInitial = Omit<credentials, 'id' | 'createdAt' | "userId">;
export type CreateCredential = Omit<credentials, 'id' | 'createdAt'>;