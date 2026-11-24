import React, { useState } from 'react';
import {
  ChefHat,
  Sparkles,
  ArrowRight,
  Flame,
  Clock,
  Compass,
  Utensils,
  MapPin,
  Calendar,
  Calculator,
  GraduationCap,
  Briefcase,
  Globe2,
  CheckCircle2,
  Volume2,
  Coins,
  ShieldCheck,
  FileText,
  Camera,
  Play,
  Heart,
  Layers,
  Refrigerator,
} from 'lucide-react';
import { FrostChefTab } from './FrostChefNav.tsx';
import { ExtendedRecipe } from '../data/kenyanRecipes.ts';

interface CinematicLandingPageProps {
  onNavigateTab: (tab: FrostChefTab) => void;
  onOpenScanner: () => void;
  onOpenCookbook: () => void;
  onStartCooking: (recipe: ExtendedRecipe) => void;
  featuredRecipe: ExtendedRecipe;
  onAskChef: (prompt: string) => void;
}

export const CinematicLandingPage: React.FC<CinematicLandingPageProps> = ({
  onNavigateTab,
  onOpenScanner,
  onOpenCookbook,
  onStartCooking,
  featuredRecipe,
  onAskChef,
}) => {
  const [quickAiQuery, setQuickAiQuery] = useState('');

  const samplePrompts = [
    'How do I get multi-layered soft chapatis?',
    'What is the secret to dark Swahili pilau?',
    'How much flour do I need for 30 chapatis?',
    'Why is my beef stew too watery?',
  ];

  return (
    <div className="space-y-16 pb-20 text-stone-100">
      {/* 1. CINEMATIC HERO SECTION (Liquid Glass + Atmospheric Lighting) */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900/90 via-[#0c0d12]/95 to-stone-950 border border-white/10 p-6 sm:p-10 lg:p-14 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)] backdrop-blur-3xl">
        {/* Soft atmospheric refractions and glows */}
        <div className="absolute -top-32 -right-32 w-[32rem] h-[32rem] bg-emerald-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[32rem] h-[32rem] bg-amber-500/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-white/[0.03] via-transparent to-transparent pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-6 text-left">
            {/* KenyaOne Flagship Department Kicker */}
            <div className="inline-flex items-center space-x-2 px-3.5 py-1 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl text-xs font-medium text-stone-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-bold text-white tracking-wide">KENYAONE DIGITAL KITCHEN</span>
              <span className="text-stone-500">·</span>
              <span className="text-amber-300 font-mono text-[11px]">47 Counties Culinary Heritage</span>
            </div>

            {/* Oversized Cinematic Editorial Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[1.08]">
              THE FUTURE OF <br />
              <span className="bg-gradient-to-r from-emerald-300 via-teal-100 to-amber-200 bg-clip-text text-transparent">
                KENYAN COOKING.
              </span>
            </h1>

            {/* Supporting Text */}
            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl font-normal">
              Discover authentic Kenyan dishes, learn from intelligent cooking assistance, explore 47 counties of culinary heritage and turn every kitchen into an extraordinary experience.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => onNavigateTab('kitchen')}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center gap-2 shadow-xl shadow-emerald-950/60 border border-emerald-400/30 transition-all active:scale-95 cursor-pointer"
              >
                <span>ENTER THE DIGITAL KITCHEN</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={() => onNavigateTab('recipes')}
                className="px-5 py-3.5 rounded-2xl bg-white/[0.06] hover:bg-white/[0.12] text-white font-bold text-sm border border-white/15 backdrop-blur-xl transition flex items-center gap-2 cursor-pointer"
              >
                <Utensils className="w-4 h-4 text-emerald-400" />
                <span>EXPLORE KENYAN RECIPES</span>
              </button>

              <button
                onClick={onOpenCookbook}
                className="px-4 py-3.5 rounded-2xl bg-amber-500/15 hover:bg-amber-500/25 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/30 backdrop-blur-xl transition flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Masterclass PDF (16 Steps)</span>
              </button>
            </div>

            {/* Floating Interactive AI Chef Assistant Card in Hero */}
            <div className="pt-2">
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 backdrop-blur-2xl shadow-xl space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center border border-emerald-500/30">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">Ask Chef Amani — AI Kenyan Chef</div>
                      <div className="text-[10px] text-stone-400">Trained on authentic ancestral recipes & commercial techniques</div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono font-semibold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-full border border-emerald-500/20">
                    Live
                  </span>
                </div>

                {/* Quick Prompts */}
                <div className="flex items-center gap-1.5 overflow-x-auto scrollbar-none py-1">
                  {samplePrompts.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => onAskChef(p)}
                      className="px-2.5 py-1 rounded-lg bg-stone-900/90 hover:bg-stone-800 text-[11px] text-stone-300 hover:text-white border border-stone-800 whitespace-nowrap transition cursor-pointer"
                    >
                      "{p}"
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Trust Markers */}
            <div className="pt-2 flex items-center gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>47 Counties Verified</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Mama Mboga KSh Rates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span>Hands-Free Voice Studio</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual with Liquid Glass Cards & Centerpiece Dish */}
          <div className="lg:col-span-5 relative">
            <div className="relative group mx-auto max-w-md lg:max-w-none">
              {/* Outer decorative ambient glass ring */}
              <div className="absolute -inset-1.5 rounded-3xl bg-gradient-to-tr from-emerald-500/30 via-white/10 to-amber-500/30 blur-xl opacity-70 group-hover:opacity-100 transition duration-700" />

              <div className="relative rounded-3xl overflow-hidden border border-white/20 bg-stone-900 shadow-2xl">
                {/* Centerpiece authentic dish (Uploaded Kenyan dish photo) */}
                <img
                  src={featuredRecipe.imageUrl || '/assets/aistudio/image_b5b397ab.png'}
                  alt="Authentic Kenyan Sukuma Wiki, Beef Wet Fry & Hot Ugali"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />

                {/* Liquid Glass Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/30 to-transparent pointer-events-none" />

                {/* Floating Liquid Glass Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <div className="px-3 py-1 rounded-full backdrop-blur-2xl bg-stone-950/80 text-emerald-300 font-bold text-xs border border-emerald-500/30 shadow-lg flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Signature National Masterpiece</span>
                  </div>
                  <div className="px-3 py-1 rounded-full backdrop-blur-2xl bg-stone-950/80 text-amber-300 font-mono text-xs font-bold border border-amber-500/30 shadow-lg">
                    Est. KSh {featuredRecipe.estimatedCostKSh || 380} • KSh {featuredRecipe.costPerServingKSh || 95}/serv
                  </div>
                </div>

                {/* Bottom Card Glass Deck */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl backdrop-blur-2xl bg-stone-950/85 border border-white/15 shadow-2xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base tracking-tight">
                        {featuredRecipe.title}
                      </h3>
                      <p className="text-[11px] text-stone-300 line-clamp-1">
                        {featuredRecipe.description}
                      </p>
                    </div>

                    <button
                      onClick={() => onStartCooking(featuredRecipe)}
                      className="px-3.5 py-2 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition cursor-pointer flex-shrink-0"
                    >
                      <Play className="w-3.5 h-3.5 fill-current" />
                      <span>Cook</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. THE DIGITAL KITCHEN HOME — 10-SECTION BENTO GRID */}
      <section className="space-y-6">
        <div className="text-center max-w-3xl mx-auto space-y-2">
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-white/[0.04] text-emerald-400 border border-white/10 text-xs font-bold font-mono">
            <span>BENTO CONTROL CENTRE</span>
            <span className="text-stone-500">•</span>
            <span>10 FUNCTIONAL MODULES</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            The Digital Kitchen Control Centre
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl mx-auto">
            Every module is a real, high-precision culinary tool built for East African home cooks, commercial caterers, and food lovers worldwide.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {/* Card 1: AI Kenyan Chef */}
          <div
            onClick={() => onNavigateTab('chef')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Module 01</div>
              <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition mt-0.5">
                AI Kenyan Chef Amani
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Ask questions about authentic pilau browning, soft chapatis, ingredient substitutions, fixing watery stews, and scaling for 100 guests.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:underline">
              Consult Chef <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Explore Kenyan Recipes */}
          <div
            onClick={() => onNavigateTab('recipes')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-amber-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Utensils className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Module 02</div>
              <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition mt-0.5">
                Kenyan Recipe Library
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Search verified traditional recipes across Coastal Swahili, Kikuyu Mukimo, Luo Tilapia, Luhya Ingokho, and Nairobi Street Food with full macros.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:underline">
              Browse Recipes <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: 47 Counties Culinary Explorer */}
          <div
            onClick={() => onNavigateTab('counties')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-teal-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <MapPin className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-teal-400 font-bold uppercase tracking-wider">Module 03</div>
              <h3 className="font-bold text-lg text-white group-hover:text-teal-400 transition mt-0.5">
                47 Counties Culinary Explorer
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Click any Kenyan county on an interactive map to uncover regional culinary profiles, staple crops, indigenous techniques, and verified local stories.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 group-hover:underline">
              Explore 47 Counties <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 4: Interactive Cooking Studio */}
          <div
            onClick={() => onNavigateTab('studio')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Module 04</div>
              <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition mt-0.5">
                Interactive Cooking Studio
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Hands-free voice read-aloud guidance, step progress, multiple concurrent timers, temperature notes, and personal cooking logs.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:underline">
              Open Studio <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 5: My Digital Pantry */}
          <div
            onClick={() => onNavigateTab('pantry')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-cyan-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Refrigerator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider">Module 05</div>
              <h3 className="font-bold text-lg text-white group-hover:text-cyan-400 transition mt-0.5">
                My Digital Pantry & Vision
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Snap photos of your fridge or pantry to track ingredients, monitor expiry dates, and get instant zero-waste recipe recommendations.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-cyan-400 group-hover:underline">
              Inspect Pantry <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 6: Smart Meal Planner */}
          <div
            onClick={() => onNavigateTab('planner')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-amber-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calendar className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Module 06</div>
              <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition mt-0.5">
                Smart Weekly Meal Planner
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Plan breakfast, lunch, and dinner with KSh budget caps, household size scaling, and 1-click consolidated grocery list generation.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:underline">
              Plan Meals <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 7 & 8: Food Measurement Converter & Timers */}
          <div
            onClick={() => onNavigateTab('calculators')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-emerald-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider">Modules 07 & 08</div>
              <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition mt-0.5">
                Measurement Converter & Timers
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Real density-aware conversions for Unga wa Ugali, Atta, Sugar, Oil & Rice + independent labeled kitchen timers.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:underline">
              Open Calculators <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 9: Food Cost Calculator */}
          <div
            onClick={() => onNavigateTab('calculators')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-amber-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-amber-400 font-bold uppercase tracking-wider">Module 09</div>
              <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition mt-0.5">
                Food Cost & Margin Calculator
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Determine ingredient cost, cost per portion, target gross margin percentage, and recommended restaurant selling prices in KSh.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:underline">
              Calculate Cost <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 10: Professional Kitchen */}
          <div
            onClick={() => onNavigateTab('pro')}
            className="p-6 rounded-3xl bg-white/[0.03] hover:bg-white/[0.07] border border-white/10 hover:border-purple-500/40 backdrop-blur-xl transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-purple-500/20 text-purple-400 border border-purple-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6" />
            </div>
            <div>
              <div className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider">Module 10</div>
              <h3 className="font-bold text-lg text-white group-hover:text-purple-400 transition mt-0.5">
                Professional Kitchen Workspace
              </h3>
              <p className="text-xs text-stone-400 mt-1.5 leading-relaxed">
                Standardized recipe cards, bulk scaling for 100+ guests, kitchen task scheduling, hygiene checklists, and waste tracking.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-purple-400 group-hover:underline">
              Launch Pro Kitchen <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* 3. FROST CHEF ACADEMY SPOTLIGHT */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-950/30 via-stone-900/90 to-emerald-950/30 border border-white/10 p-6 sm:p-10 backdrop-blur-2xl flex flex-col md:flex-row items-center justify-between gap-8 shadow-2xl">
        <div className="space-y-3 max-w-xl text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold font-mono">
            <GraduationCap className="w-4 h-4" />
            <span>FROST CHEF ACADEMY</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Master the Art of Authentic Kenyan Gastronomy
          </h3>
          <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
            Enroll in certified masterclasses taught by heritage chefs. Learn chapati lamination, dum pilau steaming, pit roasting, and commercial food hygiene.
          </p>
        </div>

        <button
          onClick={() => onNavigateTab('academy')}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-sm shadow-xl flex items-center gap-2 flex-shrink-0 cursor-pointer active:scale-95 transition"
        >
          <GraduationCap className="w-4 h-4 text-stone-950" />
          <span>Explore Masterclasses</span>
          <ArrowRight className="w-4 h-4 ml-1" />
        </button>
      </section>
    </div>
  );
};
