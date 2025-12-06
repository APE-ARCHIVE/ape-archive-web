'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, Share, Calendar, Book, GraduationCap, Languages, Tag, FileText, ArrowLeft, Loader2, AlertCircle, Eye, Copy, Check } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';

// Types
interface DocumentTag {
  id: string;
  name: string;
  group: string;
}

interface Resource {
  id: string;
  title: string;
  description: string;
  driveFileId: string;
  mimeType: string;
  views: number;
  downloads: number;
  tags: DocumentTag[];
  createdAt?: string;
}

export default function PdfDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const { toast } = useToast();

  const [resource, setResource] = useState<Resource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [shareDialogOpen, setShareDialogOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  useEffect(() => {
    async function fetchResource() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await apiClient.get(`/api/v1/resources/${id}`);
        if (response.data?.success && response.data?.data) {
          setResource(response.data.data);
        } else {
          setError('Resource not found');
        }
      } catch (err: any) {
        console.error('Failed to fetch resource:', err);
        setError(err?.response?.status === 404 ? 'Resource not found' : 'Failed to load resource');
      } finally {
        setIsLoading(false);
      }
    }
    fetchResource();
  }, [id]);

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      toast({ title: 'Link copied!', description: 'The URL has been copied to your clipboard.' });
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast({ title: 'Failed to copy', description: 'Please copy the URL manually.', variant: 'destructive' });
    }
  };

  if (isLoading) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-muted-foreground">Loading resource...</p>
        </div>
      </div>
    );
  }

  if (error || !resource) {
    return (
      <div className="container mx-auto max-w-7xl px-4 py-16">
        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <AlertCircle className="h-12 w-12 text-destructive" />
          <h2 className="text-xl font-semibold">{error || 'Resource not found'}</h2>
          <p className="text-muted-foreground">The resource you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => router.back()} variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />Go Back
          </Button>
        </div>
      </div>
    );
  }

  const subject = resource.tags.find(t => t.group === 'Subject')?.name;
  const grade = resource.tags.find(t => t.group === 'Grade')?.name;
  const medium = resource.tags.find(t => t.group === 'Medium')?.name;
  const resourceType = resource.tags.find(t => t.group === 'ResourceType')?.name;

  const metadata = [
    subject && { icon: Book, label: 'Subject', value: subject },
    grade && { icon: GraduationCap, label: 'Grade', value: grade },
    medium && { icon: Languages, label: 'Medium', value: medium },
    resourceType && { icon: FileText, label: 'Type', value: resourceType },
    { icon: Eye, label: 'Views', value: resource.views.toLocaleString() },
    { icon: Download, label: 'Downloads', value: resource.downloads.toLocaleString() },
    resource.createdAt && { icon: Calendar, label: 'Uploaded', value: new Date(resource.createdAt).toLocaleDateString() },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  const downloadUrl = resource.driveFileId ? `https://drive.google.com/uc?export=download&id=${resource.driveFileId}` : null;
  const embedUrl = resource.driveFileId ? `https://drive.google.com/file/d/${resource.driveFileId}/preview` : null;

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <Button variant="ghost" size="sm" onClick={() => router.back()} className="mb-6">
        <ArrowLeft className="mr-2 h-4 w-4" />Back
      </Button>

      <div className="grid lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2 space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold font-headline">{resource.title}</h1>
            <p className="mt-2 text-muted-foreground">{resource.description || 'No description available'}</p>
          </div>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Preview</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              {embedUrl ? (
                <div className="aspect-[4/3] w-full">
                  <iframe src={embedUrl} className="w-full h-full rounded-b-lg" allow="autoplay" title={resource.title} />
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">Preview not available</p>
                </div>
              )}
            </CardContent>
          </Card>
        </main>

        <aside className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {downloadUrl && (
                <Button size="lg" className="w-full" asChild>
                  <a href={downloadUrl} target="_blank" rel="noopener noreferrer">
                    <Download className="mr-2 h-5 w-5" />Download PDF
                  </a>
                </Button>
              )}
              <Button size="lg" variant="outline" className="w-full" onClick={() => setShareDialogOpen(true)}>
                <Share className="mr-2 h-5 w-5" />Share
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {metadata.map((item, index) => (
                <div key={item.label}>
                  <div className="flex items-center gap-3">
                    <item.icon className="w-4 h-4 text-muted-foreground" />
                    <div className="flex-1">
                      <p className="text-xs text-muted-foreground">{item.label}</p>
                      <p className="font-medium text-sm">{item.value}</p>
                    </div>
                  </div>
                  {index < metadata.length - 1 && <Separator className="mt-3" />}
                </div>
              ))}
              <Separator />
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <span className="text-xs text-muted-foreground">Tags</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {resource.tags.map((tag) => (
                    <Badge key={tag.id} variant="secondary" className="text-xs">{tag.name}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Quick Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">File Type</span>
                <span className="font-medium">{resource.mimeType || 'application/pdf'}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Views</span>
                <span className="font-medium">{resource.views}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Downloads</span>
                <span className="font-medium">{resource.downloads}</span>
              </div>
            </CardContent>
          </Card>
        </aside>
      </div>

      <Dialog open={shareDialogOpen} onOpenChange={setShareDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Document</DialogTitle>
            <DialogDescription>Copy the link below to share this document with others.</DialogDescription>
          </DialogHeader>
          <div className="flex items-center gap-2">
            <Input readOnly value={shareUrl} className="flex-1" />
            <Button size="icon" onClick={handleCopyUrl} variant={copied ? "default" : "outline"}>
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
