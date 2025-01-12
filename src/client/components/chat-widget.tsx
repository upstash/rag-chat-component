"use client";

import "./styles.css";

import { ScrollArea } from "@radix-ui/react-scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import type { UpstashMessage } from "@upstash/rag-chat";
// import { readServerActionStream } from "@upstash/rag-chat/nextjs";
import { useEffect, useRef, useState } from "react";
// import { serverChat } from "../../server/chat";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Input } from "./ui/input";
import { Bot, Loader2, MessageCircle, Send, User, X } from "lucide-react";

export const ChatWidget = () => {
  const [messages, setMessages] = useState<UpstashMessage[]>([]);
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

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

    // try {
    //   const stream = await serverChat({ userMessage });
    //   setIsStreaming(true);
    //   let aiMessage: UpstashMessage = {
    //     content: "",
    //     role: "assistant",
    //     id: (Date.now() + 1).toString(),
    //   };
    //   setMessages((prev) => [...prev, aiMessage]);
    //
    //   for await (const chunk of readServerActionStream(stream)) {
    //     aiMessage.content += chunk;
    //     setMessages((prev) =>
    //       prev.map((msg) =>
    //         msg.id === aiMessage.id
    //           ? { ...msg, content: aiMessage.content }
    //           : msg,
    //       ),
    //     );
    //   }
    // } catch (error) {
    //   console.error("Error in AI response:", error);
    // } finally {
    //   setIsLoading(false);
    //   setIsStreaming(false);
    // }
  };

  const renderMessage = (message: UpstashMessage, index: number) => {
    const isLastMessage = index === messages.length - 1;
    const showDots =
      isLastMessage && isStreaming && message.role === "assistant";

    return (
      <div
        key={index}
        ref={isLastMessage ? lastMessageRef : null}
        className={`mb-4 flex ${
          message.role === "user" ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={cn(
            "flex max-w-[80%] items-start gap-2 rounded-lg px-4 py-2",
            message.role === "user"
              ? "bg-yellow-950 text-white"
              : "bg-yellow-100 text-yellow-950",
          )}
        >
          {message.role === "assistant" ? (
            <Bot className="mt-1 h-5 w-5 flex-shrink-0" />
          ) : (
            <User className="mt-1 h-5 w-5 flex-shrink-0" />
          )}
          <div>
            {message.content}
            {showDots && (
              <span className="ml-1 inline-block">
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
              "w-80 shadow-2xl transition-all duration-300 sm:w-96",
              "border border-yellow-700/20 bg-white",
              isOpen ? "translate-y-0" : "translate-y-full",
            )}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="flex items-center gap-2 text-lg font-semibold text-yellow-950">
                <Bot className="h-5 w-5" />
                Chat Assistant
              </CardTitle>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={toggleChat}
                  className="rounded-full hover:bg-red-100 hover:text-red-600"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <ScrollArea
                className="h-[350px] overflow-auto overscroll-contain px-4"
                ref={scrollAreaRef}
              >
                {!hasMessages && !isLoading && (
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-center text-sm opacity-50">
                    Chat with the AI assistant
                  </div>
                )}
                <div className="flex flex-col gap-4">
                  {messages.map(renderMessage)}
                  {isLoading && !isStreaming && (
                    <div className="flex items-center justify-center py-2">
                      <Loader2 className="animate-spin h-6 w-6 text-yellow-950" />
                    </div>
                  )}
                </div>
                <div className="h-[30px]" />
              </ScrollArea>
            </CardContent>
            <CardFooter>
              <form
                onSubmit={handleSubmit}
                className="relative flex w-full items-center gap-2"
              >
                <Input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask a question..."
                  className="h-10 w-full rounded-md border border-yellow-700/20 bg-white px-4 text-yellow-950 outline-none ring-0 placeholder:text-yellow-950/50 focus:border-yellow-950"
                  disabled={isLoading || isStreaming}
                  ref={inputRef}
                />
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      type="submit"
                      className={cn(
                        "h-10 rounded-lg bg-yellow-950 px-4 text-white",
                        (isLoading || isStreaming) &&
                          "cursor-not-allowed opacity-50",
                      )}
                      disabled={isLoading || isStreaming}
                    >
                      {isLoading || isStreaming ? (
                        <Loader2 className="animate-spin h-4 w-4" />
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
                className="absolute bottom-full left-4 mb-1 text-xs text-yellow-950 underline opacity-50 transition-opacity hover:opacity-100"
                onClick={() => {
                  setMessages([]);
                }}
              >
                Clear messages
              </button>
            )}
          </Card>
        </div>

        {/* Trigger Button */}
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              onClick={toggleChat}
              className={cn(
                "absolute bottom-5 right-5 z-[9999] size-12",
                "flex items-center justify-center",
                "rounded-full bg-pink-500 text-white shadow-xl",
                "transition-all duration-300 ease-in-out",
                isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
              )}
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Chat with AI</p>
          </TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
};
