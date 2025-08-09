// /app/page.tsx
import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function MarketingHomePage() {
  return (
    <div className="space-y-24">
      {/* Hero Section */}
      <section className="text-center py-20">
        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tighter text-gray-900">
          Unlock Your Potential.
          <span className="block text-teal-600">Barter Your Skills.</span>
        </h1>
        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-600">
          Join a professional community where talent is the currency. Swap your
          expertise, learn new skills, and grow your network—all without
          spending a dime.
        </p>
        <div className="mt-8 flex justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/signup">
              Get Started for Free <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="text-center">
        <h2 className="text-3xl font-bold">Why Skill Swap?</h2>
        <p className="mt-2 text-gray-500">
          Everything you need to build valuable connections.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-8 border rounded-lg bg-white">
            <Users className="mx-auto h-12 w-12 text-teal-600" />
            <h3 className="mt-4 text-xl font-semibold">Grow Your Network</h3>
            <p className="mt-2 text-gray-600">
              Connect with talented professionals from diverse fields and
              collaborate on meaningful projects.
            </p>
          </div>
          <div className="p-8 border rounded-lg bg-white">
            <BarChart className="mx-auto h-12 w-12 text-teal-600" />
            <h3 className="mt-4 text-xl font-semibold">Level Up Your Skills</h3>
            <p className="mt-2 text-gray-600">
              Access expertise you need. Trade your graphic design skills for
              web development, or marketing for project management.
            </p>
          </div>
          <div className="p-8 border rounded-lg bg-white">
            <Zap className="mx-auto h-12 w-12 text-teal-600" />
            <h3 className="mt-4 text-xl font-semibold">
              Zero Cost, High Value
            </h3>
            <p className="mt-2 text-gray-600">
              Our platform is built on the principle of mutual benefit. Your
              talent is your investment.
            </p>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="py-16">
        <h2 className="text-3xl font-bold text-center">
          Simple, Secure, and Effective
        </h2>
        <div className="mt-12 max-w-4xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h3 className="text-xl font-semibold">1. Create Your Profile</h3>
              <p className="text-gray-600">
                Showcase the skills you offer and list the skills you're looking
                for.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">2. Discover & Connect</h3>
              <p className="text-gray-600">
                Browse profiles, find the right match, and send a swap proposal.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold">3. Agree & Collaborate</h3>
              <p className="text-gray-600">
                Formalize the swap details and start working together.
              </p>
            </div>
          </div>
          <div className="bg-gray-100 p-8 rounded-lg text-center">
            <h3 className="font-bold text-lg">Ready to Swap?</h3>
            <p className="mt-2">
              Join today and become part of a thriving professional ecosystem.
            </p>
            <Button className="mt-6" asChild>
              <Link href="/signup">Sign Up Now</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
