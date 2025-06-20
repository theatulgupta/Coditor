"use client";

import React from "react";
import dynamic from "next/dynamic";
import { Shimmer } from "@/components/Shimmer";

const MonacoEditor = dynamic(() => import("@monaco-editor/react"), {
  ssr: false,
});

interface EditorPaneProps {
  content: string;
  language: string;
  loading: boolean;
  onChange: (value?: string) => void;
}

export function EditorPane({
  content,
  language,
  loading,
  onChange,
}: EditorPaneProps) {
  if (loading)
    return (
      <div className="h-full p-8">
        <Shimmer />
        <div className="mt-2 w-3/4">
          <Shimmer />
        </div>
      </div>
    );

  return (
    <MonacoEditor
      height="100%"
      width="100%"
      language={language}
      value={content}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: "on",
        automaticLayout: true,
      }}
    />
  );
}
