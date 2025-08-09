// /lib/data.ts
import { User, Skill, Swap, Message, SkillTemplate } from "./definitions";

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

export const users: User[] = [
  {
    id: "1",
    name: "Alice Johnson",
    headline: "Full-Stack Developer | React & Node.js Expert",
    bio: "I build beautiful, responsive web applications...",
    profilePicture: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    skillsOffered: [
      { skillId: "1", level: "Expert" },
      { skillId: "8", level: "Intermediate" },
    ],
    skillsSought: [
      { skillId: "2", level: "Beginner" },
      { skillId: "3", level: "Intermediate" },
    ],
    rating: 4.9,
    reviews: 23,
    verified: true,
    age: 29,
    gender: "Female",
    location: "San Francisco, CA",
  },
  {
    id: "2",
    name: "Ben Carter",
    headline: "Brand Strategist & Graphic Designer",
    bio: "I specialize in creating memorable brand identities...",

    profilePicture: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    skillsOffered: [{ skillId: "2", level: "Expert" }],
    skillsSought: [
      { skillId: "1", level: "Intermediate" },
      { skillId: "4", level: "Beginner" },
    ],
    rating: 4.8,
    reviews: 18,
    verified: false,
    age: 34,
    gender: "Male",
    location: "New York, NY",
  },
  {
    id: "3",
    name: "Clara Rodriguez",
    headline: "Content Writer & SEO Specialist",
    bio: "Crafting compelling stories that rank on Google...",
    profilePicture: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    skillsOffered: [
      { skillId: "3", level: "Expert" },
      { skillId: "4", level: "Expert" },
    ],
    skillsSought: [
      { skillId: "1", level: "Beginner" },
      { skillId: "5", level: "Intermediate" },
    ],
    rating: 5.0,
    reviews: 31,
    verified: true,
    age: 27,
    gender: "Female",
    location: "Austin, TX",
  },
  {
    id: "4",
    name: "David Lee",
    headline: "Agile Project Manager",
    bio: "I help teams deliver projects on time and within scope...",
    profilePicture: "https://i.pravatar.cc/150?u=a042581f4e29026708c",
    skillsOffered: [{ skillId: "6", level: "Intermediate" }],
    skillsSought: [
      { skillId: "7", level: "Beginner" },
      { skillId: "8", level: "Beginner" },
    ],
    rating: 4.7,
    reviews: 15,
    verified: true,
    age: 41,
    gender: "Male",
    location: "Chicago, IL",
  },
];

// --- NEW Skill Templates data ---
export const templates: SkillTemplate[] = [
  {
    id: "template-1",
    title: "Learn Basic Guitar Chords",
    category: "Music",
    icon: "Music",
    description:
      "Master the 4 fundamental chords (G, C, D, Em) that unlock hundreds of popular songs.",
    steps: [
      {
        step: 1,
        title: "Anatomy of the Guitar",
        description:
          "Learn the names of the parts of your guitar, from the headstock to the body.",
      },
      {
        step: 2,
        title: "How to Read Chord Diagrams",
        description:
          "Understand how diagrams show you where to place your fingers on the fretboard.",
      },
      {
        step: 3,
        title: "Mastering the G Chord",
        description:
          "Practice finger placement for the G chord until you can form it cleanly.",
      },
      {
        step: 4,
        title: "Transitioning Between Chords",
        description:
          "The key to playing songs is smoothly moving from one chord to another. Practice G to C transitions.",
      },
      {
        step: 5,
        title: "Strumming Your First Song",
        description:
          "Using a simple down-down-up-up-down-up strumming pattern, play a simple progression.",
      },
    ],
  },
  {
    id: "template-2",
    title: "Introduction to Salsa Dancing",
    category: "Dance",
    icon: "PersonStanding",
    description:
      "Learn the fundamental forward-and-back basic step of salsa dancing.",
    steps: [
      {
        step: 1,
        title: "Understanding the Rhythm",
        description:
          "Listen to salsa music and learn to count the 8 beats. The basic step uses 6 of these 8 counts.",
      },
      {
        step: 2,
        title: "The Leader's Forward Basic",
        description:
          "On beat 1, step forward with your left foot. On beat 2, replace your right foot. On beat 3, step back with your left foot.",
      },
      {
        step: 3,
        title: "The Leader's Backward Basic",
        description:
          "On beat 5, step back with your right foot. On beat 6, replace your left foot. On beat 7, step forward with your right foot.",
      },
      {
        step: 4,
        title: "Follower's Steps",
        description:
          "The follower's steps mirror the leader's. On beat 1, step back with your right foot.",
      },
      {
        step: 5,
        title: "Putting It All Together",
        description:
          "Practice the full 8-count basic step with a partner or solo until it feels natural.",
      },
    ],
  },
];

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
