import { ChevronRight, MessageSquare, CalendarPlus, MoreVertical } from "lucide-react";
import Link from "next/link";
import { MemberTasks } from "./_components/member-tasks";
import { MemberWorkloadChart } from "./_components/member-workload-chart";
import { MemberSkillset } from "./_components/member-skillset";
import { MemberActivity } from "./_components/member-activity";

interface MemberDetailsScreenProps {
  memberId: string;
}

export const MemberDetailsScreen = ({ memberId }: MemberDetailsScreenProps) => {
  return (
    <div className="flex flex-col h-full w-full">
      <div className="max-w-[1200px] mx-auto w-full pb-10">
        
        {/* Breadcrumbs */}
        <div className="hidden md:flex items-center gap-2 text-xs font-sans text-muted-foreground mb-8">
          <Link href="/team" className="hover:text-primary transition-colors">
            Team
          </Link>
          <ChevronRight className="size-4" />
          <span className="text-foreground">Member Profile</span>
        </div>

        {/* Header Profile Section */}
        <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
          <div className="flex items-center gap-6">
            <img
              alt="Member Photo"
              className="w-24 h-24 md:w-32 md:h-32 rounded-full border border-border object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuChXCBazACfyUtU4jVRE06dgmFK7-afxyzW7fusidAjZOHK3GnU1qut3HV4EPx-S1XSdt5PzcZn25sJW63s5Jlx5WrEGDolqKIbBH8xLqsFNNZaUAYX74IRx2x1G5wzg9xUdVWMM3tNijtAkixy_hc_6T9UgXujt2lGjJS57r8xJCvt-2PK2ZNIfNpnPxzCrQMq9dBEk4o13AiSsEdewIPUUi4UN_lpCcpr4rSL3vyC4xtmQgDZ1lQXqdVQnmnn9eoZoHAmolzaFS4"
            />
            <div>
              <h1 className="font-heading text-3xl md:text-4xl text-foreground font-bold mb-1 tracking-tight">
                Julian Barnes
              </h1>
              <p className="font-sans text-lg text-muted-foreground mb-2">
                Senior Frontend Developer
              </p>
              <div className="flex items-center gap-2 font-mono text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-primary inline-block"></span>
                <span>Online</span>
                <span className="mx-2">•</span>
                <span>London, UK</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto mt-4 md:mt-0">
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-muted/50 border border-border text-primary font-sans font-medium text-sm px-4 py-2 rounded-lg hover:bg-muted transition-colors">
              <MessageSquare className="size-4" />
              Message
            </button>
            <button className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground font-sans font-medium text-sm px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors">
              <CalendarPlus className="size-4" />
              Schedule
            </button>
            <button className="flex-none p-2 border border-border rounded-lg text-muted-foreground hover:bg-muted transition-colors">
              <MoreVertical className="size-5" />
            </button>
          </div>
        </header>

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Current Tasks */}
          <div className="lg:col-span-8 flex flex-col gap-6">
            <MemberTasks />
          </div>
          
          {/* Right Column: Stats & Meta */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <MemberWorkloadChart />
            <MemberSkillset />
            <MemberActivity />
          </div>
        </div>

      </div>
    </div>
  );
};
