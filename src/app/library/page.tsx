'use client';

import React, { useState, useEffect, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  FileText,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Home,
  Eye,
  SlidersHorizontal,
  Loader2,
  AlertCircle,
  RefreshCw,
  Download,
  X,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api';

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
  fileSize?: string;
  uploader?: { id: string; name: string; role: string };
}

interface BrowseResponse {
  nextFolders?: { group: string; options: { name: string; slug: string; count: number }[] };
  resources?: Resource[];
  meta?: { total: number; page: number; limit: number; totalPages: number };
}

type HierarchyLevel = {
  [key: string]: HierarchyLevel | Resource[];
};

// Filter state type
interface Filters {
  stream?: string;
  subject?: string;
  grade?: string;
  medium?: string;
  resourceType?: string;
  lesson?: string;
}

// Helper to convert string to URL-safe slug
const toSlug = (str: string): string => {
  return str.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
};

// Color mapping
const subjectColors: Record<string, string> = {
  'Economics': 'bg-amber-500',
  'Physics': 'bg-blue-500',
  'Chemistry': 'bg-green-500',
  'Biology': 'bg-emerald-500',
  'Mathematics': 'bg-purple-500',
  'ICT': 'bg-orange-500',
  'History': 'bg-red-500',
  'Geography': 'bg-teal-500',
  'English': 'bg-indigo-500',
  'Sinhala': 'bg-pink-500',
  'Tamil': 'bg-rose-500',
  'Combined Maths': 'bg-violet-500',
  'Accounting': 'bg-cyan-500',
  'default': 'bg-primary',
};

const getSubjectColor = (subject: string): string => {
  return subjectColors[subject] || subjectColors['default'];
};

const resourceTypeColors: Record<string, string> = {
  'Teacher Guide': 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  "Teacher's Guide": 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  'Syllabus': 'bg-purple-500/20 text-purple-500 border-purple-500/30',
  'Notes': 'bg-green-500/20 text-green-500 border-green-500/30',
  'Past Paper': 'bg-amber-500/20 text-amber-500 border-amber-500/30',
  'Textbook': 'bg-red-500/20 text-red-500 border-red-500/30',
  'default': 'bg-muted text-muted-foreground border-border',
};

// Resource Card Component
function ResourceCard({ resource }: { resource: Resource }) {
  const resourceType = resource.tags.find(t => t.group === 'RESOURCE_TYPE' || t.group === 'ResourceType')?.name || 'Document';
  const medium = resource.tags.find(t => t.group === 'MEDIUM' || t.group === 'Medium')?.name;
  const subject = resource.tags.find(t => (t.group === 'SUBJECT' || t.group === 'Subject') && t.name !== 'A/L Subjects')?.name;
  const resourceTypeClass = resourceTypeColors[resourceType] || resourceTypeColors['default'];

  return (
    <Link href={`/pdfs/${resource.id}`}>
      <Card className="group card-hover cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full">
        <CardContent className="p-0">
          <div className="relative aspect-[4/3] bg-gradient-to-br from-muted to-muted/50 flex items-center justify-center overflow-hidden">
            <div className={cn("absolute inset-0 opacity-10", subject ? getSubjectColor(subject) : 'bg-primary')} />
            <FileText className="h-12 w-12 text-muted-foreground group-hover:text-primary transition-colors" />
            <Badge className={cn("absolute top-2 left-2 border", resourceTypeClass)}>
              {resourceType}
            </Badge>
            {medium && (
              <Badge variant="secondary" className="absolute top-2 right-2 text-xs">
                {medium.replace(' Medium', '')}
              </Badge>
            )}
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors" title={resource.title}>
              {resource.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1"><Eye className="h-3 w-3" />{resource.views}</span>
                <span className="flex items-center gap-1"><Download className="h-3 w-3" />{resource.downloads}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Folder Card for navigation
function FolderCard({ name, slug, count, filterKey, currentFilters }: {
  name: string;
  slug: string;
  count: number;
  filterKey: string;
  currentFilters: Filters;
}) {
  const newFilters = { ...currentFilters, [filterKey]: slug };
  const queryString = new URLSearchParams(
    Object.entries(newFilters).filter(([_, v]) => v) as [string, string][]
  ).toString();

  return (
    <Link href={`/library?${queryString}`}>
      <Card className="group card-hover cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm h-full">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Folder className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
                {name}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {count} {count === 1 ? 'item' : 'items'}
              </p>
            </div>
            <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Active filters display
function ActiveFilters({ filters, onClear }: { filters: Filters; onClear: (key: keyof Filters) => void }) {
  const activeFilters = Object.entries(filters).filter(([_, v]) => v) as [keyof Filters, string][];
  if (activeFilters.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-2 mb-4">
      {activeFilters.map(([key, value]) => (
        <Badge key={key} variant="secondary" className="gap-1 pr-1">
          <span className="capitalize">{key}:</span> {value.replace(/-/g, ' ')}
          <button onClick={() => onClear(key)} className="ml-1 hover:bg-background/50 rounded p-0.5">
            <X className="h-3 w-3" />
          </button>
        </Badge>
      ))}
      <Button variant="ghost" size="sm" onClick={() => activeFilters.forEach(([k]) => onClear(k))} className="h-6 text-xs">
        Clear all
      </Button>
    </div>
  );
}

// Sidebar hierarchy tree node
function TreeNode({ name, data, basePath, level = 0 }: {
  name: string;
  data: HierarchyLevel | Resource[];
  basePath: string;
  level?: number;
}) {
  const [isOpen, setIsOpen] = useState(level < 1);
  const slug = toSlug(name);
  const isResourceArray = Array.isArray(data) && data.length > 0 && 'id' in data[0];

  if (isResourceArray) {
    return (
      <div
        className="flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md text-muted-foreground"
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
      >
        <FileText className="h-4 w-4 shrink-0" />
        <span className="truncate">{name}</span>
        <Badge variant="secondary" className="ml-auto text-xs">{data.length}</Badge>
      </div>
    );
  }

  const entries = Object.entries(data as HierarchyLevel);

  return (
    <div>
      <div
        className="flex items-center gap-1 w-full px-2 py-1.5 text-sm rounded-md transition-colors hover:bg-muted cursor-pointer"
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <button className="p-0.5 shrink-0">
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        {isOpen ? <FolderOpen className="h-4 w-4 shrink-0" /> : <Folder className="h-4 w-4 shrink-0" />}
        <span className="truncate ml-1">{name}</span>
      </div>
      {isOpen && entries.map(([key, value]) => (
        <TreeNode key={key} name={key} data={value} basePath={`${basePath}/${slug}`} level={level + 1} />
      ))}
    </div>
  );
}

// Loading and Error states
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-muted-foreground">Loading...</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <div>
        <h3 className="font-semibold text-lg mb-1">Failed to load</h3>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />Try again
      </Button>
    </div>
  );
}

// Main Library Content Component
function LibraryContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  // Parse filters from URL
  const filters: Filters = {
    stream: searchParams.get('stream') || undefined,
    subject: searchParams.get('subject') || undefined,
    grade: searchParams.get('grade') || undefined,
    medium: searchParams.get('medium') || undefined,
    resourceType: searchParams.get('resourceType') || undefined,
    lesson: searchParams.get('lesson') || undefined,
  };

  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [hierarchy, setHierarchy] = useState<HierarchyLevel | null>(null);
  const [browseData, setBrowseData] = useState<BrowseResponse | null>(null);
  const [resources, setResources] = useState<Resource[]>([]);
  const [isLoadingHierarchy, setIsLoadingHierarchy] = useState(true);
  const [isLoadingBrowse, setIsLoadingBrowse] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch hierarchy for sidebar
  useEffect(() => {
    async function fetchHierarchy() {
      try {
        const response = await apiClient.get('/api/v1/library/hierarchy');
        if (response.data?.success && response.data?.data) {
          setHierarchy(response.data.data);
        }
      } catch (err) {
        console.error('Failed to fetch hierarchy:', err);
      } finally {
        setIsLoadingHierarchy(false);
      }
    }
    fetchHierarchy();
  }, []);

  // Fetch browse data based on filters
  const fetchBrowse = useCallback(async () => {
    setIsLoadingBrowse(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters.stream) params.set('stream', filters.stream);
      if (filters.subject) params.set('subject', filters.subject);
      if (filters.grade) params.set('grade', filters.grade);
      if (filters.medium) params.set('medium', filters.medium);
      if (filters.resourceType) params.set('resourceType', filters.resourceType);
      if (filters.lesson) params.set('lesson', filters.lesson);
      params.set('page', page.toString());
      params.set('limit', '20');

      const response = await apiClient.get(`/api/v1/library/browse?${params.toString()}`);
      console.log('Browse API response:', response.data);

      if (response.data?.success) {
        setBrowseData(response.data.data || response.data);

        // Handle resources from response
        if (response.data.data?.resources) {
          setResources(response.data.data.resources);
          if (response.data.data.meta) {
            setTotalPages(response.data.data.meta.totalPages || 1);
          }
        } else if (response.data.resources) {
          setResources(response.data.resources);
        } else {
          setResources([]);
        }
      }
    } catch (err: any) {
      console.error('Failed to fetch browse:', err);
      setError(err?.message || 'Failed to load resources');
    } finally {
      setIsLoadingBrowse(false);
    }
  }, [filters.stream, filters.subject, filters.grade, filters.medium, filters.resourceType, filters.lesson, page]);

  useEffect(() => {
    fetchBrowse();
  }, [fetchBrowse]);

  // Clear a filter
  const clearFilter = (key: keyof Filters) => {
    const newFilters = { ...filters };
    delete newFilters[key];
    const queryString = new URLSearchParams(
      Object.entries(newFilters).filter(([_, v]) => v) as [string, string][]
    ).toString();
    router.push(`/library${queryString ? `?${queryString}` : ''}`);
  };

  // Build breadcrumb from filters
  const breadcrumbItems = Object.entries(filters)
    .filter(([_, v]) => v)
    .map(([key, value]) => ({ key, value: value!.replace(/-/g, ' ') }));

  const gradeKeys = hierarchy ? Object.keys(hierarchy) : [];

  const SidebarContent = () => (
    <div className="space-y-2">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <Folder className="h-5 w-5" />
        Browse
      </h2>
      {isLoadingHierarchy ? (
        <div className="flex justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
      ) : hierarchy ? (
        <ScrollArea className="h-[calc(100vh-16rem)]">
          {gradeKeys.map((key) => (
            <TreeNode key={key} name={key} data={hierarchy[key]} basePath="/library" />
          ))}
        </ScrollArea>
      ) : null}
    </div>
  );

  // Determine what to show in main content
  const hasActiveFilters = Object.values(filters).some(v => v);
  const nextFolders = browseData?.nextFolders;

  return (
    <div className="flex flex-col w-full min-h-screen py-8">
      <div className="mb-6 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold">Document Library</h1>
            <p className="text-muted-foreground text-sm mt-1">Browse and download study materials</p>
          </div>
          <Sheet open={mobileFiltersOpen} onOpenChange={setMobileFiltersOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="sm" className="lg:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />Browse
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="py-4"><SidebarContent /></div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Breadcrumb */}
        <nav className="flex items-center gap-1 text-sm text-muted-foreground overflow-x-auto pb-2">
          <Link href="/library" className="flex items-center gap-1 hover:text-primary transition-colors shrink-0">
            <Home className="h-4 w-4" />
            <span>Library</span>
          </Link>
          {breadcrumbItems.map((item, index) => (
            <React.Fragment key={item.key}>
              <ChevronRight className="h-4 w-4 shrink-0" />
              <span className={cn("capitalize", index === breadcrumbItems.length - 1 && "text-foreground font-medium")}>
                {item.value}
              </span>
            </React.Fragment>
          ))}
        </nav>

        {/* Active Filters */}
        <ActiveFilters filters={filters} onClear={clearFilter} />
      </div>

      <div className="flex gap-6 flex-1">
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24"><SidebarContent /></div>
        </aside>

        <main className="flex-1 min-w-0">
          {isLoadingBrowse ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={fetchBrowse} />
          ) : (
            <>
              {/* Next folders if available */}
              {nextFolders && nextFolders.options && nextFolders.options.length > 0 && (
                <div className="mb-8">
                  <h2 className="text-lg font-semibold mb-4">Select {nextFolders.group}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                    {nextFolders.options.map((opt) => (
                      <FolderCard
                        key={opt.slug}
                        name={opt.name}
                        slug={opt.slug}
                        count={opt.count}
                        filterKey={nextFolders.group.toLowerCase()}
                        currentFilters={filters}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Resources */}
              <div className="mb-4 text-sm text-muted-foreground">
                {resources.length} resource{resources.length !== 1 ? 's' : ''} found
              </div>

              {resources.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {resources.map((resource) => (
                    <ResourceCard key={resource.id} resource={resource} />
                  ))}
                </div>
              ) : !nextFolders?.options?.length ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <FileText className="h-16 w-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">No resources found</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {hasActiveFilters ? 'Try adjusting your filters' : 'Select a category from the sidebar to browse'}
                  </p>
                  {hasActiveFilters && (
                    <Button variant="outline" onClick={() => router.push('/library')}>
                      Clear filters
                    </Button>
                  )}
                </div>
              ) : null}

              {/* Pagination */}
              {totalPages > 1 && (
                <div className="flex justify-center gap-2 mt-8">
                  <Button
                    variant="outline"
                    disabled={page <= 1}
                    onClick={() => setPage(p => p - 1)}
                  >
                    Previous
                  </Button>
                  <span className="flex items-center px-4 text-sm">
                    Page {page} of {totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={page >= totalPages}
                    onClick={() => setPage(p => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
}

// Wrap with Suspense for useSearchParams
export default function LibraryPage() {
  return (
    <Suspense fallback={<LoadingState />}>
      <LibraryContent />
    </Suspense>
  );
}