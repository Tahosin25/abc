import React, { useState, useEffect } from 'react';
import { X, Briefcase, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export default function CareersModal({ isOpen, onClose }) {
  const [careers, setCareers] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [appForm, setAppForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    coverNote: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isOpen) {
      fetch('/api/careers')
        .then((res) => res.json())
        .then((data) => setCareers(data))
        .catch((err) => console.error(err));
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleApply = async (e) => {
    e.preventDefault();
    if (!selectedJob) return;

    setSubmitting(true);
    setError(null);
    try {
      const res = await fetch('/api/careers/apply', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          jobId: selectedJob.id,
          ...appForm
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit application');
      setSubmitted(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8">

        <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100">
          <div>
            <span className="text-xs font-bold text-sky-600 uppercase tracking-wider">Careers at Evercare</span>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Shape the Future of Medicine</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {submitted ? (
            <div className="text-center py-10 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
              <h4 className="text-xl font-bold text-slate-900">Application Received!</h4>
              <p className="text-sm text-slate-600 max-w-md mx-auto">
                Thank you for applying to join the Evercare scientific &amp; clinical operations team. We will review your profile within 5 business days.
              </p>
              <button
                onClick={() => { setSubmitted(false); setSelectedJob(null); }}
                className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
              >
                View Other Openings
              </button>
            </div>
          ) : selectedJob ? (
            <form onSubmit={handleApply} className="space-y-4">
              <div className="bg-sky-50 p-4 rounded-2xl border border-sky-100">
                <span className="text-xs text-sky-700 font-bold uppercase">{selectedJob.department}</span>
                <h4 className="text-lg font-bold text-slate-900 mt-0.5">{selectedJob.title}</h4>
                <div className="flex items-center space-x-4 text-xs text-slate-600 mt-2">
                  <span className="flex items-center space-x-1"><MapPin className="w-3.5 h-3.5 text-slate-400" /> <span>{selectedJob.location}</span></span>
                  <span className="flex items-center space-x-1"><Clock className="w-3.5 h-3.5 text-slate-400" /> <span>{selectedJob.type}</span></span>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  required
                  value={appForm.fullName}
                  onChange={(e) => setAppForm({ ...appForm, fullName: e.target.value })}
                  placeholder="Dr. Alan Turing"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Email *</label>
                  <input
                    type="email"
                    required
                    value={appForm.email}
                    onChange={(e) => setAppForm({ ...appForm, email: e.target.value })}
                    placeholder="alan@domain.com"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    value={appForm.phone}
                    onChange={(e) => setAppForm({ ...appForm, phone: e.target.value })}
                    placeholder="+1 555-0199"
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">Brief Cover Note / Qualifications</label>
                <textarea
                  rows={3}
                  value={appForm.coverNote}
                  onChange={(e) => setAppForm({ ...appForm, coverNote: e.target.value })}
                  placeholder="Outline relevant research experience, analytical skills, or pharmaceutical compliance..."
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>

              {error && (
                <div className="p-3 bg-rose-50 text-rose-600 rounded-xl text-xs font-semibold">{error}</div>
              )}

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setSelectedJob(null)}
                  className="px-4 py-2.5 border border-slate-200 text-slate-700 font-semibold rounded-xl text-xs"
                >
                  Back to Openings
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-2.5 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs flex items-center justify-center space-x-2 cursor-pointer"
                >
                  <Send className="w-4 h-4" />
                  <span>{submitting ? 'Transmitting...' : 'Submit Job Application'}</span>
                </button>
              </div>
            </form>
          ) : (
            <div className="space-y-4">
              <p className="text-xs text-slate-500">
                Join our 100+ team of international formulation scientists, quality specialists and clinical professionals.
              </p>

              {careers.map((job) => (
                <div
                  key={job.id}
                  className="p-5 rounded-2xl border border-slate-200 hover:border-sky-300 bg-white hover:bg-sky-50/20 transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-4 group"
                >
                  <div className="space-y-1">
                    <span className="text-[11px] font-bold text-sky-600 uppercase tracking-wider">{job.department}</span>
                    <h4 className="text-base font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {job.title}
                    </h4>
                    <p className="text-xs text-slate-500">{job.description}</p>
                    <div className="flex items-center space-x-3 text-xs text-slate-400 pt-1">
                      <span>{job.location}</span>
                      <span>•</span>
                      <span>{job.experience}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setSelectedJob(job)}
                    className="px-4 py-2 bg-sky-600 hover:bg-sky-700 text-white font-semibold rounded-xl text-xs shrink-0 self-start sm:self-center cursor-pointer shadow-xs"
                  >
                    Apply Now
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
