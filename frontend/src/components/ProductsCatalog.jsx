import React, { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Cpu, 
  ShieldCheck, 
  Zap, 
  Check, 
  Clock, 
  Weight, 
  Maximize2,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { fetchBatteries } from '../services/api';

export default function ProductsCatalog({ onTriggerHaptic, onSelectProduct }) {
  const [batteries, setBatteries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ['All', 'Solar Storage', 'Electric Vehicles', 'Inverter & UPS', 'Industrial & Telecom'];

  const loadData = async () => {
    setLoading(true);
    try {
      const res = await fetchBatteries(category === 'All' ? '' : category, search);
      setBatteries(res.data);
    } catch (err) {
      console.error('Failed to load batteries:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [category]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (onTriggerHaptic) onTriggerHaptic();
    loadData();
  };

  const handleCategorySelect = (cat) => {
    if (onTriggerHaptic) onTriggerHaptic();
    setCategory(cat);
  };

  const openDetails = (battery) => {
    if (onTriggerHaptic) onTriggerHaptic();
    setSelectedProduct(battery);
  };

  return (
    <div className="space-y-6">
      {/* Search & Filter Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white flex items-center space-x-2">
              <Cpu className="w-5 h-5 text-terron-400" />
              <span>Terron Engineered Battery Range</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              High-performance lithium & deep-cycle power solutions for homes, vehicles, and enterprise
            </p>
          </div>

          {/* Search bar */}
          <form onSubmit={handleSearchSubmit} className="relative max-w-md w-full">
            <input
              type="text"
              placeholder="Search by model, chemistry, or use-case..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 pl-10 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-terron-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5 pointer-events-none" />
          </form>
        </div>

        {/* Category Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pt-4 mt-3 border-t border-slate-800/80 pb-1 scrollbar-none">
          <span className="text-xs font-semibold text-slate-400 flex items-center space-x-1 pl-1 pr-2 shrink-0">
            <Filter className="w-3.5 h-3.5" />
            <span>Category:</span>
          </span>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategorySelect(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-all shrink-0 ${
                category === cat
                  ? 'bg-terron-500 text-slate-950 font-semibold shadow-md shadow-terron-500/20'
                  : 'bg-slate-950/80 text-slate-300 border border-slate-800 hover:border-slate-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Battery Cards Grid */}
      {loading ? (
        <div className="text-center py-12 text-slate-400">Loading battery models...</div>
      ) : batteries.length === 0 ? (
        <div className="text-center py-12 bg-slate-900 border border-slate-800 rounded-2xl">
          <p className="text-slate-300 font-medium">No batteries found matching your criteria</p>
          <button
            onClick={() => { setCategory('All'); setSearch(''); }}
            className="mt-3 text-xs text-terron-400 underline font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {batteries.map((b) => (
            <div
              key={b.id}
              className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 hover:border-slate-700 transition-all shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Header tags */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-terron-400 bg-terron-500/10 border border-terron-500/20 px-2.5 py-1 rounded-md">
                    {b.category}
                  </span>
                  <span className="text-xs font-semibold text-amber-300 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded-md flex items-center space-x-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    <span>{b.warrantyYears} Yrs Warranty</span>
                  </span>
                </div>

                <h3 className="text-xl font-bold text-white group-hover:text-terron-300 transition-colors">
                  {b.name}
                </h3>
                <p className="text-xs text-slate-400 mt-1 line-clamp-2">
                  {b.description}
                </p>

                {/* Key Spec Badges */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 my-4">
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Voltage</span>
                    <span className="text-sm font-bold text-white">{b.nominalVoltage}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Capacity</span>
                    <span className="text-sm font-bold text-white">{b.capacity}</span>
                  </div>
                  <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800/80 col-span-2 sm:col-span-1">
                    <span className="text-[10px] text-slate-400 uppercase font-semibold block">Chemistry</span>
                    <span className="text-xs font-bold text-emerald-400 truncate block">{b.chemistry.split(' ')[0]}</span>
                  </div>
                </div>

                {/* Technical highlights bullet points */}
                <ul className="text-xs text-slate-400 space-y-1.5 my-3">
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-terron-400 shrink-0" />
                    <span>Cycle Life: <strong className="text-slate-200">{b.cycleLife}</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-terron-400 shrink-0" />
                    <span>Efficiency: <strong className="text-slate-200">{b.specs.efficiency}</strong></span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <Check className="w-3.5 h-3.5 text-terron-400 shrink-0" />
                    <span>Operating Range: <strong className="text-slate-200">{b.specs.operatingTemp}</strong></span>
                  </li>
                </ul>
              </div>

              {/* Footer Price & Action */}
              <div className="pt-4 mt-2 border-t border-slate-800/80 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 block uppercase font-medium">MSRP Price</span>
                  <span className="text-xl font-black text-white">${b.price}</span>
                </div>
                <button
                  onClick={() => openDetails(b)}
                  className="flex items-center space-x-1.5 px-4 py-2 bg-slate-800 hover:bg-terron-600 hover:text-white text-slate-200 text-xs font-semibold rounded-xl transition-all shadow-sm"
                >
                  <span>Full Datasheet</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Datasheet Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fadeIn">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg bg-slate-800/50"
            >
              ✕
            </button>

            <span className="text-xs font-bold text-terron-400 uppercase tracking-wider block mb-1">
              {selectedProduct.category}
            </span>
            <h3 className="text-2xl font-bold text-white mb-2">{selectedProduct.name}</h3>
            <p className="text-xs text-slate-300 mb-4">{selectedProduct.description}</p>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-bold text-white text-sm mb-3 border-b border-slate-800 pb-2">Technical Specifications</h4>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Model ID:</span>
                <span className="font-mono text-terron-300 font-bold">{selectedProduct.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Chemistry:</span>
                <span className="text-slate-200 font-medium">{selectedProduct.chemistry}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Nominal Voltage:</span>
                <span className="text-slate-200 font-medium">{selectedProduct.nominalVoltage}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Rated Capacity:</span>
                <span className="text-slate-200 font-medium">{selectedProduct.capacity}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Max Continuous Discharge:</span>
                <span className="text-slate-200 font-medium">{selectedProduct.specs.maxDischargeCurrent}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Max Charge Current:</span>
                <span className="text-slate-200 font-medium">{selectedProduct.specs.maxChargeCurrent}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Cycle Life:</span>
                <span className="text-slate-200 font-medium">{selectedProduct.cycleLife}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Round-trip Efficiency:</span>
                <span className="text-emerald-400 font-semibold">{selectedProduct.specs.efficiency}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-slate-900">
                <span className="text-slate-400">Weight & Dimensions:</span>
                <span className="text-slate-200 font-medium">{selectedProduct.specs.weight} | {selectedProduct.specs.dimensions}</span>
              </div>
              <div className="flex justify-between py-1">
                <span className="text-slate-400">Warranty Coverage:</span>
                <span className="text-amber-300 font-bold">{selectedProduct.warrantyYears} Years Limited Warranty</span>
              </div>
            </div>

            <button
              onClick={() => setSelectedProduct(null)}
              className="mt-6 w-full py-2.5 bg-terron-500 hover:bg-terron-600 text-slate-950 font-bold rounded-xl text-sm transition-all shadow-md shadow-terron-500/20"
            >
              Close Datasheet
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

