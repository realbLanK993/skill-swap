// /app/components/dashboard/SwapCard.tsx
import { Swap } from "@/lib/definitions";
import { getSwapDetails, LOGGED_IN_USER_ID } from "@/lib/action";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightLeft, User } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SwapCardProps {
  swap: Swap;
}

export const SwapCard = ({ swap }: SwapCardProps) => {
  const { proposer, receiver, proposerSkill, receiverSkill } =
    getSwapDetails(swap);

  if (!proposer || !receiver || !proposerSkill || !receiverSkill) {
    return null;
  }

  const otherUser = swap.proposerId === LOGGED_IN_USER_ID ? receiver : proposer;
  const isProposer = swap.proposerId === LOGGED_IN_USER_ID;

  const statusColors = {
    pending: "border-yellow-500",
    active: "border-blue-500",
    completed: "border-green-500",
    declined: "border-red-500",
  };

  return (
    <Card className={`border-l-4 ${statusColors[swap.status]}`}>
      <CardHeader>
        <CardDescription>Swap with {otherUser.name}</CardDescription>
        <CardTitle className="flex items-center gap-4 text-xl">
          <span>
            {isProposer ? "You offer" : `${otherUser.name} offers`}:{" "}
            <strong>{proposerSkill.name}</strong>
          </span>
          <ArrowRightLeft className="text-gray-400" />
          <span>
            {isProposer ? "You get" : `${otherUser.name} gets`}:{" "}
            <strong>{receiverSkill.name}</strong>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500">
          Status:{" "}
          <span className="font-semibold capitalize">{swap.status}</span>
        </p>
        <p className="text-sm text-gray-500">
          Initiated on: {new Date(swap.createdAt).toLocaleDateString()}
        </p>
      </CardContent>
      {swap.status === "pending" && swap.receiverId === LOGGED_IN_USER_ID && (
        <CardFooter className="gap-2">
          <Button>Accept</Button>
          <Button variant="outline">Decline</Button>
        </CardFooter>
      )}
    </Card>
  );
};
