import type { Metadata } from "next";
import { Montserrat, IBM_Plex_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { QueryProvider } from "@/components/query-provider";
import { SplashScreen } from "@/components/splash-screen";
import { Toaster } from "@/components/ui/sonner";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    template: "%s | TaskFlow",
    default: "TaskFlow - Organize the chaos. Craft your focus.",
  },
  description: "A calm, editorial workspace designed to transform project management from a noisy queue into a focused ledger.",
  keywords: [
    "TaskFlow",
    "Project Management",
    "Task Management",
    "Productivity",
    "Team Collaboration",
    "Workflow",
    "Kanban",
  ],
  authors: [{ name: "Mehedi Hasan sarkar", url: "mailto:mehedisarkar2k@gmail.com" }],
  creator: "Mehedi Hasan sarkar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "TaskFlow - Organize the chaos. Craft your focus.",
    description: "A calm, editorial workspace designed to transform project management from a noisy queue into a focused ledger.",
    siteName: "TaskFlow",
  },
  twitter: {
    card: "summary_large_image",
    title: "TaskFlow - Organize the chaos. Craft your focus.",
    description: "A calm, editorial workspace designed to transform project management from a noisy queue into a focused ledger.",
    creator: "@taskflow",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const RootLayout = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${ibmPlexMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="h-full flex flex-col bg-background text-foreground font-sans">
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <SplashScreen />
            {children}
            <Toaster />
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
};

export default RootLayout;
