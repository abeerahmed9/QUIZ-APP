import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Navbar from "../components/Navbar";

// TOTAL QUESTIONS FIXED TO 20
const TOTAL_QUESTIONS_TO_DISPLAY = 20; 

export default function Quiz() {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);

  // 📚 20 PROGRESSIVE QUESTIONS POOL (BASIC -> MEDIUM -> HARD)
  const questionPool = [
    // --- 🟢 BASIC QUESTIONS (1 - 7) ---
    {
      id: 1,
      question: "What is the correct command to create a new Vite project?",
      options: ["npm create vite@latest", "npm start vite", "npx create-react-app", "npm new vite"],
      answer: "npm create vite@latest"
    },
    {
      id: 2,
      question: "Which hook is used to manage local state in a React functional component?",
      options: ["useEffect", "useState", "useContext", "useReducer"],
      answer: "useState"
    },
    {
      id: 3,
      question: "In React, data passed from a parent component to a child component is called what?",
      options: ["State", "Props", "Variables", "Links"],
      answer: "Props"
    },
    {
      id: 4,
      question: "Which of the following HTML tags is used to link a JavaScript file?",
      options: ["<link>", "<script>", "<js>", "<href>"],
      answer: "<script>"
    },
    {
      id: 5,
      question: "What does JSX stand for in React?",
      options: ["JavaScript XML", "Java Syntax Extension", "JavaScript Extension", "JSON XML"],
      answer: "JavaScript XML"
    },
    {
      id: 6,
      question: "Which Tailwind utility class is used to set the background color to black?",
      options: ["bg-black", "color-black", "text-black", "background-black"],
      answer: "bg-black"
    },
    {
      id: 7,
      question: "How many elements can a React component return at the top level without a fragment?",
      options: ["Only 1 element", "Up to 3 elements", "As many as you want", "No limit"],
      answer: "Only 1 element"
    },

    // --- 🟡 MEDIUM QUESTIONS (8 - 14) ---
    {
      id: 8,
      question: "What is the purpose of the dependency array in a useEffect hook?",
      options: ["To style the component", "To control when the effect runs", "To store local data", "To delete the component"],
      answer: "To control when the effect runs"
    },
    {
      id: 9,
      question: "Which hook should you use to share state across multiple components without passing props manually?",
      options: ["useRef", "useMemo", "useContext", "useCallback"],
      answer: "useContext"
    },
    {
      id: 10,
      question: "What is the default flexbox direction in Tailwind CSS when you apply the 'flex' class?",
      options: ["flex-row", "flex-col", "flex-wrap", "flex-reverse"],
      answer: "flex-row"
    },
    {
      id: 11,
      question: "How do you handle routing in a modern React application?",
      options: ["Using standard <a> tags", "Using React Router DOM", "Using window.location only", "Using state variables"],
      answer: "Using React Router DOM"
    },
    {
      id: 12,
      question: "What happens when a state variable changes in a React component?",
      options: ["The browser reloads", "The component re-renders", "The project crashes", "Nothing changes"],
      answer: "The component re-renders"
    },
    {
      id: 13,
      question: "Which array method is most commonly used to display a list of data items in JSX?",
      options: ["forEach()", "filter()", "map()", "reduce()"],
      answer: "map()"
    },
    {
      id: 14,
      question: "What is the use of the 'key' prop when rendering lists in React?",
      options: ["To style items differently", "To help React identify which items changed", "To encrypt list data", "To count the number of items"],
      answer: "To help React identify which items changed"
    },

    // --- 🔴 HARD QUESTIONS (15 - 20) ---
    {
      id: 15,
      question: "Which hook is best suited for caching the result of an expensive calculation?",
      options: ["useCallback", "useMemo", "useRef", "useReducer"],
      answer: "useMemo"
    },
    {
      id: 16,
      question: "What is the main difference between useMemo and useCallback hooks?",
      options: ["useMemo caches values, useCallback caches functions", "useMemo is faster than useCallback", "useMemo is for state, useCallback is for effects", "There is no difference"],
      answer: "useMemo caches values, useCallback caches functions"
    },
    {
      id: 17,
      question: "How can you persist values across renders without causing a component to re-render?",
      options: ["By using useState", "By using useRef", "By using useContext", "By using useLayoutEffect"],
      answer: "By using useRef"
    },
    {
      id: 18,
      question: "What is the purpose of the 'replace: true' option in React Router's navigate function?",
      options: ["It deletes the entire route database", "It replaces the current entry in the history stack", "It forces a full page reload", "It logs out the active user"],
      answer: "It replaces the current entry in the history stack"
    },
    {
      id: 19,
      question: "Which React hook is used to optimize rendering by memoizing custom event handler functions?",
      options: ["useCallback", "useTransition", "useDeferredValue", "useImperativeHandle"],
      answer: "useCallback"
    },
    {
      id: 20,
      question: "What compilation mechanism drives Vite's ultra-fast modular hot module replacement?",
      options: ["Webpack Bundler", "Esbuild native pre-bundling", "Babel Transpiler", "Rollup legacy compilation"],
      answer: "Esbuild native pre-bundling"
    }
  ];

  const activeQuestions = questionPool.slice(0, TOTAL_QUESTIONS_TO_DISPLAY);

  useEffect(() => {
    if (timeLeft === 0) {
      handleNextExecution();
      return;
    }
    const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
    return () => clearTimeout(timer);
  }, [timeLeft]);

  const handleOptionSelect = (option) => {
    setSelectedOption(option);
  };

  const handleNextExecution = () => {
    let currentScore = score;
    if (selectedOption === activeQuestions[currentIndex].answer) {
      currentScore = score + 1;
      setScore(currentScore);
    }

    if (currentIndex + 1 < activeQuestions.length) {
      setCurrentIndex(currentIndex + 1);
      setSelectedOption(null);
      setTimeLeft(30);
    } else {
      // Direct pass calculation to Result screen avoiding state lag
      navigate("/result", { state: { score: currentScore, total: activeQuestions.length } });
    }
  };

  const currentData = activeQuestions[currentIndex];

  return (
    <div className="h-screen w-full bg-[#020205] cyber-matrix-bg text-white pt-24 pb-4 px-4 flex flex-col items-center justify-center relative overflow-hidden">
      <Navbar />

      {/* Cyber Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-purple-600/10 rounded-full blur-[120px] pointer-events-none z-0" />

      <div className="w-full max-w-2xl z-10 flex flex-col justify-center">
        
        {/* Progress Bar */}
        <div className="w-full h-2 bg-white/[0.03] rounded-full border border-white/10 mb-4 overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${((currentIndex + 1) / activeQuestions.length) * 100}%` }}
            className="h-full bg-gradient-to-r from-cyan-400 via-fuchsia-500 to-purple-600 shadow-[0_0_15px_rgba(168,85,247,0.6)]"
          />
        </div>

        {/* Status Rows */}
        <div className="flex justify-between items-center mb-4 font-black italic tracking-widest text-[11px] uppercase">
          <span className="text-cyan-400 bg-cyan-500/10 px-3 py-1.5 border-2 border-cyan-500/30 rounded-xl">
            QUESTION: {currentIndex + 1} / {activeQuestions.length}
          </span>
          <span className={`px-3 py-1.5 border-2 rounded-xl ${timeLeft <= 10 ? 'text-red-400 border-red-500/40 bg-red-500/10 animate-pulse' : 'text-purple-400 border-purple-500/30 bg-purple-500/10'}`}>
            TIME LEFT: {timeLeft}s
          </span>
        </div>

        {/* Central Card Block */}
        <motion.div 
          key={currentIndex}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full bg-black/85 border-2 border-purple-500/40 rounded-2xl p-6 shadow-2xl neon-glow-purple mb-4"
        >
          {/* Question Text - Pure Bold White */}
          <h1 className="text-xl md:text-2xl font-black text-white leading-snug tracking-wide mb-6 drop-shadow-[0_2px_10px_rgba(255,255,255,0.4)]">
            {currentData.question}
          </h1>

          {/* Options Stack */}
          <div className="space-y-3">
            {currentData.options.map((option, idx) => {
              const isSelected = selectedOption === option;
              return (
                <button
                  key={idx}
                  onClick={() => handleOptionSelect(option)}
                  className={`w-full text-left py-3 px-4 rounded-xl border-2 transition-all duration-200 font-black italic text-xs tracking-wider flex items-center justify-between group cursor-pointer ${
                    isSelected 
                      ? 'bg-gradient-to-r from-purple-600/30 via-fuchsia-600/20 to-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.25)]' 
                      : 'bg-white/[0.02] border-white/10 text-slate-300 hover:text-white hover:border-purple-400/80 hover:bg-white/[0.04]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`text-[10px] font-black not-italic px-1.5 py-0.5 rounded ${isSelected ? 'bg-cyan-500/20 text-cyan-400' : 'bg-white/5 text-purple-400'}`}>
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    <span className="drop-shadow-[0_1px_4px_rgba(255,255,255,0.1)]">{option}</span>
                  </div>
                  <div className={`w-3 h-3 rounded-full border-2 transition-all ${isSelected ? 'bg-cyan-400 border-cyan-400 shadow-[0_0_6px_rgba(6,182,212,0.8)]' : 'border-slate-600'}`} />
                </button>
              );
            })}
          </div>
        </motion.div>

        {/* Action Button Row */}
        <div className="flex justify-end">
          <button
            onClick={handleNextExecution}
            disabled={selectedOption === null}
            className={`px-6 py-3 rounded-xl font-black italic tracking-widest text-[11px] uppercase transition-all border border-white/10 ${
              selectedOption !== null
                ? 'bg-gradient-to-r from-purple-600 via-fuchsia-600 to-cyan-500 text-white cursor-pointer hover:opacity-95 shadow-lg'
                : 'bg-white/5 text-slate-500 cursor-not-allowed border-white/5'
            }`}
          >
            {currentIndex + 1 === activeQuestions.length ? "SUBMIT QUIZ" : "NEXT QUESTION"}
          </button>
        </div>

      </div>
    </div>
  );
}