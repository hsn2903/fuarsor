"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorToolbar } from "./editor-toolbar";

interface EditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export function Editor({ value, onChange, placeholder }: EditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: placeholder || "Start writing...",
      }),
    ],
    content: value, // Initial content
    editorProps: {
      attributes: {
        // Tailwind Typography classes (prose) to style the content
        class:
          "prose prose-sm sm:prose-base lg:prose-lg xl:prose-2xl m-5 focus:outline-none min-h-[200px]",
      },
    },
    onUpdate: ({ editor }) => {
      // Whenever the user types, we send the HTML back to the parent
      onChange(editor.getHTML());
    },
    immediatelyRender: false, // Fix for some hydration issues in Next.js
  });

  return (
    <div className="flex flex-col border border-input rounded-md bg-background w-full">
      <EditorToolbar editor={editor} />
      <div className="min-h-[200px] w-full p-2">
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
