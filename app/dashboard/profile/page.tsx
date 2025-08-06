// /app/dashboard/profile/page.tsx
import { notFound } from "next/navigation";
import { fetchUserById, getSkillName, LOGGED_IN_USER_ID } from "@/lib/action";
import SkillBadge from "@/components/ui/SkillBadge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Edit, Settings } from "lucide-react";

export default async function MyProfilePage() {
  const user = await fetchUserById(LOGGED_IN_USER_ID);

  if (!user) {
    // This should ideally redirect to login if no user is found
    notFound();
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Your Profile</h1>
        <p className="text-gray-600">
          This is how other users see your profile. Keep it updated!
        </p>
      </div>

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
            <h2 className="text-3xl font-bold text-gray-900">{user.name}</h2>
            <p className="text-md text-gray-500 mt-1">{user.headline}</p>
          </div>
          <Button variant="outline" asChild>
            <Link
              href="/dashboard/settings"
              className="flex items-center gap-2"
            >
              <Edit size={16} /> Edit Profile
            </Link>
          </Button>
        </div>

        {/* Bio */}
        <div className="mt-8">
          <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Your Bio
          </h3>
          <p className="mt-4 text-gray-700 leading-relaxed">{user.bio}</p>
        </div>

        {/* Skills */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Skills You Offer
              </h3>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Settings size={14} className="mr-2" /> Manage
              </Button>
            </div>
            <div className="mt-4 flex flex-wrap gap-2">
              {user.skillsOffered.map((skillId) => (
                <SkillBadge key={skillId}>{getSkillName(skillId)}</SkillBadge>
              ))}
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center border-b pb-2">
              <h3 className="text-lg font-semibold text-gray-800">
                Skills You Seek
              </h3>
              <Button variant="ghost" size="sm" className="text-gray-500">
                <Settings size={14} className="mr-2" /> Manage
              </Button>
            </div>
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
