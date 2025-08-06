// /app/components/ui/SkillBadge.tsx
interface SkillBadgeProps {
  children: React.ReactNode;
}

const SkillBadge = ({ children }: SkillBadgeProps) => {
  return (
    <div className="inline-block bg-teal-100 text-teal-800 text-xs font-medium px-2.5 py-1 rounded-full">
      {children}
    </div>
  );
};

export default SkillBadge;
