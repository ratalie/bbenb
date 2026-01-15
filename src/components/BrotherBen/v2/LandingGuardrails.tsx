import { motion } from "framer-motion";
import { Heart, Users, HeartPulse, Eye } from "lucide-react";

const guardrails = [
  {
    icon: Heart,
    title: "Non-denominational & inclusive",
    description: "Guidance is reflective and encouraging, not doctrinal instruction. All Christian traditions and seekers are welcome.",
  },
  {
    icon: Users,
    title: "Not a pastor substitute",
    description: "Brother Ben encourages reaching out to church leaders, mentors, or trusted community members when appropriate.",
  },
  {
    icon: HeartPulse,
    title: "Not crisis support",
    description: "If you're in immediate danger or experiencing a mental health crisis, please contact local emergency services or a crisis hotline.",
  },
  {
    icon: Eye,
    title: "Transparency first",
    description: "This is AI-generated guidance. Use discernment, prayer, and wise counsel alongside any reflections shared here.",
  },
];

export const LandingGuardrails = () => {
  return (
    <section id="guardrails" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Guardrails & boundaries
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Building trust through clarity about what Brother Ben is—and isn't.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {guardrails.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-background rounded-xl p-6 shadow-sm border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <item.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
