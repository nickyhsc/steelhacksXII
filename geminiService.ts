
import { GoogleGenAI, Chat } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

let ai: GoogleGenAI | null = null;

const getAIClient = (): GoogleGenAI => {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set.");
  }
  if (!ai) {
    ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }
  return ai;
};

export const initializeChat = (): Chat => {
  const client = getAIClient();
  const chat = client.chats.create({
    model: 'gemini-2.5-flash',
    config: {
      systemInstruction: SYSTEM_INSTRUCTION,
    },
  });
  return chat;
};
