"use client";
import MDEditor from "@uiw/react-md-editor";
import type { EditorProps } from "@/types/editor";

export default function Editor({ content, onChange }: EditorProps) {
  return (
    <div className="border rounded-md p-2">
      <MDEditor value={content} onChange={onChange} />
      <MDEditor.Markdown source={content} style={{ whiteSpace: "pre-wrap" }} />
    </div>
  );
}
