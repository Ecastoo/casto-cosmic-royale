import React from 'react';

interface VisualizerProps {
  isPlaying: boolean;
}

const Visualizer: React.FC<VisualizerProps> = ({ isPlaying }) => {
  return (
    <div className="flex items-end justify-center gap-1 h-12 w-full max-w-[200px]">
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className={`w-2 bg-gradient-to-t from-fuchsia-600 to-cyan-400 rounded-t-sm transition-all duration-300 ease-in-out ${
            isPlaying ? 'animate-pulse' : 'h-1'
          }`}
          style={{
            height: isPlaying ? `${Math.max(20, Math.random() * 100)}%` : '10%',
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.6s'
          }}
        />
      ))}
    </div>
  );
};

export default Visualizer;