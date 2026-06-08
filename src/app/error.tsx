"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Lock, ArrowLeft, RefreshCw } from "lucide-react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error("Application error:", error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden bg-background">
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none opacity-5 flex justify-center">
          <div className="w-full max-w-[1200px] h-full grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-8 border-x border-foreground">
              {Array.from({ length: 11 }).map((_, i) => (
                  <div key={i} className="border-r border-foreground/20 hidden md:block"></div>
              ))}
              <div className="hidden md:block"></div>
          </div>
      </div>
      <main className="w-full max-w-md text-center relative z-10 flex flex-col items-center">
        <div className="w-16 h-px bg-muted-foreground mb-6 mx-auto"></div>
        <div className="mb-2 flex items-center justify-center gap-2 text-muted-foreground">
            <Lock className="size-4" />
            <span className="font-mono text-sm tracking-[0.1em] uppercase">System Error</span>
        </div>
        <div className="mb-8 max-w-[400px] mx-auto">
            <img 
              alt="Editorial illustration for error" 
              className="w-full h-auto rounded-lg"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCdIQppuXqW6CR5CVRwTkUfVMW3evegP2tq0dYf35wnhtVFRbnrnpeOTPN16OCE83KWLM-f3YynCiCeCa40gfRF0m8grLeN96oQN0F4bd18is_uVBYbDyY_zmqc0829GdLjxorOMDNzhZUcERgTJcGPWbmLSzZynXGtEF-Hjo4LAkFL4PrCgyE5L7aO15w4NQaX0qLlnmrmFIsj3z6ny7EDzCnMfxy8LWbbpW3SapduODxszh5BgMmv6xnrS2TGVI01RXlxJPSQOHk" 
            />
        </div>
        <h1 className="font-heading text-6xl font-bold text-foreground mb-4">500</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-sm mx-auto">
            An unexpected system error occurred. Our engineers have been notified.
        </p>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-secondary text-secondary-foreground font-medium text-sm rounded-lg hover:bg-secondary/90 transition-colors duration-200"
          >
              <RefreshCw className="size-4" />
              Try Again
          </button>
          <Link 
            href="/dashboard"
            className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors duration-200"
          >
              <ArrowLeft className="size-4" />
              Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
