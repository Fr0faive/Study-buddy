import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextApiRequest, NextApiResponse } from "next";
import { initialize } from "next/dist/server/lib/render-server";
const firstMessage = "Hello, I am your Study Buddy. How can I help you?";

export async function POST(request: NextApiRequest, response: NextApiResponse) {
  const { message, conversation } = request.body;
  console.log("Endpoint Works");
  if (!conversation) {
    console.log("New Conversation");
    const newConversation = initializeChat(firstMessage);
  }
}
