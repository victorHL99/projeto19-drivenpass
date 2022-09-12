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

async function getNoteById(id: number) {
  const note = await noteRepository.getNoteById(id);
  return note;
}

async function checkIfNoteExists(id: number) {
  const note = await noteRepository.getNoteById(id);

  if (!note) {
    throw {
      type: 'not_found',
      message: 'Note not found'
    }
  }
}

async function checkIfNoteIsFromUser(id: number, email: users['email']) {
  const userId = await getUserIdByEmail(email);
  const note = await noteRepository.getNoteById(id);

  if (note.userId !== userId) {
    throw {
      type: 'forbidden',
      message: 'You do not have permission to access this note'
    }
  }
}

const noteService = {
  verifyIfNoteTitleAlreadyExists,
  getUserIdByEmail,
  createNote,
  getAllNotes,
  getNoteById,
  checkIfNoteExists,
  checkIfNoteIsFromUser
}

export default noteService