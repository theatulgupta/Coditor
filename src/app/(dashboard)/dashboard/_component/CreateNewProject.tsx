"use client";
import React, { useState, useEffect, useRef, FormEvent } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import toast from "react-hot-toast";
import Axios from "@/lib/Axios";
import { useRouter } from "next/navigation";

const CreateNewProject = () => {
  const [open, setOpen] = useState(false);
  const [projectName, setProjectName] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(timeout);
    }
  }, [open]);

  const handleCreate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedName = projectName.trim();
    if (!trimmedName) {
      toast.error("Project name is required");
      return;
    }

    try {
      const response = await Axios.post("/api/project", { name: trimmedName });

      if (response.status === 201) {
        toast.success(
          response.data?.message || "Project created successfully!"
        );
        const projectId = response.data?.data?.project?._id;
        if (projectId) {
          router.push(`/editor/${projectId}?file=index.html`);
        }
      }

      setOpen(false);
      setProjectName("");
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Failed to create project");
      console.error(error);
    }
  };

  const isInvalid = projectName.trim() === "";

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="w-full mt-4 justify-center cursor-pointer items-center gap-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          <Plus className="w-4 h-4" />
          Create New Project
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogTitle>Create New Project</DialogTitle>
        <DialogDescription className="mb-2">
          Enter the name for your new project below.
        </DialogDescription>
        <form onSubmit={handleCreate}>
          <input
            ref={inputRef}
            type="text"
            placeholder="Project Name"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
            aria-label="Project name"
            className="mt-2 w-full rounded border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary placeholder:text-gray-400"
          />
          <div className="mt-6 flex justify-end gap-2">
            <DialogClose asChild>
              <Button
                variant="destructive"
                type="button"
                className="cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              disabled={isInvalid}
              aria-disabled={isInvalid}
              className={isInvalid ? "cursor-not-allowed" : "cursor-pointer"}
            >
              Create
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateNewProject;
