import { cards } from "@prisma/client";

export type CardInitial = Omit<cards, 'id' | 'createdAt' | "userId">;
export type CreateCard = Omit<cards, 'id' | 'createdAt'>;