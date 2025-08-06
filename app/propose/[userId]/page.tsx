// /app/propose/[userId]/page.tsx
import {
  fetchUserById,
  fetchAllSkills,
  LOGGED_IN_USER_ID,
  getSkillName,
} from "@/lib/action";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightLeft } from "lucide-react";
import { notFound } from "next/navigation";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default async function ProposeSwapPage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const currentUser = await fetchUserById(LOGGED_IN_USER_ID);
  const otherUser = await fetchUserById((await params).userId);

  if (!currentUser || !otherUser) {
    notFound();
  }

  return (
    <div className="max-w-2xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Propose a Swap with {otherUser.name}</CardTitle>
          <CardDescription>
            Select a skill you offer in exchange for one of their skills.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="grid gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
              {/* Your Offer */}
              <div className="grid gap-2">
                <Label htmlFor="your-skill" className="font-semibold">
                  {currentUser.name}, you offer:
                </Label>
                <select
                  id="your-skill"
                  className="h-10 w-full rounded-md border border-gray-300 px-3"
                >
                  {currentUser.skillsOffered.map((id) => (
                    <option key={id} value={id}>
                      {getSkillName(id)}
                    </option>
                  ))}
                </select>
              </div>

              <ArrowRightLeft className="hidden md:block mx-auto text-gray-500" />

              {/* Their Offer */}
              <div className="grid gap-2">
                <Label htmlFor="their-skill" className="font-semibold">
                  {otherUser.name} offers:
                </Label>
                <select
                  id="their-skill"
                  className="h-10 w-full rounded-md border border-gray-300 px-3"
                >
                  {otherUser.skillsOffered.map((id) => (
                    <option key={id} value={id}>
                      {getSkillName(id)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="message">Message (optional)</Label>
              <textarea
                id="message"
                placeholder="Add a personal message to your proposal..."
                className="w-full rounded-md border border-gray-300 p-2 min-h-[100px]"
              ></textarea>
            </div>

            <Button type="submit" className="w-full md:w-auto">
              Send Proposal
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
