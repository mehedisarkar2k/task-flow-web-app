import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

export const PrivacyScreen = () => {
  return (
    <div className="min-h-screen bg-background font-sans">
      <header className="border-b border-border bg-card">
        <div className="max-w-4xl mx-auto px-6 h-16 flex items-center">
          <Link href="/">
            <Button variant="ghost" className="gap-2 px-0 hover:bg-transparent text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4" />
              Back to TaskFlow
            </Button>
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold font-heading text-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-muted-foreground">
            Last updated: {new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
          </p>
        </div>

        <div className="prose prose-zinc dark:prose-invert max-w-none">
          <p>
            At TaskFlow, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our application.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">1. Information We Collect</h2>
          <p className="text-muted-foreground mb-4">
            We collect information that you provide directly to us when you register for an account, create or modify your profile, and use the TaskFlow platform to manage projects and tasks. This includes:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
            <li>Name and contact data (e.g., email address)</li>
            <li>Profile images and workspace configurations</li>
            <li>Content you create, such as tasks, comments, and project descriptions</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">2. How We Use Your Information</h2>
          <p className="text-muted-foreground mb-4">
            We use the information we collect to operate, maintain, and improve our services. Specifically, we use your data to:
          </p>
          <ul className="list-disc pl-6 text-muted-foreground mb-6 space-y-2">
            <li>Facilitate account creation and authentication</li>
            <li>Send administrative information and notifications</li>
            <li>Improve user experience and troubleshoot issues</li>
            <li>Enforce our terms, conditions, and policies</li>
          </ul>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">3. Data Security</h2>
          <p className="text-muted-foreground mb-6">
            We implement a variety of security measures to maintain the safety of your personal information. However, please be aware that no security measures are perfect or impenetrable, and no method of data transmission can be guaranteed against any interception or other type of misuse.
          </p>

          <h2 className="text-xl font-semibold mt-8 mb-4 text-foreground">4. Contact Us</h2>
          <p className="text-muted-foreground mb-6">
            If you have any questions or comments about this Privacy Policy, please contact us at privacy@taskflow.com.
          </p>
        </div>
      </main>
    </div>
  );
};
