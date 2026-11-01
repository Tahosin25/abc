import React from 'react';
import { ArrowRight, Award, Users2, Globe2, ShieldCheck, Check } from 'lucide-react';

export default function AboutUs({ onOpenMissionModal }) {
  return (
    <section id="about" className="py-20 lg:py-28 bg-white border-t border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Heading, description, and stats list */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
                About Us
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 leading-[1.15]">
                Committed to <br />
                <span className="text-sky-600">Better Health</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
              Evercare Pharmaceuticals is a trusted name in the healthcare industry, committed to research, innovation and excellence in pharmaceutical manufacturing.
            </p>

            {/* 3 Metric Badges matching Nexora layout */}
            <div className="pt-2 space-y-5">

              {/* Stat 1: 20+ Years */}
              <div className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <Award className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 leading-tight">
                    20+
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500">
                    Years of Scientific Excellence &amp; Trust
                  </div>
                </div>
              </div>

              {/* Stat 2: 100+ Skilled Professionals */}
              <div className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <Users2 className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 leading-tight">
                    100+
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500">
                    Skilled Formulation Scientists &amp; QA Professionals
                  </div>
                </div>
              </div>

              {/* Stat 3: Global Quality Certifications */}
              <div className="flex items-center space-x-4 p-3 rounded-2xl hover:bg-slate-50 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-sky-50 border border-sky-100 flex items-center justify-center text-sky-600 shrink-0">
                  <Globe2 className="w-7 h-7" strokeWidth={1.75} />
                </div>
                <div>
                  <div className="text-2xl font-extrabold text-slate-900 leading-tight">
                    Global
                  </div>
                  <div className="text-xs sm:text-sm font-medium text-slate-500">
                    Quality Certifications (WHO-GMP, ISO 9001, GLP)
                  </div>
                </div>
              </div>

            </div>

            {/* Our Mission CTA Button */}
            <div className="pt-2">
              <button
                onClick={onOpenMissionModal}
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full shadow-lg shadow-sky-600/30 transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <span>Our Mission</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

          {/* Right Column: Visual of Stethoscope, blister packs, and pills */}
          <div className="lg:col-span-6 relative">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-950/10 border border-slate-100 bg-white">
              <img
                src="/images/about-pills.svg"
                alt="Evercare Pharmaceutical Quality Assurance and Tablets"
                className="w-full h-auto object-cover max-h-[460px] hover:scale-102 transition-transform duration-500"
              />

              {/* Float box: WHO-GMP Compliant */}
              <div className="absolute top-6 left-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-md border border-slate-200/80 flex items-center space-x-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[11px] font-bold text-emerald-600 uppercase tracking-wider block">Inspected</span>
                  <span className="text-xs font-bold text-slate-800">100% Validated Batches</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
