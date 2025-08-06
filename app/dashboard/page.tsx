// /app/dashboard/page.tsx
import {
  fetchSwapsForUser,
  LOGGED_IN_USER_ID,
  fetchUserById,
} from "@/lib/action";
import { SwapCard } from "@/components/dashboard/SwapCard";
import { notFound } from "next/navigation";
import { Swap } from "@/lib/definitions";

export default async function DashboardPage() {
  const user = await fetchUserById(LOGGED_IN_USER_ID);
  const swaps = await fetchSwapsForUser(LOGGED_IN_USER_ID);

  if (!user) {
    notFound();
  }

  const filterSwaps = (status: Swap["status"]) =>
    swaps.filter((s) => s.status === status);

  return (
    <div>
      <h1 className="text-3xl font-bold tracking-tight mb-2">
        Welcome back, {user.name}!
      </h1>
      <p className="text-gray-600 mb-8">
        Here's an overview of your skill swapping activity.
      </p>

      <div className="space-y-8">
        <div>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Pending Swaps
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {filterSwaps("pending").length > 0 ? (
              filterSwaps("pending").map((swap) => (
                <SwapCard key={swap.id} swap={swap} />
              ))
            ) : (
              <p className="text-gray-500">No pending swaps.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Active Swaps
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {filterSwaps("active").length > 0 ? (
              filterSwaps("active").map((swap) => (
                <SwapCard key={swap.id} swap={swap} />
              ))
            ) : (
              <p className="text-gray-500">No active swaps.</p>
            )}
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-semibold border-b pb-2 mb-4">
            Completed Swaps
          </h2>
          <div className="grid grid-cols-1 gap-4">
            {filterSwaps("completed").length > 0 ? (
              filterSwaps("completed").map((swap) => (
                <SwapCard key={swap.id} swap={swap} />
              ))
            ) : (
              <p className="text-gray-500">No completed swaps.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
