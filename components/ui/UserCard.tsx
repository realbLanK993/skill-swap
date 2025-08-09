// /app/components/ui/UserCard.tsx
import Link from "next/link";
import Image from "next/image";
import { User } from "@/lib/definitions";
import { Star, MapPin, ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "./button";
import { getSkillName } from "@/lib/action";
import SkillBadge from "./SkillBadge"; // <-- IMPORTANT: Using our custom SkillBadge now

export const UserCard = ({ user }: { user: User }) => {
  return (
    <div className="bg-card rounded-xl border shadow-sm overflow-hidden flex flex-col h-full">
      {/* Banner Image */}
      <div className="h-24  relative">
        {/* A placeholder for a real banner image */}
      </div>

      {/* Profile Picture and Name */}
      <div className="flex flex-col items-center -mt-14 text-center px-6">
        <Image
          src={user.profilePicture}
          alt={user.name}
          width={96}
          height={96}
          className="rounded-full object-cover border-4 border-card h-24 w-24"
        />
        <div className="flex items-center gap-2 mt-2">
          <h3 className="font-bold text-xl">{user.name}</h3>
          {user.verified && <ShieldCheck className="h-5 w-5 text-primary" />}
        </div>
        <p className="text-sm text-zinc-500">{user.headline}</p>
        <div className="mt-1 flex items-center gap-1.5 text-xs text-zinc-500">
          <MapPin className="h-3 w-3" />
          <span>{user.location}</span>
        </div>
      </div>

      {/* Skills Section (Now correctly reads the new data structure) */}
      <div className="px-6 mt-4 flex-grow">
        <div className="space-y-3">
          <div>
            <h4 className="font-semibold text-xs text-zinc-500 uppercase tracking-wider">
              OFFERS
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {/* --- UPDATED LOGIC --- */}
              {user.skillsOffered.slice(0, 3).map((skill) => (
                <SkillBadge key={skill.skillId} level={skill.level}>
                  {getSkillName(skill.skillId)}
                </SkillBadge>
              ))}
              {user.skillsOffered.length > 3 && (
                <span className="text-xs text-zinc-400 self-center">
                  + {user.skillsOffered.length - 3} more
                </span>
              )}
            </div>
          </div>
          <div>
            <h4 className="font-semibold text-xs text-zinc-500 uppercase tracking-wider">
              SEEKS
            </h4>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {/* --- UPDATED LOGIC --- */}
              {user.skillsSought.slice(0, 2).map((skill) => (
                <SkillBadge key={skill.skillId} level={skill.level}>
                  {getSkillName(skill.skillId)}
                </SkillBadge>
              ))}
              {user.skillsSought.length > 2 && (
                <span className="text-xs text-zinc-400 self-center">
                  + {user.skillsSought.length - 2} more
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="p-6 mt-2">
        <Button asChild className="w-full">
          <Link href={`/profile/${user.id}`}>
            View Profile <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
};
