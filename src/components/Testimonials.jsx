import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch('/api/testimonials')
      .then((res) => res.json())
      .then((data) => setTestimonials(data))
      .catch((err) => console.error(err));
  }, []);

  const nextTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    if (testimonials.length === 0) return;
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
            What Our Customers Say
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight mt-2">
            Real People. Real Health Journeys.
          </h2>
        </div>

        {/* Testimonials Desktop 3-Card Grid matching Nexora */}
        <div className="relative">

          {/* Arrow navigation buttons */}
          <div className="flex justify-between items-center w-full absolute top-1/2 -translate-y-1/2 pointer-events-none z-10 -mx-4 sm:-mx-6 px-2">
            <button
              onClick={prevTestimonial}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Previous Testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextTestimonial}
              className="pointer-events-auto w-10 h-10 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-sky-600 hover:border-sky-300 flex items-center justify-center transition-all cursor-pointer"
              aria-label="Next Testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {(testimonials.length > 0 ? testimonials : [
              {
                id: 1,
                name: "Dr. Priya S.",
                role: "Chief Medical Officer",
                quote: "Evercare's medicines have made a real difference in my family's health. I trust their quality and care.",
                avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=300&q=80"
              },
              {
                id: 2,
                name: "Rohit M.",
                role: "Senior Clinical Pharmacist",
                quote: "Reliable, safe and effective. Evercare is a brand we can always count on.",
                avatar: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?auto=format&fit=crop&w=300&q=80"
              },
              {
                id: 3,
                name: "Anjali K.",
                role: "Healthcare Administrator",
                quote: "Excellent products and truly customer-focused service. Highly recommended!",
                avatar: "https://images.unsplash.com/photo-1594824813504-87be5d8e788c?auto=format&fit=crop&w=300&q=80"
              }
            ]).map((t, idx) => (
              <div
                key={t.id || idx}
                className="bg-slate-50/70 hover:bg-white rounded-3xl p-6 sm:p-7 border border-slate-100 hover:border-sky-200 transition-all duration-300 shadow-xs hover:shadow-lg flex flex-col justify-between group"
              >
                <div>
                  {/* Quote text */}
                  <p className="text-slate-700 text-sm sm:text-base leading-relaxed italic mb-6">
                    "{t.quote}"
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-200/60 flex items-center justify-between">
                  {/* Avatar and name */}
                  <div className="flex items-center space-x-3">
                    <img
                      src={t.avatar}
                      alt={t.name}
                      className="w-12 h-12 rounded-full object-cover border-2 border-white shadow-xs"
                    />
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                        — {t.name}
                      </h4>
                      <p className="text-xs text-slate-500">{t.role}</p>
                    </div>
                  </div>

                  {/* 5 Yellow Stars matching Nexora */}
                  <div className="flex items-center text-amber-400 space-x-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 stroke-amber-400" />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
}
