import { getInsights } from '@/lib/data';
import { Suspense } from 'react';
import { InsightListSkeleton } from '@/components/insights/insight-skeletons';
import { InsightList } from '@/components/insights/insight-list';

export const metadata = {
  title: 'AI Fintech Insights | AI FinTech Insights',
  description:
    'Explore articles and summaries about the latest trends and applications of AI in finance.',
};

export default async function InsightsPage() {
  const insights = await getInsights();

  return (
    <div className="container mx-auto px-4 pt-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl md:text-5xl font-bold text-primary mb-2">
          AI Fintech Insights
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Stay informed with our curated articles on how AI is shaping the
          future of finance, from trading to compliance.
        </p>
      </div>

      <Suspense fallback={<InsightListSkeleton />}>
        <InsightList insights={insights} />
      </Suspense>
    </div>
  );
}
