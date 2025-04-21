"use client";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import MessageBubble from "./../MessageBubble";
import TypingDots from "./../TypingDots";

const socket = io("http://localhost:3002"); // replace with your backend URL

const BOT_LABELS = {
  chatgpt: "ChatGPT",
  gemini: "Gemini",
  mistral: "Mistral",
  llama2: "LLaMA 2",
};

export default function ChatScreen({ bots, topic, onEndChat }) {
  const [messages, setMessages] = useState([]);
  const [isChatting, setIsChatting] = useState(false);
  const [typingBot, setTypingBot] = useState(null);

  const getTime = () => new Date().toLocaleTimeString();

  const handleEndChat = () => {
    // ✅ kill the connection
    console.log("dissconnected");
    socket.emit("end-chat"); // 🔌 tell backend to stop
    onEndChat(); 
  };
  const handleBot1Message = (data) => {
    setTypingBot(null);
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.message === data.message && last?.from === "bot1") return prev;
      return [
        ...prev,
        {
          from: "bot1",
          model: data.model,
          message: data.message,
          time: getTime(),
          align: "left",
        },
      ];
    });
  };

  const handleBot2Message = (data) => {
    setTypingBot(null);
    setMessages((prev) => {
      const last = prev[prev.length - 1];
      if (last?.message === data.message && last?.from === "bot2") return prev;
      return [
        ...prev,
        {
          from: "bot2",
          model: data.model,
          message: data.message,
          time: getTime(),
          align: "right",
        },
      ];
    });
  };

  useEffect(() => {
    if (!bots.bot1 || !bots.bot2 || !topic) return;
    setMessages([
      {
        from: "bot1",
        model: bots.bot1,
        message: `Hello! I’m ${leftBot}, and I’m ready to begin.`,
        time: getTime(),
        align: "left",
      },
      {
        from: "bot2",
        model: bots.bot2,
        message: `Hi ${leftBot}, I’m ${rightBot}. Let’s dive in!`,
        time: getTime(),
        align: "right",
      },
    ]);

    socket.emit("start-chat", { topic, bot1: bots.bot1, bot2: bots.bot2 });

    socket.on("bot1-typing", () => setTypingBot("bot1"));
    socket.on("bot2-typing", () => setTypingBot("bot2"));

    socket.on("bot1", handleBot1Message);
    socket.on("bot2", handleBot2Message);

    return () => {
      socket.off("bot1", handleBot1Message);
      socket.off("bot2", handleBot2Message);
      socket.off("bot1-typing");
      socket.off("bot2-typing");
    };
  }, [bots.bot1, bots.bot2, topic]);

  const leftBot = BOT_LABELS[bots.bot1] || bots.bot1;
  const rightBot = BOT_LABELS[bots.bot2] || bots.bot2;

  return (
    <div className="w-full max-w-4xl p-4 bg-white rounded-xl shadow-md">
      <div className="flex justify-between items-center mb-2">
        <div className="text-sm text-gray-600 font-semibold">
          🤖 {leftBot} vs {rightBot}
        </div>
        {/* Centered topic */}
        <h2 className="text-lg font-bold text-center">
          Topic: <span>{topic}</span>
        </h2>
        <button
          onClick={handleEndChat}
          className="px-4 py-1 bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer transition duration-200"
        >
          End Chat
        </button>
      </div>

      <div className="max-h-[70vh] overflow-y-auto border rounded p-4 bg-gray-50">
        {messages.map((msg, idx) => (
          <MessageBubble key={idx} {...msg} />
        ))}

        {/* Typing dots placeholder */}
        {typingBot && (
          <TypingDots align={typingBot === "bot1" ? "left" : "right"} />
        )}
      </div>
    </div>
  );
}
