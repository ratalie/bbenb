import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { getMockResponse } from "./mockResponses";
import { brotherBenApi } from "../../services/brotherBenApi";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Send, CheckCircle } from "lucide-react";

interface ChatScreenProps {
  onShowOnboarding: () => void;
}

export function ChatScreen({ onShowOnboarding }: ChatScreenProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string | undefined>(undefined);
  const [userId] = useState(() => {
    // Generate or retrieve user ID from localStorage
    let id = localStorage.getItem('brother-ben-user-id');
    if (!id) {
      id = `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('brother-ben-user-id', id);
    }
    return id;
  });
  const scrollRef = useRef<HTMLDivElement>(null);
  const [useRealApi, setUseRealApi] = useState(true); // Toggle for testing

  // Feedback modal state
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [feedbackForm, setFeedbackForm] = useState({ name: "", email: "", message: "" });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [feedbackSubmitting, setFeedbackSubmitting] = useState(false);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      if (useRealApi) {
        // Call real Brother Ben API
        const response = await brotherBenApi.chat({
          message: content,
          user_id: userId,
          session_id: sessionId,
          user_context: {
            role: 'member' // Default role, can be customized
          }
        });

        // Update session ID for conversation continuity
        if (response.session_id) {
          setSessionId(response.session_id);
        }

        // Convert resources to expected format with type assertion
        const resources = response.sources?.map(source => ({
          title: source.title,
          url: source.url,
          type: source.type as "article" | "podcast" | "sermon" | "video"
        }));

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: response.response,
          scripture: response.scripture,
          resources: resources,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);

        // Show notification if escalated
        if (response.escalated) {
          toast.info("Brother Ben recommends reaching out to ACCFS for additional support.");
        }
      } else {
        // Fallback to mock responses for testing
        await new Promise(resolve => setTimeout(resolve, 1500));
        const mockResponse = getMockResponse(content);

        const assistantMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: "assistant",
          content: mockResponse.content || "",
          scripture: mockResponse.scripture,
          resources: mockResponse.resources,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, assistantMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to connect to Brother Ben');

      // Fallback to mock response on error
      const mockResponse = getMockResponse(content);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: mockResponse.content || "I'm having trouble connecting right now. Please try again in a moment.",
        scripture: mockResponse.scripture,
        resources: mockResponse.resources,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setSessionId(undefined); // Clear session for new conversation
  };

  const handleOpenFeedbackModal = () => {
    setShowFeedbackModal(true);
    setFeedbackSubmitted(false);
    setFeedbackForm({ name: "", email: "", message: "" });
  };

  const handleSubmitFeedback = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackForm.message.trim()) return;

    setFeedbackSubmitting(true);
    // Mock submission delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setFeedbackSubmitting(false);
    setFeedbackSubmitted(true);
    toast.success("Thank you for your feedback!");
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      <ChatHeader onReset={handleReset} onShowOnboarding={onShowOnboarding} />
      
      <div className="flex-1 overflow-y-auto" ref={scrollRef}>
        <div className="max-w-3xl mx-auto px-4 py-6">
          {messages.length === 0 ? (
            <SuggestedPrompts onSelect={handleSend} />
          ) : (
            <div className="space-y-4">
              {messages.map(message => (
                <ChatMessage 
                  key={message.id} 
                  message={message} 
                  onProvideFeedback={handleOpenFeedbackModal}
                />
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-card border border-border rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <div className="flex gap-1">
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                        <span className="w-2 h-2 bg-primary/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                      </div>
                      <span className="text-sm">Brother Ben is thinking...</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      <ChatInput onSend={handleSend} isLoading={isLoading} />

      {/* Feedback Modal */}
      <Dialog open={showFeedbackModal} onOpenChange={setShowFeedbackModal}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="font-serif">Share your feedback</DialogTitle>
            <DialogDescription>
              Your thoughts help us make Brother Ben more helpful and supportive.
            </DialogDescription>
          </DialogHeader>

          {feedbackSubmitted ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-3">
                <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-1">
                Thank you!
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Your feedback helps us improve Brother Ben.
              </p>
              <Button variant="outline" onClick={() => setShowFeedbackModal(false)}>
                Close
              </Button>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <Label htmlFor="feedback-name" className="text-sm">
                    Name <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="feedback-name"
                    type="text"
                    placeholder="Your name"
                    value={feedbackForm.name}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                  />
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="feedback-email" className="text-sm">
                    Email <span className="text-muted-foreground">(optional)</span>
                  </Label>
                  <Input
                    id="feedback-email"
                    type="email"
                    placeholder="your@email.com"
                    value={feedbackForm.email}
                    onChange={(e) => setFeedbackForm({ ...feedbackForm, email: e.target.value })}
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="feedback-message" className="text-sm">
                  Message <span className="text-destructive">*</span>
                </Label>
                <Textarea
                  id="feedback-message"
                  placeholder="Share your thoughts, suggestions, or experiences..."
                  value={feedbackForm.message}
                  onChange={(e) => setFeedbackForm({ ...feedbackForm, message: e.target.value })}
                  className="min-h-[100px] resize-none"
                  required
                />
              </div>

              <Button
                type="submit"
                className="w-full gap-2"
                disabled={!feedbackForm.message.trim() || feedbackSubmitting}
              >
                {feedbackSubmitting ? (
                  <>Sending...</>
                ) : (
                  <>
                    <Send size={16} />
                    Send feedback
                  </>
                )}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
