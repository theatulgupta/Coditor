import { useState, useEffect } from "react";
import Axios from "@/lib/Axios";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

type Project = {
  name: string;
  link: string;
};

export default function useUserProjects() {
  const { data: session } = useSession();
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    if (session?.user?.id) {
      Axios.get("/api/project")
        .then((res) => {
          const projects = res.data.projects || [];
          setProjects(
            projects.map((p: any) => ({
              name: p.name,
              link: `/editor/${p._id}`,
            }))
          );
        })
        .catch(() => {
          toast.error("Failed to load projects");
        });
    }
  }, [session]);

  return projects;
}
