import React from 'react';
import { ShieldCheck, FlaskConical, Users, Leaf, Truck } from 'lucide-react';

const pillars = [
  {
    icon: ShieldCheck,
    title: 'High Quality Standards',
    description: 'Strict quality checks at every stage.'
  },
  {
    icon: FlaskConical,
    title: 'Innovative Formulations',
    description: 'Advanced science for better outcomes.'
  },
  {
    icon: Users,
    title: 'Patient Focused',
    description: 'Because every life matters.'
  },
  {
    icon: Leaf,
    title: 'Affordable Healthcare',
    description: 'Quality care within reach.'
  },
  {
    icon: Truck,
    title: 'Timely Delivery',
    description: 'Ensuring medicines reach you, on time.'
  }
];

export default function ValuePillars() {
  return (
    <section className="py-12 bg-white border-y border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 lg:gap-8 divide-y md:divide-y-0 lg:divide-x divide-slate-100">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={idx}
                className="flex flex-col items-center text-center p-4 lg:px-6 hover:bg-slate-50/70 rounded-2xl transition-colors duration-200 group"
              >
                {/* Pillar Icon Hexagon/Shield Container */}
                <div className="w-14 h-14 rounded-2xl bg-sky-50 text-sky-600 flex items-center justify-center mb-4 group-hover:bg-sky-600 group-hover:text-white group-hover:shadow-lg group-hover:shadow-sky-600/20 transition-all duration-300">
                  <Icon className="w-7 h-7" strokeWidth={1.75} />
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-slate-800 mb-1.5 leading-snug">
                  {pillar.title}
                </h3>

                {/* Subtitle description */}
                <p className="text-xs text-slate-500 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
