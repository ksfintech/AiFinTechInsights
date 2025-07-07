import { getInsightById } from '@/lib/data';
import { notFound } from 'next/navigation';

export async function generateMetadata({ params }: { params: { id: string } }) {
  const insight = await getInsightById(params.id);
  if (!insight) {
    return { title: 'Insight Not Found' };
  }
  return {
    title: `${insight.title} | AI FinTech Insights`,
    description: insight.summary,
  };
}

export default async function InsightDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const insight = await getInsightById(params.id);

  if (!insight) {
    notFound();
  }

  return (
    <article>
      <header className="py-12 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-primary max-w-4xl mx-auto">
            {insight.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            {insight.summary}
          </p>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div
          className="prose prose-lg dark:prose-invert max-w-3xl mx-auto text-foreground/90"
          dangerouslySetInnerHTML={{ __html: insight.content }}
        />
      </div>
    </article>
  );
}
