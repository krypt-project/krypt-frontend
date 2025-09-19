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

type Note = {
  id: number;
  title: string;
  content: string;
  updatedAt?: string;
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
      .sort((a, b) => {
        const da = new Date(a.updatedAt || "").getTime();
        const db = new Date(b.updatedAt || "").getTime();
        return db - da;
      })
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

  const tokensData = [{ name: "Tokens", value: 75 }]; // % bar
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
    <div className="flex flex-col flex-1 p-8 space-y-8 overflow-y-auto">
      {/* Title */}
      <h2 className="text-3xl font-semibold">Welcome back 👋</h2>

      {/* Metrics with charts */}
      <div className="w-auto flex sm:grid-cols-3 gap-6">
        {/* Tokens */}
        <Card className="flex items-center justify-between align-middle p-6">
          <div className="flex items-center justify-center align-middle space-x-4">
            <Zap className="text-yellow-500" />
            <div>
              <p className="text-sm text-gray-500">AI Tokens Remaining</p>
              <p className="text-lg font-semibold">
                {tokensRemaining.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="w-auto h-20 mt-2">
            <ResponsiveContainer>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="70%"
                outerRadius="100%"
                barSize={10}
                data={tokensData}
              >
                <RadialBar dataKey="value" fill="#facc15" cornerRadius={5} />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Storage */}
        <Card className="flex items-center justify-between p-6">
          <div className="flex items-center space-x-4">
            <Database className="text-violet-500" />
            <div>
              <p className="text-sm text-gray-500">Storage Used</p>
              <p className="text-lg font-semibold">
                {storageUsed} GB / {storageTotal} GB
              </p>
            </div>
          </div>
          <div className="w-auto h-20 mt-2">
            <ResponsiveContainer>
              <PieChart>
                <Pie
                  data={storageData}
                  dataKey="value"
                  innerRadius="70%"
                  outerRadius="100%"
                  startAngle={90}
                  endAngle={-270}
                >
                  <Cell fill="#8b5cf6" />
                  <Cell fill="#e5e7eb" />
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Notes trend */}
        <Card className="flex flex-col justify-between p-6 w-100">
          <div className="flex items-center space-x-4 mb-4">
            <FileText className="text-blue-500" />
            <div>
              <p className="text-sm text-gray-500">Total Notes</p>
              <p className="text-lg font-semibold">{notes.length}</p>
            </div>
          </div>
          <div className="w-full h-20">
            <ResponsiveContainer>
              <LineChart data={notesTrendData}>
                <Line
                  type="monotone"
                  dataKey="notes"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  dot={false}
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
              className="w-full bg-white text-left p-4 rounded-lg shadow hover:bg-gray-50 transition"
            >
              <p className="font-medium">{note.title}</p>
              <p className="text-sm text-gray-500 truncate">
                {note.content.replace(/<[^>]+>/g, "").slice(0, 80)}...
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Last updated:{" "}
                {note.updatedAt
                  ? new Date(note.updatedAt).toLocaleString()
                  : "—"}
              </p>
            </button>
          ))}

          {recentNotes.length === 0 && (
            <p className="text-gray-500">No recent notes yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}
