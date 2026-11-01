import React from 'react';
import { ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

export default function Hero({ onExploreProducts }) {
  return (
    <section id="hero" className="relative overflow-hidden bg-gradient-to-b from-sky-50/70 via-white to-white pt-10 pb-16 lg:pt-16 lg:pb-24">
      {/* Decorative background grid and gradients */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70a_1px,transparent_1px),linear-gradient(to_bottom,#0284c70a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">

          {/* Left Column: Headline and Call to Action */}
          <div className="lg:col-span-6 space-y-6 text-left">

            {/* Tagline pill matching Nexora: "BETTER HEALTH. BRIGHTER FUTURES." */}
            <div className="inline-flex items-center space-x-2">
              <span className="text-xs sm:text-sm font-bold tracking-widest text-sky-700 uppercase bg-sky-100/80 px-3.5 py-1.5 rounded-full border border-sky-200/60 shadow-xs">
                Better Health. Brighter Futures.
              </span>
            </div>

            {/* Main Header with colored highlight */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-slate-900 tracking-tight leading-[1.12]">
              Trusted Healthcare <br className="hidden sm:inline" />
              for Every Stage <span className="text-sky-600">of Life</span>
            </h1>

            {/* Subtitle paragraph */}
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              We are dedicated to developing safe, effective and affordable medicines that help people live healthier, happier lives through continuous research and rigorous standards.
            </p>

            {/* Action buttons */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={onExploreProducts}
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full shadow-lg shadow-sky-600/30 hover:shadow-xl hover:shadow-sky-600/40 transition-all transform hover:-translate-y-0.5 cursor-pointer text-sm sm:text-base group"
              >
                <span>Explore Our Products</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              <a
                href="#about"
                className="inline-flex items-center space-x-2 px-6 py-3.5 bg-white hover:bg-slate-50 text-slate-700 font-semibold rounded-full border border-slate-200 hover:border-slate-300 transition-all text-sm sm:text-base"
              >
                <span>Our Heritage</span>
              </a>
            </div>

            {/* Trust highlights checklist */}
            <div className="pt-4 grid grid-cols-2 gap-3 max-w-md text-xs sm:text-sm text-slate-600 font-medium">
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>WHO-GMP Approved</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Global Pharmacopeia</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Zero Contamination Plants</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>40+ Export Markets</span>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Visual with Scientist and floating badge */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-lg lg:max-w-none">

              {/* Background circular decorative aura */}
              <div className="absolute -top-12 -right-12 w-72 h-72 bg-sky-200 rounded-full blur-3xl opacity-50 pointer-events-none" />
              <div className="absolute -bottom-8 -left-8 w-60 h-60 bg-emerald-100 rounded-full blur-2xl opacity-60 pointer-events-none" />

              {/* Main Scientist Visual Card */}
              <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/10 border border-white/80 bg-gradient-to-tr from-sky-50 to-white">
                <img
                  src="/images/hero/scientist.svg"
                  alt="Evercare Pharmaceutical Researcher holding medicine vial"
                  className="w-full h-auto object-cover max-h-[520px] transition-transform duration-700 hover:scale-[1.02]"
                />

                {/* Floating Science Innovation Badge in top right corner as in ref.jpg */}
                <div className="absolute top-6 right-6 bg-white/95 backdrop-blur-md px-5 py-4 rounded-2xl shadow-lg border border-slate-100 max-w-[190px] text-right transform hover:scale-105 transition-transform">
                  <div className="flex items-center justify-end space-x-1.5 text-sky-600 mb-1">
                    <Sparkles className="w-4 h-4 text-sky-500" />
                    <span className="text-[11px] font-bold tracking-wider uppercase">Pioneering</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 leading-snug">
                    Science <br />
                    Innovation <br />
                    <span className="text-sky-600">Better Lives</span>
                  </h4>
                  <div className="mt-2 w-8 h-1 bg-sky-500 ml-auto rounded-full" />
                </div>

                {/* Bottom floating micro stat */}
                <div className="absolute bottom-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border border-slate-100 flex items-center space-x-3">
                  <div className="w-3 h-3 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-xs font-semibold text-slate-700">99.98% Batch Purity Yield</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
