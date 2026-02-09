import { GoogleGenAI, Chat } from "@google/genai";
import { Message } from "../types";

let chatSession: Chat | null = null;
let currentModel: string | null = null;

// Initialize the API client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const initializeChat = (systemInstruction: string) => {
  chatSession = ai.chats.create({
    model: 'gemini-3-pro-preview',
    config: {
      systemInstruction,
      temperature: 0.7,
    },
  });
  return chatSession;
};

export const sendMessageToGemini = async (message: string): Promise<string> => {
  if (!chatSession) {
    throw new Error("Chat session not initialized.");
  }

  try {
    const result = await chatSession.sendMessage({ message });
    return result.text || "";
  } catch (error) {
    console.error("Error sending message to Gemini:", error);
    return "Lo siento, tuve un problema al procesar tu solicitud. ¿Podrías intentarlo de nuevo?";
  }
};