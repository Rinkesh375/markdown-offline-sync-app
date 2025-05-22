export type Note = {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
  synced: boolean;
};


export type NoteCardProps  = {
  note: Note;
  onSelect: (id: string) => void;
  isSelected: boolean;
}


export type NotesContextType = {
  notes: Note[];
  addNote: () => void;
  deleteNote: (id: string) => void;
  updateNote: (note: Note) => void;
  selectedNoteId: string | null;
  setSelectedNoteId: (id: string | null) => void;
  setNotes: (notes: Note[]) => void; 
};
