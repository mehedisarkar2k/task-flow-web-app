import Link from "next/link";

export const MemberActivity = () => {
  return (
    <section className="bg-card border border-border rounded-xl p-6 transition-colors duration-200">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Recent Activity</h2>
      <div className="relative pl-4 border-l border-border space-y-4">
        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-card border-2 border-primary rounded-full" />
          <p className="font-sans text-base text-foreground">
            Commented on <Link href="/tasks/task-1" className="font-medium text-primary cursor-pointer hover:underline">TSK-0842</Link>
          </p>
          <span className="font-mono text-xs text-muted-foreground">2h ago</span>
        </div>
        <div className="relative">
          <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 bg-muted rounded-full" />
          <p className="font-sans text-base text-foreground">
            Moved <Link href="/tasks/task-3" className="font-medium text-primary cursor-pointer hover:underline">TSK-0831</Link> to Completed
          </p>
          <span className="font-mono text-xs text-muted-foreground">Yesterday</span>
        </div>
      </div>
    </section>
  );
};
