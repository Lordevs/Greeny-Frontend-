"use client";

import React from "react";
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
  return (
    <div className="text-center mb-8 px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        What do you want to analyze today?
      </h2>

      {/* Input with options */}
      <div className="max-w-2xl mx-auto mb-6">
        <div className="relative group">
          <div className="absolute left-4 top-1/2 -translate-y-1/2">
            <Plus className="w-5 h-5 text-muted-foreground group-focus-within:text-primary transition-colors" />
          </div>
          <Input
            placeholder="Can you analyze saudi arabia CPI index for inflation from 2000 to now"
            className="pl-12 pr-14 py-7 text-lg bg-white shadow-sm border-border rounded-full focus-visible:ring-primary/20 transition-all"
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

      {/* Options */}
      <div className="flex items-center justify-center gap-3 flex-wrap">
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-white hover:bg-muted/50 transition-colors">
          Default <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-white hover:bg-muted/50 transition-colors">
          <Wrench className="w-4 h-4 mr-1.5 text-primary" /> Tools{" "}
          <ChevronDown className="w-4 h-4 ml-1 opacity-50" />
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-white hover:bg-muted/50 transition-colors">
          <Brain className="w-4 h-4 mr-1.5 text-blue-500" /> Advanced Reasoning
        </Button>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full bg-white hover:bg-muted/50 transition-colors">
          <Database className="w-4 h-4 mr-1.5 text-orange-500" /> Extended
          Memory
        </Button>
      </div>
    </div>
  );
};
