import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4 shadow-sm z-10 flex-shrink-0">
      <div className="flex flex-col items-center justify-center">
         <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7 text-blue-500 mr-2.5" viewBox="0 0 24 24" fill="currentColor"><path d="M12.33.24a1 1 0 00-.66 0C5.13 2.58.24 8.7.24 15.39c0 4.4 2.08 8.13 5.34 10.37a1 1 0 001.2-.27l1.3-1.89a1 1 0 00-.23-1.32c-1.42-.96-2.3-2.55-2.3-4.28 0-3.03 2.01-5.63 4.9-6.3a1 1 0 00.82-.98V4.4a1 1 0 00-.8-.98c-2.89-.67-4.9-3.27-4.9-6.3a1 1 0 00-.1-.23l1.29-1.9a1 1 0 00-.28-1.32zM11.67 23.76a1 1 0 00.66 0c6.54-2.34 11.43-8.46 11.43-15.15 0-4.4-2.08-8.13-5.34-10.37a1 1 0 00-1.2.27l-1.3 1.89a1 1 0 00.23 1.32c1.42.96 2.3 2.55 2.3 4.28 0 3.03-2.01 5.63-4.9 6.3a1 1 0 00-.82.98v6.3a1 1 0 00.8.98c2.89.67 4.9 3.27 4.9 6.3a1 1 0 00.1.23l-1.29 1.9a1 1 0 00.28 1.32z"/></svg>
            <h1 className="text-lg font-bold text-[--accent] tracking-wide">
              Python DemoGen
            </h1>
         </div>
         <p className="text-xs text-[--muted] mt-0.5">Your friendly Python tutor</p>
      </div>
    </header>
  );
};