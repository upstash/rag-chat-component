import Image from "next/image";
import {Chat} from "./components/chat";
import {ArrowUpRight} from "lucide-react";

export default function Home() {
    return (
        <div
            className="text-black px-8 sm:px-12 py-20 sm:py-24 flex min-h-screen flex-col items-center justify-center text-center">

            <Chat/>


            <div
                className="fixed pointer-events-none -z-10 right-0 bottom-0 translate-x-1/2 translate-y-1/2">
                <div className="-translate-x-14 -translate-y-14">
                    {/*<svg width="2300" height="2300" viewBox="0 0 2300 2300" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                        <circle opacity="0.9" cx="1150" cy="1150" r="99" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.8" cx="1150" cy="1150" r="249" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.7" cx="1150" cy="1150" r="399" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.6" cx="1150" cy="1150" r="549" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.5" cx="1150" cy="1150" r="699" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.4" cx="1150" cy="1150" r="849" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.3" cx="1150" cy="1150" r="999" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.2" cx="1150" cy="1150" r="1149" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.1" cx="1150" cy="1150" r="1299" stroke="currentColor"
                                strokeWidth="45"/>
                        <circle opacity="0.05" cx="1150" cy="1150" r="1449" stroke="currentColor"
                                strokeWidth="45"/>
                    </svg>*/}
                    <span
                        className="pulse"/>
                    <span
                        style={{
                            animationDelay: "5s"
                        }}
                        className="pulse"/>
                    <span
                        style={{
                            animationDelay: "10s"
                        }}
                        className="pulse"/>
                    <span
                        style={{
                            animationDelay: "15s"
                        }}
                        className="pulse"/>
                    <span
                        style={{
                            animationDelay: "20s"
                        }}
                        className="pulse"/>
                    <span
                        style={{
                            animationDelay: "25s"
                        }}
                        className="pulse"/>
                    <span
                        style={{
                            animationDelay: "30s"
                        }}
                        className="pulse"/>
                    <span
                        style={{
                            animationDelay: "35s"
                        }}
                        className="pulse"/>
                </div>
            </div>


            <main className="flex max-w-screen-md flex-col items-center">
                <header className="">
                    <h1 className="text-4xl text-balance font-bold tracking-tight sm:text-6xl">
                        AI Chat Component for Next.js
                    </h1>

                    <p className="px-6 mt-4 text-zinc-500 text-balance text-lg sm:text-xl">
                        A modern, customizable chat interface with streaming responses and
                        RAG capabilities
                    </p>

                    <div className="mt-6 flex items-center justify-center gap-2">
                        <a
                            className="flex h-10 items-center justify-center gap-2 rounded-full bg-black px-4 text-white hover:opacity-60"
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
                            className="flex h-10 items-center justify-center rounded-full border-2 px-4 hover:border-black"
                            href="/docs"
                        >
                            Documentation
                        </a>
                    </div>
                </header>

                <div className="sc mt-16 grid gap-4 sm:grid-cols-2">
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
            </main>

            <footer className="mt-16 flex flex-wrap items-center justify-center gap-6 text-zinc-600">
                <a
                    href="https://github.com/your-repo"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 hover:underline"
                >
                    GitHub <ArrowUpRight size={14}/>
                </a>
                <a href="/docs" className="flex items-center gap-1 hover:underline">
                    Documentation <ArrowUpRight size={14}/>
                </a>
                <a href="/examples" className="flex items-center gap-1 hover:underline">
                    Examples <ArrowUpRight size={14}/>
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
        <div className="rounded-xl bg-white border shadow-sm px-8 py-6">
            <h3 className="font-bold">{title}</h3>
            <p className="mt-1 text-zinc-600">{description}</p>
        </div>
    );
}
