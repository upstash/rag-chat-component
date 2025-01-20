import Features from "@/app/components/features";
import Footer from "@/app/components/footer";
import Header from "@/app/components/header";
import { Chat } from "./components/chat";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-8 py-12 text-center sm:px-12 sm:py-16">
      {/* page */}
      <main className="flex max-w-screen-md flex-col items-center">
        <Header />
        <Features />
        <Footer />
      </main>

      {/* chat */}
      <Chat />
      <div className="pointer-events-none fixed bottom-0 right-0 -z-10 translate-x-1/2 translate-y-1/2">
        <div className="-translate-x-14 -translate-y-14">
          {[0, 5, 10, 15, 20, 25, 30, 35].map((o) => (
            <span
              key={o}
              style={{ animationDelay: `${o}s` }}
              className="pulse"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
