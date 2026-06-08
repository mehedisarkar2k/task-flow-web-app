import { DashboardLayout } from "@/components/layouts/dashboard-layout";

interface DashboardRootLayoutProps {
  children: React.ReactNode;
}

const DashboardRootLayout = ({ children }: DashboardRootLayoutProps) => {
  return <DashboardLayout>{children}</DashboardLayout>;
};

export default DashboardRootLayout;
