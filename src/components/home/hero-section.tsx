'use client';

import { Button } from '@/components/ui/button';
import { ArrowRight, BookOpen, FileText } from 'lucide-react';
import Link from 'next/link';
import { useLanguage } from '@/lib/i18n-context';
import { Hero3DModel } from '@/components/home/hero-3d-model';

export function HeroSection() {
    const { t } = useLanguage();

    return (
        <section className="relative w-full pt-6 pb-8 md:pt-16 md:pb-24 overflow-hidden">
            <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,var(--tw-gradient-stops))] from-primary/20 via-background/5 to-transparent" />
            <div className="container relative z-10 px-4 md:px-6">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
                    {/* Left Column: Text Content */}
                    <div className="flex flex-col items-start text-left space-y-8">

                        {/* Bold Headline */}
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-balance">
                            {t('home.heroTitlePrefix')}
                            <span className="block text-primary mt-2">{t('home.heroTitleSuffix')}</span>
                        </h1>

                        {/* Minimal Description */}
                        <p className="text-lg md:text-xl text-muted-foreground max-w-xl text-balance">
                            {t('home.heroDescription')}
                        </p>

                        {/* Two Strong Buttons */}
                        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
                            <Button asChild size="lg" className="h-12 px-8 text-base rounded-xl shadow-lg hover:shadow-xl smooth-hover w-full sm:w-auto min-w-[200px]">
                                <Link href="/browse">
                                    <BookOpen className="mr-2 h-5 w-5" />
                                    {t('home.browseButton')}
                                    <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                            <Button asChild size="lg" variant="outline" className="h-12 px-8 text-base rounded-xl border-2 hover:bg-primary/5 hover:border-primary smooth-hover w-full sm:w-auto min-w-[200px]">
                                <Link href="/upload">
                                    <FileText className="mr-2 h-5 w-5" />
                                    {t('home.uploadButton')}
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Right Column: Image & Decorations */}
                    <div className="relative hidden lg:block">
                        {/* Main Image Container */}
                        <div className="relative z-10 w-full max-w-md mx-auto aspect-square">
                            {/* 3D Model */}
                            <div className="w-full h-full relative">
                                <Hero3DModel />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
