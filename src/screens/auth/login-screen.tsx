"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, User, Eye, EyeOff, Briefcase, Users, Loader2 } from "lucide-react";
import { signIn } from "@/lib/auth-client";
import { toast } from "sonner";

export const LoginScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await signIn.email({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.remember,
      });

      if (error) {
        toast.error(error.message || "Failed to log in");
        return;
      }

      toast.success("Successfully logged in");
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "A network error occurred. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = async (role: "ADMIN" | "PM" | "MEMBER") => {
    let email = "";
    if (role === "ADMIN") email = "demo-admin@taskflow.com";
    else if (role === "PM") email = "demo-pm@taskflow.com";
    else email = "demo-member@taskflow.com";

    setLoading(true);
    try {
      const { error } = await signIn.email({
        email,
        password: "password",
        rememberMe: false,
      });

      if (error) {
        toast.error(error.message || `Failed to log in as ${role}`);
        return;
      }

      toast.success(`Successfully logged in as ${role}`);
      router.push("/dashboard");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "A network error occurred. Please try again.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: value,
    }));
  };

  return (
    <AuthLayout 
      title="Welcome back" 
      subtitle="Log in to continue to your workspace."
      illustrationType="login"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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
                value={formData.email}
                onChange={handleChange}
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
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handleChange}
                  className="h-11 w-full pl-10 pr-10 rounded-lg border border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
                </button>
              </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center gap-2 mt-1">
            <input 
              type="checkbox" 
              id="remember" 
              name="remember"
              checked={formData.remember}
              onChange={handleChange}
              className="rounded-sm border-border text-primary focus:ring-primary h-4 w-4 accent-primary" 
            />
            <Label htmlFor="remember" className="font-sans text-[13px] text-foreground font-medium cursor-pointer">
              Remember me
            </Label>
          </div>
        </div>

        {/* Primary Action */}
        <Button disabled={loading} type="submit" className="h-11 w-full text-[14px] font-medium shadow-sm mt-2 rounded-lg group cursor-pointer">
          {loading ? (
            <Loader2 className="w-[18px] h-[18px] mr-2 animate-spin" />
          ) : null}
          {loading ? "Logging in..." : "Log in"}
          {!loading && <ArrowRight className="w-[18px] h-[18px] ml-1 transition-transform group-hover:translate-x-1" />}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-6">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink-0 mx-4 text-[12px] text-muted-foreground font-sans bg-card px-2">or</span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      {/* Demo Logins */}
      <div className="flex flex-col gap-3">
        <span className="text-[13px] text-foreground text-center font-medium font-sans">Quick access</span>
        <div className="grid grid-cols-3 gap-2">
          <Button onClick={() => handleDemoLogin("ADMIN")} variant="outline" type="button" className="h-9 px-1 border-border font-sans text-[12px] text-primary hover:bg-primary/5 hover:text-primary rounded-md gap-1 cursor-pointer">
            <User className="w-[16px] h-[16px]" />
            Admin
          </Button>
          <Button onClick={() => handleDemoLogin("PM")} variant="outline" type="button" className="h-9 px-1 border-border font-sans text-[12px] text-primary hover:bg-primary/5 hover:text-primary rounded-md gap-1 cursor-pointer">
            <Briefcase className="w-[16px] h-[16px]" />
            PM
          </Button>
          <Button onClick={() => handleDemoLogin("MEMBER")} variant="outline" type="button" className="h-9 px-1 border-border font-sans text-[12px] text-primary hover:bg-primary/5 hover:text-primary rounded-md gap-1 cursor-pointer">
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
