"use client";

import React, { useRef } from "react";
import { Plus, Send, ChevronDown, Wrench, Brain, Database } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatWelcomeProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
}

export const ChatWelcome: React.FC<ChatWelcomeProps> = ({
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
      console.log("File selected in welcome:", file.name);
    }
  };

  return (
    <div className="text-center px-4">
      {/* Welcome Icon/Logo */}
      {/* ... previous content omitted for brevity ... */}

      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        What do you want to analyze today?
      </h2>

      {/* Input with options */}
      <div className="max-w-2xl mx-auto mb-60">
        <div className="relative group">
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
          />
          <div className="absolute left-4 top-1/2 -translate-y-1/2 z-10">
            <Button
              size="icon"
              variant="ghost"
              onClick={handlePlusClick}
              className="h-8 w-8 rounded-full hover:bg-muted text-muted-foreground group-focus-within:text-primary transition-colors">
              <Plus className="w-5 h-5" />
            </Button>
          </div>
          <Input
            placeholder="Can you analyze saudi arabia CPI index for inflation from 2000 to now"
            className="pl-14 pr-14 py-7 text-lg bg-white shadow-sm border-border rounded-full focus-visible:ring-primary/20 transition-all"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onSend()}
          />
          <Button
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-11 w-11 shadow-md hover:shadow-lg transition-all"
            onClick={onSend}
            disabled={!message.trim()}>
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
