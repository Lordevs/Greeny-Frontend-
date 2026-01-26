"use client";

import ChatSidebar from "@/components/chats/chat-sidebar";
import { ROUTES } from "@/constants/routes";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter, useParams } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

import { useAnalysis } from "@/hooks/use-analysis";
import { useAuth } from "@/hooks/use-auth";

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const router = useRouter();
  const params = useParams();
  const { user, isLoading: isAuthLoading } = useAuth();
  const { conversations, isLoadingConversations } = useAnalysis();

  useEffect(() => {
    if (!isAuthLoading && !user) {
      router.push(`${ROUTES.AUTH.LOGIN}?force=true`);
    }
  }, [user, isAuthLoading, router]);


  const [activeThread, setActiveThread] = useState<string | undefined>(

    params.id as string
  );

  const [sessionKey, setSessionKey] = useState(0);

  useEffect(() => {
    if (params.id) {
      setActiveThread(params.id as string);
    } else {
      setActiveThread(undefined);
    }
  }, [params.id]);

  const threads = Array.isArray(conversations)
    ? conversations.map(c => ({
      id: c.id.toString(),
      title: c.title,
      date: c.updated_at
    }))
    : [];


  const handleSelectThread = (id: string) => {
    setActiveThread(id);
    router.push(`${ROUTES.CHAT.ROOT}/${id}`);
  };

  const handleNewChat = () => {
    setActiveThread(undefined);
    setSessionKey((prev) => prev + 1);
    router.push(ROUTES.CHAT.ROOT);
  };

  return (
    <SidebarProvider>
      <ChatSidebar
        threads={threads}
        activeThreadId={activeThread}
        onSelectThread={handleSelectThread}
        onNewChat={handleNewChat}
        isLoading={isLoadingConversations}
      />
      <SidebarInset className="flex flex-col flex-1 overflow-x-hidden overflow-y-auto">
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-between gap-2 border-b border-primary-foreground/10 bg-secondary/80 backdrop-blur-sm px-4 md:hidden">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="text-primary-foreground" />
            <Image src="/logo.svg" alt="" width={100} height={100} />
          </div>
          <div className="flex items-center gap-2">
            {/* Can add extra mobile controls here if needed */}
          </div>
        </header>
        <div className="flex-1" key={sessionKey}>
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
