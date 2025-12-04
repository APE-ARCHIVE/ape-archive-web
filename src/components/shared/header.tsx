'use client';

import {
  BookOpen,
  Menu,
  FileText,
  Home,
  Upload,
  Info,
  LogIn,
  UserPlus,
  LayoutDashboard,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger, SheetClose } from '@/components/ui/sheet';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';


const navLinks = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/browse', label: 'Browse PDFs', icon: FileText },
  { href: '/upload', label: 'Upload', icon: Upload },
  { href: '/about', label: 'About', icon: Info },
];

// A mock auth state
const useAuth = () => {
  const pathname = usePathname();
  // Show user as logged in when on dashboard routes
  return { isAuthenticated: pathname.startsWith('/dashboard') };
};

export function Header() {
  const pathname = usePathname();
  const [isSheetOpen, setSheetOpen] = useState(false);
  const { isAuthenticated } = useAuth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container px-4 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center">
          <Link href="/" className="hidden md:flex items-center space-x-2 mr-6">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Lanka StudyShare</span>
          </Link>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="mr-2 px-0 text-base hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0">
              <Link href="/" className="mb-4 flex items-center" onClick={() => setSheetOpen(false)}>
                <BookOpen className="mr-2 h-6 w-6 text-primary" />
                <span className="font-bold font-headline">Lanka StudyShare</span>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)]">
                <div className="flex flex-col space-y-3">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        'flex items-center gap-2 rounded-md p-2 transition-colors hover:text-primary',
                        pathname === link.href ? 'bg-secondary text-primary' : 'text-foreground/70'
                      )}
                    >
                      <link.icon className="h-5 w-5" />
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
              <SheetClose asChild>
                <div />
              </SheetClose>
            </SheetContent>
          </Sheet>

          <Link href="/" className="flex items-center space-x-2 md:hidden">
            <BookOpen className="h-6 w-6 text-primary" />
            <span className="font-bold font-headline">Lanka StudyShare</span>
          </Link>

        </div>

        <div className="flex items-center space-x-6">
          <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'transition-colors hover:text-primary',
                  pathname === link.href ? 'text-primary' : 'text-foreground/60'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          {isAuthenticated && <UserNav />}
        </div>
      </div>
    </header>
  );
}

function UserNav() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-9 w-9">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User avatar" />
            <AvatarFallback>U</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">User</p>
            <p className="text-xs leading-none text-muted-foreground">user@example.com</p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild>
          <Link href="/dashboard/settings">
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <LogIn className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
