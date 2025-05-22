import React from 'react';
import SyncStatusBadge from './SyncStatusBadge';
import type { NoteCardProps } from '@/types/note';



export default function NoteCard({ note, onSelect, isSelected }:NoteCardProps)  {
  return (
    <div
      className={`cursor-pointer p-4 border rounded-md mb-2 ${
        isSelected ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
      }`}
      onClick={() => onSelect(note.id)}
    >
      <h3 className="font-semibold truncate">{note.title || 'Untitled'}</h3>
      <p className="text-sm text-gray-600 truncate">{note.content.substring(0, 100)}</p>
      <div className="flex justify-between items-center mt-1 text-xs">
        <span>{new Date(note.updatedAt).toLocaleString()}</span>
        <SyncStatusBadge synced={note.synced} />
      </div>
    </div>
  );
};


