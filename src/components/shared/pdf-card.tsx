import Link from 'next/link';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { FileText, Download, Eye, Languages, TrendingUp } from 'lucide-react';
import type { Pdf } from '@/constants/data';
import { cn } from '@/lib/utils';

export function PdfCard({ pdf, className }: { pdf: Pdf; className?: string }) {
  return (
    <Card className={cn("group flex flex-col overflow-hidden card-hover border-border/50 hover:border-primary/30 bg-card h-full", className)}>
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-start gap-4">
          {/* Orange-accented Icon */}
          <div className="relative flex-shrink-0">
            <div className="absolute inset-0 bg-primary/20 rounded-xl blur-md opacity-0 group-hover:opacity-100 smooth-hover" />
            <div className="relative bg-gradient-to-br from-primary/10 to-primary/5 group-hover:from-primary group-hover:to-primary/80 p-3 rounded-xl smooth-hover">
              <FileText className="h-6 w-6 text-primary group-hover:text-primary-foreground smooth-hover" />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-tight mb-2 line-clamp-2">
              <Link href={`/pdfs/${pdf.id}`} className="hover:text-primary smooth-hover">
                {pdf.title}
              </Link>
            </CardTitle>
            <div className="flex flex-wrap gap-2 text-xs">
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
                {pdf.subject}
              </Badge>
              <Badge variant="outline" className="border-border/50">
                {pdf.level}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow pb-3 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {pdf.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1.5">
            <Languages className="w-3.5 h-3.5" />
            <span>{pdf.language}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <TrendingUp className="w-3.5 h-3.5 text-primary" />
            <span className="font-medium">{pdf.downloads}</span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-3 pt-3 border-t border-border/50">
        {/* Orange Tags */}
        <div className="flex flex-wrap gap-1.5">
          {pdf.tags.slice(0, 3).map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              className="text-xs bg-primary/5 text-primary hover:bg-primary/10 border border-primary/20"
            >
              {tag}
            </Badge>
          ))}
        </div>

        <div className="w-full flex gap-2">
          <Button asChild size="sm" className="flex-1 rounded-lg smooth-hover">
            <Link href={`/pdfs/${pdf.id}`}>
              <Eye className="mr-1.5 h-3.5 w-3.5" /> View
            </Link>
          </Button>
          <Button asChild variant="outline" size="sm" className="flex-1 rounded-lg hover:bg-primary/5 hover:border-primary smooth-hover">
            <Link href="#">
              <Download className="mr-1.5 h-3.5 w-3.5" /> Download
            </Link>
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
