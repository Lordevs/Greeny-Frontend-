"use client";

import React, { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";

interface ChatHeaderProps {
    title?: string;
    onDelete?: () => void;
    isDeleting?: boolean;
}

export const ChatHeader: React.FC<ChatHeaderProps> = ({
    title = "AI Analysis Hub",
    onDelete,
    isDeleting = false,
}) => {
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    const handleDelete = () => {
        if (onDelete) {
            onDelete();
        }
        setShowDeleteDialog(false);
    };

    return (
        <div className="border-b border-border p-4 bg-secondary backdrop-blur-sm sticky top-0 z-50 w-full shrink-0">
            <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <h1 className="text-lg md:text-xl font-bold text-primary-foreground tracking-tight truncate max-w-[200px] md:max-w-[500px]">
                        {title}
                    </h1>
                    <Badge
                        variant="secondary"
                        className="bg-emerald-100 text-emerald-700 hover:bg-emerald-200 border-none px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider shrink-0">
                        Agent Active
                    </Badge>
                </div>

                {onDelete && (
                    <>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setShowDeleteDialog(true)}
                            className="text-primary-foreground/60 hover:text-destructive hover:bg-destructive/10 transition-colors"
                            disabled={isDeleting}
                        >
                            <Trash2 className="w-5 h-5" />
                        </Button>
                        <ConfirmDeleteDialog
                            open={showDeleteDialog}
                            onOpenChange={setShowDeleteDialog}
                            onConfirm={handleDelete}
                            isLoading={isDeleting}
                        />
                    </>
                )}
            </div>
        </div>
    );
};
