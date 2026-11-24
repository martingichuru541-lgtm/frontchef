import React from 'react';
import {
  Sparkles,
  Camera,
  ChefHat,
  ArrowRight,
  ShoppingBag,
  FileText,
  Clock,
  Flame,
  CheckCircle2,
  Coins,
  Volume2,
  Utensils,
  PieChart,
} from 'lucide-react';
import { Recipe } from '../types.ts';

interface LandingPageProps {
  onGoToDashboard: () => void;
  onOpenScanner: () => void;
  onOpenCookbook: () => void;
  onOpenShopping: () => void;
  onCookFeaturedRecipe: (recipe: Recipe) => void;
  featuredRecipe: Recipe;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onGoToDashboard,
  onOpenScanner,
  onOpenCookbook,
  onOpenShopping,
  onCookFeaturedRecipe,
  featuredRecipe,
}) => {
  return (
    <div className="space-y-12 pb-16 text-stone-100">
      {/* HERO SECTION */}
      <section className="relative overflow-hidden rounded-3xl bg-gradient-to-b from-stone-900 via-stone-900/90 to-stone-950 border border-stone-800 p-6 sm:p-10 lg:p-14 shadow-2xl">
        {/* Ambient atmospheric glows */}
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Text Column */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-bold tracking-wide">
              <span>🇰🇪 Authentic Kenyan Cuisine</span>
              <span className="text-emerald-600">•</span>
              <span className="text-emerald-300 font-mono">Mama Mboga KSh Budgeting</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight leading-[1.15]">
              Turn your open fridge into{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-200 to-amber-300 bg-clip-text text-transparent">
                authentic Kenyan feasts
              </span>{' '}
              with Smart Vision AI.
            </h1>

            <p className="text-sm sm:text-base text-stone-300 leading-relaxed max-w-xl">
              Snap a photo of your shelves or pantry. Our culinary intelligence identifies your ingredients, calculates real market costs in Kenyan Shillings, and guides you hands-free step-by-step through dishes like Sukuma Wiki, Beef Wet Fry, Ugali, Swahili Pilau, and flaky Chapatis.
            </p>

            {/* Quick Action CTA Bar */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={onGoToDashboard}
                className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-black text-sm flex items-center gap-2 shadow-xl shadow-emerald-950/60 border border-emerald-400/30 transition-all active:scale-95 cursor-pointer"
              >
                <Utensils className="w-4 h-4" />
                <span>Explore Kenyan Recipes</span>
                <ArrowRight className="w-4 h-4 ml-1" />
              </button>

              <button
                onClick={onOpenScanner}
                className="px-5 py-3.5 rounded-2xl bg-stone-800 hover:bg-stone-700 text-stone-200 font-bold text-sm border border-stone-700 transition flex items-center gap-2 cursor-pointer"
              >
                <Camera className="w-4 h-4 text-emerald-400" />
                <span>Snap Fridge Photo</span>
              </button>

              <button
                onClick={onOpenCookbook}
                className="px-4 py-3.5 rounded-2xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 font-bold text-xs sm:text-sm border border-amber-500/40 transition flex items-center gap-2 cursor-pointer"
              >
                <FileText className="w-4 h-4 text-amber-400" />
                <span>Download PDF Guide (16 Images)</span>
              </button>
            </div>

            {/* Micro Stats */}
            <div className="pt-4 border-t border-stone-800/80 flex items-center gap-6 text-xs text-stone-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>100% Kenyan Staples Tuned</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Coins className="w-4 h-4 text-amber-400" />
                <span>Mama Mboga KSh Rates</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Volume2 className="w-4 h-4 text-teal-400" />
                <span>Hands-Free Read Aloud</span>
              </div>
            </div>
          </div>

          {/* Right Showcase Photo Column (Uploaded Photo) */}
          <div className="lg:col-span-5 relative">
            <div className="relative group mx-auto max-w-md lg:max-w-none">
              {/* Outer Decorative Glow Border */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-tr from-emerald-500/40 via-amber-500/30 to-teal-500/40 blur-lg opacity-75 group-hover:opacity-100 transition duration-500" />

              <div className="relative rounded-3xl overflow-hidden border-2 border-stone-700 bg-stone-900 shadow-2xl">
                <img
                  src="/assets/aistudio/image_b5b397ab.png"
                  alt="Kenyan Sukuma Wiki, Beef Wet Fry Stew and Hot Ugali"
                  className="w-full h-80 sm:h-96 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/20 to-transparent pointer-events-none" />

                {/* Floating Tag Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  <span className="px-3 py-1 rounded-full bg-stone-950/85 backdrop-blur-md text-emerald-300 font-bold text-xs border border-emerald-500/40 flex items-center gap-1.5 shadow-lg">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    Signature National Dish
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-amber-950/80 backdrop-blur-md text-amber-300 font-mono text-[11px] font-bold border border-amber-500/30">
                    Est. KSh 380 • KSh 95/serv
                  </span>
                </div>

                {/* Bottom Card Caption */}
                <div className="absolute bottom-4 left-4 right-4 p-4 rounded-2xl bg-stone-950/90 backdrop-blur-md border border-stone-800 shadow-xl space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-white text-sm sm:text-base">
                        Ugali, Sukuma Wiki & Beef Wet Fry
                      </h3>
                      <p className="text-[11px] text-stone-400">
                        Steaming white maize ugali, tender-crisp collards & caramelized beef
                      </p>
                    </div>

                    <button
                      onClick={() => onCookFeaturedRecipe(featuredRecipe)}
                      className="px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5 shadow-md active:scale-95 transition cursor-pointer"
                      title="Launch step-by-step hands-free mode"
                    >
                      <span>Cook Now</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE FEATURES VALUE GRID */}
      <section className="space-y-6">
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            Designed for East African Kitchens & Smart Cooks
          </h2>
          <p className="text-xs sm:text-sm text-stone-400">
            Combine everyday grocery budgeting with modern culinary technology.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Vision Scanner */}
          <div
            onClick={onOpenScanner}
            className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-emerald-500/50 hover:bg-stone-900 transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-emerald-400 transition">
                Smart Fridge AI Vision
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Take a photo of your open fridge or pantry. Gemini AI instantly recognizes visible vegetables, dairy, grains, and meats, generating recipes that use what you already have.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 group-hover:underline">
              Try Scanner <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 2: Mama Mboga Budgeting */}
          <div
            onClick={onOpenShopping}
            className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-amber-500/50 hover:bg-stone-900 transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 border border-amber-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Coins className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-amber-400 transition">
                Mama Mboga KSh Budgeting
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Set a market budget limit, view estimated ingredient prices based on Nairobi market benchmarks, and add missing items to your shopping list with a single click.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-400 group-hover:underline">
              Open Shopping List <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>

          {/* Card 3: Hands-Free Voice Cooking */}
          <div
            onClick={() => onCookFeaturedRecipe(featuredRecipe)}
            className="p-6 rounded-3xl bg-stone-900/80 border border-stone-800 hover:border-teal-500/50 hover:bg-stone-900 transition-all duration-300 shadow-xl cursor-pointer group space-y-4"
          >
            <div className="w-12 h-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center group-hover:scale-110 transition-transform">
              <Volume2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white group-hover:text-teal-400 transition">
                Hands-Free Read-Aloud Cooking
              </h3>
              <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                Extra-large high-contrast counter typography, spoken step-by-step guidance via voice synthesis, built-in countdown timers, and keyboard step navigation.
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-xs font-bold text-teal-400 group-hover:underline">
              Test Cooking Mode <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </div>
      </section>

      {/* MASTERCLASS PDF SPOTLIGHT BANNER */}
      <section className="rounded-3xl bg-gradient-to-r from-amber-950/30 via-stone-900 to-emerald-950/30 border border-amber-500/30 p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              Downloadable Masterclass PDF
            </span>
            <span className="text-xs text-emerald-400 font-mono font-bold">
              1,350+ Words • 16 Illustrated Cooking Steps
            </span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-white">
            Get the Complete Kenyan Culinary Handbook
          </h3>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
            Download our illustrated offline guide containing Mama Mboga market secrets, ugali thermodynamic paddling, Swahili pilau browning, soft chapati kneading, and tilapia frying techniques.
          </p>
        </div>

        <button
          onClick={onOpenCookbook}
          className="px-6 py-3.5 rounded-2xl bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-stone-950 font-black text-xs sm:text-sm shadow-xl flex items-center gap-2 flex-shrink-0 cursor-pointer active:scale-95 transition"
        >
          <FileText className="w-4 h-4 text-stone-950" />
          <span>Download Masterclass PDF</span>
        </button>
      </section>

      {/* FOOTER CTA TO DASHBOARD */}
      <div className="text-center pt-4">
        <button
          onClick={onGoToDashboard}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-stone-900 hover:bg-stone-800 text-emerald-400 font-bold text-sm border border-emerald-500/40 shadow-lg hover:border-emerald-400 transition cursor-pointer"
        >
          <span>Open Flexible Recipe Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};
