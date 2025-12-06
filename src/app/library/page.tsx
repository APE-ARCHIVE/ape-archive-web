'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import {
  Search,
  FileText,
  Download,
  ChevronRight,
  ChevronDown,
  Folder,
  FolderOpen,
  Home,
  Eye,
  SlidersHorizontal,
  ArrowLeft,
  Loader2,
  AlertCircle,
  RefreshCw,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { apiClient } from '@/lib/api';

// Types based on API response structure
interface DocumentTag {
  id: string;
  name: string;
  group: string;
}

interface Document {
  id: string;
  title: string;
  description: string;
  driveFileId: string;
  mimeType: string;
  views: number;
  downloads: number;
  tags: DocumentTag[];
}

type HierarchyLevel = {
  [key: string]: HierarchyLevel | Document[];
};

// Color mapping for subjects
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

// Resource type icons mapping
const resourceTypeColors: Record<string, string> = {
  'Teacher Guide': 'bg-blue-500/20 text-blue-500 border-blue-500/30',
  'Syllabus': 'bg-purple-500/20 text-purple-500 border-purple-500/30',
  'Notes': 'bg-green-500/20 text-green-500 border-green-500/30',
  'Past Paper': 'bg-amber-500/20 text-amber-500 border-amber-500/30',
  'Textbook': 'bg-red-500/20 text-red-500 border-red-500/30',
  'Unit': 'bg-cyan-500/20 text-cyan-500 border-cyan-500/30',
  'default': 'bg-muted text-muted-foreground border-border',
};

// Helper to check if value is an array of documents
const isDocumentArray = (value: unknown): value is Document[] => {
  return Array.isArray(value) && value.length > 0 && 'id' in (value[0] as Document);
};

// Folder/Category Card Component
interface FolderCardProps {
  name: string;
  itemCount: number;
  onClick: () => void;
  color?: string;
}

function FolderCard({ name, itemCount, onClick, color }: FolderCardProps) {
  return (
    <Card
      className="group card-hover cursor-pointer overflow-hidden border-border/50 bg-card/50 backdrop-blur-sm"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className={cn(
            "p-2 rounded-lg",
            color || "bg-primary/10"
          )}>
            <Folder className={cn("h-6 w-6", color ? "text-white" : "text-primary")} />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {itemCount} {itemCount === 1 ? 'item' : 'items'}
            </p>
          </div>
          <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
        </div>
      </CardContent>
    </Card>
  );
}

// PDF Card Component - Links to /pdfs/[id] viewer
interface PDFCardProps {
  document: Document;
}

function PDFCard({ document }: PDFCardProps) {
  const resourceType = document.tags.find(t => t.group === 'ResourceType')?.name || 'Document';
  const medium = document.tags.find(t => t.group === 'Medium')?.name;
  const subject = document.tags.find(t => t.group === 'Subject' && t.name !== 'A/L Subjects')?.name;

  const resourceTypeClass = resourceTypeColors[resourceType] || resourceTypeColors['default'];

  return (
    <Link href={`/pdfs/${document.id}`}>
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
            <h3 className="font-semibold text-sm line-clamp-2 group-hover:text-primary transition-colors" title={document.title}>
              {document.title}
            </h3>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <Eye className="h-3 w-3" />
                  {document.views}
                </span>
                <span className="flex items-center gap-1">
                  <Download className="h-3 w-3" />
                  {document.downloads}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}

// Breadcrumb Component
interface BreadcrumbProps {
  path: string[];
  onNavigate: (index: number) => void;
}

function Breadcrumb({ path, onNavigate }: BreadcrumbProps) {
  return (
    <nav className="flex items-center gap-1 text-sm text-muted-foreground overflow-x-auto pb-2 scrollbar-hide">
      <button
        onClick={() => onNavigate(-1)}
        className="flex items-center gap-1 hover:text-primary transition-colors shrink-0"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Library</span>
      </button>
      {path.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="h-4 w-4 shrink-0" />
          <button
            onClick={() => onNavigate(index)}
            className={cn(
              "hover:text-primary transition-colors truncate max-w-[150px] sm:max-w-[200px]",
              index === path.length - 1 && "text-foreground font-medium"
            )}
            title={item}
          >
            {item}
          </button>
        </React.Fragment>
      ))}
    </nav>
  );
}

// Sidebar Tree Navigation
interface TreeNodeProps {
  name: string;
  data: HierarchyLevel | Document[];
  path: string[];
  currentPath: string[];
  onNavigate: (path: string[]) => void;
  level?: number;
}

function TreeNode({ name, data, path, currentPath, onNavigate, level = 0 }: TreeNodeProps) {
  const [isOpen, setIsOpen] = useState(level < 1);
  const isActive = JSON.stringify(path) === JSON.stringify(currentPath.slice(0, path.length));
  const isExactMatch = JSON.stringify(path) === JSON.stringify(currentPath);
  const isDocument = isDocumentArray(data);

  if (isDocument) {
    return (
      <button
        onClick={() => onNavigate(path)}
        className={cn(
          "flex items-center gap-2 w-full px-2 py-1.5 text-sm rounded-md transition-colors text-left",
          isExactMatch ? "bg-primary text-primary-foreground" : "hover:bg-muted"
        )}
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
      >
        <FileText className="h-4 w-4 shrink-0" />
        <span className="truncate">{name}</span>
        <Badge variant="secondary" className="ml-auto text-xs">
          {data.length}
        </Badge>
      </button>
    );
  }

  const entries = Object.entries(data as HierarchyLevel);

  return (
    <div>
      <div
        className={cn(
          "flex items-center gap-1 w-full px-2 py-1.5 text-sm rounded-md transition-colors",
          isExactMatch ? "bg-primary text-primary-foreground" : isActive ? "bg-muted" : "hover:bg-muted"
        )}
        style={{ paddingLeft: `${(level * 12) + 8}px` }}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(!isOpen);
          }}
          className="p-0.5 hover:bg-background/20 rounded shrink-0"
        >
          {isOpen ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
        </button>
        <button
          onClick={() => onNavigate(path)}
          className="flex items-center gap-2 flex-1 min-w-0 text-left"
        >
          {isOpen ? <FolderOpen className="h-4 w-4 shrink-0" /> : <Folder className="h-4 w-4 shrink-0" />}
          <span className="truncate">{name}</span>
        </button>
      </div>
      {isOpen && (
        <div className="mt-1">
          {entries.map(([key, value]) => (
            <TreeNode
              key={key}
              name={key}
              data={value}
              path={[...path, key]}
              currentPath={currentPath}
              onNavigate={onNavigate}
              level={level + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// Loading State
function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="text-muted-foreground">Loading library...</p>
    </div>
  );
}

// Error State
function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
      <AlertCircle className="h-12 w-12 text-destructive" />
      <div>
        <h3 className="font-semibold text-lg mb-1">Failed to load library</h3>
        <p className="text-muted-foreground text-sm">{message}</p>
      </div>
      <Button onClick={onRetry} variant="outline">
        <RefreshCw className="h-4 w-4 mr-2" />
        Try again
      </Button>
    </div>
  );
}

// Main Library Page
export default function Library() {
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPath, setCurrentPath] = useState<string[]>([]);
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [hierarchy, setHierarchy] = useState<HierarchyLevel | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLibrary = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await apiClient.get('/api/v1/library/hierarchy');
      if (response.data?.success && response.data?.data) {
        setHierarchy(response.data.data as HierarchyLevel);
      } else {
        throw new Error('Invalid response format');
      }
    } catch (err: any) {
      console.error('Failed to fetch library:', err);
      setError(err?.response?.data?.message || err?.message || 'Failed to load library');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchLibrary();
  }, []);

  const currentData = useMemo(() => {
    if (!hierarchy) return null;
    let data: HierarchyLevel | Document[] = hierarchy;
    for (const key of currentPath) {
      if (isDocumentArray(data)) break;
      data = (data as HierarchyLevel)[key];
    }
    return data;
  }, [currentPath, hierarchy]);

  const displayItems = useMemo(() => {
    if (!currentData) return [];
    if (isDocumentArray(currentData)) {
      return currentData.filter(doc =>
        !searchQuery || doc.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    const entries = Object.entries(currentData as HierarchyLevel);
    if (!searchQuery) return entries;
    return entries.filter(([key]) => key.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [currentData, searchQuery]);

  const getItemCount = (data: HierarchyLevel | Document[]): number => {
    if (isDocumentArray(data)) return data.length;
    return Object.values(data).reduce((count, value) => {
      return count + getItemCount(value as HierarchyLevel | Document[]);
    }, 0);
  };

  const navigateToPath = (path: string[]) => {
    setCurrentPath(path);
    setSearchQuery('');
    setMobileFiltersOpen(false);
  };

  const navigateUp = () => setCurrentPath(prev => prev.slice(0, -1));

  const handleBreadcrumbNavigate = (index: number) => {
    if (index === -1) setCurrentPath([]);
    else setCurrentPath(prev => prev.slice(0, index + 1));
  };

  const isShowingDocuments = currentData ? isDocumentArray(currentData) : false;
  const gradeKeys = hierarchy ? Object.keys(hierarchy) : [];

  const SidebarContent = () => {
    if (!hierarchy) return null;
    return (
      <div className="space-y-2">
        <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <Folder className="h-5 w-5" />
          Browse
        </h2>
        <ScrollArea className="h-[calc(100vh-16rem)]">
          {gradeKeys.map((grade) => (
            <TreeNode
              key={grade}
              name={grade}
              data={hierarchy[grade]}
              path={[grade]}
              currentPath={currentPath}
              onNavigate={navigateToPath}
            />
          ))}
        </ScrollArea>
      </div>
    );
  };

  if (isLoading) {
    return <div className="flex flex-col w-full min-h-screen py-8"><LoadingState /></div>;
  }

  if (error) {
    return <div className="flex flex-col w-full min-h-screen py-8"><ErrorState message={error} onRetry={fetchLibrary} /></div>;
  }

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
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Browse
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-80">
              <div className="py-4"><SidebarContent /></div>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center gap-2">
          {currentPath.length > 0 && (
            <Button variant="ghost" size="sm" onClick={navigateUp} className="shrink-0">
              <ArrowLeft className="h-4 w-4 mr-1" />
              Back
            </Button>
          )}
          <Breadcrumb path={currentPath} onNavigate={handleBreadcrumbNavigate} />
        </div>
      </div>

      <div className="flex gap-6 flex-1">
        <aside className="hidden lg:block w-72 shrink-0">
          <div className="sticky top-24"><SidebarContent /></div>
        </aside>

        <main className="flex-1 min-w-0">
          <div className="mb-4 text-sm text-muted-foreground">
            {isShowingDocuments
              ? `${displayItems.length} document${displayItems.length !== 1 ? 's' : ''}`
              : `${displayItems.length} folder${displayItems.length !== 1 ? 's' : ''}`
            }
          </div>

          {displayItems.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {isShowingDocuments
                ? (displayItems as Document[]).map((doc) => <PDFCard key={doc.id} document={doc} />)
                : (displayItems as [string, HierarchyLevel | Document[]][]).map(([key, value]) => (
                  <FolderCard
                    key={key}
                    name={key}
                    itemCount={getItemCount(value as HierarchyLevel | Document[])}
                    onClick={() => navigateToPath([...currentPath, key])}
                    color={currentPath.length === 1 ? getSubjectColor(key) : undefined}
                  />
                ))
              }
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <FileText className="h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold mb-2">No items found</h3>
              <p className="text-muted-foreground text-sm mb-4">Try a different search term</p>
              {searchQuery && <Button variant="outline" onClick={() => setSearchQuery('')}>Clear search</Button>}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}