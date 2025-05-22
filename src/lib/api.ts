import { Note } from "../types/note";

export const API_BASE_URL = "http://localhost:5000/notes"; //I have to update this with actual backend server-api-url
//This will be done after handling local db storage

export async function fetchNotes(): Promise<Note[]> {
  const res = await fetch(API_BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch notes");
  return res.json();
}

export async function createNote(note: Note): Promise<Note> {
  const res = await fetch(API_BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to create note");
  return res.json();
}

export async function updateNote(note: Note): Promise<Note> {
  const res = await fetch(`${API_BASE_URL}/${note.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(note),
  });
  if (!res.ok) throw new Error("Failed to update note");
  return res.json();
}

export async function deleteNoteAPI(id: string): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete note");
}
