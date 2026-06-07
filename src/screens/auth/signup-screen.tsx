"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, User, Briefcase, ChevronDown } from "lucide-react";

export const SignupScreen = () => {
  return (
    <AuthLayout
      title="Create account"
      subtitle="Start your calm editorial journey today."
      illustrationType="signup"
    >
      <form className="flex flex-col gap-4">
        {/* Full Name Field */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="name" className="font-sans text-[13px] font-medium text-foreground">
            Full name
          </Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
            <Input
              id="name"
              name="name"
              placeholder="Jane Doe"
              type="text"
              required
              className="h-11 pl-10 pr-4 rounded-lg border-border bg-transparent text-sm placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        {/* Email Field */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="font-sans text-[13px] font-medium text-foreground">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
            <Input
              id="email"
              name="email"
              placeholder="jane@example.com"
              type="email"
              required
              className="h-11 pl-10 pr-4 rounded-lg border-border bg-transparent text-sm placeholder:text-muted-foreground/70"
            />
          </div>
        </div>

        {/* Role Select Field (simulated with standard HTML select for native look, or Shadcn if preferred. Let's use standard native-looking select wrapper for this specific aesthetic) */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="role" className="font-sans text-[13px] font-medium text-foreground">
            Primary role
          </Label>
          <div className="relative">
            <Briefcase className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
            <select
              id="role"
              name="role"
              defaultValue=""
              className="h-11 w-full pl-10 pr-10 rounded-lg border border-border bg-transparent text-sm text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring cursor-pointer"
              required
            >
              <option value="" disabled className="text-muted-foreground">Select a role...</option>
              <option value="ADMIN">Admin</option>
              <option value="PM">Project Manager</option>
              <option value="MEMBER">Team Member</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
          </div>
        </div>

        {/* Password Field */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="font-sans text-[13px] font-medium text-foreground">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
            <Input
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              required
              className="h-11 pl-10 pr-4 rounded-lg border-border bg-transparent text-sm placeholder:text-muted-foreground/70"
            />
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">Must be at least 8 characters.</p>
        </div>

        {/* Primary Action */}
        <Button type="submit" className="h-11 w-full text-[14px] font-medium shadow-sm mt-4 rounded-lg group cursor-pointer">
          Create account
          <ArrowRight className="w-[18px] h-[18px] ml-1 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-4 text-[12px] text-muted-foreground font-sans bg-white px-2">or</span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      {/* Login Link */}
      <div className="text-center font-sans">
        <p className="text-[13px] text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/auth/login"
            className="text-primary font-medium hover:underline hover:text-accent transition-colors"
          >
            Log in <ArrowRight className="w-[14px] h-[14px] align-middle inline-block ml-0.5" />
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
