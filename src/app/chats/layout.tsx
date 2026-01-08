"use client";

import ChatSidebar from "@/components/chats/chat-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { useRouter, useParams } from "next/navigation";
import { ReactNode, useState, useEffect } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

const mockThreads = [
  {
    id: "1",
    title: "Saudi Arabia CPI Analysis",
    date: new Date().toISOString(),
  },
  {
    id: "2",
    title: "Oil Price Correlation Study",
    date: new Date().toISOString(),
  },
  {
    id: "3",
    title: "Economic Growth Forecast",
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "4",
    title: "Inflation Rate Comparison",
    date: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: "5",
    title: "Market Trend Analysis",
    date: new Date(Date.now() - 172800000).toISOString(),
  },
];

const ChatLayout = ({ children }: ChatLayoutProps) => {
  const router = useRouter();
  const params = useParams();
  const [activeThread, setActiveThread] = useState<string | undefined>(
    params.id as string
  );

  useEffect(() => {
    if (params.id) {
      setActiveThread(params.id as string);
    } else {
      setActiveThread(undefined);
    }
  }, [params.id]);

  const handleSelectThread = (id: string) => {
    setActiveThread(id);
    router.push(`/chats/${id}`);
  };

  const handleNewChat = () => {
    setActiveThread(undefined);
    router.push("/chats");
  };

  return (
    <SidebarProvider>
      <ChatSidebar
        threads={mockThreads}
        activeThreadId={activeThread}
        onSelectThread={handleSelectThread}
        onNewChat={handleNewChat}
      />
      <SidebarInset className="flex flex-col flex-1 overflow-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
