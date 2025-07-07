import { getAgents } from '@/lib/data';
import type { Metadata } from 'next';
import { AgentRecommender } from './recommender';
import { Wand2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'AI Agent Recommender | AI FinTech Insights',
  description:
    'Describe your business need and get AI-powered recommendations for the best fintech agents to solve your problem.',
};

export default async function RecommendPage() {
  const agents = await getAgents();

  return (
    <div className="container mx-auto px-4 py-12 md:py-16">
      <div className="text-center mb-12 max-w-3xl mx-auto">
        <Wand2 className="h-12 w-12 text-primary mx-auto mb-4" />
        <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-primary mb-4">
          AI-Powered Agent Recommender
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          Not sure where to start? Describe your business problem or goal below,
          and our AI will suggest the top agents for the job.
        </p>
      </div>
      <AgentRecommender agents={agents} />
    </div>
  );
}
