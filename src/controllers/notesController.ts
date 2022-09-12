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

async function getAllNotes(req: Request, res: Response) {
  const email: users['email'] = res.locals.userEmail;

  const userId = await noteService.getUserIdByEmail(email);
  const notes = await noteService.getAllNotes(userId);

  res.status(200).json(notes);

}

const notesController = {
  createNote,
  getAllNotes
}

export default notesController;