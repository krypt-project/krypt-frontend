"use client";

import { useState, useRef, useEffect } from "react";
import { Edit2 } from "lucide-react";
import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

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
    <header className="flex items-center px-14 py-3 bg-white">
      <div className="flex-1 flex items-center gap-2">
        {editingTitle ? (
          <Input
            ref={inputRef}
            value={currentTitle}
            className="text-xl font-semibold pr-5"
            onChange={(e) => setCurrentTitle(e.target.value)}
            onBlur={handleBlur}
            onKeyDown={(e) => e.key === "Enter" && inputRef.current?.blur()}
          />
        ) : (
          <>
            <h2 className="text-xl font-semibold">{title}</h2>
            <Button
              onClick={() => setEditingTitle(true)}
              variant="sidebar"
              className="ml-2 text-yellow-600 hover:bg-yellow-200 p-1"
            >
              <Edit2 size={16} />
            </Button>
          </>
        )}
      </div>

      <nav className="flex space-x-4">
        <Button
          onClick={() => setTab("edit")}
          variant="outlined"
          className={`py-0 px-3 ${
            tab === "edit"
              ? "border-0 bg-gradient-to-tr from-[var(--background-2)] to-[var(--primary)] text-white py-2 hover:opacity-90"
              : "hover:bg-indigo-100 text-gray-700"
          }`}
        >
          Edit
        </Button>
        <Button
          onClick={() => setTab("preview")}
          variant="outlined"
          className={`py-0 px-3 ${
            tab === "preview"
              ? "border-0 bg-gradient-to-tr from-[var(--background-2)] to-[var(--primary)] text-white py-2 hover:opacity-90"
              : "hover:bg-indigo-100 text-gray-700"
          }`}
        >
          Preview
        </Button>
      </nav>
    </header>
  );
}
