// /app/dashboard/settings/page.tsx
"use client"; // <-- IMPORTANT: Convert the page to a Client Component

import { useState, useEffect, FormEvent } from "react";
import { notFound } from "next/navigation";
import { fetchUserById, getSkillName, LOGGED_IN_USER_ID } from "@/lib/action";
import { User } from "@/lib/definitions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PlusCircle, Trash2 } from "lucide-react";

export default function SettingsPage() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // State for the input fields
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [newSoughtSkill, setNewSoughtSkill] = useState("");

  // State to hold the names of temporarily added skills
  const [tempSkillNames, setTempSkillNames] = useState<Record<string, string>>(
    {}
  );

  // Fetch initial user data on component mount
  useEffect(() => {
    async function loadUserSettings() {
      const fetchedUser = await fetchUserById(LOGGED_IN_USER_ID);
      if (fetchedUser) {
        setUser(fetchedUser);
      }
      setIsLoading(false);
    }
    loadUserSettings();
  }, []);

  const getDynamicSkillName = (skillId: string): string => {
    return tempSkillNames[skillId] || getSkillName(skillId);
  };

  const handleAddSkill = (skillType: "offered" | "sought") => {
    if (!user) return;

    const skillName =
      skillType === "offered" ? newOfferedSkill.trim() : newSoughtSkill.trim();
    if (!skillName) return;

    const tempId = `temp-${Date.now()}`;

    // Update the temporary names map
    setTempSkillNames((prev) => ({ ...prev, [tempId]: skillName }));

    // Update the user state immutably
    if (skillType === "offered") {
      setUser({ ...user, skillsOffered: [...user.skillsOffered, tempId] });
      setNewOfferedSkill(""); // Clear input
    } else {
      setUser({ ...user, skillsSought: [...user.skillsSought, tempId] });
      setNewSoughtSkill(""); // Clear input
    }
  };

  const handleRemoveSkill = (
    skillIdToRemove: string,
    skillType: "offered" | "sought"
  ) => {
    if (!user) return;

    // Remove from the temporary names map if it exists there
    if (skillIdToRemove.startsWith("temp-")) {
      setTempSkillNames((prev) => {
        const newNames = { ...prev };
        delete newNames[skillIdToRemove];
        return newNames;
      });
    }

    // Update the user state by filtering out the skill
    if (skillType === "offered") {
      setUser({
        ...user,
        skillsOffered: user.skillsOffered.filter(
          (id) => id !== skillIdToRemove
        ),
      });
    } else {
      setUser({
        ...user,
        skillsSought: user.skillsSought.filter((id) => id !== skillIdToRemove),
      });
    }
  };

  if (isLoading) {
    return <div className="text-center p-10">Loading settings...</div>;
  }

  if (!user) {
    return notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-gray-600">
          Update your profile information and manage your skills.
        </p>
      </div>

      {/* Profile Information Card (remains for context) */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
          <CardDescription>
            This is how your name and bio will appear to others.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={user.name} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input id="headline" defaultValue={user.headline} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea id="bio" defaultValue={user.bio} rows={5} />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Skills Management Card (Now Interactive) */}
      <Card>
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>
            Add or remove the skills you offer and the skills you are looking
            for.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Skills Offered */}
          <div className="space-y-4">
            <h3 className="font-semibold">Skills You Offer</h3>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
              {user.skillsOffered.map((id) => (
                <div
                  key={id}
                  className="flex items-center gap-1 bg-teal-100 text-teal-800 text-xs font-medium pl-2.5 pr-1 py-1 rounded-full"
                >
                  <span>{getDynamicSkillName(id)}</span>
                  <button
                    onClick={() => handleRemoveSkill(id, "offered")}
                    className="hover:bg-teal-200 rounded-full p-0.5"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSkill("offered");
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="e.g., Python"
                value={newOfferedSkill}
                onChange={(e) => setNewOfferedSkill(e.target.value)}
              />
              <Button type="submit" variant="secondary" size="icon">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </form>
          </div>
          {/* Skills Sought */}
          <div className="space-y-4">
            <h3 className="font-semibold">Skills You Seek</h3>
            <div className="flex flex-wrap gap-2 min-h-[40px] p-2 border rounded-md">
              {user.skillsSought.map((id) => (
                <div
                  key={id}
                  className="flex items-center gap-1 bg-gray-200 text-gray-800 text-xs font-medium pl-2.5 pr-1 py-1 rounded-full"
                >
                  <span>{getDynamicSkillName(id)}</span>
                  <button
                    onClick={() => handleRemoveSkill(id, "sought")}
                    className="hover:bg-gray-300 rounded-full p-0.5"
                  >
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleAddSkill("sought");
              }}
              className="flex gap-2"
            >
              <Input
                placeholder="e.g., Logo Design"
                value={newSoughtSkill}
                onChange={(e) => setNewSoughtSkill(e.target.value)}
              />
              <Button type="submit" variant="secondary" size="icon">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </form>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Skill Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
