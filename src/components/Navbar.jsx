import React, { useState } from 'react';
import { Search, Menu, X, ShieldCheck, HeartPulse, ChevronRight } from 'lucide-react';

export default function Navbar({ onOpenSearch, onOpenBatchVerify, onOpenContact, onNavigate }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (sectionId) => {
    setMobileMenuOpen(false);
    if (onNavigate) {
      onNavigate(sectionId);
    } else {
      const el = document.getElementById(sectionId);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">

          {/* Brand Logo - Inspired by Nexora with medical cross badge */}
          <div
            className="flex items-center space-x-3 cursor-pointer group"
            onClick={() => handleNavClick('hero')}
          >
            <div className="relative w-11 h-11 bg-gradient-to-tr from-sky-600 via-sky-500 to-teal-400 rounded-xl p-0.5 shadow-md shadow-sky-500/20 flex items-center justify-center transform group-hover:scale-105 transition-transform duration-200">
              <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center relative overflow-hidden">
                {/* Cross shape */}
                <div className="absolute w-3.5 h-6 bg-sky-600 rounded-xs"></div>
                <div className="absolute w-6 h-3.5 bg-sky-600 rounded-xs"></div>
                {/* Leaf swoosh */}
                <div className="absolute top-1 right-1 w-3.5 h-3.5 bg-emerald-500 rounded-full opacity-90"></div>
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-extrabold tracking-tight text-slate-900 leading-none">
                Ever<span className="text-sky-600">care</span>
              </span>
              <span className="text-[11px] font-medium tracking-wider text-slate-500 uppercase mt-0.5">
                Health for a Better Tomorrow
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('hero')}
              className="text-sm font-semibold text-sky-600 hover:text-sky-700 relative py-1 after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-sky-600"
            >
              Home
            </button>
            <button
              onClick={() => handleNavClick('about')}
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors py-1"
            >
              About Us
            </button>
            <button
              onClick={() => handleNavClick('products')}
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors py-1"
            >
              Products
            </button>
            <button
              onClick={() => handleNavClick('focus')}
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors py-1"
            >
              Our Focus
            </button>
            <button
              onClick={() => handleNavClick('careers')}
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors py-1"
            >
              Careers
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-sm font-medium text-slate-600 hover:text-sky-600 transition-colors py-1"
            >
              Contact
            </button>
          </nav>

          {/* Action icons & CTA */}
          <div className="hidden lg:flex items-center space-x-4">
            <button
              onClick={onOpenSearch}
              className="p-2.5 text-slate-600 hover:text-sky-600 hover:bg-slate-50 rounded-full transition-colors"
              title="Search medicines and products"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenBatchVerify}
              className="inline-flex items-center space-x-2 text-xs font-semibold px-3.5 py-2 bg-slate-100 hover:bg-sky-50 text-slate-700 hover:text-sky-700 rounded-lg transition-colors border border-slate-200 hover:border-sky-200"
            >
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Verify Batch</span>
            </button>

            <button
              onClick={onOpenContact}
              className="inline-flex items-center space-x-2 text-xs font-semibold px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white rounded-lg shadow-sm shadow-sky-600/30 transition-all hover:shadow"
            >
              <span>Get in Touch</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu & Search trigger */}
          <div className="flex md:hidden items-center space-x-2">
            <button
              onClick={onOpenSearch}
              className="p-2 text-slate-600 hover:text-sky-600"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-700 hover:text-sky-600"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-100 bg-white px-4 pt-3 pb-6 space-y-3 shadow-xl">
          <button
            onClick={() => handleNavClick('hero')}
            className="block w-full text-left py-2 font-medium text-slate-800 hover:text-sky-600"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick('about')}
            className="block w-full text-left py-2 font-medium text-slate-800 hover:text-sky-600"
          >
            About Us
          </button>
          <button
            onClick={() => handleNavClick('products')}
            className="block w-full text-left py-2 font-medium text-slate-800 hover:text-sky-600"
          >
            Products
          </button>
          <button
            onClick={() => handleNavClick('focus')}
            className="block w-full text-left py-2 font-medium text-slate-800 hover:text-sky-600"
          >
            Our Focus
          </button>
          <button
            onClick={() => handleNavClick('careers')}
            className="block w-full text-left py-2 font-medium text-slate-800 hover:text-sky-600"
          >
            Careers
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 font-medium text-slate-800 hover:text-sky-600"
          >
            Contact
          </button>

          <div className="pt-4 border-t border-slate-100 flex flex-col gap-2">
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenBatchVerify(); }}
              className="flex items-center justify-center space-x-2 w-full py-2.5 bg-slate-100 text-slate-700 font-semibold rounded-lg text-sm"
            >
              <ShieldCheck className="w-4 h-4 text-sky-600" />
              <span>Verify Medicine Batch</span>
            </button>
            <button
              onClick={() => { setMobileMenuOpen(false); onOpenContact(); }}
              className="w-full py-2.5 bg-sky-600 text-white font-semibold rounded-lg text-sm"
            >
              Get in Touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
