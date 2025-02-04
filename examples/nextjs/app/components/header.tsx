export default function Header() {
  return (
    <header className="">
      <p className="mb-6 inline-block rounded-lg bg-emerald-100 px-3 py-1 text-sm text-emerald-700">
        Powered by{" "}
        <a
          href="http://upstash.com"
          target="_blank"
          className="font-semibold underline"
        >
          Upstash
        </a>{" "}
        ,{" "}
        <a
          href="http://together.ai"
          target="_blank"
          className="font-semibold underline"
        >
          TogetherAI
        </a>{" "}
        and{" "}
        <a
          href="https://sdk.vercel.ai/"
          target="_blank"
          className="font-semibold underline"
        >
          Vercel AI SDK
        </a>
      </p>

      <h1 className="text-balance font-display text-4xl font-bold tracking-tight sm:text-5xl">
        AI Chat Component for Next.js
      </h1>

      <h3 className="mt-3 px-12 font-display text-xl opacity-80 sm:px-32">
        A modern, customizable chat interface with streaming responses and RAG
        capabilities
      </h3>

      <div className="mt-8 flex flex-col items-center justify-center gap-2 md:flex-row">
        <a
          className="flex h-10 items-center justify-center gap-2 rounded-full bg-emerald-900 px-4 font-medium text-white hover:opacity-60"
          href="https://github.com/upstash/rag-chat-component"
          target="_blank"
          rel="noopener noreferrer"
        >
          <svg
            height="24"
            viewBox="0 0 24 24"
            version="1.1"
            className="fill-current"
          >
            <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
          </svg>
          View on GitHub
        </a>
        <a
          className="flex h-10 items-center justify-center rounded-full border-2 border-emerald-900/20 px-4 font-medium hover:border-emerald-900"
          href="https://github.com/upstash/rag-chat-component?tab=readme-ov-file#rag-chat-component"
          target="_blank"
          rel="noopener noreferrer"
        >
          Documentation
        </a>
      </div>
    </header>
  );
}
