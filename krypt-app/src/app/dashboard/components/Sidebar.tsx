"use client";

import { useState } from "react";
import Image from "next/image";

import Button from "@/components/atoms/Button";
import Loader from "@/components/feedback/Loader";

import {
  Home,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft,
  File,
  Plus,
  Trash,
} from "lucide-react";

type Note = {
  id: number;
  title: string;
  content: string;
};

interface SidebarProps {
  notes: Note[];
  selectedNoteId: number | null;
  onSelectNote: (id: number) => void;
  onCreateNote: () => void;
  onHomeClick: () => void;
  onDeleteNote: (id: number) => void;
}

export default function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
  onHomeClick,
  onDeleteNote,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openNotes, setOpenNotes] = useState(true);
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);

    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");
      
      const logoutUrl = process.env.NEXT_PUBLIC_LOGOUT_URL;

      if (!logoutUrl) {
        throw new Error("La variable NEXT_PUBLIC_LOGOUT_URL n'est pas définie");
      }

      const response = await fetch(logoutUrl, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(`Logout failed: ${error}`);
      }

      localStorage.clear();
      window.location.href = "/login-register?mode=login";
    } catch (err) {
      console.error(err);
      alert("An error occurred during logout.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
          <Loader variant="global" size={24} />
        </div>
      )}
      <div className="relative">
        <aside
          className={`flex flex-col bg-white border-r border-gray-200 transition-all duration-300 ${
            collapsed ? "w-16" : "w-64"
          } min-h-screen`}
        >
          {/* Header */}
          <div className="flex items-center p-4 border-b border-gray-200 h-16">
            <div className="flex items-center space-x-2">
              <Image
                src="/favicon-1.png"
                alt="MindVault Logo"
                width={48}
                height={48}
                className="h-14 w-14 object-contain select-none"
                draggable={false}
              />
              {!collapsed && <p className="font-bold text-lg">MindVault</p>}
            </div>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            {/* Home */}
            <ul className="mb-4">
              <li>
                <Button
                  onClick={onHomeClick}
                  variant="sidebar"
                  className={`flex w-full items-center ${
                    !collapsed && "text-gray-900"
                  }`}
                  title="Home"
                >
                  <Home size={18} />
                  {!collapsed && <span className="ml-3">Home</span>}
                </Button>
              </li>
            </ul>

            {/* Notes */}
            <div className="mb-4">
              <Button
                onClick={() => setOpenNotes(!openNotes)}
                variant="sidebar"
                className="flex w-full items-center"
                aria-expanded={openNotes}
                aria-controls="notes-submenu"
                title="Notes"
              >
                <FileText size={18} />
                {!collapsed && (
                  <>
                    <span className="ml-3 flex-1 text-left">Notes</span>
                    <ChevronDown
                      size={16}
                      className={`text-right transition-transform ${
                        openNotes ? "rotate-180" : ""
                      }`}
                    />
                  </>
                )}
              </Button>

              {openNotes && !collapsed && (
                <ul
                  id="notes-submenu"
                  className="pl-8 mt-2 max-h-[calc(100vh-180px)] overflow-y-visible"
                >
                  <li className="mb-1 flex justify-between items-center">
                    <span className="font-semibold text-gray-700">
                      Your notes
                    </span>
                    <Button
                      onClick={onCreateNote}
                      variant="sidebar"
                      aria-label="Create new note"
                      className="hover:bg-green-200 text-green-600"
                      title="Create new note"
                    >
                      <Plus size={16} />
                    </Button>
                  </li>
                  {notes.length === 0 && (
                    <li className="px-2 py-1 text-sm text-gray-500 italic">
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
                            ? "bg-[var(--secondary)] text-[#E88F59]"
                            : "text-gray-800"
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
                        className="ml-2 opacity-0 group-hover:opacity-100 text-red-500 hover:bg-red-100"
                        title="Delete note"
                      >
                        <Trash size={16} />
                      </Button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Settings + Logout */}
            {!collapsed && (
              <>
                <p className="text-gray-500 uppercase text-xs font-semibold mb-2 px-2">
                  Settings
                </p>
                <ul className="space-y-1">
                  <li>
                    <Button
                      href="/settings"
                      variant="sidebar"
                      className="flex w-full items-center hover:bg-gray-100"
                      title="Settings"
                    >
                      <Settings size={18} />
                      <span className="ml-3">Settings</span>
                    </Button>
                  </li>
                  <li>
                    <Button
                      onClick={logout}
                      variant="sidebar"
                      className="flex items-center w-full hover:text-red-500 hover:bg-gray-200"
                      title="Logout"
                    >
                      <LogOut size={18} />
                      <span className="ml-3">Logout</span>
                    </Button>
                  </li>
                </ul>
              </>
            )}
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
