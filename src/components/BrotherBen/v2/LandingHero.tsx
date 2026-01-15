import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { MessageCircle, Send, FlaskConical } from "lucide-react";

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

          {/* Prominent Beta Notice */}
          <div className="bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
            <div className="flex items-center justify-center gap-2 mb-3">
              <FlaskConical className="w-5 h-5 text-amber-600 dark:text-amber-400" />
              <h2 className="font-semibold text-amber-800 dark:text-amber-200">
                This is a Beta Experience
              </h2>
            </div>
            <p className="text-sm text-amber-700 dark:text-amber-300 mb-3">
              <strong>Our primary goal right now is testing the AI model</strong>—how helpful, accurate, and spiritually grounded Brother Ben's responses are.
            </p>
            <p className="text-sm text-amber-600 dark:text-amber-400">
              The interface you see is intentionally simple. It will be updated and improved based on what we learn from your feedback.
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
