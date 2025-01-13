import Image from "next/image";
import { Chat } from "./components/chat";
import { ArrowUpRight } from "lucide-react";

export default function Home() {
  return (
    <div className="relative grid min-h-screen grid-rows-[20px_1fr_20px] items-center justify-items-center gap-16 p-8 pb-20 font-[family-name:var(--font-geist-sans)] sm:p-20">
      <Chat />
      <main className="row-start-2 flex max-w-3xl flex-col items-center gap-12 text-center">
        <div className="space-y-4">
          <h1 className="bg-gradient-to-r from-emerald-500/80 to-emerald-500 bg-clip-text text-4xl font-bold text-transparent sm:text-6xl">
            AI Chat Widget for Next.js
          </h1>
          <p className="text-lg text-zinc-800 sm:text-xl">
            A modern, customizable chat interface with streaming responses and
            RAG capabilities
          </p>
        </div>

        <div className="grid gap-8 text-left sm:grid-cols-2">
          <FeatureCard
            title="Streaming Responses"
            description="Real-time AI responses with token-by-token streaming for a natural chat experience."
          />
          <FeatureCard
            title="RAG Integration"
            description="Built-in support for Retrieval-Augmented Generation to provide context-aware responses."
          />
          <FeatureCard
            title="Fully Customizable"
            description="Easily customize the appearance and behavior to match your application's design."
          />
          <FeatureCard
            title="Server Actions"
            description="Built for Next.js App Router with Server Actions."
          />
        </div>

        <div className="flex flex-col items-center gap-4 sm:flex-row">
          <a
            className="hover:bg-primary-600 flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-white transition-colors"
            href="https://github.com/your-repo"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/github.svg"
              alt="GitHub logo"
              width={28}
              height={28}
              className="fill-white"
            />
            View on GitHub
          </a>
          <a
            className="flex h-12 items-center justify-center rounded-full border border-gray-200 px-6 transition-colors hover:bg-gray-50"
            href="/docs"
          >
            Documentation
          </a>
        </div>
      </main>

      <footer className="row-start-3 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-600">
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 hover:text-primary"
        >
          GitHub <ArrowUpRight size={14} />
        </a>
        <a href="/docs" className="flex items-center gap-1 hover:text-primary">
          Documentation <ArrowUpRight size={14} />
        </a>
        <a
          href="/examples"
          className="flex items-center gap-1 hover:text-primary"
        >
          Examples <ArrowUpRight size={14} />
        </a>
      </footer>
    </div>
  );
}

function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <h3 className="mb-2 font-bold">{title}</h3>
      <p className="text-sm text-gray-600">{description}</p>
    </div>
  );
}
