import React from 'react';

const ThinkingIndicator: React.FC = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-2 w-12 h-12 bg-white border border-[#EBEBF0] rounded-tl-[8px] rounded-tr-[8px] rounded-br-[8px] rounded-bl-none shadow-[0px_14px_5px_rgba(182,182,194,0.01),0px_8px_5px_rgba(182,182,194,0.05),0px_3px_3px_rgba(182,182,194,0.09),0px_1px_2px_rgba(182,182,194,0.1)] p-3">
      <div className="flex space-x-1 items-center justify-center">
        <div className="w-[6px] h-[6px] bg-[#9494A1] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
        <div className="w-[6px] h-[6px] bg-[#9494A1] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
        <div className="w-[6px] h-[6px] bg-[#9494A1] rounded-full animate-bounce"></div>
      </div>
    </div>
  );
};

export default ThinkingIndicator;