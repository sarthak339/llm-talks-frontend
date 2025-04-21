"use client";

import { useState } from "react";
import BotProfile from "@/src/components/BotProfile";
import ChatScreen from "@/src/components/ChatScreen";

export default function Home() {
  const [bots, setBots] = useState({ bot1: "", bot2: "" });
  const [started, setStarted] = useState(false);
  const [confirmedTopic, setConfirmedTopic] = useState("");
  const [editingTopic, setEditingTopic] = useState(true);
  const [topic, setTopic] = useState("");

  const handleSelect = (botId, value) => {
    setBots((prev) => ({ ...prev, [botId]: value }));
  };

  const handleSetTopic = () => {
    if (editingTopic) {
      if (topic.trim() === '') return alert("Please enter a topic.");
      setConfirmedTopic(topic.trim());
      setEditingTopic(false); // lock the topic
    } else {
      setEditingTopic(true); // unlock topic for editing
    }
  };

  const handleStart = () => {
    if (bots.bot1 && bots.bot2 && confirmedTopic) {
      setStarted(true);
    }
  };
  const handleEndChat = () => {
    console.log("sarthak")
    setBots({ bot1: '', bot2: '' });
    setTopic('');
    setConfirmedTopic('');
    setEditingTopic(true);
    setStarted(false);
  };

  const isBotsReady = bots.bot1 && bots.bot2;
  const canStartChat = isBotsReady && confirmedTopic && !editingTopic;

  return (
    <main className="p-10 min-h-screen bg-gray-100 flex flex-col items-center gap-6">
      {!started ? (
        <>
          <h1 className="text-3xl font-bold text-center">
            LLM Bot Battle Configurator
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-4xl">
            <BotProfile
              botId="bot1"
              selectedBot={bots.bot1}
              otherBot={bots.bot2}
              onSelect={handleSelect}
            />
            <BotProfile
              botId="bot2"
              selectedBot={bots.bot2}
              otherBot={bots.bot1}
              onSelect={handleSelect}
            />
          </div>
          <div className="flex flex-col items-center gap-2 mt-6 w-full max-w-2xl">
            <div className="flex w-full gap-2 items-center">
              {editingTopic ? (
                <input
                  type="text"
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  placeholder="Enter a topic for bots to debate..."
                  className="flex-1 p-3 border rounded shadow-sm"
                  required
                />
              ) : (
                <p className="flex-1 p-3 bg-gray-200 rounded border">
                  <span className="font-medium">Topic:</span> {confirmedTopic}
                </p>
              )}

              <button
                onClick={handleSetTopic}
                className={`px-4 py-2 ${
                  editingTopic
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-yellow-500 hover:bg-yellow-600"
                } text-white rounded cursor-pointer transition duration-200`}
              >
                {editingTopic ? "Set Topic" : "Edit Topic"}
              </button>
            </div>
          </div>

          {canStartChat && (
            <button
              onClick={handleStart}
              className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 cursor-pointer transition duration-200"
            >
              Start Chat
            </button>
          )}
        </>
      ) : (
        <ChatScreen bots={bots} topic = {topic} onEndChat={handleEndChat} />
      )}
    </main>
  );
}
