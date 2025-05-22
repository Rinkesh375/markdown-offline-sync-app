"use client";
import { useEffect, useMemo, useState } from "react";
import { useNotes } from "@/context/NotesContext";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { useDebounce } from "@/hooks/useDebounce";
import Editor from "@/components/Editor";
import NoteCard from "@/components/NoteCard";

export default function MarkDownNotes() {
  const online = useOnlineStatus();
  const { notes, addNote, updateNote, deleteNote } = useNotes();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const selectedNote = notes.find((n) => n.id === selectedId);
  const [editTitle, setEditTitle] = useState(selectedNote?.title || "Write title");
  const [editContent, setEditContent] = useState(selectedNote?.content || `# Write Your Markdown Title Here
`);

  const filteredNotes = useMemo(() => {
    const lower = searchTerm.toLowerCase();
    return notes
      .filter(
        (n) =>
          n.title.toLowerCase().includes(lower) ||
          n.content.toLowerCase().includes(lower)
      )
      .sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
  }, [notes, searchTerm]);

  useEffect(() => {
    if (!selectedId && filteredNotes.length > 0)
      setSelectedId(filteredNotes[0].id);
  }, [filteredNotes, selectedId]);

  const debouncedTitle = useDebounce(editTitle, 500);
  const debouncedContent = useDebounce(editContent, 500);

  const onChange = (value?: string) => {
    setEditContent(value || "");
  };
  useEffect(() => {
    setEditTitle(selectedNote?.title || "");
    setEditContent(selectedNote?.content || "");
  }, [selectedNote]);

  useEffect(() => {
    if (!selectedNote) return;
    if (
      debouncedTitle !== selectedNote.title ||
      debouncedContent !== selectedNote.content
    ) {
      updateNote({
        ...selectedNote,
        title: debouncedTitle,
        content: debouncedContent,
      });
    }
  }, [debouncedTitle, debouncedContent, selectedNote, updateNote]);

  return (
    <div className="flex flex-col md:flex-row h-screen">
      <aside className="w-full md:w-1/3 border-r p-4 flex flex-col">
        <div className="flex justify-between mb-4">
          <button
            className="bg-blue-600 text-white px-3 py-1 rounded"
            onClick={() => addNote()}
          >
            New Note
          </button>
          <div
            className={`text-sm font-semibold ${
              online ? "text-green-600" : "text-red-600"
            }`}
          >
            {online ? "Online" : "Offline"}
          </div>
        </div>

        <input
          type="search"
          placeholder="Search notes..."
          className="mb-4 p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="overflow-auto flex-grow">
          {filteredNotes.length === 0 && <p>No notes found</p>}
          {filteredNotes.map((note) => (
            <NoteCard
              key={note.id}
              note={note}
              onSelect={setSelectedId}
              isSelected={note.id === selectedId}
            />
          ))}
        </div>
      </aside>

      <main className="flex-grow p-4 overflow-auto">
        {!selectedNote ? (
          <p>Select or create a note to get started.</p>
        ) : (
          <>
            <Editor content={editContent} onChange={onChange} />
            <div className="flex flex-col">
              <input
                className="text-xl font-bold mb-4 border-1 border-black p-2"
                placeholder="Title"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
              />
              <button
                className="mt-4 text-red-600 underline"
                onClick={() => {
                  deleteNote(selectedNote.id);
                  setSelectedId(null);
                }}
              >
                Delete Note
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}