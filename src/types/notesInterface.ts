import { notes } from "@prisma/client";

export type NoteInitial = Omit<notes, 'id' | 'createdAt' | "userId">;
export type CreateNote = Omit<notes, 'id' | 'createdAt'>;