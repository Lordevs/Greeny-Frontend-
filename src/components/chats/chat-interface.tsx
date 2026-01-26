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

import { useAnalysis } from "@/hooks/use-analysis";
import { useAuth } from "@/hooks/use-auth";
import { toast } from "sonner";
import { ROUTES } from "@/constants/routes";

import { ChatHeader } from "./chat-header";

export const ChatInterface: React.FC<ChatInterfaceProps> = ({
  initialMode = "welcome",
  chatId,
}) => {
  const router = useRouter();
  const { user } = useAuth();

  const {
    conversation,
    isLoadingConversation,
    uploadFile,
    isUploading,
    createConversation,
    isCreating,
    deleteConversation,
    analyze,
    isAnalyzing
  } = useAnalysis(chatId);

  const [message, setMessage] = useState("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const isLoading = isAnalyzing || isUploading || isCreating;

  const handleDeleteChat = () => {
    if (chatId) {
      deleteConversation(chatId, {
        onSuccess: () => {
          router.push(ROUTES.CHAT.ROOT);
        }
      });
    }
  };

  // Scroll to bottom on new messages or when bot starts thinking
  useEffect(() => {
    const scrollToBottom = () => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    // Use multiple triggers and a slightly longer delay to ensure layout is complete
    const timer = setTimeout(scrollToBottom, 50);
    return () => clearTimeout(timer);
  }, [conversation?.messages, isAnalyzing]);



  const handleSendMessage = async () => {
    const currentMessage = message.trim();
    if ((!currentMessage && !selectedFile) || isLoading) return;

    if (initialMode === "welcome") {
      // Logic for new conversation

      const chatTitle = currentMessage
        ? (currentMessage.length > 40 ? currentMessage.substring(0, 40) + "..." : currentMessage)
        : (selectedFile ? `Analysis of ${selectedFile.name}` : "New Analysis");

      const proceedToCreate = (fileId?: string) => {
        createConversation({
          title: chatTitle,
          uploaded_file_id: fileId,
          model: 'claude-sonnet-4-5'
        }, {
          onSuccess: (newConv) => {
            if (currentMessage) {
              sessionStorage.setItem("pending_analysis", currentMessage);
            }
            router.push(`${ROUTES.CHAT.ROOT}/${newConv.id}`);
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.error || "Failed to create conversation");
          }
        });
      };

      if (selectedFile) {
        uploadFile(selectedFile, {
          onSuccess: (data) => {
            proceedToCreate(data.file.id);
          },
          onError: (err: any) => {
            toast.error(err.response?.data?.error || "File upload failed");
          }
        });
      } else {
        proceedToCreate();
      }
    } else if (chatId) {
      // Follow up in existing conversation
      setMessage("");
      setSelectedFile(null);
      analyze(currentMessage);
    }
  };



  // Trigger pending analysis if any
  useEffect(() => {
    if (conversation && !isLoadingConversation && initialMode === "response") {
      const pending = sessionStorage.getItem("pending_analysis");
      if (pending && conversation.messages.length === 0) {
        sessionStorage.removeItem("pending_analysis");
        analyze(pending);
      }
    }
  }, [conversation, isLoadingConversation, initialMode, analyze]);

  if (chatId && isLoadingConversation) {
    return (
      <div className="flex h-full items-center justify-center bg-background">
        <div className="animate-pulse text-primary-foreground font-bold">Initializing Analysis Agent...</div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full bg-background relative overflow-hidden">
      {/* Header */}
      <ChatHeader
        title={initialMode === "welcome" ? "AI Analysis Hub" : (conversation?.title || "Analysis Detail")}
        onDelete={initialMode === "response" ? handleDeleteChat : undefined}
      />


      {/* Main Content Area */}
      <div
        ref={scrollContainerRef}
        className={cn(
          "flex-1 overflow-y-auto scroll-smooth",
          initialMode === "welcome" && "flex items-center justify-center p-4 md:p-6"
        )}>
        <div
          className={cn(
            "w-full mx-auto",
            initialMode === "welcome" ? "py-0" : "py-8 md:py-12 max-w-5xl"
          )}>
          {initialMode === "welcome" ? (
            <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full max-w-4xl mx-auto">
              <ChatWelcome
                message={message}
                setMessage={setMessage}
                onSend={handleSendMessage}
                selectedFile={selectedFile}
                onFileSelect={setSelectedFile}
                isLoading={isLoading}
              />
            </div>
          ) : (
            <div className="space-y-12">
              {conversation?.messages.map((msg, index) => {
                // Only render assistant messages, and pass the preceding user message to them
                if (msg.role !== 'assistant') return null;

                const prevMsg = conversation.messages[index - 1];
                const userMessage = prevMsg?.role === 'user' ? prevMsg : undefined;

                return (
                  <div
                    key={msg.id}
                    className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                    <ChatResponse
                      userMessage={userMessage?.content}
                      title={msg.had_error ? "Analysis Error" : "Analysis Result"}
                      description={msg.content}
                      plotImage={msg.plot_image}
                      isVisualization={msg.is_visualization}
                      hadError={msg.had_error}
                    />
                  </div>
                );
              })}

              {isAnalyzing && (
                <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                  <div className="flex flex-col md:flex-row items-start gap-4">
                    <div className="w-10 h-10 shrink-0 rounded-full bg-primary-foreground flex items-center justify-center text-secondary shadow-lg md:mt-2 border border-white/20">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-secondary"></div>
                    </div>
                    <div className="flex-1 w-full bg-secondary p-8 rounded-3xl shadow-xl border border-white/5">
                      <h3 className="text-xl font-bold text-primary-foreground mb-3">Thinking...</h3>
                      <p className="text-primary-foreground/70 animate-pulse">Our AI is processing your data and generating insights.</p>
                    </div>
                  </div>
                </div>
              )}
              {/* Scroll anchor */}
              <div ref={messagesEndRef} className="h-4" />
            </div>
          )}
        </div>
      </div>


      {/* Footer Input */}
      {initialMode === "response" && (
        <div className="animate-in fade-in slide-in-from-bottom-2 duration-500 shrink-0">
          <ChatInputBar
            message={message}
            setMessage={setMessage}
            onSend={handleSendMessage}
            isLoading={isLoading}
          />

        </div>
      )}

    </div>
  );
};
