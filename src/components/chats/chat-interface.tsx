"use client";

import React, { useState, useEffect } from "react";
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

interface Turn {
  id: string;
  userMessage?: string;
  userFile?: File | null;
  title: string;
  description: string;
  trendData: any[];
  indexData: any[];
}

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialMode = "welcome",
  chatId,
}) => {
  const router = useRouter();
  const [mode, setMode] = useState(initialMode);
  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [turns, setTurns] = useState<Turn[]>([]);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  // Scroll to bottom on new turns
  useEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, [turns]);

  // On mount, if we are in response mode, check if we have a pending initial message or generate default
  useEffect(() => {
    if (mode === "response" && turns.length === 0) {
      const pendingMessage = sessionStorage.getItem("pending_chat_message");
      const initialId = "initial";
      const userMsg =
        pendingMessage || "Analyzing historical CPI data patterns...";

      // Add loading state turn
      setTurns([
        {
          id: initialId,
          userMessage: userMsg,
          userFile: null,
          title: "Synthesizing Data Insights...",
          description:
            "Applying advanced cross-correlation algorithms to the current dataset...",
          trendData: [],
          indexData: [],
        },
      ]);

      if (pendingMessage) sessionStorage.removeItem("pending_chat_message");

      // Complete the turn with real data after a delay
      const timer = setTimeout(() => {
        setTurns((prev) =>
          prev.map((t) =>
            t.id === initialId
              ? {
                  ...t,
                  title: "Saudi Arabia CPI & Inflation Analysis (2000-2024)",
                  description:
                    "I've analyzed Saudi Arabia's Consumer Price Index (CPI) and inflation rates from 2000 to 2024. Here's what the data reveals about economic trends and stability periods.",
                  trendData: cpiTrendData,
                  indexData: cpiIndexData,
                }
              : t
          )
        );
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [mode, turns.length]);

  const handleSendMessage = () => {
    if (!message.trim() && !selectedFile) return;

    const currentMessage = message.trim();
    const currentFile = selectedFile;
    setMessage("");
    setSelectedFile(null);

    // If we are in welcome mode, navigate to a new chat ID page
    if (mode === "welcome") {
      sessionStorage.setItem("pending_chat_message", currentMessage);
      const newChatId = Math.random().toString(36).substring(7);
      router.push(`/chats/${newChatId}`);
    } else {
      // Follow up turn
      const turnId = Date.now().toString();
      const loadingTurn: Turn = {
        id: turnId,
        userMessage: currentMessage,
        userFile: currentFile,
        title: "Processing insights...",
        description:
          "Scanning for sector-specific anomalies and historical precedents...",
        trendData: [],
        indexData: [],
      };

      setTurns((prev) => [...prev, loadingTurn]);

      setTimeout(() => {
        setTurns((prev) =>
          prev.map((t) =>
            t.id === turnId
              ? {
                  ...t,
                  title: "Targeted Sector Analysis",
                  description:
                    "Continuing our investigation into the specific parameters you highlighted. I've integrated these findings with the broader regional volatility index for more granular context.",
                  trendData: cpiTrendData,
                  indexData: cpiIndexData,
                }
              : t
          )
        );
      }, 1500);
    }
  };

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      <div className="border-b border-border p-4 bg-secondary backdrop-blur-sm sticky top-0 z-10 w-full shrink-0">
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
        ref={scrollContainerRef}
        className={cn(
          "flex-1 overflow-y-auto scroll-smooth",
          mode === "welcome" && "flex items-center justify-center p-4 md:p-6"
        )}>
        <div
          className={cn(
            "w-full mx-auto",
            mode === "welcome" ? "py-0" : "py-8 md:py-12 max-w-5xl"
          )}>
          {mode === "welcome" ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full max-w-4xl mx-auto">
              <ChatWelcome
                message={message}
                setMessage={setMessage}
                onSend={handleSendMessage}
                selectedFile={selectedFile}
                onFileSelect={setSelectedFile}
              />
            </div>
          ) : (
            <div className="space-y-12">
              {turns.map((turn) => (
                <div
                  key={turn.id}
                  className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <ChatResponse
                    userMessage={turn.userMessage}
                    userFile={turn.userFile}
                    title={turn.title}
                    description={turn.description}
                    trendData={turn.trendData}
                    indexData={turn.indexData}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Footer Input */}
      {mode === "response" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 shrink-0">
          <ChatInputBar
            message={message}
            setMessage={setMessage}
            onSend={handleSendMessage}
            selectedFile={selectedFile}
            onFileSelect={setSelectedFile}
          />
        </div>
      )}
    </div>
  );
};
