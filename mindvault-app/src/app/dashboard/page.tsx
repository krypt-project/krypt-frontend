"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "lucide-react";

import Sidebar from "@/components/dashboard/Sidebar";
import EditorHeader from "@/components/dashboard/EditorHeader";
import EditorArea from "@/components/dashboard/EditorArea";
import { apiFetch } from "@/lib/api";

type Note = {
  id: number;
  title: string;
  content: string;
};

export default function DashboardPage() {
  const router = useRouter();

  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [tab, setTab] = useState<"edit" | "preview">("edit");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login-register?mode=login");
      return;
    }

    (async () => {
      try {
        const notesFromApi: Note[] = await apiFetch("/notes");
        setNotes(notesFromApi);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
      }
    })();
  }, [router]);

  const selectedNote = notes.find((n) => n.id === selectedNoteId);

  const handleCreateNote = async () => {
    try {
      const newNote: Note = await apiFetch("/notes", {
        method: "POST",
        body: JSON.stringify({
          title: `Untitled ${notes.length + 1}`,
          content: "",
        }),
      });

      setNotes([newNote, ...notes]);
      setSelectedNoteId(newNote.id);
      setTab("edit");
    } catch (err) {
      console.error("Failed to create note", err);
    }
  };

  const handleHomeClick = () => {
    setSelectedNoteId(null);
    setTab("edit");
  };

  const handleSelectNote = (id: number) => {
    setSelectedNoteId(id);
    setTab("edit");
  };

  const handleContentChange = (newContent: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNoteId ? { ...note, content: newContent } : note
      )
    );
  };

  const handleSaveNote = async () => {
    try {
      const note = notes.find((n) => n.id === selectedNoteId);
      if (!note) return;

      await apiFetch(`/notes/${note.id}`, {
        method: "PUT",
        body: JSON.stringify(note),
      });
    } catch (err) {
      console.error("Failed to update note", err);
    }
  };

  const handleDeleteNote = async () => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      const note = notes.find((n) => n.id === selectedNoteId);
      if (!note) return;

      await apiFetch(`/notes/${note.id}`, {
        method: "DELETE",
      });

      setNotes((prev) => prev.filter((n) => n.id !== note.id));
      setSelectedNoteId(null);
      setTab("edit");
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <Sidebar
        notes={notes}
        selectedNoteId={selectedNoteId}
        onSelectNote={handleSelectNote}
        onCreateNote={handleCreateNote}
        onHomeClick={handleHomeClick}
        onDeleteNote={handleDeleteNote}
      />

      <main className="flex-1 flex flex-col">
        {!selectedNote ? (
          <div className="flex flex-col items-center justify-center flex-1 px-6">
            <h2 className="text-3xl font-semibold mb-4">
              Open a note or create one
            </h2>
            <button
              onClick={handleCreateNote}
              className="rounded bg-green-600 text-white px-6 py-3 hover:bg-green-700 transition cursor-pointer flex items-center"
            >
              <PlusIcon className="mr-2 w-5" />
              Create a new note
            </button>
          </div>
        ) : (
          <>
            <EditorHeader
              title={selectedNote.title}
              tab={tab}
              setTab={setTab}
            />
            <EditorArea
              content={selectedNote.content}
              onChange={handleContentChange}
              onBlur={handleSaveNote}
            />
          </>
        )}
      </main>
    </div>
  );
}
