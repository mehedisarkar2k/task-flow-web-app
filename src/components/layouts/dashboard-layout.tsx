"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/dashboard", icon: "space_dashboard" },
  { label: "Projects", href: "/projects", icon: "folder" },
  { label: "Tasks", href: "/tasks", icon: "task_alt" },
  { label: "Team", href: "/team", icon: "group" },
  { label: "Admin", href: "/admin", icon: "admin_panel_settings" }, // Will hide via RBAC later
];

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="flex h-screen w-full bg-background text-foreground antialiased overflow-hidden">
      {/* Mobile Drawer Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/50 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Left Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0 ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Brand */}
          <div className="h-16 flex items-center px-6 border-b border-border gap-3">
            <Image src="/logo.svg" alt="TaskFlow Logo" width={28} height={28} />
            <span className="font-heading text-xl font-bold tracking-tight">TaskFlow</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {NAV_ITEMS.map((item) => {
              const isActive = pathname?.startsWith(item.href);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                    isActive 
                      ? "bg-primary/10 text-primary" 
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
                  {item.label}
                </Link>
              );
            })}
          </nav>

          {/* User / Logout (Bottom of sidebar for now) */}
          <div className="p-4 border-t border-border">
            <button className="flex items-center gap-3 w-full px-3 py-2.5 rounded-lg text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
              <span className="material-symbols-outlined text-[20px]">logout</span>
              Log out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Bar */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-border bg-card">
          <div className="flex items-center gap-4 flex-1">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <span className="material-symbols-outlined">menu</span>
            </Button>
            
            {/* Global Search */}
            <div className="relative max-w-md w-full hidden sm:block">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-[20px]">search</span>
              <Input 
                placeholder="Search projects, tasks..." 
                className="pl-10 bg-background border-border h-10 w-full rounded-full"
              />
            </div>
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-foreground">
              <span className="material-symbols-outlined text-[20px]">dark_mode</span>
            </Button>
            
            <Button variant="ghost" size="icon" className="relative text-muted-foreground hover:text-foreground">
              <span className="material-symbols-outlined text-[20px]">notifications</span>
              {/* Unread Badge */}
              <span className="absolute top-2 right-2 w-2 h-2 bg-accent rounded-full"></span>
            </Button>

            <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-heading font-medium text-sm ml-2">
              JD
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="mx-auto max-w-6xl w-full">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
