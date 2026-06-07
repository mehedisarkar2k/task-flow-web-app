import React from "react";
import Image from "next/image";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
  illustrationType?: "login" | "signup";
}

export const AuthLayout = ({ children, title, subtitle, illustrationType = "login" }: AuthLayoutProps) => {
  return (
    <div className="min-h-screen w-full bg-[#FAF8F3] flex items-center justify-center p-4 md:p-8 antialiased">
      {/* Main Auth Card Container */}
      <div className="w-full max-w-[1000px] bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] flex overflow-hidden border border-border/50">
        
        {/* Left Editorial Panel */}
        <aside className="hidden md:flex w-5/12 bg-[#F6F4EB] p-10 flex-col relative">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-16 relative z-10">
            <Image src="/logo.svg" alt="TaskFlow Logo" width={28} height={28} />
            <span className="font-heading text-xl font-bold text-foreground tracking-tight">TaskFlow</span>
          </div>

          {/* Dynamic Content based on screen */}
          <div className="relative z-10 flex-1">
            <h1 className="font-heading text-4xl lg:text-5xl text-foreground mb-6 font-bold tracking-tight leading-[1.1]">
              {illustrationType === "login" ? (
                <>Organize the<br />chaos.<br />Craft your focus.</>
              ) : (
                <>Orchestrate<br />your work.<br />Beautifully.</>
              )}
            </h1>
            <p className="font-sans text-[15px] leading-relaxed text-muted-foreground max-w-[280px]">
              {illustrationType === "login"
                ? "A calm, editorial workspace designed to transform project management from a noisy queue into a focused ledger."
                : "Join a workspace designed for clarity, focus, and quiet productivity. Leave the noise behind."}
            </p>
          </div>


        </aside>

        {/* Right Form Panel */}
        <main className="flex-1 p-6 sm:p-12 md:p-16 flex flex-col justify-center items-center bg-white relative">
          <div className="w-full max-w-[360px]">
            {/* Header */}
            <div className="mb-8">
              <h2 className="font-heading text-3xl font-bold text-foreground mb-2">
                {title}
              </h2>
              <p className="font-sans text-sm text-muted-foreground">
                {subtitle}
              </p>
            </div>
            
            {/* The Form */}
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
