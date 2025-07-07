
import { SetFeaturedAgentForm } from '../set-featured-tool-form';
import { getAgents, getFeaturedAgentIds } from '@/lib/data';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export const metadata: Metadata = {
  title: 'Site Settings | AI FinTech Insights',
  description: 'Manage site-wide settings.',
};

export default async function SettingsPage() {
  const [agents, featuredAgentIds] = await Promise.all([
    getAgents(),
    getFeaturedAgentIds(),
  ]);

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Button asChild variant="ghost" className="mb-4 -ml-4">
        <Link href="/admin">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Admin Dashboard
        </Link>
      </Button>
      <div className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Site Settings</CardTitle>
            <CardDescription>
              Manage various site-wide settings from one place.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="featured-agents">
                <AccordionTrigger>Set Featured Agents</AccordionTrigger>
                <AccordionContent className="pt-4">
                  <p className="text-sm text-muted-foreground mb-4">
                    Choose which agents are highlighted on the homepage carousel.
                  </p>
                  <SetFeaturedAgentForm
                    agents={agents}
                    currentFeaturedAgentIds={featuredAgentIds}
                  />
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* This is where future settings sections can be added */}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
