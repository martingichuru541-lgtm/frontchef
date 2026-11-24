import React, { useState } from 'react';
import {
  Briefcase,
  FileSpreadsheet,
  Users,
  ShieldCheck,
  AlertTriangle,
  Scale,
  CheckSquare,
  Square,
  Thermometer,
  Clock,
  Printer,
  ChevronRight,
  TrendingDown,
  Sparkles,
} from 'lucide-react';

export const ProfessionalKitchenView: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'standardized' | 'banquet' | 'hygiene' | 'waste'>('standardized');
  const [banquetGuests, setBanquetGuests] = useState<number>(120);

  // Hygiene Checklist
  const [hygieneItems, setHygieneItems] = useState([
    { id: 'h1', task: 'Walk-in refrigerator digital probe verification (1°C to 3.8°C)', checked: true, ccp: 'CCP 1' },
    { id: 'h2', task: 'Hot holding buffet well thermal check (>63°C)', checked: true, ccp: 'CCP 2' },
    { id: 'h3', task: 'Red cutting board restricted to raw meat/goat butchery', checked: true, ccp: 'Sanitation' },
    { id: 'h4', task: 'Green cutting board sanitized for fresh sukuma & salad greens', checked: true, ccp: 'Sanitation' },
    { id: 'h5', task: 'Rice batch rapid cooling protocol: 60°C to 20°C in under 2 hours', checked: false, ccp: 'CCP 3' },
    { id: 'h6', task: 'Chlorine test strip verification for produce wash sink (50-100 ppm)', checked: true, ccp: 'Sanitation' },
  ]);

  const toggleHygiene = (id: string) => {
    setHygieneItems(prev =>
      prev.map(i => (i.id === id ? { ...i, checked: !i.checked } : i))
    );
  };

  // 120 Guests Banquet Calculations for Pilau & Nyama Choma
  const banquetMultiplier = banquetGuests / 4;
  const beefKg = (1.2 * banquetMultiplier).toFixed(1);
  const riceKg = (1.0 * banquetMultiplier).toFixed(1);
  const onionsKg = (0.8 * banquetMultiplier).toFixed(1);
  const oilLitres = (0.25 * banquetMultiplier).toFixed(1);
  const pilauMasalaGrams = Math.round(25 * banquetMultiplier);

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-stone-100">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-purple-400 font-bold uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Commercial Catering & Hospitality Operating Suite</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Professional Kitchen Workspace
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Industrial food service tools for Kenyan hotels, banquet halls, safari camps, and catering chamas. Standardized cards, bulk scaling for 100+ guests, and HACCP compliance logs.
          </p>
        </div>

        {/* Tab Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-950 border border-stone-800">
          <button
            onClick={() => setActiveTab('standardized')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'standardized' ? 'bg-purple-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Standard Recipe Card</span>
          </button>

          <button
            onClick={() => setActiveTab('banquet')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'banquet' ? 'bg-purple-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>100+ Bulk Banquet</span>
          </button>

          <button
            onClick={() => setActiveTab('hygiene')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'hygiene' ? 'bg-purple-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>HACCP Hygiene</span>
          </button>

          <button
            onClick={() => setActiveTab('waste')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 ${
              activeTab === 'waste' ? 'bg-purple-600 text-white shadow-sm' : 'text-stone-400 hover:text-white'
            }`}
          >
            <TrendingDown className="w-3.5 h-3.5" />
            <span>Yield & Waste</span>
          </button>
        </div>
      </div>

      {/* TAB 1: STANDARDIZED RECIPE CARD */}
      {activeTab === 'standardized' && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-white/10 pb-4 gap-4">
            <div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-purple-400 font-bold">
                COMMERCIAL STANDARDIZED RECIPE SPECIFICATION #K1-REC-01
              </span>
              <h3 className="text-2xl font-black text-white mt-1">
                Authentic Swahili Beef Pilau ya Sherehe
              </h3>
            </div>
            <button
              onClick={() => window.print()}
              className="px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold flex items-center gap-2 cursor-pointer w-fit"
            >
              <Printer className="w-4 h-4" />
              <span>Print Station Card</span>
            </button>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-mono">
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 text-[10px] uppercase block">Batch Yield</span>
              <span className="text-white font-bold text-sm">25 Portions (380g/plate)</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 text-[10px] uppercase block">Prep Time</span>
              <span className="text-white font-bold text-sm">30 Minutes</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 text-[10px] uppercase block">Cook Time</span>
              <span className="text-white font-bold text-sm">45 Minutes</span>
            </div>
            <div className="p-3.5 rounded-xl bg-stone-950 border border-stone-800">
              <span className="text-stone-400 text-[10px] uppercase block">Critical CCP</span>
              <span className="text-emerald-400 font-bold text-sm">Internal Temp ≥ 75°C</span>
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-amber-950/20 border border-amber-500/30 text-xs text-amber-300 space-y-1">
            <strong className="block font-mono uppercase tracking-wider text-amber-400">
              Allergen Disclosure & Separation:
            </strong>
            <p>Gluten-Free naturally. Contains beef marrow. Prepared on equipment that also processes wheat flours.</p>
          </div>
        </div>
      )}

      {/* TAB 2: 100+ BULK BANQUET SCALER */}
      {activeTab === 'banquet' && (
        <div className="space-y-6">
          <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-white">
                  Event Banquet Scaler: Swahili Pilau Feast
                </h3>
                <p className="text-xs text-stone-400">
                  Calibrated for wedding receptions, corporate dinners, and large church assemblies.
                </p>
              </div>

              <div className="flex items-center gap-2">
                {[50, 100, 120, 200, 300].map(cnt => (
                  <button
                    key={cnt}
                    onClick={() => setBanquetGuests(cnt)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition cursor-pointer ${
                      banquetGuests === cnt
                        ? 'bg-purple-600 text-white shadow-sm'
                        : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                    }`}
                  >
                    {cnt} Guests
                  </button>
                ))}
              </div>
            </div>

            {/* Requisition Table */}
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400">Beef Chuck</span>
                <div className="text-2xl font-black text-purple-300 font-mono">{beefKg} kg</div>
                <span className="text-[10px] text-stone-500">Bone-in lean stewing</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400">Pishori Rice</span>
                <div className="text-2xl font-black text-emerald-400 font-mono">{riceKg} kg</div>
                <span className="text-[10px] text-stone-500">Mwea long grain</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400">Red Onions</span>
                <div className="text-2xl font-black text-amber-300 font-mono">{onionsKg} kg</div>
                <span className="text-[10px] text-stone-500">Thinly sliced for browning</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400">Cooking Oil</span>
                <div className="text-2xl font-black text-white font-mono">{oilLitres} L</div>
                <span className="text-[10px] text-stone-500">Vegetable oil</span>
              </div>

              <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-400">Pilau Masala</span>
                <div className="text-2xl font-black text-teal-300 font-mono">{pilauMasalaGrams} g</div>
                <span className="text-[10px] text-stone-500">Whole toasted blend</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: HACCP HYGIENE CHECKLIST */}
      {activeTab === 'hygiene' && (
        <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 space-y-5">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <h3 className="font-bold text-lg text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                HACCP Daily Food Safety & Kitchen Hygiene Log
              </h3>
              <p className="text-xs text-stone-400">
                Complies with Kenya Public Health Act (Cap 242) and international hospitality auditing.
              </p>
            </div>
            <span className="text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/30">
              {hygieneItems.filter(i => i.checked).length} / {hygieneItems.length} Verified Today
            </span>
          </div>

          <div className="space-y-3">
            {hygieneItems.map(item => (
              <div
                key={item.id}
                onClick={() => toggleHygiene(item.id)}
                className={`p-3.5 rounded-2xl border flex items-center justify-between cursor-pointer transition ${
                  item.checked
                    ? 'bg-emerald-950/20 border-emerald-500/40 text-stone-200'
                    : 'bg-stone-950 border-stone-800 text-stone-400 hover:border-white/20'
                }`}
              >
                <div className="flex items-center space-x-3">
                  {item.checked ? (
                    <CheckSquare className="w-5 h-5 text-emerald-400" />
                  ) : (
                    <Square className="w-5 h-5 text-stone-600" />
                  )}
                  <span className="text-xs sm:text-sm font-medium">{item.task}</span>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-900 text-stone-400 border border-stone-800">
                  {item.ccp}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: YIELD & WASTE TRACKING */}
      {activeTab === 'waste' && (
        <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 space-y-5">
          <h3 className="font-bold text-lg text-white flex items-center gap-2">
            <TrendingDown className="w-5 h-5 text-amber-400" />
            Kitchen Yield & Food Waste Loss Recovery
          </h3>
          <p className="text-xs text-stone-400">
            Monitor butcher trim loss and vegetable prep waste to safeguard restaurant margins.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-stone-400 text-[10px] uppercase">Sukuma Wiki Yield</span>
              <div className="text-2xl font-black text-emerald-400">82% Usable</div>
              <p className="text-[11px] text-stone-500 font-sans">18% stalk trimming loss</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-stone-400 text-[10px] uppercase">Goat Carcass Yield</span>
              <div className="text-2xl font-black text-amber-300">71% Meat/Fat</div>
              <p className="text-[11px] text-stone-500 font-sans">29% heavy marrow bone (reused for broth)</p>
            </div>
            <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 space-y-1">
              <span className="text-stone-400 text-[10px] uppercase">Plate Waste Average</span>
              <div className="text-2xl font-black text-cyan-400">&lt; 3.5%</div>
              <p className="text-[11px] text-stone-500 font-sans">Within Michelin/green kitchen benchmark</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
