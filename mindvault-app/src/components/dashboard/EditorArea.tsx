"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Underline from "@tiptap/extension-underline";
import BulletList from "@tiptap/extension-bullet-list";
import OrderedList from "@tiptap/extension-ordered-list";
import ListItem from "@tiptap/extension-list-item";
import Heading from "@tiptap/extension-heading";
import { useEffect } from "react";
import {
  Bold as BoldIcon,
  Italic as ItalicIcon,
  Underline as UnderlineIcon,
  List as ListIcon,
  ListOrdered,
  Heading as HeadingIcon,
} from "lucide-react";

export default function EditorArea({
  content,
  onChange,
  onBlur,
}: {
  content: string;
  onChange: (content: string) => void;
  onBlur: () => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Bold,
      Italic,
      Underline,
      BulletList,
      OrderedList,
      ListItem,
      Heading.configure({ levels: [1, 2, 3] }),
    ],
    content: content || "<p>Start writing...</p>",
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    onBlur: onBlur,
    immediatelyRender: false,
  });

  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      editor.commands.setContent(content);
    }
  }, [content, editor]);

  if (!editor) return null;

  return (
    <div className="flex flex-col flex-1 bg-white">
      {/* Toolbar */}
      <div className="border-b p-2 flex gap-2">
        <button
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`p-2 rounded ${
            editor.isActive("bold") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <BoldIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`p-2 rounded ${
            editor.isActive("italic") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <ItalicIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          className={`p-2 rounded ${
            editor.isActive("underline") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <UnderlineIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          className={`p-2 rounded ${
            editor.isActive("bulletList") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <ListIcon size={16} />
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          className={`p-2 rounded ${
            editor.isActive("orderedList") ? "bg-gray-300" : "hover:bg-gray-200"
          }`}
        >
          <ListOrdered size={16} />
        </button>
        <button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          className={`p-2 rounded ${
            editor.isActive("heading", { level: 2 })
              ? "bg-gray-300"
              : "hover:bg-gray-200"
          }`}
        >
          <HeadingIcon size={16} />
        </button>
      </div>

      {/* Zone d'édition */}
      <EditorContent
        editor={editor}
        className="flex-1 p-6 prose max-w-none focus:outline-none"
      />
    </div>
  );
}
