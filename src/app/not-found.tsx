import Link from "next/link";
import { AlertTriangle, ArrowLeft } from "lucide-react";

export default function NotFound() {
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
            <AlertTriangle className="size-4" />
            <span className="font-mono text-sm tracking-[0.1em] uppercase">Error Record</span>
        </div>
        <div className="mb-8 max-w-[400px] mx-auto">
            <img 
              alt="Editorial illustration of a person searching through documents" 
              className="w-full h-auto rounded-lg"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCyM5EkJXlFqsWJpid95FQ1gGMyjILNXkxwCnc8Pb0IvVJE7gVJBkZFqbyBp8pRnjQImTt38DZF122H-8df0GwPASNpgKmrgFx9_WqXrrkip-mR6csEAGpncJjE-Wchx_uNfMKbgKRa6vIMZKWQWGlZlongl35R9MiR-CpFZt40o0FQBOjaCkpczizDVmhgUXPcWzuei-7N11dh_YVCb6lFDBQn4aFtfa0R9EaUlm4iA8zDxuSOyvreoM4l00DfK3P7Zja34Dt-B_0" 
            />
        </div>
        <h1 className="font-heading text-6xl font-bold text-foreground mb-4">404</h1>
        <p className="text-lg text-muted-foreground mb-8 max-w-sm mx-auto">
            The page you are looking for has been moved or doesn't exist.
        </p>
        <Link 
          href="/dashboard"
          className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium text-sm rounded-lg hover:bg-primary/90 transition-colors duration-200"
        >
            <ArrowLeft className="size-4" />
            Return to Dashboard
        </Link>
      </main>
    </div>
  );
}
