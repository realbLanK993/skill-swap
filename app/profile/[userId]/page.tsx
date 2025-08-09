"use client"; // <-- IMPORTANT: Converted to a Client Component

import { useState, useEffect } from "react";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  MessageCircle,
  ArrowRightLeft,
  ShieldCheck,
  MapPin,
  Cake,
  User as UserIcon,
  Lock,
} from "lucide-react";
import {
  fetchUserById,
  getSkillName,
  LOGGED_IN_USER_ID,
  hasCompletedSwapWithUser,
} from "@/lib/action";
import { User } from "@/lib/definitions";
import SkillBadge from "@/components/ui/SkillBadge";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { StarRating } from "@/components/profile/StarRating";

export default function ProfilePage() {
  const params = useParams<{ userId: string }>();
  const userId = params.userId;

  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [canRate, setCanRate] = useState(false);

  useEffect(() => {
    if (!userId) return;

    async function loadProfileData() {
      setIsLoading(true);
      try {
        const fetchedUser = await fetchUserById(userId as string);
        if (fetchedUser) {
          setUser(fetchedUser);
          // Check if the logged-in user can rate this profile
          const hasCompleted = await hasCompletedSwapWithUser(
            LOGGED_IN_USER_ID,
            fetchedUser.id
          );
          setCanRate(hasCompleted);
        }
      } catch (error) {
        console.error("Failed to load profile data:", error);
      } finally {
        setIsLoading(false);
      }
    }

    loadProfileData();
  }, [userId]);

  const handleRatingSubmit = (rating: number) => {
    // In a real app, you would send this rating to your backend.
    // For this prototype, we'll just log it.
    console.log(`Submitted rating of ${rating} for user ${user?.name}`);
    // Optionally, you could disable the rating form after submission.
    setCanRate(false); // To prevent re-rating in this session
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading profile...</div>;
  }

  if (!user) {
    return notFound();
  }

  const isOwnProfile = user.id === LOGGED_IN_USER_ID;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-12">
      {/* Main Profile Content */}
      <div className="lg:col-span-2">
        <Card className="p-8">
          {/* ... (Profile Header and Bio sections remain the same) ... */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Image
              src={user.profilePicture}
              alt={user.name}
              width={128}
              height={128}
              className="rounded-full object-cover h-24 w-24 sm:h-32 sm:w-32 border-4 border-card -mt-16 sm:-mt-20 shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold text-card-foreground">
                  {user.name}
                </h1>
                {user.verified && (
                  <ShieldCheck className="h-6 w-6 text-primary" />
                )}
              </div>
              <p className="text-md text-zinc-500 mt-1">{user.headline}</p>
            </div>
            {!isOwnProfile && (
              <div className="flex gap-2 mt-4 sm:mt-0 w-full sm:w-auto shrink-0">
                <Button variant="secondary" asChild>
                  <Link href="/messages" className="flex items-center gap-2">
                    <MessageCircle size={16} /> Message
                  </Link>
                </Button>
                <Button asChild>
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
          <div className="mt-8">
            <h2 className="text-xl font-semibold text-card-foreground border-b pb-2">
              About Me
            </h2>
            <p className="mt-4 text-zinc-600 leading-relaxed">{user.bio}</p>
          </div>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-xl font-semibold text-card-foreground border-b pb-2">
                Skills I Offer
              </h2>
              <div className="mt-4 flex flex-wrap gap-2">
                {user.skillsOffered.map((skillId) => (
                  <SkillBadge key={skillId}>{getSkillName(skillId)}</SkillBadge>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-card-foreground border-b pb-2">
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

      {/* Sidebar with Details */}
      <aside className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>User Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-zinc-500" />
              <span className="text-zinc-700">{user.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Cake className="h-5 w-5 text-zinc-500" />
              <span className="text-zinc-700">{user.age} years old</span>
            </div>
            <div className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 text-zinc-500" />
              <span className="text-zinc-700">{user.gender}</span>
            </div>
          </CardContent>
        </Card>

        {/* --- CONDITIONAL RATING CARD --- */}
        {!isOwnProfile && (
          <Card>
            <CardHeader>
              <CardTitle>Leave a Rating</CardTitle>
            </CardHeader>
            <CardContent>
              {canRate ? (
                <StarRating onSubmitRating={handleRatingSubmit} />
              ) : (
                <div className="text-center text-sm text-zinc-500 p-4 bg-zinc-100 dark:bg-zinc-800 rounded-md">
                  <Lock className="h-6 w-6 mx-auto mb-2 text-zinc-400" />
                  You can only rate users you have completed a swap with.
                </div>
              )}
            </CardContent>
          </Card>
        )}
        {/* Reputation card from before, could be updated with new rating eventually */}
        <Card>
          <CardHeader>
            <CardTitle>Reputation</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500 fill-current" />
            <span className="font-bold text-lg">{user.rating.toFixed(1)}</span>
            <span className="text-zinc-500">({user.reviews} reviews)</span>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
