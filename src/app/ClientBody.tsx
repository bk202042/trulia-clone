"use client";

import React, { useEffect } from "react";
import { Toaster } from "@/components/ui/sonner";

export function ClientBody({ children }: { children: React.ReactNode }) {
  // Remove any extension-added classes during hydration
  useEffect(() => {
    // This runs only on the client after hydration
    document.body.className = "antialiased";
  }, []);

  return (
    <body className="antialiased" suppressHydrationWarning>
      {children}
      <Toaster />
    </body>
  );
}
