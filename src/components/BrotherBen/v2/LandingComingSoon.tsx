import { motion } from "framer-motion";
import { History, Sparkles, Brain } from "lucide-react";

const features = [
  {
    icon: History,
    title: "Saved sessions + history",
    description: "Pick up where you left off with persistent conversation history.",
  },
  {
    icon: Sparkles,
    title: "Personalization",
    description: "Customize tone, spiritual focus, and set reflection reminders.",
  },
  {
    icon: Brain,
    title: "Smarter context",
    description: "Better understanding of your journey over time for more relevant guidance.",
  },
];

export const LandingComingSoon = () => {
  return (
    <section className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            What's coming next
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're actively building new features based on your feedback.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-sm border border-border text-center"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                <feature.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
