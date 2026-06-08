import { History } from "lucide-react";

export const MemberActivity = () => {
  return (
    <section className="bg-card border border-border rounded-xl p-6 transition-colors duration-200">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Recent Activity</h2>
      <div className="flex flex-col items-center justify-center gap-2 py-6 text-muted-foreground">
        <History className="size-6" />
        <p className="font-sans text-sm">Activity feed coming soon.</p>
      </div>
    </section>
  );
};
