import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import Logo from '@/components/Logo';
import ThemeToggle from '@/components/ThemeToggle';
import ChatMessage, { Message } from '@/components/chat/ChatMessage';
import ChatInput from '@/components/chat/ChatInput';
import ChatSidebar, { type Chat as ChatType } from '@/components/chat/ChatSidebar';
import UserMenu from '@/components/chat/UserMenu';

const ChatPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [currentChatId, setCurrentChatId] = useState<string | null>(null);
  const [chats, setChats] = useState<ChatType[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Load chats from localStorage
    const savedChats = localStorage.getItem('meditranslate-chats');
    if (savedChats) {
      const parsed = JSON.parse(savedChats);
      setChats(parsed.map((c: ChatType) => ({ ...c, timestamp: new Date(c.timestamp) })));
    }
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const saveChats = (updatedChats: ChatType[]) => {
    localStorage.setItem('meditranslate-chats', JSON.stringify(updatedChats));
    setChats(updatedChats);
  };

  const generateAIResponse = (userMessage: string, hasImage: boolean): string => {
    if (hasImage) {
      return `I've received your medical report image. Let me analyze it for you.\n\nBased on my analysis, I can see this appears to be a medical document. Here's what I've found:\n\n• **Document Type**: Medical report/Lab results\n• **Key Findings**: The results appear to be within normal parameters\n• **Recommendations**: Please consult with your healthcare provider for personalized medical advice\n\nWould you like me to explain any specific terms or values from this report in simpler language?`;
    }

    const responses = [
      `Thank you for your question about "${userMessage.slice(0, 50)}..."\n\nI'm here to help you understand medical terminology and reports. Could you please share more details or upload an image of your medical report for a more accurate explanation?`,
      `That's a great question! Medical terminology can be confusing.\n\nTo give you the most accurate information, I'd recommend:\n\n1. Sharing any relevant medical documents\n2. Describing your specific concerns\n3. Mentioning any symptoms you're experiencing\n\nHow can I assist you further?`,
      `I understand you're looking for medical information.\n\n**Important Note**: While I can help explain medical terms and reports, please always consult with a qualified healthcare professional for medical advice.\n\nWhat specific aspect would you like me to clarify?`,
    ];

    return responses[Math.floor(Math.random() * responses.length)];
  };

const handleSendMessage = async (content: string, image?: string) => {
  const userMessage: Message = {
    id: crypto.randomUUID(),
    role: 'user',
    content: content || 'Please analyze this medical report',
    image,
    timestamp: new Date(),
  };

  const newMessages = [...messages, userMessage];
  setMessages(newMessages);
  setIsTyping(true);

  // ===============================
  // 🔴 IMAGE CHA → API CALL
  // ===============================
if (image) {
  try {
    const blob = await fetch(image).then(res => res.blob());

    // ✅ Use valid UUID
    
    const sessionId = "d433a931-8308-466f-a5a4-42a8207a6116";
    const formData = new FormData();
    formData.append("image", blob, "report.png");
    formData.append("chatSessionId", sessionId);

    const res = await fetch("http://localhost:5000/api/translate", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();

    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'ai',
      content: data.translation.translated_text,
      timestamp: new Date(),
    };

    setMessages([...newMessages, aiMessage]);
  } catch (err) {
    setMessages([
      ...newMessages,
      {
        id: crypto.randomUUID(),
        role: 'ai',
        content: '❌ Medical report analyze garna sakena',
        timestamp: new Date(),
      },
    ]);
  } finally {
    setIsTyping(false);
  }

  return;
}


  // ===============================
  // 🟢 IMAGE CHAINA → OLD CODE SAME
  // ===============================
  setTimeout(() => {
    const aiMessage: Message = {
      id: crypto.randomUUID(),
      role: 'ai',
      content: generateAIResponse(content, false),
      timestamp: new Date(),
    };

    const updatedMessages = [...newMessages, aiMessage];
    setMessages(updatedMessages);
    setIsTyping(false);

    // Update or create chat (UNCHANGED)
    const chatTitle = content?.slice(0, 30) || 'Medical Report Analysis';
    if (currentChatId) {
      const updatedChats = chats.map((chat) =>
        chat.id === currentChatId
          ? { ...chat, lastMessage: content || 'Uploaded report', timestamp: new Date() }
          : chat
      );
      saveChats(updatedChats);
    } else {
      const newChat: ChatType = {
        id: crypto.randomUUID(),
        title: chatTitle,
        lastMessage: content || 'Uploaded report',
        timestamp: new Date(),
      };
      setCurrentChatId(newChat.id);
      saveChats([newChat, ...chats]);
    }
  }, 1500);
};


  const handleNewChat = () => {
    setCurrentChatId(null);
    setMessages([]);
    setIsSidebarOpen(false);
  };

  const handleSelectChat = (chatId: string) => {
    setCurrentChatId(chatId);
    // In a real app, load messages for this chat
    setMessages([]);
    setIsSidebarOpen(false);
  };

  if (!isAuthenticated) return null;

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="flex-shrink-0 border-b border-border bg-card px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsSidebarOpen(true)}
            className="text-muted-foreground"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <Logo size="sm" />
        </div>
        <ThemeToggle />
      </header>

      {/* Sidebar */}
      <ChatSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        chats={chats}
        currentChatId={currentChatId}
        onSelectChat={handleSelectChat}
        onNewChat={handleNewChat}
      />

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="max-w-3xl mx-auto px-4 py-6">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Logo size="sm" />
                </div>
                <h2 className="text-xl font-semibold text-foreground mb-2">
                  Welcome to MediTranslate
                </h2>
                <p className="text-muted-foreground max-w-md">
                  Upload your medical reports, lab results, or prescriptions and I'll help you
                  understand them in simple terms.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  {['What does my blood test mean?', 'Explain this prescription', 'Help me understand my diagnosis'].map(
                    (prompt) => (
                      <button
                        key={prompt}
                        onClick={() => handleSendMessage(prompt)}
                        className="px-4 py-2 text-sm rounded-full border border-border bg-card hover:bg-accent transition-colors text-foreground"
                      >
                        {prompt}
                      </button>
                    )
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {messages.map((message) => (
                  <ChatMessage key={message.id} message={message} />
                ))}
                {isTyping && (
                  <div className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center">
                      <div className="flex gap-1">
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                        <span className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>
            )}
          </div>
        </div>

        {/* Input Area */}
        <div className="flex-shrink-0 max-w-3xl mx-auto w-full">
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
          <div className="px-4 pb-4">
            <UserMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
