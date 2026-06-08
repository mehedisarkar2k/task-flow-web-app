"use client";

import { useState, FormEvent, ChangeEvent } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, Lock, ArrowRight, User, Eye, EyeOff, Loader2 } from "lucide-react";
import { signUp } from "@/lib/auth-client";
import { toast } from "sonner";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const SignupScreen = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const fullName = `${formData.firstName.trim()} ${formData.lastName.trim()}`.trim();

    try {
      const { error } = await (signUp.email as (
        params: {
          email: string;
          password: string;
          name: string;
          firstName: string;
          lastName: string;
        }
      ) => Promise<{ error: { message?: string } | null }>)({
        email: formData.email,
        password: formData.password,
        name: fullName,
        firstName: formData.firstName.trim(),
        lastName: formData.lastName.trim(),
      });

      if (error) {
        toast.error(error.message || "Failed to create account");
        return;
      }

      toast.success("Account created! Welcome to TaskFlow.");
      router.push("/dashboard");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "A network error occurred.";
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "h-11 pl-10 pr-4 rounded-lg border-border bg-transparent text-sm placeholder:text-muted-foreground/70";

  return (
    <AuthLayout
      title="Create account"
      subtitle="Start your calm editorial journey today."
      illustrationType="signup"
    >
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* First Name + Last Name */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <Label htmlFor="firstName" className="font-sans text-[13px] font-medium text-foreground">
              First name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Jane"
                type="text"
                required
                className={inputClass}
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <Label htmlFor="lastName" className="font-sans text-[13px] font-medium text-foreground">
              Last name
            </Label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Doe"
                type="text"
                required
                className={inputClass}
              />
            </div>
          </div>
        </div>

        {/* Email */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="email" className="font-sans text-[13px] font-medium text-foreground">
            Email
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="jane@example.com"
              type="email"
              required
              className={inputClass}
            />
          </div>
        </div>

        {/* Password */}
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="password" className="font-sans text-[13px] font-medium text-foreground">
            Password
          </Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
            <input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="Create a secure password"
              value={formData.password}
              onChange={handleChange}
              className="h-11 w-full pl-10 pr-10 rounded-lg border border-border bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-ring"
              required
              minLength={8}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
            >
              {showPassword ? <EyeOff className="w-[18px] h-[18px]" /> : <Eye className="w-[18px] h-[18px]" />}
            </button>
          </div>
          <p className="text-[11px] text-muted-foreground mt-0.5">Must be at least 8 characters.</p>
        </div>

        {/* Submit */}
        <Button
          disabled={loading}
          type="submit"
          className="h-11 w-full text-[14px] font-medium shadow-sm mt-4 rounded-lg group cursor-pointer"
        >
          {loading && <Loader2 className="w-[18px] h-[18px] mr-2 animate-spin" />}
          {loading ? "Creating account..." : "Create account"}
          {!loading && (
            <ArrowRight className="w-[18px] h-[18px] ml-1 transition-transform group-hover:translate-x-1" />
          )}
        </Button>
      </form>

      {/* Divider */}
      <div className="relative flex items-center py-5">
        <div className="flex-grow border-t border-border" />
        <span className="flex-shrink-0 mx-4 text-[12px] text-muted-foreground font-sans bg-card px-2">or</span>
        <div className="flex-grow border-t border-border" />
      </div>

      {/* Login link */}
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
