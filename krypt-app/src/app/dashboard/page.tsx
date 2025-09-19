"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { User, Palette, PlusIcon, BotMessageSquare } from "lucide-react";

import SidebarNotes from "@/app/dashboard/components/SidebarNotes";
import ActivityBar from "./components/ActivityBar";
import EditorHeader from "@/app/dashboard/components/editor/EditorHeader";
import EditorArea from "@/app/dashboard/components/editor/EditorArea";
import Button from "@/components/atoms/Button";
import SidebarSettings from "./components/SidebarSettings";
import HomeDashboard from "./components/home/HomeDashboard";
import { apiFetch } from "@/utils/api";
import { useAutoSaveNote } from "@/hooks/useAutoSaveNote";
import AccountSettings from "./components/settings/AccountSettings";

/* Style */
import "@/styles/dashboard.css";
import "@/styles/editor.css";
import AppearanceSettings from "./components/settings/AppearanceSettings";
import { ChatBotInterface } from "@/components/molecules/ChatBotInterface";

type Note = {
  id: number;
  title: string;
  content: string;
};
type Activity = "home" | "notes" | "settings" | null;

export default function DashboardPage() {
  const router = useRouter();
  const [notes, setNotes] = useState<Note[]>([]);
  const [selectedNoteId, setSelectedNoteId] = useState<number | null>(null);
  const [selectedSettingId, setSelectedSettingId] = useState<number | null>(
    null
  );
  const [settings] = useState([
    {
      id: 1,
      title: "Account",
      description: "Manage your profile settings",
      icon: <User size={16} className="mr-2 text-[var(--text-dark)]" />,
    },
    {
      id: 2,
      title: "Appearance",
      description: "Customize your application",
      icon: <Palette size={16} className="mr-2 text-[var(--text-dark)]" />,
    },
  ]);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [activity, setActivity] = useState<Activity>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

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

  const handleSelectNote = (id: number) => {
    setSelectedNoteId(id);
    setTab("edit");
  };

  useAutoSaveNote({
    noteId: selectedNote ? selectedNote.id.toString() : null,
    content: selectedNote ? selectedNote.content : "",
    delay: 2000,
    threshold: 50,
    onSave: async (content) => {
      if (!selectedNote) return;
      await apiFetch(`/notes/${selectedNote.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...selectedNote, content }),
      });
    },
  });

  const handleContentChange = (newContent: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNoteId ? { ...note, content: newContent } : note
      )
    );
  };

  const handleRenameNote = async (newTitle: string) => {
    if (!selectedNote) return;

    setNotes((prev) =>
      prev.map((note) =>
        note.id === selectedNote.id ? { ...note, title: newTitle } : note
      )
    );

    try {
      await apiFetch(`/notes/${selectedNote.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...selectedNote, title: newTitle }),
      });
    } catch (err) {
      console.error("Failed to rename note", err);
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    if (!confirm("Are you sure you want to delete this note?")) return;

    try {
      await apiFetch(`/notes/${noteId}`, {
        method: "DELETE",
      });

      setNotes((prev) => prev.filter((n) => n.id !== noteId));

      if (selectedNoteId === noteId) {
        setSelectedNoteId(null);
        setTab("edit");
      }
    } catch (err) {
      console.error("Failed to delete note", err);
    }
  };

  const handleSelectActivity = (next: Activity) => {
    setActivity(next);

    if (next === "home") {
      setSelectedNoteId(null);
    }
    if (next === "settings") {
      setSelectedNoteId(null);
    }
  };

  const handleSelectSetting = (id: number) => {
    setSelectedSettingId(id);
  };

  return (
    <div className="flex h-screen bg-[var(--background)] text-[var(--text-dark)] overflow-hidden">
      {/* Permanent left bar */}
      <ActivityBar active={activity} onSelect={handleSelectActivity} />
      {/* Chat Bot Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="absolute right-4 bottom-4 bg-[var(--primary)] p-4 rounded-full shadow-lg cursor-pointer hover:opacity-90 z-50"
      >
        <BotMessageSquare className="text-[var(--text-light)]" />
      </button>

      {/* Chat Bot Panel */}
      <ChatBotInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />

      {/* Sidebar only if an activity is selected */}
      {activity === "notes" && (
        <SidebarNotes
          notes={notes}
          selectedNoteId={selectedNoteId}
          onSelectNote={handleSelectNote}
          onCreateNote={handleCreateNote}
          onDeleteNote={handleDeleteNote}
        />
      )}
      {activity === "settings" && (
        <SidebarSettings
          settings={settings}
          onSelectSetting={handleSelectSetting}
        />
      )}
      {/* ... */}

      {/* Main content */}
      <main className="flex-1 flex flex-col bg-[var(--secondary)] overflow-hidden">
        {activity === "home" || activity === null ? (
          <HomeDashboard notes={notes} onSelectNote={handleSelectNote} />
        ) : null}

        {activity === "notes" && !selectedNote && (
          <div className="flex flex-col items-center justify-center flex-1 px-6">
            <h2 className="text-3xl font-semibold mb-4">
              Open a note or create one
            </h2>
            <Button
              onClick={handleCreateNote}
              variant="default"
              className="bg-[var(--success)] text-[var(--text-light)] px-6 py-3 hover:bg-[var(--success)]/80"
            >
              <PlusIcon className="mr-2 w-5" />
              Create a new note
            </Button>
          </div>
        )}

        {activity === "notes" && selectedNote && (
          <>
            <EditorHeader
              title={selectedNote.title}
              tab={tab}
              setTab={setTab}
              onRename={handleRenameNote}
            />
            {tab === "edit" ? (
              <EditorArea
                content={selectedNote.content}
                onChange={handleContentChange}
              />
            ) : (
              <div
                className="flex-1 px-12 py-12 tiptap prose max-w-none [&_.ProseMirror]:focus:outline-none w-[70%] mx-auto bg-[var(--background)] shadow-lg overflow-y-scroll"
                dangerouslySetInnerHTML={{ __html: selectedNote.content }}
              />
            )}
          </>
        )}

        {activity === "settings" && (
          <div className="flex-1 flex flex-col">
            {!selectedSettingId ? (
              <div className="flex flex-col items-center justify-center flex-1 px-6">
                <h2 className="text-3xl font-semibold mb-4">
                  Choose a setting
                </h2>
              </div>
            ) : (
              <div className="flex-1 overflow-y-auto">
                {selectedSettingId === null && <AccountSettings />}
                {selectedSettingId === 1 && <AccountSettings />}
                {selectedSettingId === 2 && <AppearanceSettings />}
                {/* ... */}
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
