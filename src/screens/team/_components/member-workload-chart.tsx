export const MemberWorkloadChart = () => {
  return (
    <section className="bg-card border border-border rounded-xl p-6 transition-colors duration-200">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Workload</h2>
      <div className="flex items-end gap-2 h-32 mb-4 border-b border-border pb-2">
        <div className="flex-1 flex flex-col justify-end items-center group">
          <div className="w-full bg-muted rounded-t-sm group-hover:bg-primary/20 transition-colors h-[40%]" />
          <span className="font-mono text-[10px] text-muted-foreground mt-1">M</span>
        </div>
        <div className="flex-1 flex flex-col justify-end items-center group">
          <div className="w-full bg-primary rounded-t-sm group-hover:bg-primary/80 transition-colors h-[80%]" />
          <span className="font-mono text-[10px] text-foreground font-bold mt-1">T</span>
        </div>
        <div className="flex-1 flex flex-col justify-end items-center group">
          <div className="w-full bg-muted rounded-t-sm group-hover:bg-primary/20 transition-colors h-[60%]" />
          <span className="font-mono text-[10px] text-muted-foreground mt-1">W</span>
        </div>
        <div className="flex-1 flex flex-col justify-end items-center group">
          <div className="w-full bg-accent/30 rounded-t-sm group-hover:bg-accent/40 transition-colors h-[95%]" />
          <span className="font-mono text-[10px] text-accent mt-1 font-bold">T</span>
        </div>
        <div className="flex-1 flex flex-col justify-end items-center group">
          <div className="w-full bg-muted rounded-t-sm group-hover:bg-primary/20 transition-colors h-[30%]" />
          <span className="font-mono text-[10px] text-muted-foreground mt-1">F</span>
        </div>
      </div>
      <div className="flex justify-between items-center text-xs font-sans text-muted-foreground">
        <span>This Week</span>
        <span className="font-mono text-accent font-medium">38h / 40h</span>
      </div>
    </section>
  );
};
