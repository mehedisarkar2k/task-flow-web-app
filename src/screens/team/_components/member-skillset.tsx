interface MemberSkillsetProps {
  skills: string[];
}

export const MemberSkillset = ({ skills }: MemberSkillsetProps) => {
  return (
    <section className="bg-card border border-border rounded-xl p-6 transition-colors duration-200">
      <h2 className="font-heading text-2xl font-semibold text-foreground mb-4">Skillset</h2>
      {skills.length === 0 ? (
        <p className="font-sans text-sm text-muted-foreground">No skills listed yet.</p>
      ) : (
        <div className="flex flex-wrap gap-2">
          {skills.map((skill) => (
            <span
              key={skill}
              className="px-3 py-1 bg-muted/50 text-foreground border border-border rounded-full font-sans text-sm hover:border-primary transition-colors cursor-default"
            >
              {skill}
            </span>
          ))}
        </div>
      )}
    </section>
  );
};
