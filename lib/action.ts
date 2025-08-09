// /lib/actions.ts
import { users, skills, swaps, messages, templates } from "./data";
import {
  User,
  Skill,
  Swap,
  Message,
  Conversation,
  SkillTemplate,
} from "./definitions";

// Hardcode a user ID to simulate a logged-in session
export const LOGGED_IN_USER_ID = "1";

// Simulate a network delay
const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export async function fetchUsers(): Promise<User[]> {
  await simulateDelay(300);
  return users;
}

export async function fetchUserById(userId: string): Promise<User | undefined> {
  await simulateDelay(300);
  return users.find((user) => user.id === userId);
}

export async function fetchAllSkills(): Promise<Skill[]> {
  return skills;
}

export async function fetchSwapsForUser(userId: string): Promise<Swap[]> {
  await simulateDelay(500);
  return swaps.filter(
    (swap) => swap.proposerId === userId || swap.receiverId === userId
  );
}

// Helper function to get related info for a swap
export function getSwapDetails(swap: Swap) {
  const proposer = users.find((u) => u.id === swap.proposerId);
  const receiver = users.find((u) => u.id === swap.receiverId);
  const proposerSkill = skills.find((s) => s.id === swap.proposerSkillId);
  const receiverSkill = skills.find((s) => s.id === swap.receiverSkillId);
  return { proposer, receiver, proposerSkill, receiverSkill };
}

// Helper function to get skill name from an ID
export function getSkillName(skillId: string): string {
  const skill = skills.find((s) => s.id === skillId);
  return skill?.name || "Unknown Skill";
}

export async function fetchConversationsForUser(
  userId: string
): Promise<Conversation[]> {
  await simulateDelay(500);
  const userSwaps = swaps.filter(
    (s) => s.proposerId === userId || s.receiverId === userId
  );

  const conversations: Conversation[] = userSwaps.map((swap) => {
    const otherUserId =
      swap.proposerId === userId ? swap.receiverId : swap.proposerId;
    const otherUser = users.find((u) => u.id === otherUserId)!;

    const swapMessages = messages
      .filter((m) => m.swapId === swap.id)
      .sort(
        (a, b) =>
          new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
      );

    return {
      swap,
      otherUser,
      lastMessage: swapMessages[0] || null,
    };
  });

  return conversations.sort((a, b) => {
    if (!a.lastMessage) return 1;
    if (!b.lastMessage) return -1;
    return (
      new Date(b.lastMessage.timestamp).getTime() -
      new Date(a.lastMessage.timestamp).getTime()
    );
  });
}

export async function fetchMessagesForSwap(swapId: string): Promise<Message[]> {
  await simulateDelay(300);
  return messages
    .filter((m) => m.swapId === swapId)
    .sort(
      (a, b) =>
        new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );
}

export async function fetchTemplates(): Promise<SkillTemplate[]> {
  await simulateDelay(300); // Simulate network latency
  return templates;
}

export async function fetchTemplateById(
  templateId: string
): Promise<SkillTemplate | undefined> {
  await simulateDelay(300);
  return templates.find((template) => template.id === templateId);
}

export async function hasCompletedSwapWithUser(
  userId1: string,
  userId2: string
): Promise<boolean> {
  await simulateDelay(100); // Simulate a quick check

  const completedSwapExists = swaps.some(
    (swap) =>
      swap.status === "completed" &&
      ((swap.proposerId === userId1 && swap.receiverId === userId2) ||
        (swap.proposerId === userId2 && swap.receiverId === userId1))
  );

  return completedSwapExists;
}
