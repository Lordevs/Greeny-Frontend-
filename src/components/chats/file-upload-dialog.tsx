"use client";

import React, { useState, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FolderUp, Upload, FileText, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toast } from "sonner";


interface FileUploadDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onFileSelect: (file: File) => void;
}

export const FileUploadDialog: React.FC<FileUploadDialogProps> = ({
  open,
  onOpenChange,
  onFileSelect,
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const isValidFile = (file: File) => {
    const extension = file.name.split(".").pop()?.toLowerCase();
    return extension === "csv" || extension === "pdf";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      if (isValidFile(file)) {
        onFileSelect(file);
        onOpenChange(false);
      } else {
        toast.error("Only CSV and PDF files are allowed");
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (isValidFile(file)) {
        onFileSelect(file);
        onOpenChange(false);
      } else {
        toast.error("Only CSV and PDF files are allowed");
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-primary-foreground border-none shadow-2xl rounded-3xl">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-8">
            <div className="w-14 h-14 rounded-2xl bg-secondary flex items-center justify-center shrink-0 shadow-lg shadow-d">
              <FileText className="w-8 h-8 text-destructive" />
            </div>
            <div className="pt-1">
              <DialogTitle className="text-xl font-bold text-slate-900 leading-none mb-1.5">
                Upload Your Data
              </DialogTitle>
              <DialogDescription className="text-slate-500 text-sm">
                Strictly CSV and PDF files are supported for analysis.
              </DialogDescription>
            </div>
          </div>

          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className={cn(
              "relative border-2 border-dashed rounded-2xl p-12 transition-all cursor-pointer flex flex-col items-center justify-center gap-4 text-center group",
              isDragging
                ? "border-primary bg-primary/50"
                : "border-slate-200 hover:border-destructive hover:bg-slate-50"
            )}>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFileChange}
              accept=".csv,.pdf"
            />

            <div className="relative">
              <div className="w-16 h-12 bg-amber-400 rounded-lg shadow-md group-hover:scale-110 transition-transform duration-300 flex items-center justify-center">
                <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-4 bg-amber-300 rounded-t-md" />
                <div className="w-6 h-6 bg-destructive rounded-full flex items-center justify-center shadow-inner">
                  <Upload className="w-3 h-3 text-white" />
                </div>
              </div>
            </div>

            <div>
              <p className="text-destructive font-bold text-lg mb-1">
                Drag and drop here or click to upload
              </p>
              <p className="text-slate-400 text-sm font-medium">
                File types allowed: CSV, PDF
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>


  );
};
