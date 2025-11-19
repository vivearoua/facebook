"use client";

import { AppProviders } from "@/providers/AppProviders";
import "./globals.css";
import Header from "@/components/Header";
import SideBar from "@/components/SideBar";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();

  const isAuthPage = pathname === "/logIn" || pathname === "/signUp";

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (!token && !isAuthPage) {
      router.push("/logIn");
      return;
    }

    if (token && isAuthPage) {
      router.push("/");
      return;
    }
  }, [pathname]);

  return (
    <html lang="en" suppressHydrationWarning={true}>
      <body suppressHydrationWarning={true}>
        <AppProviders>
          {!isAuthPage && (
            <>
              <Header />
              <SideBar />
            </>
          )}

          {children}
        </AppProviders>
      </body>
    </html>
  );
}
