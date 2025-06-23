"use client"

import { useTheme } from "@/hooks/use-theme";
import { ClerkProvider as AuthProvider } from "@clerk/nextjs"
import { dark } from "@clerk/themes"
import { Suspense } from "react";


export function ClerkProvider({ children }: { children: React.ReactNode }) {
  const [isDarkMode] = useTheme();
  return (
    <Suspense>
      <AuthProvider appearance={isDarkMode ? { baseTheme: [dark] } : undefined}>
        {children}
      </AuthProvider>
    </Suspense>
  )
}