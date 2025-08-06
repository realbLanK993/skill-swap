// /app/components/ui/UserCard.tsx
import Link from "next/link";
import Image from "next/image";
import { User } from "@/lib/definitions";
import { Star } from "lucide-react";

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  return (
    <Link href={`/profile/${user.id}`}>
      <div className="group block bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
        <div className="flex items-start gap-4">
          <Image
            src={user.profilePicture}
            alt={user.name}
            width={64}
            height={64}
            className="rounded-full object-cover h-16 w-16"
          />
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold text-lg text-gray-900">
                  {user.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-1">
                  {user.headline}
                </p>
              </div>
              <div className="flex items-center gap-1 text-sm text-gray-600 shrink-0">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span>{user.rating.toFixed(1)}</span>
              </div>
            </div>
            <p className="mt-3 text-sm text-gray-600 line-clamp-2">
              {user.bio}
            </p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
