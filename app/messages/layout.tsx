// /app/messages/layout.tsx
import { fetchConversationsForUser, LOGGED_IN_USER_ID } from "@/lib/action";
import { Card } from "@/components/ui/card";
import { ConversationPreview } from "@/components/messages/ConversationPreview";

export default async function MessagesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const conversations = await fetchConversationsForUser(LOGGED_IN_USER_ID);

  return (
    <div className="flex h-[calc(100vh-120px)]">
      {/* Sidebar with Conversation List */}
      <Card className="w-1/3 min-w-[300px] max-w-[400px] flex flex-col rounded-r-none">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold">Conversations</h2>
        </div>
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {conversations.length > 0 ? (
            conversations.map((convo) => (
              <ConversationPreview key={convo.swap.id} conversation={convo} />
            ))
          ) : (
            <p className="p-4 text-center text-zinc-500">
              You have no messages yet.
            </p>
          )}
        </div>
      </Card>

      {/* Main Chat Area */}
      <main className="flex-1">{children}</main>
    </div>
  );
}
