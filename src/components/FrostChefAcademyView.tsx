import React, { useState } from 'react';
import {
  GraduationCap,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  User,
  Star,
  ShieldCheck,
  ChevronRight,
  Download,
  FileCheck,
  Play,
  X,
} from 'lucide-react';
import { ACADEMY_COURSES, AcademyCourse } from '../data/academyCourses.ts';

export const FrostChefAcademyView: React.FC = () => {
  const [selectedCourse, setSelectedCourse] = useState<AcademyCourse>(ACADEMY_COURSES[0]);
  const [selectedModuleIndex, setSelectedModuleIndex] = useState(0);
  const [showCertificateModal, setShowCertificateModal] = useState(false);
  const [certifiedStudentName, setCertifiedStudentName] = useState('Martin Gichuru');
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [selectedQuizAnswer, setSelectedQuizAnswer] = useState<number | null>(null);

  const activeModule = selectedCourse.modules[selectedModuleIndex] || selectedCourse.modules[0];

  return (
    <div className="max-w-6xl mx-auto space-y-8 text-stone-100">
      {/* Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-stone-900/90 via-stone-900 to-stone-950 border border-white/10 backdrop-blur-2xl shadow-xl flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center space-x-2 text-xs font-mono text-amber-400 font-bold uppercase tracking-wider">
            <GraduationCap className="w-4 h-4" />
            <span>KenyaOne Culinary Institute & Certification</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-white tracking-tight">
            Frost Chef Academy
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
            Professional culinary education in authentic Kenyan flatbread lamination, dum pilau thermodynamics, open-fire pit roasting, and commercial HACCP food safety.
          </p>
        </div>

        <button
          onClick={() => setShowCertificateModal(true)}
          className="px-5 py-3 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-black text-xs sm:text-sm flex items-center gap-2 shadow-xl border border-amber-400/40 transition cursor-pointer active:scale-95 flex-shrink-0"
        >
          <Award className="w-4 h-4" />
          <span>My Verified Certificates</span>
        </button>
      </div>

      {/* Courses Catalog Selector */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {ACADEMY_COURSES.map(course => {
          const isSelected = selectedCourse.id === course.id;
          return (
            <div
              key={course.id}
              onClick={() => {
                setSelectedCourse(course);
                setSelectedModuleIndex(0);
                setQuizSubmitted(false);
                setSelectedQuizAnswer(null);
              }}
              className={`p-5 rounded-2xl border transition-all duration-200 cursor-pointer text-left space-y-3 group ${
                isSelected
                  ? 'bg-white/10 border-amber-500/60 shadow-lg shadow-amber-950/30'
                  : 'bg-stone-900/80 hover:bg-stone-900 border-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono">
                <span className="text-amber-400 font-bold">{course.level}</span>
                <span className="text-stone-400 flex items-center gap-1">
                  <Clock className="w-3 h-3" /> {course.duration}
                </span>
              </div>

              <div>
                <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-amber-300 transition line-clamp-1">
                  {course.title}
                </h4>
                <div className="text-[11px] text-stone-400 mt-1 flex items-center gap-1">
                  <User className="w-3 h-3 text-stone-500" />
                  <span>{course.instructor}</span>
                </div>
              </div>

              <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px]">
                <span className="text-stone-400">{course.modules.length} Modules</span>
                <span className="text-amber-400 font-semibold flex items-center group-hover:translate-x-1 transition-transform">
                  Study <ChevronRight className="w-3.5 h-3.5 ml-0.5" />
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Course Deep-Dive Study Room */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Course Syllabus Navigation (4 cols) */}
        <div className="lg:col-span-4 space-y-3">
          <div className="p-5 rounded-2xl bg-stone-900/80 border border-white/10 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-white">
              Course Modules & Syllabus
            </h4>

            <div className="space-y-2">
              {selectedCourse.modules.map((mod, idx) => {
                const isActive = selectedModuleIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedModuleIndex(idx);
                      setQuizSubmitted(false);
                      setSelectedQuizAnswer(null);
                    }}
                    className={`p-3 rounded-xl border text-left cursor-pointer transition ${
                      isActive
                        ? 'bg-amber-500/20 border-amber-500/50 text-white'
                        : 'bg-stone-950/80 border-white/5 hover:border-white/15 text-stone-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[10px] font-mono text-stone-400">
                      <span>Module 0{idx + 1}</span>
                      <span>{mod.duration}</span>
                    </div>
                    <div className="font-semibold text-xs mt-1 line-clamp-1">{mod.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right: Active Lesson & Knowledge Check (8 cols) */}
        <div className="lg:col-span-8 space-y-6">
          <div className="p-6 sm:p-8 rounded-3xl bg-stone-900/90 border border-white/15 backdrop-blur-xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">
                  Module {selectedModuleIndex + 1} of {selectedCourse.modules.length}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white mt-1">
                  {activeModule.title}
                </h3>
              </div>
              <span className="text-xs font-mono text-stone-400">{activeModule.duration}</span>
            </div>

            {/* Key Skills Taught */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Core Competencies & Techniques Mastered:
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {activeModule.keySkills.map((skill, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-stone-950 border border-white/5 flex items-start gap-2 text-xs text-stone-200"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Knowledge Check / Interactive Quiz */}
            <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/10 space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 font-mono">
                  Module Knowledge Check
                </h4>
                <span className="text-[10px] text-stone-400">100% Required for Certification</span>
              </div>

              <p className="text-xs text-stone-200 font-medium">
                Question: What is the primary thermodynamic reason for letting chapati dough rest under a damp cloth for at least 20 minutes before rolling?
              </p>

              <div className="space-y-2 text-xs">
                {[
                  'To allow gluten protein strands to relax and fully hydrate, preventing elastic snapback.',
                  'To cause the dough to ferment and double in size like bread yeast.',
                  'To evaporate all liquid moisture so the dough becomes crunchy.',
                ].map((ans, idx) => (
                  <div
                    key={idx}
                    onClick={() => !quizSubmitted && setSelectedQuizAnswer(idx)}
                    className={`p-3 rounded-xl border cursor-pointer transition flex items-center justify-between ${
                      selectedQuizAnswer === idx
                        ? 'bg-amber-500/20 border-amber-500 text-white font-medium'
                        : 'bg-stone-950 border-stone-800 text-stone-300 hover:border-white/20'
                    }`}
                  >
                    <span>{ans}</span>
                    <input
                      type="radio"
                      name="quiz"
                      checked={selectedQuizAnswer === idx}
                      onChange={() => setSelectedQuizAnswer(idx)}
                      className="accent-amber-500"
                    />
                  </div>
                ))}
              </div>

              {!quizSubmitted ? (
                <button
                  onClick={() => setQuizSubmitted(true)}
                  disabled={selectedQuizAnswer === null}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 disabled:opacity-40 text-stone-950 font-bold text-xs transition cursor-pointer"
                >
                  Submit Answer
                </button>
              ) : (
                <div className="p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-500/40 text-xs text-emerald-300 space-y-1">
                  <div className="font-bold flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>Correct! Gluten relaxation allows paper-thin rolling without dough recoil.</span>
                  </div>
                  <button
                    onClick={() => setShowCertificateModal(true)}
                    className="text-amber-300 hover:underline font-bold text-[11px] block pt-1"
                  >
                    View Official Certificate for {selectedCourse.title} →
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Official Certificate Modal */}
      {showCertificateModal && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-stone-900 via-stone-950 to-black border-2 border-amber-500/50 rounded-3xl max-w-2xl w-full p-8 text-stone-100 shadow-[0_25px_70px_rgba(245,158,11,0.25)] space-y-6 text-center relative">
            <button
              onClick={() => setShowCertificateModal(false)}
              className="absolute top-4 right-4 p-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-16 h-16 rounded-3xl bg-amber-500/20 text-amber-400 border border-amber-500/40 mx-auto flex items-center justify-center">
              <Award className="w-8 h-8" />
            </div>

            <div className="space-y-1">
              <div className="text-[11px] font-mono tracking-widest uppercase text-amber-400 font-bold">
                KENYAONE — FROST CHEF CULINARY ACADEMY
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                Certificate of Gastronomic Mastery
              </h2>
              <p className="text-xs text-stone-400">
                Accredited pursuant to KenyaOne East African Culinary Heritage Standards
              </p>
            </div>

            <div className="py-4 border-y border-white/10 space-y-2">
              <div className="text-xs text-stone-400 font-serif italic">This is proudly awarded to:</div>
              <div className="text-2xl sm:text-3xl font-black text-amber-200 tracking-wide font-sans">
                {certifiedStudentName}
              </div>
              <p className="text-xs text-stone-300 max-w-md mx-auto">
                for demonstrating exceptional technical competence in <strong className="text-white">{selectedCourse.title}</strong>, including dough hydration thermodynamics, heat control, and traditional Kenyan flavor balance.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs font-mono text-stone-400">
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="block text-[10px] text-stone-500 uppercase">Lead Master Instructor</span>
                <span className="text-white font-bold">{selectedCourse.instructor}</span>
              </div>
              <div className="p-3 rounded-xl bg-white/[0.02] border border-white/5">
                <span className="block text-[10px] text-stone-500 uppercase">Verification Registry</span>
                <span className="text-emerald-400 font-bold">K1-FC-2026-0881-A</span>
              </div>
            </div>

            <button
              onClick={() => {
                window.print();
              }}
              className="px-6 py-3 rounded-2xl bg-amber-500 hover:bg-amber-400 text-stone-950 font-black text-xs flex items-center justify-center gap-2 mx-auto shadow-lg cursor-pointer"
            >
              <Download className="w-4 h-4" />
              <span>Print Official Certificate</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
