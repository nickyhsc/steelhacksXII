import React from 'react';

interface WelcomeScreenProps {
  onPromptClick: (prompt: string) => void;
}

const examplePrompts = [
  "Print 'Hello, World!' in Python",
  "Explain what a variable is",
  "Show me how to use a `for` loop",
  "Write an `if` statement"
];

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onPromptClick }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center text-gray-600 animate-fade-in">
      <div className="bg-white border-4 border-[--accent] rounded-full p-4 mb-6 shadow-lg">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" viewBox="0 0 24 24" fill="currentColor"><path d="M12.33.24a1 1 0 00-.66 0C5.13 2.58.24 8.7.24 15.39c0 4.4 2.08 8.13 5.34 10.37a1 1 0 001.2-.27l1.3-1.89a1 1 0 00-.23-1.32c-1.42-.96-2.3-2.55-2.3-4.28 0-3.03 2.01-5.63 4.9-6.3a1 1 0 00.82-.98V4.4a1 1 0 00-.8-.98c-2.89-.67-4.9-3.27-4.9-6.3a1 1 0 00-.1-.23l1.29-1.9a1 1 0 00-.28-1.32zM11.67 23.76a1 1 0 00.66 0c6.54-2.34 11.43-8.46 11.43-15.15 0-4.4-2.08-8.13-5.34-10.37a1 1 0 00-1.2.27l-1.3 1.89a1 1 0 00.23 1.32c1.42.96 2.3 2.55 2.3 4.28 0 3.03-2.01 5.63-4.9 6.3a1 1 0 00-.82-.98v6.3a1 1 0 00.8.98c2.89.67 4.9 3.27 4.9 6.3a1 1 0 00.1.23l-1.29 1.9a1 1 0 00.28 1.32z"/></svg>
      </div>
      <h2 className="text-2xl font-bold text-[--accent] mb-2">
        Let's Learn Python!
      </h2>
      <p className="max-w-md mb-8 text-[--muted]">
        I'm here to help you get started with your Python journey. Ask me a question or try one of the beginner-friendly examples below.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {examplePrompts.map((prompt, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(prompt)}
            className="bg-white hover:bg-gray-100/80 text-[--accent] border border-gray-200/80 rounded-lg p-3 text-sm font-medium text-left transition-colors duration-200 shadow-sm"
          >
            {prompt}
          </button>
        ))}
      </div>
    </div>
  );
};