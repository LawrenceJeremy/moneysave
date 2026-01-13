"use client";
import type { Metadata } from "next";
import { useState } from "react";
import "./globals.css";
import { Button } from "@/components/ui/button";
import NavLink from "@/components/NavLink";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [open, setOpen] = useState(false);

  return (
    <html lang="en">
      <title>MyMoney Save</title>
      <body>
        {/* NAVIGATION */}
        <nav className="w-full border-b">
          <div className="mx-auto max-w-6xl px-4">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <h1 className="font-bold text-2xl">MyMoney Save</h1>

              {/* Desktop Nav */}
              <div className="hidden md:flex items-center space-x-12">
                <NavLink />
                <Button size="sm">Get Start</Button>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden"
                onClick={() => setOpen(!open)}
                aria-label="Toggle menu"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
            </div>

            {/* Mobile Menu */}
            {open && (
              <div className="md:hidden pb-4 space-y-4">
                <NavLink />
                <Button size="sm" className="w-full">
                  Get Start
                </Button>
              </div>
            )}
          </div>
        </nav>

        {/* PAGE CONTENT */}
        <main className="min-h-screen mx-auto max-w-6xl my-4">{children}</main>
        {/* FOOTER */}
        <footer className="w-full border-t py-4">
          <div className="mx-auto max-w-6xl px-4">
            <p className="text-sm text-gray-500">
              © 2026 Money Save. All rights reserved.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
