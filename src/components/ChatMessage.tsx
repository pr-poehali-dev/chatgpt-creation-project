
import { useState } from "react";
import { Copy, CheckCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
}

const ChatMessage = ({ message }: ChatMessageProps) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isAssistant = message.role === "assistant";

  return (
    <div className={`py-4 ${isAssistant ? "bg-muted/30" : ""}`}>
      <div className="max-w-2xl mx-auto flex space-x-4">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isAssistant ? "bg-primary/10 text-primary" : "bg-secondary text-secondary-foreground"}`}>
          {isAssistant ? "A" : "Я"}
        </div>
        <div className="flex-1 space-y-2">
          <div className="font-medium">
            {isAssistant ? "Ассистент" : "Вы"}
          </div>
          <div className="text-foreground">{message.content}</div>
        </div>
        {isAssistant && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100" 
            onClick={copyToClipboard}
          >
            {copied ? <CheckCheck className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          </Button>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;
