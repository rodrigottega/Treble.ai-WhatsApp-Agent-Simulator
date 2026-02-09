import { AgentType, AgentConfig } from './types';

export const AGENTS: Record<AgentType, AgentConfig> = {
  [AgentType.EDUCATION]: {
    id: AgentType.EDUCATION,
    name: 'Education Bot',
    label: 'Educación',
    icon: '🎓',
    color: '#5A59E7',
    welcomeMessage: '¡Hola! Soy tu asistente educativo. 🎓 ¿Te gustaría conocer nuestros nuevos programas de maestría o cursos libres?',
    systemInstruction: 'You are a helpful and friendly educational assistant for a university called Treble University. You help students find information about masters degrees, courses, and admissions. Keep answers concise, friendly, and use emojis occasionally. You are chatting on WhatsApp.',
    mockResponse: '¡Gracias por tu consulta! 🎓 Como asistente virtual, he registrado tu interés. Un asesor académico revisará tu pregunta y te enviará la información detallada del programa a tu correo electrónico en breve.',
  },
  [AgentType.REAL_ESTATE]: {
    id: AgentType.REAL_ESTATE,
    name: 'Real Estate Bot',
    label: 'Bienes raíces',
    icon: '🏡',
    color: '#121214',
    welcomeMessage: '¡Hola! 🏡 Bienvenido a Inmobiliaria Treble. ¿Buscas comprar, rentar o vender una propiedad hoy?',
    systemInstruction: 'You are a professional real estate agent assistant. You help users find properties to buy or rent. Ask about their budget, preferred location, and property type. Keep answers professional yet inviting. Use emojis relevant to housing.',
    mockResponse: 'Entendido. 🏡 He tomado nota de tus preferencias. Buscaré en nuestra base de datos las propiedades que coincidan con tus criterios y te enviaré las mejores opciones disponibles por aquí.',
  },
  [AgentType.HEALTH]: {
    id: AgentType.HEALTH,
    name: 'Health Bot',
    label: 'Sector Salud',
    icon: '💊',
    color: '#121214',
    welcomeMessage: 'Hola, soy tu asistente de salud virtual. 💊 ¿Necesitas agendar una cita o consultar sobre tus resultados de laboratorio?',
    systemInstruction: 'You are a health sector assistant. You help patients schedule appointments, check lab results availability, and answer general administrative questions. Do not give medical advice. Be empathetic and efficient.',
    mockResponse: 'Gracias por contactarnos. 💊 Hemos recibido tu solicitud. Nuestro equipo de atención al paciente verificará la disponibilidad y te confirmará los detalles en unos momentos.',
  },
  [AgentType.PERSONALIZED]: {
    id: AgentType.PERSONALIZED,
    name: 'Custom Bot',
    label: 'Personalizado',
    icon: '✨', // Using a star instead of plus for the emoji display
    color: '#121214',
    welcomeMessage: '¡Hola! Soy tu asistente virtual personalizado. 🤖 ¿En qué puedo ayudarte hoy?',
    systemInstruction: 'You are a versatile, customizable AI assistant. You can handle a wide range of queries from customer support to general information. Be helpful, polite, and adaptable.',
    mockResponse: 'Gracias por tu mensaje. 🤖 Esta es una respuesta automática de simulación. En una implementación real, el agente analizaría tu consulta y respondería contextualmente.',
  },
};

export const COLORS = {
  primary: '#6464FF',
  textDark: '#121214',
  textGray: '#38383D',
  bgLight: '#F7F8FF',
  bgWhite: '#FFFFFF',
  border: '#EBEBF0',
};