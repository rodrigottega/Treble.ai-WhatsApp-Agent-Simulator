import React, { useState, useEffect } from 'react';
import { RiWhatsappLine, RiCheckFill, RiArrowRightLine, RiAddLine } from '@remixicon/react';
import { AGENTS } from './constants';
import { AgentType, Message } from './types';
import { initializeChat, sendMessageToGemini } from './services/geminiService';
import PhoneSimulator from './components/PhoneSimulator';
import AgentSelector from './components/AgentSelector';

const App: React.FC = () => {
  const [selectedAgentId, setSelectedAgentId] = useState<AgentType>(AgentType.EDUCATION);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isThinking, setIsThinking] = useState(false);

  const currentAgent = AGENTS[selectedAgentId];

  // Initialize chat when agent changes
  useEffect(() => {
    initializeChat(currentAgent.systemInstruction);
    setMessages([
      {
        id: 'welcome-' + Date.now(),
        role: 'model',
        text: currentAgent.welcomeMessage,
        timestamp: new Date(),
      }
    ]);
  }, [selectedAgentId, currentAgent]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMsg: Message = {
      id: 'user-' + Date.now(),
      role: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsThinking(true);

    try {
      const responseText = await sendMessageToGemini(inputText);
      const modelMsg: Message = {
        id: 'model-' + Date.now(),
        role: 'model',
        text: responseText,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, modelMsg]);
    } catch (error) {
      console.error("Failed to get response", error);
    } finally {
      setIsThinking(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-white flex flex-col font-['Hanken_Grotesk'] text-[#121214]">
      
      {/* Navbar */}
      <nav className="w-full border-b border-[#EBEBF0] bg-white">
        <div className="flex flex-row justify-between items-center px-6 py-4 h-16 w-full max-w-[1440px] mx-auto">
          <div className="flex items-center gap-2">
             <img 
               src="https://cdn.prod.website-files.com/698a2f0dabb52ca2751815e9/698a2f4bd0e89f64cfaf0b72_Treble.ai%20vertical.svg" 
               alt="Treble.ai" 
               className="h-10"
             />
          </div>
          <a href="#" className="text-sm font-medium flex items-center gap-1 hover:opacity-80 transition-opacity">
            Ir a la plataforma <RiArrowRightLine size={16} />
          </a>
        </div>
      </nav>

      {/* Main Content Container */}
      <div className="flex flex-col lg:flex-row justify-center items-center gap-14 py-12 lg:py-0 flex-1 w-full max-w-[1440px] mx-auto overflow-hidden">
        
        {/* Left Column: Content */}
        <div className="flex flex-col justify-center items-center lg:items-start lg:w-[619px] gap-12 px-4 lg:px-0 z-10">
          
          {/* Hero Text */}
          <div className="flex flex-col items-center lg:items-center gap-6 w-full">
            
            {/* AI Pill */}
            <div className="flex items-center gap-1 px-2 py-2 bg-white border border-[#E1D7FF] rounded-full shadow-[0px_5px_2px_rgba(182,182,194,0.01),0px_3px_2px_rgba(182,182,194,0.05),0px_1px_1px_rgba(182,182,194,0.09),0px_0px_1px_rgba(182,182,194,0.1)] w-[82px] h-[36px] box-border justify-center">
              <span className="flex items-center justify-center w-5 h-5">
                 <img src="https://cdn.prod.website-files.com/698a2f0dabb52ca2751815e9/698a369ad97fc4d4bfa6aa08_Icon.svg" alt="AI" className="w-5 h-5" />
              </span>
              <RiAddLine size={18} className="text-[#121214]" />
              <RiWhatsappLine size={20} className="text-[#0D9E10]" />
            </div>

            {/* Headline */}
            <div className="flex flex-col items-center text-center gap-2">
              <h1 className="text-[28px] lg:text-[32px] font-semibold leading-tight text-[#38383D] tracking-tight">
                Prueba todo el poder de la
              </h1>
              <h1 className="text-[28px] lg:text-[32px] font-semibold leading-tight text-[#38383D] tracking-tight">
                inteligencia artificial en WhatsApp
              </h1>
            </div>

            {/* Benefits Pills */}
            <div className="flex flex-col gap-3 w-full items-center">
              <div className="flex flex-row items-center gap-2 px-3 py-2 bg-white border border-[#EBEBF0] rounded-full shadow-sm">
                <RiCheckFill size={18} className="text-[#0D9E10]" />
                <span className="text-sm text-[#38383D]">Reduce la carga operativa de Agentes humanos</span>
              </div>
              <div className="flex flex-row items-center gap-2 px-3 py-2 bg-white border border-[#EBEBF0] rounded-full shadow-sm">
                <RiCheckFill size={18} className="text-[#0D9E10]" />
                <span className="text-sm text-[#38383D]">Interacción 24/7 con tus clientes</span>
              </div>
              <div className="flex flex-row items-center gap-2 px-3 py-2 bg-white border border-[#EBEBF0] rounded-full shadow-sm">
                <RiCheckFill size={18} className="text-[#0D9E10]" />
                <span className="text-sm text-[#38383D]">Evita que tus clientes se queden atascados en flujos grandes</span>
              </div>
            </div>

          </div>

          {/* Use Cases */}
          <div className="flex flex-col items-center gap-10 w-full">
            <div className="flex flex-col items-center gap-3 w-full">
              <h2 className="text-lg font-medium text-[#121214] tracking-tight">Casos de uso más populares</h2>
              <AgentSelector 
                currentAgent={selectedAgentId} 
                onSelectAgent={setSelectedAgentId}
              />
            </div>
          
            {/* CTA Buttons */}
            <div className="flex flex-col items-center gap-3 w-full max-w-[440px]">
              <button className="flex items-center justify-center gap-2 w-full h-12 bg-[#6464FF] text-white rounded font-medium shadow-sm hover:bg-[#5050DD] transition-all">
                Crear Agente con inteligencia artificial
              </button>
              <button className="flex items-center justify-center gap-2 w-full h-12 text-[#121214] font-medium hover:bg-gray-50 rounded transition-all">
                No me interesa tener inteligencia artificial en WhatsApp
              </button>
            </div>
          </div>

        </div>

        {/* Right Column: Simulator */}
        <div className="flex flex-col justify-center items-center relative w-[500px] h-[780px] rounded-[20px] overflow-hidden isolate">
            
            {/* Background Image for Preview Box */}
            <div 
              className="absolute inset-0 z-0"
              style={{
                backgroundImage: `url("https://cdn.prod.website-files.com/698a2f0dabb52ca2751815e9/698a2f2e837dbfa08a6a16dd_preview__image.png")`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            {/* Phone Container */}
            <div className="z-10 flex justify-center items-center w-full h-full">
               <PhoneSimulator 
                 messages={messages}
                 currentAgent={currentAgent}
                 isThinking={isThinking}
                 inputText={inputText}
                 setInputText={setInputText}
                 onSendMessage={handleSendMessage}
               />
            </div>

        </div>

      </div>
    </div>
  );
};

export default App;