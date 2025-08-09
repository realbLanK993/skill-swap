// /app/dashboard/settings/page.tsx
"use client";

import { useState, useEffect, FormEvent } from "react";
import { notFound } from "next/navigation";
import { fetchUserById, getSkillName, LOGGED_IN_USER_ID } from "@/lib/action";
import { User, SkillLevel } from "@/lib/definitions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle, Trash2 } from "lucide-react";
import SkillBadge from "@/components/ui/SkillBadge";

export default function SettingsPage() {
  const [user, setUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(true);

  // State for the skill input forms
  const [newOfferedSkill, setNewOfferedSkill] = useState("");
  const [offeredSkillLevel, setOfferedSkillLevel] =
    useState<SkillLevel>("Beginner");
  const [newSoughtSkill, setNewSoughtSkill] = useState("");
  const [soughtSkillLevel, setSoughtSkillLevel] =
    useState<SkillLevel>("Beginner");

  // Temporary state to hold names of newly added, unsaved skills
  const [tempSkillNames, setTempSkillNames] = useState<Record<string, string>>(
    {}
  );

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

  // Handles changes for standard inputs like name, location, etc.
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  // Handles changes for the Gender select dropdown
  const handleGenderChange = (value: string) => {
    setUser({ ...user, gender: value as User["gender"] });
  };

  // Gets skill name from either temporary state or original data
  const getDynamicSkillName = (skillId: string): string => {
    return tempSkillNames[skillId] || getSkillName(skillId);
  };

  // Adds a new skill to the offered or sought list in the component's state
  const handleAddSkill = (type: "offered" | "sought") => {
    if (!user) return;

    const skillName =
      type === "offered" ? newOfferedSkill.trim() : newSoughtSkill.trim();
    const level = type === "offered" ? offeredSkillLevel : soughtSkillLevel;
    if (!skillName) return;

    const tempId = `temp-${Date.now()}`;
    setTempSkillNames((prev) => ({ ...prev, [tempId]: skillName }));

    const newUserSkill = { skillId: tempId, level };

    if (type === "offered") {
      setUser({
        ...user,
        skillsOffered: [...(user.skillsOffered || []), newUserSkill],
      });
      setNewOfferedSkill("");
    } else {
      setUser({
        ...user,
        skillsSought: [...(user.skillsSought || []), newUserSkill],
      });
      setNewSoughtSkill("");
    }
  };

  // Removes a skill from the offered or sought list in the component's state
  const handleRemoveSkill = (
    skillIdToRemove: string,
    type: "offered" | "sought"
  ) => {
    if (!user) return;

    if (type === "offered") {
      setUser({
        ...user,
        skillsOffered: user.skillsOffered?.filter(
          (s) => s.skillId !== skillIdToRemove
        ),
      });
    } else {
      setUser({
        ...user,
        skillsSought: user.skillsSought?.filter(
          (s) => s.skillId !== skillIdToRemove
        ),
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
        <p className="text-zinc-500">
          Update your profile information and manage your skills.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                name="location"
                value={user.location || ""}
                onChange={handleInputChange}
                placeholder="e.g., San Francisco, CA"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="age">Age</Label>
              <Input
                id="age"
                name="age"
                type="number"
                value={user.age || ""}
                onChange={handleInputChange}
                placeholder="e.g., 29"
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select value={user.gender} onValueChange={handleGenderChange}>
              <SelectTrigger id="gender">
                <SelectValue placeholder="Select gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Male">Male</SelectItem>
                <SelectItem value="Female">Female</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
                <SelectItem value="Prefer not to say">
                  Prefer not to say
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="headline">Headline</Label>
            <Input
              id="headline"
              name="headline"
              value={user.headline || ""}
              onChange={handleInputChange}
              placeholder="e.g., Senior Graphic Designer"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={user.bio || ""}
              onChange={handleInputChange}
              placeholder="Tell others about yourself..."
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Personal Information</Button>
        </CardFooter>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Manage Skills</CardTitle>
          <CardDescription>
            Add or remove skills and specify your expertise level.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid md:grid-cols-2 gap-8">
          {/* Skills Offered */}
          <div className="space-y-4">
            <h3 className="font-semibold">Skills You Offer</h3>
            <div className="flex flex-col gap-2 min-h-[80px] p-2 border rounded-md">
              {user.skillsOffered?.map((skill) => (
                <div
                  key={skill.skillId}
                  className="flex items-center justify-between"
                >
                  <SkillBadge level={skill.level}>
                    {getDynamicSkillName(skill.skillId)}
                  </SkillBadge>
                  <button
                    onClick={() => handleRemoveSkill(skill.skillId, "offered")}
                    className="text-zinc-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
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
              <Select
                value={offeredSkillLevel}
                onValueChange={(v) => setOfferedSkillLevel(v as SkillLevel)}
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
              <Button type="submit" variant="secondary" size="icon">
                <PlusCircle className="h-5 w-5" />
              </Button>
            </form>
          </div>
          {/* Skills Sought */}
          <div className="space-y-4">
            <h3 className="font-semibold">Skills You Seek</h3>
            <div className="flex flex-col gap-2 min-h-[80px] p-2 border rounded-md">
              {user.skillsSought?.map((skill) => (
                <div
                  key={skill.skillId}
                  className="flex items-center justify-between"
                >
                  <SkillBadge level={skill.level}>
                    {getDynamicSkillName(skill.skillId)}
                  </SkillBadge>
                  <button
                    onClick={() => handleRemoveSkill(skill.skillId, "sought")}
                    className="text-zinc-400 hover:text-red-500 p-1"
                  >
                    <Trash2 className="h-4 w-4" />
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
              <Select
                value={soughtSkillLevel}
                onValueChange={(v) => setSoughtSkillLevel(v as SkillLevel)}
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
