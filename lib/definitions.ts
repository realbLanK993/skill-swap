// /lib/definitions.ts

export type SkillLevel = "Beginner" | "Intermediate" | "Expert";

export type UserSkill = {
  skillId: string;
  level: SkillLevel;
};

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
  // --- UPDATED to use the new UserSkill type ---
  skillsOffered: UserSkill[];
  skillsSought: UserSkill[];
  rating: number;
  reviews: number;
  verified: boolean;
  age: number;
  gender: "Male" | "Female" | "Other" | "Prefer not to say";
  location: string;
};

// --- NEW DATA STRUCTURE for Skill Templates ---
export type TemplateStep = {
  step: number;
  title: string;
  description: string;
  videoUrl?: string; // Optional link to a tutorial video
};

export type SkillTemplate = {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string; // We can use Lucide icon names
  steps: TemplateStep[];
};

// --- Existing types (no changes needed for them in this phase) ---
export type Swap = {
  id: string;
  proposerId: string;
  receiverId: string;
  proposerSkillId: string;
  receiverSkillId: string;
  status: "pending" | "active" | "completed" | "declined";
  createdAt: string;
};

export type Message = {
  id: string;
  swapId: string;
  senderId: string;
  content: string;
  timestamp: string;
};

export type Conversation = {
  swap: Swap;
  otherUser: User;
  lastMessage: Message | null;
};
