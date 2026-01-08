import {
  AlertCircle,
  TrendingDown,
  TrendingUp,
  CheckCircle,
  Bot,
} from "lucide-react";
import { cn } from "@/lib/utils";
import AIResponseCard from "./ai-response-card";

const keyTrends = [
  {
    icon: AlertCircle,
    text: "Significant spike during 2007-2008 global financial crisis reaching 11.1%",
  },
  {
    icon: TrendingDown,
    text: "Deflationary period from 2015-2016 due to oil price collapse",
  },
  {
    icon: TrendingUp,
    text: "Recent stabilization around 2-3% indicating economic recovery",
  },
  {
    icon: CheckCircle,
    text: "VAT introduction in 2018 caused temporary increase to 3.0%",
  },
];

const suggestedActions = [
  "Compare with UAE inflation rates",
  "Show GDP correlation",
  "Forecast next 5 years",
];

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function MessageList({ messages }: { messages: Message[] }) {
  return (
    <div className="space-y-8">
      {messages.map((msg, i) => (
        <div
          key={i}
          className={cn(
            "flex flex-col gap-4 animate-in fade-in slide-in-from-bottom-2 duration-300",
            msg.role === "user" ? "items-end" : "items-start"
          )}>
          {msg.role === "user" ? (
            <div className="bg-primary text-primary-foreground rounded-2xl rounded-tr-sm px-6 py-4 max-w-[85%] md:max-w-md shadow-lg">
              <p className="text-base md:text-lg font-semibold leading-relaxed">
                {msg.content}
              </p>
            </div>
          ) : msg.content === "initial_analysis" ? (
            <div className="w-full">
              <AIResponseCard
                title="Saudi Arabia Inflation Analysis (2008-2024)"
                description="I've analyzed inflation data for Saudi Arabia over the past 16 years. Here's what the data shows:"
                trends={keyTrends}
                suggestedActions={suggestedActions}
              />
            </div>
          ) : (
            <div className="bg-secondary p-6 rounded-3xl rounded-tl-sm shadow-xl max-w-[90%] border border-white/5">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 rounded-full bg-primary-foreground flex items-center justify-center text-secondary">
                  <Bot className="w-5 h-5" />
                </div>
                <span className="text-xs font-bold text-primary-foreground/60 uppercase tracking-widest">
                  AI Companion
                </span>
              </div>
              <p className="text-primary-foreground text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                {msg.content}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
