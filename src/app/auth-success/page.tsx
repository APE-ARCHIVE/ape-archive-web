'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Loader2, CheckCircle, XCircle } from 'lucide-react';
import { setAuthCookies } from '@/lib/auth-context';

export default function AuthSuccessPage() {
    const router = useRouter();
    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Processing authentication...');

    useEffect(() => {
        // Parse hash fragment from URL
        // Format: #accessToken=...&userId=...&isOnboarded=...
        const hash = window.location.hash.substring(1); // Remove the #
        const params = new URLSearchParams(hash);

        const accessToken = params.get('accessToken');
        console.log('accessToken', accessToken);
        const userId = params.get('userId');
        const isOnboarded = params.get('isOnboarded');

        if (accessToken) {
            // Store in cookies
            setAuthCookies(accessToken, userId || undefined);

            setStatus('success');
            setMessage('Login successful! Redirecting...');

            // Redirect after a short delay
            setTimeout(() => {
                router.push('/upload');
            }, 1500);
        } else {
            setStatus('error');
            setMessage('Authentication failed. No access token received.');

            // Redirect to upload page after delay
            setTimeout(() => {
                router.push('/upload');
            }, 5000);
        }
    }, [router]);

    return (
        <div className="flex items-center justify-center min-h-[60vh]">
            <Card className="w-full max-w-md">
                <CardHeader className="text-center">
                    <CardTitle className="flex flex-col items-center gap-4">
                        {status === 'loading' && (
                            <>
                                <Loader2 className="h-12 w-12 animate-spin text-primary" />
                                Processing
                            </>
                        )}
                        {status === 'success' && (
                            <>
                                <CheckCircle className="h-12 w-12 text-green-500" />
                                Success!
                            </>
                        )}
                        {status === 'error' && (
                            <>
                                <XCircle className="h-12 w-12 text-destructive" />
                                Error
                            </>
                        )}
                    </CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                    <p className="text-muted-foreground">{message}</p>
                </CardContent>
            </Card>
        </div>
    );
}
