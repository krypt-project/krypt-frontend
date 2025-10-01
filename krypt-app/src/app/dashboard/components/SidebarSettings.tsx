"use client";

import { useEffect, useState } from "react";

import Button from "@/components/atoms/Button/Button";
import Loader from "@/components/feedback/Loader";
import Input from "@/components/atoms/Input/Input";

import { Search, ChevronLeft } from "lucide-react";

type Settings = {
  id: number;
  title: string;
  icon?: React.ReactNode;
  description: string;
  subLabels: string[];
};

interface SidebarSettingsProps {
  settings: Settings[];
  onSelectSetting: (id: number) => void;
}

export default function SidebarSettings({
  settings,
  onSelectSetting,
}: SidebarSettingsProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [loading] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const filteredSettings = settings.filter((setting) => {
    const titleMatch = setting.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const subLabelsMatch =
      setting.subLabels?.some((label) =>
        label.toLowerCase().includes(searchTerm.toLowerCase())
      ) ?? false;
    return titleMatch || subLabelsMatch;
  });
  useEffect(() => {
    if (filteredSettings.length > 0 && searchTerm) {
      const firstSettingId = filteredSettings[0].id;
      onSelectSetting(firstSettingId);
    }
  }, [filteredSettings, searchTerm, onSelectSetting]);
  
  return (
    <>
      {loading && (
        <div className="fixed inset-0 bg-[var(--background)] flex items-center justify-center z-50">
          <Loader variant="global" size={24} />
        </div>
      )}

      <div className="relative">
        <aside
          className={`flex flex-col bg-[var(--background)] border-r border-[var(--border)] transition-all duration-300 overflow-hidden ${
            collapsed ? "w-0 border-none" : "w-64"
          } min-h-screen`}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 h-17 border-b border-[var(--border)]">
            <h2 className="text-lg font-semibold">Settings</h2>
          </div>
          {/* Menu */}
          <nav className="flex-1 overflow-y-auto px-2 py-4">
            {/* Searchbar */}
            <div className="mb-4">
              <div
                className={`flex items-center rounded-md px-3 py-3 ${
                  collapsed ? "hidden" : "block"
                }`}
              >
                <Search size={16} className="text-[var(--text-secondary)]" />
                {!collapsed && (
                  <Input
                    type="text"
                    placeholder="Search settings ..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                )}
              </div>
            </div>

            {/* Settings */}
            <ul className="space-y-2">
              {filteredSettings.map((setting) => (
                <li key={setting.id}>
                  <Button
                    variant="sidebar"
                    className="justify-start w-full text-left"
                    onClick={() => onSelectSetting(setting.id)}
                  >
                    {setting.icon}
                    {setting.title}
                  </Button>
                </li>
              ))}
            </ul>
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
