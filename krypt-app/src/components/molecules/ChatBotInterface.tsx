// /components/molecules/ChatBotInterface.tsx
"use client";

import React, { useState, useRef, useEffect } from "react";
import { BotMessageSquare, Send, X } from "lucide-react";
import Button from "../atoms/Button/Button";
import Badge from "../atoms/Badge/Badge";
import Input from "../atoms/Input/Input";
import { Select } from "../atoms/Select";
import { apiAIFetch } from "@/utils/api";

const chats = [
  { value: "chat1", label: "Hello World!" },
  { value: "chat2", label: "Note editing" },
  { value: "chat3", label: "Theme change" },
  { value: "chat4", label: "Tag generation" },
  { value: "chat5", label: "Profile picture change" },
  { value: "chat6", label: "Note generation" },
];

type Props = {
  isOpen: boolean;
  onClose: () => void;
  apiBaseUrl?: string;
  token?: string;
};

type Message = {
  sender: "user" | "bot";
  text: string;
};

export function ChatBotInterface({ isOpen, onClose, token }: Props) {
  const chatZoneRef = useRef<HTMLDivElement | null>(null);
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: "bot",
      text: "Hi 👋, I'm KRYPTOR. What can I help you with today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const MAX_INPUT_HEIGHT = 200;

  useEffect(() => {
    if (chatZoneRef.current) {
      chatZoneRef.current.scrollTop = chatZoneRef.current.scrollHeight;
    }
  }, [messages]);

  const getBotResponse = async (message: string): Promise<string> => {
    try {
      const data = await apiAIFetch("chatbot", {
        method: "POST",
        body: JSON.stringify({ message }),
      });

      return data.reply || "No reply received.";
    } catch (err) {
      console.error("Chat API error:", err);
      return "Sorry 😕, I couldn’t generate a response. Please try again later.";
    }
  };

  // === Handle sending a message ===
  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: Message = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const botReply = await getBotResponse(input);
    setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    setIsLoading(false);
  };

  return (
    <div
      className={`fixed top-0 right-0 h-screen border-b border-l border-[var(--border)] w-[35%] bg-[var(--background)] text-[var(--text-dark)] shadow-xl z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-2 border-b border-[var(--border)] h-17">
        <div className="flex items-center gap-2">
          <BotMessageSquare size={20} />
          <span className="font-semibold">KRYPTOR</span>
        </div>

        <div className="flex flex-row items-center gap-2 w-full justify-center">
          <Select
            options={chats}
            placeholder="All chats"
            button={
              <Button
                variant="success"
                className="flex justify-center w-full"
                onClick={() =>
                  setMessages([{ sender: "bot", text: "New chat started 🚀" }])
                }
              >
                New Chat
              </Button>
            }
          />
        </div>
        <Button variant="error" onClick={onClose}>
          <X size={16} />
        </Button>
      </div>

      {/* Context Tags */}
      <div className="flex flex-col items-start justify-between p-4 border-b border-[var(--border)] bg-[var(--secondary)]">
        <span className="font-semibold">Global:</span>
        <div className="flex flex-wrap w-full mt-2 gap-2">
          <Badge text="Notes" selectable color="outlined" />
          <Badge text="Settings" selectable color="outlined" />
          <Badge text="Dashboard" selectable color="outlined" />
          <Badge text="Account" selectable color="outlined" />
        </div>
      </div>

      {/* Chat Area */}
      <div
        ref={chatZoneRef}
        className="flex-1 overflow-y-scroll p-4 space-y-3 bg-[var(--secondary)] pb-5"
      >
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-3 ${
              msg.sender === "user" ? "justify-end" : ""
            }`}
          >
            <p
              className={`flex-wrap px-3 py-2 max-w-[90%] rounded-2xl ${
                msg.sender === "user"
                  ? "bg-[var(--primary)]/30"
                  : "bg-[var(--background)] text-[var(--text-dark)]"
              }`}
            >
              {msg.text}
            </p>
          </div>
        ))}
        {isLoading && (
          <div className="flex items-start gap-3">
            <p className="px-3 py-2 max-w-[90%] rounded-2xl bg-[var(--background)] text-[var(--text-dark)] opacity-75">
              Typing...
            </p>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="flex flex-col p-4 border-t border-[var(--border)] justify-end gap-2">
        <div className="flex flex-row gap-2 items-end">
          <div className="w-full max-w-[100%] relative min-h-[2.5rem]">
            <Input
              placeholder="Ask something..."
              variant="shadow"
              multiline
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              className="absolute bottom-0 left-0 right-0 resize-none"
              style={{ transition: "height 120ms ease" }}
            />
          </div>
          <div className="flex align-middle justify-center">
            <Button variant="success" onClick={handleSend} disabled={isLoading}>
              <Send size={18} className="text-[var(--text-light)]" />
            </Button>
          </div>
        </div>
        <div className="flex justify-center">
          <p className="text-[.7rem]">
            KRYPTOR may produce incorrect information. Please verify critical
            facts.
          </p>
        </div>
      </div>
    </div>
  );
}
