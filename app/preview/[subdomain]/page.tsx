import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ subdomain: string }>;
}

export default async function PreviewPage({ params }: PageProps) {
  const { subdomain } = await params;
  const sites = (global as any).sitesDatabase || {};
  const htmlContent = sites[subdomain.toLowerCase()];

  if (!htmlContent) {
    notFound();
  }

  return (
    <div 
      dangerouslySetInnerHTML={{ __html: htmlContent }} 
      style={{ width: '100%', minHeight: '100vh', margin: 0, padding: 0 }}
    />
  );
}
