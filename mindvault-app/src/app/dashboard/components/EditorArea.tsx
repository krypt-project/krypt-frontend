"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import Blockquote from "@tiptap/extension-blockquote";
import CodeBlock from "@tiptap/extension-code-block";
import Heading from "@tiptap/extension-heading";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import { TextStyle } from "@tiptap/extension-text-style";
import Color from "@tiptap/extension-color";

import Button from "@/components/atoms/Button";
import Input from "@/components/atoms/Input";

import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  CheckSquare,
  Quote,
  Code,
  Minus,
  Palette,
} from "lucide-react";

export default function EditorArea({
  content,
  onChange,
}: {
  content: string;
  onChange: (content: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      TextStyle,
      Color,
      BulletList,
      OrderedList,
      ListItem,
      TaskList,
      TaskItem,
      Blockquote,
      CodeBlock,
      Heading.configure({ levels: [1, 2, 3] }),
      HorizontalRule,
    ],
    content: content || "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  const toolbarButton = (
    command: () => void,
    icon: React.ReactNode,
    active = false
  ) => (
    <Button
      onClick={command}
      variant="outlined"
      className={`border-[var(--border)] ${
        active
          ? "bg-[var(--primary)] text-white hover:bg-[var(--primary)] hover:text-gray-900"
          : "hover:bg-gray-200 text-gray-900"
      }`}
    >
      {icon}
    </Button>
  );

  return (
    <div className="flex flex-col flex-1 bg-white rounded-xl shadow">
      {/* Toolbar */}
      <div className="border-b border-gray-300 p-2 flex gap-2 flex-wrap bg-gray-50">
        {toolbarButton(
          () => editor.chain().focus().toggleBold().run(),
          <BoldIcon size={16} />,
          editor.isActive("bold")
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleItalic().run(),
          <ItalicIcon size={16} />,
          editor.isActive("italic")
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleUnderline().run(),
          <UnderlineIcon size={16} />,
          editor.isActive("underline")
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleBulletList().run(),
          <ListIcon size={16} />,
          editor.isActive("bulletList")
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleOrderedList().run(),
          <ListOrdered size={16} />,
          editor.isActive("orderedList")
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleTaskList().run(),
          <CheckSquare size={16} />,
          editor.isActive("taskList")
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleHeading({ level: 1 }).run(),
          <Heading1 size={16} />,
          editor.isActive("heading", { level: 1 })
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleHeading({ level: 2 }).run(),
          <Heading2 size={16} />,
          editor.isActive("heading", { level: 2 })
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleHeading({ level: 3 }).run(),
          <Heading3 size={16} />,
          editor.isActive("heading", { level: 3 })
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleBlockquote().run(),
          <Quote size={16} />,
          editor.isActive("blockquote")
        )}
        {toolbarButton(
          () => editor.chain().focus().toggleCodeBlock().run(),
          <Code size={16} />,
          editor.isActive("codeBlock")
        )}
        {toolbarButton(
          () => editor.chain().focus().setHorizontalRule().run(),
          <Minus size={16} />
        )}

        {/* Color picker */}
        <label className="p-2 rounded-full border border-[var(--border)] hover:bg-gray-200 flex items-center gap-1 cursor-pointer">
          <Palette size={24} />
          <Input
            type="color"
            onInput={(e) =>
              editor
                .chain()
                .focus()
                .extendMarkRange("textStyle")
                .setColor((e.target as HTMLInputElement).value)
                .run()
            }
          />
        </label>
      </div>

      {/* Zone d'édition */}
      <EditorContent
        editor={editor}
        className="flex-1 p-6 tiptap [&_.ProseMirror]:focus:outline-none prose"
      />
    </div>
  );
}
