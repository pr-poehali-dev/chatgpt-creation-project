
import { useState, useRef, useEffect } from "react";
import { ChevronDown, SendHorizontal, Plus, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import ChatMessage from "@/components/ChatMessage";
import Sidebar from "@/components/Sidebar";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

const Index = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Автоматическая прокрутка вниз при появлении новых сообщений
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = () => {
    if (!input.trim()) return;
    
    // Добавляем сообщение пользователя
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsSending(true);
    
    // Имитация ответа ассистента
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: generateResponse(input.trim()),
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setIsSending(false);
    }, 1000);
  };

  const generateResponse = (input: string): string => {
    // Простая имитация ответов
    const responses = [
      "Это интересный вопрос. Давайте разберёмся подробнее...",
      "Я могу помочь вам с этим запросом!",
      "Отличный вопрос! Вот что я нашёл по этой теме...",
      "Спасибо за ваш вопрос. Вот несколько мыслей на эту тему...",
      "Я проанализировал вашу задачу и могу предложить следующее решение...",
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="flex h-screen bg-[#050509]">
      {/* Боковая панель (десктоп) */}
      <div className="hidden md:block w-64 border-r border-[#1E1E25]">
        <Sidebar />
      </div>
      
      {/* Мобильная боковая панель */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div 
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="absolute left-0 top-0 h-full w-3/4 max-w-xs border-r border-[#1E1E25] bg-[#050509] p-4">
            <Sidebar />
          </div>
        </div>
      )}
      
      {/* Основная часть */}
      <div className="flex flex-col flex-1">
        {/* Хедер мобильной версии */}
        <div className="md:hidden flex items-center justify-between p-4 border-b border-[#1E1E25]">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => setIsMobileSidebarOpen(true)}
          >
            <ChevronDown className="h-5 w-5" />
          </Button>
          <h1 className="text-lg font-medium text-white">OpenAI</h1>
          <Button variant="ghost" size="icon">
            <Plus className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Область сообщений */}
        <ScrollArea className="flex-1 p-4 text-white">
          <div className="max-w-2xl mx-auto">
            {messages.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-4">
                <div className="rounded-full bg-[#10a37f]/10 p-3">
                  <Settings className="h-6 w-6 text-[#10a37f]" />
                </div>
                <h2 className="text-2xl font-bold tracking-tight">OpenAI Помощник</h2>
                <p className="text-gray-400">
                  Задайте мне вопрос, и я постараюсь вам помочь.
                </p>
              </div>
            ) : (
              messages.map((message) => (
                <ChatMessage key={message.id} message={message} />
              ))
            )}
            {isSending && (
              <div className="flex items-center space-x-2 text-gray-400 animate-pulse mt-4">
                <div className="h-2 w-2 rounded-full bg-current" />
                <div className="h-2 w-2 rounded-full bg-current" />
                <div className="h-2 w-2 rounded-full bg-current" />
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        </ScrollArea>
        
        {/* Область ввода */}
        <div className="border-t border-[#1E1E25] p-4">
          <div className="max-w-2xl mx-auto flex space-x-2">
            <Input
              className="flex-1 bg-[#1E1E25] border-none text-white"
              placeholder="Напишите сообщение..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            />
            <Button 
              size="icon"
              disabled={!input.trim()}
              onClick={handleSendMessage}
              className="bg-[#10a37f] hover:bg-[#0e8f6e] text-white"
            >
              <SendHorizontal className="h-5 w-5" />
            </Button>
          </div>
          <div className="max-w-2xl mx-auto mt-2 text-xs text-center text-gray-400">
            OpenAI может допускать ошибки. Проверяйте важную информацию.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
