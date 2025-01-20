"use client";

import { ScrollArea } from "@radix-ui/react-scroll-area";

import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { serverChat } from "../../server/actions/chat";
import { deleteHistory, getHistory } from "../../server/actions/history";

import type { Message } from "../../server/lib/types";
import { cn } from "./lib/utils";
import { Button } from "./ui/button";
import { ArrowUp, Bot, Loader2, X } from "lucide-react";
import TextareaAutosize from "react-textarea-autosize";
import { readStreamableValue } from "ai/rsc";

type ChatComponentProps = {
  theme?: {
    triggerButtonIcon?: React.ReactNode;
    triggerButtonColor?: string;
  };
};

export const ChatComponent = ({ theme }: ChatComponentProps) => {
  const [conversation, setConversation] = useState<Message[]>([]);
  const [sessionId, setSessionId] = useState<string>("");
  const [input, setInput] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

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
    let id = localStorage.getItem("chat_session_id");
    if (!id) {
      id = "session_" + Math.random().toString(36).substr(2, 9);
      localStorage.setItem("chat_session_id", id);
    }
    setSessionId(id);

    const fetchHistory = async () => {
      try {
        setIsLoading(true);
        const { messages } = await getHistory(id);
        if (messages.length > 0) {
          setConversation(messages);
        }
      } catch (error) {
        console.error("Error fetching chat history:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHistory();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [conversation]);

  useEffect(() => {
    if (isStreaming) {
      const intervalId = setInterval(scrollToBottom, 100);
      return () => clearInterval(intervalId);
    }
  }, [isStreaming]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      content: input,
      role: "user",
      id: Date.now().toString(),
    };

    const newConversation = [...conversation, userMessage];
    setConversation(newConversation);
    setInput("");
    setIsLoading(true);

    try {
      const { output } = await serverChat({
        messages: newConversation,
        sessionId,
      });
      setIsStreaming(true);
      let aiMessage: Message = {
        content: "",
        role: "assistant",
        id: (Date.now() + 1).toString(),
      };
      setConversation((prev) => [...prev, aiMessage]);

      for await (const delta of readStreamableValue(output)) {
        aiMessage.content += delta;
        setConversation((prev) =>
          prev.map((msg) =>
            msg.id === aiMessage.id
              ? { ...msg, content: aiMessage.content }
              : msg,
          ),
        );
      }
    } catch (error) {
      console.error("Error in AI response:", error);
    } finally {
      setIsLoading(false);
      setIsStreaming(false);
    }
  };

  const handleClearHistory = async () => {
    if (!sessionId || isLoading) return;

    setIsLoading(true);
    try {
      const { success } = await deleteHistory(sessionId);
      if (success) {
        setConversation([]);
      }
    } catch (error) {
      console.error("Error clearing chat history:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const renderMessage = (message: Message, index: number) => {
    const isLastMessage = index === conversation.length - 1;
    const showDots = isLastMessage && isStreaming;
    const isUser = message.role === "user";

    return (
      <div
        key={index}
        ref={isLastMessage ? lastMessageRef : null}
        className={cn("mb-2 flex", isUser ? "justify-end" : "justify-start")}
      >
        {isUser ? (
          // User message
          <div className="rounded-2xl bg-black px-4 py-2 text-white">
            {message.content}
          </div>
        ) : (
          // Assistant message
          <div className="flex max-w-[90%] items-start gap-3">
            <Bot size={28} strokeWidth={1.5} className="mt-2 shrink-0" />
            <div className="relative rounded-2xl bg-zinc-100 px-4 py-2">
              <span className="absolute -left-1 top-4 size-4 rotate-45 bg-inherit" />
              {message.content}
              {showDots && (
                <span className="ml-1 inline-block">
                  <span className="dots animate-pulse">...</span>
                </span>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const hasMessages = conversation.length > 0;

  return (
    <div className="rcc">
      {/* >>> Trigger Button */}
      <Button
        onClick={toggleChat}
        className={cn(
          "fixed bottom-8 right-8 z-[9999] size-12",
          "flex items-center justify-center p-0",
          "rounded-full text-white shadow-xl",
          "transition-all duration-300 ease-in-out",
          isOpen ? "scale-0 opacity-0" : "scale-100 opacity-100",
        )}
        style={{
          backgroundColor: theme?.triggerButtonColor ?? "#10b981", // default: emerald-500
        }}
      >
        {theme?.triggerButtonIcon ?? <Bot size={28} />}
      </Button>

      {/* >>> Chat Modal */}
      <div
        className={cn(
          "fixed bottom-8 right-8 z-50 w-[420px] antialiased",
          "rounded-2xl bg-white shadow-2xl",
          "border border-zinc-300 text-black",
          "transition-all duration-300",
          isOpen
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-full opacity-0",
        )}
      >
        {/* Chat Header */}
        <header className="rounded-t-2xl border-b border-b-zinc-100 bg-zinc-50 px-6 py-5">
          {/* close button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-4 opacity-30 hover:bg-zinc-300 hover:opacity-100"
            onClick={toggleChat}
          >
            <X size={20} strokeWidth="1.5" />
          </Button>

          {/* header */}
          <div>
            <h3 className="text-lg font-semibold">Chat Assistant</h3>
            <h5 className="inline-flex items-center gap-1 text-sm text-zinc-500">
              Powered by{" "}
              <a
                href="http://upstash.com"
                target="_blank"
                className="underline"
              >
                Upstash
              </a>{" "}
              and{" "}
              <a
                href="http://together.ai"
                target="_blank"
                className="underline"
              >
                TogetherAI
              </a>
            </h5>
          </div>
        </header>

        {/* Chat Body */}
        <ScrollArea
          className="h-[420px] overflow-auto overscroll-contain p-6"
          ref={scrollAreaRef}
        >
          {/* empty message */}
          {!hasMessages && !isLoading && (
            <div className="flex h-full items-center justify-center text-center text-sm">
              <span className="rounded-xl bg-zinc-50 p-4 text-zinc-500">
                Chat with the AI assistant
              </span>
            </div>
          )}

          {/* chat bubbles */}
          <div className="flex flex-col gap-4">
            {conversation.map(renderMessage)}
            {isLoading && !isStreaming && (
              <div className="flex items-center justify-center py-2">
                <Loader2 className="animate-spin h-6 w-6" />
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Chat Form */}
        <form onSubmit={handleSubmit} className="relative p-6">
          <TextareaAutosize
            className={cn(
              "flex w-full rounded-3xl border bg-transparent px-4 py-3",
              "focus:outline-none focus:ring-2 focus:ring-primary",
              "disabled:cursor-not-allowed disabled:opacity-50",
              "resize-none",
            )}
            rows={1}
            maxRows={5}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e);
              }
            }}
            placeholder="Ask a question..."
            disabled={isLoading || isStreaming}
            ref={inputRef}
          />

          <Button
            type="submit"
            size="icon"
            className={cn(
              "absolute bottom-8 right-8 z-10 bg-black",
              (isLoading || isStreaming) && "cursor-not-allowed opacity-50",
            )}
            disabled={isLoading || isStreaming}
          >
            {isLoading || isStreaming ? (
              <Loader2 size={20} className="animate-spin" />
            ) : (
              <ArrowUp size={20} className="" />
            )}
          </Button>

          {/* clear button */}
          {/* <Button
            variant="ghost"
            size="sm"
            className="text-sm text-zinc-400 hover:bg-zinc-200 hover:text-red-500"
            disabled={hasMessages}
            onClick={() => {
              handleClearHistory();
            }}
          >
            Clear
          </Button> */}
        </form>
      </div>
    </div>
  );
};
