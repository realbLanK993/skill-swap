// /app/messages/page.tsx
import { MessageCircle } from "lucide-react";

export default function MessagesPlaceholderPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full bg-card border-l rounded-l-none">
      <MessageCircle className="h-16 w-16 text-zinc-300" />
      <h2 className="mt-4 text-xl font-semibold">Select a conversation</h2>
      <p className="text-zinc-500">
        Choose a chat from the sidebar to view messages.
      </p>
    </div>
  );
}
