
import { getInsights } from '@/lib/data';
import { AddInsightForm } from './add-insight-form';
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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { DeleteInsightButton } from './delete-insight-button';
import { Pencil } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Manage Insights | AI FinTech Insights',
  description: 'Add, edit, or delete insight articles.',
};

export default async function ManageInsightsPage() {
  const insights = await getInsights();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-12 space-y-8">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Manage Insights</CardTitle>
          <CardDescription>
            Add a new insight or edit an existing one from the list below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full mb-6">
            <AccordionItem value="add-insight">
              <AccordionTrigger>Add a New Insight</AccordionTrigger>
              <AccordionContent className="pt-4">
                <AddInsightForm />
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">
              Existing Insights
            </h3>
            <div className="rounded-lg border">
              {insights.map((insight, index) => (
                <div
                  key={insight.id}
                  className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 gap-4 border-b last:border-b-0"
                >
                  <span className="font-medium text-card-foreground flex-1">
                    {insight.title}
                  </span>
                  <div className="flex gap-2 shrink-0 self-end sm:self-center">
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/admin/insights/edit/${insight.id}`}>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit
                      </Link>
                    </Button>
                    <DeleteInsightButton insightId={insight.id} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
