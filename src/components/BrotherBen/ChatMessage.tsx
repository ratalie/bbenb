import { cn } from "@/lib/utils";
import { BookOpen, ExternalLink, ThumbsUp, ThumbsDown, MessageSquare, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

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
  onFeedback?: (messageId: string, type: "up" | "down", note?: string) => void;
  onProvideFeedback?: () => void;
}

export function ChatMessage({ message, onFeedback, onProvideFeedback }: ChatMessageProps) {
  const isUser = message.role === "user";
  const [feedbackGiven, setFeedbackGiven] = useState<"up" | "down" | null>(null);
  const [showFeedbackInput, setShowFeedbackInput] = useState(false);
  const [feedbackNote, setFeedbackNote] = useState("");

  const handleFeedback = (type: "up" | "down") => {
    setFeedbackGiven(type);
    if (type === "down") {
      setShowFeedbackInput(true);
    } else {
      onFeedback?.(message.id, type);
    }
  };

  const handleSubmitFeedback = () => {
    onFeedback?.(message.id, feedbackGiven!, feedbackNote || undefined);
    setShowFeedbackInput(false);
  };

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

        {/* Feedback buttons (assistant only) */}
        {!isUser && (
          <div className="pt-2 border-t border-border/50">
            {!feedbackGiven ? (
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-muted-foreground">Was this helpful?</span>
                <button
                  onClick={() => handleFeedback("up")}
                  className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-green-600"
                  aria-label="Helpful"
                >
                  <ThumbsUp className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleFeedback("down")}
                  className="p-1.5 rounded-md hover:bg-secondary transition-colors text-muted-foreground hover:text-red-500"
                  aria-label="Not helpful"
                >
                  <ThumbsDown className="w-4 h-4" />
                </button>
                <span className="text-muted-foreground/50">|</span>
                <button
                  onClick={onProvideFeedback}
                  className="flex items-center gap-1 px-2 py-1 rounded-md hover:bg-secondary transition-colors text-xs text-muted-foreground hover:text-primary"
                >
                  <MessageCircle className="w-3.5 h-3.5" />
                  <span>Provide feedback</span>
                </button>
              </div>
            ) : showFeedbackInput ? (
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>What could be improved? (optional)</span>
                </div>
                <Textarea
                  placeholder="Share your thoughts..."
                  value={feedbackNote}
                  onChange={(e) => setFeedbackNote(e.target.value)}
                  className="min-h-[60px] text-sm resize-none"
                />
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" onClick={() => setShowFeedbackInput(false)}>
                    Skip
                  </Button>
                  <Button size="sm" onClick={handleSubmitFeedback}>
                    Submit
                  </Button>
                </div>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className={feedbackGiven === "up" ? "text-green-600" : "text-red-500"}>
                  {feedbackGiven === "up" ? (
                    <ThumbsUp className="w-4 h-4 inline mr-1" />
                  ) : (
                    <ThumbsDown className="w-4 h-4 inline mr-1" />
                  )}
                </span>
                <span>Thanks for your feedback!</span>
              </div>
            )}
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
