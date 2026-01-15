import { useState } from "react";
import { BrotherBen } from "@/components/BrotherBen/BrotherBen";
import { LandingPage } from "@/components/BrotherBen/v2/LandingPage";

const BrotherBenV2 = () => {
  const [showChat, setShowChat] = useState(false);

  if (showChat) {
    return <BrotherBen />;
  }

  return <LandingPage onStartConversation={() => setShowChat(true)} />;
};

export default BrotherBenV2;
