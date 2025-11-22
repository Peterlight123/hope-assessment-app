"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { FAQS } from "@/lib/constants/faqs";

interface Message {
  id: string;
  type: "user" | "bot";
  content: string;
}

export default function FAQChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "bot",
      content:
        "Hi! I'm the HOPE Assistant. I can answer questions about assessments, fields, and how to use this platform. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to latest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const findAnswerForQuestion = (question: string): string | null => {
    const lowerQuestion = question.toLowerCase();

    // Find matching FAQ by keywords
    for (const faq of FAQS) {
      const hasMatchingKeyword = faq.keywords.some((keyword) =>
        lowerQuestion.includes(keyword)
      );
      if (hasMatchingKeyword) {
        return faq.answer;
      }
    }

    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    // Simulate bot thinking
    setTimeout(() => {
      const answer = findAnswerForQuestion(input);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "bot",
        content:
          answer ||
          "I'm not sure about that. Try asking about specific sections (A, J, M, N, Z), assessment types, dates, or other HOPE-related topics.",
      };
      setMessages((prev) => [...prev, botMessage]);
      setIsLoading(false);
    }, 800);
  };

  return (
    <>
      {/* Chat Bubble Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 bg-blue-500 hover:bg-blue-600 text-white"
        aria-label="Open chatbot"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-24 right-6 w-96 max-w-[calc(100vw-2rem)] rounded-lg shadow-2xl z-50 flex flex-col h-[500px] bg-white border border-gray-200"
          >
            {/* Header */}
            <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-blue-600 border-blue-200 rounded-t-lg">
              <h3 className="font-bold text-lg text-white">HOPE Assistant</h3>
              <p className="text-xs text-blue-100">Ask me anything about HOPE assessments</p>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-white">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.2 }}
                  className={`flex ${
                    message.type === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg text-sm leading-relaxed ${
                      message.type === "user"
                        ? "bg-blue-500 text-white rounded-br-none"
                        : "bg-gray-100 text-gray-900 rounded-bl-none"
                    }`}
                  >
                    {message.content}
                  </div>
                </motion.div>
              ))}
              {isLoading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2 px-4"
                >
                  <div className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                  <div
                    className="w-2 h-2 rounded-full bg-gray-400 animate-bounce"
                    style={{ animationDelay: "0.4s" }}
                  ></div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <form
              onSubmit={handleSubmit}
              className="p-4 border-t bg-gray-50 border-gray-200 rounded-b-lg"
            >
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask me anything..."
                  className="flex-1 px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={isLoading || !input.trim()}
                  className="p-2 bg-blue-500 hover:bg-blue-600 text-white rounded transition-colors disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
