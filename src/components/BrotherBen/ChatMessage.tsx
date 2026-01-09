import { cn } from "@/lib/utils";
import { BookOpen, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";

export interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  scripture?: {
    verse: string;
    reference: string;
  };
  resources?: {
    title: string;
    type: "article" | "podcast" | "video" | "sermon";
    url?: string;
  }[];
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isUser = message.role === "user";

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "flex w-full",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div
        className={cn(
          "max-w-[85%] md:max-w-[75%] rounded-2xl px-4 py-3 space-y-3",
          isUser 
            ? "bg-primary text-primary-foreground rounded-br-md" 
            : "bg-card border border-border rounded-bl-md shadow-sm"
        )}
      >
        {/* Main content */}
        <p className={cn(
          "leading-relaxed whitespace-pre-wrap",
          !isUser && "text-foreground"
        )}>
          {message.content}
        </p>

        {/* Scripture quote (assistant only) */}
        {!isUser && message.scripture && (
          <div className="scripture-quote p-3 mt-2">
            <p className="text-foreground/90 font-serif italic text-sm">
              "{message.scripture.verse}"
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              — {message.scripture.reference}
            </p>
          </div>
        )}

        {/* Resource links (assistant only) */}
        {!isUser && message.resources && message.resources.length > 0 && (
          <div className="pt-2 space-y-2">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Related Resources
            </p>
            {message.resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url || "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors group"
              >
                <BookOpen className="w-4 h-4 text-primary" />
                <span className="text-sm text-foreground flex-1">
                  {resource.title}
                </span>
                <span className="text-xs text-muted-foreground capitalize">
                  {resource.type}
                </span>
                <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            ))}
          </div>
        )}

        {/* Timestamp */}
        <p className={cn(
          "text-xs mt-1",
          isUser ? "text-primary-foreground/70" : "text-muted-foreground"
        )}>
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </p>
      </div>
    </motion.div>
  );
}
