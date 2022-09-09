import { credentials } from "@prisma/client";

export type CreateCredential = Omit<credentials, 'id' | 'createdAt'>;