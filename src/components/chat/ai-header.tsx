import { Bot, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIHeader() {
  return (
    <div className="flex items-center justify-between mb-8">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center">
          <Bot className="w-6 h-6 text-primary-foreground" />
        </div>
        <div>
          <h2 className="font-sbold text-primary-foreground">
            AI Data Analyst
          </h2>
          <p className="text-sm text-primary-foreground/60">
            Ask anything about your data or the web
          </p>
        </div>
      </div>
      <Button
        variant="outline"
        size="sm"
        className="gap-2 rounded-full bg-primary-foreground text-primary border-primary">
        <Plus className="w-4 h-4" />
        New Chat
      </Button>
    </div>
  );
}
