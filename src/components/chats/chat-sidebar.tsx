"use client";
import { useState } from "react";
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
import { usePathname, useRouter } from "next/navigation";

import { useAuth } from "@/hooks/use-auth";
import { useAnalysis } from "@/hooks/use-analysis";
import { Trash2 } from "lucide-react";
import { ConfirmDeleteDialog } from "@/components/shared/confirm-delete-dialog";

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
  isLoading?: boolean;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  threads,
  activeThreadId,
  onSelectThread,
  onNewChat,
  isLoading,
}) => {
  const { user, logout } = useAuth();
  const { deleteConversation } = useAnalysis();
  const pathname = usePathname();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Filter threads based on search query
  const filteredThreads = threads.filter((thread) =>
    thread.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string) => {
    deleteConversation(id, {
      onSuccess: () => {
        if (activeThreadId === id) {
          router.push(ROUTES.CHAT.ROOT);
        }
        setDeletingId(null);
      }
    });
  };

  // Group threads by date
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 86400000).toDateString();

  const groupedThreads = filteredThreads.reduce((acc, thread) => {
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
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 border-primary-foreground bg-accent placeholder:text-primary-foreground transition-all"
          />
        </div>
      </SidebarHeader>

      <SidebarContent className="px-2">
        {filteredThreads.length === 0 && searchQuery && (
          <div className="px-4 py-8 text-center animate-in fade-in duration-300">
            <p className="text-xs text-primary-foreground/50 italic font-medium">
              No matches found for "{searchQuery}"
            </p>
          </div>
        )}
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
                        <div className="group relative flex items-center w-full">
                          <SidebarMenuButton
                            onClick={() => onSelectThread(thread.id)}
                            isActive={activeThreadId === thread.id}
                            className={cn(
                              "transition-all duration-200 cursor-pointer pr-10",
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

                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeletingId(thread.id);
                            }}
                            className="absolute right-1 opacity-0 group-hover:opacity-100 h-7 w-7 text-primary-foreground/40 hover:text-destructive hover:bg-destructive/10 transition-all z-10"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </Button>
                        </div>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            )
        )}

        <ConfirmDeleteDialog
          open={!!deletingId}
          onOpenChange={(open) => !open && setDeletingId(null)}
          onConfirm={() => deletingId && handleDelete(deletingId)}
        />
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
              onClick={logout}
              className="hover:bg-white/10 hover:text-white transition-colors cursor-pointer">
              <LogOut className="w-4 h-4 mr-2" />
              <span>Log Out</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <div className="mt-6 flex items-center gap-3 px-2 py-2 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
          <Avatar className="h-8 w-8 border border-white/20 shrink-0">
            <AvatarImage src={user?.avatar} />
            <AvatarFallback className="bg-primary-foreground text-primary text-xs font-bold uppercase">
              {user?.username?.[0] || 'U'}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <span className="text-sm font-semibold truncate text-primary-foreground">
              {user?.first_name ? `${user.first_name} ${user.last_name || ''}` : user?.username || 'Loading...'}
            </span>
            <span className="text-[10px] text-primary-foreground/60 truncate">
              {user?.email || '...'}
            </span>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
};

export default ChatSidebar;
