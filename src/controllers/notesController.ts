import { users } from '@prisma/client';
import { Request, Response } from "express";
import { NoteInitial } from "../types/notesInterface";

import noteService from "../services/notesService.js";


async function createNote(req: Request, res: Response) {
  const { title, description }: NoteInitial = req.body;
  const email: users['email'] = res.locals.userEmail;

  // find userId by userEmail
  const userId = await noteService.getUserIdByEmail(email);

  // create object note
  const note = {
    title,
    description,
    userId,
  };

  // verify if note title already exists
  await noteService.verifyIfNoteTitleAlreadyExists(note.title, note.userId);

  // create note
  await noteService.createNote(note);

  res.status(201).json({
    message: 'Note created successfully',
  });

}

const notesController = {
  createNote
}

export default notesController;