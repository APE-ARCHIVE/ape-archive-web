'use client';

import { useState, useRef } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Bug, Send, Upload, X, Loader2, CheckCircle, ImageIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

const WEBHOOK_URL = 'https://central.elight.lk/webhook/3898863c-7535-4a7f-9f94-1fd52df69683';

export function BugReportButton() {
    const { toast } = useToast();
    const fileInputRef = useRef<HTMLInputElement>(null);

    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    // Form state
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [screenshot, setScreenshot] = useState<File | null>(null);
    const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);

    // Handle file selection
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith('image/')) {
                toast({
                    title: 'Invalid file type',
                    description: 'Please select an image file.',
                    variant: 'destructive'
                });
                return;
            }

            // Validate file size (max 5MB)
            if (file.size > 5 * 1024 * 1024) {
                toast({
                    title: 'File too large',
                    description: 'Please select an image under 5MB.',
                    variant: 'destructive'
                });
                return;
            }

            setScreenshot(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setScreenshotPreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    // Remove screenshot
    const removeScreenshot = () => {
        setScreenshot(null);
        setScreenshotPreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Reset form
    const resetForm = () => {
        setEmail('');
        setMessage('');
        setScreenshot(null);
        setScreenshotPreview(null);
        setIsSuccess(false);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validation
        if (!email.trim()) {
            toast({ title: 'Email required', description: 'Please enter your email.', variant: 'destructive' });
            return;
        }

        if (!message.trim()) {
            toast({ title: 'Message required', description: 'Please describe the bug.', variant: 'destructive' });
            return;
        }

        setIsSubmitting(true);

        try {
            // Prepare payload
            const payload: {
                email: string;
                message: string;
                screenshot?: string;
                screenshotName?: string;
                url: string;
                userAgent: string;
                timestamp: string;
            } = {
                email: email.trim(),
                message: message.trim(),
                url: typeof window !== 'undefined' ? window.location.href : '',
                userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
                timestamp: new Date().toISOString()
            };

            // Convert screenshot to base64 if present
            if (screenshot && screenshotPreview) {
                payload.screenshot = screenshotPreview;
                payload.screenshotName = screenshot.name;
            }

            // Send to webhook
            const response = await fetch(WEBHOOK_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error('Failed to submit bug report');
            }

            setIsSuccess(true);
            toast({
                title: 'Bug report submitted!',
                description: 'Thank you for helping us improve APE Archive.',
            });

            // Auto close after success
            setTimeout(() => {
                setIsOpen(false);
                resetForm();
            }, 2000);

        } catch (error) {
            console.error('Bug report submission failed:', error);
            toast({
                title: 'Submission failed',
                description: 'Please try again later.',
                variant: 'destructive'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    // Handle dialog close
    const handleOpenChange = (open: boolean) => {
        if (!open) {
            resetForm();
        }
        setIsOpen(open);
    };

    return (
        <>
            {/* Floating Button */}
            <Button
                onClick={() => setIsOpen(true)}
                variant="destructive"
                aria-label="Report a bug"
                className="p-0"
            >
                <Bug className="w-4 h-4" />
            </Button>

            {/* Bug Report Dialog */}
            <Dialog open={isOpen} onOpenChange={handleOpenChange}>
                <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                            <Bug className="w-5 h-5 text-primary" />
                            Report a Bug
                        </DialogTitle>
                        <DialogDescription>
                            Found an issue? Let us know and we'll fix it as soon as possible.
                        </DialogDescription>
                    </DialogHeader>

                    {isSuccess ? (
                        <div className="flex flex-col items-center justify-center py-8 gap-4">
                            <div className="w-16 h-16 rounded-full bg-green-500/20 flex items-center justify-center">
                                <CheckCircle className="w-8 h-8 text-green-500" />
                            </div>
                            <p className="text-center font-medium">Thank you for your report!</p>
                            <p className="text-sm text-muted-foreground text-center">
                                We'll look into it and get back to you.
                            </p>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-4">
                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="bug-email">Email *</Label>
                                <Input
                                    id="bug-email"
                                    type="email"
                                    placeholder="your@email.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={isSubmitting}
                                    required
                                />
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <Label htmlFor="bug-message">Describe the bug *</Label>
                                <Textarea
                                    id="bug-message"
                                    placeholder="What went wrong? What were you trying to do?"
                                    value={message}
                                    onChange={(e) => setMessage(e.target.value)}
                                    disabled={isSubmitting}
                                    rows={4}
                                    required
                                />
                            </div>

                            {/* Screenshot Upload */}
                            <div className="space-y-2">
                                <Label>Screenshot (optional)</Label>
                                {screenshotPreview ? (
                                    <div className="relative rounded-lg overflow-hidden border border-border">
                                        <img
                                            src={screenshotPreview}
                                            alt="Screenshot preview"
                                            className="w-full h-32 object-cover"
                                        />
                                        <button
                                            type="button"
                                            onClick={removeScreenshot}
                                            className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div
                                        onClick={() => fileInputRef.current?.click()}
                                        className={cn(
                                            "border-2 border-dashed border-border rounded-lg p-6",
                                            "flex flex-col items-center justify-center gap-2",
                                            "cursor-pointer hover:border-primary/50 transition-colors",
                                            "text-muted-foreground hover:text-foreground"
                                        )}
                                    >
                                        <ImageIcon className="w-8 h-8" />
                                        <p className="text-sm">Click to upload screenshot</p>
                                        <p className="text-xs text-muted-foreground">Max 5MB</p>
                                    </div>
                                )}
                                <input
                                    ref={fileInputRef}
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full"
                                disabled={isSubmitting}
                            >
                                {isSubmitting ? (
                                    <>
                                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                                        Submitting...
                                    </>
                                ) : (
                                    <>
                                        <Send className="w-4 h-4 mr-2" />
                                        Submit Report
                                    </>
                                )}
                            </Button>
                        </form>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}
