"use client"; // <-- IMPORTANT: Convert this to a Client Component

import { Conversation } from "@/lib/definitions";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation"; // <-- IMPORTANT: Import the useParams hook
import { cn } from "@/lib/utils";

interface Props {
  // We no longer need isActive here, so we remove it from the props.
  conversation: Conversation;
}

export function ConversationPreview({ conversation }: Props) {
  const params = useParams<{ swapId?: string }>(); // Get the current URL params
  const { otherUser, lastMessage, swap } = conversation;

  // The component now calculates its own active state by comparing its swap ID
  // with the swap ID from the URL.
  const isActive = params.swapId === swap.id;

  return (
    <Link href={`/messages/${swap.id}`} className="block w-full">
      <div
        className={cn(
          "flex items-center gap-4 p-3 rounded-lg cursor-pointer transition-colors",
          // The conditional class now works correctly based on the internal state
          isActive
            ? "bg-primary/10"
            : "hover:bg-zinc-100 dark:hover:bg-zinc-800"
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
          <p
            className={cn(
              "text-sm truncate",
              isActive ? "text-zinc-600 dark:text-zinc-300" : "text-zinc-500"
            )}
          >
            {lastMessage?.content || "No messages yet."}
          </p>
        </div>
        {lastMessage && (
          <span className="text-xs text-zinc-400 self-start">
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
