"use client";

import React from "react";
import { Folder } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Shimmer } from "../../../../../components/Shimmer";
import { FileData } from "../_hooks/useProjectData";

interface SidebarProps {
  projectName: string;
  files: FileData[];
  loadingProject: boolean;
  loadingFiles: boolean;
  selectedFileId: string | undefined;
  onSelectFile: (file: FileData) => void;
  saving: boolean;
  onSave: () => void;
  canSave: boolean;
}

export function EditorSidebar({
  projectName,
  files,
  loadingProject,
  loadingFiles,
  selectedFileId,
  onSelectFile,
  saving,
  onSave,
  canSave,
}: SidebarProps) {
  return (
    <aside className="w-64 border-r bg-white flex flex-col">
      <div
        className="px-4 py-3 border-b flex items-center gap-2 font-semibold text-lg truncate"
        title={projectName}
      >
        <Folder className="w-5 h-5" />
        {loadingProject ? <Shimmer /> : projectName || "Project"}
      </div>

      <nav className="flex-1 overflow-y-auto">
        {loadingFiles ? (
          <>
            {[...Array(6)].map((_, i) => (
              <div key={i} className="px-4 py-2">
                <Shimmer />
              </div>
            ))}
          </>
        ) : files.length === 0 ? (
          <p className="p-4 text-center text-gray-500">No files found</p>
        ) : (
          files.map((file) => {
            const isActive = selectedFileId === file._id;
            return (
              <button
                key={file._id}
                onClick={() => onSelectFile(file)}
                className={`w-full text-left px-4 py-2 flex items-center gap-2 border-l-4 ${
                  isActive
                    ? "border-primary bg-primary/10 text-primary font-semibold"
                    : "border-transparent text-gray-700 hover:bg-gray-100"
                }`}
                disabled={saving || loadingFiles || loadingProject}
              >
                <span className="truncate">{file.name}</span>
              </button>
            );
          })
        )}
      </nav>

      <div className="p-4 border-t">
        <Button
          variant="outline"
          onClick={onSave}
          disabled={!canSave || saving}
          className="flex items-center gap-2 w-full justify-center"
        >
          Save
        </Button>
      </div>
    </aside>
  );
}
