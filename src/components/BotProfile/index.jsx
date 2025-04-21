
'use client';

import {useState} from "react";

function BotProfile({botId,  selectedBot, otherBot, onSelect}) {
    const [selected, setSelected] = useState('');

    const bots = [
        { id: 'chatgpt', label: 'ChatGPT 3.5 (OpenRouter)' },
        { id: 'gemini', label: 'Gemini Pro (Google AI)' },
        { id: 'mistral', label: 'Mistral 7B (Together AI)' },
        { id: 'llama2', label: 'LLaMA 2 7B (DeepInfra)' }
      ];
  
    const handleChange = (e) => {
      const bot = e.target.value;
      setSelected(bot);
      onSelect(botId, bot);
    };
  return (
    <div className="border rounded-xl p-4 shadow-md bg-white w-full">
      <h2 className="text-lg font-semibold mb-2">Select LLM for Bot {botId === 'bot1' ? '1' : '2'}</h2>
      <select
        className="w-full p-2 border rounded"
        value={selectedBot}
        onChange={(e) => onSelect(botId, e.target.value)}
      >
        <option value="">-- Choose a bot --</option>
        {bots
          .filter((bot) => bot.id !== otherBot)
          .map((bot) => (
            <option key={bot.id} value={bot.id}>
              {bot.label}
            </option>
          ))}
      </select>
    </div>
  );
}

export default BotProfile;
