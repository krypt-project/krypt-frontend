"use client";

import { useState, useRef, useEffect } from "react";
import { Edit2 } from "lucide-react";

export default function EditorHeader({
  title,
  tab,
  setTab,
  onRename,
}: {
  title: string;
  tab: "edit" | "preview";
  setTab: (tab: "edit" | "preview") => void;
  onRename: (newTitle: string) => void;
}) {
  const [editingTitle, setEditingTitle] = useState(false);
  const [currentTitle, setCurrentTitle] = useState(title);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setCurrentTitle(title);
  }, [title]);

  useEffect(() => {
    if (editingTitle) inputRef.current?.focus();
  }, [editingTitle]);

  const handleBlur = () => {
    setEditingTitle(false);
    if (currentTitle.trim() && currentTitle !== title) {
      onRename(currentTitle.trim());
    } else {
      setCurrentTitle(title);
    }
  };

  return (
    <header className="flex items-center border-b border-gray-300 px-14 py-3 bg-white">
      <div className="flex-1 flex items-center gap-2">
        {editingTitle ? (
          <input
            ref={inputRef}
            value={currentTitle}
            onChange={(e) => setCurrentTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.blur()}
            className="border-b border-gray-400 text-xl font-semibold focus:outline-none focus:border-indigo-500"
          />
        ) : (
          <>
            <h2 className="text-xl font-semibold">{title}</h2>
            <button
              onClick={() => setEditingTitle(true)}
              className="ml-2 text-yellow-600 hover:bg-yellow-200 p-1 rounded transition cursor-pointer"
            >
              <Edit2 size={16} />
            </button>
          </>
        )}
      </div>

      <nav className="flex space-x-4">
        <button
          onClick={() => setTab("edit")}
          className={`py-1 px-3 rounded ${
            tab === "edit"
              ? "bg-gradient-to-tr from-[#D56434] to-[#6D66E7] text-white py-2 rounded hover:opacity-90 transition cursor-pointer"
              : "hover:bg-indigo-100 text-gray-700 transition cursor-pointer"
          }`}
        >
          Edit
        </button>
        <button
          onClick={() => setTab("preview")}
          className={`py-1 px-3 rounded ${
            tab === "preview"
              ? "bg-gradient-to-tr from-[#D56434] to-[#6D66E7] text-white py-2 rounded hover:opacity-90 transition cursor-pointer"
              : "hover:bg-indigo-100 text-gray-700 transition cursor-pointer"
          }`}
        >
          Preview
        </button>
      </nav>
    </header>
  );
}
