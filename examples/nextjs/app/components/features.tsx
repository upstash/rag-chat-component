export default function Features() {
  return (
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
  );
}

export function FeatureCard({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-emerald-900/20 bg-white/60 px-8 py-6 shadow-sm backdrop-blur">
      <h3 className="font-display text-lg font-semibold">{title}</h3>
      <p className="mt-1 opacity-80">{description}</p>
    </div>
  );
}
