import { useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiAward, FiCheckCircle, FiXCircle, FiRefreshCw } from "react-icons/fi";
import Navbar from "../components/Navbar";

export default function Result() {
  const location = useLocation();
  const navigate = useNavigate();

  // Score extraction logic fixes
  const score = location.state?.score ?? 0;
  const total = location.state?.total ?? 20; 
  
  const incorrect = total - score;
  const percentage = total > 0 ? Math.round((score / total) * 100) : 0;
  const isPassed = percentage >= 50;

  return (
    <div className="h-screen w-full bg-[#020205] cyber-matrix-bg text-white pt-24 pb-4 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />

      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] rounded-full blur-[140px] pointer-events-none z-0 ${isPassed ? 'bg-emerald-600/10' : 'bg-red-600/10'}`} />

      <div className="w-full max-w-2xl z-10 flex flex-col justify-center">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className={`w-full bg-black/85 border-2 rounded-2xl p-6 md:p-8 shadow-2xl text-center ${isPassed ? 'border-emerald-500/40 neon-glow-emerald' : 'border-red-500/40 neon-glow-purple'}`}
        >
          {/* Main Icon */}
          <div className="flex justify-center mb-4">
            <div className={`p-4 rounded-2xl border-2 ${isPassed ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400' : 'bg-red-500/10 border-red-500/40 text-red-400'}`}>
              <FiAward size={32} />
            </div>
          </div>

          {/* Clean Simplified Headings */}
          <h1 className="text-3xl md:text-4xl font-black italic tracking-wider text-white mb-1 drop-shadow-[0_2px_12px_rgba(255,255,255,0.4)] uppercase">
            {isPassed ? "QUIZ COMPLETED!" : "QUIZ FAILED!"}
          </h1>
          <p className={`text-xs font-black italic tracking-widest uppercase mb-6 ${isPassed ? 'text-emerald-400' : 'text-red-400'}`}>
            {isPassed ? "CONGRATULATIONS! YOU PASSED THE TEST" : "NEED MORE PRACTICE! TRY AGAIN"}
          </p>

          {/* Simplified Grid boxes */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6">
            
            <div className="bg-white/[0.02] border-2 border-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
              <span className="text-[10px] font-black italic text-slate-400 tracking-wider uppercase mb-1">TOTAL QUESTIONS</span>
              <span className="text-xl font-black text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{total}</span>
            </div>

            <div className="bg-white/[0.02] border-2 border-white/5 rounded-xl p-3 flex flex-col items-center justify-center">
              <div className="flex items-center gap-1.5 text-emerald-400 text-[10px] font-black italic tracking-wider uppercase mb-1">
                <FiCheckCircle size={10} /> CORRECT
              </div>
              <span className="text-xl font-black text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{score}</span>
            </div>

            <div className="bg-white/[0.02] border-2 border-white/5 rounded-xl p-3 flex flex-col items-center justify-center col-span-2 md:col-span-1">
              <div className="flex items-center gap-1.5 text-red-400 text-[10px] font-black italic tracking-wider uppercase mb-1">
                <FiXCircle size={10} /> WRONG
              </div>
              <span className="text-xl font-black text-white drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">{incorrect}</span>
            </div>

          </div>

          {/* Simple Score Percentage Display */}
          <div className="w-full bg-gradient-to-r from-white/[0.01] via-white/[0.04] to-white/[0.01] border-y-2 border-white/5 py-4 mb-6">
            <span className="text-[10px] font-black italic text-slate-400 tracking-widest uppercase block mb-1">YOUR SCORE</span>
            <span className={`text-4xl font-black italic tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)] ${isPassed ? 'text-cyan-400' : 'text-fuchsia-400'}`}>
              {percentage}%
            </span>
          </div>

          {/* Restart Button */}
          <div className="flex justify-center">
            <button
              onClick={() => navigate("/quiz")}
              className="flex items-center justify-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 hover:opacity-95 text-white font-black italic tracking-widest text-xs uppercase transition-all shadow-xl shadow-purple-500/30 cursor-pointer border border-white/10"
            >
              <FiRefreshCw /> RESTART QUIZ
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
}