import { network } from "@prisma/client";

export type WifiInitial = Omit<network, 'id' | 'createdAt' | "userId">;
export type CreateWifi = Omit<network, 'id' | 'createdAt'>;