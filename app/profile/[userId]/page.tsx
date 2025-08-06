// /app/profile/[userId]/page.tsx
import { notFound } from "next/navigation";
import { fetchUserById, getSkillName, LOGGED_IN_USER_ID } from "@/lib/action";
import SkillBadge from "@/components/ui/SkillBadge";
import Image from "next/image";
import { Star, MessageCircle, ArrowRightLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const userId = (await params).userId;
  const user = await fetchUserById(userId);

  if (!user) {
    notFound();
  }

  // This logic checks if you are viewing your own public profile
  const isOwnProfile = user.id === LOGGED_IN_USER_ID;

  return (
    <div className="max-w-4xl mx-auto">
      <Card className="p-8">
        {/* Profile Header */}
        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Image
            src={user.profilePicture}
            alt={user.name}
            width={128}
            height={128}
            className="rounded-full object-cover h-24 w-24 sm:h-32 sm:w-32 border-4 border-white -mt-16 sm:-mt-20 shadow-md"
          />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900">{user.name}</h1>
            <p className="text-md text-gray-500 mt-1">{user.headline}</p>
            <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="font-semibold">{user.rating.toFixed(1)}</span>
                <span className="text-gray-500">({user.reviews} reviews)</span>
              </div>
            </div>
          </div>

          {/* Action buttons are only shown if it is NOT your own profile */}
          {!isOwnProfile && (
            <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto">
              <Button
                variant="secondary"
                className="flex-1 sm:flex-none"
                asChild
              >
                <Link
                  href={`/messages/${user.id}`}
                  className="flex items-center gap-2"
                >
                  <MessageCircle size={16} /> Message
                </Link>
              </Button>
              <Button className="flex-1 sm:flex-none" asChild>
                <Link
                  href={`/propose/${user.id}`}
                  className="flex items-center gap-2"
                >
                  <ArrowRightLeft size={16} /> Propose Swap
                </Link>
              </Button>
            </div>
          )}
        </div>

        {/* Bio */}
        <div className="mt-8">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            About Me
          </h2>
          <p className="mt-4 text-gray-700 leading-relaxed">{user.bio}</p>
        </div>

        {/* Skills */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Skills I Offer
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skillsOffered.map((skillId) => (
                <SkillBadge key={skillId}>{getSkillName(skillId)}</SkillBadge>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Skills I'm Looking For
            </h2>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skillsSought.map((skillId) => (
                <SkillBadge key={skillId}>{getSkillName(skillId)}</SkillBadge>
              ))}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
