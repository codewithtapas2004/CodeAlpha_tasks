
import { GoogleGenAI } from "@google/genai";


const API_KEY = process.env.API_KEY;

if (!API_KEY) {

  console.warn("API_KEY environment variable not set. AI features will not work.");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateTaskDescription = async (taskTitle: string): Promise<string | null> => {
  if (!API_KEY) {
    console.error("Gemini API key is not configured.");
    return "API Key not configured. Please set the API_KEY environment variable.";
  }
  
  try {
  
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Task Title: "${taskTitle}"`,
      config: {
        systemInstruction: "You are an assistant for a project management tool. Your task is to generate a concise, actionable, and clear description for the provided task title. The description should be 1-3 sentences long."
      }
    });

    const text = response.text;
    
    if (text) {
        return text.trim();
    } else {
        return "Failed to generate a description.";
    }
  } catch (error) {
    console.error('Error calling Gemini API:', error);
    return "An error occurred while generating the description.";
  }
};
