import React from 'react';
import { ArrowRight, ArrowUpRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import './Hero.css';

export default function Hero() {
  return (
    <section className="hero-section" aria-label="Hero Section">
      {/* Background Atmosphere */}
      <div className="hero-ambient-glow" aria-hidden="true" />
      <div className="hero-grid-subtle" aria-hidden="true" />

      <div className="hero-container-centered">
        {/* Small Quiet Eyebrow Badge */}
        <Badge variant="eyebrow" className="hero-eyebrow px-4 py-1.5 gap-2 text-xs">
          <Sparkles size={13} className="text-cyan-400" />
          <span className="eyebrow-text">VOICE-POWERED COLLABORATION</span>
        </Badge>

        {/* Clean Headline */}
        <h1 className="hero-headline">
          Your Voice.<br />
          <span className="headline-gradient">An AI That Builds.</span>
        </h1>

        {/* Focused Description */}
        <p className="hero-subheadline">
          Speak naturally. Collaborate in real time. Watch AI turn your ideas into a shared visual canvas.
        </p>

        {/* Primary CTA + Subtle Secondary Link */}
        <div className="hero-cta-group">
          <Button variant="default" size="lg" asChild className="rounded-full shadow-xl shadow-violet-500/25">
            <a href="#join" className="gap-2.5 font-['Outfit'] font-bold">
              <span>Join a Voice Room</span>
              <ArrowRight size={18} className="btn-arrow" />
            </a>
          </Button>

          <Button variant="ghost" size="lg" asChild className="rounded-full">
            <a href="#how-it-works" className="gap-1.5 text-white/80 hover:text-white font-semibold">
              <span>See how it works</span>
              <ArrowUpRight size={16} />
            </a>
          </Button>
        </div>

        {/* Quiet Trust Proof immediately below CTA */}
        <div className="hero-trust-quiet">
          <span className="trust-live-dot" />
          <span className="trust-item font-semibold text-white/80">1,420+ rooms active</span>
          <span className="trust-sep">&bull;</span>
          <span className="trust-item">No signup required</span>
          <span className="trust-sep">&bull;</span>
          <span className="trust-item">Ultra-low latency audio</span>
        </div>
      </div>
    </section>
  );
}
