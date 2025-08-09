// /app/components/ui/SkillBadge.tsx
import { SkillLevel } from "@/lib/definitions";
import { cn } from "@/lib/utils";
import { Award, Star, Zap } from "lucide-react";

interface SkillBadgeProps {
  children: React.ReactNode;
  level: SkillLevel;
}

const levelStyles: Record<SkillLevel, string> = {
  Beginner: "bg-zinc-100 text-zinc-700 border-zinc-200",
  Intermediate: "bg-blue-100 text-blue-700 border-blue-200",
  Expert: "bg-amber-100 text-amber-700 border-amber-200",
};

const levelIcons: Record<SkillLevel, React.ReactNode> = {
  Beginner: <Zap className="h-3 w-3" />,
  Intermediate: <Star className="h-3 w-3" />,
  Expert: <Award className="h-3 w-3" />,
};

const SkillBadge = ({ children, level }: SkillBadgeProps) => {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full border",
        levelStyles[level]
      )}
    >
      {levelIcons[level]}
      <span>{children}</span>
    </div>
  );
};

export default SkillBadge;
