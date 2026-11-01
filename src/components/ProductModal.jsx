import React, { useState } from 'react';
import { X, ShieldCheck, Pill, Thermometer, AlertTriangle, Send, CheckCircle2 } from 'lucide-react';

export default function ProductModal({ product, onClose, onVerifyBatch }) {
  const [tab, setTab] = useState('dossier'); // 'dossier' or 'request'
  const [sampleForm, setSampleForm] = useState({
    organization: '',
    contactPerson: '',
    email: '',
    phone: '',
    licenseNumber: '',
    notes: ''
  });
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(null);
  const [formError, setFormError] = useState(null);

  if (!product) return null;

  const handleSampleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormError(null);
    try {
      const res = await fetch('/api/sample-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productId: product.id,
          ...sampleForm
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to submit request');
      setSuccessMsg(data.message || 'Sample request submitted successfully.');
    } catch (err) {
      setFormError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-white rounded-3xl max-w-2xl w-full shadow-2xl border border-slate-100 overflow-hidden my-8">

        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 bg-slate-50 border-b border-slate-100">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-sky-100 text-sky-800">
                {product.category}
              </span>
              {product.prescriptionRequired && (
                <span className="text-xs font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  Rx Required
                </span>
              )}
            </div>
            <h3 className="text-2xl font-extrabold text-slate-900 mt-1">
              {product.name}
            </h3>
            <p className="text-xs font-medium text-slate-500 italic">
              {product.genericName}
            </p>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-full hover:bg-slate-200 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Tabs */}
        <div className="flex border-b border-slate-200 px-6 bg-white">
          <button
            onClick={() => setTab('dossier')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 mr-6 transition-all ${
              tab === 'dossier'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Pharmaceutical Dossier
          </button>
          <button
            onClick={() => setTab('request')}
            className={`py-3 text-xs sm:text-sm font-bold border-b-2 transition-all ${
              tab === 'request'
                ? 'border-sky-600 text-sky-600'
                : 'border-transparent text-slate-500 hover:text-slate-800'
            }`}
          >
            Request Institutional Sample / Quote
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[70vh] overflow-y-auto">
          {tab === 'dossier' ? (
            <div className="space-y-5 text-sm">
              <div className="bg-sky-50/50 p-4 rounded-2xl border border-sky-100">
                <h4 className="font-bold text-sky-900 text-xs uppercase tracking-wider mb-1">
                  Active Formulation &amp; Composition
                </h4>
                <p className="text-slate-700">{product.composition}</p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Dosage Form</span>
                  <span className="font-bold text-slate-800">{product.dosageForm}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Therapeutic Area</span>
                  <span className="font-bold text-slate-800">{product.therapeuticArea}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Strength</span>
                  <span className="font-bold text-slate-800">{product.strength}</span>
                </div>
                <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  <span className="text-xs text-slate-500 block font-medium">Packaging</span>
                  <span className="font-bold text-slate-800">{product.packSize}</span>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Clinical Indications
                </h4>
                <p className="text-slate-600 leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                  {product.indications}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                  Contraindications &amp; Precautions
                </h4>
                <p className="text-amber-800 bg-amber-50/70 p-3.5 rounded-xl border border-amber-200 leading-relaxed text-xs">
                  {product.contraindications}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-500 bg-slate-50 p-3 rounded-xl border border-slate-100">
                <Thermometer className="w-4 h-4 text-sky-600 shrink-0" />
                <span><strong>Storage:</strong> {product.storage}</span>
              </div>

              {product.batchExample && (
                <div className="pt-2">
                  <button
                    onClick={() => {
                      onClose();
                      onVerifyBatch(product.batchExample);
                    }}
                    className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold flex items-center justify-center space-x-2 text-xs transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-4 h-4 text-sky-400" />
                    <span>Verify Live Batch Audit ({product.batchExample})</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div>
              {successMsg ? (
                <div className="text-center py-8 space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-500 mx-auto" />
                  <h4 className="text-lg font-bold text-slate-900">Request Dispatched</h4>
                  <p className="text-sm text-slate-600 max-w-md mx-auto">{successMsg}</p>
                  <button
                    onClick={() => setSuccessMsg(null)}
                    className="mt-3 px-5 py-2 bg-sky-600 text-white rounded-xl text-xs font-semibold"
                  >
                    Submit Another Request
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSampleSubmit} className="space-y-3.5 text-xs sm:text-sm">
                  <div className="p-3 bg-sky-50 text-sky-800 rounded-xl text-xs leading-relaxed">
                    Evercare supplies clinical evaluation samples exclusively to registered medical practitioners, hospitals, and licensed pharmacies.
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Hospital / Institution Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={sampleForm.organization}
                      onChange={(e) => setSampleForm({ ...sampleForm, organization: e.target.value })}
                      placeholder="St. Jude General Hospital"
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Doctor / Contact Name *
                      </label>
                      <input
                        type="text"
                        required
                        value={sampleForm.contactPerson}
                        onChange={(e) => setSampleForm({ ...sampleForm, contactPerson: e.target.value })}
                        placeholder="Dr. Emily Thorne"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Medical License / Reg No.
                      </label>
                      <input
                        type="text"
                        value={sampleForm.licenseNumber}
                        onChange={(e) => setSampleForm({ ...sampleForm, licenseNumber: e.target.value })}
                        placeholder="GMC-746281"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Official Email *
                      </label>
                      <input
                        type="email"
                        required
                        value={sampleForm.email}
                        onChange={(e) => setSampleForm({ ...sampleForm, email: e.target.value })}
                        placeholder="doctor@hospital.org"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                        Direct Phone
                      </label>
                      <input
                        type="tel"
                        value={sampleForm.phone}
                        onChange={(e) => setSampleForm({ ...sampleForm, phone: e.target.value })}
                        placeholder="+1 555-8822"
                        className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 uppercase mb-1">
                      Clinical Needs / Estimated Volume
                    </label>
                    <textarea
                      rows={2}
                      value={sampleForm.notes}
                      onChange={(e) => setSampleForm({ ...sampleForm, notes: e.target.value })}
                      placeholder="e.g. 50 ampoules trial pack for emergency surgical unit."
                      className="w-full px-3.5 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  {formError && (
                    <div className="p-2.5 bg-rose-50 text-rose-600 rounded-lg text-xs font-semibold">
                      {formError}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full py-3 bg-sky-600 hover:bg-sky-700 text-white font-bold rounded-xl text-xs sm:text-sm flex items-center justify-center space-x-2 transition-all cursor-pointer"
                  >
                    <Send className="w-4 h-4" />
                    <span>{submitting ? 'Submitting Request...' : 'Dispatch Sample Request'}</span>
                  </button>
                </form>
              )}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
