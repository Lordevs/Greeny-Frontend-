"use client";

import React, { useRef } from "react";
import { Plus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getFileIcon } from "@/lib/chat-utils";

interface ChatWelcomeProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

export const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  message,
  setMessage,
  onSend,
  selectedFile,
  onFileSelect,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const fileInfo = selectedFile ? getFileIcon(selectedFile.name) : null;
  const FileIconComponent = fileInfo?.icon;

  const handlePlusClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileSelect(file);
    }
  };

  const clearFile = () => {
    onFileSelect(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className="text-center px-4">
      <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">
        What do you want to analyze today?
      </h2>

      {/* Input with options */}
      <div className="max-w-2xl mx-auto mb-60">
        <div className="flex flex-col gap-3">
          {selectedFile && fileInfo && FileIconComponent && (
            <div
              className={`self-start flex items-center gap-2 ${fileInfo.bgColor} px-3 py-1.5 rounded-lg border border-border animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm`}>
              <FileIconComponent className={`w-4 h-4 ${fileInfo.color}`} />
              <span className="text-xs font-semibold truncate max-w-[200px]">
                {selectedFile.name}
              </span>
              <button
                onClick={clearFile}
                className="ml-1 p-0.5 hover:bg-background/50 rounded-full transition-colors">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          <div className="relative group w-full">
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
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (message.trim() || selectedFile) &&
                onSend()
              }
            />
            <Button
              size="icon"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full h-11 w-11 shadow-md hover:shadow-lg transition-all"
              onClick={onSend}
              disabled={!message.trim() && !selectedFile}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
