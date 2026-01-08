"use client";

import React, { useRef } from "react";
import { Send, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getFileIcon } from "@/lib/chat-utils";

interface ChatInputBarProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
}

export const ChatInputBar: React.FC<ChatInputBarProps> = ({
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
    <div className="border-t border-primary-foreground/70 p-6 backdrop-blur-md sticky bottom-0">
      <div className="max-w-4xl mx-auto flex flex-col gap-3">
        {selectedFile && fileInfo && FileIconComponent && (
          <div
            className={`self-start flex items-center gap-2 ${fileInfo.bgColor} px-3 py-1.5 rounded-lg border border-border animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm`}>
            <FileIconComponent className={`w-4 h-4 ${fileInfo.color}`} />
            <span className="text-xs font-semibold truncate max-w-[250px]">
              {selectedFile.name}
            </span>
            <button
              onClick={clearFile}
              className="ml-1 p-0.5 hover:bg-background/50 rounded-full transition-colors">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        <div className="relative group w-full flex items-center gap-2">
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
              onKeyDown={(e) =>
                e.key === "Enter" &&
                (message.trim() || selectedFile) &&
                onSend()
              }
            />
            <Button
              size="icon"
              variant="ghost"
              className={cn(
                "absolute right-2 top-1/2 -translate-y-1/2 rounded-lg transition-all",
                message.trim() || selectedFile
                  ? "bg-primary text-primary-foreground hover:bg-primary/90"
                  : "text-muted-foreground"
              )}
              onClick={onSend}
              disabled={!message.trim() && !selectedFile}>
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
      <p className="max-w-4xl mx-auto text-[11px] text-center text-primary-foreground mt-3 uppercase tracking-widest font-medium">
        AI models can make mistakes. Verify important info.
      </p>
    </div>
  );
};
