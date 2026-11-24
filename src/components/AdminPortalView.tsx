import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Users,
  Utensils,
  MapPin,
  TrendingUp,
  FileCheck,
  Search,
} from 'lucide-react';

interface AuditItem {
  id: string;
  recipeTitle: string;
  county: string;
  contributor: string;
  technique: string;
  status: 'pending' | 'verified' | 'rejected';
}

export const AdminPortalView: React.FC = () => {
  const [auditQueue, setAuditQueue] = useState<AuditItem[]>([
    {
      id: 'aud_1',
      recipeTitle: 'Authentic Taita Kimanga cha Ndizi na Maharagwe',
      county: 'Taita Taveta (006)',
      contributor: 'Grace Mghoi',
      technique: 'Boiling green bananas with red kidney beans, mashed with roasted peanut paste.',
      status: 'pending',
    },
    {
      id: 'aud_2',
      recipeTitle: 'Embu Mukimo wa Thiru (Millet Mash)',
      county: 'Embu (014)',
      contributor: 'David Kariuki',
      technique: 'Indigenous millet grain steamed over pumpkin leaves before pounding.',
      status: 'pending',
    },
    {
      id: 'aud_3',
      recipeTitle: 'Marsabit Goat Meat Suqaar with Sabaayad',
      county: 'Marsabit (010)',
      contributor: 'Hassan Galgalo',
      technique: 'Quick-seared diced tender goat with wild cumin, served on laminated sabaayad.',
      status: 'verified',
    },
  ]);

  const handleVerify = (id: string) => {
    setAuditQueue(prev =>
      prev.map(i => (i.id === id ? { ...i, status: 'verified' } : i))
    );
  };

  const handleReject = (id: string) => {
    setAuditQueue(prev =>
      prev.map(i => (i.id === id ? { ...i, status: 'rejected' } : i))
    );
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-stone-100">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-emerald-400 font-bold uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>KenyaOne Heritage Editorial Desk & Moderation</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Frost Chef Admin Portal
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Internal editorial oversight, cultural verification audits, allergen accuracy reviews, and county coverage monitoring.
          </p>
        </div>

        <div className="px-4 py-2 rounded-xl bg-white/[0.04] border border-white/10 font-mono text-xs text-stone-300">
          Admin: <span className="text-emerald-400 font-bold">martingichuru541@gmail.com</span>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-stone-400">County Coverage</span>
          <div className="text-2xl sm:text-3xl font-black text-emerald-400 font-mono">47 / 47</div>
          <span className="text-[10px] text-stone-500">100% of counties active</span>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-stone-400">Verified Heritage</span>
          <div className="text-2xl sm:text-3xl font-black text-amber-300 font-mono">1,480</div>
          <span className="text-[10px] text-stone-500">Passed elder review</span>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-stone-400">Active Cooks Today</span>
          <div className="text-2xl sm:text-3xl font-black text-cyan-400 font-mono">8,920</div>
          <span className="text-[10px] text-stone-500">Across East Africa</span>
        </div>

        <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-1">
          <span className="text-[10px] font-mono uppercase text-stone-400">HACCP Audits</span>
          <div className="text-2xl sm:text-3xl font-black text-purple-400 font-mono">100% Pass</div>
          <span className="text-[10px] text-stone-500">Public Health Cap 242</span>
        </div>
      </div>

      {/* Cultural Heritage Verification Queue */}
      <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-white/10 space-y-5">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <h3 className="font-bold text-base text-white flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-400" />
            Community Heritage Submissions Pending Verification
          </h3>
          <span className="text-xs font-mono text-stone-400">
            {auditQueue.filter(i => i.status === 'pending').length} In Queue
          </span>
        </div>

        <div className="space-y-3">
          {auditQueue.map(item => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-stone-950 border border-stone-800 flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-xl text-left">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-sm text-white">{item.recipeTitle}</h4>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-stone-900 text-emerald-400 border border-stone-800">
                    {item.county}
                  </span>
                </div>
                <p className="text-xs text-stone-400">{item.technique}</p>
                <div className="text-[10px] text-stone-500">
                  Submitted by {item.contributor} • Requires cultural authenticity audit
                </div>
              </div>

              <div className="flex items-center gap-2 flex-shrink-0">
                {item.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleVerify(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Approve Heritage Badge</span>
                    </button>
                    <button
                      onClick={() => handleReject(item.id)}
                      className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-red-400 text-xs font-medium cursor-pointer"
                    >
                      <XCircle className="w-3.5 h-3.5" />
                      <span>Request Revisions</span>
                    </button>
                  </>
                ) : (
                  <span
                    className={`px-3 py-1 rounded-xl text-xs font-mono font-bold ${
                      item.status === 'verified'
                        ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                        : 'bg-red-500/20 text-red-300 border border-red-500/30'
                    }`}
                  >
                    {item.status === 'verified' ? '✓ Verified by Elders' : '✗ Revisions Requested'}
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
