"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { ChatWelcome } from "./chat-welcome";
import { ChatResponse } from "./chat-response";
import { ChatInputBar } from "./chat-input-bar";
import { cn } from "@/lib/utils";

const cpiTrendData = [
  { year: "2000", value: 60 },
  { year: "2002", value: 65 },
  { year: "2004", value: 70 },
  { year: "2006", value: 80 },
  { year: "2008", value: 95 },
  { year: "2010", value: 85 },
  { year: "2012", value: 90 },
  { year: "2014", value: 95 },
  { year: "2016", value: 100 },
  { year: "2018", value: 102 },
  { year: "2020", value: 98 },
  { year: "2022", value: 105 },
  { year: "2024", value: 110 },
];

const cpiIndexData = [
  { year: "2000", value: 100 },
  { year: "2005", value: 105 },
  { year: "2010", value: 115 },
  { year: "2015", value: 120 },
  { year: "2020", value: 125 },
  { year: "2024", value: 130 },
];

interface ChatInterfaceProps {
  initialMode?: "welcome" | "response";
  chatId?: string;
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialMode = "welcome",
  chatId,
}) => {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState("");

  const handleSendMessage = () => {
    if (!message.trim()) return;

    // If we are in welcome mode, simulate starting a new chat and redirect
    if (mode === "welcome") {
      const newChatId = Math.random().toString(36).substring(7);
      router.push(`/chats/${newChatId}`);
      // In a real app, you'd save the message and process it here
    } else {
      console.log("Follow up:", message);
      setMessage("");
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative">
      {/* Header */}
      <div className="border-b border-border p-4 bg-secondary backdrop-blur-sm sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-bold text-primary-foreground tracking-tight">
              AI Analysis Hub
            </h1>
            <Badge
              variant="secondary"
              className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider">
              Agent Active
            </Badge>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={cn(
          "flex-1 overflow-y-auto scroll-smooth",
          mode === "welcome" && "flex items-center justify-center"
        )}>
        <div
          className={cn(
            "px-6 w-full",
            mode === "welcome" ? "py-0" : "py-12 md:py-20"
          )}>
          {mode === "welcome" ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full max-w-4xl mx-auto">
              <ChatWelcome
                message={message}
                setMessage={setMessage}
                onSend={handleSendMessage}
              />
            </div>
          ) : (
            <ChatResponse
              title="Saudi Arabia CPI & Inflation Analysis (2000-2024)"
              description="I've analyzed Saudi Arabia's Consumer Price Index (CPI) and inflation rates from 2000 to 2024. Here's what the data reveals about economic trends and stability periods."
              trendData={cpiTrendData}
              indexData={cpiIndexData}
            />
          )}
        </div>
      </div>

      {/* Footer Input */}
      {mode === "response" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
          <ChatInputBar
            message={message}
            setMessage={setMessage}
            onSend={handleSendMessage}
          />
        </div>
      )}
    </div>
  );
};
