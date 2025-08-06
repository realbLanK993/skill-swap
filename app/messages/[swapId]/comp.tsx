"use client";

import { useEffect, useState, useRef } from "react";
import { notFound } from "next/navigation";
import {
  fetchMessagesForSwap,
  LOGGED_IN_USER_ID,
  getSwapDetails,
} from "@/lib/action";
import { Message, User, Swap } from "@/lib/definitions";
import { ChatBubble } from "@/components/messages/ChatBubble";
import { MessageInputForm } from "@/components/messages/MessageInputForm";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { swaps } from "@/lib/data";

export default function CompMessage({ swapId }: { swapId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [otherUser, setOtherUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    // Scroll to the bottom whenever messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    async function loadConversation() {
      try {
        const initialMessages = await fetchMessagesForSwap(swapId);
        setMessages(initialMessages);

        // Find the swap to identify the other user
        const currentSwap = swaps.find((s) => s.id === swapId);
        if (currentSwap) {
          const { proposer, receiver } = getSwapDetails(currentSwap);
          setOtherUser(
            currentSwap.proposerId === LOGGED_IN_USER_ID ? receiver! : proposer!
          );
        }
      } catch (error) {
        console.error("Failed to load conversation", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadConversation();
  }, [swapId]);

  if (isLoading) {
    return <div className="text-center p-10">Loading conversation...</div>;
  }

  if (!otherUser) {
    // This can happen if the swapId is invalid
    return notFound();
  }

  const handleNewMessage = (newMessage: Message) => {
    setMessages((prev) => [...prev, newMessage]);
  };

  return (
    <div className="flex flex-col h-[calc(100vh-140px)] max-w-2xl mx-auto bg-white border rounded-lg shadow-sm">
      {/* Header */}
      <div className="flex items-center gap-4 p-3 border-b">
        <Link href="/messages" className="p-2 rounded-full hover:bg-gray-100">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Image
          src={otherUser.profilePicture}
          alt={otherUser.name}
          width={40}
          height={40}
          className="rounded-full"
        />
        <h2 className="font-semibold text-lg">{otherUser.name}</h2>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((msg) => (
          <ChatBubble
            key={msg.id}
            message={msg}
            isOwnMessage={msg.senderId === LOGGED_IN_USER_ID}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <MessageInputForm swapId={swapId} onNewMessage={handleNewMessage} />
    </div>
  );
}
