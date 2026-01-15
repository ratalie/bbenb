import { LandingNav } from "./LandingNav";
import { LandingHero } from "./LandingHero";
import { LandingHowItWorks } from "./LandingHowItWorks";
import { LandingBeta } from "./LandingBeta";
import { LandingGuardrails } from "./LandingGuardrails";
import { LandingPrivacy } from "./LandingPrivacy";
import { LandingComingSoon } from "./LandingComingSoon";
import { LandingFeedback } from "./LandingFeedback";
import { LandingFooter } from "./LandingFooter";

interface LandingPageProps {
  onStartConversation: () => void;
}

export const LandingPage = ({ onStartConversation }: LandingPageProps) => {
  const scrollToFeedback = () => {
    const element = document.querySelector("#feedback");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <LandingNav onStartConversation={onStartConversation} />
      <main>
        <LandingHero
          onStartConversation={onStartConversation}
          onGiveFeedback={scrollToFeedback}
        />
        <LandingHowItWorks />
        <LandingBeta />
        <LandingGuardrails />
        <LandingPrivacy />
        <LandingComingSoon />
        <LandingFeedback />
      </main>
      <LandingFooter onStartConversation={onStartConversation} />
    </div>
  );
};
