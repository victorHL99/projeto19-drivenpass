import { credentials } from "@prisma/client";

export type CredentialInitial = Omit<credentials, 'id' | 'createdAt' | "userId">;