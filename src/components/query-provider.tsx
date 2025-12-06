'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
//import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { useState, ReactNode } from 'react';

interface QueryProviderProps {
    children: ReactNode;
}

export function QueryProvider({ children }: QueryProviderProps) {
    // Create a new QueryClient instance for each session
    // This prevents data from being shared between users and requests
    const [queryClient] = useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        // Default stale time of 60 seconds
                        staleTime: 60 * 1000,
                        // Retry failed requests 1 time
                        retry: 1,
                        // Refetch on window focus (good for keeping data fresh)
                        refetchOnWindowFocus: true,
                    },
                },
            })
    );

    return (
        <QueryClientProvider client={queryClient}>
            {children}
            {/* DevTools only shown in development */}
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
        </QueryClientProvider>
    );
}
