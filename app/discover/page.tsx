// /app/discover/page.tsx
import { fetchUsers, LOGGED_IN_USER_ID } from "@/lib/action";
import { UserCard } from "@/components/ui/UserCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default async function DiscoverPage() {
  const allUsers = await fetchUsers();
  // Filter out the currently logged-in user
  const usersToDiscover = allUsers.filter(
    (user) => user.id !== LOGGED_IN_USER_ID
  );

  return (
    <section className="space-y-8">
      {/* Header and Filters */}
      <div className="text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Discover Professionals
        </h1>
        <p className="mt-2 text-lg text-zinc-500">
          Find the perfect partner for your next skill swap.
        </p>
        <div className="mt-6 max-w-2xl mx-auto flex gap-2">
          <Input placeholder="Search by skill or name..." className="bg-card" />
          <Button>
            <Search className="h-4 w-4 mr-2" /> Search
          </Button>
        </div>
      </div>

      {/* User Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {usersToDiscover.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
