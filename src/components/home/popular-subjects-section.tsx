'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { ArrowRight, Book, GraduationCap, BookOpen, FileText, Award, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { subjects } from '@/constants/data';
import { subjectFilters } from '@/constants/filters';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n-context';

export function PopularSubjectsSection() {
    const { t } = useLanguage();
    const [selectedFilter, setSelectedFilter] = useState('All');

    return (
        <section
            id="popular-subjects"
            className="w-full py-4 md:py-8"
        >
            <div className="container px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center space-y-4 mb-12">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                            <Book className="w-3 h-3 mr-1" />
                            {t('home.popularSubjectsBadge')}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {t('home.popularSubjectsTitle')}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {t('home.popularSubjectsDescription')}
                        </p>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap items-center justify-center gap-2 mb-10">
                        {subjectFilters.map((filter) => (
                            <button
                                key={filter}
                                onClick={() => setSelectedFilter(filter)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${selectedFilter === filter
                                    ? 'bg-primary text-primary-foreground shadow-md'
                                    : 'bg-secondary hover:bg-primary/10 text-foreground hover:text-primary'
                                    }`}
                            >
                                {filter}
                            </button>
                        ))}
                    </div>

                    {/* 3×4 Grid with Minimal Cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {subjects.slice(0, 12).map((subject, index) => {
                            const icons = [GraduationCap, Book, FileText, BookOpen, Award, TrendingUp];
                            const Icon = icons[index % icons.length];

                            return (
                                <Link href="/browse" key={subject.name}>
                                    <Card className="group relative overflow-hidden border-border/40 bg-gradient-to-br from-card to-muted/30 hover:bg-gradient-to-br hover:from-background hover:to-primary/5 hover:border-primary/50 transition-all duration-300 ease-out hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1">
                                        <CardContent className="flex flex-col items-center justify-center text-center p-6 space-y-4">
                                            <div className="relative">
                                                <div className="rounded-2xl bg-primary/5 p-5 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 ease-out ring-1 ring-primary/10 group-hover:ring-primary/20">
                                                    <Icon className="h-8 w-8 text-primary group-hover:text-primary-foreground transition-colors duration-300" />
                                                </div>
                                                {/* Decorative blur behind icon */}
                                                <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                            </div>
                                            <div className="space-y-1 z-10">
                                                <p className="font-semibold text-base group-hover:text-primary transition-colors duration-300">
                                                    {subject.name}
                                                </p>
                                                <p className="text-xs text-muted-foreground group-hover:text-muted-foreground/80 transition-colors">
                                                    {subject.count} resources
                                                </p>
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Link>
                            );
                        })}
                    </div>

                    {/* View All Link */}
                    <div className="text-center mt-10">
                        <Button asChild variant="outline" className="border-2 hover:border-primary hover:bg-primary/5 smooth-hover">
                            <Link href="/browse">
                                {t('home.viewAllSubjects')}
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
