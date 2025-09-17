"use client";

import { useState } from "react";

import Button from "@/components/atoms/Button";
import Loader from "@/components/feedback/Loader";
import Input from "@/components/atoms/Input";

import { Search, ChevronLeft, File, Plus, Trash } from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
};

interface SidebarNotesProps {
  notes: Note[];
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
  onCreateNote: () => void;
  onDeleteNote: (id: number) => void;
}

export default function SidebarNotes({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
  onDeleteNote,
}: SidebarNotesProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [loading] = useState(false);

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-[var(--background)] flex items-center justify-center z-50">
          <Loader variant="global" size={24} />
        </div>
      )}

      <div className="relative">
        <aside
          className={`flex flex-col bg-[var(--background)] border-r border-[var(--border)] transition-all duration-300 overflow-hidden ${
            collapsed ? "w-0 border-none" : "w-64"
          } min-h-screen`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-17 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold">Notes</h2>
          </div>
          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            {/* Searchbar */}
            <div className="mb-4">
              <div
                className={`flex items-center rounded-md px-3 py-3 ${
                  collapsed ? "hidden" : "block"
                }`}
              >
                {!collapsed && (
                  <Input
                    type="text"
                    placeholder="Search notes ..."
                  />
                )}
              </div>
            </div>

            {/* Different folder of note */}
            <div className="mb-4">
              <ul
                id="notes-submenu"
                className="pl-2 mt-2 max-h-[calc(100vh-180px)] overflow-y-visible"
              >
                <li className="mb-1 flex justify-between items-center">
                  <span className="font-semibold text-[var(--text-dark)]">
                    Your notes
                  </span>
                  <Button
                    onClick={onCreateNote}
                    variant="sidebar"
                    aria-label="Create new note"
                    className="hover:bg-[var(--success)]/50 text-[var(--success)] hover:text-[var(--text-dark)]"
                    title="Create new note"
                  >
                    <Plus size={16} />
                  </Button>
                </li>
                {notes.length === 0 && (
                  <li className="px-2 py-1 text-sm text-[var(--text-secondary)] italic">
                    No notes yet
                  </li>
                )}
                {notes.map((note) => (
                  <li
                    key={note.id}
                    className="group flex items-center justify-between mt-1"
                  >
                    <Button
                      onClick={() => onSelectNote(note.id)}
                      variant="sidebar"
                      className={`flex items-center text-left truncate ${
                        note.id === selectedNoteId
                          ? "bg-[var(--secondary)] text-[var(--primary)]"
                          : "text-[var(--text-dark)]"
                      }`}
                      title={note.title}
                    >
                      <File size={16} />
                      <span className="ml-2 truncate">{note.title}</span>
                    </Button>

                    {/* Delete note */}
                    <Button
                      onClick={() => onDeleteNote(note.id)}
                      variant="sidebar"
                      className="ml-2 opacity-0 group-hover:opacity-100 text-[var(--error)] hover:bg-[var(--error)]/50 hover:text-[var(--text-dark)]"
                      title="Delete note"
                    >
                      <Trash size={16} />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>
          </nav>
        </aside>

        <Button
          onClick={() => setCollapsed(!collapsed)}
          variant="outlined"
          aria-label="Toggle Sidebar"
          className="absolute top-4 left-full ml-1 shadow w-10 h-10 flex items-center justify-center p-0"
        >
          <ChevronLeft
            size={20}
            className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
          />
        </Button>
      </div>
    </>
  );
}
