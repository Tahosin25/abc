import React, { useState, useEffect } from 'react';
import { Search, Filter, ShieldCheck, FileText, ExternalLink, Pill, Eye } from 'lucide-react';

const categories = [
  { label: 'All Products', value: 'all' },
  { label: 'Tablets & Capsules', value: 'tablets-capsules' },
  { label: 'Syrups & Suspensions', value: 'syrups-suspensions' },
  { label: 'Injectables', value: 'injectables' },
  { label: 'Ointments & Creams', value: 'ointments-creams' }
];

export default function ProductCatalog({
  selectedCategory,
  onSelectCategory,
  onOpenProductModal,
  onOpenBatchVerifyWithCode
}) {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, [selectedCategory, searchTerm]);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      if (searchTerm) {
        params.append('search', searchTerm);
      }

      const res = await fetch(`/api/products?${params.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch products');
      const data = await res.json();
      setProducts(data.products || []);
      setError(null);
    } catch (err) {
      console.error(err);
      setError('Could not load products. Please ensure the backend is running.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="products" className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="text-xs font-bold tracking-widest text-sky-600 uppercase">
            Clinical Catalog
          </span>
          <h2 className="text-3xl font-extrabold text-slate-900 mt-2">
            Pharmaceutical Formulations &amp; Dosage Forms
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            Explore our GMP-certified therapeutic arsenal formulated with bioequivalence and safety at the core.
          </p>
        </div>

        {/* Filter bar and Search Input */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/80 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">

          {/* Category Tabs */}
          <div className="flex flex-wrap gap-1.5 w-full md:w-auto">
            {categories.map((c) => {
              const active = (selectedCategory || 'all') === c.value;
              return (
                <button
                  key={c.value}
                  onClick={() => onSelectCategory(c.value)}
                  className={`text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-xl transition-all ${
                    active
                      ? 'bg-sky-600 text-white shadow-sm shadow-sky-600/30'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

          {/* Search box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by drug, salt, indication..."
              className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-sky-500/20 focus:border-sky-500 transition-all"
            />
          </div>

        </div>

        {/* Error message */}
        {error && (
          <div className="p-4 bg-red-50 text-red-700 rounded-xl mb-6 text-sm">
            {error}
          </div>
        )}

        {/* Product Cards Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="h-72 bg-slate-200 rounded-2xl" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <Pill className="w-12 h-12 text-slate-300 mx-auto mb-3" />
            <h4 className="text-base font-bold text-slate-700">No matching pharmaceutical formulations found</h4>
            <p className="text-sm text-slate-500 mt-1">Try clearing your search query or selecting another category.</p>
            <button
              onClick={() => { onSelectCategory('all'); setSearchTerm(''); }}
              className="mt-4 px-4 py-2 bg-sky-600 text-white rounded-lg text-xs font-semibold"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              // category badge styling
              let badgeColor = 'bg-blue-50 text-blue-700 border-blue-200';
              if (product.categorySlug === 'syrups-suspensions') badgeColor = 'bg-emerald-50 text-emerald-700 border-emerald-200';
              if (product.categorySlug === 'injectables') badgeColor = 'bg-purple-50 text-purple-700 border-purple-200';
              if (product.categorySlug === 'ointments-creams') badgeColor = 'bg-rose-50 text-rose-700 border-rose-200';

              return (
                <div
                  key={product.id}
                  className="bg-white rounded-2xl border border-slate-200/90 hover:border-sky-300 p-6 flex flex-col justify-between shadow-xs hover:shadow-lg transition-all duration-300 group"
                >
                  <div>
                    {/* Top row: Category & Rx requirement */}
                    <div className="flex items-center justify-between mb-3">
                      <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full border ${badgeColor}`}>
                        {product.category}
                      </span>
                      {product.prescriptionRequired ? (
                        <span className="text-[11px] font-extrabold px-2 py-0.5 rounded bg-amber-50 text-amber-700 border border-amber-200 tracking-wider">
                          Rx ONLY
                        </span>
                      ) : (
                        <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-200">
                          OTC
                        </span>
                      )}
                    </div>

                    {/* Product Name & Generic */}
                    <h3 className="text-xl font-bold text-slate-900 group-hover:text-sky-600 transition-colors">
                      {product.name}
                    </h3>
                    <p className="text-xs font-medium text-slate-500 mt-1 italic">
                      {product.genericName}
                    </p>

                    {/* Therapeutic Area & Strength */}
                    <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Therapy:</span>
                        <span className="font-semibold text-slate-700">{product.therapeuticArea}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Strength:</span>
                        <span className="font-semibold text-slate-700">{product.strength}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-500 font-medium">Packaging:</span>
                        <span className="text-slate-600">{product.packSize}</span>
                      </div>
                    </div>

                    {/* Brief indication description */}
                    <p className="mt-3 text-xs text-slate-600 line-clamp-2 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <strong className="text-slate-800">Indications:</strong> {product.indications}
                    </p>
                  </div>

                  {/* Actions footer */}
                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                    <button
                      onClick={() => onOpenProductModal(product)}
                      className="flex-1 inline-flex items-center justify-center space-x-1.5 py-2 px-3 bg-sky-50 hover:bg-sky-600 text-sky-700 hover:text-white rounded-xl text-xs font-semibold transition-all cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>View Dossier</span>
                    </button>

                    {product.batchExample && (
                      <button
                        onClick={() => onOpenBatchVerifyWithCode(product.batchExample)}
                        className="inline-flex items-center space-x-1 py-2 px-3 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-medium transition-colors"
                        title={`Verify Batch ${product.batchExample}`}
                      >
                        <ShieldCheck className="w-3.5 h-3.5 text-sky-600" />
                        <span className="hidden sm:inline">Verify Batch</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
