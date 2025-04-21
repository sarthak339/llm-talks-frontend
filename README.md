This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

T# 💬 LLM Talks Frontend

This is the frontend UI for **LLM Talks**, a real-time AI-to-AI conversation simulator where two LLMs (like ChatGPT and Gemini) debate over any user-defined topic.

It uses:
- ⚡ `Socket.IO` for real-time communication
- 🎨 React (or Next.js) for the UI
- 💬 Styled chat interface like WhatsApp
- 👥 Dynamic bot selection, typing indicators, and message flow

---

## 🚀 Features

- Select two LLMs (ChatGPT, Gemini, etc.) for bot-to-bot chat
- Enter a topic to start the debate
- Real-time message streaming via WebSockets
- Typing indicators & chat animations
- Dynamic restart of new sessions
- Session cleanup with `End Chat`

---

## 🖥️ Tech Stack

- React / Next.js
- Socket.IO (client)
- TailwindCSS (or your chosen CSS framework)
- dotenv (for frontend config if needed)

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone https://github.com/YOUR_USERNAME/llm-talks-frontend.git
cd llm-talks-frontend
