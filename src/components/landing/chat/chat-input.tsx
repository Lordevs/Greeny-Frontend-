import { Send, Mic } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface ChatInputProps {
  message: string;
  setMessage: (msg: string) => void;
}

export default function ChatInput({ message, setMessage }: ChatInputProps) {
  return (
    <div className="pt-4">
      <div className="bg-primary-foreground p-2 rounded-3xl shadow-2xl border border-border flex items-center gap-4 transition-all focus-within:shadow-primary/5 focus-within:ring-2 focus-within:ring-primary/20">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Ask me to analyze any data from the web..."
          className="flex-1 bg-primary-foreground border-none outline-none text-lg text-foreground placeholder:text-muted-foreground h-8 px-2 shadow-none focus-visible:ring-0"
        />
        <div className="flex items-center">
          <Button
            variant="ghost"
            size="icon"
            className="w-12 h-12 rounded-2xl text-muted-foreground hover:text-primary transition-colors">
            <Mic className="w-6 h-6" />
          </Button>
          <Button
            variant="default"
            size="icon"
            className="w-10 h-10 rounded-2xl bg-primary hover:bg-primary/90 shadow-lg shadow-primary/20 transition-all hover:scale-105 active:scale-95">
            <Send className="w-6 h-6" />
          </Button>
        </div>
      </div>
    </div>
  );
}
