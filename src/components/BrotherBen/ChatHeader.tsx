import { BookOpen, Menu, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatHeaderProps {
  onReset: () => void;
  onShowOnboarding: () => void;
}

export function ChatHeader({ onReset, onShowOnboarding }: ChatHeaderProps) {
  return (
    <header className="border-b border-border bg-card/80 backdrop-blur-sm sticky top-0 z-10">
      <div className="max-w-3xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <div>
              <h1 className="font-serif font-semibold text-foreground">Brother Ben</h1>
              <p className="text-xs text-muted-foreground">Your AC Faith Companion</p>
            </div>
          </div>
          <span className="text-xs font-medium text-muted-foreground bg-muted px-2 py-1 rounded">
            LLM V 1.0
          </span>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onReset}>
              <RotateCcw className="w-4 h-4 mr-2" />
              New Conversation
            </DropdownMenuItem>
            <DropdownMenuItem onClick={onShowOnboarding}>
              <BookOpen className="w-4 h-4 mr-2" />
              View Introduction
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
