import type { Metadata } from "next";
import { ProjectsScreen } from "@/screens/projects/projects-screen";

export const metadata: Metadata = {
  title: "Projects — TaskFlow",
  description: "Browse, filter, and manage all your team projects in one place.",
};

const ProjectsPage = () => {
  return <ProjectsScreen />;
};

export default ProjectsPage;
