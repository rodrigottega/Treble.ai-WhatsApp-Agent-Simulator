export enum AgentType {
  EDUCATION = 'EDUCATION',
  REAL_ESTATE = 'REAL_ESTATE',
  HEALTH = 'HEALTH',
  PERSONALIZED = 'PERSONALIZED',
}

export interface AgentConfig {
  id: AgentType;
  name: string;
  label: string;
  icon: string;
  color: string;
  welcomeMessage: string;
  systemInstruction: string;
  mockResponse: string;
}

export interface Message {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ChatState {
  messages: Message[];
  isThinking: boolean;
}