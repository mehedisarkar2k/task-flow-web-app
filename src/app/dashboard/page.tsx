import type { Metadata } from "next";
import { DashboardScreen } from "@/screens/dashboard/dashboard-screen";

export const metadata: Metadata = {
  title: "Dashboard — TaskFlow",
  description: "Overview of your workspace projects, tasks, and team activity.",
};

const DashboardPage = () => {
  return <DashboardScreen />;
};

export default DashboardPage;