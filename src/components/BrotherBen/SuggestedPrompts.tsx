import { Button } from "@/components/ui/button";
import { BookOpen, Heart, HelpCircle, Search } from "lucide-react";

interface SuggestedPromptsProps {
  onSelect: (prompt: string) => void;
}

const suggestions = [
  {
    icon: BookOpen,
    label: "Scripture Guidance",
    prompt: "I'm going through a difficult time. Can you share a scripture that might bring me comfort?"
  },
  {
    icon: Heart,
    label: "AC Teachings",
    prompt: "Can you explain the Apostolic Christian perspective on baptism?"
  },
  {
    icon: Search,
    label: "Find Resources",
    prompt: "I'm looking for Around the Table podcast episodes about raising children in faith."
  },
  {
    icon: HelpCircle,
    label: "Faith Questions",
    prompt: "How does the Apostolic Christian church view the doctrine of salvation?"
  }
];

export function SuggestedPrompts({ onSelect }: SuggestedPromptsProps) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-6">
      <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
        <BookOpen className="w-8 h-8 text-primary" />
      </div>
      <h2 className="text-xl font-serif font-semibold text-foreground mb-2">
        How can I help you today?
      </h2>
      <p className="text-muted-foreground text-center max-w-md mb-8">
        Ask me about biblical teachings, search for sermons, or explore Apostolic Christian doctrine.
      </p>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-lg">
        {suggestions.map((suggestion, index) => {
          const Icon = suggestion.icon;
          return (
            <Button
              key={index}
              variant="outline"
              className="h-auto p-4 flex flex-col items-start gap-2 text-left hover:bg-secondary/50 hover:border-primary/30 transition-all overflow-hidden w-full"
              onClick={() => onSelect(suggestion.prompt)}
            >
              <div className="flex items-center gap-2 w-full min-w-0">
                <Icon className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="font-medium text-foreground truncate">{suggestion.label}</span>
              </div>
              <span className="text-xs text-muted-foreground line-clamp-2 w-full break-words">
                {suggestion.prompt}
              </span>
            </Button>
          );
        })}
      </div>
    </div>
  );
}
