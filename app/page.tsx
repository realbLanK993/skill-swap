import UserCard from "@/components/ui/UserCard";
import { fetchUsers } from "@/lib/action";

export default async function HomePage() {
  const users = await fetchUsers();

  return (
    <section>
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tighter text-gray-900 sm:text-5xl">
          Swap Your Talent
        </h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600">
          A professional community for bartering skills. Find a collaborator for
          your next project.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {users.map((user) => (
          <UserCard key={user.id} user={user} />
        ))}
      </div>
    </section>
  );
}
