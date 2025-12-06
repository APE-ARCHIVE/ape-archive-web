'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { pdfs } from '@/constants/data';
import { PdfCard } from '@/components/shared/pdf-card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n-context';

export function LatestUploadsSection() {
    const { t } = useLanguage();
    const latestPdfs = pdfs.slice(0, 4);

    return (
        <section
            id="latest-uploads"
            className="w-full py-4 md:py-8"
        >
            <div className="container px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center space-y-4 mb-12">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                            <Sparkles className="w-3 h-3 mr-1" />
                            {t('home.latestUploadsBadge')}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {t('home.latestUploadsTitle')}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {t('home.latestUploadsDescription')}
                        </p>
                    </div>

                    {/* Clean White Cards Grid */}
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {latestPdfs.map((pdf) => (
                            <PdfCard key={pdf.id} pdf={pdf} />
                        ))}
                    </div>

                    {/* View All Button */}
                    <div className="text-center mt-12">
                        <Button asChild size="lg" className="h-12 px-8 rounded-xl shadow-lg hover:shadow-xl smooth-hover">
                            <Link href="/browse">
                                {t('home.viewAllResources')}
                                <ArrowRight className="ml-2 h-5 w-5" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
