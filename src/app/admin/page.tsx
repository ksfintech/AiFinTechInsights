
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Metadata } from 'next';
import Link from 'next/link';
import { LayoutGrid, Lightbulb, Settings } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Admin Dashboard | AI FinTech Insights',
  description: 'Manage content and settings for the application.',
};

const adminSections = [
  {
    title: 'Manage Agents',
    description: 'Add, edit, and update the AI agent directory.',
    href: '/admin/tools',
    icon: <LayoutGrid className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Manage Insights',
    description: 'Create, publish, and manage insight articles.',
    href: '/admin/insights',
    icon: <Lightbulb className="h-8 w-8 text-primary" />,
  },
  {
    title: 'Site Settings',
    description: 'Configure site-wide settings like featured agents.',
    href: '/admin/settings',
    icon: <Settings className="h-8 w-8 text-primary" />,
  },
];

export default function AdminPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12">
      <div className="mb-8 text-center md:text-left">
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground">
          Select a section to manage your application content and settings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {adminSections.map(section => (
          <Link href={section.href} key={section.title} className="block group">
            <Card className="h-full transition-all duration-300 group-hover:shadow-xl group-hover:border-primary/50 group-hover:-translate-y-1">
              <CardHeader className="flex-row items-start gap-4 space-y-0 p-4">
                <div className="flex-shrink-0 rounded-lg bg-primary/10 p-3">
                  {section.icon}
                </div>
                <div className="flex-1 pt-1">
                  <CardTitle className="text-lg">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-4 pt-0">
                <CardDescription>{section.description}</CardDescription>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
