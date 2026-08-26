import React from 'react';
import { Mic, ArrowRight, Shield, Sparkles, MessageSquare, Globe, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/10 bg-[#04050e]/80 backdrop-blur-xl text-white pt-16 pb-12 overflow-hidden z-10">
      {/* Subtle top ambient glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-[1px] bg-gradient-to-r from-transparent via-violet-500/50 to-transparent pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-violet-600/10 blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <a href="#" className="flex items-center gap-3 w-fit text-decoration-none">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600/40 to-cyan-500/30 border border-white/20 flex items-center justify-center shadow-lg shadow-violet-500/20">
                <Mic className="text-white" size={16} />
              </div>
              <span className="font-['Outfit'] text-xl font-bold tracking-tight text-white">
                Chatterbox <span className="bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">AI</span>
              </span>
              <Badge variant="live" className="ml-1 text-[10px] py-0.5">
                v2.0
              </Badge>
            </a>

            <p className="text-white/60 text-sm leading-relaxed max-w-sm font-['Plus_Jakarta_Sans']">
              The voice-native collaborative AI canvas. Talk naturally, brainstorm in real time, and watch ideas materialize into visual interfaces.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href="#github"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label="Code Repository"
              >
                <Code2 size={16} />
              </a>
              <a
                href="#community"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label="Community"
              >
                <MessageSquare size={16} />
              </a>
              <a
                href="#global"
                className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all"
                aria-label="Global Network"
              >
                <Globe size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex flex-col gap-3 font-['Plus_Jakarta_Sans']">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase font-['Outfit']">Product</h4>
            <ul className="space-y-2 text-sm text-white/60 list-none p-0 m-0">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="hover:text-white transition-colors">How it works</a></li>
              <li><a href="#canvas-demo" className="hover:text-white transition-colors">Shared Canvas</a></li>
              <li><a href="#voice-engine" className="hover:text-white transition-colors">Spatial Audio</a></li>
              <li><a href="#changelog" className="hover:text-white transition-colors">Changelog</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 font-['Plus_Jakarta_Sans']">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase font-['Outfit']">Resources</h4>
            <ul className="space-y-2 text-sm text-white/60 list-none p-0 m-0">
              <li><a href="#docs" className="hover:text-white transition-colors">Documentation</a></li>
              <li><a href="#api" className="hover:text-white transition-colors">Agent API</a></li>
              <li><a href="#templates" className="hover:text-white transition-colors">Templates</a></li>
              <li><a href="#community" className="hover:text-white transition-colors">Community</a></li>
              <li><a href="#status" className="hover:text-white transition-colors">System Status</a></li>
            </ul>
          </div>

          <div className="flex flex-col gap-3 font-['Plus_Jakarta_Sans']">
            <h4 className="text-sm font-bold text-white tracking-wider uppercase font-['Outfit']">Company</h4>
            <ul className="space-y-2 text-sm text-white/60 list-none p-0 m-0">
              <li><a href="#about" className="hover:text-white transition-colors">About Us</a></li>
              <li><a href="#careers" className="hover:text-white transition-colors">Careers</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/50 font-['Plus_Jakarta_Sans']">
          <div>
            &copy; {new Date().getFullYear()} Chatterbox AI Inc. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1.5 text-white/70">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse shadow-sm shadow-emerald-400" />
              All systems normal
            </span>
            <span className="inline-flex items-center gap-1 text-white/50">
              <Shield size={13} className="text-cyan-400" />
              Enterprise Encryption
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
