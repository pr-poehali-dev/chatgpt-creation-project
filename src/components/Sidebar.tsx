
import { useState } from "react";
import { Plus, MessageSquare, Trash2, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";

interface ChatHistory {
  id: string;
  title: string;
  date: Date;
}

const Sidebar = () => {
  const [chatHistory, setChatHistory] = useState<ChatHistory[]>([
    { id: "1", title: "Основы React и TypeScript", date: new Date(2023, 5, 15) },
    { id: "2", title: "Алгоритмы сортировки", date: new Date(2023, 5, 14) },
    { id: "3", title: "Помощь с API запросами", date: new Date(2023, 5, 12) },
  ]);

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("ru-RU", { 
      month: "short", 
      day: "numeric" 
    }).format(date);
  };

  const startNewChat = () => {
    // Здесь будет логика создания нового чата
    console.log("Новый чат создан");
  };

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <Button 
          variant="outline" 
          className="w-full justify-start"
          onClick={startNewChat}
        >
          <Plus className="mr-2 h-4 w-4" />
          Новый чат
        </Button>
      </div>
      
      <Separator />
      
      <div className="flex-1 overflow-hidden">
        <ScrollArea className="h-full">
          <div className="space-y-1 p-2">
            {chatHistory.map((chat) => (
              <Button
                key={chat.id}
                variant="ghost"
                className="w-full justify-start text-left font-normal"
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                <div className="flex flex-col items-start">
                  <span className="line-clamp-1">{chat.title}</span>
                  <span className="text-xs text-muted-foreground">
                    {formatDate(chat.date)}
                  </span>
                </div>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      <div className="p-4 mt-auto space-y-2">
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <Trash2 className="mr-2 h-4 w-4" />
          Очистить историю
        </Button>
        <Button variant="ghost" className="w-full justify-start text-muted-foreground">
          <Settings className="mr-2 h-4 w-4" />
          Настройки
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
