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

export const metadata: Metadata = {
  title: 'APE ARCHIVE',
  description: 'Access and share study materials online during emergencies and anytime you need.',
  openGraph: {
    title: 'APE ARCHIVE',
    description: 'Access and share study materials online during emergencies and anytime you need.',
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: 'APE ARCHIVE',
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_APP_URL}/logo/open-graph.png`,
        width: 1200,
        height: 630,
        alt: 'APE ARCHIVE',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
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
                  <div className="relative z-10 flex min-h-screen max-w-7xl w-full px-4 mx-auto flex-col justify-center items-center">
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
