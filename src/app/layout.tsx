import type { Metadata } from 'next';
import './globals.css';
import { cn } from '@/lib/utils';
import { Header } from '@/components/shared/header';
import { Footer } from '@/components/shared/footer';
import { Toaster } from '@/components/ui/toaster';
import { ThemeProvider } from '@/components/theme-provider';
import { ModeToggle } from '@/components/mode-toggle';
import { LanguageProvider } from '@/lib/i18n-context';
import { QueryProvider } from '@/components/query-provider';
import { AuthProvider } from '@/lib/auth-context';
import { BugReportButton } from '@/components/shared/bug-report-button';

const siteUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://apearchive.lk';

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'APE ARCHIVE - Free A/L Study Materials for Sri Lankan Students',
    template: '%s | APE ARCHIVE',
  },
  description: 'Access free A/L study materials, past papers, notes, and educational resources for Sri Lankan students. Download syllabus, teacher guides, and textbooks for Science, Commerce, Arts, and Technology streams.',
  keywords: [
    'A/L study materials',
    'Sri Lanka A/L',
    'Advanced Level',
    'past papers',
    'study notes',
    'syllabus',
    'teacher guide',
    'textbooks',
    'free education',
    'Sri Lankan students',
    'Science stream',
    'Commerce stream',
    'Arts stream',
    'Technology stream',
    'Physics',
    'Chemistry',
    'Biology',
    'Combined Maths',
    'Economics',
    'Accounting',
    'ICT',
    'APE Archive',
  ],
  authors: [{ name: 'APE ARCHIVE Team', url: siteUrl }],
  creator: 'APE ARCHIVE',
  publisher: 'APE ARCHIVE',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
  },
  manifest: '/site.webmanifest',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteUrl,
    siteName: 'APE ARCHIVE',
    title: 'APE ARCHIVE - Free A/L Study Materials for Sri Lankan Students',
    description: 'Access free A/L study materials, past papers, notes, and educational resources for Sri Lankan students.',
    images: [
      {
        url: '/logo/open-graph.png',
        width: 1200,
        height: 630,
        alt: 'APE ARCHIVE - Free Educational Resources',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'APE ARCHIVE - Free A/L Study Materials',
    description: 'Access free A/L study materials, past papers, notes, and educational resources for Sri Lankan students.',
    images: ['/logo/open-graph.png'],
    creator: '@apearchive',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      'en-US': siteUrl,
      'si-LK': `${siteUrl}/si`,
      'ta-LK': `${siteUrl}/ta`,
    },
  },
  category: 'education',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={cn('min-h-screen bg-background font-body antialiased')}>
        <QueryProvider>
          <AuthProvider>
            <LanguageProvider>
              <ThemeProvider
                attribute="class"
                defaultTheme="dark"
                enableSystem
                disableTransitionOnChange
              >
                <div className="relative min-h-screen w-full bg-background">
                  {/*  Diagonal Cross Grid Background */}
                  <div
                    className="absolute inset-0 z-0 opacity-40
      [background-image:linear-gradient(0deg,transparent_49%,hsl(var(--border))_49%,hsl(var(--border))_51%,transparent_51%),linear-gradient(90deg,transparent_49%,hsl(var(--border))_49%,hsl(var(--border))_51%,transparent_51%)]
      [background-size:40px_40px]"
                  ></div>
                  <Header />
                  <div className="relative z-10 flex min-h-screen max-w-7xl w-full px-4 mx-auto flex-col overflow-x-hidden">
                    {children}
                  </div>
                  <div className="relative z-50">
                    <Footer />
                  </div>
                </div>
                {/* Floating buttons - bottom right */}
                <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-3">
                  <ModeToggle /><BugReportButton />
                </div>
                <Toaster />
              </ThemeProvider>
            </LanguageProvider>
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
