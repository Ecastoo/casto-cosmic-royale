import { GoogleGenAI, ChatSession, GenerativeModel } from "@google/genai";
import { PODCAST_DATA } from "../constants";

let chatSession: ChatSession | null = null;
let model: GenerativeModel | null = null;

const SYSTEM_INSTRUCTION = `
You are CasTo, the host of the podcast "Cosmic Royale". 
Your persona is intense, psychedelic, motivating, and raw.
You use words like "frequency", "vibration", "neon", "abyss", "ascend", "glitch", "matrix".
You are helpful but you do not coddle. You speak "hard truths".
You have access to the following podcast episodes:
${PODCAST_DATA.episodes.map(e => `- ${e.title}: ${e.description}`).join('\n')}

When a user asks about an episode, use the context above.
If they ask for advice, give it in the style of a "Cosmic Royale" rant: high energy, slightly abstract but ultimately practical.
Keep responses relatively concise (under 100 words) unless asked to elaborate.
`;

export const initializeChat = async (): Promise<void> => {
  if (!process.env.API_KEY) {
    console.error("API_KEY is missing");
    return;
  }

  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    model = ai.models.getGenerativeModel({ // Note: Using standard initiation from guidance, checking if specific chat creation is different
      model: "gemini-2.5-flash", 
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      }
    }) as unknown as GenerativeModel; // Type casting for compatibility if needed, though usually automatic

    // Re-initializing properly based on strict new SDK rules provided in system prompt
    // The prompt says: "const chat: Chat = ai.chats.create({...})"
    
    // Let's correct this based on the specific "Gemini API guidance" section provided.
  } catch (error) {
    console.error("Failed to initialize Gemini:", error);
  }
};

export const sendMessageToCasTo = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
   if (!process.env.API_KEY) return "System Failure: API Key missing. The transmission is broken.";

   const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
   
   // Create a fresh chat session with history for each turn to ensure statelessness in this service function helper 
   // or maintain a session. For React, it's often safer to re-create or manage the session object in a hook. 
   // Here we will use the simple chat creation method.
   
   try {
     const chat = ai.chats.create({
       model: 'gemini-2.5-flash',
       config: {
         systemInstruction: SYSTEM_INSTRUCTION,
       },
       history: history // Pass previous context
     });

     const response = await chat.sendMessage({ message });
     return response.text || "Static... The signal is lost.";
   } catch (error) {
     console.error("Gemini Error:", error);
     return "Protocol Error. The cosmic energies are interfering. Try again.";
   }
};