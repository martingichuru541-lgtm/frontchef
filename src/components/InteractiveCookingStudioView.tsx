import React, { useState, useEffect, useRef } from 'react';
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  CheckCircle2,
  Plus,
  Trash2,
  FileText,
  AlertTriangle,
  Scale,
  Sparkles,
  ShoppingBag,
  Timer as TimerIcon,
  BookOpen,
} from 'lucide-react';
import { ExtendedRecipe, KENYAN_RECIPES } from '../data/kenyanRecipes.ts';

interface KitchenTimer {
  id: string;
  label: string;
  initialSeconds: number;
  remainingSeconds: number;
  isRunning: boolean;
}

interface InteractiveCookingStudioViewProps {
  recipe?: ExtendedRecipe | null;
  onSelectRecipe?: (recipe: ExtendedRecipe) => void;
  onAddMissingToShoppingList?: (items: { name: string; amount?: string; recipeTitle: string }[]) => void;
  onOpenCookbook?: () => void;
}

export const InteractiveCookingStudioView: React.FC<InteractiveCookingStudioViewProps> = ({
  recipe: initialRecipe,
  onSelectRecipe,
  onAddMissingToShoppingList,
  onOpenCookbook,
}) => {
  const [selectedRecipe, setSelectedRecipe] = useState<ExtendedRecipe>(
    initialRecipe || KENYAN_RECIPES[0]
  );
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [portions, setPortions] = useState(selectedRecipe.servings || 4);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState<Record<string, boolean>>({});
  const [chefNotes, setChefNotes] = useState<string>('');

  // Simultaneous Timers Station
  const [timers, setTimers] = useState<KitchenTimer[]>([
    { id: 't1', label: 'Caramelize Red Onions', initialSeconds: 480, remainingSeconds: 480, isRunning: false },
    { id: 't2', label: 'Braise Meat / Simmer', initialSeconds: 1500, remainingSeconds: 1500, isRunning: false },
    { id: 't3', label: 'Rest Dough / Steam Pilau', initialSeconds: 1200, remainingSeconds: 1200, isRunning: false },
  ]);
  const [customTimerLabel, setCustomTimerLabel] = useState('');
  const [customTimerMinutes, setCustomTimerMinutes] = useState(10);

  // Sync when prop updates
  useEffect(() => {
    if (initialRecipe) {
      setSelectedRecipe(initialRecipe);
      setActiveStepIndex(0);
      setPortions(initialRecipe.servings || 4);
    }
  }, [initialRecipe]);

  // Portion Scaling Factor
  const scaleMultiplier = portions / (selectedRecipe.servings || 4);

  // Scaled Ingredients
  const scaledIngredients = selectedRecipe.ingredients.map(ing => {
    // If amount has numbers, scale them
    const match = ing.amount.match(/^([\d./]+)\s*(.*)$/);
    if (match) {
      const numPart = match[1];
      const unitPart = match[2];
      let val = 0;
      if (numPart.includes('/')) {
        const [num, den] = numPart.split('/');
        val = parseFloat(num) / parseFloat(den);
      } else {
        val = parseFloat(numPart);
      }
      if (!isNaN(val)) {
        const scaledVal = val * scaleMultiplier;
        const formatted = scaledVal % 1 === 0 ? scaledVal.toString() : scaledVal.toFixed(1);
        return {
          ...ing,
          scaledAmount: `${formatted} ${unitPart}`.trim(),
        };
      }
    }
    return {
      ...ing,
      scaledAmount: ing.amount,
    };
  });

  // Web Audio Beeper for Timers
  const playTimerAlarm = () => {
    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, ctx.currentTime);
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 1.2);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.2);
    } catch {
      // Audio fallback
    }
  };

  // Timer Tick Hook
  useEffect(() => {
    const interval = setInterval(() => {
      setTimers(prevTimers =>
        prevTimers.map(t => {
          if (!t.isRunning) return t;
          if (t.remainingSeconds <= 1) {
            playTimerAlarm();
            return { ...t, remainingSeconds: 0, isRunning: false };
          }
          return { ...t, remainingSeconds: t.remainingSeconds - 1 };
        })
      );
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Text-To-Speech Read Aloud
  const speakCurrentStep = () => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();

    if (isSpeaking) {
      setIsSpeaking(false);
      return;
    }

    const currentStep = selectedRecipe.steps[activeStepIndex];
    if (!currentStep) return;

    const stepTitle = currentStep.title || `Step ${activeStepIndex + 1}`;
    const stepDesc = currentStep.description || currentStep.instruction;
    const textToRead = `${stepTitle}. ${stepDesc}`;
    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = 0.95;
    utterance.pitch = 1.0;

    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    setIsSpeaking(true);
    window.speechSynthesis.speak(utterance);
  };

  const toggleTimer = (id: string) => {
    setTimers(prev =>
      prev.map(t => (t.id === id ? { ...t, isRunning: !t.isRunning } : t))
    );
  };

  const resetTimer = (id: string) => {
    setTimers(prev =>
      prev.map(t => (t.id === id ? { ...t, remainingSeconds: t.initialSeconds, isRunning: false } : t))
    );
  };

  const addCustomTimer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTimerLabel.trim()) return;
    const sec = Math.max(1, customTimerMinutes) * 60;
    const newTimer: KitchenTimer = {
      id: `timer_${Date.now()}`,
      label: customTimerLabel.trim(),
      initialSeconds: sec,
      remainingSeconds: sec,
      isRunning: true,
    };
    setTimers(prev => [...prev, newTimer]);
    setCustomTimerLabel('');
  };

  const removeTimer = (id: string) => {
    setTimers(prev => prev.filter(t => t.id !== id));
  };

  const currentStep = selectedRecipe.steps[activeStepIndex] || selectedRecipe.steps[0];
  const stepTitle = currentStep?.title || `Step ${activeStepIndex + 1}`;
  const stepDesc = currentStep?.description || currentStep?.instruction || '';
  const stepTime = currentStep?.durationMinutes || currentStep?.timerMinutes;
  const progressPercent = Math.round(((activeStepIndex + 1) / selectedRecipe.steps.length) * 100);
  const recipeRegion = selectedRecipe.region || (selectedRecipe as any).regionalCategory || selectedRecipe.cuisine || 'Kenyan Classic';
  const estimatedCost = selectedRecipe.estimatedCostKSh || 380;

  return (
    <div className="max-w-7xl mx-auto space-y-8 text-stone-100">
      {/* Studio Header */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Flame className="w-4 h-4" />
            <span>Interactive Hands-Free Cooking Studio</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            {selectedRecipe.title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            {selectedRecipe.description} • Region: <strong className="text-emerald-300">{recipeRegion}</strong> • Estimated Cost: <strong className="text-amber-300">KSh {Math.round(estimatedCost * scaleMultiplier)}</strong>
          </p>
        </div>

        {/* Change Recipe Selector */}
        <div className="flex items-center gap-3 flex-wrap">
          <select
            value={selectedRecipe.id}
            onChange={e => {
              const r = KENYAN_RECIPES.find((item: ExtendedRecipe) => item.id === e.target.value);
              if (r) {
                setSelectedRecipe(r);
                setActiveStepIndex(0);
                setPortions(r.servings || 4);
                if (onSelectRecipe) onSelectRecipe(r);
              }
            }}
            className="bg-stone-950 border border-stone-800 text-stone-200 text-xs rounded-xl px-3 py-2 font-medium"
          >
            {KENYAN_RECIPES.map((r: ExtendedRecipe) => (
              <option key={r.id} value={r.id}>
                {r.title} ({r.cuisine || 'Kenya'})
              </option>
            ))}
          </select>

          {onOpenCookbook && (
            <button
              onClick={onOpenCookbook}
              className="px-3.5 py-2 rounded-xl bg-amber-500/20 text-amber-300 border border-amber-500/40 text-xs font-bold hover:bg-amber-500/30 transition flex items-center gap-1.5 cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Full PDF Guide</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Studio Workspace: 2 Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Interactive Step-By-Step Screen (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Active Step Hero Card with Large Counter-Friendly Typography */}
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-white/15 backdrop-blur-2xl shadow-2xl space-y-6">
            {/* Step Progress Header */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center space-x-3">
                <span className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-mono font-black text-lg flex items-center justify-center border border-emerald-500/40">
                  {activeStepIndex + 1}
                </span>
                <div>
                  <div className="text-[10px] font-mono text-stone-400 uppercase tracking-wider">
                    Step {activeStepIndex + 1} of {selectedRecipe.steps.length}
                  </div>
                  <h3 className="text-xl sm:text-2xl font-black text-white">
                    {stepTitle}
                  </h3>
                </div>
              </div>

              {/* Voice Read-Aloud Button */}
              <button
                onClick={speakCurrentStep}
                className={`p-3 rounded-2xl border transition flex items-center gap-2 cursor-pointer ${
                  isSpeaking
                    ? 'bg-emerald-500 text-stone-950 border-emerald-400 animate-pulse font-bold'
                    : 'bg-white/[0.05] hover:bg-white/[0.1] text-emerald-400 border-white/10'
                }`}
                title="Hands-free voice read-aloud"
              >
                {isSpeaking ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                <span className="text-xs font-bold hidden sm:inline">
                  {isSpeaking ? 'Stop Voice' : 'Read Aloud'}
                </span>
              </button>
            </div>

            {/* Step Visual or Illustration */}
            {currentStep.imageUrl && (
              <div className="relative rounded-2xl overflow-hidden border border-white/10 max-h-72">
                <img
                  src={currentStep.imageUrl}
                  alt={stepTitle}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Extra Large Cooking Instruction Text */}
            <div className="space-y-4">
              <p className="text-base sm:text-lg text-stone-100 font-medium leading-relaxed bg-white/[0.02] p-5 rounded-2xl border border-white/5">
                {stepDesc}
              </p>

              {/* Step Parameters: Time & Temperature Guidance */}
              <div className="flex flex-wrap items-center gap-3 text-xs">
                {stepTime && (
                  <div className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300 font-mono font-semibold flex items-center gap-1.5">
                    <Clock className="w-3.5 h-3.5" />
                    <span>Duration: ~{stepTime} minutes</span>
                  </div>
                )}
                {currentStep.temperatureGuidance && (
                  <div className="px-3 py-1.5 rounded-xl bg-red-500/15 border border-red-500/30 text-red-300 font-mono font-semibold flex items-center gap-1.5">
                    <Flame className="w-3.5 h-3.5" />
                    <span>Heat: {currentStep.temperatureGuidance}</span>
                  </div>
                )}
                {(currentStep.proTip || currentStep.tip) && (
                  <div className="w-full p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/30 text-emerald-300 text-xs space-y-1">
                    <strong className="block text-[11px] font-mono uppercase tracking-wider text-emerald-400">
                      ★ Chef Amani Pro Tip:
                    </strong>
                    <p className="text-stone-300">{currentStep.proTip || currentStep.tip}</p>
                  </div>
                )}
              </div>
            </div>

            {/* Progress Bar */}
            <div className="space-y-1.5 pt-2">
              <div className="flex items-center justify-between text-[11px] font-mono text-stone-400">
                <span>Cooking Progress</span>
                <span className="text-emerald-400 font-bold">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 rounded-full bg-stone-950 overflow-hidden border border-white/10">
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-300"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Stepper Navigation Controls */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsSpeaking(false);
                  setActiveStepIndex(prev => Math.max(0, prev - 1));
                }}
                disabled={activeStepIndex === 0}
                className="px-4 py-2.5 rounded-xl bg-stone-950 border border-white/10 text-stone-300 hover:text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 transition cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous Step</span>
              </button>

              <button
                onClick={() => {
                  window.speechSynthesis?.cancel();
                  setIsSpeaking(false);
                  if (activeStepIndex < selectedRecipe.steps.length - 1) {
                    setActiveStepIndex(prev => prev + 1);
                  }
                }}
                disabled={activeStepIndex === selectedRecipe.steps.length - 1}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center gap-1.5 disabled:opacity-40 transition cursor-pointer active:scale-95"
              >
                <span>Next Step</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Personal Kitchen Notes */}
          <div className="p-5 rounded-2xl bg-stone-900/60 border border-white/10 space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400 flex items-center gap-2">
              <FileText className="w-4 h-4 text-emerald-400" />
              Personal Chef Notes (Session Memory)
            </h4>
            <textarea
              rows={3}
              value={chefNotes}
              onChange={e => setChefNotes(e.target.value)}
              placeholder="e.g., Added extra crushed ginger; reduced salt by half teaspoon; used medium heat for 18 minutes..."
              className="w-full bg-stone-950 border border-stone-800 rounded-xl p-3 text-xs text-stone-200 placeholder:text-stone-600 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Right Column: Dynamic Portion Scaler, Ingredients Checklist & Timers Station (5 Cols) */}
        <div className="lg:col-span-5 space-y-6">
          {/* 1. Dynamic Portion Scaler (1 to 100 people) */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Scale className="w-4 h-4 text-emerald-400" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-white">
                  Portion Scaler
                </h4>
              </div>
              <span className="text-xs font-mono font-bold text-amber-300">
                {portions} Servings ({scaleMultiplier.toFixed(2)}x)
              </span>
            </div>

            <div className="flex items-center gap-2">
              {[2, 4, 8, 15, 30, 50, 100].map(cnt => (
                <button
                  key={cnt}
                  onClick={() => setPortions(cnt)}
                  className={`flex-1 py-1.5 rounded-lg text-xs font-mono font-bold transition cursor-pointer ${
                    portions === cnt
                      ? 'bg-emerald-600 text-white shadow-sm'
                      : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>

            <div className="text-[11px] text-stone-400 flex items-center justify-between pt-1 border-t border-white/5">
              <span>Mama Mboga Est: <strong className="text-white">KSh {Math.round(estimatedCost * scaleMultiplier)}</strong></span>
              <span>Per Serving: <strong className="text-white">KSh {selectedRecipe.costPerServingKSh || 90}</strong></span>
            </div>
          </div>

          {/* 2. Scaled Ingredients Mise en Place Checklist */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                Mise en Place Checklist
              </h4>

              {onAddMissingToShoppingList && (
                <button
                  onClick={() => {
                    const missing = scaledIngredients
                      .filter(i => !checkedIngredients[i.name])
                      .map(i => ({ name: i.name, amount: i.scaledAmount, recipeTitle: selectedRecipe.title }));
                    if (missing.length > 0) {
                      onAddMissingToShoppingList(missing);
                    }
                  }}
                  className="text-[11px] font-bold text-amber-300 hover:text-amber-200 flex items-center gap-1 cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5" />
                  <span>Send Unchecked to List</span>
                </button>
              )}
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto pr-1 scrollbar-thin text-xs">
              {scaledIngredients.map((ing, idx) => {
                const isChecked = !!checkedIngredients[ing.name];
                return (
                  <div
                    key={idx}
                    onClick={() =>
                      setCheckedIngredients(prev => ({ ...prev, [ing.name]: !prev[ing.name] }))
                    }
                    className={`p-2.5 rounded-xl border flex items-center justify-between cursor-pointer transition ${
                      isChecked
                        ? 'bg-emerald-950/20 border-emerald-500/40 text-stone-400 line-through'
                        : 'bg-stone-950/80 border-white/5 hover:border-white/20 text-stone-200'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div
                        className={`w-4 h-4 rounded flex items-center justify-center border ${
                          isChecked
                            ? 'bg-emerald-500 border-emerald-400 text-stone-950'
                            : 'border-stone-700'
                        }`}
                      >
                        {isChecked && <CheckCircle2 className="w-3.5 h-3.5" />}
                      </div>
                      <span className="font-medium">{ing.name}</span>
                    </div>

                    <span className="font-mono text-emerald-400 font-bold">
                      {ing.scaledAmount}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* 3. Multi-Timer Station */}
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/15 backdrop-blur-xl shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="text-xs font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <TimerIcon className="w-4 h-4 text-emerald-400" />
                Simultaneous Timers Station
              </h4>
              <span className="text-[10px] font-mono text-stone-400">
                {timers.filter(t => t.isRunning).length} Running
              </span>
            </div>

            {/* Timers List */}
            <div className="space-y-2.5">
              {timers.map(timer => {
                const mins = Math.floor(timer.remainingSeconds / 60);
                const secs = timer.remainingSeconds % 60;
                const formattedTime = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
                const isFinished = timer.remainingSeconds === 0;

                return (
                  <div
                    key={timer.id}
                    className={`p-3 rounded-xl border flex items-center justify-between ${
                      isFinished
                        ? 'bg-red-950/40 border-red-500 text-red-300 animate-pulse'
                        : timer.isRunning
                        ? 'bg-emerald-950/20 border-emerald-500/50'
                        : 'bg-stone-950 border-stone-800'
                    }`}
                  >
                    <div>
                      <div className="text-xs font-bold text-white">{timer.label}</div>
                      <div className="font-mono text-lg font-black text-emerald-400">
                        {formattedTime}
                      </div>
                    </div>

                    <div className="flex items-center space-x-1.5">
                      <button
                        onClick={() => toggleTimer(timer.id)}
                        className={`p-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                          timer.isRunning
                            ? 'bg-amber-500/20 text-amber-300 hover:bg-amber-500/30'
                            : 'bg-emerald-600 text-white hover:bg-emerald-500'
                        }`}
                      >
                        {timer.isRunning ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                      </button>
                      <button
                        onClick={() => resetTimer(timer.id)}
                        className="p-1.5 rounded-lg bg-stone-800 text-stone-400 hover:text-white text-xs transition cursor-pointer"
                        title="Reset timer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => removeTimer(timer.id)}
                        className="p-1.5 rounded-lg bg-stone-800 text-stone-500 hover:text-red-400 text-xs transition cursor-pointer"
                        title="Delete timer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Add Custom Timer */}
            <form onSubmit={addCustomTimer} className="pt-2 border-t border-white/5 flex items-center gap-2">
              <input
                type="text"
                placeholder="Timer name (e.g. Boil Eggs)"
                value={customTimerLabel}
                onChange={e => setCustomTimerLabel(e.target.value)}
                className="flex-1 bg-stone-950 border border-stone-800 rounded-xl px-2.5 py-1.5 text-xs text-stone-100 placeholder:text-stone-600"
              />
              <input
                type="number"
                min="1"
                max="180"
                value={customTimerMinutes}
                onChange={e => setCustomTimerMinutes(parseInt(e.target.value) || 1)}
                className="w-14 bg-stone-950 border border-stone-800 rounded-xl px-2 py-1.5 text-xs text-stone-100 text-center font-mono"
              />
              <button
                type="submit"
                className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs cursor-pointer flex items-center gap-1"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Add</span>
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
