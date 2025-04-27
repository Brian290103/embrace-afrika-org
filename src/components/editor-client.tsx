"use client"

import React from 'react';

import dynamic from "next/dynamic";
import {Block} from "@blocknote/core";

const Editor = dynamic(() => import("@/components/editor"), { ssr: false });
interface EditorProps {
    value?: Block[]; // External blocks value
    onChange?: (blocks: Block[]) => void; // Callback when editor changes
    editable:boolean
}

const EditorClient = ({ value, onChange,editable=true }: EditorProps) => {
    return (
        <>
            <Editor editable={false} value={value}/>
        </>
    );
};

export default EditorClient;
