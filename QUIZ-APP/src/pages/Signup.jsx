import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUserPlus, FiMail, FiLock } from "react-icons/fi";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await signup(email, password);
      navigate("/quiz");
    } catch (err) {
      setError("SYNC FAULT: System node deployment failed.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020205] cyber-matrix-bg px-4 relative overflow-hidden">
      {/* Background Ambient Cyber Rings */}
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/90 border-2 border-cyan-500/50 backdrop-blur-3xl rounded-3xl p-8 shadow-2xl neon-glow-cyan z-10"
      >
        <div className="flex justify-center mb-4">
          <div className="p-3.5 bg-cyan-500/10 rounded-2xl border border-cyan-500/40 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <FiUserPlus size={26} />
          </div>
        </div>

        {/* Title - Heavy Bold & Slanted */}
        <h2 className="text-4xl font-black italic text-center tracking-wider bg-gradient-to-r from-cyan-400 via-teal-400 to-purple-400 bg-clip-text text-transparent mb-1 drop-shadow-[0_0_15px_rgba(6,182,212,0.5)]">
          REGISTER IDENTITY
        </h2>
        <p className="text-cyan-400 text-center text-xs font-black italic tracking-widest mb-8 uppercase">
          CREATING NEW SECURITY INSTANCE
        </p>

        {error && (
          <div className="bg-red-950/60 border border-red-500/50 text-red-400 p-3.5 rounded-xl text-center text-xs font-black italic tracking-wide mb-5">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Target Assignment Input */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-black italic mb-2 tracking-widest uppercase block drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
              TARGET ASSIGNMENT (EMAIL)
            </label>
            <div className="relative w-full">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 z-20" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.08] border-2 border-white/40 text-white placeholder-white/70 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 transition-all text-sm font-black italic tracking-wide shadow-inner"
                placeholder="operator@mainframe.com"
              />
            </div>
          </div>

          {/* Security Allocation Input */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-black italic mb-2 tracking-widest uppercase block drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
              SECURITY ALLOCATION (PASSWORD)
            </label>
            <div className="relative w-full">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 z-20" />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.08] border-2 border-white/40 text-white placeholder-white/70 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all text-sm font-black tracking-widest"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Action Button */}
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 via-teal-500 to-purple-600 hover:opacity-95 text-white font-black italic tracking-widest text-sm uppercase transition-all shadow-xl shadow-cyan-500/40 cursor-pointer border border-white/10">
            DEPLOY NEW NODE
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-slate-400 mt-8 text-xs font-black italic tracking-wider uppercase">
          CREDENTIALS ACTIVE?{" "}
          <Link to="/login" className="text-purple-400 hover:text-purple-300 font-black underline transition-colors decoration-2">
            RETURN TO ACCESS
          </Link>
        </p>
      </motion.div>
    </div>
  );
}