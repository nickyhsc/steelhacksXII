import React, { useState, useRef, useEffect, useCallback } from 'react';

interface UserInputProps {
  onSendMessage: (text: string) => void;
  isLoading: boolean;
}

export const UserInput: React.FC<UserInputProps> = ({ onSendMessage, isLoading }) => {
  const [text, setText] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  const autoResizeTextarea = () => {
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
        textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
      }
  };

  useEffect(() => {
    autoResizeTextarea();
  }, [text]);


  const handleSubmit = useCallback(() => {
    if (text.trim() && !isLoading) {
      onSendMessage(text);
      setText('');
    }
  }, [text, isLoading, onSendMessage]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <footer className="bg-white border-t border-gray-200 p-3 flex-shrink-0">
      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask for a Python demo..."
          className="flex-1 bg-[#EDF2FB] border border-gray-300 rounded-lg p-2.5 resize-none text-[--accent] placeholder-[--muted] focus:ring-2 focus:ring-blue-400/50 focus:border-blue-400 focus:outline-none transition-shadow duration-200 max-h-32 text-sm"
          rows={1}
          disabled={isLoading}
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !text.trim()}
          className="bg-[--accent] hover:bg-gray-900 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-semibold rounded-lg p-2.5 transition-colors duration-200 flex items-center justify-center self-stretch w-11"
          aria-label="Send message"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          )}
        </button>
      </div>
    </footer>
  );
};