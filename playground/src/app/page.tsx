import { ChatComponent } from "@/client/components/chat-component";

export default function Home() {
  return (
    <main className="min-h-screen p-8">
      <h1 className="mb-8 text-2xl font-bold">Component Playground</h1>
      <div className="mx-auto max-w-3xl">
        <ChatComponent />
      </div>
    </main>
  );
}
