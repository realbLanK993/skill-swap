import { Conversation } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface Props {
  conversation: Conversation;
  isActive: boolean;
}

export function ConversationPreview({ conversation, isActive }: Props) {
  const { otherUser, lastMessage, swap } = conversation;

  return (
    <Link href={`/messages/${swap.id}`} className="block w-full">
      <div
        className={cn(
          "flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors",
          isActive ? "bg-gray-100" : "hover:bg-gray-100/50"
        )}
      >
        <Image
          src={otherUser.profilePicture}
          alt={otherUser.name}
          width={48}
          height={48}
          className="rounded-full h-12 w-12"
        />
        <div className="flex-1 overflow-hidden">
          <p className="font-semibold truncate">{otherUser.name}</p>
          <p className="text-sm text-gray-500 truncate">
            {lastMessage?.content || "No messages yet."}
          </p>
        </div>
        {lastMessage && (
          <span className="text-xs text-gray-400 self-start">
            {new Date(lastMessage.timestamp).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        )}
      </div>
    </Link>
  );
}
