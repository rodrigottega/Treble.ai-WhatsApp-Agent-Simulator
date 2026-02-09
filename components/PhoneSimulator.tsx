import React, { useRef, useEffect, useState } from 'react';
import { AgentConfig, Message } from '../types';
import ThinkingIndicator from './ThinkingIndicator';
import { RiSendPlane2Line } from '@remixicon/react';

interface PhoneSimulatorProps {
  messages: Message[];
  currentAgent: AgentConfig;
  isThinking: boolean;
  inputText: string;
  setInputText: (text: string) => void;
  onSendMessage: () => void;
}

const PhoneSimulator: React.FC<PhoneSimulatorProps> = ({
  messages,
  currentAgent,
  isThinking,
  inputText,
  setInputText,
  onSendMessage,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  // Default to true so it shows active state initially (caret visible)
  const [isInputFocused, setIsInputFocused] = useState(true);

  const isActive = isInputFocused || inputText.length > 0;
  
  // Popover visibility: Hidden when user types (inputText > 0)
  const showPopover = messages.length === 1 && !isThinking && inputText.length === 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isThinking]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSendMessage();
    }
  };

  return (
    <div 
      className="relative flex flex-col items-center isolate"
      style={{
        width: '324px',
        height: '588px',
      }}
    >
        {/* 1. Screen Content (Positioned absolute full width/height, underneath border) */}
        <div className="absolute inset-0 rounded-[24px] overflow-hidden bg-[#F5F5F7] z-10 flex flex-col">
            {/* Phone Screen Background (SVG pattern) */}
            <div 
                className="absolute inset-0 z-0 opacity-70 pointer-events-none"
                style={{
                backgroundImage: `url("https://cdn.prod.website-files.com/698a2f0dabb52ca2751815e9/698a34f6c963edce07f4f073_background.svg")`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                }}
            ></div>

            {/* Content Container (Matches inner safe area inside 8px border) */}
            <div className="absolute inset-[8px] flex flex-col overflow-hidden rounded-[16px]">
                {/* Messages Area */}
                <div className="flex-1 w-full overflow-y-auto p-4 space-y-3 z-10 relative scrollbar-hide pb-[80px]">
                    {messages.map((msg) => (
                    <div
                        key={msg.id}
                        className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                        {msg.role === 'model' && (
                        <div className="flex flex-col gap-3 max-w-[90%]">
                            <div className="p-3 bg-white border border-[#EBEBF0] shadow-[0px_17px_7px_rgba(182,182,194,0.02),0px_10px_6px_rgba(182,182,194,0.06),0px_4px_4px_rgba(182,182,194,0.1),0px_1px_2px_rgba(182,182,194,0.12)] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-none">
                                <p className="font-['Hanken_Grotesk'] text-[16px] leading-[24px] text-[#38383D] whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                        )}

                        {msg.role === 'user' && (
                        <div className="flex flex-col gap-3 max-w-[90%] items-end">
                            <div className="p-3 bg-white border border-[#EBEBF0] shadow-[0px_17px_7px_rgba(182,182,194,0.02),0px_10px_6px_rgba(182,182,194,0.06),0px_4px_4px_rgba(182,182,194,0.1),0px_1px_2px_rgba(182,182,194,0.12)] rounded-tl-[8px] rounded-tr-[8px] rounded-bl-[8px] rounded-br-none">
                            <p className="font-['Hanken_Grotesk'] text-[16px] leading-[24px] text-[#38383D] whitespace-pre-wrap">{msg.text}</p>
                            </div>
                        </div>
                        )}
                    </div>
                    ))}
                    
                    {isThinking && (
                    <div className="flex w-full justify-start">
                        <ThinkingIndicator />
                    </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>
            </div>

            {/* Message Bar - Placed at bottom of the main screen container */}
            <div 
                className="absolute bottom-0 left-0 w-full flex flex-row justify-center items-center z-20 bg-[#F5F5F7] border-t border-[#EBEBF0]"
                style={{
                    width: '324px',
                    height: '72px',
                    padding: '16px',
                    gap: '8px',
                    boxSizing: 'border-box',
                    boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)'
                }}
            >
                <div 
                className={`
                    flex flex-row items-center box-border transition-all duration-200
                    ${isActive 
                        ? 'justify-between border border-[#6464FF] p-[8px] gap-[8px]' 
                        : 'border border-[#D5D5DE] pl-[12px] pr-[8px]'
                    }
                `}
                style={{
                    width: '292px',
                    height: '40px',
                    borderRadius: '8px',
                    backgroundColor: '#FFFFFF',
                    boxShadow: isActive ? '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)' : 'none'
                }}
                >
                    <input 
                    type="text" 
                    className={`
                        flex-1 bg-transparent border-none outline-none h-full text-[14px] font-['Hanken_Grotesk']
                        text-[#121214] placeholder:text-[#B6B6C2]
                    `}
                    placeholder={isActive ? "" : "Escribe un mensaje..."}
                    value={inputText}
                    onChange={(e) => setInputText(e.target.value)}
                    onFocus={() => setIsInputFocused(true)}
                    onBlur={() => setIsInputFocused(false)}
                    onKeyDown={handleKeyDown}
                    autoFocus
                    style={{ caretColor: '#121214', padding: 0 }}
                    />
                    
                    {isActive && (
                    <button 
                        onClick={onSendMessage}
                        className="flex items-center justify-center bg-[#6464FF] rounded-[4px] hover:bg-[#5050DD] transition-colors active:scale-95"
                        style={{
                            width: '24px',
                            height: '24px',
                            minWidth: '24px',
                            padding: 0,
                            boxShadow: '0px 5px 2px rgba(182, 182, 194, 0.01), 0px 3px 2px rgba(182, 182, 194, 0.05), 0px 1px 1px rgba(182, 182, 194, 0.09), 0px 0px 1px rgba(182, 182, 194, 0.1)'
                        }}
                    >
                        <RiSendPlane2Line size={14} color="white" />
                    </button>
                    )}
                </div>
            </div>
        </div>

        {/* 2. Border (On top of screen content, fixing inner shadow look) */}
        <div 
            className="absolute inset-0 border-[8px] border-[#222226] rounded-[24px] pointer-events-none z-50"
            style={{
                boxShadow: '0px 44px 12px rgba(0, 0, 0, 0.01), 0px 28px 11px rgba(0, 0, 0, 0.05), 0px 16px 10px rgba(0, 0, 0, 0.18), 0px 7px 7px rgba(0, 0, 0, 0.31), 0px 2px 4px rgba(0, 0, 0, 0.35)'
            }}
        />

        {/* 3. Popover (On top of border) */}
        {showPopover && (
            <div 
                className="absolute z-[60] flex flex-col items-center" 
                style={{ 
                    left: 'calc(50% - 80px)',
                    transform: 'translateX(-50%)',
                    bottom: '80px', // Positioned nicely above the message bar
                    width: '252px',
                    height: '62px'
                }}
            >
                <div className="bg-white border border-[#EBEBF0] rounded-[8px] p-4 shadow-[0px_21px_8px_rgba(182,182,194,0.03),0px_12px_7px_rgba(182,182,194,0.09),0px_5px_5px_rgba(182,182,194,0.15),0px_1px_3px_rgba(182,182,194,0.18)] flex items-center w-full h-[52px] box-border relative">
                    <span className="font-['Hanken_Grotesk'] text-[14px] leading-[20px] text-[#121214] flex items-center gap-2">Escribe un mensaje para probar 🤖</span>
                    {/* Arrow - Centered relative to popover */}
                    <div 
                        className="absolute -bottom-[7px] bg-white border-b border-l border-[#EBEBF0]"
                        style={{
                            width: '14px',
                            height: '14px',
                            left: 'calc(50% - 7px)',
                            transform: 'rotate(-45deg)'
                        }}
                    ></div>
                </div>
            </div>
        )}
    </div>
  );
};

export default PhoneSimulator;