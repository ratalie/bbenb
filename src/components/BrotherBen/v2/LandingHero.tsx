import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MessageCircle, Send } from "lucide-react";

interface LandingHeroProps {
  onStartConversation: () => void;
  onGiveFeedback: () => void;
}

export const LandingHero = ({ onStartConversation, onGiveFeedback }: LandingHeroProps) => {
  return (
    <section className="relative py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Badge variant="secondary" className="mb-6 text-xs font-medium tracking-wider">
            BETA
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-bold text-foreground mb-6 leading-tight">
            Ask Brother Ben
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground mb-6 max-w-2xl mx-auto leading-relaxed">
            A calm, supportive spiritual companion for reflection, encouragement, and next steps.
          </p>

          <div className="bg-muted/50 rounded-lg p-4 mb-8 max-w-xl mx-auto">
            <p className="text-sm text-muted-foreground">
              This is a <strong>beta experience</strong> focused on testing the model. 
              The design is intentionally simple and will evolve based on your feedback.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Button onClick={onStartConversation} size="lg" className="gap-2">
              <MessageCircle size={18} />
              Start a conversation
            </Button>
            <Button onClick={onGiveFeedback} variant="outline" size="lg" className="gap-2">
              <Send size={18} />
              Give feedback
            </Button>
          </div>

          <p className="text-xs text-muted-foreground/80 max-w-md mx-auto">
            ⚠️ Please avoid sharing highly sensitive personal or confidential information during the beta.
          </p>
        </motion.div>
      </div>

      {/* Subtle background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>
    </section>
  );
};
