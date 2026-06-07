"use client";

import Link from "next/link";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, User, Briefcase, Users } from "lucide-react";

export const LoginScreen = () => {
  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Log in to continue to your workspace."
      illustrationType="login"
    >
      <form className="flex flex-col gap-5">
        <div className="flex flex-col gap-4">
          {/* Email Field */}
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="email" className="font-sans text-[13px] font-medium text-foreground">
              Email address
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
              <Input
                id="email"
                name="email"
                placeholder="name@company.com"
                type="email"
                required
                className="h-11 pl-10 pr-4 rounded-lg border-border bg-transparent text-sm placeholder:text-muted-foreground/70"
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <Label htmlFor="password" className="font-sans text-[13px] font-medium text-foreground">
                Password
              </Label>
              <Link
                href="/auth/forgot-password"
                className="text-[12px] text-primary hover:text-accent transition-colors font-medium"
              >
                Forgot password?
              </Link>
            </div>
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
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 mt-1">
            <input type="checkbox" id="remember" className="rounded-sm border-border text-primary focus:ring-primary h-4 w-4 accent-primary" />
            <Label htmlFor="remember" className="font-sans text-[13px] text-foreground font-medium cursor-pointer">
              Remember me
            </Label>
          </div>
        </div>

        {/* Primary Action */}
        <Button type="submit" className="h-11 w-full text-[14px] font-medium shadow-sm mt-2 rounded-lg group cursor-pointer">
          Log in 
          <ArrowRight className="w-[18px] h-[18px] ml-1 transition-transform group-hover:translate-x-1" />
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-6">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-4 text-[12px] text-muted-foreground font-sans bg-white px-2">or</span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      {/* Demo Logins */}
      <div className="flex flex-col gap-3">
        <span className="text-[13px] text-foreground text-center font-medium font-sans">Quick access</span>
        <div className="grid grid-cols-3 gap-2">
          <Button variant="outline" type="button" className="h-9 px-1 border-border font-sans text-[12px] text-primary hover:bg-primary/5 hover:text-primary rounded-md gap-1 cursor-pointer">
            <User className="w-[16px] h-[16px]" />
            Admin
          </Button>
          <Button variant="outline" type="button" className="h-9 px-1 border-border font-sans text-[12px] text-primary hover:bg-primary/5 hover:text-primary rounded-md gap-1 cursor-pointer">
            <Briefcase className="w-[16px] h-[16px]" />
            PM
          </Button>
          <Button variant="outline" type="button" className="h-9 px-1 border-border font-sans text-[12px] text-primary hover:bg-primary/5 hover:text-primary rounded-md gap-1 cursor-pointer">
            <Users className="w-[16px] h-[16px]" />
            Member
          </Button>
        </div>
      </div>

      {/* Sign Up Link */}
      <div className="mt-8 text-center font-sans">
        <p className="text-[13px] text-muted-foreground">
          New here?{" "}
          <Link
            href="/auth/signup"
            className="text-primary font-medium hover:underline hover:text-accent transition-colors"
          >
            Sign up <ArrowRight className="w-[14px] h-[14px] align-middle inline-block ml-0.5" />
          </Link>
        </p>
      </div>
    </AuthLayout>
  );
};
