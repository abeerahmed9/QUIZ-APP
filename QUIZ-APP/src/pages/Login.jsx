import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiMail, FiLock, FiActivity } from "react-icons/fi";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      await login(email, password);
      navigate("/quiz");
    } catch (err) {
      setError("ACCESS DENIED: Credentials Mismatched.");
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#020205] cyber-matrix-bg px-4 relative overflow-hidden">
      {/* Background Glowing Rings */}
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-purple-600/20 rounded-full blur-[140px] pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.2, 0.3, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-cyan-600/20 rounded-full blur-[140px] pointer-events-none" 
      />

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-black/90 border-2 border-purple-500/50 backdrop-blur-3xl rounded-3xl p-8 shadow-2xl neon-glow-purple z-10"
      >
        <div className="flex justify-center mb-6">
          <motion.div 
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="p-4 bg-purple-500/10 rounded-2xl border border-purple-500/40 text-purple-400"
          >
            <FiActivity size={28} />
          </motion.div>
        </div>

        {/* Brand Name - Bold & Slanted */}
        <h2 className="text-4xl font-black italic text-center tracking-wider bg-gradient-to-r from-purple-400 via-fuchsia-400 to-cyan-400 bg-clip-text text-transparent mb-1 drop-shadow-[0_0_15px_rgba(168,85,247,0.5)]">
          CORE PORTAL
        </h2>
        <p className="text-purple-400 text-center text-xs font-black italic tracking-widest mb-8 uppercase">
          SECURE VERIFICATION INTERFACE
        </p>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-red-950/60 border border-red-500/50 text-red-400 p-4 rounded-xl text-center text-xs font-black italic tracking-wide mb-5">
            {error}
          </motion.div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Block - Bold/Italic Input Headings */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-black italic mb-2 tracking-widest uppercase block drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
              IDENTITY LINK (EMAIL)
            </label>
            <div className="relative w-full">
              <FiMail className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 z-20" />
              <input 
                type="email" 
                required 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.08] border-2 border-white/40 text-white placeholder-white/70 focus:outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-all text-sm font-black italic tracking-wide shadow-inner"
                placeholder="operator@mainframe.com"
              />
            </div>
          </div>

          {/* Password Block */}
          <div className="flex flex-col">
            <label className="text-white text-sm font-black italic mb-2 tracking-widest uppercase block drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]">
              ENCRYPTION KEY (PASSWORD)
            </label>
            <div className="relative w-full">
              <FiLock className="absolute left-4 top-1/2 -translate-y-1/2 text-white/90 z-20" />
              <input 
                type="password" 
                required 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-white/[0.08] border-2 border-white/40 text-white placeholder-white/70 focus:outline-none focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-all text-sm font-black tracking-widest"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Action Button */}
          <button type="submit" className="w-full py-4 rounded-xl bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 hover:opacity-95 text-white font-black italic tracking-widest text-sm uppercase transition-all shadow-xl shadow-purple-500/40 cursor-pointer border border-white/10">
            ESTABLISH CONNECTION
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-slate-400 mt-8 text-xs font-black italic tracking-wider uppercase">
          UNREGISTERED NODE?{" "}
          <Link to="/signup" className="text-cyan-400 hover:text-cyan-300 font-black underline transition-colors decoration-2">
            INITIALIZE SYNC
          </Link>
        </p>
      </motion.div>
    </div>
  );
}