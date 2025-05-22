import { Note } from "@/types/note";
import { openDB } from "idb";

const DB_NAME = "markdown-notes-db";
const STORE_NAME = "notes";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: "id" });
      }
    },
  });
}

export async function getAllNotes(): Promise<Note[]> {
  const db = await getDB();
  return db.getAll(STORE_NAME);
}

export async function saveNote(note: Note) {
  const db = await getDB();
  await db.put(STORE_NAME, note);
}

export async function deleteNoteById(id: string) {
  const db = await getDB();
  await db.delete(STORE_NAME, id);
}

export async function putNote(note: Note) {
  const db = await getDB();
  await db.put(STORE_NAME, note);
}


export const db = {
  getAllNotes,
  saveNote,
  deleteNoteById,
  putNote,
};

