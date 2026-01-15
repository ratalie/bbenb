import { motion } from "framer-motion";
import { FlaskConical, RefreshCcw, Construction } from "lucide-react";

const betaPoints = [
  {
    icon: FlaskConical,
    title: "Model testing first",
    description: "We're focused on quality and usefulness of responses before polishing the interface.",
  },
  {
    icon: RefreshCcw,
    title: "Frequent updates",
    description: "UI, tone, features, and capabilities may change as we learn from your feedback.",
  },
  {
    icon: Construction,
    title: "Some rough edges",
    description: "Early workflows and placeholder elements are expected—your patience helps us improve.",
  },
];

export const LandingBeta = () => {
  return (
    <section id="beta" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            What "Beta" means
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're in the early stages of building something meaningful—and we want you to be part of it.
          </p>
        </motion.div>

        <div className="space-y-4">
          {betaPoints.map((point, index) => (
            <motion.div
              key={point.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex items-start gap-4 bg-muted/30 rounded-lg p-5 border border-border"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                <point.icon className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">
                  {point.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {point.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
