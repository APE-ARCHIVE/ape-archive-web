'use client';

import { use, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

// This page converts path-based URLs to query params
// e.g., /library/science-stream/physics → /library?stream=science-stream&subject=physics

const pathToFilterMapping = ['stream', 'subject', 'grade', 'medium', 'resourceType', 'lesson'];

export default function LibraryPathPage({ params }: { params: Promise<{ path?: string[] }> }) {
    const { path: pathSegments = [] } = use(params);
    const router = useRouter();

    useEffect(() => {
        // Convert path segments to query params
        const queryParams = new URLSearchParams();

        pathSegments.forEach((segment, index) => {
            if (index < pathToFilterMapping.length) {
                queryParams.set(pathToFilterMapping[index], segment);
            }
        });

        const queryString = queryParams.toString();
        router.replace(`/library${queryString ? `?${queryString}` : ''}`);
    }, [pathSegments, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Redirecting...</p>
        </div>
    );
}
