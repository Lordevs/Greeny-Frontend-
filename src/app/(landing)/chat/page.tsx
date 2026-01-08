"use client";

import { useState } from "react";
import AIHeader from "@/components/landing/chat/ai-header";
import MessageList from "@/components/landing/chat/message-list";
import ChatInput from "@/components/landing/chat/chat-input";
import CTASection from "@/components/common/cta-section";

export default function ChatPage() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<
    Array<{ role: "user" | "assistant"; content: string }>
  >([
    {
      role: "user",
      content:
        "Can you analyze saudi arabia CPI index for inflation from 2008 to now",
    },
    {
      role: "assistant",
      content: "initial_analysis", // Key for the detailed card in MessageList
    },
  ]);

  const handleSend = () => {
    if (!message.trim()) return;

    const userMessage = message;
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setMessage("");

    // Simple auto-reply simulation for demo
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: `I'm analyzing your request: "${userMessage}". This is a demo view - sign up to unlock full real-time data integration!`,
        },
      ]);
    }, 800);
  };

  return (
    <main className="min-h-screen flex flex-col pt-20 bg-background">
      {/* Interaction Container */}
      <section className="flex-1 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto flex flex-col min-h-[600px]">
          <AIHeader />
          <div className="flex-1 overflow-y-auto mb-8 scrollbar-hide">
            <MessageList messages={messages} />
          </div>
          <ChatInput
            message={message}
            setMessage={setMessage}
            onSend={handleSend}
          />
        </div>
      </section>

      {/* CTA Section */}
      <CTASection
        title="Ready to Get Started?"
        description="Join thousands of teams who are making data-driven decisions every day. No credit card required."
        buttonText="Start Your Free Trial"
      />
    </main>
  );
}
