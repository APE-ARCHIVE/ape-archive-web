'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import { Search, Loader2, FileText, Download, Eye, Languages, TrendingUp, Filter, X } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { BubbleBackground } from '@/components/ui/shadcn-io/bubble-background';
import { apiClient } from '@/lib/api';
import { cn } from '@/lib/utils';

// Types for API response
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

interface GroupedTags {
  [group: string]: DocumentTag[];
}

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Resource Card Component
function ResourceCard({ resource }: { resource: Resource }) {
  const subject = resource.tags.find(t => t.group === 'SUBJECT' || t.group === 'Subject')?.name;
  const grade = resource.tags.find(t => t.group === 'GRADE' || t.group === 'Grade')?.name;
  const medium = resource.tags.find(t => t.group === 'MEDIUM' || t.group === 'Medium')?.name;
  const resourceType = resource.tags.find(t => t.group === 'RESOURCE_TYPE' || t.group === 'ResourceType')?.name;

  return (
    <Card className="group flex flex-col overflow-hidden card-hover border-border/50 hover:border-primary/30 bg-card h-full">
      <CardHeader className="pb-3 space-y-3">
        <div className="flex items-start gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base leading-tight mb-2 line-clamp-2">
              <Link href={`/pdfs/${resource.id}`} className="hover:text-primary smooth-hover">
                {resource.title}
              </Link>
            </CardTitle>
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-grow pb-3 space-y-3">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {resource.description || 'No description available'}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          {medium && (
            <div className="flex items-center gap-1.5">
              <Languages className="w-3.5 h-3.5" />
              <span>{medium.replace(' Medium', '')}</span>
            </div>
          )}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Eye className="w-3.5 h-3.5" />
              <span>{resource.views}</span>
            </div>
            <div className="flex items-center gap-1">
              <TrendingUp className="w-3.5 h-3.5 text-primary" />
              <span className="font-medium">{resource.downloads}</span>
            </div>
          </div>
        </div>
      </CardContent>

      <CardFooter className="flex-col items-start gap-3 pt-3 border-t border-border/50">
        <div className="flex flex-wrap gap-1.5">
          {grade && (
            <Badge variant="outline" className="border-border/50">
              {grade}
            </Badge>
          )}
          {subject && (
            <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 hover:bg-primary/20">
              {subject}
            </Badge>
          )}
          {resourceType && (
            <Badge variant="secondary" className="text-xs bg-primary/5 text-primary hover:bg-primary/10 border border-primary/20">
              {resourceType}
            </Badge>
          )}
        </div>

        <div className="w-full flex gap-2">
          <Button asChild size="sm" className="flex-1 rounded-lg smooth-hover">
            <Link href={`/pdfs/${resource.id}`}>
              <Eye className="mr-1.5 h-3.5 w-3.5" /> View
            </Link>
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="flex-1 rounded-lg hover:bg-primary/5 hover:border-primary smooth-hover"
            onClick={() => {
              if (resource.driveFileId) {
                window.open(`https://drive.google.com/uc?export=download&id=${resource.driveFileId}`, '_blank');
              }
            }}
          >
            <Download className="mr-1.5 h-3.5 w-3.5" /> Download
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}

// Filter Content Component
function FilterContent({
  groupedTags,
  selectedFilters,
  onFilterChange,
  onReset,
}: {
  groupedTags: GroupedTags;
  selectedFilters: Record<string, string[]>;
  onFilterChange: (group: string, tagId: string, checked: boolean) => void;
  onReset: () => void;
}) {
  // Support both UPPERCASE and lowercase group names for API compatibility
  const grades = groupedTags['GRADE'] || groupedTags['Grade'] || [];
  const subjects = groupedTags['SUBJECT'] || groupedTags['Subject'] || [];
  const mediums = groupedTags['MEDIUM'] || groupedTags['Medium'] || [];
  const resourceTypes = groupedTags['RESOURCE_TYPE'] || groupedTags['ResourceType'] || [];

  return (
    <div className="space-y-6">
      <Accordion type="multiple" defaultValue={['subject', 'grade', 'medium']} className="w-full">
        {subjects.length > 0 && (
          <AccordionItem value="subject">
            <AccordionTrigger className="text-lg font-semibold">Subject</AccordionTrigger>
            <AccordionContent className="space-y-2 max-h-60 overflow-y-auto">
              {subjects.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`subject-${tag.id}`}
                    checked={selectedFilters['Subject']?.includes(tag.id)}
                    onCheckedChange={(checked) => onFilterChange('Subject', tag.id, !!checked)}
                  />
                  <Label htmlFor={`subject-${tag.id}`} className="font-normal cursor-pointer">
                    {tag.name}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {grades.length > 0 && (
          <AccordionItem value="grade">
            <AccordionTrigger className="text-lg font-semibold">Grade</AccordionTrigger>
            <AccordionContent className="space-y-2 max-h-60 overflow-y-auto">
              {grades.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`grade-${tag.id}`}
                    checked={selectedFilters['Grade']?.includes(tag.id)}
                    onCheckedChange={(checked) => onFilterChange('Grade', tag.id, !!checked)}
                  />
                  <Label htmlFor={`grade-${tag.id}`} className="font-normal cursor-pointer">
                    {tag.name}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {mediums.length > 0 && (
          <AccordionItem value="medium">
            <AccordionTrigger className="text-lg font-semibold">Medium</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {mediums.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`medium-${tag.id}`}
                    checked={selectedFilters['Medium']?.includes(tag.id)}
                    onCheckedChange={(checked) => onFilterChange('Medium', tag.id, !!checked)}
                  />
                  <Label htmlFor={`medium-${tag.id}`} className="font-normal cursor-pointer">
                    {tag.name}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}

        {resourceTypes.length > 0 && (
          <AccordionItem value="resourceType">
            <AccordionTrigger className="text-lg font-semibold">Resource Type</AccordionTrigger>
            <AccordionContent className="space-y-2">
              {resourceTypes.map((tag) => (
                <div key={tag.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`type-${tag.id}`}
                    checked={selectedFilters['ResourceType']?.includes(tag.id)}
                    onCheckedChange={(checked) => onFilterChange('ResourceType', tag.id, !!checked)}
                  />
                  <Label htmlFor={`type-${tag.id}`} className="font-normal cursor-pointer">
                    {tag.name}
                  </Label>
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>

      <Button variant="outline" className="w-full" onClick={onReset}>
        Reset Filters
      </Button>
    </div>
  );
}

export default function SearchPage() {
  // Search state
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 300);

  // Pagination state
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [totalPages, setTotalPages] = useState(1);

  // Filter state
  const [groupedTags, setGroupedTags] = useState<GroupedTags>({});
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({});

  // Results state
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingTags, setIsLoadingTags] = useState(true);

  // Mobile filter sheet
  const [filterSheetOpen, setFilterSheetOpen] = useState(false);

  // Fetch tags for filters
  useEffect(() => {
    async function fetchTags() {
      try {
        const response = await apiClient.get('/api/v1/library/tags');
        if (response.data?.success && response.data?.data) {
          const data = response.data.data;
          if (Array.isArray(data)) {
            const grouped = data.reduce((acc: GroupedTags, tag: DocumentTag) => {
              if (!acc[tag.group]) acc[tag.group] = [];
              acc[tag.group].push(tag);
              return acc;
            }, {});
            setGroupedTags(grouped);
          } else {
            setGroupedTags(data as GroupedTags);
          }
        }
      } catch (error) {
        console.error('Failed to fetch tags:', error);
      } finally {
        setIsLoadingTags(false);
      }
    }
    fetchTags();
  }, []);

  // Fetch resources
  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      params.set('page', page.toString());
      params.set('limit', limit.toString());
      params.set('status', 'APPROVED');

      if (debouncedSearch) {
        params.set('search', debouncedSearch);
      }

      // Add tag filters
      const allTagIds = Object.values(selectedFilters).flat();
      if (allTagIds.length > 0) {
        allTagIds.forEach(tagId => params.append('tagId', tagId));
      }

      const response = await apiClient.get(`/api/v1/resources?${params.toString()}`);
      console.log('Search API response:', response.data);

      if (response.data?.success && response.data?.data) {
        const responseData = response.data.data;

        // Handle nested structure: data.data (array) and data.meta (pagination)
        if (responseData.data && Array.isArray(responseData.data)) {
          setResources(responseData.data);
          if (responseData.meta) {
            setTotalPages(responseData.meta.totalPages || Math.ceil(responseData.meta.total / limit));
          }
        } else if (Array.isArray(responseData)) {
          // Fallback for flat array response
          setResources(responseData);
          setTotalPages(responseData.length < limit ? page : page + 1);
        }
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error);
      setResources([]);
    } finally {
      setIsLoading(false);
    }
  }, [debouncedSearch, page, limit, selectedFilters]);

  // Fetch on search/filter/page change
  useEffect(() => {
    fetchResources();
  }, [fetchResources]);

  // Reset page when search or filters change
  useEffect(() => {
    setPage(1);
  }, [debouncedSearch, selectedFilters]);

  // Filter handlers
  const handleFilterChange = (group: string, tagId: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const current = prev[group] || [];
      if (checked) {
        return { ...prev, [group]: [...current, tagId] };
      } else {
        return { ...prev, [group]: current.filter(id => id !== tagId) };
      }
    });
  };

  const handleResetFilters = () => {
    setSelectedFilters({});
    setSearchQuery('');
  };

  // Count active filters
  const activeFilterCount = Object.values(selectedFilters).flat().length;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <BubbleBackground
        className="mb-12 py-16 md:py-24 rounded-xl overflow-hidden text-center"
        interactive
      >
        <div className="relative z-10 max-w-3xl mx-auto px-4">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-foreground mb-6 font-headline">
            Sri Lanka's Digital <br />
            <span>Learning Hub</span>
          </h1>
          <p className="text-lg md:text-xl text-foreground mb-10 max-w-2xl mx-auto">
            Access thousands of educational resources, share knowledge, and excel in your studies.
          </p>

          <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-zinc-500" />
            <Input
              type="search"
              placeholder="Search for subjects, past papers, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-14 pl-12 pr-12 bg-zinc-900/50 border-zinc-800 text-white placeholder:text-zinc-500 rounded-xl focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:border-zinc-600 text-base [&::-webkit-search-cancel-button]:hidden [&::-webkit-search-decoration]:hidden"
            />
            {searchQuery && (
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery('')}
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </BubbleBackground>

      {/* Main Content */}
      <div className="grid lg:grid-cols-[280px_1fr] gap-8">
        {/* Mobile Filter Button */}
        <div className="lg:hidden">
          <Sheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full">
                <Filter className="mr-2 h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-2">{activeFilterCount}</Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent>
              <div className="py-4">
                <h2 className="text-lg font-semibold mb-4">Filters</h2>
                {!isLoadingTags && (
                  <FilterContent
                    groupedTags={groupedTags}
                    selectedFilters={selectedFilters}
                    onFilterChange={handleFilterChange}
                    onReset={handleResetFilters}
                  />
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Sidebar */}
        <aside className="hidden lg:block">
          {isLoadingTags ? (
            <div className="flex justify-center py-8">
              <Loader2 className="h-6 w-6 animate-spin" />
            </div>
          ) : (
            <FilterContent
              groupedTags={groupedTags}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
              onReset={handleResetFilters}
            />
          )}
        </aside>

        {/* Results */}
        <main>
          {/* Results count */}
          <div className="mb-4 text-sm text-muted-foreground">
            {isLoading ? 'Searching...' : `${resources.length} resource${resources.length !== 1 ? 's' : ''} found`}
          </div>

          {/* Loading State */}
          {isLoading && (
            <div className="flex justify-center py-16">
              <Loader2 className="h-12 w-12 animate-spin text-primary" />
            </div>
          )}

          {/* Results Grid */}
          {!isLoading && resources.length > 0 && (
            <div className="grid sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {resources.map((resource) => (
                <ResourceCard key={resource.id} resource={resource} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && resources.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No resources found</h3>
              <p className="text-muted-foreground text-sm mb-4">
                Try adjusting your search or filters
              </p>
              <Button variant="outline" onClick={handleResetFilters}>
                Clear all filters
              </Button>
            </div>
          )}

          {/* Pagination */}
          {!isLoading && resources.length > 0 && (
            <Pagination className="mt-12">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(p => p - 1);
                    }}
                    className={page <= 1 ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
                <PaginationItem>
                  <span className="px-4 py-2 text-sm">
                    Page {page}
                  </span>
                </PaginationItem>
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(p => p + 1);
                    }}
                    className={page >= totalPages ? 'pointer-events-none opacity-50' : ''}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </main>
      </div>
    </div>
  );
}
