import { motion } from "framer-motion";
import { Shield, Lock, Trash2, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";

export const LandingPrivacy = () => {
  return (
    <section id="privacy" className="py-16 sm:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-3xl sm:text-4xl font-serif font-bold text-foreground mb-4">
            Your privacy matters
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to handling your conversations with care and respect.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-muted/30 rounded-xl p-6 sm:p-8 border border-border"
        >
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <Lock className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Confidentiality intent</h3>
                <p className="text-sm text-muted-foreground">
                  Your conversations are treated as private. We don't share your personal reflections with third parties for marketing purposes.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Shield className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Data handling</h3>
                <p className="text-sm text-muted-foreground">
                  Conversations may be stored temporarily to improve the service. In limited cases, anonymized data may be reviewed for safety and quality improvement.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Trash2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-foreground mb-1">Your choices</h3>
                <p className="text-sm text-muted-foreground">
                  You can request to delete your conversation history or export your data. Contact us through the feedback form for assistance.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-6 border-t border-border text-center">
            <Button variant="outline" className="gap-2">
              <ExternalLink size={16} />
              Read privacy details
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
