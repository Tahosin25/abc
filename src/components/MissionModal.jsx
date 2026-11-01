import React from 'react';
import { X, Award, CheckCircle2, Shield, HeartPulse, Building2, FlaskConical } from 'lucide-react';

export default function MissionModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8">

        {/* Header */}
        <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-sky-600 text-white flex items-center justify-center">
              <HeartPulse className="w-6 h-6" />
            </div>
            <div>
              <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Corporate Philosophy</span>
              <h3 className="text-2xl font-extrabold text-slate-900">Our Mission &amp; Vision</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 text-sm text-slate-600 leading-relaxed max-h-[70vh] overflow-y-auto">
          <div>
            <h4 className="text-base font-bold text-slate-900 mb-2">Our Core Mission</h4>
            <p>
              At Evercare Pharmaceuticals, our mission is to eliminate healthcare disparities worldwide by delivering therapeutic formulations of uncompromising quality, peer-reviewed bioequivalence, and profound human value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-4 bg-sky-50/70 border border-sky-100 rounded-2xl">
              <FlaskConical className="w-6 h-6 text-sky-600 mb-2" />
              <h5 className="font-bold text-slate-900 text-sm mb-1">R&amp;D Innovation</h5>
              <p className="text-xs text-slate-600">
                Investing over 14% of annual turnover into novel drug delivery technologies and extended stability profiles.
              </p>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-100 rounded-2xl">
              <Shield className="w-6 h-6 text-emerald-600 mb-2" />
              <h5 className="font-bold text-slate-900 text-sm mb-1">Quality Assurance</h5>
              <p className="text-xs text-slate-600">
                WHO-GMP, ISO 9001:2015, and cGMP certified facilities with full automated end-to-end serialization.
              </p>
            </div>
          </div>

          <div>
            <h4 className="text-base font-bold text-slate-900 mb-3">Our Guiding Pillars</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Affordable Access:</strong> Fair pricing models enabling vital antibiotics, oncology injectables, and pediatric suspensions in developing markets.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Ethical Governance:</strong> Absolute adherence to pharmacovigilance standards and transparent clinical reporting.</span>
              </li>
              <li className="flex items-start space-x-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span><strong>Eco-Conscious Packaging:</strong> Transitioning toward 100% recyclable blisters and solar-powered cold chain hubs.</span>
              </li>
            </ul>
          </div>

          <div className="pt-2">
            <button
              onClick={onClose}
              className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs transition-colors"
            >
              Close Philosophy Overview
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
