"use client";

import { Camera, Sun, Moon, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "next-themes";

export const ProfileScreen = () => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const userInitials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "ER";

  return (
    <div className="flex-1 w-full max-w-4xl mx-auto py-8 px-4 md:px-8 pb-24">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-semibold text-foreground tracking-tight mb-1">
          Profile Settings
        </h1>
        <p className="text-sm text-muted-foreground">
          Manage your account details, preferences, and security settings.
        </p>
      </div>

      {/* Form Layout */}
      <div className="space-y-8">
        {/* Section: Account Information */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary/40"></div>
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-4 mb-6">
            Account Information
          </h2>

          {/* Avatar Upload */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-6 mb-8">
            <div className="relative group cursor-pointer w-20 h-20 shrink-0">
              <div className="w-20 h-20 rounded-full border border-border overflow-hidden bg-muted flex items-center justify-center text-xl font-medium text-muted-foreground">
                {user?.image ? (
                  <img
                    alt="Current Avatar"
                    className="w-full h-full object-cover"
                    src={user.image}
                  />
                ) : (
                  userInitials
                )}
              </div>
              <div className="absolute inset-0 bg-foreground/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-full">
                <Camera className="text-background size-6" />
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex gap-3">
                <Button variant="secondary" className="text-primary hover:bg-muted font-medium border border-border">
                  Change Avatar
                </Button>
                <Button variant="ghost" className="text-muted-foreground hover:text-destructive">
                  Remove
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                JPG, GIF or PNG. Max size of 800K
              </p>
            </div>
          </div>

          {/* Grid Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4">
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                First Name
              </Label>
              <Input defaultValue={user?.name?.split(" ")[0] || "Elena"} />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Last Name
              </Label>
              <Input defaultValue={user?.name?.split(" ")[1] || "Rostova"} />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Email Address
              </Label>
              <Input type="email" defaultValue={user?.email || "elena.r@taskflow.inc"} />
            </div>
            <div className="md:col-span-2 space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Role
              </Label>
              <Input
                disabled
                defaultValue="Senior Editor"
                className="bg-muted border-dashed text-muted-foreground cursor-not-allowed"
              />
              <p className="text-xs text-muted-foreground mt-1">
                Contact your administrator to change your organizational role.
              </p>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border flex justify-end">
            <Button>Save Changes</Button>
          </div>
        </section>

        {/* Section: Preferences */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm">
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-4 mb-6">
            Preferences
          </h2>
          <div className="space-y-8">
            {/* Theme Toggle */}
            <div>
              <h3 className="text-base font-medium text-foreground mb-1">
                Interface Theme
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Select or customize your UI theme.
              </p>
              <div className="flex gap-4">
                <label className="relative flex flex-col items-center cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="theme"
                    type="radio"
                    value="light"
                    checked={theme === "light"}
                    onChange={() => setTheme("light")}
                  />
                  <div className="w-24 h-16 rounded border-2 border-border peer-checked:border-primary bg-background flex items-center justify-center mb-2 transition-colors">
                    <Sun className="text-primary size-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Light
                  </span>
                </label>
                <label className="relative flex flex-col items-center cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="theme"
                    type="radio"
                    value="dark"
                    checked={theme === "dark"}
                    onChange={() => setTheme("dark")}
                  />
                  <div className="w-24 h-16 rounded border-2 border-border peer-checked:border-primary bg-foreground flex items-center justify-center mb-2 transition-colors">
                    <Moon className="text-background size-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    Dark
                  </span>
                </label>
                <label className="relative flex flex-col items-center cursor-pointer group">
                  <input
                    className="peer sr-only"
                    name="theme"
                    type="radio"
                    value="system"
                    checked={theme === "system"}
                    onChange={() => setTheme("system")}
                  />
                  <div className="w-24 h-16 rounded border-2 border-border peer-checked:border-primary bg-gradient-to-br from-background to-foreground flex items-center justify-center mb-2 transition-colors">
                    <Settings className="text-muted-foreground size-6" />
                  </div>
                  <span className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                    System
                  </span>
                </label>
              </div>
            </div>

            {/* Notification Settings */}
            <div className="pt-6 border-t border-border">
              <h3 className="text-base font-medium text-foreground mb-1">
                Notifications
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Choose what we notify you about.
              </p>
              <div className="space-y-4">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center pt-1">
                    <Checkbox defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Email Summaries
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Daily digest of project activity and upcoming deadlines.
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center pt-1">
                    <Checkbox defaultChecked className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Mention Alerts
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Immediate notification when someone tags you in a task or comment.
                    </span>
                  </div>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group">
                  <div className="relative flex items-center pt-1">
                    <Checkbox className="data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground" />
                  </div>
                  <div>
                    <span className="block text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                      Marketing Updates
                    </span>
                    <span className="block text-xs text-muted-foreground">
                      Occasional emails about new features and product news.
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>
        </section>

        {/* Section: Security */}
        <section className="bg-card border border-border rounded-xl p-6 md:p-8 shadow-sm relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1 h-full bg-border"></div>
          <h2 className="text-xl font-semibold text-foreground border-b border-border pb-4 mb-6">
            Security
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-4 mb-6">
            <div className="md:col-span-2 space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Current Password
              </Label>
              <Input type="password" className="md:w-1/2" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                New Password
              </Label>
              <Input type="password" />
            </div>
            <div className="space-y-1.5">
              <Label className="font-mono text-xs text-muted-foreground uppercase tracking-widest block">
                Confirm New Password
              </Label>
              <Input type="password" />
            </div>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 pt-4 border-t border-border gap-4">
            <p className="text-xs text-muted-foreground">
              Last changed: <span className="font-mono">2023-10-14</span>
            </p>
            <Button variant="secondary" className="border border-border">
              Update Password
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};
