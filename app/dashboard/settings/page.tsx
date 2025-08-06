// /app/dashboard/settings/page.tsx
import { notFound } from "next/navigation";
import { fetchUserById, getSkillName, LOGGED_IN_USER_ID } from "@/lib/action";
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
import { Textarea } from "@/components/ui/textarea"; // We'll create this component
import SkillBadge from "@/components/ui/SkillBadge";
import { PlusCircle, Trash2 } from "lucide-react";

export default async function SettingsPage() {
  const user = await fetchUserById(LOGGED_IN_USER_ID);

  if (!user) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Profile Settings</h1>
        <p className="text-gray-600">
          Update your profile information and manage your skills.
        </p>
      </div>

      {/* Profile Information Card */}
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
            <Input
              id="headline"
              defaultValue={user.headline}
              placeholder="e.g., Senior Graphic Designer | Branding Expert"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="bio">Bio</Label>
            <Textarea
              id="bio"
              defaultValue={user.bio}
              placeholder="Tell others a little bit about yourself..."
              rows={5}
            />
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Changes</Button>
        </CardFooter>
      </Card>

      {/* Skills Management Card */}
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
            <div className="flex flex-wrap gap-2">
              {user.skillsOffered.map((id) => (
                <div
                  key={id}
                  className="flex items-center gap-1 bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  <span>{getSkillName(id)}</span>
                  <button className="hover:text-teal-900">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" /> Add a Skill
            </Button>
          </div>
          {/* Skills Sought */}
          <div className="space-y-4">
            <h3 className="font-semibold">Skills You Seek</h3>
            <div className="flex flex-wrap gap-2">
              {user.skillsSought.map((id) => (
                <div
                  key={id}
                  className="flex items-center gap-1 bg-gray-200 text-gray-800 text-xs font-medium px-2.5 py-1 rounded-full"
                >
                  <span>{getSkillName(id)}</span>
                  <button className="hover:text-gray-900">
                    <Trash2 className="h-3 w-3" />
                  </button>
                </div>
              ))}
            </div>
            <Button variant="outline" size="sm" className="w-full">
              <PlusCircle className="h-4 w-4 mr-2" /> Add a Skill
            </Button>
          </div>
        </CardContent>
        <CardFooter className="border-t px-6 py-4">
          <Button>Save Skill Changes</Button>
        </CardFooter>
      </Card>
    </div>
  );
}
