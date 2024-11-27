"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@radix-ui/react-tooltip";
import type { UpstashMessage } from "@upstash/rag-chat";
import { readServerActionStream } from "@upstash/rag-chat/nextjs";
import { useState, useRef, useEffect } from "react";
import { serverChat } from "../../server/chat";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "./ui/card";
import { Input } from "./ui/input";
import {
  Bot,
  Loader2,
  MessageCircle,
  Moon,
  Send,
  Sun,
  User,
  X,
} from "lucide-react";

export const ChatWidget = () => {
  const [messages, setMessages] = useState<UpstashMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const scrollToBottom = () => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isStreaming) {
      const intervalId = setInterval(scrollToBottom, 100);
      return () => clearInterval(intervalId);
    }
  }, [isStreaming]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: UpstashMessage = {
      content: input,
      role: "user",
      id: Date.now().toString(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const stream = await serverChat({ userMessage });
      setIsStreaming(true);
      let aiMessage: UpstashMessage = {
        content: "",
        role: "assistant",
        id: (Date.now() + 1).toString(),
      };
      setMessages((prev) => [...prev, aiMessage]);

      for await (const chunk of readServerActionStream(stream)) {
        aiMessage.content += chunk;
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === aiMessage.id
              ? { ...msg, content: aiMessage.content }
              : msg
          )
        );
      }
    } catch (error) {
      console.error("Error in AI response:", error);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const renderMessage = (message: UpstashMessage, index: number) => {
    const isLastMessage = index === messages.length - 1;
    const showDots =
      isLastMessage && isStreaming && message.role === "assistant";

    return (
      <div
        key={index}
        ref={isLastMessage ? lastMessageRef : null}
        className={`flex mb-4 ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={cn(
            "max-w-[80%] px-4 py-2 rounded-lg flex items-start gap-2",
            message.role === "user"
              ? "bg-yellow-950 text-white dark:bg-yellow-300 dark:text-yellow-950"
              : "bg-yellow-100 text-yellow-950 dark:bg-yellow-900 dark:text-yellow-100"
          )}
        >
          {message.role === "assistant" ? (
            <Bot className="h-5 w-5 mt-1 flex-shrink-0" />
          ) : (
            <User className="h-5 w-5 mt-1 flex-shrink-0" />
          )}
          <div>
            {message.content}
            {showDots && (
              <span className="inline-block ml-1">
                <span className="dots animate-pulse">...</span>
              </span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const hasMessages = messages.length > 0;

  return (
    <TooltipProvider>
      <div className="fixed bottom-4 right-4 z-50">
        <div
          className={`transition-all duration-300 ease-in-out ${
            isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
          }`}
        >
          <Card
            className={cn(
              "w-80 sm:w-96 shadow-2xl transition-all duration-300 border border-yellow-700/20 dark:border-yellow-300/20 bg-white dark:bg-gray-900",
              isOpen ? "translate-y-0" : "translate-y-full"
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-semibold text-yellow-950 dark:text-yellow-100 flex items-center gap-2">
                <Bot className="h-5 w-5" />
                Chat Assistant
              </CardTitle>
              <div className="flex items-center gap-2">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={toggleDarkMode}
                      className="hover:bg-yellow-100 dark:hover:bg-yellow-900 rounded-full p-2"
                    >
                      {isDarkMode ? (
                        <Sun className="h-4 w-4 text-yellow-100" />
                      ) : (
                        <Moon className="h-4 w-4 text-yellow-950" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Toggle dark mode</p>
                  </TooltipContent>
                </Tooltip>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="hover:bg-red-100 hover:text-red-600 dark:hover:bg-red-900 dark:hover:text-red-400 rounded-full"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="h-[350px] pr-4 overflow-auto" ref={scrollAreaRef}>
                {!hasMessages && !isLoading && (
                  <div className="text-center opacity-50 text-sm absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 dark:text-yellow-100">
                    Chat with the AI assistant
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  {messages.map(renderMessage)}
                  {isLoading && !isStreaming && (
                    <div className="flex justify-center items-center py-2">
                      <Loader2 className="h-6 w-6 animate-spin text-yellow-950 dark:text-yellow-100" />
                    </div>
                  )}
                </div>
                <div className="h-[30px]" />
              </div>
            </CardContent>
            <CardFooter>
              <form
                onSubmit={handleSubmit}
                className="relative flex gap-2 items-center w-full"
              >
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="border placeholder:text-yellow-950/50 dark:placeholder:text-yellow-100/50 border-yellow-700/20 dark:border-yellow-300/20 rounded-md px-4 h-10 w-full focus:border-yellow-950 dark:focus:border-yellow-100 outline-none ring-0 bg-white dark:bg-gray-800 text-yellow-950 dark:text-yellow-100"
                  disabled={isLoading || isStreaming}
                  ref={inputRef}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      className={cn(
                        "px-4 h-10 bg-yellow-950 text-white dark:bg-yellow-300 dark:text-yellow-950 rounded-lg",
                        (isLoading || isStreaming) &&
                          "opacity-50 cursor-not-allowed"
                      )}
                      disabled={isLoading || isStreaming}
                    >
                      {isLoading || isStreaming ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Send message</p>
                  </TooltipContent>
                </Tooltip>
              </form>
            </CardFooter>
            {hasMessages && (
              <button
                className="absolute text-xs bottom-full mb-1 left-4 opacity-50 hover:opacity-100 underline text-yellow-950 dark:text-yellow-100 transition-opacity"
                onClick={() => {
                  setMessages([]);
                }}
              >
                Clear messages
              </button>
            )}
          </Card>
        </div>
        <div
          className={`transition-all duration-300 ease-in-out absolute right-5 bottom-5 ${
            isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100"
          }`}
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={toggleChat}
                className="rounded-full p-3 shadow-lg hover:shadow-xl transition-all duration-300 bg-yellow-950 text-white dark:bg-yellow-300 dark:text-yellow-950"
              >
                <MessageCircle className="h-6 w-6" />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Chat with AI</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
};
