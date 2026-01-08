"use client";

import React, { useState } from "react";
import { Send, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { getFileIcon } from "@/lib/chat-utils";
import { FileUploadDialog } from "./file-upload-dialog";

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
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const fileInfo = selectedFile ? getFileIcon(selectedFile.name) : null;
  const FileIconComponent = fileInfo?.icon;

  const handlePlusClick = () => {
    setIsUploadOpen(true);
  };

  const clearFile = () => {
    onFileSelect(null);
  };

  return (
    <div className="p-6 md:p-8 sticky bottom-0 z-20 bg-background/5 backdrop-blur-sm">
      <div className="max-w-4xl mx-auto">
        <FileUploadDialog
          open={isUploadOpen}
          onOpenChange={setIsUploadOpen}
          onFileSelect={onFileSelect}
        />

        <div className="rounded-3xl p-6 md:p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-3 text-left">
            {selectedFile && fileInfo && FileIconComponent && (
              <div
                className={cn(
                  "self-start flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm shrink-0 bg-primary-foreground"
                )}>
                <FileIconComponent className={cn("w-4 h-4", fileInfo.color)} />
                <span
                  className={cn(
                    "text-xs font-semibold truncate max-w-[200px]",
                    fileInfo.color
                  )}>
                  {selectedFile.name}
                </span>
                <button
                  onClick={clearFile}
                  className="ml-1 p-0.5 hover:bg-black/10 rounded-full transition-colors">
                  <X className="w-3.5 h-3.5 text-black" />
                </button>
              </div>
            )}

            <div className="bg-primary-foreground rounded-2xl p-3 pl-4 flex items-end gap-3 group focus-within:ring-2 focus-within:ring-destructive/10 transition-all border border-primary">
              <div className="pb-1">
                <Button
                  size="icon"
                  variant="default"
                  onClick={handlePlusClick}
                  className="h-8 w-8 rounded-full bg-primary hover:bg-primary/80 shadow-md shadow-primary transition-all shrink-0">
                  <Plus className="w-5 h-5 text-white" />
                </Button>
              </div>

              <textarea
                placeholder="Ask a follow-up question..."
                className="flex-1 border-none bg-transparent focus:outline-none px-0 py-2 h-auto min-h-[40px] max-h-[200px] placeholder:text-primary text-base resize-none field-sizing-content scroll-bar-hide"
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
                      if (message.trim() || selectedFile) {
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
                    message.trim() || selectedFile
                      ? "bg-primary text-primary-foreground hover:bg-primary/80"
                      : "text-primary-foreground bg-primary/50 cursor-not-allowed"
                  )}
                  onClick={onSend}
                  disabled={!message.trim() && !selectedFile}>
                  <Send className="w-5 h-5 -rotate-45" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
