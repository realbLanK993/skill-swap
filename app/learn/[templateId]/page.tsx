// /app/learn/[templateId]/page.tsx
import { fetchTemplateById } from "@/lib/action";
import { notFound } from "next/navigation";
import { CheckCircle, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";

export default async function TemplateDetailPage({
  params,
}: {
  params: Promise<{ templateId: string }>;
}) {
  const template = await fetchTemplateById((await params).templateId);

  if (!template) {
    notFound();
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Header */}
      <div className="mb-10">
        <p className="text-primary font-semibold">{template.category}</p>
        <h1 className="text-4xl font-bold tracking-tight mt-1">
          {template.title}
        </h1>
        <p className="mt-3 text-lg text-zinc-500">{template.description}</p>
      </div>

      {/* Steps */}
      <div className="space-y-6">
        <h2 className="text-2xl font-semibold border-b pb-2">
          Your Learning Path
        </h2>
        {template.steps.map((step, index) => (
          <Card key={step.step} className="overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex flex-col items-center">
                  <div className="h-10 w-10 bg-primary/10 text-primary rounded-full flex items-center justify-center font-bold text-lg">
                    {step.step}
                  </div>
                  {/* Render a connecting line for all but the last item */}
                  {index < template.steps.length - 1 && (
                    <div className="w-px h-8 bg-border mt-2"></div>
                  )}
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">{step.title}</h3>
                  <p className="mt-1 text-zinc-600">{step.description}</p>
                  {step.videoUrl && (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className="mt-4"
                    >
                      <Link href={step.videoUrl} target="_blank">
                        <Video className="mr-2 h-4 w-4" /> Watch Tutorial
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-12 text-center">
        <Button size="lg" asChild>
          <Link href="/dashboard">
            <CheckCircle className="mr-2 h-5 w-5" /> Mark as Complete & Find a
            Swap
          </Link>
        </Button>
      </div>
    </div>
  );
}
