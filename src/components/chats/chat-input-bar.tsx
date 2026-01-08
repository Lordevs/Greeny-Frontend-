"use client";

import React from "react";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface ChatInputBarProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
  message,
  setMessage,
  onSend,
}) => {
  return (
    <div className="border-t border-border p-6 bg-white/80 backdrop-blur-md sticky bottom-0">
      <div className="max-w-4xl mx-auto relative group">
        <Input
          placeholder="Ask a follow-up question..."
          className="pl-4 pr-14 py-6 bg-muted/30 border-border/50 focus:bg-white focus:shadow-md transition-all rounded-xl"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && onSend()}
        />
        <Button
          size="icon"
          variant="ghost"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 rounded-lg transition-all",
            message.trim()
              ? "bg-primary text-primary-foreground hover:bg-primary/90"
              : "text-muted-foreground"
          )}
          onClick={onSend}
          disabled={!message.trim()}>
          <Send className="w-4 h-4" />
        </Button>
      </div>
      <p className="max-w-4xl mx-auto text-[10px] text-center text-muted-foreground mt-3 uppercase tracking-widest font-medium opacity-50">
        AI models can make mistakes. Verify important info.
      </p>
    </div>
  );
};
