// /app/learn/page.tsx
import { TemplateCard } from "@/components/learn/TemplateCard";
import { fetchTemplates } from "@/lib/action";

export default async function LearnPage() {
  const templates = await fetchTemplates();

  return (
    <section>
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold tracking-tight">Learn a New Skill</h1>
        <p className="mt-2 text-lg text-zinc-500">
          Browse our guided templates to kickstart your journey in a new field.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <TemplateCard key={template.id} template={template} />
        ))}
      </div>
    </section>
  );
}
