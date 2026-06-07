import Link from "next/link";
import { AuthLayout } from "@/components/layouts/auth-layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Mail, ArrowRight, ArrowLeft } from "lucide-react";

export const ForgotPasswordScreen = () => {
  return (
    <AuthLayout
      title="Reset password"
      subtitle="Enter your email address and we'll send you a link to reset your password."
      illustrationType="login"
    >
      <form className="space-y-6 mt-6">
        {/* Email Field */}
        <div className="space-y-2 relative">
          <Label htmlFor="email" className="font-sans text-[13px] text-foreground font-medium">Email address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-[18px] h-[18px] pointer-events-none" />
            <Input 
              id="email" 
              type="email" 
              placeholder="you@company.com" 
              required 
              className="h-11 pl-10 pr-4 rounded-lg bg-transparent border-border focus-visible:ring-ring focus-visible:ring-offset-0 text-[14px]"
            />
          </div>
        </div>

        {/* Primary Action */}
        <Button type="submit" className="h-11 w-full text-[14px] font-medium shadow-sm mt-4 rounded-lg group cursor-pointer">
          Send reset link
          <ArrowRight className="w-[18px] h-[18px] ml-1 transition-transform group-hover:translate-x-1" />
        </Button>

        {/* Back to Login Link */}
        <div className="text-center mt-6">
          <Link href="/auth/login" className="text-[13px] font-medium text-muted-foreground hover:text-foreground transition-colors inline-flex items-center justify-center gap-1 cursor-pointer">
            <ArrowLeft className="w-[16px] h-[16px]" />
            Back to log in
          </Link>
        </div>
      </form>
    </AuthLayout>
  );
};
