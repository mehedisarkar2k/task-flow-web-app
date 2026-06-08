import { MemberDetailsScreen } from "@/screens/team/member-details-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Details | TaskFlow",
  description: "View team member profile, workload, and tasks.",
};

interface MemberDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  const { id } = await params;
  return <MemberDetailsScreen memberId={id} />;
}
