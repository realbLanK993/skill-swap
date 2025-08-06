// /app/messages/page.tsx
import { fetchConversationsForUser, LOGGED_IN_USER_ID } from "@/lib/action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ConversationPreview } from "@/components/messages/ConversationPreview";

export default async function MessagesPage() {
  const conversations = await fetchConversationsForUser(LOGGED_IN_USER_ID);

  return (
    <div className="max-w-md mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>All Conversations</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="space-y-1">
            {conversations.length > 0 ? (
              conversations.map((convo) => (
                <ConversationPreview
                  key={convo.swap.id}
                  conversation={convo}
                  isActive={false}
                />
              ))
            ) : (
              <p className="p-6 text-center text-gray-500">
                You have no messages yet.
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
