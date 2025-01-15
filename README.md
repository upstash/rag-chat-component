# RAG Chat Component

A customizable Reach chat component that combines Upstash Vector for similarity search, Together AI for LLM, and Vercel AI SDK for streaming responses. This ready-to-use component provides an out of the box solution for adding RAG-Powered chat interfaces to your Next.js application.

<table>
  <tr>
    <td align="center">
      <img src="https://raw.githubusercontent.com/upstash/rag-chat-component/refs/heads/master/public/images/widget-closed.png" alt="RAG Chat Component - Closed State" width="300"/><br/>
      <em>Closed State</em>
    </td>
    <td align="center">
      <img src="https://raw.githubusercontent.com/upstash/rag-chat-component/refs/heads/master/public/images/widget-open.png" alt="RAG Chat Component - Open State" width="300"/><br/>
      <em>Open State</em>
    </td>
  </tr>
</table>

## Features

⚡ Streaming responses support

💻 Server actions

📱 Responsive design

🔍 Real-time context retrieval

💾 Persistent chat history

🎨 Fully customizable UI components

🎨 Dark/light mode support

## Installation

```bash
# Using npm
npm install @upstash/rag-chat-component

# Using pnpm
pnpm add @upstash/rag-chat-component

# Using yarn
yarn add @upstash/rag-chat-component
```

## Quick Start

### 1. Environment Variables

Create an Upstash Vector database and set up the environment variables as below. If you don't have an account, you can start by going to [Upstash Console](https://console.upstash.com).

Choose an embedding model when creating an index in Upstash Vector.

```
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=

OPENAI_API_KEY=

TOGETHER_API_KEY=

# Optional
TOGETHER_MODEL=
```

### 2. Configure Styles

In your `tailwind.config.ts` file, add the configuration below:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./node_modules/@upstash/rag-chat-component/**/*.{js,mjs}"],
} satisfies Config;
```

### 3. Implementation

The RAG Chat Component can be integrated into your application using two straightforward approaches. Choose the method that best fits your project structure:

#### 1. Using a Dedicated Component File (Recommended)

Create a seperate component file with the `use client` directive, then import and use it anywhere in your application.

```jsx
// components/chat.tsx
"use client";

import { ChatComponent } from "@upstash/rag-chat-component";

export const Chat = () => {
  return <ChatComponent />;
};
```

```jsx
// page.tsx
import { Chat } from "./components/chat";

export default function Home() {
  return (
    <>
      <Chat />
      <p>Home</p>
    </>
  );
}
```

#### 2. Direct Integration in Client Components

Alternatively, import and use the **ChatComponent** directly in your client-side pages.

```jsx
// page.tsx
"use client";
import { ChatComponent } from "@upstash/rag-chat-component";

export default function Home() {
  return (
    <>
      <ChatComponent />
      <p>Home</p>
    </>
  );
}
```

### 4. Choosing Chat Model

It's possible to choose one of the [together.ai](https://www.together.ai/) models for the chat.
Default model is `meta-llama/Meta-Llama-3.1-8B-Instruct-Turbo`. You can configure it in the environment variables.

```
TOGETHER_MODEL="deepseek-ai/DeepSeek-V3"
```

## Adding Content

You can add content to your RAG Chat component in several ways:

<details>
<summary>1. Using RAG Chat SDK</summary>

The SDK provides methods to add various types of content programmatically:

```ts
import { RAGChat, openai } from "@upstash/rag-chat";

export const ragChat = new RAGChat({
  model: openai("gpt-4-turbo"),
});
// Add text content
await ragChat.context.add("Your text content here");

// Add PDF documents
await ragChat.context.add({
  type: "pdf",
  fileSource: "./path/to/document.pdf",
});

// Add web content
await ragChat.context.add({
  type: "html",
  source: "https://your-website.com",
});
```

For more detailed examples and options, check out the [RAG Chat documentation](https://upstash.com/docs/vector/sdks/rag-chat/gettingstarted).

</details>

<details>
<summary>2. Using Upstash Vector UI</summary>

You can also manage your content directly through the Upstash Vector Console:

1. Navigate to [Upstash Console](http://console.upstash.com/vector).
2. Go to details page of the Vector database.
3. Navigate to **Databrowser Tab**.
4. Here, you can either upload a PDF, or use on of our sample datasets.

<img src="./public/images/vector-databrowser.png" alt="Vector Databrowser"/><br/>

</details>

## Contributing

We welcome contributions! Please see our contributing guidelines for more details.

## License

MIT License - see the LICENSE file for details.
