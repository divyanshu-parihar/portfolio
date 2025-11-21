import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, 
  Menu, 
  X, 
  Github, 
  Linkedin, 
  Mail, 
  ExternalLink, 
  ChevronDown,
  Terminal,
  Code,
  Cpu,
  Database,
  Layers,
  Star,
  Sparkles,
  MessageSquare,
  Send
} from 'lucide-react';

// --- GEMINI API SETUP ---
const GEMINI_API_KEY = "AIzaSyA2zNIizyKceH58SykiKWnoUQj4IxC3gAs"; // Key provided by environment

async function callGemini(prompt, systemContext = "") {
  if (!GEMINI_API_KEY) {
    console.error("API Key missing");
    return "Error: API Key missing.";
  }

  const fullPrompt = `${systemContext}\n\nUser: ${prompt}\n\nAnswer:`;

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: fullPrompt }] }]
        })
      }
    );

    if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
    }

    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't generate a response.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "System overloaded. Please try again later.";
  }
}

// --- ABSTRACT VISUAL COMPONENTS ---

const AbstractCrypto = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full text-neutral-800 group-hover:text-neutral-600 transition-colors duration-700">
    <defs>
      <pattern id="grid-crypto" width="20" height="20" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill="currentColor" className="text-neutral-900" />
      </pattern>
    </defs>
    <rect width="400" height="400" fill="url(#grid-crypto)" opacity="0.3" />
    {/* Abstract Nodes */}
    <circle cx="200" cy="200" r="80" stroke="currentColor" strokeWidth="2" fill="none" />
    <circle cx="200" cy="200" r="130" stroke="currentColor" strokeWidth="1" strokeDasharray="8 8" fill="none" className="animate-spin-slow opacity-50" />
    <line x1="200" y1="120" x2="200" y2="280" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <line x1="120" y1="200" x2="280" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.3" />
    <circle cx="260" cy="200" r="15" fill="currentColor" opacity="0.6" />
    <circle cx="140" cy="200" r="15" fill="currentColor" opacity="0.6" />
  </svg>
);

const AbstractStrategy = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full text-neutral-800 group-hover:text-neutral-600 transition-colors duration-700">
     <line x1="50" y1="350" x2="350" y2="350" stroke="currentColor" strokeWidth="2" />
     {/* Rising Columns */}
     <rect x="100" y="250" width="40" height="100" fill="currentColor" opacity="0.3" className="group-hover:translate-y-[-10px] transition-transform duration-500" />
     <rect x="160" y="180" width="40" height="170" fill="currentColor" opacity="0.5" className="group-hover:translate-y-[-20px] transition-transform duration-500 delay-75" />
     <rect x="220" y="100" width="40" height="250" fill="currentColor" opacity="0.8" className="group-hover:translate-y-[-30px] transition-transform duration-500 delay-150" />
     {/* Trend Line */}
     <path d="M80 280 L180 180 L240 100" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="4 4" opacity="0.5" />
  </svg>
);

const AbstractBot = () => (
  <svg viewBox="0 0 400 400" className="w-full h-full text-neutral-800 group-hover:text-neutral-600 transition-colors duration-700">
    <rect x="130" y="130" width="140" height="140" stroke="currentColor" strokeWidth="2" fill="none" />
    <rect x="150" y="150" width="100" height="100" fill="currentColor" opacity="0.4" />
    {/* Crosshairs */}
    <line x1="200" y1="0" x2="200" y2="400" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    <line x1="0" y1="200" x2="400" y2="200" stroke="currentColor" strokeWidth="1" opacity="0.2" />
    {/* Pulse Point */}
    <circle cx="200" cy="200" r="4" fill="white" className="animate-pulse" />
    <path d="M130 130 L110 110 M270 130 L290 110 M130 270 L110 290 M270 270 L290 290" stroke="currentColor" strokeWidth="2" />
  </svg>
);

// --- DATA ---

const REVIEWS = [
  {
    text: "Great experience, super prompt communication!",
    author: "Client",
    role: "Upwork"
  },
  {
    text: "Very good communication, delivered on time. It was nice working with you!",
    author: "Client",
    role: "Upwork"
  },
  {
    text: "Divyanshu developed a Telegram bot for me. Always professional and very responsive. Code was easy to understand and ran with no problem.",
    author: "Client",
    role: "Telegram Bot Project"
  },
  {
    text: "Delivered the perfect script I was looking for. Even helped me set it up on my system. Definitely looking forward to working with him again.",
    author: "Client",
    role: "Scripting Project"
  },
  {
    text: "Excellent. Extremely responsive, timely and helpful. Excellent knowledge of OAuth and APIs for twitch, youtube, tik tok.",
    author: "Client",
    role: "API Integration"
  },
  {
    text: "Third time working with him and I will keep coming back. Fast delivery, great communication. A 20/10 experience.",
    author: "xangxls",
    role: "United States"
  },
  {
    text: "He was super fast and responsive.",
    author: "devonscott",
    role: "United States"
  },
  {
    text: "Amazing work, I'm very proud of em.",
    author: "juanavina951",
    role: "United States"
  }
];

const PROJECTS = [
  {
    id: 1,
    title: "Crypto Exchange",
    category: "DeFi Architecture",
    description: "High-performance multi-chain exchange. Implemented custom fee logic reducing user costs by 30%.",
    tech: ["Go", "Ethereum", "PostgreSQL"],
    year: "2024",
    Visual: AbstractCrypto
  },
  {
    id: 2,
    title: "Strategy Executor",
    category: "FinTech Platform",
    description: "Real-time stock strategy execution engine. Optimized portfolio management efficiency by 20% for retail traders.",
    tech: ["React", "TypeScript", "Firebase"],
    year: "2024",
    Visual: AbstractStrategy
  },
  {
    id: 3,
    title: "Solana Trading Bot",
    category: "HFT Algorithm",
    description: "Event-driven trading bot on Solana. Achieved sub-15ms latency using Rust and AWS ECS containers.",
    tech: ["Rust", "gRPC", "Redis"],
    year: "2025",
    Visual: AbstractBot
  }
];

const EXPERIENCE = [
  {
    company: "CoinRock",
    role: "Software Engineer",
    period: "2024 - 2025",
    description: "Architected a high-frequency Solana trading platform. Reduced system latency by 15ms through an event-driven Rust/gRPC pipeline."
  },
  {
    company: "Google (Bard)",
    role: "Contract Engineer",
    period: "2023 - 2024",
    description: "Optimized AI training workflows. Conducted 1000+ hours of code review, slashing production error rates by 15%."
  },
  {
    company: "WordOnTheBlock",
    role: "Backend Engineer",
    period: "2023 - 2023",
    description: "Built secure auth microservices boosting user acquisition by 35%. Optimized PostgreSQL queries for 40% faster data retrieval."
  }
];

// --- COMPONENTS ---

const Cube = () => {
  return (
    <div className="cube-container w-full h-full flex items-center justify-center perspective-1000">
      <div className="cube relative w-40 h-40 md:w-64 md:h-64 transform-style-3d animate-spin-slow">
        {/* Front */}
        <div className="absolute inset-0 border-2 border-white bg-black/80 translate-z-half flex items-center justify-center backface-hidden">
          <Terminal size={48} className="text-white opacity-50" />
        </div>
        {/* Back */}
        <div className="absolute inset-0 border-2 border-neutral-800 bg-black/80 -translate-z-half rotate-y-180 flex items-center justify-center backface-hidden">
           <Code size={48} className="text-neutral-600" />
        </div>
        {/* Right */}
        <div className="absolute inset-0 border-2 border-white bg-neutral-900/80 rotate-y-90 translate-x-half flex items-center justify-center backface-hidden">
           <Cpu size={48} className="text-white opacity-50" />
        </div>
        {/* Left */}
        <div className="absolute inset-0 border-2 border-neutral-800 bg-neutral-900/80 -rotate-y-90 -translate-x-half flex items-center justify-center backface-hidden">
           <Database size={48} className="text-neutral-600" />
        </div>
        {/* Top */}
        <div className="absolute inset-0 border-2 border-white bg-neutral-800/80 rotate-x-90 -translate-y-half flex items-center justify-center backface-hidden">
           <Layers size={48} className="text-white opacity-50" />
        </div>
        {/* Bottom */}
        <div className="absolute inset-0 border-2 border-neutral-800 bg-neutral-800/80 -rotate-x-90 translate-y-half flex items-center justify-center backface-hidden">
           <div className="w-2 h-2 bg-white rounded-full" />
        </div>
      </div>
    </div>
  );
};

const ReviewCard = ({ review }) => (
  <div className="w-[350px] md:w-[450px] bg-neutral-900 border border-neutral-800 p-8 mx-4 flex-shrink-0 hover:border-white transition-colors duration-300 group whitespace-normal">
    <div className="flex gap-1 text-white mb-4">
      {[1, 2, 3, 4, 5].map(i => <Star key={i} size={14} fill="currentColor" />)}
    </div>
    <p className="text-neutral-300 text-lg font-light leading-relaxed mb-6 group-hover:text-white transition-colors">
      "{review.text}"
    </p>
    <div className="flex items-center justify-between mt-auto border-t border-neutral-800 pt-4">
      <div>
        <div className="text-white font-bold uppercase tracking-wider text-sm">{review.author}</div>
        <div className="text-neutral-500 text-xs uppercase tracking-widest">{review.role}</div>
      </div>
      <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  </div>
);

const AIModal = ({ project, onClose }) => {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!query.trim()) return;
    setLoading(true);
    const systemContext = `You are Divyanshu Parihar, the developer of the project titled "${project.title}". 
    Project Description: ${project.description}. 
    Tech Stack: ${project.tech.join(", ")}. 
    Answer the user's question about this project technically and professionally. Keep it concise (under 50 words).`;
    
    const res = await callGemini(query, systemContext);
    setResponse(res);
    setLoading(false);
  };

  return (
    <div className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-white w-full max-w-lg p-6 rounded-lg relative shadow-2xl shadow-white/10">
        <button onClick={onClose} className="absolute top-4 right-4 text-neutral-400 hover:text-white">
          <X size={24} />
        </button>
        <div className="flex items-center gap-2 mb-6 text-[#ccff00]">
           <Sparkles size={20} className="animate-pulse" />
           <h3 className="text-xl font-bold uppercase tracking-widest">Ask the Architect</h3>
        </div>
        
        <p className="text-neutral-400 text-sm mb-4">
          Ask me anything about <span className="text-white font-bold">{project.title}</span>. I can explain the architecture, tech choices, or challenges faced.
        </p>

        <div className="space-y-4">
          {response && (
            <div className="p-4 bg-neutral-800 rounded border-l-2 border-[#ccff00] text-neutral-200 text-sm leading-relaxed animate-fade-in">
              {response}
            </div>
          )}
          
          <div className="relative">
            <input 
              type="text" 
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleAsk()}
              placeholder="e.g., How did you handle latency?"
              className="w-full bg-black border border-neutral-700 p-4 pr-12 text-white focus:border-[#ccff00] outline-none transition-colors"
            />
            <button 
              onClick={handleAsk}
              disabled={loading}
              className="absolute right-2 top-2 bottom-2 px-3 bg-neutral-800 hover:bg-neutral-700 text-white rounded flex items-center justify-center disabled:opacity-50 transition-colors"
            >
              {loading ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <Send size={16} />}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Navbar = ({ isScrolled, toggleMenu }) => (
  <nav className={`fixed top-0 left-0 w-full z-40 px-6 md:px-12 py-6 flex justify-between items-center mix-blend-difference text-white transition-all duration-300 ${isScrolled ? 'py-4' : 'py-6'}`}>
    <div className="font-bold text-xl tracking-tighter flex items-center gap-3">
      <div className="w-4 h-4 bg-white" />
      <span className="uppercase tracking-widest">Divyanshu P.</span>
    </div>
    <button onClick={toggleMenu} className="group flex items-center gap-3 uppercase text-xs font-bold tracking-widest hover:text-neutral-400 transition-colors">
      Menu
      <div className="space-y-1">
        <div className="w-6 h-0.5 bg-white group-hover:w-8 transition-all" />
        <div className="w-6 h-0.5 bg-white group-hover:w-4 transition-all ml-auto" />
      </div>
    </button>
  </nav>
);

const FullScreenMenu = ({ isOpen, toggleMenu }) => (
  <div className={`fixed inset-0 z-50 bg-white text-black flex flex-col justify-center items-center transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${isOpen ? 'translate-y-0' : '-translate-y-full'}`}>
    <button onClick={toggleMenu} className="absolute top-8 right-8 p-2 hover:rotate-90 transition-transform duration-300">
      <X size={32} strokeWidth={1.5} />
    </button>
    <div className="flex flex-col items-center space-y-2">
      {['Work', 'Experience', 'Reviews', 'Contact'].map((item) => (
        <a 
          key={item}
          href={`#${item.toLowerCase()}`} 
          onClick={toggleMenu}
          className="text-6xl md:text-8xl font-black tracking-tighter hover:tracking-widest transition-all duration-500 uppercase"
        >
          {item}
        </a>
      ))}
    </div>
  </div>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [pitchCompany, setPitchCompany] = useState("");
  const [pitchResult, setPitchResult] = useState("");
  const [pitchLoading, setPitchLoading] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const generatePitch = async () => {
      if(!pitchCompany) return;
      setPitchLoading(true);
      const prompt = `Write a short, punchy, professional cold email intro from Divyanshu Parihar (Full Stack Developer, Top Freelancer) to a recruiter at ${pitchCompany}. Mention experience with High Frequency Trading and Scalable Systems. Keep it under 50 words.`;
      const res = await callGemini(prompt);
      setPitchResult(res);
      setPitchLoading(false);
  };

  return (
    <div className="bg-black min-h-screen text-white font-sans selection:bg-white selection:text-black overflow-x-hidden">
      
      <FullScreenMenu isOpen={isMenuOpen} toggleMenu={() => setIsMenuOpen(false)} />
      <Navbar isScrolled={isScrolled} toggleMenu={() => setIsMenuOpen(true)} />
      
      {activeProject && <AIModal project={activeProject} onClose={() => setActiveProject(null)} />}

      {/* HERO SECTION */}
      <header className="relative min-h-screen w-full flex flex-col md:flex-row px-6 md:px-12 pt-24 pb-12 border-b border-neutral-900">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none z-0" />

        {/* Left Content */}
        <div className="relative z-10 w-full md:w-1/2 flex flex-col justify-center">
          <div className="inline-block mb-6">
            <div className="flex items-center gap-2 px-3 py-1 border border-neutral-800 rounded-full w-fit bg-neutral-900/50 backdrop-blur-md">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
              <span className="text-xs font-mono text-neutral-400 uppercase tracking-wider">Available for work</span>
            </div>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
            DIVYANSHU <br/>
            <span className="text-neutral-600">PARIHAR</span>
          </h1>
          
          <p className="text-lg text-neutral-400 max-w-md leading-relaxed border-l border-neutral-800 pl-6 mb-12">
            Top 0.3% Freelance Developer specializing in scalable backend infrastructure, cloud systems, and high-frequency trading architectures.
          </p>

          <div className="flex gap-6">
            <a href="#contact" className="bg-white text-black px-8 py-4 font-bold uppercase tracking-widest text-xs hover:bg-neutral-200 transition-colors">
              Start Project
            </a>
            <a href="#work" className="border border-neutral-800 text-white px-8 py-4 font-bold uppercase tracking-widest text-xs hover:border-white transition-colors">
              View Code
            </a>
          </div>
        </div>

        {/* Right Content - 3D Cube */}
        <div className="relative z-10 w-full md:w-1/2 h-[50vh] md:h-auto flex items-center justify-center overflow-hidden">
          <Cube />
        </div>
      </header>

      {/* REVIEWS SECTION (MARQUEE) */}
      <section id="reviews" className="py-20 border-b border-neutral-900 overflow-hidden">
        <div className="px-6 md:px-12 mb-12 flex items-baseline justify-between">
          <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500">Client Feedback</h2>
          <div className="flex gap-1">
            <Star size={16} fill="white" />
            <span className="text-sm font-bold">5.0/5.0 Average Rating</span>
          </div>
        </div>
        
        {/* Marquee Container */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-black to-transparent z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-black to-transparent z-10" />
          
          <div className="flex animate-marquee whitespace-nowrap hover:pause-animation">
            {/* Double the array to create seamless loop */}
            {[...REVIEWS, ...REVIEWS].map((review, index) => (
              <ReviewCard key={index} review={review} />
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE SECTION */}
      <section id="experience" className="py-32 px-6 md:px-12 border-b border-neutral-900">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
          <div className="md:col-span-4">
            <h2 className="text-5xl font-bold tracking-tighter mb-4">CAREER<br/>PATH</h2>
            <p className="text-neutral-500 max-w-xs leading-relaxed">
              A timeline of technical leadership and engineering excellence across major tech companies.
            </p>
          </div>
          
          <div className="md:col-span-8 space-y-0">
            {EXPERIENCE.map((exp, index) => (
              <div key={index} className="group border-t border-neutral-800 py-12 transition-colors hover:bg-neutral-900/30">
                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-6">
                  <h3 className="text-3xl font-bold uppercase tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                    {exp.company}
                  </h3>
                  <span className="font-mono text-sm text-neutral-500">{exp.period}</span>
                </div>
                <div className="flex flex-col md:flex-row gap-8">
                  <div className="md:w-1/3">
                    <span className="inline-block px-3 py-1 border border-neutral-700 rounded-full text-xs uppercase tracking-wider text-neutral-400">
                      {exp.role}
                    </span>
                  </div>
                  <div className="md:w-2/3">
                    <p className="text-neutral-300 text-lg leading-relaxed font-light">
                      {exp.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="work" className="py-32 px-6 md:px-12 bg-neutral-950">
        <h2 className="text-sm font-mono uppercase tracking-widest text-neutral-500 mb-20">Selected Works (2023-2025)</h2>
        
        <div className="space-y-32">
          {PROJECTS.map((project, index) => (
            <div key={project.id} className="group grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div className={`order-2 ${index % 2 === 0 ? 'md:order-1' : 'md:order-2'}`}>
                <div className="w-full aspect-video bg-neutral-900 border border-neutral-800 relative overflow-hidden group-hover:border-white transition-colors duration-500">
                   {/* Replaced generic visual with custom Abstract Component */}
                   <div className="absolute inset-0 flex items-center justify-center">
                      <project.Visual />
                   </div>
                   <div className="absolute bottom-4 right-4 font-mono text-6xl font-bold text-neutral-800 select-none group-hover:text-neutral-700 transition-colors">
                     0{index + 1}
                   </div>
                </div>
              </div>
              
              <div className={`order-1 ${index % 2 === 0 ? 'md:order-2' : 'md:order-1'}`}>
                <h3 className="text-4xl md:text-6xl font-bold tracking-tighter mb-6 group-hover:text-neutral-400 transition-colors">
                  {project.title}
                </h3>
                <div className="flex flex-wrap gap-2 mb-8">
                  {project.tech.map(t => (
                    <span key={t} className="text-xs font-bold uppercase tracking-widest px-3 py-1 bg-neutral-900 text-neutral-400">
                      {t}
                    </span>
                  ))}
                </div>
                <p className="text-xl text-neutral-400 leading-relaxed mb-8 border-l-2 border-neutral-800 pl-6 group-hover:border-white transition-colors duration-500">
                  {project.description}
                </p>
                <button 
                  onClick={() => setActiveProject(project)}
                  className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest bg-white/10 hover:bg-white hover:text-black px-4 py-2 rounded-full transition-all"
                >
                  <Sparkles size={14} className="text-[#ccff00] group-hover:text-black" /> 
                  Ask AI About This
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer id="contact" className="py-20 px-6 md:px-12 border-t border-neutral-900 flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        <div className="max-w-lg">
          <a href="mailto:divyanshu1447@gmail.com" className="group block">
            <h2 className="text-6xl md:text-9xl font-bold tracking-tighter leading-none mb-8 group-hover:text-neutral-500 transition-colors cursor-pointer">
              GET IN<br/>TOUCH
            </h2>
          </a>
          <a href="mailto:divyanshu1447@gmail.com" className="text-xl text-neutral-400 hover:text-white transition-colors mb-12 block">
            divyanshu1447@gmail.com
          </a>

          {/* SMART PITCH GENERATOR */}
          <div className="bg-neutral-900 border border-neutral-800 p-6 rounded-lg max-w-md">
             <div className="flex items-center gap-2 mb-4">
                <Sparkles size={16} className="text-[#ccff00]" />
                <h3 className="text-sm font-bold uppercase tracking-widest text-white">Recruiter? Smart Pitch Generator</h3>
             </div>
             <div className="flex gap-2 mb-4">
                <input 
                  type="text" 
                  placeholder="Enter Company Name..."
                  value={pitchCompany}
                  onChange={(e) => setPitchCompany(e.target.value)}
                  className="flex-1 bg-black border border-neutral-700 p-2 text-sm text-white outline-none focus:border-[#ccff00]"
                />
                <button 
                  onClick={generatePitch}
                  disabled={pitchLoading}
                  className="bg-white text-black px-4 py-2 text-xs font-bold uppercase hover:bg-[#ccff00] transition-colors disabled:opacity-50"
                >
                  {pitchLoading ? "..." : "Generate"}
                </button>
             </div>
             {pitchResult && (
               <div className="p-3 bg-black border border-neutral-800 text-neutral-400 text-xs leading-relaxed">
                 "{pitchResult}"
                 <button 
                   onClick={() => navigator.clipboard.writeText(pitchResult)}
                   className="block mt-2 text-[#ccff00] hover:underline"
                 >
                   Copy to Clipboard
                 </button>
               </div>
             )}
          </div>
        </div>
        
        <div className="flex flex-col items-start md:items-end gap-6">
          <div className="flex gap-4">
            <a 
              href="https://www.github.com/divyanshu-parihar" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-black transition-all"
              aria-label="GitHub Profile"
            >
              <Github size={20} />
            </a>
            <a 
              href="https://www.linkedin.com/in/divy-parihar/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-black transition-all"
              aria-label="LinkedIn Profile"
            >
              <Linkedin size={20} />
            </a>
            <a 
              href="mailto:divyanshu1447@gmail.com" 
              className="p-3 border border-neutral-800 rounded-full hover:bg-white hover:text-black transition-all"
              aria-label="Send Email"
            >
              <Mail size={20} />
            </a>
          </div>
          <p className="text-neutral-600 text-xs font-mono uppercase tracking-widest">
            © 2025 Divyanshu Parihar
          </p>
        </div>
      </footer>

      {/* GLOBAL STYLES */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .transform-style-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: visible; /* Kept visible for transparent box effect */
        }
        .translate-z-half {
          transform: translateZ(5rem); /* 20rem / 2 for mobile */
        }
        .-translate-z-half {
          transform: translateZ(-5rem);
        }
        .translate-x-half {
          transform: translateX(5rem) translateZ(0);
        }
        .-translate-x-half {
          transform: translateX(-5rem) translateZ(0);
        }
        .translate-y-half {
          transform: translateY(5rem) translateZ(0);
        }
        .-translate-y-half {
          transform: translateY(-5rem) translateZ(0);
        }
        
        /* Responsive Cube Sizes */
        @media (min-width: 768px) {
          .translate-z-half { transform: translateZ(8rem); } /* 16rem / 2 */
          .-translate-z-half { transform: translateZ(-8rem); }
          .translate-x-half { transform: translateX(8rem) translateZ(0); }
          .-translate-x-half { transform: translateX(-8rem) translateZ(0); }
          .translate-y-half { transform: translateY(8rem) translateZ(0); }
          .-translate-y-half { transform: translateY(-8rem) translateZ(0); }
        }

        .animate-spin-slow {
          animation: spin 15s linear infinite;
        }
        .animate-spin-slow:hover {
          animation-play-state: paused;
        }
        
        @keyframes spin {
          from { transform: rotateX(0deg) rotateY(0deg); }
          to { transform: rotateX(360deg) rotateY(360deg); }
        }

        .animate-marquee {
          animation: marquee 20s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
        
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(5px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}