import { useState } from "react";
import { ChevronDown } from "lucide-react";
import Button from "./Button";

type Option = {
  value: string;
  label: string;
};

type SelectProps = {
  options: Option[];
  placeholder?: string;
  button?: React.ReactNode;
  onChange?: (value: string) => void;
};

export function Select({
  options,
  placeholder = "Choose...",
  button,
  onChange,
}: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (value: string) => {
    setSelected(value);
    setIsOpen(false);
    if (onChange) onChange(value);
  };

  return (
    <div className="relative w-[60%] ">
      {/* Select Button */}
      <Button
        variant="outlined"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-3 py-2 bg-[var(--background)] border rounded-lg shadow-sm text-sm font-medium transition"
      >
        <span>
          {selected
            ? options.find((o) => o.value === selected)?.label
            : placeholder}
        </span>
        <ChevronDown
          className={`absolute mr-4 w-4 h-4 transition-transform right-0 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </Button>

      {/* Dropdown avec transition */}
      <div
        className={`absolute left-0 right-0 mt-1 bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg z-10 overflow-hidden transform transition-all duration-300 ${
          isOpen
            ? "max-h-60 opacity-100 scale-100"
            : "max-h-0 opacity-0 scale-95 pointer-events-none"
        }`}
      >
        <ul className="max-h-48 overflow-y-auto">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-3 py-2 text-sm hover:bg-[var(--secondary)] cursor-pointer transform transition-all duration-300 ${
                isOpen
                  ? "max-h-60 opacity-100 scale-100"
                  : "max-h-0 opacity-0 scale-95 pointer-events-none"
              }`}
            >
              {option.label}
            </li>
          ))}
        </ul>

        {button && (
          <div className="border-t border-[var(--border)] p-2">{button}</div>
        )}
      </div>
    </div>
  );
}
