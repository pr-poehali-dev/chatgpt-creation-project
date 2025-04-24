
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
    <div className={`py-4 ${isAssistant ? "bg-[#0d0d11]" : ""}`}>
      <div className="max-w-2xl mx-auto flex space-x-4">
        <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${isAssistant ? "bg-[#10a37f] text-white" : "bg-purple-500 text-white"}`}>
          {isAssistant ? "AI" : "Я"}
        </div>
        <div className="flex-1 space-y-2">
          <div className="font-medium text-white">
            {isAssistant ? "OpenAI" : "Вы"}
          </div>
          <div className="text-white">{message.content}</div>
        </div>
        {isAssistant && (
          <Button 
            variant="ghost" 
            size="icon" 
            className="opacity-0 group-hover:opacity-100 hover:opacity-100 focus:opacity-100 text-gray-400 hover:text-white" 
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
