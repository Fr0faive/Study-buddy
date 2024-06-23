"use client";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

export default function Chat() {
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [messageInput, setMessageInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [conversationObject, setConversationObject] = useState(null);

  const chatRef = useRef(null);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMessageInput(e.target.value);
  };

  const handleChatInput = async () => {
    const message = messageInput;
    console.log("COnversation Object", conversationObject);
    if (messageInput === "") return;
    else {
      setLoading(true);
      const apiResponse = await axios.post("/api/chat", {
        message,
        conversation: conversationObject,
      });

      const apiData = apiResponse?.data;
      if (apiResponse?.status === 403) {
        updateChatHistory(apiData);
        return;
      }

      updateChatHistory(apiResponse?.data?.text);

      setMessageInput("");
    }
  };

  interface ChatMessage {
    role: "user" | "buddy";
    part: string[];
  }

  const updateChatHistory = async (message: any) => {
    const newHistory: ChatMessage[] = [...chatHistory];

    newHistory.push({ role: "user", part: [messageInput] });
    newHistory.push({ role: "buddy", part: [message] });

    // (Optionally) Update the original chatHistory:
    setChatHistory(newHistory);
    setLoading(false);
  };

  const initializeChatbot = async () => {
    setLoading(true);

    const apiResponse = await axios.post("api/chat", {
      message: "",
      conversation: null,
    });

    setChatHistory([
      {
        role: "buddy",
        part: ["Hi, I am your Study Buddy. How can I help you?"],
      },
    ]);

    setLoading(false);
    const initData = apiResponse?.data;
    const newConversationObject = initData?.conversation;
    setConversationObject(newConversationObject);
  };

  useEffect(() => {
    initializeChatbot();
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      event.preventDefault();
    }
  };
  return (
    <div className="flex flex-col gap-4 h-screen p-4">
      <a href="/" className="text-xl font-semibold">
        {" "}
        &#8592; Chatbot
      </a>
      <div ref={chatRef} className="flex-1 overflow-y-auto">
        {chatHistory.map((message, index) => (
          <>
            {message.role === "buddy" ? (
              <div
                key={message.role + index}
                className="flex flex-row-reverse items-center gap-2"
              >
                <div className="flex items-center">
                  <img
                    src="https://source.unsplash.com/random/200×200"
                    alt=""
                    className="overflow-hidden h-10 w-14 rounded-full"
                  />
                </div>
                <h1>Buddy</h1>
                <p className="text-xs p-3 bg-[#00707E] rounded-md text-white">
                  {message.part}
                </p>
              </div>
            ) : (
              <div
                key={message.role + index}
                className="flex flex-row items-center gap-2"
              >
                <div className="flex items-center">
                  <img
                    src="https://source.unsplash.com/random/200×200"
                    alt=""
                    className="overflow-hidden h-10 w-14 rounded-full"
                  />
                </div>
                <h1>User</h1>
                <p className="text-xs p-3 bg-[#00707E] rounded-md text-white">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Odit,
                  debitis.
                </p>
              </div>
            )}
          </>
        ))}
      </div>
    </div>
  );
}
