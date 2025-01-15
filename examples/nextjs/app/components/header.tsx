import Image from "next/image";

export default function Header() {
  return (
    <header className="">
      <h1 className="text-balance font-display text-4xl font-semibold tracking-tight sm:text-6xl">
        AI Chat Component for Next.js
      </h1>

      <p className="mt-4 text-balance px-6 font-display text-xl opacity-80 sm:text-2xl">
        A modern, customizable chat interface with streaming responses and RAG
        capabilities
      </p>

      <div className="mt-6 flex items-center justify-center gap-2">
        <a
          className="flex h-10 items-center justify-center gap-2 rounded-full bg-emerald-900 px-4 text-white hover:opacity-60"
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Image
            src="/github.svg"
            alt="GitHub logo"
            width={24}
            height={24}
            className="fill-current"
          />
          View on GitHub
        </a>
        <a
          className="flex h-10 items-center justify-center rounded-full border-2 border-emerald-900/20 px-4 hover:border-emerald-900"
          href="/docs"
        >
          Documentation
        </a>
      </div>
    </header>
  );
}
