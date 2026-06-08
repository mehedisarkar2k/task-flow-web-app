import { MemberDetailsScreen } from "@/screens/team/member-details-screen";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Details | TaskFlow",
  description: "View team member profile, workload, and tasks.",
};

interface MemberDetailsPageProps {
  params: {
    id: string;
  };
}

export default function MemberDetailsPage({ params }: MemberDetailsPageProps) {
  return <MemberDetailsScreen memberId={params.id} />;
}
