import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { createHighlighter, type Highlighter } from "shiki";
import { useEffect, useState } from "react";
import type { Components } from "react-markdown";
import { Copy, Check } from "lucide-react";

let shikiHighlighter: Highlighter | null = null;
const initShiki = async () => {
  if (!shikiHighlighter) {
    shikiHighlighter = await createHighlighter({
      themes: ["github-dark"],
      langs: [
        "javascript",
        "typescript",
        "python",
        "jsx",
        "tsx",
        "json",
        "bash",
        "markdown",
        "css",
        "html",
      ],
    });
  }
  return shikiHighlighter;
};

function parseMarkdownIntoBlocks(markdown: string): string[] {
  const tokens = marked.lexer(markdown);
  return tokens.map((token) => token.raw);
}

const CodeBlock = memo(
  ({ language, code }: { language: string; code: string }) => {
    const [html, setHtml] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isCopied, setIsCopied] = useState(false);

    useEffect(() => {
      const highlight = async () => {
        try {
          const highlighter = await initShiki();
          const highlighted = await highlighter.codeToHtml(code, {
            lang: language || "text",
            theme: "github-dark",
          });
          setHtml(highlighted);
        } catch (error) {
          // fallback for unsupported languages
          const highlighter = await initShiki();
          const highlighted = await highlighter.codeToHtml(code, {
            lang: "text",
            theme: "github-dark",
          });
          setHtml(highlighted);
        } finally {
          setIsLoading(false);
        }
      };

      highlight();
    }, [code, language]);

    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(code);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy code", err);
      }
    };

    return (
      <div className="my-2 max-w-full overflow-hidden rounded-lg bg-[#0d1117] text-xs">
        <div className="flex items-center justify-between border-b border-zinc-800 py-2 pl-4 pr-2 text-xs text-zinc-400">
          <span>{language || "text"}</span>
          <button
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 hover:text-zinc-300"
          >
            {isCopied ? (
              <>
                <Check size={14} className="text-green-500" />
                <span className="text-green-500">Copied!</span>
              </>
            ) : (
              <>
                <Copy size={14} />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
        <div
          className={`max-w-full overflow-x-auto bg-zinc-800 p-4 ${isLoading ? "animate-pulse" : ""}`}
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    );
  },
);

CodeBlock.displayName = "CodeBlock";

const MemoizedMarkdownBlock = memo(
  ({ content }: { content: string }) => {
    const components: Components = {
      code: ({ className, children }) => {
        const match = /language-(\w+)/.exec(className || "");
        const language = match ? match[1] : "";
        const code = String(children).replace(/\n$/, "");

        if (className) {
          return <CodeBlock language={language} code={code} />;
        }

        return (
          <code className="rounded bg-zinc-200 px-1.5 py-0.5 font-mono text-sm">
            {children}
          </code>
        );
      },
      pre: ({ children }) => {
        return <pre className="my-0 bg-zinc-100">{children}</pre>;
      },
    };

    return <ReactMarkdown components={components}>{content}</ReactMarkdown>;
  },
  (prevProps, nextProps) => prevProps.content === nextProps.content,
);

MemoizedMarkdownBlock.displayName = "MemoizedMarkdownBlock";

export const MemoizedMarkdown = memo(
  ({ content, id }: { content: string; id: string }) => {
    const blocks = useMemo(() => parseMarkdownIntoBlocks(content), [content]);

    return (
      <div className="w-full max-w-full overflow-hidden">
        {blocks.map((block, index) => (
          <MemoizedMarkdownBlock content={block} key={`${id}-block_${index}`} />
        ))}
      </div>
    );
  },
);

MemoizedMarkdown.displayName = "MemoizedMarkdown";
