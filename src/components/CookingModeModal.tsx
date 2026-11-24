import React, { useState, useEffect, useRef } from 'react';
import {
  Volume2,
  VolumeX,
  Play,
  Pause,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  X,
  Clock,
  Sparkles,
  CheckCircle,
  Lightbulb,
  Plus,
  Maximize2,
  Minimize2,
  Flame,
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { Recipe, RecipeStep } from '../types.ts';

interface CookingModeModalProps {
  recipe: Recipe;
  onClose: () => void;
  onAddMissingToShoppingList: (items: { name: string; amount?: string; recipeTitle: string }[]) => void;
}

export const CookingModeModal: React.FC<CookingModeModalProps> = ({
  recipe,
  onClose,
  onAddMissingToShoppingList,
}) => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [autoReadNext, setAutoReadNext] = useState(true);
  const [speechRate, setSpeechRate] = useState(1.0);
  const [textSize, setTextSize] = useState<'large' | 'huge' | 'giant'>('huge');
  const [isCompleted, setIsCompleted] = useState(false);

  // Step Timer State
  const [timerRemainingSeconds, setTimerRemainingSeconds] = useState<number | null>(null);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<any>(null);

  const steps = recipe.steps || [];
  const currentStep = steps[currentStepIndex] || {
    stepNumber: 1,
    instruction: 'Prepare ingredients and enjoy cooking!',
  };

  // Web Speech API synthesis ref
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
    }
    return () => {
      stopSpeaking();
      clearInterval(timerIntervalRef.current);
    };
  }, []);

  // Set up timer whenever step changes
  useEffect(() => {
    clearInterval(timerIntervalRef.current);
    setIsTimerRunning(false);

    if (currentStep.timerMinutes && currentStep.timerMinutes > 0) {
      setTimerRemainingSeconds(currentStep.timerMinutes * 60);
    } else {
      setTimerRemainingSeconds(null);
    }

    if (autoReadNext) {
      speakStep(currentStep.instruction, currentStep.tip);
    } else {
      stopSpeaking();
    }
  }, [currentStepIndex]);

  // Timer tick
  useEffect(() => {
    if (isTimerRunning && timerRemainingSeconds !== null && timerRemainingSeconds > 0) {
      timerIntervalRef.current = setInterval(() => {
        setTimerRemainingSeconds(prev => {
          if (prev === null || prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            playTimerAlarm();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning, timerRemainingSeconds]);

  const playTimerAlarm = () => {
    // Play pleasant high-pitch chime using AudioContext
    try {
      const audioCtx = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // A5
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.8);
      gain.gain.setValueAtTime(0.3, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.8);
      osc.connect(gain);
      gain.connect(audioCtx.destination);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.9);
    } catch (e) {
      console.warn('AudioContext chime not available', e);
    }

    if (synthRef.current) {
      const chimeUtterance = new SpeechSynthesisUtterance('Timer complete!');
      chimeUtterance.rate = 1.1;
      synthRef.current.speak(chimeUtterance);
    }
  };

  const stopSpeaking = () => {
    if (synthRef.current) {
      synthRef.current.cancel();
    }
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const speakStep = (instruction: string, tip?: string) => {
    if (!synthRef.current) return;

    synthRef.current.cancel();

    const textToRead = `Step ${currentStep.stepNumber}. ${instruction}${
      tip ? `. Chef tip: ${tip}` : ''
    }`;

    const utterance = new SpeechSynthesisUtterance(textToRead);
    utterance.rate = speechRate;
    utterance.pitch = 1.0;

    // Pick a natural English voice if available
    const voices = synthRef.current.getVoices();
    const preferredVoice = voices.find(
      v => v.lang.startsWith('en') && (v.name.includes('Google') || v.name.includes('Natural') || v.name.includes('Samantha'))
    ) || voices.find(v => v.lang.startsWith('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };

    utteranceRef.current = utterance;
    synthRef.current.speak(utterance);
  };

  const togglePauseResume = () => {
    if (!synthRef.current) return;

    if (isSpeaking && !isPaused) {
      synthRef.current.pause();
      setIsPaused(true);
    } else if (isPaused) {
      synthRef.current.resume();
      setIsPaused(false);
    } else {
      speakStep(currentStep.instruction, currentStep.tip);
    }
  };

  const handleNextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
    } else {
      // Finished all steps!
      setIsCompleted(true);
      stopSpeaking();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      setCurrentStepIndex(prev => prev - 1);
      setIsCompleted(false);
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  // Keyboard navigation for hands-free counter accessibility
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === ' ') {
        e.preventDefault();
        handleNextStep();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        handlePrevStep();
      } else if (e.key === 'r') {
        speakStep(currentStep.instruction, currentStep.tip);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentStepIndex, steps.length, currentStep]);

  const getTextClass = () => {
    switch (textSize) {
      case 'large':
        return 'text-xl sm:text-2xl leading-relaxed';
      case 'huge':
        return 'text-2xl sm:text-3xl lg:text-4xl leading-snug';
      case 'giant':
        return 'text-3xl sm:text-4xl lg:text-5xl leading-tight font-medium';
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-950/95 backdrop-blur-xl flex flex-col text-stone-100 overflow-y-auto">
      {/* Top Hands-Free Control Bar */}
      <div className="border-b border-stone-800 bg-stone-900/80 px-4 sm:px-8 py-3.5 flex items-center justify-between sticky top-0 z-10 backdrop-blur-md">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 flex items-center justify-center font-bold text-xs">
            {currentStepIndex + 1}/{steps.length}
          </div>
          <div>
            <h2 className="text-sm sm:text-base font-bold text-white tracking-tight truncate max-w-xs sm:max-w-md">
              {recipe.title}
            </h2>
            <p className="text-[11px] text-stone-400">Step-by-Step Hands-Free Mode</p>
          </div>
        </div>

        {/* Audio Speech Controls & Font Sizer */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Read Aloud Button */}
          <button
            onClick={() => {
              if (isSpeaking) {
                togglePauseResume();
              } else {
                speakStep(currentStep.instruction, currentStep.tip);
              }
            }}
            className={`flex items-center space-x-2 px-3 py-1.5 rounded-xl text-xs font-semibold transition border ${
              isSpeaking
                ? 'bg-emerald-600 text-white border-emerald-400 shadow-md animate-pulse'
                : 'bg-stone-800 text-stone-200 border-stone-700 hover:text-white'
            }`}
            aria-label="Read aloud step instruction"
          >
            {isSpeaking && !isPaused ? (
              <>
                <Pause className="w-4 h-4" />
                <span className="hidden sm:inline">Pause Voice</span>
              </>
            ) : (
              <>
                <Volume2 className="w-4 h-4 text-emerald-400" />
                <span className="hidden sm:inline">Read Aloud</span>
              </>
            )}
          </button>

          {/* Replay voice button */}
          <button
            onClick={() => speakStep(currentStep.instruction, currentStep.tip)}
            className="p-2 rounded-xl bg-stone-800 text-stone-300 hover:text-white border border-stone-700"
            title="Replay Voice (shortcut: R)"
            aria-label="Replay current step instruction aloud"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Text Size Switcher */}
          <div className="hidden sm:flex items-center bg-stone-950 p-1 rounded-xl border border-stone-800 text-xs">
            <button
              onClick={() => setTextSize('large')}
              className={`px-2 py-0.5 rounded-md font-bold ${
                textSize === 'large' ? 'bg-emerald-600 text-white' : 'text-stone-400'
              }`}
            >
              A
            </button>
            <button
              onClick={() => setTextSize('huge')}
              className={`px-2 py-0.5 rounded-md font-bold text-sm ${
                textSize === 'huge' ? 'bg-emerald-600 text-white' : 'text-stone-400'
              }`}
            >
              A+
            </button>
            <button
              onClick={() => setTextSize('giant')}
              className={`px-2 py-0.5 rounded-md font-bold text-base ${
                textSize === 'giant' ? 'bg-emerald-600 text-white' : 'text-stone-400'
              }`}
            >
              A++
            </button>
          </div>

          {/* Exit Cooking Mode */}
          <button
            onClick={() => {
              stopSpeaking();
              onClose();
            }}
            className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white hover:bg-stone-700 transition"
            aria-label="Exit Cooking Mode"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-stone-900 h-1.5">
        <div
          className="bg-gradient-to-r from-emerald-500 to-teal-400 h-1.5 transition-all duration-300"
          style={{ width: `${((currentStepIndex + 1) / steps.length) * 100}%` }}
        />
      </div>

      {/* Main Large Step Display Area */}
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 sm:px-12 py-8 flex flex-col justify-center">
        {!isCompleted ? (
          <div className="space-y-8 animate-fadeIn">
            {/* Step Header */}
            <div className="flex items-center justify-between">
              <span className="text-xs sm:text-sm font-bold uppercase tracking-widest text-emerald-400 bg-emerald-950/60 px-3 py-1 rounded-full border border-emerald-800/40">
                Step {currentStep.stepNumber} of {steps.length}
              </span>

              {/* Auto Read Aloud Toggle */}
              <label className="flex items-center space-x-2 text-xs text-stone-400 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={autoReadNext}
                  onChange={e => setAutoReadNext(e.target.checked)}
                  className="rounded accent-emerald-500 bg-stone-800 border-stone-700 w-3.5 h-3.5"
                />
                <span>Auto-read next step</span>
              </label>
            </div>

            {/* Extra Large Instruction Text (Specified in Prompt) */}
            <div className="bg-stone-900/60 border border-stone-800/80 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
              <p className={`${getTextClass()} font-semibold text-stone-50 tracking-tight`}>
                {currentStep.instruction}
              </p>

              {/* Visual Sound Wave Indicator while speaking */}
              {isSpeaking && (
                <div className="mt-4 flex items-center space-x-1 text-emerald-400 text-xs">
                  <span className="w-1.5 h-4 bg-emerald-400 rounded-full animate-bounce" />
                  <span className="w-1.5 h-6 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.15s]" />
                  <span className="w-1.5 h-3 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.3s]" />
                  <span className="ml-2 font-mono text-emerald-300">Speaking instruction...</span>
                </div>
              )}

              {/* Chef's Pro Tip */}
              {currentStep.tip && (
                <div className="mt-6 pt-5 border-t border-stone-800/80 flex items-start space-x-3 text-stone-300">
                  <div className="p-1.5 rounded-lg bg-amber-500/20 text-amber-300 border border-amber-500/30 flex-shrink-0 mt-0.5">
                    <Lightbulb className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-amber-300 uppercase tracking-wider block">
                      Chef Tip:
                    </span>
                    <p className="text-sm sm:text-base text-stone-300 mt-0.5 leading-relaxed">
                      {currentStep.tip}
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Embedded Step Timer */}
            {timerRemainingSeconds !== null && (
              <div className="bg-stone-900 border border-emerald-900/40 rounded-2xl p-5 flex items-center justify-between shadow-xl">
                <div className="flex items-center space-x-3">
                  <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                    <Clock className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold uppercase tracking-wider text-stone-400">
                      Step Timer
                    </div>
                    <div className="text-3xl font-mono font-bold text-white tracking-wider">
                      {formatTimer(timerRemainingSeconds)}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setIsTimerRunning(!isTimerRunning)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                      isTimerRunning
                        ? 'bg-amber-600 hover:bg-amber-500 text-white'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-md'
                    }`}
                  >
                    {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    <span>{isTimerRunning ? 'Pause' : 'Start Timer'}</span>
                  </button>

                  <button
                    onClick={() => {
                      setIsTimerRunning(false);
                      setTimerRemainingSeconds((currentStep.timerMinutes || 0) * 60);
                    }}
                    className="p-2 rounded-xl bg-stone-800 text-stone-400 hover:text-white border border-stone-700"
                    title="Reset Timer"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          /* Recipe Completed Screen */
          <div className="text-center py-12 space-y-6 bg-stone-900/60 border border-stone-800 rounded-3xl p-8 shadow-2xl animate-scaleUp">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 border-2 border-emerald-500/40 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
              <CheckCircle className="w-10 h-10" />
            </div>
            <div>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-white">
                Bon Appétit!
              </h3>
              <p className="text-stone-300 max-w-md mx-auto mt-2 text-base">
                You've successfully prepared{' '}
                <strong className="text-emerald-300">{recipe.title}</strong> using your fridge's fresh ingredients!
              </p>
            </div>

            <div className="flex items-center justify-center space-x-4 pt-4">
              <button
                onClick={() => {
                  setCurrentStepIndex(0);
                  setIsCompleted(false);
                }}
                className="px-5 py-2.5 rounded-xl bg-stone-800 text-stone-300 hover:text-white text-xs font-semibold border border-stone-700"
              >
                Review Steps Again
              </button>
              <button
                onClick={onClose}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-lg"
              >
                Done Cooking
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Bottom Hands-Free Navigation Bar (Extra large touch & click targets for kitchen counter) */}
      <footer className="border-t border-stone-800 bg-stone-900/90 px-6 sm:px-12 py-4 sticky bottom-0 z-10 backdrop-blur-md">
        <div className="max-w-4xl mx-auto flex items-center justify-between gap-4">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className={`flex items-center space-x-2 px-6 py-3.5 rounded-2xl font-bold text-sm sm:text-base transition-all border ${
              currentStepIndex === 0
                ? 'opacity-30 cursor-not-allowed bg-stone-900 border-stone-800 text-stone-500'
                : 'bg-stone-800 hover:bg-stone-700 text-stone-200 border-stone-700 active:scale-95'
            }`}
            aria-label="Previous step"
          >
            <ChevronLeft className="w-5 h-5" />
            <span>Previous</span>
          </button>

          <div className="text-center text-xs text-stone-400 hidden sm:block">
            <span>Tip: Press </span>
            <kbd className="px-1.5 py-0.5 bg-stone-800 border border-stone-700 rounded text-stone-300 font-mono">
              Space
            </kbd>
            <span> or </span>
            <kbd className="px-1.5 py-0.5 bg-stone-800 border border-stone-700 rounded text-stone-300 font-mono">
              →
            </kbd>
            <span> for next step</span>
          </div>

          <button
            onClick={handleNextStep}
            className="flex-1 max-w-xs flex items-center justify-center space-x-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-extrabold text-sm sm:text-base shadow-xl shadow-emerald-950/60 border border-emerald-400/30 transition-all active:scale-95"
            aria-label={currentStepIndex === steps.length - 1 ? 'Finish recipe' : 'Next step'}
          >
            <span>{currentStepIndex === steps.length - 1 ? 'Finish Dish' : 'Next Step'}</span>
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </footer>
    </div>
  );
};
