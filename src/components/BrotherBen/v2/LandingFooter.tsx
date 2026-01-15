import { forwardRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

interface LandingFooterProps {
  onStartConversation: () => void;
}

export const LandingFooter = forwardRef<HTMLElement, LandingFooterProps>(
  ({ onStartConversation }, ref) => {
    return (
      <footer ref={ref} className="border-t border-border">
      {/* CTA Section */}
      <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-primary/5">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mb-4">
            Ready to begin?
          </h2>
          <p className="text-muted-foreground mb-6">
            Start a conversation with Brother Ben and explore what's on your heart.
          </p>
          <Button onClick={onStartConversation} size="lg" className="gap-2">
            Go to Brother Ben
            <ArrowRight size={18} />
          </Button>
        </div>
      </div>

      {/* Footer Links */}
      <div className="py-8 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-primary font-serif font-bold text-xs">BB</span>
              </div>
              <span className="text-sm text-muted-foreground">
                Ask Brother Ben by AC Church
              </span>
            </div>

            <nav className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                About AC Church
              </a>
              <a
                href="#privacy"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Privacy
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Terms
              </a>
              <a
                href="#feedback"
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                Feedback
              </a>
            </nav>
          </div>

          <div className="mt-6 pt-6 border-t border-border text-center">
            <p className="text-xs text-muted-foreground max-w-2xl mx-auto">
              Ask Brother Ben is an AI companion and not a substitute for professional or pastoral care. 
              If you're experiencing a crisis, please contact local emergency services or a mental health professional.
            </p>
          </div>
        </div>
      </div>
      </footer>
    );
  }
);

LandingFooter.displayName = "LandingFooter";
