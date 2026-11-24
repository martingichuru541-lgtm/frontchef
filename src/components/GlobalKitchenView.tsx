import React, { useState } from 'react';
import {
  Globe2,
  MapPin,
  ShoppingBag,
  Sparkles,
  Utensils,
  ChevronRight,
  ExternalLink,
  Store,
} from 'lucide-react';
import { DIASPORA_GUIDES, CountryDiasporaGuide } from '../data/diasporaSubstitutions.ts';

export const GlobalKitchenView: React.FC = () => {
  const [selectedCountryCode, setSelectedCountryCode] = useState<string>(DIASPORA_GUIDES[0].countryCode);

  const selectedGuide = DIASPORA_GUIDES.find(g => g.countryCode === selectedCountryCode) || DIASPORA_GUIDES[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-stone-100">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider">
            <Globe2 className="w-4 h-4" />
            <span>Global Kenyan Kitchen & Diaspora Network</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The Diaspora Kitchen Guide
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Never compromise on authentic Kenyan flavors while living abroad. Verified ingredient substitutions, local supermarket brands, and ethnic markets across the UK, USA, Gulf & Canada.
          </p>
        </div>

        {/* Country Selector Pills */}
        <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-stone-950 border border-stone-800 overflow-x-auto max-w-full">
          {DIASPORA_GUIDES.map(guide => {
            const isSelected = selectedCountryCode === guide.countryCode;
            return (
              <button
                key={guide.countryCode}
                onClick={() => setSelectedCountryCode(guide.countryCode)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-600 text-white shadow-sm'
                    : 'text-stone-400 hover:text-white hover:bg-stone-900'
                }`}
              >
                <span className="text-sm">{guide.flag}</span>
                <span>{guide.countryName}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Country Profile & Major Hubs */}
      <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">{selectedGuide.flag}</span>
          <div>
            <h3 className="font-bold text-lg text-white">
              Kenyan Cooking in the {selectedGuide.countryName}
            </h3>
            <p className="text-xs text-stone-400">
              Verified by KenyaOne overseas culinary ambassadors.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-[11px] font-mono text-stone-400 mr-1">Major Hubs:</span>
          {selectedGuide.majorHubs.map(hub => (
            <span
              key={hub}
              className="px-2.5 py-0.5 rounded-md bg-stone-950 border border-stone-800 text-[11px] text-cyan-300 font-mono"
            >
              {hub}
            </span>
          ))}
        </div>
      </div>

      {/* Ingredient Substitutions Grid */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
          <ShoppingBag className="w-4 h-4 text-cyan-400" />
          Verified Ingredient Alternatives & Sourcing
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {selectedGuide.substitutions.map((sub, idx) => (
            <div
              key={idx}
              className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 backdrop-blur-xl shadow-lg space-y-3.5 text-left"
            >
              <div className="flex items-center justify-between border-b border-white/5 pb-2.5">
                <div>
                  <span className="text-[10px] font-mono text-stone-400 uppercase">Kenyan Staple</span>
                  <div className="font-bold text-white text-base mt-0.5">{sub.kenyanIngredient}</div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-mono text-cyan-400 uppercase">Local Alternative</span>
                  <div className="font-bold text-cyan-300 text-sm mt-0.5">{sub.localAlternative}</div>
                </div>
              </div>

              <div className="p-3 rounded-xl bg-stone-950/80 border border-stone-800 text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-stone-500 flex items-center gap-1">
                  <Store className="w-3 h-3 text-cyan-400" /> Where to Buy ({selectedGuide.countryName}):
                </span>
                <p className="text-stone-300">{sub.whereToBuy}</p>
              </div>

              <div className="p-3 rounded-xl bg-emerald-950/20 border border-emerald-500/20 text-xs space-y-1">
                <span className="text-[10px] font-mono uppercase text-emerald-400 font-bold block">
                  ★ Culinary Adjustment Tip:
                </span>
                <p className="text-stone-300">{sub.culinaryAdjustmentTip}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured Diaspora Restaurants */}
      {selectedGuide.featuredDiasporaRestaurants.length > 0 && (
        <div className="p-6 rounded-3xl bg-stone-900/90 border border-white/10 space-y-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <Utensils className="w-4 h-4 text-amber-400" />
            Recommended Authentic Kenyan Dining Spots
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {selectedGuide.featuredDiasporaRestaurants.map((res, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex items-center justify-between"
              >
                <div>
                  <h4 className="font-bold text-sm text-white">{res.name}</h4>
                  <div className="text-xs text-stone-400">{res.city}</div>
                  <div className="text-[11px] text-amber-300 mt-1">{res.specialty}</div>
                </div>
                <div className="w-8 h-8 rounded-xl bg-white/[0.05] flex items-center justify-center text-stone-400">
                  <ExternalLink className="w-4 h-4" />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
