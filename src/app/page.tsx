'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ArrowRight, Book, GraduationCap, Users, Search, BookOpen, FileText, Award, TrendingUp, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { PlaceHolderImages } from '@/constants/placeholder-images';
import { subjects, pdfs, contributors } from '@/constants/data';
import { subjectFilters } from '@/constants/filters';
import { PdfCard } from '@/components/shared/pdf-card';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { useState } from 'react';
import { useLanguage } from '@/lib/i18n-context';

export default function Home() {
  const { t } = useLanguage();
  const latestPdfs = pdfs.slice(0, 4);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');


  return (
    <div className='flex flex-col w-full min-h-screen'>
      {/* Hero Section - Completely Redesigned */}
      <section className="relative w-full pt-12 pb-16 md:pt-32 md:pb-40 overflow-hidden">
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

              {/* Search Bar */}
              <div className="w-full max-w-md">
                <div className="relative group">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
                  <Input
                    type="search"
                    placeholder={t('common.searchPlaceholder')}
                    className="pl-12 pr-4 h-14 text-base rounded-xl border-2 focus-visible:ring-primary focus-visible:ring-offset-4 shadow-lg"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

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
              {/* Decorative Background Shapes */}
              <div className="absolute -top-20 -right-20 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-primary/20 to-transparent rounded-full opacity-50" />

              {/* Main Image Container */}
              <div className="relative z-10 w-full max-w-md mx-auto aspect-square">
                {/* Yellow/Orange Circle Decoration (SVG) */}
                <svg className="absolute -top-10 -right-10 w-full h-full text-primary/20 animate-spin-slow" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" />
                </svg>

                {/* Placeholder Image */}
                <div className="w-full h-full rounded-3xl overflow-hidden shadow-2xl border-4 border-background relative bg-muted">
                  <img
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&w=800&q=80"
                    alt="Student Learning"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Floating Card Decoration */}
                <div className="absolute -bottom-6 -left-6 bg-card p-4 rounded-xl shadow-xl border border-border/50 flex items-center gap-3 animate-bounce-slow">
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                    <TrendingUp className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">98% Success</p>
                    <p className="text-xs text-muted-foreground">Rate</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Subjects Section - Redesigned */}
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

      {/* Contributors Section - Redesigned */}
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

      {/* Latest Uploads Section - Redesigned */}
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
    </div>
  );
}

