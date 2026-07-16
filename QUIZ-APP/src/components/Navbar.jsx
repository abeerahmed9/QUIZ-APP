import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { FiLogOut, FiAward } from "react-icons/fi";

export default function Navbar() {
  // Corrected 'user' to 'currentUser' to match AuthContext definition
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/login");
    } catch (err) {
      console.error("TERMINAL DISCONNECT FAULT:", err);
    }
  };

  return (
    <nav className="w-full py-4 px-8 bg-black/60 backdrop-blur-xl border-b-2 border-purple-500/30 flex justify-between items-center fixed top-0 left-0 z-50 shadow-[0_4px_30px_rgba(168,85,247,0.1)]">
      {/* Brand Logo - Slanted & Neon Glowing */}
      <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate("/")}>
        <FiAward className="text-cyan-400 text-2xl drop-shadow-[0_0_8px_rgba(6,182,212,0.6)]" />
        <span className="text-2xl font-black italic tracking-wider bg-gradient-to-r from-cyan-400 via-fuchsia-400 to-purple-500 bg-clip-text text-transparent drop-shadow-[0_0_10px_rgba(244,63,94,0.2)]">
          QUIZIFY
        </span>
      </div>

      {/* User Information & Terminal Disconnect Trigger */}
      {currentUser && (
        <div className="flex items-center gap-6">
          {/* Email - Pure White, Bold & Slanted */}
          <span className="text-sm font-black italic text-white hidden md:block tracking-wide drop-shadow-[0_0_5px_rgba(255,255,255,0.3)] bg-white/[0.05] px-3 py-1.5 rounded-lg border border-white/10">
            NODE: {currentUser.email.toUpperCase()}
          </span>

          {/* Logout Button - Extra Heavy Slanted Destructive Action */}
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-red-600/20 to-rose-600/20 hover:from-red-600 hover:to-rose-600 text-red-400 hover:text-white border-2 border-red-500/40 hover:border-red-500 transition-all text-xs font-black italic tracking-widest uppercase cursor-pointer shadow-[0_0_15px_rgba(239,68,68,0.1)] hover:shadow-[0_0_20px_rgba(239,68,68,0.4)]"
          >
            <FiLogOut className="stroke-[3]" /> TERMINAL DISCONNECT
          </button>
        </div>
      )}
    </nav>
  );
}