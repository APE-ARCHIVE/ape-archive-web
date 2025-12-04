import { pdfs } from '@/constants/data';
import { PlaceHolderImages } from '@/constants/placeholder-images';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Download, Share, Calendar, Book, GraduationCap, Languages, Tag, Star, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { use } from 'react';

export default function PdfDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const pdf = pdfs.find((p) => p.id === id);

  if (!pdf) {
    notFound();
  }

  const previewImage = PlaceHolderImages.find((img) => img.id === 'pdf-preview');
  const uploaderAvatar = PlaceHolderImages.find((img) => img.id === pdf.uploader.avatarId);
  const relatedPdfs = pdfs.filter((p) => p.subject === pdf.subject && p.id !== pdf.id).slice(0, 3);

  const metadata = [
    { icon: Book, label: 'Subject', value: pdf.subject },
    { icon: GraduationCap, label: 'Level', value: pdf.level },
    { icon: Languages, label: 'Language', value: pdf.language },
    { icon: Calendar, label: 'Uploaded', value: new Date(pdf.uploadedAt).toLocaleDateString() },
    { icon: Download, label: 'Downloads', value: pdf.downloads.toLocaleString() },
  ];

  return (
    <div className="container mx-auto max-w-7xl px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-12">
        <main className="lg:col-span-2 space-y-8">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold font-headline">{pdf.title}</h1>
            <p className="mt-2 text-lg text-muted-foreground">{pdf.description}</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Metadata</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 text-sm">
                {metadata.map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-muted-foreground" />
                    <div>
                      <p className="font-semibold text-foreground">{item.value}</p>
                      <p className="text-muted-foreground">{item.label}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Separator className="my-6" />
              <div className="flex items-center gap-3">
                <Tag className="w-5 h-5 text-muted-foreground" />
                <div className="flex flex-wrap gap-2">
                  {pdf.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent className="flex justify-center items-center bg-secondary/50 rounded-md p-4">
              {previewImage && (
                <Image
                  src={previewImage.imageUrl}
                  alt={previewImage.description}
                  data-ai-hint={previewImage.imageHint}
                  width={800}
                  height={1100}
                  className="rounded-md border-2 border-border shadow-lg"
                />
              )}
            </CardContent>
          </Card>
        </main>

        <aside className="space-y-8">
          <Card className="overflow-hidden">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button size="lg" className="w-full">
                <Download className="mr-2 h-5 w-5" /> Download PDF
              </Button>
              <Button size="lg" variant="secondary" className="w-full">
                <Share className="mr-2 h-5 w-5" /> Share
              </Button>
              <Button size="lg" variant="outline" className="w-full">
                <Star className="mr-2 h-5 w-5" /> Add to Favorites
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Uploader</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                {uploaderAvatar && <AvatarImage src={uploaderAvatar.imageUrl} alt={pdf.uploader.name} />}
                <AvatarFallback>{pdf.uploader.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold text-lg">{pdf.uploader.name}</p>
                <p className="text-sm text-muted-foreground">Member</p>
              </div>
            </CardContent>
          </Card>

          {relatedPdfs.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Related PDFs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {relatedPdfs.map(relatedPdf => (
                  <div key={relatedPdf.id} className="flex items-start gap-3">
                    <FileText className="w-5 h-5 mt-1 text-primary" />
                    <div>
                      <Link href={`/pdfs/${relatedPdf.id}`} className="font-semibold hover:underline">{relatedPdf.title}</Link>
                      <p className="text-xs text-muted-foreground">{relatedPdf.subject}</p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}
        </aside>
      </div>
    </div>
  );
}
