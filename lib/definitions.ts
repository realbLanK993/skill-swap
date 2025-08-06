// /lib/definitions.ts

export type Skill = {
  id: string;
  name: string;
  category: string;
};

export type User = {
  id: string;
  name: string;
  headline: string;
  bio: string;
  profilePicture: string;
  skillsOffered: string[];
  skillsSought: string[];
  rating: number;
  reviews: number;
};

export type Swap = {
  id: string;
  proposerId: string;
  receiverId: string;
  proposerSkillId: string;
  receiverSkillId: string;
  status: "pending" | "active" | "completed" | "declined";
  createdAt: string; // ISO date string
};

// NEW: Message type
export type Message = {
  id: string;
  swapId: string;
  senderId: string;
  content: string;
  timestamp: string; // ISO date string
};

// NEW: Conversation type for the inbox view
export type Conversation = {
  swap: Swap;
  otherUser: User;
  lastMessage: Message | null;
};
