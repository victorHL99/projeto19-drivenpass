import { notes, users } from "@prisma/client";
import { CreateNote } from "../types/notesInterface";
import client from "../config/database.js";

async function getUserIdByEmail(email: users['email']) {
  return client.users.findUnique({
    where: {
      email
    }
  })
}

async function getNoteByTitle(title: notes['title'], userId: notes['userId']) {
  return client.notes.findFirst({
    where: {
      title,
      userId
    }
  })
};

async function createNote(note: CreateNote) {
  return client.notes.create({
    data: note
  })
}

async function getAllNotes(userId: notes['userId']) {
  return client.notes.findMany({
    where: {
      userId
    }
  })
}

async function getNoteById(id: number) {
  return client.notes.findUnique({
    where: {
      id
    }
  })
}

const noteRepository = {
  getNoteByTitle,
  getUserIdByEmail,
  createNote,
  getAllNotes,
  getNoteById
}

export default noteRepository