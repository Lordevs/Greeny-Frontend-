"use client";

import { Bot, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/constants/routes";

export default function AIHeader() {
  const router = useRouter();

  // Mock login status - in a real app, this would come from an auth hook
  const isLoggedIn = false;

  const handleNewChat = () => {
    // Logic: if logged in move to app chat, else move to login
    // BUT user requested for temporary purpose to move to chat page directly
    if (isLoggedIn) {
      router.push(ROUTES.CHAT.ROOT);
    } else {
      // Temporarily moving to chat page regardless, as per request
      router.push(ROUTES.CHAT.ROOT);

      // Real logic to use eventually:
      // router.push(ROUTES.AUTH.LOGIN);
    }
  };

  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-semibold text-primary-foreground">
            AI Data Analyst
          </h2>
          <p className="text-sm text-primary-foreground/60">
            Ask anything about your data or the web
          </p>
        </div>
      </div>
      <Button
        onClick={handleNewChat}
        variant="outline"
        size="sm"
        className="gap-2 rounded-full bg-primary-foreground text-primary border-primary hover:bg-primary/5 transition-all">
        <Plus className="w-4 h-4" />
        New Chat
      </Button>
    </div>
  );
}
