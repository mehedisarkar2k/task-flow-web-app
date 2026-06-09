import Link from "next/link";
import { ArrowLeft, Shield, Users, CheckSquare } from "lucide-react";
import { Button } from "@/components/ui/button";

export const HowItWorksScreen = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" className="gap-2 px-0 hover:bg-transparent text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to TaskFlow
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-12">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            How TaskFlow Works
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed">
            TaskFlow is a role-based project management system designed to bring clarity to your team's workflow. 
            Understanding the hierarchy and permissions is key to getting the most out of the platform.
          </p>
        </div>

        <div className="space-y-12">
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Shield className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-foreground">Role Hierarchy & Permissions</h2>
            </div>
            
            <div className="grid gap-6 md:grid-cols-3">
              {/* ADMIN */}
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-destructive"></span>
                  ADMIN
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Full system control. Perfect for CTOs, founders, or system administrators.
                </p>
                <ul className="text-sm space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Create, edit, and delete any project or task</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Invite users and assign their roles</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Manage global system settings</span>
                  </li>
                </ul>
              </div>

              {/* PROJECT MANAGER */}
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-primary"></span>
                  Project Manager (PM)
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Oversees project execution. Perfect for Team Leads and Product Managers.
                </p>
                <ul className="text-sm space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Create and edit projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Create, assign, and manage all tasks</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>View progress and team activity</span>
                  </li>
                </ul>
              </div>

              {/* MEMBER */}
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-accent"></span>
                  MEMBER
                </h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Executes the work. Perfect for developers, designers, and contributors.
                </p>
                <ul className="text-sm space-y-2 text-foreground">
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>View assigned tasks and projects</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Update task statuses (e.g., In Progress, Done)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckSquare className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>Add comments and attachments</span>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary/10 rounded-lg text-primary">
                <Users className="w-6 h-6" />
              </div>
              <h2 className="text-2xl font-bold font-heading text-foreground">The Workflow</h2>
            </div>
            
            <div className="space-y-6 text-muted-foreground">
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2">1. Organization</h3>
                <p>Everything starts with a <strong>Project</strong>. An Admin or PM creates a project, sets the timeline, and defines the goals. Projects act as containers for all related tasks and files.</p>
              </div>
              
              <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2">2. Delegation</h3>
                <p>Once a project is active, PMs break down the work into actionable <strong>Tasks</strong>. These tasks are assigned priorities, deadlines, and assigned directly to Members.</p>
              </div>

              <div className="p-6 rounded-xl border border-border bg-card shadow-sm">
                <h3 className="text-lg font-bold text-foreground mb-2">3. Execution</h3>
                <p>Members receive notifications for their assigned tasks. As work progresses, they update the task status from <em>To Do</em>, to <em>In Progress</em>, and finally <em>Completed</em>. Team members can collaborate by leaving comments and uploading necessary attachments directly on the task.</p>
              </div>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};
