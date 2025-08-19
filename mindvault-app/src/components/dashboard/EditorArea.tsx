"use client";

import ReactMarkdown from "react-markdown";

export default function EditorArea({
  tab,
  content,
  onChange,
  onBlur,
}: {
  tab: "edit" | "preview";
  content: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onBlur: () => void;
}) {
  return tab === "edit" ? (
    <textarea
      className="flex-1 p-6 font-mono text-lg resize-none outline-none border-none"
      value={content}
      onChange={onChange}
      onBlur={onBlur}
      placeholder="Start writing markdown..."
    />
  ) : (
    <div className="flex-1 overflow-auto p-6 prose max-w-full bg-white">
      <ReactMarkdown>{content || "Nothing to preview."}</ReactMarkdown>
    </div>
  );
}
