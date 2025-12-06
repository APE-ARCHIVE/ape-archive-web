'use client';

import {
    Card,
    CardContent,
} from '@/components/ui/card';
import { Users, Award } from 'lucide-react';
import { PlaceHolderImages } from '@/constants/placeholder-images';
import { contributors } from '@/constants/data';
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/i18n-context';

export function ContributorsSection() {
    const { t } = useLanguage();

    return (
        <section
            id="our-contributors"
            className="w-full py-4 md:py-8"
        >
            <div className="container px-4 md:px-6">
                <div className="max-w-6xl mx-auto">
                    {/* Section Header */}
                    <div className="text-center space-y-4 mb-12">
                        <Badge variant="outline" className="border-primary/30 text-primary">
                            <Users className="w-3 h-3 mr-1" />
                            {t('home.contributorsBadge')}
                        </Badge>
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                            {t('home.contributorsTitle')}
                        </h2>
                        <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                            {t('home.contributorsDescription')}
                        </p>
                    </div>

                    {/* Circular Profile Cards */}
                    <div className="relative">
                        <Carousel
                            opts={{
                                align: 'start',
                                loop: true,
                            }}
                            className="w-full"
                        >
                            <CarouselContent className="-ml-4">
                                {contributors.map((contributor) => {
                                    const avatar = PlaceHolderImages.find(
                                        (img) => img.id === contributor.avatarId
                                    );
                                    return (
                                        <CarouselItem
                                            key={contributor.id}
                                            className="pl-4 md:basis-1/2 lg:basis-1/3"
                                        >
                                            <Card className="border-border/50 hover:border-primary/50 card-hover bg-card h-full">
                                                <CardContent className="flex flex-col items-center text-center p-8 space-y-4">
                                                    {/* Avatar with Orange Ring */}
                                                    <div className="relative">
                                                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-primary/60 blur-md opacity-30" />
                                                        <Avatar className="w-24 h-24 relative ring-4 ring-primary/20 ring-offset-4 ring-offset-background">
                                                            <AvatarImage
                                                                src={avatar?.imageUrl}
                                                                alt={contributor.name}
                                                                className="object-cover"
                                                            />
                                                            <AvatarFallback className="bg-primary/10 text-primary text-2xl font-bold">
                                                                {contributor.name.charAt(0)}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        {/* Orange Accent Dot */}
                                                        <div className="absolute bottom-1 right-1 w-5 h-5 bg-primary rounded-full border-4 border-background" />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <h3 className="text-xl font-bold">
                                                            {contributor.name}
                                                        </h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            {contributor.contribution}
                                                        </p>
                                                        <div className="flex items-center justify-center gap-2 pt-2">
                                                            <Badge variant="secondary" className="text-xs">
                                                                <Award className="w-3 h-3 mr-1 text-primary" />
                                                                {t('home.topContributorBadge')}
                                                            </Badge>
                                                        </div>
                                                    </div>
                                                </CardContent>
                                            </Card>
                                        </CarouselItem>
                                    );
                                })}
                            </CarouselContent>
                            <CarouselPrevious className="hidden md:flex -left-4 border-2 hover:border-primary hover:text-primary" />
                            <CarouselNext className="hidden md:flex -right-4 border-2 hover:border-primary hover:text-primary" />
                        </Carousel>
                    </div>
                </div>
            </div>
        </section>
    );
}
