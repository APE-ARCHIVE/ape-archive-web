'use client';

import { useEffect, useState, use, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Document, Page, pdfjs } from 'react-pdf';
import { Button } from '@/components/ui/button';
import {
  Download, Share, Calendar, Book, GraduationCap, Languages, Tag, FileText,
  ArrowLeft, Loader2, AlertCircle, Eye, Copy, Check, ZoomIn, ZoomOut,
  ChevronLeft, ChevronRight, Maximize2, RotateCw, X
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Slider } from '@/components/ui/slider';
import { Progress } from '@/components/ui/progress';
import { apiClient } from '@/lib/api';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

// Configure PDF.js worker
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Import react-pdf styles
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Types
interface DocumentTag {
  id: string;
  name: string;
  group: string;
  slug?: string;
  source?: 'SYSTEM' | 'USER';
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
  fileSize?: string;
  source?: 'SYSTEM' | 'USER';
  uploader?: {
    id: string;
    name: string;
    role: string;
  };
}

// PDF Viewer Component
function PDFViewer({ resourceId, title }: { resourceId: string; title: string }) {
  const [numPages, setNumPages] = useState<number>(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.0);
  const [rotation, setRotation] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use the stream API endpoint
  const pdfUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://server.apearchive.lk'}/api/v1/resources/${resourceId}/stream`;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
  };

  const onDocumentLoadError = (err: Error) => {
    console.error('PDF load error:', err);
    setError('Failed to load PDF');
    setIsLoading(false);
  };

  const goToPrevPage = () => setPageNumber(prev => Math.max(prev - 1, 1));
  const goToNextPage = () => setPageNumber(prev => Math.min(prev + 1, numPages));
  const zoomIn = () => setScale(prev => Math.min(prev + 0.25, 3));
  const zoomOut = () => setScale(prev => Math.max(prev - 0.25, 0.5));
  const rotate = () => setRotation(prev => (prev + 90) % 360);
  const resetZoom = () => setScale(1.0);

  return (
    <div className="flex flex-col h-full">
      {/* PDF Toolbar */}
      <div className="flex items-center justify-between gap-2 p-3 bg-muted/50 border-b rounded-t-lg flex-wrap">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={goToPrevPage} disabled={pageNumber <= 1}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm min-w-[80px] text-center">
            {pageNumber} / {numPages || '?'}
          </span>
          <Button variant="outline" size="sm" onClick={goToNextPage} disabled={pageNumber >= numPages}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={zoomOut} disabled={scale <= 0.5}>
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="text-sm min-w-[50px] text-center">{Math.round(scale * 100)}%</span>
          <Button variant="outline" size="sm" onClick={zoomIn} disabled={scale >= 3}>
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="sm" onClick={rotate}>
            <RotateCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* PDF Content */}
      <div className="flex-1 overflow-auto bg-muted/30 flex items-start justify-center p-4 min-h-[500px]">
        {isLoading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading PDF...</p>
          </div>
        )}

        {error && (
          <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
            <AlertCircle className="h-12 w-12 text-destructive" />
            <p className="text-muted-foreground">{error}</p>
          </div>
        )}

        <Document
          file={pdfUrl}
          onLoadSuccess={onDocumentLoadSuccess}
          onLoadError={onDocumentLoadError}
          loading={null}
          className={cn(isLoading && 'hidden')}
        >
          <Page
            pageNumber={pageNumber}
            scale={scale}
            rotate={rotation}
            className="shadow-lg"
            renderTextLayer={true}
            renderAnnotationLayer={true}
          />
        </Document>
      </div>

      {/* Page slider for quick navigation */}
      {numPages > 1 && (
        <div className="p-3 bg-muted/50 border-t rounded-b-lg">
          <div className="flex items-center gap-4">
            <span className="text-xs text-muted-foreground">Page</span>
            <Slider
              value={[pageNumber]}
              min={1}
              max={numPages}
              step={1}
              onValueChange={([value]) => setPageNumber(value)}
              className="flex-1"
            />
          </div>
        </div>
      )}
    </div>
  );
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

  // Download progress state
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadProgress, setDownloadProgress] = useState(0);
  const [downloadedBytes, setDownloadedBytes] = useState(0);
  const [totalBytes, setTotalBytes] = useState(0);

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const streamUrl = `${process.env.NEXT_PUBLIC_API_URL || 'https://server.apearchive.lk'}/api/v1/resources/${id}/stream`;

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

  const handleDownload = useCallback(async () => {
    if (isDownloading) return;

    setIsDownloading(true);
    setDownloadProgress(0);
    setDownloadedBytes(0);
    setTotalBytes(0);

    try {
      const response = await fetch(streamUrl, {
        method: 'GET',
        credentials: 'include',
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.status}`);
      }

      const contentLength = response.headers.get('content-length');
      const total = contentLength ? parseInt(contentLength, 10) : 0;
      setTotalBytes(total);

      const reader = response.body?.getReader();
      if (!reader) {
        throw new Error('Unable to read response');
      }

      const chunks: Uint8Array[] = [];
      let receivedLength = 0;

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        chunks.push(value);
        receivedLength += value.length;
        setDownloadedBytes(receivedLength);

        if (total > 0) {
          setDownloadProgress(Math.round((receivedLength / total) * 100));
        }
      }

      // Combine chunks into single blob
      const totalLength = chunks.reduce((acc, chunk) => acc + chunk.length, 0);
      const combined = new Uint8Array(totalLength);
      let offset = 0;
      for (const chunk of chunks) {
        combined.set(chunk, offset);
        offset += chunk.length;
      }
      const blob = new Blob([combined], { type: 'application/pdf' });

      // Create download link and trigger download
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = resource?.title || 'document.pdf';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);

      toast({ title: 'Download complete!', description: 'Your file has been downloaded successfully.' });
    } catch (err) {
      console.error('Download error:', err);
      // Fallback to direct link download
      toast({ title: 'Opening download...', description: 'Your file will download in a new tab.' });
      window.open(streamUrl, '_blank');
    } finally {
      setIsDownloading(false);
      setDownloadProgress(0);
    }
  }, [streamUrl, toast, resource?.title, isDownloading]);

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

  const subject = resource.tags.find(t => t.group === 'SUBJECT' || t.group === 'Subject')?.name;
  const grade = resource.tags.find(t => t.group === 'GRADE' || t.group === 'Grade')?.name;
  const medium = resource.tags.find(t => t.group === 'MEDIUM' || t.group === 'Medium')?.name;
  const resourceType = resource.tags.find(t => t.group === 'RESOURCE_TYPE' || t.group === 'ResourceType')?.name;

  const metadata = [
    subject && { icon: Book, label: 'Subject', value: subject },
    grade && { icon: GraduationCap, label: 'Grade', value: grade },
    medium && { icon: Languages, label: 'Medium', value: medium },
    resourceType && { icon: FileText, label: 'Type', value: resourceType },
    { icon: Eye, label: 'Views', value: resource.views.toLocaleString() },
    { icon: Download, label: 'Downloads', value: resource.downloads.toLocaleString() },
    resource.createdAt && { icon: Calendar, label: 'Uploaded', value: new Date(resource.createdAt).toLocaleDateString() },
  ].filter(Boolean) as { icon: any; label: string; value: string }[];

  // Format file size
  const formatFileSize = (bytes: string | undefined) => {
    if (!bytes) return null;
    const size = parseInt(bytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    return `${(size / (1024 * 1024)).toFixed(1)} MB`;
  };

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

          <Card className="overflow-hidden">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center justify-between">
                <span>PDF Viewer</span>
                {resource.fileSize && (
                  <Badge variant="secondary" className="text-xs">
                    {formatFileSize(resource.fileSize)}
                  </Badge>
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <PDFViewer resourceId={id} title={resource.title} />
            </CardContent>
          </Card>
        </main>

        <aside className="space-y-6">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button
                size="lg"
                className="w-full"
                onClick={handleDownload}
                disabled={isDownloading}
              >
                {isDownloading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Downloading... {downloadProgress > 0 ? `${downloadProgress}%` : ''}
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-5 w-5" />Download PDF
                  </>
                )}
              </Button>
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
              {resource.uploader && (
                <>
                  <Separator />
                  <div>
                    <p className="text-xs text-muted-foreground mb-1">Uploaded by</p>
                    <p className="font-medium text-sm">{resource.uploader.name}</p>
                  </div>
                </>
              )}
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
              {resource.fileSize && (
                <>
                  <Separator />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">File Size</span>
                    <span className="font-medium">{formatFileSize(resource.fileSize)}</span>
                  </div>
                </>
              )}
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

      {/* Download Progress Dialog */}
      <Dialog open={isDownloading} onOpenChange={() => { }}>
        <DialogContent className="sm:max-w-md" onPointerDownOutside={(e) => e.preventDefault()}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Download className="h-5 w-5" />
              Downloading...
            </DialogTitle>
            <DialogDescription>
              Please wait while your file is being downloaded.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Progress value={downloadProgress} className="h-3" />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>
                {downloadedBytes > 0 ? (
                  `${(downloadedBytes / (1024 * 1024)).toFixed(2)} MB`
                ) : (
                  'Starting...'
                )}
              </span>
              <span>
                {totalBytes > 0 ? (
                  `${(totalBytes / (1024 * 1024)).toFixed(2)} MB`
                ) : (
                  'Calculating...'
                )}
              </span>
            </div>
            <div className="text-center text-lg font-semibold text-primary">
              {downloadProgress}%
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Share Dialog */}
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
