"use client";

import { useMemo } from "react";
import { FileText, Database, Zap } from "lucide-react";
import { Card } from "@/components/atoms/Card/Card";
import {
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";

import { FormattedDate } from "@/utils/FormateDate";

type Note = {
  id: number;
  title: string;
  content: string;
  modificationDate?: string;
};

interface HomeDashboardProps {
  notes: Note[];
  onSelectNote: (id: number) => void;
}

export default function HomeDashboard({
  notes,
  onSelectNote,
}: HomeDashboardProps) {
  const recentNotes = useMemo(() => {
    return [...notes]
      .sort(
        (a, b) =>
          new Date(b.modificationDate || "").getTime() -
          new Date(a.modificationDate || "").getTime()
      )
      .slice(0, 5);
  }, [notes]);

  // Fake data for metrics
  const tokensRemaining = 12340;
  const storageUsed = 2.1;
  const storageTotal = 5;
  const storagePercent = Math.round((storageUsed / storageTotal) * 100);

  const storageData = [
    { name: "Used", value: storagePercent },
    { name: "Free", value: 100 - storagePercent },
  ];

  const tokensData = [{ name: "Tokens", value: 75 }];
  const notesTrendData = [
    { day: "Mon", notes: 2 },
    { day: "Tue", notes: 4 },
    { day: "Wed", notes: 1 },
    { day: "Thu", notes: 3 },
    { day: "Fri", notes: 5 },
    { day: "Sat", notes: 2 },
    { day: "Sun", notes: 4 },
  ];

  return (
    <div className="flex flex-col flex-1 p-8 space-y-8 overflow-y-auto bg-[var(--secondary)]">
      {/* Title */}
      <h2 className="text-3xl font-semibold">Welcome back</h2>

      {/* Metrics with charts */}
      <div className="w-auto flex sm:grid-cols-3 gap-6">
        {/* Tokens */}
        <Card className="flex items-center justify-between align-middle p-6 hover:bg-[var(--background)]/50 transition cursor-pointer">
          <div className="flex items-center justify-center align-middle space-x-4 cursor-pointer">
            <Zap className="text-[var(--warning)]" />
            <div>
              <p className="text-sm text-[var(--text-secondary)]">
                AI Tokens Remaining
              </p>
              <p className="text-lg font-semibold">
                {tokensRemaining.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="w-auto h-20 mt-2 cursor-pointer">
            <ResponsiveContainer>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={10}
                data={tokensData}
                className="cursor-pointer"
              >
                <RadialBar
                  dataKey="value"
                  fill="var(--warning)"
                  stroke="var(--border)"
                  cornerRadius={5}
                />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Storage */}
        <Card className="flex items-center justify-between p-6 hover:bg-[var(--background)]/50 transition cursor-pointer">
          <div className="flex items-center space-x-4 cursor-pointer">
            <Database className="text-[var(--background-2)]" />
            <div>
              <p className="text-sm text-[var(--text-secondary)]">
                Storage Used
              </p>
              <p className="text-lg font-semibold">
                {storageUsed} GB / {storageTotal} GB
              </p>
            </div>
          </div>
          <div className="w-auto h-20 mt-2 cursor-pointer">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={storageData}
                  dataKey="value"
                  innerRadius="70%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={-270}
                  stroke="var(--border)"
                  className="cursor-pointer"
                >
                  <Cell fill="var(--background-2)" />
                  <Cell fill="var(--background)" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Notes trend */}
        <Card className="flex flex-col justify-between p-6 w-100 hover:bg-[var(--background)]/50 transition cursor-pointer">
          <div className="flex items-center space-x-4 mb-4 cursor-pointer">
            <FileText className="text-[var(--success)]" />
            <div>
              <p className="text-sm text-[var(--text-secondary)]">
                Total Notes
              </p>
              <p className="text-lg font-semibold">{notes.length}</p>
            </div>
          </div>
          <div className="w-full h-20 cursor-pointer">
            <ResponsiveContainer>
              <LineChart data={notesTrendData}>
                <Line
                  type="monotone"
                  dataKey="notes"
                  stroke="var(--success)"
                  strokeWidth={2}
                  dot={false}
                  className="cursor-pointer"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Recent Notes */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Notes</h3>
        <div className="space-y-3">
          {recentNotes.map((note) => (
            <button
              key={note.id}
              onClick={() => onSelectNote(note.id)}
              className="w-full bg-[var(--background)] border border-[var(--border)] text-left p-4 rounded-lg shadow hover:bg-[var(--background)]/50 transition cursor-pointer"
            >
              <p className="font-medium">{note.title}</p>
              <p className="text-sm text-[var(--text-secondary)] truncate">
                {note.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-1">
                Last updated:{" "}
                {note.modificationDate ? <FormattedDate date={note.modificationDate} /> : "—"}
              </p>
            </button>
          ))}

          {recentNotes.length === 0 && (
            <p className="text-[var(--text-secondary)]">No recent notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
