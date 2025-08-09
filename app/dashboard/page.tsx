// /app/dashboard/page.tsx
import {
  fetchSwapsForUser,
  fetchUserById,
  LOGGED_IN_USER_ID,
} from "@/lib/action";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui/card";
import { CheckCircle, Clock, Search, Users, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { RecentSwapItem } from "@/components/dashboard/RecentSwapItem";

export default async function DashboardHomePage() {
  const user = await fetchUserById(LOGGED_IN_USER_ID);
  const swaps = await fetchSwapsForUser(LOGGED_IN_USER_ID);

  if (!user) {
    notFound();
  }

  const activeSwaps = swaps.filter((s) => s.status === "active");
  const pendingSwaps = swaps.filter(
    (s) => s.status === "pending" && s.receiverId === LOGGED_IN_USER_ID
  );
  const completedSwaps = swaps.filter((s) => s.status === "completed");

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
      {/* Main Content Area */}
      <main className="lg:col-span-2 space-y-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Welcome back, {user.name.split(" ")[0]}!
          </h1>
          <p className="text-zinc-500">
            Here’s what’s happening with your skill swaps.
          </p>
        </div>

        {/* At a Glance Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Swaps
              </CardTitle>
              <Users className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{activeSwaps.length}</div>
              <p className="text-xs text-zinc-500">Ongoing collaborations</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Requests
              </CardTitle>
              <Clock className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{pendingSwaps.length}</div>
              <p className="text-xs text-zinc-500">Awaiting your approval</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Completed Swaps
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-zinc-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{completedSwaps.length}</div>
              <p className="text-xs text-zinc-500">
                Successfully exchanged skills
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Recent Swaps List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              A look at your most recent swap interactions.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {swaps.slice(0, 4).map((swap) => (
                <RecentSwapItem key={swap.id} swap={swap} />
              ))}
              {swaps.length === 0 && (
                <p className="text-sm text-center text-zinc-500 py-4">
                  No swap activity yet.
                </p>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Sidebar for Quick Actions */}
      <aside className="lg:col-span-1 space-y-6">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/discover">
                <Search className="h-4 w-4" /> Find a Collaborator
              </Link>
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start gap-2"
              asChild
            >
              <Link href="/learn">
                <Zap className="h-4 w-4" /> Learn a New Skill
              </Link>
            </Button>
          </div>
        </Card>
      </aside>
    </div>
  );
}
