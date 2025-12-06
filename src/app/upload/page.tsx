'use client';

import { useAuth } from '@/lib/auth-context';
import { UploadForm } from '@/components/upload/upload-form';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Loader2, LogOut, Upload, User } from 'lucide-react';

// Google icon component
function GoogleIcon({ className }: { className?: string }) {
    return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
        </svg>
    );
}

// Login Card Component
function LoginCard({ onLogin }: { onLogin: () => void }) {
    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader className="text-center space-y-4">
                <div className="mx-auto p-4 rounded-full bg-primary/10">
                    <Upload className="h-12 w-12 text-primary" />
                </div>
                <CardTitle className="text-2xl font-headline">Upload Resources</CardTitle>
                <CardDescription className="text-base">
                    Share your study materials with the community. Please sign in with your Google account to continue.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                <Button
                    onClick={onLogin}
                    size="lg"
                    className="w-full"
                    variant="outline"
                >
                    <GoogleIcon className="h-5 w-5 mr-2" />
                    Continue with Google
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                    By signing in, you agree to our Terms of Service and Privacy Policy.
                </p>
            </CardContent>
        </Card>
    );
}

// Profile Section Component
function ProfileSection({ user, onLogout }: { user: NonNullable<ReturnType<typeof useAuth>['user']>; onLogout: () => void }) {
    const initials = user.name
        ?.split(' ')
        .map(n => n[0])
        .join('')
        .toUpperCase() || 'U';

    return (
        <Card className="mb-6">
            <CardContent className="py-4">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                            <AvatarImage src={user.avatar || undefined} alt={user.name} />
                            <AvatarFallback className="bg-primary text-primary-foreground">
                                {initials}
                            </AvatarFallback>
                        </Avatar>
                        <div>
                            <p className="font-semibold">{user.name}</p>
                            <p className="text-sm text-muted-foreground">{user.email}</p>
                        </div>
                    </div>
                    <Button variant="outline" size="sm" onClick={onLogout}>
                        <LogOut className="h-4 w-4 mr-2" />
                        Logout
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}

// Loading State
function LoadingState() {
    return (
        <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <Loader2 className="h-12 w-12 animate-spin text-primary" />
            <p className="text-muted-foreground">Loading...</p>
        </div>
    );
}

export default function UploadPage() {
    const { user, isAuthenticated, isLoading, login, logout } = useAuth();

    if (isLoading) {
        return (
            <div className="container mx-auto max-w-3xl px-4 py-8">
                <LoadingState />
            </div>
        );
    }

    // Not authenticated - show login
    if (!isAuthenticated || !user) {
        return (
            <div className="container mx-auto max-w-3xl px-4 py-8">
                <LoginCard onLogin={login} />
            </div>
        );
    }

    // Authenticated - show profile and upload form
    return (
        <div className="container mx-auto max-w-3xl px-4 py-8">
            <ProfileSection user={user} onLogout={logout} />

            <Card>
                <CardHeader>
                    <CardTitle className="text-3xl font-headline">Upload a Resource</CardTitle>
                    <CardDescription>
                        Share your study materials with the community. Please fill out the details below to upload your PDF.
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UploadForm />
                </CardContent>
            </Card>
        </div>
    );
}
