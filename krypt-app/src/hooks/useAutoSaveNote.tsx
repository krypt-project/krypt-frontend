"use client";

import { useEffect, useRef } from "react";
import { openDB } from "idb";

type UseAutoSaveNoteProps = {
  noteId: string | null;
  content: string;
  delay?: number;
  onSave: (content: string) => Promise<void>;
};

export function useAutoSaveNote({
  noteId,
  content,
  delay = 2000,
  onSave,
}: UseAutoSaveNoteProps) {
  const lastSavedContent = useRef(content);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Init DB
  useEffect(() => {
    openDB("notes-db", 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains("notes")) {
          db.createObjectStore("notes");
        }
      },
    });
  }, []);

  // Save into IndexedDB immediately (always safe locally)
  useEffect(() => {
    if (!noteId) return;

    const saveLocal = async () => {
      const db = await openDB("notes-db", 1);
      await db.put("notes", content, noteId);
    };
    saveLocal();
  }, [content, noteId]);

  // Debounced save to server
  useEffect(() => {
    if (!noteId || content === lastSavedContent.current) return;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      try {
        await onSave(content);
        lastSavedContent.current = content;
      } catch (err) {
        console.error("Failed to save to server:", err);
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [content, noteId, delay, onSave]);
}
