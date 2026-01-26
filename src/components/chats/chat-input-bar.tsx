"use client";

import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ChatInputBarProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  isLoading?: boolean;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({

  message,
  setMessage,
  onSend,
  isLoading,
}) => {
  return (
    <div className="p-6 md:p-8 sticky bottom-0 z-20 bg-background/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <div className="rounded-3xl p-6 md:p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-3 text-left">
            <div className="bg-primary-foreground rounded-2xl p-3 pl-4 flex items-end gap-3 group focus-within:ring-2 focus-within:ring-destructive/10 transition-all border border-primary">
              <textarea
                placeholder="Ask a follow-up question..."
                disabled={isLoading}
                className="flex-1 border-none bg-transparent focus:outline-none px-0 py-2 h-auto min-h-[40px] max-h-[200px] placeholder:text-primary text-base resize-none field-sizing-content scroll-bar-hide disabled:opacity-50"
                value={message}
                rows={1}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    if (e.ctrlKey || e.shiftKey) {
                      // Let default behavior (new line) happen
                      return;
                    } else {
                      e.preventDefault();
                      if (message.trim() && !isLoading) {
                        onSend();
                      }
                    }
                  }
                }}
              />

              <div className="pb-1 gap-4">
                <Button
                  size="icon"
                  variant="ghost"
                  className={cn(
                    "rounded-full h-10 w-10 transition-all border border-primary shrink-0 shadow-sm",
                    message.trim()
                      ? "bg-primary text-primary-foreground hover:bg-primary/80"
                      : "text-primary-foreground bg-primary/50 cursor-not-allowed"
                  )}
                  onClick={onSend}
                  disabled={!message.trim() || isLoading}>
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <Send className="w-5 h-5 -rotate-45" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

