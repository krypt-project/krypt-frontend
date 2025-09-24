"use client";

import { useEffect, useState } from "react";
import Button from "@/components/atoms/Button/Button";

type Theme = "light" | "dark";

export default function AppearanceSettings() {
  const [theme, setTheme] = useState<Theme>("light");

  // Load saved theme from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme;
    if (savedTheme) {
      setTheme(savedTheme);
      document.documentElement.setAttribute("data-theme", savedTheme);
    }
  }, []);

  const handleThemeChange = (newTheme: Theme) => {
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="flex-1 p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-8 text-[var(--text-dark)]">
        Appearance Settings
      </h1>

      <div className="bg-[var(--background)] shadow-md rounded-lg p-6 space-y-6">
        {/* Theme Selection */}
        <div className="flex flex-col space-y-2">
          <label className="text-sm font-semibold text-[var(--text-secondary)]">
            Theme
          </label>
          <div className="flex space-x-4 mt-2">
            <Button
              onClick={() => handleThemeChange("light")}
              variant={theme === "light" ? "success" : "outlined"}
              className="px-6 py-2"
            >
              Light
            </Button>
            <Button
              onClick={() => handleThemeChange("dark")}
              variant={theme === "dark" ? "success" : "outlined"}
              className="px-6 py-2"
            >
              Dark
            </Button>
          </div>
        </div>

        {/* Accent Color Example */}
        <div className="flex flex-col space-y-2 mt-4">
          <label className="text-sm font-semibold text-[var(--text-secondary)]">
            Accent Color
          </label>
          <div className="flex space-x-2">
            {["#00b0cf", "#cdac83", "#5554dc", "#86BAA1", "#B04071"].map((color) => (
              <Button
                key={color}
                variant="outlined"
                onClick={() => {
                  document.documentElement.style.setProperty("--primary", color);
                  localStorage.setItem("accentColor", color);
                }}
                className="p-1"
              >
                <div
                  className="w-6 h-6 rounded-full border-2 border-[var(--border)] hover:scale-110 cursor-pointer transition-transform"
                  style={{ backgroundColor: color }}
                />
              </Button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
