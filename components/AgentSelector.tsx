import React from 'react';
import { AgentConfig, AgentType } from '../types';
import { AGENTS } from '../constants';
import { RiAddLine } from '@remixicon/react';

interface AgentSelectorProps {
  currentAgent: AgentType;
  onSelectAgent: (agent: AgentType) => void;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ currentAgent, onSelectAgent }) => {
  return (
    <div className="flex flex-row gap-3 w-full max-w-[619px]">
      {Object.values(AGENTS).map((agent) => {
        const isSelected = currentAgent === agent.id;
        const isPersonalized = agent.id === AgentType.PERSONALIZED;

        return (
          <div
            key={agent.id}
            onClick={() => onSelectAgent(agent.id)}
            className={`
              flex flex-col justify-center items-center p-6 gap-2 flex-1 h-[140px]
              rounded-lg cursor-pointer transition-all duration-200 border
              ${isSelected 
                ? 'bg-[#F7F8FF] border-[#6464FF] shadow-[0px_4px_12px_rgba(100,100,255,0.1)]' 
                : 'bg-white border-[#D5D5DE] hover:border-[#B6B6C2] hover:shadow-sm'
              }
            `}
          >
            <div className={`
              flex items-center justify-center w-[60px] h-[60px] rounded-full border border-[#EBEBF0] bg-white
              ${isSelected ? 'shadow-sm' : ''}
            `}>
              {isPersonalized ? (
                 <RiAddLine size={28} className="text-[#121214]" />
              ) : (
                <span className="text-3xl select-none">{agent.icon}</span>
              )}
            </div>
            
            <span className={`
              text-base font-normal text-center whitespace-nowrap
              ${isSelected ? 'text-[#5A59E7] font-medium' : 'text-[#121214]'}
            `}>
              {agent.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default AgentSelector;