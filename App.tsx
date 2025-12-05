import React, { useState, useEffect } from 'react';
import { Play, Pause, Info, MessageSquare, Headphones, Radio, Mic2 } from 'lucide-react';
import { PODCAST_DATA } from './constants';
import { Episode } from './types';
import ChatInterface from './components/ChatInterface';
import Button from './components/Button';
import Visualizer from './components/Visualizer';

const App: React.FC = () => {
  const [currentEpisode, setCurrentEpisode] = useState<Episode | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [progress, setProgress] = useState(0);

  // Simulate playback progress
  useEffect(() => {
    let interval: number;
    if (isPlaying) {
      interval = window.setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.1; // Slow progress
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const togglePlay = (episode: Episode) => {
    if (currentEpisode?.id === episode.id) {
      setIsPlaying(!isPlaying);
    } else {
      setCurrentEpisode(episode);
      setIsPlaying(true);
      setProgress(0);
    }
  };

  return (
    <div className="min-h-screen bg-[#05050a] relative overflow-x-hidden selection:bg-fuchsia-500/30">
      
      {/* Background Ambience */}
      <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-fuchsia-600/20 rounded-full blur-[120px] animate-pulse"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-600/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 max-w-6xl">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row items-center justify-between mb-16 gap-6">
          <div className="flex items-center gap-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-500"></div>
              <img 
                src={PODCAST_DATA.image} 
                alt="Cosmic Royale" 
                className="relative w-20 h-20 rounded-full object-cover border-2 border-white/10"
              />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-black text-white font-orbitron tracking-tighter uppercase neon-text">
                Cosmic <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-cyan-400">Royale</span>
              </h1>
              <div className="flex items-center gap-2 text-slate-400 text-sm font-medium tracking-widest mt-1">
                <Mic2 className="w-3 h-3 text-fuchsia-500" />
                <span>HOSTED BY {PODCAST_DATA.author.toUpperCase()}</span>
              </div>
            </div>
          </div>
          
          <Button 
            variant="secondary" 
            icon={<MessageSquare className="w-4 h-4" />}
            onClick={() => setIsChatOpen(true)}
          >
            Chat with CasTo
          </Button>
        </header>

        <main className="grid lg:grid-cols-12 gap-12">
          
          {/* Main Content: Latest Episode / Hero */}
          <div className="lg:col-span-8 space-y-8">
            <div className="relative group">
               <div className="absolute -inset-0.5 bg-gradient-to-r from-fuchsia-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-50 transition duration-500"></div>
               <div className="relative bg-slate-900/90 backdrop-blur border border-white/10 rounded-2xl p-8 lg:p-12 overflow-hidden">
                  
                  {/* Decorative Background Elements inside Card */}
                  <div className="absolute top-0 right-0 p-8 opacity-10">
                    <Radio className="w-64 h-64 text-white" />
                  </div>

                  <div className="relative z-10">
                    <span className="inline-block py-1 px-3 rounded bg-fuchsia-500/20 text-fuchsia-300 text-xs font-bold tracking-widest uppercase mb-4 border border-fuchsia-500/30">
                      Latest Transmission
                    </span>
                    <h2 className="text-3xl md:text-5xl font-bold text-white font-orbitron mb-6 leading-tight">
                      {PODCAST_DATA.episodes[0].title}
                    </h2>
                    <p className="text-slate-300 text-lg leading-relaxed mb-8 max-w-2xl">
                      {PODCAST_DATA.episodes[0].description}
                    </p>
                    
                    <div className="flex flex-wrap items-center gap-4">
                       <Button 
                         variant="primary" 
                         icon={currentEpisode?.id === PODCAST_DATA.episodes[0].id && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                         onClick={() => togglePlay(PODCAST_DATA.episodes[0])}
                       >
                         {currentEpisode?.id === PODCAST_DATA.episodes[0].id && isPlaying ? 'Pause Signal' : 'Initialize Playback'}
                       </Button>
                       <div className="flex items-center gap-4 text-slate-400 text-sm font-mono">
                         <span className="flex items-center gap-1"><Headphones className="w-4 h-4" /> {PODCAST_DATA.episodes[0].duration}</span>
                         <span className="w-1 h-1 bg-slate-600 rounded-full"></span>
                         <span>{PODCAST_DATA.episodes[0].pubDate}</span>
                       </div>
                    </div>
                  </div>
               </div>
            </div>

            {/* Episode List */}
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-white font-orbitron mb-6 border-l-4 border-cyan-500 pl-4">
                Transmission Archive
              </h3>
              
              <div className="grid gap-4">
                {PODCAST_DATA.episodes.map((episode) => (
                  <div 
                    key={episode.id}
                    className={`group relative bg-slate-800/50 hover:bg-slate-800 border border-white/5 rounded-xl p-6 transition-all duration-300 ${
                      currentEpisode?.id === episode.id ? 'border-fuchsia-500/50 bg-slate-800' : 'hover:border-cyan-500/30'
                    }`}
                  >
                    <div className="flex items-start gap-4">
                      <button
                        onClick={() => togglePlay(episode)}
                        className={`mt-1 flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-all ${
                          currentEpisode?.id === episode.id && isPlaying
                            ? 'bg-fuchsia-500 text-white shadow-[0_0_15px_rgba(217,70,239,0.5)]'
                            : 'bg-slate-700 text-slate-300 group-hover:bg-cyan-500 group-hover:text-white'
                        }`}
                      >
                         {currentEpisode?.id === episode.id && isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-1" />}
                      </button>
                      
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-white font-orbitron mb-2 group-hover:text-cyan-300 transition-colors">
                          {episode.title}
                        </h4>
                        <p className="text-slate-400 text-sm mb-3 line-clamp-2">
                          {episode.description}
                        </p>
                        <div className="flex items-center gap-4 text-xs font-mono text-slate-500 uppercase tracking-wider">
                          <span>{episode.pubDate}</span>
                          <span>•</span>
                          <span>{episode.duration}</span>
                          {episode.explicit && (
                             <span className="text-red-400 border border-red-400/30 px-1 rounded text-[10px]">E</span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* About Card */}
            <div className="bg-slate-900/80 border border-white/10 rounded-2xl p-6">
              <h3 className="text-xl font-bold text-white font-orbitron mb-4">The Frequency</h3>
              <p className="text-slate-400 leading-relaxed text-sm">
                {PODCAST_DATA.description}
              </p>
              <div className="mt-6 pt-6 border-t border-white/5">
                <Button variant="ghost" className="w-full text-xs" onClick={() => setIsChatOpen(true)}>
                  Access CasTo Neural Link ->
                </Button>
              </div>
            </div>

            {/* Now Playing Widget */}
            <div className={`sticky top-8 bg-slate-900/90 border border-fuchsia-500/30 rounded-2xl p-6 shadow-2xl transition-all duration-500 ${currentEpisode ? 'opacity-100 translate-y-0' : 'opacity-50 translate-y-4 grayscale'}`}>
               <div className="flex items-center justify-between mb-4">
                 <span className="text-xs font-bold text-fuchsia-400 uppercase tracking-widest flex items-center gap-2">
                   <span className={`w-2 h-2 bg-fuchsia-500 rounded-full ${isPlaying ? 'animate-pulse' : ''}`}></span>
                   Signal Status
                 </span>
                 <Visualizer isPlaying={isPlaying} />
               </div>
               
               <div className="mb-6">
                 <div className="h-40 w-full bg-slate-800 rounded-lg mb-4 overflow-hidden relative">
                    <img src={PODCAST_DATA.image} className="w-full h-full object-cover opacity-60" alt="Cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                 </div>
                 <h4 className="text-white font-bold font-orbitron truncate">
                   {currentEpisode?.title || "Waiting for signal..."}
                 </h4>
                 <p className="text-slate-500 text-xs uppercase tracking-wide">
                    {currentEpisode ? "Now Broadcasting" : "Offline"}
                 </p>
               </div>

               {/* Fake Progress Bar */}
               <div className="w-full bg-slate-800 h-1 rounded-full mb-2 overflow-hidden">
                 <div 
                   className="h-full bg-gradient-to-r from-fuchsia-500 to-cyan-500 transition-all duration-1000 ease-linear"
                   style={{ width: `${progress}%` }}
                 ></div>
               </div>
               <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                 <span>00:00</span>
                 <span>{currentEpisode?.duration || "--:--"}</span>
               </div>
            </div>

          </div>
        </main>

        <footer className="mt-20 border-t border-white/10 py-8 text-center text-slate-600 text-sm font-mono">
          <p>© 2025 CasTo Cosmic Distributor. All Realities Reserved.</p>
        </footer>
      </div>

      <ChatInterface isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
};

export default App;