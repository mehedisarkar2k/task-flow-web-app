import type { Metadata } from "next";
import { ProjectDetailsScreen } from "@/screens/project-details/project-details-screen";

export const metadata: Metadata = {
  title: "Project Details — TaskFlow",
  description: "Manage project tasks and team collaboration.",
};

interface ProjectPageProps {
  params: Promise<{ id: string }>;
}

const ProjectPage = async ({ params }: ProjectPageProps) => {
  const resolvedParams = await params;
  return <ProjectDetailsScreen projectId={resolvedParams.id} />;
};

export default ProjectPage;
