"use client";

import { use } from "react";
import { ChatInterface } from "@/components/chats/chat-interface";

export default function ChatDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);

  return <ChatInterface initialMode="response" chatId={id} />;
}
