// /components/molecules/ChatBotInterface.tsx
"use client";
import React from "react";
import { BotMessageSquare, Send, X, Sun, Moon } from "lucide-react";
import Button from "../atoms/Button/Button";
import Badge from "../atoms/Badge/Badge";
import Input from "../atoms/Input/Input";
import { Select } from "../atoms/Select";

const chats = [
  { value: "chat1", label: "Hello World !" },
  { value: "chat2", label: "Edition d'une note" },
  { value: "chat3", label: "Changement de theme" },
  { value: "chat4", label: "Génération de tags" },
  { value: "chat5", label: "Changement de photo de profile" },
  { value: "chat6", label: "Génération de note" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export function ChatBotInterface({ isOpen, onClose }: Props) {
  const chatZoneRef = React.useRef<HTMLDivElement | null>(null);

  const MAX_INPUT_HEIGHT = 200;

  return (
    <div
      className={`fixed top-0 right-0 h-screen border border-[var(--border)] w-[35%] bg-[var(--background)] text-[var(--text-dark)] shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-[var(--border)] h-17">
        <div className="flex items-center gap-2">
          <BotMessageSquare size={20} />
          <span className="font-semibold">KRYPTOR</span>
        </div>

        {/* Select + bouton */}
        <div className="flex flex-row items-center gap-2 w-full justify-center">
          <Select
            options={chats}
            placeholder="All chat"
            button={
              <Button variant="success" className="flex justify-center w-full">
                New Chat
              </Button>
            }
          />
        </div>
        <Button variant="error" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>

      {/* Chat Bot Specifications */}
      <div className="flex flex-col items-start justify-between p-4 border-b border-[var(--border)] bg-[var(--secondary)] ">
        <span className="font-semibold">Global :</span>
        <div className="flex flex-wrap w-full mt-2 gap-2">
          <Badge text="Notes" selectable={true} color="outlined" />
          <Badge text="Settings" selectable={true} color="outlined" />
          <Badge text="Dashboard" selectable={true} color="outlined" />
          <Badge text="Account" selectable={true} color="outlined" />
        </div>
      </div>

      {/* Chat Zone */}
      <div
        ref={chatZoneRef}
        className="flex-1 overflow-y-scroll p-4 space-y-3 bg-[var(--secondary)] pb-5"
      >
        {/* Exemple de messages */}
        <div className="flex items-start gap-3 ">
          <p className="flex-wrap px-3 py-2 max-w-[90%] rounded-2xl text-[var(--text-dark)]">
            Hi, how I can help you ?
          </p>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <p className="flex-wrap bg-[var(--primary)]/30 px-3 max-w-[90%] py-2 w-auto rounded-2xl">
            Hey 👋 <br />
            How are you today ?
          </p>
        </div>
        <div className="flex items-start gap-3">
          <p className="flex-wrap px-3 py-2 max-w-[90%] rounded-2xl w-auto text-[var(--text-dark)]">
            I&apos;m fine thank you !<br />
            You are in the <b>Global</b> chatbot, you can ask me to explain you
            something or accomplishe a task for you
          </p>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <p className="flex-wrap bg-[var(--primary)]/30 px-3 py-2 max-w-[90%] w-auto rounded-2xl">
            Can you change the application theme to light/dark ?
          </p>
        </div>
        <div className="flex items-start gap-3">
          <span className="flex-wrap px-3 py-2 max-w-[90%] w-auto rounded-2xl text-[var(--text-dark)]">
            For sure ! <br />
            What color theme do you want ? (Click on your choice)
            <div className="flex gap-2 justify-center">
              <Button variant="outlined" className="mt-2">
                <Sun size={16} />
                Light
              </Button>
              <Button variant="outlined" className="mt-2">
                <Moon size={16} />
                Dark
              </Button>
            </div>
          </span>
        </div>
        <div className="flex items-start gap-3">
          <p className="flex-wrap px-3 py-2 max-w-[90%] w-auto rounded-2xl text-[var(--text-dark)]">
            Theme successfuly change to <b>Dark</b>
          </p>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <p className="flex-wrap bg-[var(--primary)]/30 px-3 py-2 max-w-[90%] w-auto rounded-2xl">
            Thank&apos;s
          </p>
        </div>
        <div className="flex items-start gap-3">
          <p className="flex-wrap px-3 py-2 max-w-[90%] w-auto rounded-2xl text-[var(--text-dark)]">
            My pleasure ! Don&apos;t hesitate to ask me something else
          </p>
        </div>
        <div className="flex items-start gap-3 justify-end">
          <p className="flex-wrap bg-[var(--primary)]/30 px-3 py-2 max-w-[90%] w-auto rounded-2xl">
            KRYPTOR peut commettre des erreurs. Il est recommandé de vérifier
            les informations importantes. Voir les{" "}
            <a href="#" className="underline">
              conditions d&apos;utilisation
            </a>{" "}
            des données.
          </p>
        </div>
      </div>

      {/* Send Zone */}
      <div className="flex flex-col p-4 border-[var(--border)] justify-end gap-2">
        <div className="flex flex-row gap-2 items-end">
          <div className="w-full max-w-[100%] relative min-h-[2.5rem]">
            <Input
              placeholder="Pose ta question..."
              variant="shadow"
              multiline
              className="absolute bottom-0 left-0 right-0 resize-none"
              style={{ transition: "height 120ms ease" }}
              onInput={(e) => {
                const target = e.target as unknown as HTMLTextAreaElement;
                target.style.height = "auto";
                const measured = target.scrollHeight;
                const clamped = Math.min(measured, MAX_INPUT_HEIGHT);
                if (measured > MAX_INPUT_HEIGHT) {
                  target.style.overflow = "auto";
                } else {
                  target.style.overflow = "hidden";
                }
                target.style.height = `${clamped}px`;
                target.dataset.prevHeight = String(clamped);
                if (chatZoneRef.current) {
                  chatZoneRef.current.style.paddingBottom = `${clamped + 16}px`;
                }
              }}
            />
          </div>
          <div className="flex align-middle justify-center">
            <Button variant="success">
              <Send size={18} className="text-[var(--text-light)]" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-[.7rem]">
            KRYPTOR peut commettre des erreurs. Il est recommandé de vérifier
            les informations importantes. Voir les{" "}
            <a href="#" className="underline">
              conditions d&apos;utilisation
            </a>{" "}
            des données.
          </p>
        </div>
      </div>
    </div>
  );
}
