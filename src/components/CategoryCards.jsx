import React from 'react';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    title: 'Tablets & Capsules',
    slug: 'tablets-capsules',
    image: '/images/products/tablets.svg',
    cardBg: 'bg-[#eff6ff]', // soft blue
    borderAccent: 'border-blue-100 hover:border-blue-300',
    count: '3 Formulations',
    desc: 'Coated, sustained release and solid oral doses.'
  },
  {
    title: 'Syrups & Suspensions',
    slug: 'syrups-suspensions',
    image: '/images/products/syrups.svg',
    cardBg: 'bg-[#ecfdf5]', // soft green / mint
    borderAccent: 'border-emerald-100 hover:border-emerald-300',
    count: '2 Formulations',
    desc: 'Pediatric drops, suspensions & oral liquid solutions.'
  },
  {
    title: 'Injectables',
    slug: 'injectables',
    image: '/images/products/injectables.svg',
    cardBg: 'bg-[#faf5ff]', // soft purple
    borderAccent: 'border-purple-100 hover:border-purple-300',
    count: '2 Formulations',
    desc: 'Sterile vials, lyophilized powders & ampoules.'
  },
  {
    title: 'Ointments & Creams',
    slug: 'ointments-creams',
    image: '/images/products/ointments.svg',
    cardBg: 'bg-[#fff1f2]', // soft rose
    borderAccent: 'border-rose-100 hover:border-rose-300',
    count: '2 Formulations',
    desc: 'Dermal applications, emulgels and protective barriers.'
  }
];

export default function CategoryCards({ onSelectCategory, onViewAll }) {
  return (
    <section id="products-showcase" className="py-16 lg:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="max-w-xl">
            <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
              Our Products
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
              A Wide Range of <br className="hidden sm:inline" />
              Pharmaceutical Solutions
            </h2>
            <p className="text-slate-600 text-sm sm:text-base mt-3 leading-relaxed">
              From everyday health needs to specialised therapies, we offer a comprehensive range of pharmaceutical products designed for a healthier tomorrow.
            </p>
          </div>

          <div className="mt-6 md:mt-0">
            <button
              onClick={onViewAll}
              className="inline-flex items-center space-x-2 px-5 py-2.5 rounded-full border border-sky-600 text-sky-600 hover:bg-sky-50 font-semibold text-sm transition-all hover:shadow-xs group cursor-pointer"
            >
              <span>View All Products</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* 4 Pastel Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat, idx) => (
            <div
              key={idx}
              onClick={() => onSelectCategory(cat.slug)}
              className={`${cat.cardBg} rounded-2xl border ${cat.borderAccent} p-5 flex flex-col justify-between transition-all duration-300 hover:shadow-lg hover:-translate-y-1 cursor-pointer group`}
            >
              {/* Product illustration container */}
              <div className="w-full h-48 rounded-xl overflow-hidden mb-4 bg-white/60 flex items-center justify-center p-2 group-hover:scale-[1.02] transition-transform">
                <img
                  src={cat.image}
                  alt={cat.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {/* Title & Link */}
              <div className="pt-2">
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs text-slate-500 mt-1 line-clamp-2">
                  {cat.desc}
                </p>

                <div className="mt-4 flex items-center space-x-1 text-sm font-semibold text-slate-700 group-hover:text-sky-600">
                  <span>Explore</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
