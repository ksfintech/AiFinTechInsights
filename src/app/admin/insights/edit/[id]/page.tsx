
import { getInsightById } from '@/lib/data';
import { notFound } from 'next/navigation';
import { EditInsightForm } from './edit-insight-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const insight = await getInsightById(params.id);
  if (!insight) {
    return { title: 'Insight Not Found' };
  }
  return {
    title: `Edit ${insight.title} | AI FinTech Insights`,
    description: `Update the details for the insight: ${insight.title}.`,
  };
}

export default async function EditInsightPage({ params }: { params: { id: string } }) {
  const id = params.id;
  const insight = await getInsightById(id);

  if (!insight) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Button asChild variant="ghost" className="mb-4">
        <Link href="/admin/insights">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to All Insights
        </Link>
      </Button>
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit Insight</CardTitle>
          <CardDescription>
            Update the details for &quot;{insight.title}&quot;.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditInsightForm insight={insight} />
        </CardContent>
      </Card>
    </div>
  );
}
