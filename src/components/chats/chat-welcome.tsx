"use client";

import React, { useState } from "react";
import { Plus, Send, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getFileIcon } from "@/lib/chat-utils";
import { FileUploadDialog } from "./file-upload-dialog";
import { toast } from "sonner";


interface ChatWelcomeProps {
  message: string;
  setMessage: (message: string) => void;
  onSend: () => void;
  selectedFile: File | null;
  onFileSelect: (file: File | null) => void;
  isLoading?: boolean;
}

export const ChatWelcome: React.FC<ChatWelcomeProps> = ({
  message,
  setMessage,
  onSend,
  selectedFile,
  onFileSelect,
  isLoading,
}) => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const fileInfo = selectedFile ? getFileIcon(selectedFile.name) : null;
  const FileIconComponent = fileInfo?.icon;

  const handlePlusClick = () => {
    if (isLoading) return;
    setIsUploadOpen(true);
  };

  const clearFile = () => {
    if (isLoading) return;
    onFileSelect(null);
  };

  return (
    <div className="text-center px-4 w-full">
      <h2 className="text-2xl md:text-3xl font-bold text-primary-foreground text-center">
        What do you want to analyze today?
      </h2>

      <FileUploadDialog
        open={isUploadOpen}
        onOpenChange={setIsUploadOpen}
        onFileSelect={onFileSelect}
      />

      {/* Input Section */}
      <div className="max-w-4xl mx-auto mb-40">
        <div className="p-6 md:p-8 flex flex-col gap-4">
          <div className="flex flex-col gap-3 text-left">
            {selectedFile && fileInfo && FileIconComponent && (
              <div
                className={`self-start flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 animate-in fade-in slide-in-from-bottom-2 duration-300 shadow-sm shrink-0 bg-primary-foreground`}>
                <FileIconComponent className={`w-4 h-4 ${fileInfo.color}`} />
                <span
                  className={`text-xs font-semibold truncate max-w-[200px] ${fileInfo.color}`}>
                  {selectedFile.name}
                </span>
                <button
                  onClick={clearFile}
                  disabled={isLoading}
                  className="ml-1 p-0.5 hover:bg-black/20 rounded-full transition-colors disabled:opacity-50">
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            <div className="bg-primary-foreground rounded-2xl p-3 pl-4 flex items-end gap-3 group focus-within:ring-2 focus-within:ring-destructive/10 transition-all border border-primary">
              <div className="pb-1">
                <Button
                  size="icon"
                  variant="default"
                  onClick={handlePlusClick}
                  disabled={isLoading}
                  className="h-8 w-8 rounded-full bg-primary hover:bg-primary/80 shadow-md shadow-primary transition-all shrink-0 cursor-pointer disabled:opacity-50">
                  <Plus className="w-5 h-5 text-white" />
                </Button>
              </div>

              <textarea
                placeholder="Ask anything about your documents"
                disabled={isLoading}
                className="flex-1 border-none bg-transparent focus:outline-none px-0 py-2 h-auto min-h-[40px] max-h-[300px] placeholder:text-primary text-base resize-none field-sizing-content disabled:opacity-50"
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
                      if ((message.trim() || selectedFile) && !isLoading) {
                        if (!selectedFile) {
                          toast.error("Please upload a CSV or PDF file first to start the analysis.");
                          return;
                        }
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
                  className={`rounded-full h-10 w-10 transition-all border border-primary shrink-0 shadow-sm ${(message.trim() || selectedFile) && !isLoading
                    ? "bg-primary text-primary-foreground hover:bg-primary/80"
                    : "text-primary-foreground bg-primary/50 cursor-not-allowed"
                    }`}
                  onClick={() => {
                    if (!selectedFile) {
                      toast.error("Please upload a CSV or PDF file first to start the analysis.");
                      return;
                    }
                    onSend();
                  }}
                  disabled={!selectedFile || isLoading}>
                  {isLoading ? (
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent" />
                  ) : (
                    <Send className="w-5 h-5 -rotate-45" />
                  )}
                </Button>
              </div>
            </div>
            {!selectedFile && !isLoading && (
              <p className="text-center text-xs text-primary-foreground mt-2 font-medium">
                Kindly upload a CSV or PDF file to begin your analysis.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


