// /app/components/dashboard/RecentSwapItem.tsx
import { getSwapDetails, LOGGED_IN_USER_ID } from "@/lib/action";
import { Swap } from "@/lib/definitions";
import { ArrowRightLeft } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

interface Props {
  swap: Swap;
}

const statusStyles: Record<Swap["status"], string> = {
  pending: "bg-yellow-500/10 text-yellow-700 border-yellow-500/20",
  active: "bg-blue-500/10 text-blue-700 border-blue-500/20",
  completed: "bg-green-500/10 text-green-700 border-green-500/20",
  declined: "bg-red-500/10 text-red-700 border-red-500/20",
};

export const RecentSwapItem = ({ swap }: Props) => {
  const { proposer, receiver, proposerSkill, receiverSkill } =
    getSwapDetails(swap);

  if (!proposer || !receiver || !proposerSkill || !receiverSkill) {
    return null;
  }

  const otherUser = swap.proposerId === LOGGED_IN_USER_ID ? receiver : proposer;

  return (
    <div className="flex items-center gap-4 p-3 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/50 rounded-lg">
      <Image
        src={otherUser.profilePicture}
        alt={otherUser.name}
        width={40}
        height={40}
        className="rounded-full h-10 w-10"
      />
      <div className="flex-1">
        <p className="font-semibold text-sm">Swap with {otherUser.name}</p>
        <p className="text-xs text-zinc-500 flex items-center gap-1.5">
          <span>{proposerSkill.name}</span>
          <ArrowRightLeft className="h-3 w-3" />
          <span>{receiverSkill.name}</span>
        </p>
      </div>
      <div>
        <Badge className={statusStyles[swap.status]}>{swap.status}</Badge>
      </div>
    </div>
  );
};
