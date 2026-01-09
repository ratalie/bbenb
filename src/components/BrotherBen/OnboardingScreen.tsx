import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BookOpen, Heart, Users, MessageCircle, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface OnboardingScreenProps {
  onComplete: () => void;
}

const steps = [
  {
    icon: BookOpen,
    title: "Welcome to Brother Ben",
    description: "Your companion for exploring biblical teachings and Apostolic Christian faith. I'm here to walk alongside you in your spiritual journey.",
    verse: "\"Thy word is a lamp unto my feet, and a light unto my path.\"",
    reference: "— Psalm 119:105 (KJV)"
  },
  {
    icon: Heart,
    title: "Warm & Pastoral Guidance",
    description: "I speak with a gentle, friendly tone—like a conversation with a trusted friend. I draw from AC literature, General Conference recordings, and approved teachings.",
    verse: "\"A word fitly spoken is like apples of gold in pictures of silver.\"",
    reference: "— Proverbs 25:11 (KJV)"
  },
  {
    icon: Users,
    title: "For Members & Seekers",
    description: "Whether you're a minister preparing a message, a teacher planning a lesson, or a seeker with questions—I'm here to help you find trustworthy answers.",
    verse: "\"Ask, and it shall be given you; seek, and ye shall find.\"",
    reference: "— Matthew 7:7 (KJV)"
  },
  {
    icon: MessageCircle,
    title: "Let's Begin",
    description: "Ask me about biblical teachings, search for sermons, explore AC doctrine, or simply share what's on your heart. I'll do my best to guide you to the right resources.",
    verse: "\"Come now, and let us reason together, saith the Lord.\"",
    reference: "— Isaiah 1:18 (KJV)"
  }
];

export function OnboardingScreen({ onComplete }: OnboardingScreenProps) {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      onComplete();
    }
  };

  const step = steps[currentStep];
  const Icon = step.icon;

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-background to-secondary/30">
      <Card className="max-w-lg w-full p-8 shadow-xl border-primary/10">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="text-center space-y-6"
          >
            {/* Icon */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="w-10 h-10 text-primary" />
              </div>
            </div>

            {/* Title */}
            <h1 className="text-2xl font-serif font-semibold text-foreground">
              {step.title}
            </h1>

            {/* Description */}
            <p className="text-muted-foreground leading-relaxed">
              {step.description}
            </p>

            {/* Scripture Quote */}
            <div className="scripture-quote p-4 text-left">
              <p className="text-foreground/90 font-serif">
                {step.verse}
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                {step.reference}
              </p>
            </div>

            {/* Progress Dots */}
            <div className="flex justify-center gap-2">
              {steps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentStep 
                      ? "bg-primary w-6" 
                      : "bg-primary/30 hover:bg-primary/50"
                  }`}
                />
              ))}
            </div>

            {/* Button */}
            <Button 
              onClick={handleNext} 
              size="lg" 
              className="w-full gap-2 font-medium"
            >
              {currentStep < steps.length - 1 ? (
                <>
                  Continue
                  <ArrowRight className="w-4 h-4" />
                </>
              ) : (
                <>
                  Start Conversation
                  <MessageCircle className="w-4 h-4" />
                </>
              )}
            </Button>
          </motion.div>
        </AnimatePresence>
      </Card>
    </div>
  );
}
