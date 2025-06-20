"use client";

import { useState, useEffect } from "react";
import Axios from "@/lib/Axios";
import toast from "react-hot-toast";

export interface FileData {
  _id: string;
  name: string;
  extension: string;
  content: string;
}

export function useProjectData(
  projectId: string | undefined,
  defaultFile: string
) {
  const [projectName, setProjectName] = useState("");
  const [files, setFiles] = useState<FileData[]>([]);
  const [loadingProject, setLoadingProject] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);

  useEffect(() => {
    if (!projectId) return;
    setLoadingProject(true);
    Axios.get(`/api/project/${projectId}`)
      .then((res) => {
        const proj = res.data.project;
        setProjectName(proj?.name || "");
      })
      .catch(() => {
        toast.error("Failed to load project info");
      })
      .finally(() => setLoadingProject(false));
  }, [projectId]);

  useEffect(() => {
    if (!projectId) return;
    setLoadingFiles(true);
    Axios.get(`/api/project/${projectId}/files`)
      .then((res) => {
        const fetchedFiles: FileData[] = res.data.files || [];
        setFiles(fetchedFiles);
      })
      .catch(() => {
        toast.error("Failed to load project files");
      })
      .finally(() => setLoadingFiles(false));
  }, [projectId]);

  return {
    projectName,
    files,
    loadingProject,
    loadingFiles,
  };
}
