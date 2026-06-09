"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ArrowRight, CheckCircle2, Moon, Sun } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";

export const LandingScreen = () => {
  const { user, isLoading } = useAuth();
  const { theme, resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="min-h-screen bg-background flex flex-col font-sans">
      {/* Header */}
      <header className="relative z-10 flex items-center justify-between py-6 px-8 lg:px-12 max-w-7xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <Image src="/logo.svg" alt="TaskFlow Logo" width={28} height={28} />
          <span className="font-heading font-bold text-xl tracking-tight text-foreground">
            TaskFlow
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground cursor-pointer"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label="Toggle theme"
          >
            {mounted ? (
              resolvedTheme === "dark" ? <Sun className="size-5" /> : <Moon className="size-5" />
            ) : (
              <div className="size-5" />
            )}
          </Button>

          {isLoading ? (
            <Skeleton className="h-10 w-24 rounded-full" />
          ) : user ? (
            <Link href="/dashboard" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
              <span className="text-sm font-medium hidden sm:inline-block">{user.name || "User"}</span>
              <Avatar className="h-10 w-10 border border-border cursor-pointer">
                <AvatarImage src={user.image || ""} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {user.name?.charAt(0).toUpperCase() || "U"}
                </AvatarFallback>
              </Avatar>
            </Link>
          ) : (
            <Link href="/auth/login">
              <Button variant="outline" className="rounded-full px-6 cursor-pointer">
                Log in
              </Button>
            </Link>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 text-center -mt-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8">
          <CheckCircle2 className="w-4 h-4" />
          <span>Task management simplified</span>
        </div>
        
        <h1 className="text-5xl md:text-7xl font-bold font-heading tracking-tight text-foreground max-w-4xl mb-6">
          Organize the chaos. <br className="hidden sm:block" />
          <span className="text-muted-foreground">Craft your focus.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-10 leading-relaxed">
          A calm, editorial workspace designed to transform project management from a noisy queue into a focused ledger.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center gap-4">
          <Link href={user ? "/dashboard" : "/auth/signup"}>
            <Button size="lg" className="rounded-full h-14 px-8 text-base shadow-sm group">
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          {!user && (
            <Link href="/auth/login">
              <Button size="lg" variant="ghost" className="rounded-full h-14 px-8 text-base">
                Log in to workspace
              </Button>
            </Link>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-border/50 py-6 px-6 relative z-10 bg-background/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} TaskFlow. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/how-it-works" className="hover:text-foreground transition-colors">
              How it works
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
