import React, { useState } from 'react';
import { ShieldCheck, Search, CheckCircle2, AlertCircle, FileCheck, Building2, Calendar, UserCheck } from 'lucide-react';

export default function BatchVerificationSection() {
  const [batchId, setBatchId] = useState('EVR-TAB-2025');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    if (!batchId.trim()) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const res = await fetch(`/api/verify-batch/${encodeURIComponent(batchId.trim())}`);
      const data = await res.json();

      if (!res.ok || !data.verified) {
        setError(data.message || 'Batch not found. Please verify the code on your blister packaging.');
      } else {
        setResult(data.batch);
      }
    } catch (err) {
      console.error(err);
      setError('Failed to reach the batch verification registry. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="verify-batch" className="py-20 bg-slate-900 text-white relative overflow-hidden">
      {/* Background glow effects */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center space-x-2 bg-sky-500/20 text-sky-300 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-3 border border-sky-400/30">
            <ShieldCheck className="w-4 h-4 text-sky-400" />
            <span>Anti-Counterfeiting &amp; Quality Track</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Verify Medicine Batch Authenticity
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Every Evercare pharmaceutical unit carries a serialized batch identifier. Enter your batch code to inspect the certified analysis and manufacturing dossier.
          </p>
        </div>

        {/* Verification Form Card */}
        <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700 rounded-3xl p-6 sm:p-8 shadow-2xl">
          <form onSubmit={handleVerify} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="w-5 h-5 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={batchId}
                onChange={(e) => setBatchId(e.target.value)}
                placeholder="e.g. EVR-TAB-2025, EVR-SYR-884, EVR-INJ-9921"
                className="w-full pl-12 pr-4 py-3.5 bg-slate-900 border border-slate-700 rounded-2xl text-white placeholder-slate-500 text-sm focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent uppercase tracking-wider font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3.5 bg-sky-500 hover:bg-sky-400 active:bg-sky-600 text-slate-950 font-bold rounded-2xl text-sm transition-all shadow-lg shadow-sky-500/25 flex items-center justify-center space-x-2 shrink-0 cursor-pointer disabled:opacity-50"
            >
              {loading ? (
                <span>Querying Ledger...</span>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5" />
                  <span>Verify Batch</span>
                </>
              )}
            </button>
          </form>

          {/* Quick presets */}
          <div className="mt-4 flex flex-wrap items-center gap-2 text-xs text-slate-400">
            <span>Try sample batch codes:</span>
            {['EVR-TAB-2025', 'EVR-SYR-884', 'EVR-INJ-9921', 'EVR-OIN-3304'].map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => { setBatchId(code); }}
                className="px-2.5 py-1 bg-slate-700/60 hover:bg-slate-700 text-sky-300 rounded-lg font-mono border border-slate-600 transition-colors cursor-pointer"
              >
                {code}
              </button>
            ))}
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-6 p-4 bg-rose-500/10 border border-rose-500/30 rounded-2xl text-rose-300 flex items-start space-x-3 text-sm">
              <AlertCircle className="w-5 h-5 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <strong className="block font-semibold">Verification Alert</strong>
                {error}
              </div>
            </div>
          )}

          {/* Success Result Dossier */}
          {result && (
            <div className="mt-6 pt-6 border-t border-slate-700 animate-fadeIn">
              <div className="flex items-center space-x-3 text-emerald-400 mb-4 bg-emerald-500/10 border border-emerald-500/20 px-4 py-2.5 rounded-xl">
                <CheckCircle2 className="w-5 h-5 shrink-0" />
                <span className="font-bold text-sm tracking-wide">
                  100% GENUINE &amp; RELEASED BY EVERCARE QUALITY CONTROL
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs sm:text-sm">
                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-2">
                  <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Product Formulation</div>
                  <div className="font-bold text-white text-base">{result.productName}</div>
                  <div className="text-slate-300 font-mono text-xs">Batch Ref: {result.batchNumber}</div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-2">
                  <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Certificate of Analysis</div>
                  <div className="font-mono text-sky-400 font-bold">{result.certificateId}</div>
                  <div className="text-emerald-400 font-medium">{result.qualityCheck}</div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 flex items-start space-x-3">
                  <Building2 className="w-5 h-5 text-slate-400 shrink-0 mt-1" />
                  <div>
                    <div className="text-slate-400 text-xs uppercase tracking-wider font-semibold">Facility</div>
                    <div className="text-slate-200 mt-1">{result.manufacturingUnit}</div>
                  </div>
                </div>

                <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700/60 space-y-2">
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Manufacturing Date:</span>
                    <strong className="text-white font-mono">{result.manufacturingDate}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300">
                    <span>Expiry Date:</span>
                    <strong className="text-white font-mono">{result.expiryDate}</strong>
                  </div>
                  <div className="flex justify-between items-center text-slate-300 pt-1 border-t border-slate-800">
                    <span>QA Approver:</span>
                    <span className="text-sky-300 font-medium">{result.releasedBy}</span>
                  </div>
                </div>
              </div>

            </div>
          )}

        </div>

      </div>
    </section>
  );
}
