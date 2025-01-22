import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-center gap-6">
      <a
        href="https://github.com/upstash/rag-chat-component"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 opacity-80 hover:underline"
      >
        GitHub <ArrowUpRight size={14} />
      </a>
      <a
        href="https://github.com/upstash/rag-chat-component?tab=readme-ov-file#rag-chat-component"
        className="flex items-center gap-1 opacity-80 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Documentation <ArrowUpRight size={14} />
      </a>
      <a
        href="https://github.com/upstash/rag-chat-component/tree/master/examples"
        className="flex items-center gap-1 opacity-80 hover:underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Examples <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}
