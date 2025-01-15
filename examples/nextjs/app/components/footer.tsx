import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  return (
    <footer className="mt-16 flex flex-wrap items-center justify-center gap-6">
      <a
        href="https://github.com/your-repo"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 opacity-80 hover:underline"
      >
        GitHub <ArrowUpRight size={14} />
      </a>
      <a
        href="/docs"
        className="flex items-center gap-1 opacity-80 hover:underline"
      >
        Documentation <ArrowUpRight size={14} />
      </a>
      <a
        href="/examples"
        className="flex items-center gap-1 opacity-80 hover:underline"
      >
        Examples <ArrowUpRight size={14} />
      </a>
    </footer>
  );
}
