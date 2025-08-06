// /app/messages/[swapId]/page.tsx
// Using dummy data directly for simplicity

import CompMessage from "./comp";

export default async function ConversationPage({
  params,
}: {
  params: Promise<{ swapId: string }>;
}) {
  const { swapId } = await params;
  return (
    <div className="max-w-2xl mx-auto">
      <CompMessage swapId={swapId} />
    </div>
  );
}
