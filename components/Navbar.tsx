// /app/components/Navbar.tsx
import Link from "next/link";
import { Handshake } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";

const Navbar = () => {
  const isLoggedIn = true; // Simulates a logged-in state

  return (
    <header className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-200">
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center gap-2">
            <Image src="/logo.png" alt="Logo" width={32} height={32} />
            <span className="text-xl font-bold tracking-tight text-gray-900">
              Skill Swap
            </span>
          </Link>
          <div className="flex items-center gap-2 md:gap-4">
            <Button variant="ghost" asChild>
              <Link href="/">Discover</Link>
            </Button>
            {isLoggedIn ? (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/messages">Messages</Link>
                </Button>
                <Button variant="ghost" asChild>
                  <Link href="/dashboard/profile">My Profile</Link>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/login">Sign Out</Link>
                </Button>
              </>
            ) : (
              <>
                <Button variant="ghost" asChild>
                  <Link href="/login">Login</Link>
                </Button>
                <Button asChild size="sm">
                  <Link href="/signup">Sign Up</Link>
                </Button>
              </>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
