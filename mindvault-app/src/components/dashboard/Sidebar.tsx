"use client";

import Link from "next/link";
import { useState } from "react";
import Image from "next/image";
import {
  Home,
  FileText,
  Settings,
  LogOut,
  ChevronDown,
  ChevronLeft,
  File,
  Plus,
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
}

export default function Sidebar({
  notes,
  selectedNoteId,
  onSelectNote,
  onCreateNote,
  onHomeClick,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [openNotes, setOpenNotes] = useState(true);

  const logout = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const response = await fetch("http://localhost:8080/api/auth/logout", {
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
    }
  };

  return (
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
              src="/favicon.png"
              alt="MindVault Logo"
              width={32}
              height={32}
              className="h-8 w-8 object-contain select-none"
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
              <button
                onClick={onHomeClick}
                className={`flex items-center w-full p-2 rounded hover:bg-gray-200 transition cursor-pointer ${
                  !collapsed && "text-gray-900"
                }`}
                title="Home"
              >
                <Home size={18} />
                {!collapsed && <span className="ml-3">Home</span>}
              </button>
            </li>
          </ul>

          {/* Notes */}
          <div className="mb-4">
            <button
              onClick={() => setOpenNotes(!openNotes)}
              className="flex items-center w-full p-2 rounded hover:bg-gradient-to-tr hover:from-[#FBD5C2] hover:to-[#B8B9F7] hover:text-black cursor-pointer transition"
              aria-expanded={openNotes}
              aria-controls="notes-submenu"
            >
              <FileText size={18} />
              {!collapsed && (
                <>
                  <span className="ml-3 flex-1 text-left">Notes</span>
                  <ChevronDown
                    size={16}
                    className={`transition-transform ${
                      openNotes ? "rotate-180" : ""
                    }`}
                  />
                </>
              )}
            </button>

            {openNotes && !collapsed && (
              <ul
                id="notes-submenu"
                className="pl-8 mt-2 max-h-[calc(100vh-180px)] overflow-y-auto"
              >
                <li className="mb-1 flex justify-between items-center">
                  <span className="font-semibold text-gray-700">
                    Your notes
                  </span>
                  <button
                    onClick={onCreateNote}
                    aria-label="Create new note"
                    className="p-1 rounded hover:bg-green-200 text-green-600 transition cursor-pointer"
                  >
                    <Plus size={16} />
                  </button>
                </li>
                {notes.length === 0 && (
                  <li className="px-2 py-1 text-sm text-gray-500 italic">
                    No notes yet
                  </li>
                )}
                {notes.map((note) => (
                  <li key={note.id}>
                    <button
                      onClick={() => onSelectNote(note.id)}
                      className={`flex items-center w-full p-2 rounded hover:bg-gray-200 hover:text-gray-800 text-left truncate cursor-pointer transition ${
                        note.id === selectedNoteId
                          ? "bg-gray-400/80 text-white py-2"
                          : "text-gray-800"
                      }`}
                      title={note.title}
                    >
                      <File size={16} />
                      <span className="ml-2 truncate">{note.title}</span>
                    </button>
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
                  <Link
                    href="/settings"
                    className="flex items-center p-2 rounded hover:bg-gray-100 transition"
                    title="Settings"
                  >
                    <Settings size={18} />
                    <span className="ml-3">Settings</span>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="flex items-center w-full p-2 rounded hover:text-red-500 hover:bg-gray-200 transition cursor-pointer"
                    title="Logout"
                  >
                    <LogOut size={18} />
                    <span className="ml-3">Logout</span>
                  </button>
                </li>
              </ul>
            </>
          )}
        </nav>
      </aside>

      <button
        onClick={() => setCollapsed(!collapsed)}
        aria-label="Toggle Sidebar"
        className="absolute top-4 left-full ml-1 bg-white border border-gray-300 rounded p-1 shadow hover:bg-gray-100 transition cursor-pointer"
      >
        <ChevronLeft
          size={20}
          className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}
