import { users } from '@prisma/client';
import { CreateNote } from "../types/notesInterface";

import noteRepository from "../repositories/noteRepository.js";

async function getUserIdByEmail(email: users['email']) {
  const userInfo = await noteRepository.getUserIdByEmail(email);
  return userInfo.id
}

async function verifyIfNoteTitleAlreadyExists(title: CreateNote['title'], userId: CreateNote['userId']) {
  const note = await noteRepository.getNoteByTitle(title, userId);

  if (note) {
    throw {
      type: 'conflict',
      message: 'Note title already exists'
    }
  }
}

async function createNote(note: CreateNote) {
  await noteRepository.createNote(note);
}

async function getAllNotes(userId: CreateNote['userId']) {
  const notes = await noteRepository.getAllNotes(userId);
  return notes;
}


const noteService = {
  verifyIfNoteTitleAlreadyExists,
  getUserIdByEmail,
  createNote,
  getAllNotes
}

export default noteService