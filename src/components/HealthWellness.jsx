import React from 'react';
import { Heart, Users, Leaf, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function HealthWellness({ onLearnMore }) {
  return (
    <section id="focus" className="py-20 lg:py-24 bg-gradient-to-b from-sky-50/50 via-white to-sky-50/30 border-t border-slate-100 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">

          {/* Left Column: Joyful Family Image */}
          <div className="lg:col-span-5 order-2 lg:order-1">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-sky-900/10 border border-white">
              <img
                src="/images/family-wellness.svg"
                alt="Healthy active smiling family enjoying sunshine"
                className="w-full h-auto object-cover max-h-[460px] hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent pointer-events-none" />
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="text-xs uppercase tracking-widest font-semibold text-sky-200">Preventative Care</span>
                <p className="text-sm font-medium mt-1">Safeguarding life across generations from infancy to elderhood.</p>
              </div>
            </div>
          </div>

          {/* Right Column: Health & Wellness Content */}
          <div className="lg:col-span-7 space-y-6 order-1 lg:order-2">
            <div>
              <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
                Health &amp; Wellness
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight mt-2 leading-[1.15]">
                Healthy Choices <br />
                <span className="text-sky-600">for a Brighter Tomorrow</span>
              </h2>
            </div>

            <p className="text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl">
              Because good health is the foundation for a better life, we bring you trusted medicines, preventative formulations and holistic wellness solutions backed by real clinical data.
            </p>

            {/* 3 Checkmark Items on the right matching Nexora */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-sky-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Heart className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Better Health</span>
                  <span className="text-[11px] text-slate-500">Targeted therapies</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-sky-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Stronger Families</span>
                  <span className="text-[11px] text-slate-500">Care for every age</span>
                </div>
              </div>

              <div className="flex items-center space-x-3 p-4 bg-white rounded-2xl border border-slate-100 shadow-xs hover:border-sky-200 hover:shadow-md transition-all">
                <div className="w-10 h-10 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center shrink-0">
                  <Leaf className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-sm font-bold text-slate-800 block">Healthier Communities</span>
                  <span className="text-[11px] text-slate-500">Accessible supplies</span>
                </div>
              </div>
            </div>

            {/* Learn More Button */}
            <div className="pt-3">
              <button
                onClick={onLearnMore}
                className="inline-flex items-center space-x-2 px-7 py-3.5 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-full shadow-lg shadow-sky-600/30 transition-all hover:shadow-xl hover:-translate-y-0.5 cursor-pointer text-sm"
              >
                <span>Learn More</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
