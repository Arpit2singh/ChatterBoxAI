import React, { useEffect, useRef } from 'react';
import { Zap, Link as LinkIcon, Mic, Sparkles } from 'lucide-react';
import './HowItWorks.css';

export default function HowItWorks() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            // Unobserve after animating once
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    const cards = sectionRef.current.querySelectorAll('.step-item-animated');
    cards.forEach((card) => observer.observe(card));

    return () => observer.disconnect();
  }, []);

  return (
    <section id="how-it-works" className="how-it-works-section" ref={sectionRef}>
      <div className="section-container">
        <div className="section-header">
          <span className="section-eyebrow-workflow">
            <Zap size={14} className="eyebrow-icon-workflow" />
            Simple Workflow
          </span>
          <h2 className="section-title">How Chatterbox Works</h2>
        </div>

        <div className="steps-container">
          {/* Connecting Flow Line */}
          <div className="steps-connector-line">
            <div className="connector-pulse-dot" />
          </div>

          <div className="steps-row">
            {/* Step 1 */}
            <div className="step-item-animated step-1">
              <div className="step-inner-glow" />
              <div className="step-header-group">
                <div className="step-icon-badge">
                  <LinkIcon size={20} />
                </div>
                <div className="step-number-gradient">01</div>
              </div>
              <h4 className="step-title">Create a Room</h4>
              <p className="step-desc">
                Open an instant room and share your link with teammates. No sign-up required.
              </p>
            </div>

            {/* Step 2 */}
            <div className="step-item-animated step-2">
              <div className="step-inner-glow" />
              <div className="step-header-group">
                <div className="step-icon-badge">
                  <Mic size={20} />
                </div>
                <div className="step-number-gradient">02</div>
              </div>
              <h4 className="step-title">Talk Naturally</h4>
              <p className="step-desc">
                Discuss features, brainstorm architectures, or critique designs with your team.
              </p>
            </div>

            {/* Step 3 */}
            <div className="step-item-animated step-3">
              <div className="step-inner-glow" />
              <div className="step-header-group">
                <div className="step-icon-badge">
                  <Sparkles size={20} />
                </div>
                <div className="step-number-gradient">03</div>
              </div>
              <h4 className="step-title">AI Builds Along</h4>
              <p className="step-desc">
                The AI agent translates your conversation into interactive canvas artifacts in real time.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
