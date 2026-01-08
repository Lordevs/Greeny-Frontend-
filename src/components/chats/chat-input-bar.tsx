"use client";

import React, { useRef } from "react";
import { Send, Plus } from "lucide-react";
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
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      console.log("File selected:", file.name);
      // Logic for adding file to chat would go here
    }
  };

  return (
    <div className="border-t border-border p-6 backdrop-blur-md sticky bottom-0">
      <div className="max-w-4xl mx-auto relative group flex items-center gap-2">
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
        />
        <div className="relative flex-1">
          <Button
            size="icon"
            variant="ghost"
            onClick={handlePlusClick}
            className="absolute left-2 top-1/2 -translate-y-1/2 h-8 w-8 rounded-lg hover:bg-muted text-muted-foreground transition-all z-10">
            <Plus className="w-5 h-5" />
          </Button>
          <Input
            placeholder="Ask a follow-up question..."
            className="pl-12 pr-14 py-6 bg-primary-foreground border-primary/50 focus:bg-primary-foreground focus:shadow-md transition-all rounded-xl"
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
      </div>
      <p className="max-w-4xl mx-auto text-[11px] text-center text-primary-foreground mt-3 uppercase tracking-widest font-medium">
        AI models can make mistakes. Verify important info.
      </p>
    </div>
  );
};
