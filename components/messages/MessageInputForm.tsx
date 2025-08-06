"use client";

import { useState, FormEvent } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";
import { Message } from "@/lib/definitions";
import { LOGGED_IN_USER_ID } from "@/lib/action";

interface Props {
  swapId: string;
  onNewMessage: (message: Message) => void;
}

export function MessageInputForm({ swapId, onNewMessage }: Props) {
  const [content, setContent] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (content.trim() === "") return;

    // In a real app, this would be a server action.
    // Here, we simulate it and update the UI optimistically.
    const newMessage: Message = {
      id: `temp-${Date.now()}`, // Temporary ID
      swapId: swapId,
      senderId: LOGGED_IN_USER_ID,
      content: content.trim(),
      timestamp: new Date().toISOString(),
    };

    onNewMessage(newMessage);
    setContent("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center gap-2 border-t p-4 bg-white"
    >
      <Input
        type="text"
        placeholder="Type a message..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        autoComplete="off"
        className="flex-1"
      />
      <Button type="submit" size="icon" disabled={!content.trim()}>
        <Send className="h-4 w-4" />
      </Button>
    </form>
  );
}
