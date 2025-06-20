"use client";

import React, { useState, useEffect, useCallback } from "react";
import { useParams, useSearchParams } from "next/navigation";
import Axios from "@/lib/Axios";
import toast from "react-hot-toast";
import { EditorSidebar } from "./_components/EditorSidebar";
import { EditorPane } from "./_components/EditorPane";
import { LivePreview } from "./_components/LivePreview";
import { useProjectData, FileData } from "./_hooks/useProjectData";

export default function EditorPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const projectId = params.projectId;
  const defaultFile = searchParams.get("file") || "index.html";

  const { projectName, files, loadingProject, loadingFiles } = useProjectData(
    projectId as string,
    defaultFile
  );

  const [selectedFile, setSelectedFile] = useState<FileData | null>(null);
  const [content, setContent] = useState("");
  const [saving, setSaving] = useState(false);

  // Separate content states for preview
  const [htmlContent, setHtmlContent] = useState("");
  const [cssContent, setCssContent] = useState("");
  const [jsContent, setJsContent] = useState("");

  // Update selected file and content on files or defaultFile change
  useEffect(() => {
    if (files.length === 0) {
      setSelectedFile(null);
      setContent("");
      setHtmlContent("");
      setCssContent("");
      setJsContent("");
      return;
    }

    const htmlFile = files.find((f) => f.name === "index.html");
    const cssFile = files.find((f) => f.name === "style.css");
    const jsFile = files.find((f) => f.name === "script.js");

    setHtmlContent(htmlFile?.content || "");
    setCssContent(cssFile?.content || "");
    setJsContent(jsFile?.content || "");

    const fileToOpen =
      files.find((f) => f.name === defaultFile) || files[0] || null;
    setSelectedFile(fileToOpen);
    setContent(fileToOpen?.content || "");
  }, [files, defaultFile]);

  // Update content when selectedFile changes
  useEffect(() => {
    setContent(selectedFile?.content || "");
  }, [selectedFile]);

  // Handle content changes in editor and update preview content accordingly
  const onEditorChange = (val?: string) => {
    const value = val || "";
    setContent(value);

    if (!selectedFile) return;

    switch (selectedFile.name) {
      case "index.html":
        setHtmlContent(value);
        break;
      case "style.css":
        setCssContent(value);
        break;
      case "script.js":
        setJsContent(value);
        break;
      default:
        break;
    }
  };

  // Save current content to backend
  const handleSave = useCallback(async () => {
    if (!selectedFile) return;
    setSaving(true);
    try {
      await Axios.put(`/api/file/${selectedFile._id}`, { content });
      toast.success("File saved successfully");
    } catch {
      toast.error("Failed to save file");
    } finally {
      setSaving(false);
    }
  }, [content, selectedFile]);

  // Keyboard shortcut Ctrl+S or Cmd+S to save
  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        if (!saving && !loadingFiles && !loadingProject) {
          handleSave();
        }
      }
    };
    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [handleSave, saving, loadingFiles, loadingProject]);

  // Compose live preview HTML document
  const previewSrcDoc = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
    <style>${cssContent}</style>
  </head>
  <body>
    ${htmlContent}
    <script>${jsContent}<\/script>
  </body>
  </html>
  `;

  // Determine Monaco language based on extension
  const getLanguage = (ext: string) => {
    switch (ext.toLowerCase()) {
      case "js":
      case "jsx":
        return "javascript";
      case "ts":
      case "tsx":
        return "typescript";
      case "html":
        return "html";
      case "css":
        return "css";
      case "json":
        return "json";
      case "md":
        return "markdown";
      case "py":
        return "python";
      default:
        return "plaintext";
    }
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <EditorSidebar
        projectName={projectName}
        files={files}
        loadingProject={loadingProject}
        loadingFiles={loadingFiles}
        selectedFileId={selectedFile?._id}
        onSelectFile={setSelectedFile}
        saving={saving}
        onSave={handleSave}
        canSave={!!selectedFile}
      />

      {/* Editor and Preview Area */}
      <main className="flex-1 flex flex-col">
        <header className="px-6 py-4 border-b bg-white text-gray-800 font-semibold text-lg">
          Editing: {selectedFile?.name || "No file selected"}
        </header>

        <div className="flex-1 overflow-hidden flex">
          <div className="w-1/2 h-full">
            <EditorPane
              content={content}
              language={getLanguage(selectedFile?.extension || "")}
              loading={loadingFiles || loadingProject}
              onChange={onEditorChange}
            />
          </div>

          <div className="w-1/2 border-l h-full">
            <LivePreview srcDoc={previewSrcDoc} />
          </div>
        </div>
      </main>
    </div>
  );
}
