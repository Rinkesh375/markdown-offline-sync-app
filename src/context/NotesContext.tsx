"use client";
import React, { createContext, useContext, useEffect, useState } from "react";
import type { Note, NotesContextType } from "@/types/note";
import { getAllNotes, saveNote, deleteNoteById } from "@/lib/db";
import { v4 as uuidv4 } from "uuid";

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export default function NotesProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [notes, setNotesState] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<string | null>(null);

  const updateNotesStateAndPersist = async (newNotes: Note[]) => {
    setNotesState(newNotes);
    await Promise.all(newNotes.map((note) => saveNote(note)));
  };

  useEffect(() => {
    (async () => {
      const localNotes = await getAllNotes();
      setNotesState(localNotes);
    })();
  }, []);

  const addNote = async () => {
    const newNote: Note = {
      id: uuidv4(),
      title: "",
      content: "",
      updatedAt: new Date().toISOString(),
      synced: false,
    };
    await saveNote(newNote);
    setNotesState((prev) => [newNote, ...prev]);
    setSelectedNoteId(newNote.id);
  };

  const updateNote = async (note: Note) => {
    const updatedNote = {
      ...note,
      updatedAt: new Date().toISOString(),
      synced: false,
    };
    await saveNote(updatedNote);
    setNotesState((prev) =>
      prev.map((n) => (n.id === updatedNote.id ? updatedNote : n))
    );
  };

  const deleteNote = async (id: string) => {
    await deleteNoteById(id);
    setNotesState((prev) => prev.filter((n) => n.id !== id));
    if (selectedNoteId === id) setSelectedNoteId(null);
  };

  return (
    <NotesContext.Provider
      value={{
        notes,
        addNote,
        updateNote,
        deleteNote,
        selectedNoteId,
        setSelectedNoteId,
        setNotes: updateNotesStateAndPersist,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (!context) {
    throw new Error("useNotes must be used within NotesProvider");
  }
  return context;
}
