// components/editor.tsx
"use client";

import { Block } from "@blocknote/core";
import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";
import { useEffect } from "react";
import { useEditorStore } from "@/store/editor-store"; // adjust the path!

interface EditorProps {
  value?: Block[]; // External blocks value
  onChange?: (blocks: Block[]) => void; // Callback when editor changes
  editable: boolean;
}

export const Editor = ({ value, onChange, editable = true }: EditorProps) => {
  const { blocks: storedBlocks, setBlocks: setStoredBlocks } = useEditorStore();

  const editor = useCreateBlockNote({
    initialContent:
      value ??
      (storedBlocks.length > 0
        ? storedBlocks
        : [{ type: "paragraph", content: "Write your content here!" }]),
  });

  useEffect(() => {
    // Whenever editor content changes, trigger the parent onChange and save locally
    const unsubscribe = editor.onChange(() => {
      const document = editor.document;
      setStoredBlocks(document); // Persist locally in zustand
      onChange?.(document); // Notify parent
    });

    return () => unsubscribe();
  }, [editor, onChange, setStoredBlocks]);

  return (
    <div
      className={`w-full prose-sm ${editable && "border p-5"} rounded-xl ${editable && "min-h-screen"}`}
    >
      <BlockNoteView
        editable={editable}
        editor={editor}
        theme={"light"}
        className={`font-black ${!editable && "not-editable"}`}
      />
    </div>
  );
};

export default Editor;
