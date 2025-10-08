import React, { useEffect, useRef, useState } from "react";
import "@/styles/tuto.css";

type TutoProps<T extends HTMLElement> = {
  targetRef: React.RefObject<T>;
  message: string;
  onClose: () => void;
};

export function Tuto<T extends HTMLElement>({
  targetRef,
  message,
  onClose,
}: TutoProps<T>) {
  const [coords, setCoords] = useState({ x: 0, y: 0, width: 0, height: 0 });
  const [popupPos, setPopupPos] = useState<{ left: number; top: number }>({
    left: 0,
    top: 0,
  });
  const tutoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateCoords = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();

        const popupWidth = 320; // largeur estimée du popup
        const popupHeight = 120; // hauteur estimée du popup
        const margin = 10; // espace entre bouton et popup
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;

        let left = rect.x + rect.width + margin; // par défaut à droite
        let top = rect.y;

        // 👉 Si pas assez de place à droite → on le met à gauche
        if (left + popupWidth > viewportWidth) {
          left = rect.x - popupWidth - margin;
        }

        // 👉 Si pas assez de place à gauche → on le met au-dessus
        if (left < 0) {
          left = rect.x;
          top = rect.y - popupHeight - margin;
        }

        // 👉 Si pas assez de place en bas → on le met au-dessus aussi
        if (top + popupHeight > viewportHeight) {
          top = rect.y - popupHeight - margin;
        }

        setCoords({
          x: rect.left,
          y: rect.top,
          width: rect.width,
          height: rect.height,
        });

        setPopupPos({ left, top });
      }
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, [targetRef]);

  useEffect(() => {
    if (tutoRef.current) {
      tutoRef.current.focus();
    }
  }, []);

  return (
    <div
      ref={tutoRef}
      className="tuto-overlay"
      tabIndex={-1}
      onKeyDown={(e) => e.key === "Escape" && onClose()}
    >
      <div
        className="tuto-highlight"
        style={{
          left: `${coords.x - 8}px`,
          top: `${coords.y - 8}px`,
          width: `${coords.width + 16}px`,
          height: `${coords.height + 16}px`,
          borderRadius: "6px",
        }}
      />
      <div
        className="tuto-popup"
        style={{
          left: `${popupPos.left}px`,
          top: `${popupPos.top}px`,
        }}
      >
        <p>{message}</p>
        <button onClick={onClose} className="tuto-close">
          Fermer
        </button>
      </div>
    </div>
  );
}
