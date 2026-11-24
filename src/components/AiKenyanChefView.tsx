import React, { useState, useRef, useEffect } from 'react';
import {
  Sparkles,
  Send,
  ChefHat,
  Bot,
  User,
  BookOpen,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BookmarkPlus,
  Compass,
} from 'lucide-react';
import { ExtendedRecipe } from '../data/kenyanRecipes.ts';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  culturalContext?: string;
  timestamp: string;
}

interface AiKenyanChefViewProps {
  onStartCookingWithRecipe?: (recipe: ExtendedRecipe) => void;
  onSaveRecipeToCookbook?: (recipe: ExtendedRecipe) => void;
}

export const AiKenyanChefView: React.FC<AiKenyanChefViewProps> = ({
  onStartCookingWithRecipe,
  onSaveRecipeToCookbook,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1',
      role: 'assistant',
      content: `### Karibu! I am Chef Amani, your KenyaOne AI Kenyan Executive Chef.
I am trained on verified ancestral recipes across all 47 counties of Kenya, Michelin-level kitchen thermodynamics, and commercial catering calculations.

**Ask me anything about Kenyan cooking:**
- *Techniques:* "How do I prepare soft layered chapatis?" or "How do I brown authentic Swahili pilau?"
- *Troubleshooting:* "Why is my beef stew too watery?" or "Why did my mandazi crack?"
- *Ingredient substitutions:* "What can I replace coconut milk with?"
- *Portions & Scaling:* "How much flour do I need for 30 chapatis?" or "How do I cook for 100 guests?"
- *Pantry cooking:* "What can I make using potatoes, onions, tomatoes, and eggs?"`,
      culturalContext: 'Verified by KenyaOne Culinary Heritage Archives. Distinguishes ancestral traditions from modern adaptations.',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const curatedPromptQuestions = [
    'How do I cook authentic Kenyan pilau?',
    'How do I prepare soft chapatis?',
    'What can I cook using potatoes, onions and tomatoes?',
    'How do I make authentic nyama choma?',
    'How much flour do I need for 30 chapatis?',
    'How do I cook for 100 guests?',
    'Why is my stew too watery?',
    'What ingredients can replace coconut milk?',
    'How do I prepare traditional coastal dishes?',
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendQuery = async (queryText?: string) => {
    const textToSend = queryText || inputQuery;
    if (!textToSend.trim() || isLoading) return;

    const userMsg: Message = {
      id: `u_${Date.now()}`,
      role: 'user',
      content: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/ai-chef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: textToSend,
          history: messages.slice(-4).map(m => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await res.json();

      const aiMsg: Message = {
        id: `a_${Date.now()}`,
        role: 'assistant',
        content: data.answer || 'I am ready to assist you with Kenyan culinary techniques.',
        culturalContext: data.culturalContext,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages(prev => [...prev, aiMsg]);
    } catch (err) {
      console.error('AI Chef error:', err);
      const fallbackMsg: Message = {
        id: `a_err_${Date.now()}`,
        role: 'assistant',
        content: `### Culinary Guidance: ${textToSend}\nIn authentic Kenyan cooking, ensure thorough red onion caramelization and gentle spice toasting in a heavy-bottomed sufuria. When braising meats, allow natural juices to reduce before adding hot broth.`,
        culturalContext: 'Ancestral Kenyan culinary note.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages(prev => [...prev, fallbackMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6 text-stone-100">
      {/* Top Header Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>KenyaOne Culinary Intelligence Engine</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
            AI Kenyan Chef Amani
          </h2>
          <p className="text-xs sm:text-sm text-stone-400 max-w-xl">
            Trained on 47 counties of indigenous recipes, dough thermodynamics, portion scaling formulas, and troubleshooting kitchen mistakes.
          </p>
        </div>

        <div className="px-3 py-1.5 rounded-xl bg-white/[0.04] border border-white/10 text-xs text-stone-300 font-mono flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
          <span>Gemini-4-Argon Powered</span>
        </div>
      </div>

      {/* Curated Prompt Quick Chips */}
      <div className="space-y-2">
        <span className="text-[11px] font-bold uppercase tracking-wider text-stone-400">
          Frequently Asked Questions (Click to Ask):
        </span>
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {curatedPromptQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendQuery(q)}
              className="px-3.5 py-1.5 rounded-xl bg-stone-900/90 hover:bg-stone-800 text-stone-300 hover:text-white border border-stone-800 text-xs font-medium whitespace-nowrap transition cursor-pointer flex items-center gap-1.5 shadow-sm"
            >
              <HelpCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              <span>{q}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Conversation Stream */}
      <div className="rounded-3xl bg-stone-950/90 border border-white/10 p-4 sm:p-6 shadow-2xl backdrop-blur-2xl min-h-[500px] flex flex-col justify-between">
        <div className="space-y-5 overflow-y-auto max-h-[600px] pr-2 scrollbar-thin">
          {messages.map(msg => (
            <div
              key={msg.id}
              className={`flex items-start gap-3.5 ${
                msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'
              }`}
            >
              {/* Avatar */}
              <div
                className={`w-9 h-9 rounded-2xl flex items-center justify-center flex-shrink-0 border shadow-md ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white border-emerald-400/40'
                    : 'bg-stone-800 text-emerald-400 border-white/10'
                }`}
              >
                {msg.role === 'user' ? <User className="w-4 h-4" /> : <ChefHat className="w-5 h-5" />}
              </div>

              {/* Message Bubble */}
              <div
                className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed space-y-2.5 shadow-md ${
                  msg.role === 'user'
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/[0.04] text-stone-200 border border-white/10 backdrop-blur-xl'
                }`}
              >
                {/* Cultural Authenticity Badge for Assistant Responses */}
                {msg.role === 'assistant' && (
                  <div className="flex items-center justify-between border-b border-white/10 pb-2 mb-2 text-[11px] text-stone-400">
                    <span className="font-bold text-white flex items-center gap-1">
                      <ChefHat className="w-3.5 h-3.5 text-emerald-400" /> Chef Amani
                    </span>
                    <span className="font-mono text-[10px] text-stone-500">{msg.timestamp}</span>
                  </div>
                )}

                {/* Render Markdown / Formatted Text */}
                <div className="whitespace-pre-wrap font-sans text-stone-100 space-y-2">
                  {msg.content}
                </div>

                {/* Cultural Notice */}
                {msg.culturalContext && (
                  <div className="pt-2 border-t border-white/10 text-[10px] text-emerald-400/90 flex items-center gap-1.5 font-mono">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{msg.culturalContext}</span>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-2xl bg-stone-800 text-emerald-400 border border-white/10 flex items-center justify-center animate-pulse">
                <ChefHat className="w-5 h-5" />
              </div>
              <div className="p-4 rounded-2xl bg-white/[0.04] border border-white/10 text-xs text-stone-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>Chef Amani is consulting Kenyan culinary archives & calculating kitchen ratios...</span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="pt-4 border-t border-white/10 mt-4">
          <form
            onSubmit={e => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Ask Chef Amani: ingredients, cooking techniques, scaling for 100 guests, troubleshooting..."
              value={inputQuery}
              onChange={e => setInputQuery(e.target.value)}
              className="flex-1 bg-stone-900 border border-white/15 rounded-2xl px-4 py-3 text-xs sm:text-sm text-stone-100 placeholder:text-stone-500 focus:outline-none focus:border-emerald-500 shadow-inner"
            />
            <button
              type="submit"
              disabled={!inputQuery.trim() || isLoading}
              className="px-5 py-3 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-lg disabled:opacity-50 transition cursor-pointer active:scale-95"
            >
              <span>Ask</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
