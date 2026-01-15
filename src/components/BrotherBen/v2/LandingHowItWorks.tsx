import { motion } from "framer-motion";
import { MessageSquare, Lightbulb, RefreshCw, ThumbsUp } from "lucide-react";

const steps = [
  {
    icon: MessageSquare,
    title: "Share what you're facing",
    description: "A question, situation, or topic you'd like to explore together.",
  },
  {
    icon: Lightbulb,
    title: "Receive a thoughtful response",
    description: "Actionable, grounded guidance with gentle reflection prompts.",
  },
  {
    icon: RefreshCw,
    title: "Ask for variants",
    description: "Request a shorter version, prayer focus, or step-by-step plan.",
  },
  {
    icon: ThumbsUp,
    title: "Rate and improve",
    description: "Your feedback (👍/👎 + notes) helps make Brother Ben better.",
  },
];

export const LandingHowItWorks = () => {
  return (
    <section id="how-it-works" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            How it works
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A simple, reflective process designed to meet you where you are.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-sm border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <step.icon className="w-6 h-6 text-primary" />
              </div>
              <div className="text-sm font-medium text-primary/70 mb-2">
                Step {index + 1}
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
