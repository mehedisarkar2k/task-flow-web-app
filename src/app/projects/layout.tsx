import { DashboardLayout } from "@/components/layouts/dashboard-layout";

interface ProjectsLayoutProps {
  children: React.ReactNode;
}

const ProjectsLayout = ({ children }: ProjectsLayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default ProjectsLayout;
