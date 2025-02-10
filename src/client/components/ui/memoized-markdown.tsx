import { marked } from "marked";
import { memo, useMemo } from "react";
import ReactMarkdown from "react-markdown";
import { createHighlighter, type Highlighter } from "shiki";
import { useEffect, useState, useRef } from "react";
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
    const [isCopied, setIsCopied] = useState(false);
    const codeContentRef = useRef<HTMLDivElement>(null);
    const previousCodeLength = useRef(0);

    useEffect(() => {
      const updateContent = async () => {
        if (!codeContentRef.current) return;

        try {
          // Only process the new content
          const newContent = code.slice(previousCodeLength.current);
          if (!newContent) return;

          const highlighter = await initShiki();
          const highlighted = await highlighter.codeToHtml(code, {
            lang: language || "text",
            theme: "github-dark",
          });

          // For the first render
          if (previousCodeLength.current === 0) {
            codeContentRef.current.innerHTML = highlighted;
          } else {
            // For subsequent updates, find the existing pre element
            const preElement = codeContentRef.current.querySelector("pre");
            if (preElement) {
              // Get the code element inside pre
              const codeElement = preElement.querySelector("code");
              if (codeElement) {
                // Instead of replacing innerHTML, append the new content
                const tempDiv = document.createElement("div");
                tempDiv.innerHTML = highlighted;
                const newCodeElement = tempDiv.querySelector("code");
                if (newCodeElement) {
                  // Only append the new spans that were added
                  const newSpans = Array.from(newCodeElement.children).slice(
                    previousCodeLength.current,
                  );
                  codeElement.append(...newSpans);
                }
              }
            }
          }

          previousCodeLength.current = code.length;
        } catch (error) {
          console.error("Error updating code content:", error);
        }
      };

      updateContent();
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
          ref={codeContentRef}
          className="max-w-full overflow-x-auto bg-zinc-800 p-4"
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
