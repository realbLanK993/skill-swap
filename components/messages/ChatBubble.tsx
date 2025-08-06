import { Message } from "@/lib/definitions";
import { cn } from "@/lib/utils";

interface Props {
  message: Message;
  isOwnMessage: boolean;
}

export function ChatBubble({ message, isOwnMessage }: Props) {
  return (
    <div
      className={cn(
        "flex items-end gap-2",
        isOwnMessage ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-xs md:max-w-md lg:max-w-lg rounded-2xl px-4 py-2",
          isOwnMessage
            ? "bg-gray-800 text-white rounded-br-none"
            : "bg-gray-200 text-gray-800 rounded-bl-none"
        )}
      >
        <p className="text-sm">{message.content}</p>
      </div>
    </div>
  );
}
