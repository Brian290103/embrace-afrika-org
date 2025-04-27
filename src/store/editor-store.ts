// store/useEditorStore.ts
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Block } from "@blocknote/core";

interface EditorState {
    blocks: Block[];
    setBlocks: (blocks: Block[]) => void;
}

export const useEditorStore = create<EditorState>()(
    persist(
        (set) => ({
            blocks: [],
            setBlocks: (blocks) => set({ blocks }),
        }),
        {
            name: "editor-content", // key in localStorage
        }
    )
);
