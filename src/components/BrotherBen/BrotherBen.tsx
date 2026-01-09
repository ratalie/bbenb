import { useState, useEffect } from "react";
import { OnboardingScreen } from "./OnboardingScreen";
import { ChatScreen } from "./ChatScreen";

const ONBOARDING_KEY = "brother-ben-onboarding-complete";

export function BrotherBen() {
  const [showOnboarding, setShowOnboarding] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem(ONBOARDING_KEY);
    if (completed === "true") {
      setShowOnboarding(false);
    }
    setIsLoaded(true);
  }, []);

  const handleOnboardingComplete = () => {
    localStorage.setItem(ONBOARDING_KEY, "true");
    setShowOnboarding(false);
  };

  const handleShowOnboarding = () => {
    setShowOnboarding(true);
  };

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center animate-pulse" />
      </div>
    );
  }

  if (showOnboarding) {
    return <OnboardingScreen onComplete={handleOnboardingComplete} />;
  }

  return <ChatScreen onShowOnboarding={handleShowOnboarding} />;
}
