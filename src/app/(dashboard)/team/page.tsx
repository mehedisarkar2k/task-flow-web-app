import { TeamScreen } from "@/screens/team/team-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Team | TaskFlow",
  description: "View team members and their workloads.",
};

export default function TeamPage() {
  return <TeamScreen />;
}
