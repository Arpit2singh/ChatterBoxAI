import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Mic, ArrowRight, Menu, Sparkles, Radio } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import { cn } from '@/lib/utils';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Features', href: '#features' },
    { name: 'How it works', href: '#how-it-works' },
    { name: 'Canvas', href: '#canvas-demo' },
    { name: 'Docs', href: '#docs' },
  ];

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 h-18 z-50 transition-all duration-300 flex items-center',
        scrolled
          ? 'bg-[#060714]/90 backdrop-blur-xl border-b border-white/10 shadow-2xl shadow-black/60'
          : 'bg-[#070817]/70 backdrop-blur-lg border-b border-white/5'
      )}
    >
      <div className="w-full max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Brand Logo */}
        <Link
          to="/"
          className="flex items-center gap-3 text-decoration-none select-none group"
          aria-label="Chatterbox AI Homepage"
        >
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/40 via-blue-600/30 to-cyan-500/25 border border-white/25 flex items-center justify-center shadow-md shadow-violet-500/30 overflow-hidden group-hover:scale-105 transition-transform">
            <div className="absolute inset-0 bg-radial from-cyan-400/30 to-transparent pointer-events-none" />
            <Mic className="text-white relative z-10" size={16} />
          </div>
          <span className="font-['Outfit'] text-xl font-bold tracking-tight text-white">
            Chatterbox{' '}
            <span className="bg-gradient-to-r from-violet-400 via-cyan-300 to-white bg-clip-text text-transparent">
              AI
            </span>
          </span>
          <Badge variant="live" className="gap-1.5 py-0.5 text-[10px]">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shadow-sm shadow-cyan-400" />
            LIVE
          </Badge>
        </Link>

        {/* Desktop Navigation using Shadcn NavigationMenu */}
        <div className="hidden md:flex items-center -translate-y-[2px]">
          <NavigationMenu>
            <NavigationMenuList className="gap-2">
              {navLinks.map((item) => (
                <NavigationMenuItem key={item.name}>
                  <NavigationMenuLink asChild>
                    <a
                      href={item.href}
                      className="px-4 py-2 text-sm font-medium text-white/70 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
                    >
                      {item.name}
                    </a>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Desktop Actions using Shadcn Button */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <a href="#signin" className="text-white/80 hover:text-white text-sm font-semibold -translate-y-[2px]">
              Sign In
            </a>
          </Button>
          <Button variant="default" size="default" asChild>
            <Link to="/app" className="gap-2 font-['Outfit'] font-semibold">
              <span>Join a Room</span>
              <ArrowRight size={15} />
            </Link>
          </Button>
        </div>

        {/* Mobile Navigation Drawer using Shadcn Sheet */}
        <div className="md:hidden">
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Open Menu">
                <Menu size={22} className="text-white" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="flex flex-col justify-between">
              <div>
                <SheetHeader className="pb-6 border-b border-white/10 text-left">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-600/40 to-cyan-500/30 border border-white/20 flex items-center justify-center">
                      <Mic className="text-white" size={15} />
                    </div>
                    <SheetTitle className="font-['Outfit'] text-lg">Chatterbox AI</SheetTitle>
                  </div>
                </SheetHeader>

                <nav className="flex flex-col gap-2 pt-6">
                  {navLinks.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="px-4 py-3 rounded-lg text-base font-medium text-white/80 hover:text-white hover:bg-white/10 transition-colors"
                    >
                      {item.name}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="flex flex-col gap-3 pt-6 border-t border-white/10">
                <Button
                  variant="outline"
                  className="w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                  asChild
                >
                  <a href="#signin">Sign In</a>
                </Button>
                <Button
                  variant="default"
                  className="w-full justify-center"
                  onClick={() => setMobileOpen(false)}
                  asChild
                >
                  <Link to="/app" className="gap-2">
                    <span>Join a Room</span>
                    <ArrowRight size={15} />
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
