// /lib/data.ts
import { User, Skill, Swap, Message } from "./definitions";

// Dummy Skills
export const skills: Skill[] = [
  { id: "1", name: "Web Development", category: "Tech" },
  { id: "2", name: "Graphic Design", category: "Design" },
  { id: "3", name: "Content Writing", category: "Marketing" },
  { id: "4", name: "SEO Optimization", category: "Marketing" },
  { id: "5", name: "Video Editing", category: "Creative" },
  { id: "6", name: "Project Management", category: "Business" },
  { id: "7", name: "Public Speaking", category: "Personal Development" },
  { id: "8", name: "Data Analysis", category: "Tech" },
];

// Dummy Users
export const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    headline: "Full-Stack Developer | React & Node.js Expert",
    bio: "I build beautiful, responsive web applications...",
    profilePicture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    skillsOffered: ["1", "8"],
    skillsSought: ["2", "3"],
    rating: 4.9,
    reviews: 23,
  },
  {
    id: "2",
    name: "Ben Carter",
    headline: "Brand Strategist & Graphic Designer",
    bio: "I specialize in creating memorable brand identities...",
    profilePicture: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    skillsOffered: ["2"],
    skillsSought: ["1", "4"],
    rating: 4.8,
    reviews: 18,
  },
  {
    id: "3",
    name: "Clara Rodriguez",
    headline: "Content Writer & SEO Specialist",
    bio: "Crafting compelling stories that rank on Google...",
    profilePicture: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    skillsOffered: ["3", "4"],
    skillsSought: ["1", "5"],
    rating: 5.0,
    reviews: 31,
  },
  {
    id: "4",
    name: "David Lee",
    headline: "Agile Project Manager",
    bio: "I help teams deliver projects on time and within scope...",
    profilePicture: "https://i.pravatar.cc/150?u=a042581f4e29026708c",
    skillsOffered: ["6"],
    skillsSought: ["7", "8"],
    rating: 4.7,
    reviews: 15,
  },
];

// Dummy Swaps
export const swaps: Swap[] = [
  {
    id: "swap1",
    proposerId: "2",
    receiverId: "1",
    proposerSkillId: "2",
    receiverSkillId: "1",
    status: "pending",
    createdAt: "2025-08-05T10:00:00Z",
  },
  {
    id: "swap2",
    proposerId: "1",
    receiverId: "3",
    proposerSkillId: "1",
    receiverSkillId: "5",
    status: "active",
    createdAt: "2025-07-20T14:30:00Z",
  },
  {
    id: "swap3",
    proposerId: "4",
    receiverId: "1",
    proposerSkillId: "6",
    receiverSkillId: "8",
    status: "completed",
    createdAt: "2025-06-15T18:00:00Z",
  },
  {
    id: "swap4",
    proposerId: "3",
    receiverId: "2",
    proposerSkillId: "4",
    receiverSkillId: "1",
    status: "declined",
    createdAt: "2025-07-30T09:00:00Z",
  },
];

export const messages: Message[] = [
  {
    id: "msg1",
    swapId: "swap1",
    senderId: "2",
    content:
      "Hey Alice! I saw you are a developer. I'd love to trade my design skills for a simple portfolio website. Let me know what you think!",
    timestamp: "2025-08-05T10:00:00Z",
  },
  {
    id: "msg2",
    swapId: "swap1",
    senderId: "1",
    content:
      "Hi Ben! Absolutely, that sounds like a great trade. What kind of portfolio are you imagining?",
    timestamp: "2025-08-05T10:05:00Z",
  },
  {
    id: "msg3",
    swapId: "swap2",
    senderId: "1",
    content:
      "Hey Clara, I can help with the video editing for your YouTube channel. I need some blog posts written in return.",
    timestamp: "2025-07-20T14:30:00Z",
  },
  {
    id: "msg4",
    swapId: "swap2",
    senderId: "3",
    content: "Perfect! Let's do it.",
    timestamp: "2025-07-20T14:35:00Z",
  },
  {
    id: "msg5",
    swapId: "swap1",
    senderId: "2",
    content:
      "Something minimal and clean, just to showcase my top 5 projects. We can discuss the details.",
    timestamp: "2025-08-05T10:10:00Z",
  },
];
