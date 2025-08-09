// /app/dashboard/settings/page.tsx
"use client";

import { useState, useEffect } from "react";
import { notFound } from "next/navigation";
import { fetchUserById, LOGGED_IN_USER_ID } from "@/lib/action";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Assuming you have a Select component

export default function SettingsPage() {
  const [user, setUser] = useState<Partial<User>>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadUserSettings() {
      const fetchedUser = await fetchUserById(LOGGED_IN_USER_ID);
      if (fetchedUser) setUser(fetchedUser);
      setIsLoading(false);
    }
    loadUserSettings();
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleGenderChange = (value: string) => {
    setUser({ ...user, gender: value as User["gender"] });
  };

  if (isLoading)
    return <div className="text-center p-10">Loading settings...</div>;
  if (!user) return notFound();

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
              placeholder="e.g., Senior Graphic Designer | Branding Expert"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              name="bio"
              value={user.bio || ""}
              onChange={handleInputChange}
              placeholder="Tell others a little bit about yourself..."
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
