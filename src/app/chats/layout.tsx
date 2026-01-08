"use client";

import ChatSidebar from "@/components/chats/chat-sidebar";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { ReactNode, useState } from "react";

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
  const [activeThread, setActiveThread] = useState("1");

  const handleNewChat = () => {
    console.log("New chat");
  };

  return (
    <SidebarProvider>
      <ChatSidebar
        threads={mockThreads}
        activeThreadId={activeThread}
        onSelectThread={setActiveThread}
        onNewChat={handleNewChat}
      />
      <SidebarInset className="flex flex-col flex-1 overflow-hidden">
        {children}
      </SidebarInset>
    </SidebarProvider>
  );
};

export default ChatLayout;
