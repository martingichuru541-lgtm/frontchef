import React, { useState, useMemo } from 'react';
import {
  MapPin,
  Search,
  Filter,
  Sparkles,
  BookOpen,
  Award,
  CheckCircle2,
  Users,
  Utensils,
  ChevronRight,
  X,
  PlusCircle,
  ShieldCheck,
} from 'lucide-react';
import { KENYA_COUNTIES, CountyCulinaryProfile } from '../data/kenyaCounties.ts';

interface CountiesExplorerViewProps {
  onSelectCountyDishes?: (countyName: string) => void;
}

export const CountiesExplorerView: React.FC<CountiesExplorerViewProps> = ({
  onSelectCountyDishes,
}) => {
  const [selectedCounty, setSelectedCounty] = useState<CountyCulinaryProfile>(KENYA_COUNTIES[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(false);

  const regions = ['All', 'Coast', 'Central', 'Eastern', 'Rift Valley', 'Western', 'Nyanza', 'North Eastern', 'Nairobi'];

  const filteredCounties = useMemo(() => {
    return KENYA_COUNTIES.filter(county => {
      const matchesSearch =
        county.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        county.capital.toLowerCase().includes(searchQuery.toLowerCase()) ||
        county.signatureDishes.some(d => d.toLowerCase().includes(searchQuery.toLowerCase())) ||
        county.stapleIngredients.some(i => i.toLowerCase().includes(searchQuery.toLowerCase()));

      const matchesRegion = selectedRegion === 'All' || county.region === selectedRegion;

      return matchesSearch && matchesRegion;
    });
  }, [searchQuery, selectedRegion]);

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-stone-100">
      {/* Top Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <MapPin className="w-4 h-4" />
            <span>Interactive Gastronomic Atlas</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            47 Counties Culinary Explorer
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl leading-relaxed">
            Click any of Kenya’s 47 counties to uncover centuries of ancestral preparation techniques, staple grain varieties, and community-verified food stories.
          </p>
        </div>

        <button
          onClick={() => setIsSubmitModalOpen(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xl border border-emerald-400/30 transition cursor-pointer active:scale-95 flex-shrink-0"
        >
          <PlusCircle className="w-4 h-4" />
          <span>Submit County Heritage Recipe</span>
        </button>
      </div>

      {/* Search & Region Filter Bar */}
      <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 backdrop-blur-xl flex flex-col sm:flex-row items-center gap-3">
        <div className="relative flex-1 w-full">
          <Search className="w-4 h-4 text-stone-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search by county name, dish (pilau, mukimo, tilapia, muthokoi), or ingredient..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        {/* Region Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto scrollbar-none pb-1 sm:pb-0">
          {regions.map(reg => (
            <button
              key={reg}
              onClick={() => setSelectedRegion(reg)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition cursor-pointer ${
                selectedRegion === reg
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'bg-stone-900 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {reg}
            </button>
          ))}
        </div>
      </div>

      {/* Main Layout: County Explorer Grid + Detailed Spotlight Drawer */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: 47 Counties List / Grid (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between text-xs text-stone-400 px-1">
            <span>Showing <strong className="text-white">{filteredCounties.length}</strong> of 47 Counties</span>
            <span>Click any county to inspect heritage profile</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-[750px] overflow-y-auto pr-2 scrollbar-thin">
            {filteredCounties.map(county => {
              const isSelected = selectedCounty.code === county.code;
              return (
                <div
                  key={county.code}
                  onClick={() => setSelectedCounty(county)}
                  className={`p-4 rounded-2xl border transition-all duration-200 cursor-pointer text-left space-y-2 group ${
                    isSelected
                      ? 'bg-white/10 border-emerald-500/60 shadow-lg shadow-emerald-950/30'
                      : 'bg-stone-900/80 hover:bg-stone-900 border-white/5 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-950 text-emerald-400 border border-stone-800 font-bold">
                      County {String(county.code).padStart(3, '0')}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400">{county.region}</span>
                  </div>

                  <div>
                    <h4 className="font-bold text-base text-white group-hover:text-emerald-300 transition">
                      {county.name}
                    </h4>
                    <div className="text-[11px] text-stone-400">Capital: {county.capital}</div>
                  </div>

                  <p className="text-xs text-stone-300 line-clamp-1 italic">
                    "{county.tagline}"
                  </p>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                    <span className="text-stone-400 truncate max-w-[170px]">
                      {county.signatureDishes[0]}
                    </span>
                    <span className="text-emerald-400 font-semibold group-hover:translate-x-1 transition-transform flex items-center">
                      View <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Selected County Full Profile Drawer (5 cols) */}
        <div className="lg:col-span-5 sticky top-24">
          <div className="rounded-3xl bg-gradient-to-b from-stone-900/95 via-stone-900 to-stone-950 border border-white/15 p-6 shadow-2xl backdrop-blur-2xl space-y-6 text-left">
            {/* Header */}
            <div className="space-y-1.5 border-b border-white/10 pb-4">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                  County {String(selectedCounty.code).padStart(3, '0')} · {selectedCounty.region} Region
                </span>
                <span className="text-xs text-amber-300 flex items-center gap-1">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" /> Verified Heritage
                </span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {selectedCounty.name} County
              </h3>
              <p className="text-xs text-emerald-300/90 font-medium italic">
                "{selectedCounty.tagline}"
              </p>
            </div>

            {/* Signature Dishes */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Utensils className="w-3.5 h-3.5 text-emerald-400" />
                Signature Regional Dishes
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCounty.signatureDishes.map((dish, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-xl bg-white/[0.05] border border-white/10 text-xs font-medium text-stone-200"
                  >
                    {dish}
                  </span>
                ))}
              </div>
            </div>

            {/* Staple Crops & Ingredients */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                Indigenous Crops & Staples
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {selectedCounty.stapleIngredients.map((ing, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-0.5 rounded-md bg-stone-950 text-stone-300 border border-stone-800 text-[11px] font-mono"
                  >
                    {ing}
                  </span>
                ))}
              </div>
            </div>

            {/* Traditional Preparation Technique */}
            <div className="p-3.5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-1">
              <div className="text-[11px] font-bold uppercase tracking-wider text-emerald-400">
                Ancestral Cooking Technique:
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                {selectedCounty.traditionalTechnique}
              </p>
            </div>

            {/* Local Food Story */}
            <div className="space-y-1.5">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Culinary Heritage & Story:
              </h4>
              <p className="text-xs text-stone-300 leading-relaxed bg-stone-950/60 p-3.5 rounded-2xl border border-stone-800/80">
                {selectedCounty.foodStory}
              </p>
            </div>

            {/* Community Contributor Stats */}
            <div className="pt-2 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-emerald-400" />
                <strong className="text-white">{selectedCounty.verifiedContributorCount}</strong> verified local contributors
              </span>
              <button
                onClick={() => setIsSubmitModalOpen(true)}
                className="text-emerald-400 hover:text-emerald-300 font-bold underline"
              >
                Contribute +
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contributor Verification Submission Modal */}
      {isSubmitModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-white/15 rounded-3xl max-w-lg w-full p-6 text-stone-100 shadow-2xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <h3 className="font-bold text-lg text-white">
                  Submit County Heritage Recipe
                </h3>
              </div>
              <button
                onClick={() => setIsSubmitModalOpen(false)}
                className="p-1 rounded-lg hover:bg-stone-800 text-stone-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-stone-300 leading-relaxed">
              Every submission is editorially audited by KenyaOne cultural elders and culinary historians to prevent false cultural attribution.
            </p>

            <form
              onSubmit={e => {
                e.preventDefault();
                setSubmissionSuccess(true);
                setTimeout(() => {
                  setSubmissionSuccess(false);
                  setIsSubmitModalOpen(false);
                }, 2000);
              }}
              className="space-y-3"
            >
              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  County Origin
                </label>
                <select
                  defaultValue={selectedCounty.name}
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  {KENYA_COUNTIES.map(c => (
                    <option key={c.code} value={c.name}>
                      {c.name} (County {c.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Traditional Recipe Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g., Authentic Kimanga cha Ndizi"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-300 block mb-1">
                  Ancestral Technique & Ingredients
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Describe traditional ingredients, cookware (sufuria/clay pot), and technique passed down through your community..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              {submissionSuccess ? (
                <div className="p-3 bg-emerald-950/60 border border-emerald-500 rounded-xl text-center text-xs text-emerald-300 font-bold">
                  ✓ Recipe submitted for KenyaOne Editorial Verification!
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs"
                >
                  Submit for Cultural Verification
                </button>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
