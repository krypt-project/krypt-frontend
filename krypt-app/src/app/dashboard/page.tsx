"use client";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { User, Palette, PlusIcon, BotMessageSquare } from "lucide-react";

import SidebarNotes from "@/app/dashboard/components/SidebarNotes";
import ActivityBar from "./components/ActivityBar";
import EditorHeader from "@/app/dashboard/components/editor/EditorHeader";
import EditorArea from "@/app/dashboard/components/editor/EditorArea";
import Button from "@/components/atoms/Button/Button";
import SidebarSettings from "./components/SidebarSettings";
import HomeDashboard from "./components/home/HomeDashboard";
import { apiFetch } from "@/utils/api";
import { useAutoSaveNote } from "@/hooks/useAutoSaveNote";
import AccountSettings from "./components/settings/AccountSettings";
import { toast } from "react-hot-toast";
import { Tuto } from "@/components/Tuto";
/* Style */
import AppearanceSettings from "./components/settings/AppearanceSettings";
import { ChatBotInterface } from "@/components/molecules/ChatBotInterface";
import Marketplace from "./components/marketplace/MarketPlace";

type Note = {
  id: number;
  title: string;
  content: string;
  modificationDate?: string;
};
type Activity = "home" | "notes" | "settings" | "marketplace" | null;

export default function DashboardPage() {
  const kryptorRef = useRef<HTMLDivElement>(null!);
  const kryptorButtonRef = useRef<HTMLButtonElement>(null!);
  const [showTuto, setShowTuto] = useState(false);
  const [showKryptorButtonTuto, setShowKryptorButtonTuto] = useState(false);

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
      subLabels: ["Profile", "Email", "Password"],
    },
    {
      id: 2,
      title: "Appearance",
      description: "Customize your application",
      icon: <Palette size={16} className="mr-2 text-[var(--text-dark)]" />,
      subLabels: ["Theme", "Accent Color"],
    },
  ]);
  const [tab, setTab] = useState<"edit" | "preview">("edit");
  const [activity, setActivity] = useState<Activity>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const hasShownPanelTuto = localStorage.getItem("hasShownPanelTuto");
    if (!hasShownPanelTuto && isChatOpen) {
      setShowTuto(true);
    }

    const hasShownKryptorButtonTuto = localStorage.getItem(
      "hasShownKryptorButtonTuto"
    );
    if (!hasShownKryptorButtonTuto) {
      const timer = setTimeout(() => {
        setShowKryptorButtonTuto(true);
      }, 5000);

      return () => clearTimeout(timer); 
    }
  }, [isChatOpen]);

  useEffect(() => {
    // const token = localStorage.getItem("token");
    // if (!token) {
    //   router.push("/login-register?mode=login");
    //   return;
    // }

    const hasShownToast = localStorage.getItem("hasShownDashboardToast");
    if (!hasShownToast) {
      toast(
        (t) => (
          <span>
            Tableau de Bord : votre vue d&apos;ensemble de KRYPT.
            <button
              onClick={() => toast.dismiss(t.id)}
              className="ml-2 px-2 py-1 rounded text-white bg-gray-500"
            >
              Fermer
            </button>
          </span>
        ),
        {
          duration: Infinity,
          style: {
            maxWidth: "500px",
            boxShadow: "0px 4px 6px rgba(255, 0, 0, 0.5)",
          },
        }
      );
      // Marque le toast comme affiché
      localStorage.setItem("hasShownDashboardToast", "true");
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
      const notesFromApi: Note[] = await apiFetch("/notes");
      setNotes(notesFromApi);
      setSelectedNoteId(newNote.id);
      setTab("edit");
      toast.success("Note successfully created!");
    } catch (err) {
      console.error("Failed to create note", err);
      toast.error("Failed to create note.");
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
      toast.success("Note succesfully saved !");
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

    try {
      setNotes((prev) =>
        prev.map((note) =>
          note.id === selectedNote.id ? { ...note, title: newTitle } : note
        )
      );

      await apiFetch(`/notes/${selectedNote.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...selectedNote, title: newTitle }),
      });

      const notesFromApi: Note[] = await apiFetch("/notes");
      setNotes(notesFromApi);

      toast.success("Note successfully renamed !");
    } catch (err) {
      console.error("Failed to rename note", err);
      setNotes((prev) =>
        prev.map((note) =>
          note.id === selectedNote.id ? { ...note, title: newTitle } : note
        )
      );
      toast.error("Failed to rename note !");
    }
  };

  const handleDeleteNote = async (noteId: number) => {
    toast(
      (t) => (
        <div
          className="flex flex-col gap-2 p-3 text-white rounded-lg overflow-hidden"
          style={{ maxWidth: "400px" }}
        >
          <span className="text-sm leading-tight">
            Are you sure you want to delete this note?
          </span>
          <div className="flex gap-2 justify-center mt-2">
            <Button
              variant="error"
              size="sm"
              onClick={async () => {
                try {
                  await apiFetch(`/notes/${noteId}`, {
                    method: "DELETE",
                  });
                  setNotes((prev) => prev.filter((n) => n.id !== noteId));
                  if (selectedNoteId === noteId) {
                    setSelectedNoteId(null);
                    setTab("edit");
                  }
                  toast.success("Note successfully deleted!");
                } catch (err) {
                  console.error("Failed to delete note", err);
                  toast.error("Failed to delete note!");
                } finally {
                  toast.dismiss(t.id);
                }
              }}
            >
              Confirm
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => toast.dismiss(t.id)}
            >
              Cancel
            </Button>
          </div>
        </div>
      ),
      {
        duration: Infinity,
        position: "top-center",
        style: {
          background: "#333",
        },
      }
    );
  };
  const handleSelectActivity = (next: Activity) => {
    setActivity(next);

    if (next === "home") {
      setSelectedNoteId(null);
    }
    if (next === "settings") {
      setSelectedNoteId(null);
    }
    if (next === "marketplace") {
      setSelectedNoteId(null);
    }
  };

  const handleSelectSetting = (id: number) => {
    setSelectedSettingId(id);
  };

  return (
    <div className="flex h-screen bg-[var(--secondary)] text-[var(--text-dark)] overflow-x-auto">
      {/* Permanent left bar */}
      <ActivityBar active={activity} onSelect={handleSelectActivity} />
      <button
        onClick={() => setIsChatOpen(true)}
        className={`absolute right-4 bottom-4 bg-[var(--primary)] p-4 rounded-full shadow-lg cursor-pointer hover:opacity-90 z-50 ${
          isChatOpen ? "hidden" : "block"
        }`}
        aria-expanded={isChatOpen}
        aria-controls="chat-panel"
        ref={kryptorButtonRef}
      >
        <BotMessageSquare className="text-[var(--text-light)]" />
      </button>
      {showKryptorButtonTuto && (
        <Tuto<HTMLButtonElement>
          targetRef={kryptorButtonRef}
          message="Accéder à Kryptor : Votre futur assistant IA."
          onClose={() => {
            setShowKryptorButtonTuto(false);
            localStorage.setItem("hasShownKryptorButtonTuto", "true");
          }}
        />
      )}
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
      <main className="flex-1 flex flex-col h-full overflow-auto">
        {activity === "home" || activity === null ? (
          <HomeDashboard notes={notes} onSelectNote={handleSelectNote} />
        ) : null}
        {activity === "notes" && !selectedNote && (
          <div className="flex flex-col items-center justify-center flex-1 px-6 h-full">
            <h2 className="text-3xl font-semibold mb-4">
              Open a note or create one
            </h2>
            <Button
              onClick={handleCreateNote}
              variant="default"
              className="bg-[var(--success)] text-[var(--text-light)] px-6 py-3 hover:bg-[var(--success)]/80"
              // ref={buttonRef}
            >
              <PlusIcon className="mr-2 w-5" />
              Create a new note
            </Button>
          </div>
        )}
        {activity === "notes" && selectedNote && (
          <div className="flex-1 flex flex-col h-full">
            <EditorHeader
              title={selectedNote.title}
              tab={tab}
              setTab={setTab}
              onRename={handleRenameNote}
            />
            <div className="flex-1 overflow-auto">
              <div className="min-w-[900px] max-w-none w-full mx-auto h-full">
                {tab === "edit" ? (
                  <div className="h-full">
                    <EditorArea
                      content={selectedNote.content}
                      onChange={handleContentChange}
                    />
                  </div>
                ) : (
                  <div className="h-full overflow-y-auto tiptap prose max-w-[900px] mx-auto">
                    <div
                      className="w-full"
                      dangerouslySetInnerHTML={{ __html: selectedNote.content }}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
        {activity === "settings" && (
          <div className="flex flex-col overflow-auto h-full">
            {!selectedSettingId ? (
              <div className="flex flex-col items-center justify-center flex-1 px-6 h-full">
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
        {activity === "marketplace" && (
          <div className="flex flex-col overflow-y-scroll h-full">
            <Marketplace />
          </div>
        )}
      </main>
      {/* Chat panel */}
      {showTuto && (
        <Tuto<HTMLDivElement>
          targetRef={kryptorRef}
          message="Bienvenue sur l'interface de Kryptor. Cette section sera bientôt votre espace d'interaction avec notre assistant IA. 
            Revenez bientôt pour bénéficier d'un accompagnement personnalisé."
          onClose={() => {
            setShowTuto(false);
            localStorage.setItem("hasShownPanelTuto", "true");
          }}
        />
      )}
      <aside
        id="chat-panel"
        className={`h-full bg-[var(--background)] border-l border-[rgba(0,0,0,0.06)] transition-all duration-300 ease-in-out overflow-y-auto ${
          isChatOpen ? "w-[35%]" : "w-0"
        } flex flex-col`}
        style={{ top: 0, marginTop: 0, paddingTop: 0 }}
        aria-hidden={!isChatOpen}
      >
        <div className="h-full w-full">
          {isChatOpen && (
            <ChatBotInterface
              isOpen={isChatOpen}
              onClose={() => setIsChatOpen(false)}
              ref={kryptorRef}
            />
          )}
        </div>
      </aside>
    </div>
  );
}
