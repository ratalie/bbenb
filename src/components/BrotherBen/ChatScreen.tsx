import { useState, useRef, useEffect } from "react";
import { ChatHeader } from "./ChatHeader";
import { ChatMessage, Message } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { SuggestedPrompts } from "./SuggestedPrompts";
import { getMockResponse } from "./mockResponses";
import { brotherBenApi } from "../../services/brotherBenApi";
import { toast } from "sonner";

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
                <ChatMessage key={message.id} message={message} />
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
    </div>
  );
}
