
import { getAgentById, getCategories } from '@/lib/data';
import { notFound } from 'next/navigation';
import { EditAgentForm } from './edit-tool-form';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import type { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: { id: string };
}): Promise<Metadata> {
  const agent = await getAgentById(params.id);
  if (!agent) {
    return {
      title: 'Agent Not Found',
    };
  }
  return {
    title: `Edit ${agent.name} | AI FinTech Insights`,
    description: `Update the details for the agent: ${agent.name}.`,
  };
}

export default async function EditAgentPage({
  params,
}: {
  params: { id: string };
}) {
  const id = params.id;
  const [agent, allCategories] = await Promise.all([
    getAgentById(id),
    getCategories(),
  ]);

  if (!agent) {
    notFound();
  }

  return (
    <div className="container mx-auto max-w-3xl px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Edit {agent.name}</CardTitle>
          <CardDescription>
            Update the details for this agent. Changes will be saved immediately.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EditAgentForm agent={agent} allCategories={allCategories} />
        </CardContent>
      </Card>
    </div>
  );
}
