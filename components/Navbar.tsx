// /app/components/Navbar.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Handshake } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuthStatus = () => {
      if (typeof window !== "undefined") {
        const loggedInStatus = localStorage.getItem("isLoggedIn");
        setIsLoggedIn(loggedInStatus === "true");
      }
    };
    checkAuthStatus();
    window.addEventListener("storageChange", checkAuthStatus);
    return () => window.removeEventListener("storageChange", checkAuthStatus);
  }, []);

  const handleSignOut = () => {
    localStorage.removeItem("isLoggedIn");
    window.dispatchEvent(new Event("storageChange"));
    router.push("/");
  };

  return (
    <header className="bg-card/80 backdrop-blur-md sticky top-0 z-50 border-b">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Skill Swap Logo"
              width={32}
              height={32}
              className="h-8 w-8"
            />
            <span className="text-xl font-bold tracking-tight">Skill Swap</span>
          </Link>

          <div className="flex items-center gap-2 md:gap-4">
            {isLoggedIn ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/discover">Discover</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/learn">Learn</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/messages">Messages</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard/profile">My Profile</Link>
                </Button>
                <Button variant="outline" size="sm" onClick={handleSignOut}>
                  Sign Out
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/#features">Features</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Get Started</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
}
