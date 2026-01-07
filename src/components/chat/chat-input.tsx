import { Send, Mic, CheckCircle, Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatInputProps {
  message: string;
  setMessage: (msg: string) => void;
}

export default function ChatInput({ message, setMessage }: ChatInputProps) {
  return (
    <div className="sticky bottom-8 bg-background/80 backdrop-blur-md pt-4">
      <div className="bg-white p-4 rounded-3xl shadow-2xl border border-border flex items-center gap-4 transition-all focus-within:shadow-primary/5 focus-within:ring-2 focus-within:ring-primary/20">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me to analyze any data from the web..."
          className="flex-1 bg-transparent border-none outline-none text-lg text-foreground placeholder:text-muted-foreground h-12 px-2"
        />
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-2xl text-muted-foreground hover:text-primary transition-colors">
            <Mic className="w-6 h-6" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="w-12 h-12 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            <Send className="w-6 h-6" />
          </Button>
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-between mt-4 text-xs font-bold text-muted-foreground/60 uppercase tracking-widest px-4"></div>
    </div>
  );
}
