"use client";
import { MessageSquare, Plus, Search, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ROUTES } from "@/constants/routes";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface ChatThread {
  id: string;
  title: string;
  date: string;
  isActive?: boolean;
}

interface ChatSidebarProps {
  threads: ChatThread[];
  activeThreadId?: string;
  onSelectThread: (id: string) => void;
  onNewChat: () => void;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
}) => {
  const pathname = usePathname();
  // Group threads by date
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const groupedThreads = threads.reduce((acc, thread) => {
    const threadDate = new Date(thread.date).toDateString();
    let group = "Previous";

    if (threadDate === today) {
      group = "Today";
    } else if (threadDate === yesterday) {
      group = "Yesterday";
    }

    if (!acc[group]) acc[group] = [];
    acc[group].push(thread);
    return acc;
  }, {} as Record<string, ChatThread[]>);

  return (
    <Sidebar className="bg-secondary border-r border-border">
      <SidebarHeader className="p-4 space-y-4 ">
        <Image src="/logo.svg" alt="" width={150} height={150} />
        <Button
          onClick={onNewChat}
          className="w-full justify-start bg-accent gap-2 shadow-sm transition-all hover:shadow-md border-primary-foreground cursor-pointer"
          variant="outline">
          <Plus className="w-4 h-4 text-primary-foreground" />
          <span className="font-medium text-primary-foreground">New Chat</span>
        </Button>

        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-primary-foreground group-focus-within:text-primary transition-colors" />
          <SidebarInput
            placeholder="Search chats..."
            className="pl-9 border-primary-foreground bg-accent placeholder:text-primary-foreground transition-all"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {Object.entries(groupedThreads).map(
          ([group, groupThreads]) =>
            groupThreads.length > 0 && (
              <SidebarGroup
                key={group}
                className="animate-in fade-in slide-in-from-left-2 duration-300">
                <SidebarGroupLabel className="px-2 mb-2 text-[11px] tracking-wider font-bold uppercase text-primary-foreground/70">
                  {group}
                </SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {groupThreads.map((thread) => (
                      <SidebarMenuItem key={thread.id}>
                        <SidebarMenuButton
                          onClick={() => onSelectThread(thread.id)}
                          isActive={activeThreadId === thread.id}
                          className={cn(
                            "transition-all duration-200 cursor-pointer",
                            activeThreadId === thread.id
                              ? "bg-primary/10 text-primary font-medium hover:bg-primary/15"
                              : "hover:bg-muted/50"
                          )}>
                          <MessageSquare
                            className={cn(
                              "w-4 h-4 shrink-0 transition-transform text-primary-foreground",
                              activeThreadId === thread.id
                                ? "scale-110"
                                : "opacity-70"
                            )}
                          />
                          <span className="truncate text-primary-foreground font-medium">
                            {thread.title}
                          </span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
        )}
      </SidebarContent>
      <SidebarFooter className="p-4 text-primary-foreground">
        <SidebarSeparator className="mb-4 bg-primary-foreground" />
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className={cn(
                "transition-colors",
                pathname === ROUTES.CHAT.PLAN
                  ? "bg-primary-foreground text-destructive hover:bg-primary-foreground/90"
                  : "hover:bg-white/10 hover:text-white"
              )}>
              <Link href={ROUTES.CHAT.PLAN}>
                <Settings className="w-4 h-4 mr-2" />
                <span>Account & Billing</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="hover:bg-white/10 hover:text-white transition-colors">
              <Link href={ROUTES.CHAT.LOGOUT}>
                <LogOut className="w-4 h-4 mr-2" />
                <span>Log Out</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-6 flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5 border border-white/10">
          <Avatar className="h-8 w-8 border border-white/20">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary-foreground text-primary text-xs font-bold">
              ZA
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate text-primary-foreground">
              Zaid Ahmad
            </span>
            <span className="text-[10px] text-primary-foreground/60 truncate">
              Google.johndoe..@gmail.com
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatSidebar;
