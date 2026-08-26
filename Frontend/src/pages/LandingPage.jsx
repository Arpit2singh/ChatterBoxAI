import React from 'react';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import GradientWaves from '../components/GradientWaves';
import HowItWorks from '../components/HowItWorks';
import Footer from '../components/Footer';
import { Mic, Sparkles, Layers, Users, Zap, Shield, Share2 } from 'lucide-react';
import '../App.css';

export default function LandingPage() {
  return (
    <div className="chatterbox-app">
      {/* Global Background Layer - Spanning entire screen */}
      <GradientWaves
        horizonColor="#070817"
        waveColor="#1c1442"
        crestColor="#38bdf8"
        speed={0.35}
        amplitude={2.6}
        waveScale={0.55}
        waveRatio={0.9}
        swell={28}
        turbulence={18}
        tilt={0.4}
        zoom={0.9}
        height={2.2}
        fogDepth={42}
        detail="low"
        brightness={1.05}
        opacity={0.8}
        mouseInteraction
        parallaxStrength={0.4}
        grain={false}
        grainIntensity={0.04}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100vw',
          height: '100vh',
          zIndex: -1,
          pointerEvents: 'none'
        }}
      />

      {/* 1. Header / Navbar (Shadcn UI) */}
      <Navbar />

      <main>
        {/* 2. Hero Section with WebGL & Parallax Layers */}
        <Hero />

        {/* 3. Features Highlight Preview */}
        <section id="features" className="features-preview-section light-mode">
          <div className="section-container">
            <div className="section-header">
              <span className="section-eyebrow-light">
                <Sparkles size={14} className="eyebrow-icon-light" />
                NEXT-GEN COLLABORATION
              </span>
              <h2 className="section-title-light">
                Everything You Speak,<br />
                <span className="title-gradient-light">Rendered Instantly</span>
              </h2>
              <p className="section-desc-light">
                Chatterbox AI connects your team's voice stream to an autonomous multi-modal agent 
                that creates diagrams, wireframes, and UI mockups in real time.
              </p>
            </div>

            <div className="feature-cards-grid-light">
              <div className="feature-card-light purple-theme">
                <div className="card-icon-wrapper">
                  <div className="icon-circle"><Mic size={24} /></div>
                  <div className="floating-dot" />
                </div>
                <h3 className="card-title">Real-Time Voice Directives</h3>
                <p className="card-desc">
                  Natural conversation to precisely articulate requirements, Speak your ideas and watch them materialize into vector graphics.
                </p>
                <div className="card-pill">
                  <Zap size={14} /> LIVE TRANSCRIPTION
                </div>
              </div>

              <div className="feature-card-light blue-theme">
                <div className="card-icon-wrapper">
                  <div className="icon-circle"><Layers size={24} /></div>
                  <div className="floating-dot" />
                </div>
                <h3 className="card-title">Infinite Shared Canvas</h3>
                <p className="card-desc">
                  Multi-layered canvas with react-based primitives, smart auto-layout, sticky notes, and generative AI models expansion.
                </p>
                <div className="card-pill">
                  <span style={{ fontSize: '14px', lineHeight: 1 }}>∞</span> UNLIMITED SPACE
                </div>
              </div>

              <div className="feature-card-light teal-theme">
                <div className="card-icon-wrapper">
                  <div className="icon-circle"><Users size={24} /></div>
                  <div className="floating-dot" />
                </div>
                <h3 className="card-title">Multi-User Voice Rooms</h3>
                <p className="card-desc">
                  Crystal-clear WebRTC audio with spatial presence, real-time speaker highlighting, and emergency noise synchronization.
                </p>
                <div className="card-pill">
                  <div style={{ display: 'flex', gap: '2px', alignItems: 'center', height: '10px' }}>
                    <span style={{ width: '2px', height: '6px', background: 'currentColor', borderRadius: '2px' }}></span>
                    <span style={{ width: '2px', height: '10px', background: 'currentColor', borderRadius: '2px' }}></span>
                    <span style={{ width: '2px', height: '6px', background: 'currentColor', borderRadius: '2px' }}></span>
                  </div>
                  SPATIAL AUDIO
                </div>
              </div>
            </div>

            <div className="section-footer-note">
              <Sparkles size={16} className="footer-star-icon" />
              <span>BUILT FOR TEAMS <span className="dot">•</span> DESIGNED FOR FLOW</span>
            </div>
          </div>
        </section>

        {/* 4. How It Works (Steps) */}
        <HowItWorks />
      </main>

      {/* 5. Footer (Shadcn UI) */}
      <Footer />
    </div>
  );
}
