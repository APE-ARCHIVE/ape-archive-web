"use client";

import { useState } from "react";
import { newsItems } from "@/constants/news";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import { CalendarDays, Newspaper, Search } from "lucide-react";

const ITEMS_PER_PAGE = 6;

export default function NewsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    // Filter news items based on search query
    const filteredNews = newsItems.filter(
        (item) =>
            item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            item.summary.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate pagination
    const totalPages = Math.ceil(filteredNews.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const paginatedNews = filteredNews.slice(
        startIndex,
        startIndex + ITEMS_PER_PAGE
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
        setCurrentPage(1); // Reset to first page on search
    };

    return (
        <div className="container mx-auto py-8 space-y-8">
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Education News</h1>
                    <p className="text-muted-foreground">
                        Stay updated with the latest announcements, exam schedules, and
                        educational opportunities.
                    </p>
                </div>
                <div className="relative w-full md:w-72">
                    <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Search news..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="pl-8"
                    />
                </div>
            </div>

            {paginatedNews.length > 0 ? (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {paginatedNews.map((item) => (
                        <Card
                            key={item.id}
                            className="flex flex-col h-full hover:shadow-md transition-shadow"
                        >
                            <CardHeader>
                                <div className="flex justify-between items-start gap-4 mb-2">
                                    <Badge variant={getBadgeVariant(item.category)}>
                                        {item.category}
                                    </Badge>
                                    <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <CalendarDays className="h-3 w-3" />
                                        {item.date}
                                    </span>
                                </div>
                                <CardTitle className="text-xl leading-tight hover:text-primary transition-colors cursor-pointer">
                                    {item.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="flex-1 flex flex-col gap-4">
                                <p className="text-sm text-muted-foreground flex-1">
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
            ) : (
                <div className="text-center py-12 text-muted-foreground">
                    No news found matching your search.
                </div>
            )}

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage > 1) setCurrentPage(currentPage - 1);
                                }}
                                className={
                                    currentPage === 1 ? "pointer-events-none opacity-50" : ""
                                }
                            />
                        </PaginationItem>
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                            <PaginationItem key={page}>
                                <PaginationLink
                                    href="#"
                                    isActive={page === currentPage}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setCurrentPage(page);
                                    }}
                                >
                                    {page}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
                                }}
                                className={
                                    currentPage === totalPages
                                        ? "pointer-events-none opacity-50"
                                        : ""
                                }
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            )}
        </div>
    );
}

function getBadgeVariant(category: string) {
    switch (category) {
        case "Exam":
            return "destructive";
        case "Scholarship":
            return "default"; // primary
        case "University":
            return "secondary";
        default:
            return "outline";
    }
}
