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
import Image from 'next/image';
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
import { LanguageSwitcher } from '@/components/language-switcher';
import { navLinks } from '@/constants/data';


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
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container max-w-7xl px-4 mx-auto flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="hidden md:flex items-center space-x-2 group">
            <div className="relative w-[135px] aspect-video">
              <Image
                src="/logo/nav-logo.png"
                alt="APE ARCHIVE Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <Sheet open={isSheetOpen} onOpenChange={setSheetOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="mr-2 px-2 hover:bg-primary/10 hover:text-primary md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="pr-0 w-[280px]">
              <Link href="/" className="mb-6 flex items-center gap-2" onClick={() => setSheetOpen(false)}>
                <div className="relative w-[135px] aspect-video">
                  <Image
                    src="/logo/nav-logo.png"
                    alt="APE ARCHIVE Logo"
                    fill
                    className="object-contain"
                  />
                </div>
              </Link>
              <div className="my-4 h-[calc(100vh-8rem)]">
                <div className="flex flex-col space-y-2">
                  {navLinks.map((link) => (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSheetOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all',
                        pathname === link.href
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'text-foreground/70 hover:text-primary hover:bg-primary/5'
                      )}
                    >
                      <link.icon className="h-4 w-4" />
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
            <div className="relative w-[135px] aspect-video">
              <Image
                src="/logo/nav-logo.png"
                alt="APE ARCHIVE Logo"
                fill
                className="object-contain"
              />
            </div>
          </Link>

          <div className="ml-4">
            <LanguageSwitcher />
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <nav className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-2 rounded-lg text-sm font-medium transition-all',
                  pathname === link.href
                    ? 'bg-primary/10 text-primary'
                    : 'text-foreground/60 hover:text-primary hover:bg-primary/5'
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
        <Button variant="ghost" className="relative h-9 w-9 rounded-full hover:ring-2 hover:ring-primary/20">
          <Avatar className="h-9 w-9 ring-2 ring-primary/20 ring-offset-2 ring-offset-background">
            <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" alt="User avatar" />
            <AvatarFallback className="bg-primary/10 text-primary font-semibold">U</AvatarFallback>
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
        <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/5">
          <Link href="/dashboard">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem asChild className="cursor-pointer hover:bg-primary/5">
          <Link href="/dashboard/settings">
            <UserPlus className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="cursor-pointer hover:bg-destructive/5 text-destructive">
          <Link href="/">
            <LogIn className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
