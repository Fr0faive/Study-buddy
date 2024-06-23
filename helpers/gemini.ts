import { GoogleGenerativeAI } from "@google/generative-ai";

let conversation = null;

export function initializeChat(message: any) {
  const geminiApiKey = process.env.GEMINI_API_KEY || ""; // Providing default empty string value
  const model = new GoogleGenerativeAI(geminiApiKey).getGenerativeModel({
    model: "gemini-pro",
  });

  const initHistory = [
    {
      role: "user",
      part: [message],
    },
    {
      role: "buddy",
      part: "Hi, I am your Study Buddy. How can I help you?",
    },
  ];
  conversation = model.startChat({
    history: initHistory,
    generationConfig: {
      maxOutputTokens: 350,
    },
  });
  conversation._apiKey = null;
  return conversation;
}
