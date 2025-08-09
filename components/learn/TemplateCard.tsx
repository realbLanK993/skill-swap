// /app/components/learn/TemplateCard.tsx
import { SkillTemplate } from "@/lib/definitions";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";
import { ArrowRight, Music, PersonStanding } from "lucide-react"; // Import icons used in data

// A simple component to dynamically select an icon based on its name
const TemplateIcon = ({ name }: { name: string }) => {
  switch (name) {
    case "Music":
      return <Music className="h-10 w-10 text-primary" />;
    case "PersonStanding":
      return <PersonStanding className="h-10 w-10 text-primary" />;
    default:
      return null;
  }
};

interface TemplateCardProps {
  template: SkillTemplate;
}

export const TemplateCard = ({ template }: TemplateCardProps) => {
  return (
    <Link href={`/learn/${template.id}`} className="block h-full">
      <Card className="group h-full flex flex-col hover:border-primary/80 transition-all duration-300">
        <CardHeader>
          <div className="flex items-start justify-between">
            <div>
              <CardTitle>{template.title}</CardTitle>
              <CardDescription>{template.category}</CardDescription>
            </div>
            <TemplateIcon name={template.icon} />
          </div>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col">
          <p className="text-zinc-600 text-sm flex-grow">
            {template.description}
          </p>
          <div className="mt-6 flex items-center text-sm font-semibold text-primary">
            Start Learning
            <ArrowRight className="ml-2 h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
