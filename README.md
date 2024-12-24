# RAG Chat Widget

A customizable React chat widget built on top of the [@upstash/rag-chat](https://github.com/upstash/rag-chat) SDK, providing an out-of-the-box solution for adding RAG-powered chat interfaces to your applications.

<table>
  <tr>
    <td align="center">
      <img src="./public/images/widget-closed.png" alt="RAG Chat Widget - Closed State" width="300"/><br/>
      <em>Closed State</em>
    </td>
    <td align="center">
      <img src="./public/images/widget-open.png" alt="RAG Chat Widget - Open State" width="300"/><br/>
      <em>Open State</em>
    </td>
  </tr>
</table>

## Features

🎨 Fully customizable UI components

⚡ Streaming responses support

📱 Responsive design

🔍 Real-time context retrieval

💾 Persistent chat history

🎯 Built-in rate limiting support

🔄 Loading states and error handling

🎨 Dark/light mode support

## Installation

```bash
# Using npm
npm install @upstash/rag-chat-widget

# Using pnpm
pnpm add @upstash/rag-chat-widget

# Using yarn
yarn add @upstash/rag-chat-widget
```

## Quick Start

### 1. Environment Variables

Set up the environment variables below from your Upstash resources. If you don't have any, you can start by going to [Upstash Console](https://console.upstash.com).

```
UPSTASH_VECTOR_REST_URL=
UPSTASH_VECTOR_REST_TOKEN=

OPENAI_API_KEY=
```

### 2. Configure Styles

In your `tailwind.config.ts` file, add the configuration below:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./node_modules/@upstash/rag-chat-widget/**/*.{js,mjs}"],
} satisfies Config;
```

### 3. Implementation

The RAG Chat Widget can be integrated into your application using two straightforward approaches. Choose the method that best fits your project structure:

1. Using a Dedicated Component File (Recommended)

Create a seperate component file with the `use client` directive, then import and use it anywhere in your application.

```jsx
// components/widget.tsx
"use client";

import { ChatWidget } from "@upstash/rag-chat-widget";

export const Widget = () => {
  return <ChatWidget />;
};
```

```jsx
// page.tsx
import { Widget } from "./components/widget";

export default function Home() {
  return (
    <>
      <Widget />
      <p>Home</p>
    </>
  );
}
```

2. Direct Integration in Client Components

Alternatively, import and use the **ChatWidget** directly in your client-side pages.

```jsx
// page.tsx
"use client";
import { ChatWidget } from "@upstash/rag-chat-widget";

export default function Home() {
  return (
    <>
      <ChatWidget />
      <p>Home</p>
    </>
  );
}
```

## Adding Content

You can add content to your RAG Chat widget in several ways:

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
