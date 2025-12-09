'use client';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { ArrowRight, CalendarDays, Newspaper } from 'lucide-react';
import Link from 'next/link';
import { newsItems } from '@/constants/news';
import { Badge } from '@/components/ui/badge';

export function RecentNewsSection() {
    return (
        <section id="recent-news" className="w-full py-4 md:py-8">
            <div className="container px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            Recent News
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            Stay updated with the latest announcements and educational opportunities.
                        </p>
                    </div>

                    {/* News Grid */}
                    <div className="grid gap-6 md:grid-cols-3">
                        {newsItems.slice(0, 3).map((item) => (
                            <Card key={item.id} className="flex flex-col h-full hover:shadow-md transition-shadow border-border/50 hover:border-primary/50">
                                <CardHeader>
                                    <div className="flex justify-between items-start gap-4 mb-2">
                                        <Badge variant={item.category === 'Exam' ? 'destructive' : item.category === 'Scholarship' ? 'default' : item.category === 'University' ? 'secondary' : 'outline'}>
                                            {item.category}
                                        </Badge>
                                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                                            <CalendarDays className="h-3 w-3" />
                                            {item.date}
                                        </span>
                                    </div>
                                    <CardTitle className="text-lg leading-tight hover:text-primary transition-colors cursor-pointer line-clamp-2">
                                        <Link href="/news">{item.title}</Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex-1 flex flex-col gap-4">
                                    <p className="text-sm text-muted-foreground flex-1 line-clamp-3">
                                        {item.summary}
                                    </p>
                                    <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground mt-auto pt-4 border-t">
                                        <Newspaper className="h-4 w-4" />
                                        <span>Source: {item.source}</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* View All Link */}
                    <div className="text-center mt-10">
                        <Button asChild variant="outline" className="border-2 hover:border-primary hover:bg-primary/5 smooth-hover">
                            <Link href="/news">
                                View All News
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    );
}
