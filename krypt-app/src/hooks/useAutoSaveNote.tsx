"use client";

import { useEffect, useRef } from "react";
import { openDB } from "idb";

type UseAutoSaveNoteProps = {
  noteId: string | null;
  content: string;
  delay?: number;
  threshold?: number;
  onSave: (content: string) => Promise<void>;
};

export function useAutoSaveNote({
  noteId,
  content,
  delay = 2000,
  threshold = 50,
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

  // Debounced + threshold save to server
  useEffect(() => {
    if (!noteId) return;

    const diff =
      Math.abs(content.length - lastSavedContent.current.length) >= threshold;

    if (timeoutRef.current) clearTimeout(timeoutRef.current);

    timeoutRef.current = setTimeout(async () => {
      if (content !== lastSavedContent.current || diff) {
        await onSave(content);
        lastSavedContent.current = content;
      }
    }, delay);

    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [noteId, content, delay, threshold, onSave]);
}
