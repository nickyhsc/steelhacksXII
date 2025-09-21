import React, { useState } from 'react';
import { MessageAuthor, type ChatMessage as Message } from '../types';
import { LoadingSpinner } from './LoadingSpinner';

interface ChatMessageProps {
  message: Message;
}

const CodeBlock: React.FC<{ content: string }> = ({ content }) => {
  const [copied, setCopied] = useState(false);
  const lines = content.split('\n');
  const language = lines[0].trim();
  const code = lines.slice(1).join('\n');

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-slate-900 rounded-lg my-2 overflow-hidden text-sm">
        <div className="flex justify-between items-center text-xs text-gray-400 px-4 py-2 bg-slate-800">
            <span>{language}</span>
            <button onClick={handleCopy} className="flex items-center gap-1.5 hover:text-white transition-colors">
                {copied ? (
                    <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>Copied!</>
                ) : (
                    <><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>Copy</>
                )}
            </button>
        </div>
        <pre className="p-4 overflow-x-auto text-gray-300"><code className={`language-${language}`}>{code}</code></pre>
    </div>
  );
};

const parseContent = (content: string) => {
    const parts = content.split(/(\`\`\`[\s\S]*?\`\`\`)/g).filter(Boolean);
    
    return parts.map((part, index) => {
        if (part.startsWith('```') && part.endsWith('```')) {
            return <CodeBlock key={index} content={part.slice(3, -3)} />;
        }
        
        const lines = part.split('\n');
        const elements = [];
        let listItems = [];

        for (let i = 0; i < lines.length; i++) {
            const line = lines[i];
            if (line.trim().startsWith('* ')) {
                listItems.push(line.trim().substring(2));
            } else {
                if (listItems.length > 0) {
                    elements.push(
                        <ul key={`ul-${elements.length}`} className="list-disc pl-5 space-y-1 my-2">
                            {listItems.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                        </ul>
                    );
                    listItems = [];
                }
                elements.push(
                    <React.Fragment key={`line-${i}`}>
                        {line}
                        {i < lines.length - 1 && <br />}
                    </React.Fragment>
                );
            }
        }
        if (listItems.length > 0) {
            elements.push(
                <ul key={`ul-${elements.length}`} className="list-disc pl-5 space-y-1 my-2">
                    {listItems.map((item, itemIndex) => <li key={itemIndex}>{item}</li>)}
                </ul>
            );
        }

        return <div key={index} className="whitespace-pre-wrap">{elements}</div>;
    });
};

export const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.author === MessageAuthor.USER;
  const isAI = message.author === MessageAuthor.AI;

  const AuthorIcon = () => (
     <div className="bg-[--accent] text-white rounded-full p-2 self-start flex-shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor"><path d="M12.33.24a1 1 0 00-.66 0C5.13 2.58.24 8.7.24 15.39c0 4.4 2.08 8.13 5.34 10.37a1 1 0 001.2-.27l1.3-1.89a1 1 0 00-.23-1.32c-1.42-.96-2.3-2.55-2.3-4.28 0-3.03 2.01-5.63 4.9-6.3a1 1 0 00.82-.98V4.4a1 1 0 00-.8-.98c-2.89-.67-4.9-3.27-4.9-6.3a1 1 0 00-.1-.23l1.29-1.9a1 1 0 00-.28-1.32zM11.67 23.76a1 1 0 00.66 0c6.54-2.34 11.43-8.46 11.43-15.15 0-4.4-2.08-8.13-5.34-10.37a1 1 0 00-1.2.27l-1.3 1.89a1 1 0 00.23 1.32c1.42.96 2.3 2.55 2.3 4.28 0 3.03-2.01 5.63-4.9 6.3a1 1 0 00-.82-.98v6.3a1 1 0 00.8.98c2.89.67 4.9 3.27 4.9 6.3a1 1 0 00.1.23l-1.29 1.9a1 1 0 00.28 1.32z"/></svg>
     </div>
  );

  if (isAI && message.content === '') {
    return (
      <div className="flex items-start gap-3 justify-start">
        <AuthorIcon />
        <div className="bg-white text-[--accent] rounded-xl rounded-bl-none p-4 max-w-2xl w-fit shadow-sm">
          <LoadingSpinner />
        </div>
      </div>
    );
  }
  
  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-[--accent] text-white rounded-br-none'
    : 'bg-white text-[--accent] rounded-bl-none';

  return (
    <div className={`flex items-start gap-3 w-full ${containerClasses}`}>
      {isAI && <AuthorIcon />}
      <div
        className={`rounded-xl p-3 max-w-[85%] w-fit flex flex-col shadow-sm ${bubbleClasses}`}
      >
        <div className="prose max-w-none text-sm text-inherit">
          {parseContent(message.content)}
        </div>
      </div>
    </div>
  );
};