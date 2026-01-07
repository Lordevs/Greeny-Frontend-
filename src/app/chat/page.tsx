"use client";

import { useState } from "react";
import AIHeader from "@/components/chat/ai-header";
import MessageList from "@/components/chat/message-list";
import ChatInput from "@/components/chat/chat-input";
import CTASection from "@/components/common/cta-section";

export default function ChatPage() {
  const [message, setMessage] = useState("");

  return (
    <main className="min-h-screen flex flex-col pt-20">
      {/* Interaction Container */}
      <section className="flex-1 py-12 px-6">
        <div className="max-w-4xl mx-auto flex flex-col min-h-full">
          <AIHeader />
          <div className="flex-1">
            <MessageList />
          </div>
          <ChatInput message={message} setMessage={setMessage} />
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
