// /app/dashboard/profile/page.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { notFound } from "next/navigation";
import { fetchUserById, getSkillName, LOGGED_IN_USER_ID } from "@/lib/action";
import { User, SkillLevel, UserSkill } from "@/lib/definitions";
import SkillBadge from "@/components/ui/SkillBadge";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Edit,
  PlusCircle,
  ShieldCheck,
  MapPin,
  Cake,
  User as UserIcon,
} from "lucide-react";

export default function MyProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tempSkillNames, setTempSkillNames] = useState<Record<string, string>>(
    {}
  );

  // --- NEW: State for skill level selection ---
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newOfferedSkillLevel, setNewOfferedSkillLevel] =
    useState<SkillLevel>("Beginner");
  const [newSoughtSkill, setNewSoughtSkill] = useState("");
  const [newSoughtSkillLevel, setNewSoughtSkillLevel] =
    useState<SkillLevel>("Beginner");

  useEffect(() => {
    async function loadUserProfile() {
      const fetchedUser = await fetchUserById(LOGGED_IN_USER_ID);
      if (fetchedUser) setUser(fetchedUser);
      setIsLoading(false);
    }
    loadUserProfile();
  }, []);

  const getDynamicSkillName = (skill: UserSkill): string => {
    if (skill.skillId.startsWith("temp-")) {
      return tempSkillNames[skill.skillId] || "New Skill";
    }
    return getSkillName(skill.skillId);
  };

  // --- UPDATED: Handler function to use the new level state ---
  const handleAddOfferedSkill = (e: FormEvent) => {
    e.preventDefault();
    if (!newOfferedSkill.trim() || !user) return;

    const tempId = `temp-offered-${Date.now()}`;
    setTempSkillNames((prev) => ({
      ...prev,
      [tempId]: newOfferedSkill.trim(),
    }));

    const newUserSkill: UserSkill = {
      skillId: tempId,
      level: newOfferedSkillLevel,
    }; // Use state for level

    setUser({
      ...user,
      skillsOffered: [...(user.skillsOffered || []), newUserSkill],
    });
    setNewOfferedSkill("");
  };

  // --- UPDATED: Handler function to use the new level state ---
  const handleAddSoughtSkill = (e: FormEvent) => {
    e.preventDefault();
    if (!newSoughtSkill.trim() || !user) return;

    const tempId = `temp-sought-${Date.now()}`;
    setTempSkillNames((prev) => ({ ...prev, [tempId]: newSoughtSkill.trim() }));

    const newUserSkill: UserSkill = {
      skillId: tempId,
      level: newSoughtSkillLevel,
    }; // Use state for level

    setUser({
      ...user,
      skillsSought: [...(user.skillsSought || []), newUserSkill],
    });
    setNewSoughtSkill("");
  };

  if (isLoading)
    return <div className="text-center p-10">Loading profile...</div>;
  if (!user) return notFound();

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start pt-12">
      {/* Main Profile Content */}
      <div className="lg:col-span-2 space-y-6">
        <Card className="p-8">
          {/* ... (Header and Bio sections unchanged) ... */}
          <div className="flex flex-col sm:flex-row items-start gap-6">
            <Image
              src={user.profilePicture}
              alt={user.name}
              width={128}
              height={128}
              className="rounded-full object-cover h-24 w-24 sm:h-32 sm:w-32 border-4 border-card -mt-16 sm:-mt-20 shadow-lg"
            />
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-3xl font-bold">{user.name}</h1>
                {user.verified && (
                  <ShieldCheck className="h-6 w-6 text-primary" />
                )}
              </div>
              <p className="text-md text-zinc-500 mt-1">{user.headline}</p>
            </div>
            <Button variant="outline" asChild>
              <Link
                href="/dashboard/settings"
                className="flex items-center gap-2"
              >
                <Edit size={16} /> Edit Profile
              </Link>
            </Button>
          </div>
          <div className="mt-8">
            <h2 className="text-xl font-semibold border-b pb-2">Your Bio</h2>
            <p className="mt-4 text-zinc-600 leading-relaxed">{user.bio}</p>
          </div>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Manage Your Skills</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* --- UPDATED Skills I Offer Section --- */}
            <div className="space-y-4">
              <h3 className="font-semibold">Skills You Offer</h3>
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {user.skillsOffered?.map((skill) => (
                  <SkillBadge key={skill.skillId} level={skill.level}>
                    {getDynamicSkillName(skill)}
                  </SkillBadge>
                ))}
              </div>
              <form onSubmit={handleAddOfferedSkill} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a skill..."
                  value={newOfferedSkill}
                  onChange={(e) => setNewOfferedSkill(e.target.value)}
                />
                <Select
                  value={newOfferedSkillLevel}
                  onValueChange={(v) =>
                    setNewOfferedSkillLevel(v as SkillLevel)
                  }
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" size="icon" variant="secondary">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </form>
            </div>
            {/* --- UPDATED Skills I Seek Section --- */}
            <div className="space-y-4">
              <h3 className="font-semibold">Skills You Seek</h3>
              <div className="flex flex-wrap gap-2 min-h-[40px]">
                {user.skillsSought?.map((skill) => (
                  <SkillBadge key={skill.skillId} level={skill.level}>
                    {getDynamicSkillName(skill)}
                  </SkillBadge>
                ))}
              </div>
              <form onSubmit={handleAddSoughtSkill} className="flex gap-2">
                <Input
                  type="text"
                  placeholder="Add a skill..."
                  value={newSoughtSkill}
                  onChange={(e) => setNewSoughtSkill(e.target.value)}
                />
                <Select
                  value={newSoughtSkillLevel}
                  onValueChange={(v) => setNewSoughtSkillLevel(v as SkillLevel)}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Beginner">Beginner</SelectItem>
                    <SelectItem value="Intermediate">Intermediate</SelectItem>
                    <SelectItem value="Expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <Button type="submit" size="icon" variant="secondary">
                  <PlusCircle className="h-5 w-5" />
                </Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar with Details (unchanged) */}
      <aside className="lg:col-span-1 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Your Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 text-sm">
            <div className="flex items-center gap-3">
              <MapPin className="h-5 w-5 text-zinc-500" />
              <span className="text-zinc-700">{user.location}</span>
            </div>
            <div className="flex items-center gap-3">
              <Cake className="h-5 w-5 text-zinc-500" />
              <span className="text-zinc-700">{user.age} years old</span>
            </div>
            <div className="flex items-center gap-3">
              <UserIcon className="h-5 w-5 text-zinc-500" />
              <span className="text-zinc-700">{user.gender}</span>
            </div>
          </CardContent>
        </Card>
      </aside>
    </div>
  );
}
