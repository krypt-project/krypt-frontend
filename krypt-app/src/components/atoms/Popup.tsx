import { useState, ReactNode } from "react";

interface PopupProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  position?: "top" | "bottom" | "left" | "right";
  offset?: number;
}

export default function Popup({
  children,
  content,
  className = "",
  position = "top",
  offset = 8,
}: PopupProps) {
  const [open, setOpen] = useState(false);

  const getPositionClasses = () => {
    switch (position) {
      case "top":
        return `bottom-full mb-${offset} left-1/2 -translate-x-1/2`;
      case "bottom":
        return `top-full mt-${offset} left-1/2 -translate-x-1/2`;
      case "left":
        return `right-full mr-${offset} top-1/2 -translate-y-1/2`;
      case "right":
      default:
        return `left-full ml-${offset} top-1/2 -translate-y-1/2`;
    }
  };

  return (
    <div className="relative inline-block">
      {/* Parent wrapper pour le children */}
      <div
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {children}
      </div>

      {/* Popup avec transition */}
      {open && (
        <div
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          className={`absolute z-50 border border-[var(--border)] bg-[var(--background)] shadow-lg rounded-md p-2
            ${getPositionClasses()} 
            ${className} 
            transition-all duration-200 ease-out transform overflow-y-auto max-h-25
          `}
        >
          {content}
        </div>
      )}
    </div>
  );
}
