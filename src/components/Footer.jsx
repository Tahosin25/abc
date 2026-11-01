import React, { useState } from 'react';
import { ArrowRight, CheckCircle2, Linkedin, Facebook, Twitter, Youtube } from 'lucide-react';

export default function Footer({ onNavigate, onOpenBatchVerify }) {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubscribe = async (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;

    setLoading(true);
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      if (res.ok) {
        setSubscribed(true);
        setEmail('');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#0f172a] text-slate-400 pt-16 pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-slate-800/80">

          {/* Brand Info (col 1-4) */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-sky-600 rounded-xl flex items-center justify-center p-1 shadow-md shadow-sky-600/30">
                <div className="w-full h-full bg-slate-900 rounded-lg flex items-center justify-center relative">
                  <div className="w-3 h-5 bg-sky-500 rounded-xs"></div>
                  <div className="w-5 h-3 bg-sky-500 rounded-xs absolute"></div>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-2xl font-extrabold text-white tracking-tight leading-none">
                  Ever<span className="text-sky-500">care</span>
                </span>
                <span className="text-[11px] font-medium tracking-wider text-slate-400 uppercase mt-0.5">
                  Health for a Better Tomorrow
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Evercare Pharmaceuticals is dedicated to developing safe, effective and affordable medicines through state-of-the-art sterile manufacturing and certified quality systems.
            </p>

            <div className="pt-2 text-xs text-slate-500">
              WHO-GMP • ISO 9001:2015 • US-FDA Compliant Ready
            </div>
          </div>

          {/* Quick Links (col 5-6) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('hero')} className="hover:text-white transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  About Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('products')} className="hover:text-white transition-colors">
                  Products
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('focus')} className="hover:text-white transition-colors">
                  Our Focus
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('contact')} className="hover:text-white transition-colors">
                  Contact
                </button>
              </li>
            </ul>
          </div>

          {/* More Information (col 7-8) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              More Information
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Quality &amp; Safety
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('about')} className="hover:text-white transition-colors">
                  Manufacturing
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('careers')} className="hover:text-white transition-colors">
                  Careers
                </button>
              </li>
              <li>
                <button onClick={onOpenBatchVerify} className="hover:text-sky-400 transition-colors font-medium">
                  Verify Batch Code
                </button>
              </li>
              <li>
                <span className="text-slate-500 cursor-default">FAQs &amp; Guidance</span>
              </li>
            </ul>
          </div>

          {/* Stay Connected & Newsletter (col 9-12) */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Stay Connected
            </h4>
            <p className="text-xs sm:text-sm text-slate-400">
              Get the latest updates on our products, health tips and innovations.
            </p>

            {subscribed ? (
              <div className="flex items-center space-x-2 text-emerald-400 text-xs bg-emerald-950/40 p-3 rounded-full border border-emerald-800">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Thank you! You are subscribed to Evercare clinical bulletins.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="relative max-w-md">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full pl-4 pr-12 py-3 rounded-full bg-slate-800 text-white placeholder-slate-400 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 border border-slate-700"
                />
                <button
                  type="submit"
                  disabled={loading}
                  aria-label="Subscribe to newsletter"
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-sky-600 hover:bg-sky-500 text-white flex items-center justify-center transition-all cursor-pointer disabled:opacity-50"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {/* Social Icons matching Nexora bottom right */}
            <div className="flex items-center space-x-3 pt-2">
              <a href="#linkedin" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4" />
              </a>
              <a href="#facebook" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="#twitter" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4" />
              </a>
              <a href="#youtube" className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-sky-600 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
                <Youtube className="w-4 h-4" />
              </a>
            </div>

          </div>

        </div>

        {/* Bottom copyright and legal disclaimer */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} Evercare Pharmaceuticals. All rights reserved.</p>
          <div className="flex items-center space-x-6">
            <a href="#privacy" className="hover:text-slate-400 transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#terms" className="hover:text-slate-400 transition-colors">Terms &amp; Conditions</a>
            <span>|</span>
            <a href="#regulatory" className="hover:text-slate-400 transition-colors">Regulatory Compliance</a>
          </div>
        </div>

      </div>
    </footer>
  );
}
