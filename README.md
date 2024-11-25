# Upstash RAG Chat Widget

A customizable React chat widget built on top of the [@upstash/rag-chat SDK](), providing an out-of-the-box solution for adding RAG-powered chat interfaces to your applications.

<div style="display: flex; gap: 20px; margin: 20px 0; flex-wrap: wrap;">
  <div style="flex: 1; min-width: 300px;">
    <img 
      src="./public/images/widget-closed.png" 
      alt="RAG Chat Widget - Closed State" 
      style="border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
      width="300"
    />
    <p style="text-align: center; color: #666; margin-top: 8px; font-weight: 600; font-size: 20px;">Closed State</p>
  </div>
  <div style="flex: 1; min-width: 300px;">
    <img 
      src="./public/images/widget-open.png" 
      alt="RAG Chat Widget - Open State" 
      style="border: 1px solid #e5e7eb; border-radius: 8px; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);"
      width="300"
    />
    <p style="text-align: center; color: #666; margin-top: 8px; font-weight: 600; font-size: 20px;">Open State</p>
  </div>
</div>

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

Set up the environment variables below from your Upstash resources. If you don't have any, you can start by going to [Upstash Console](https://console.upstash.com)

### 2. Configure Styles

In your `tailwind.config.ts` file, add the configuration below:

```ts
import type { Config } from "tailwindcss";

export default {
  content: ["./node_modules/@upstash/ragchat-widget/**/*.css"],
} satisfies Config;
```

### 3. Implementation

```jsx
import { ChatWidget } from "ragchat-widget";

const Component = () => {
  return <ChatWidget />;
};
```

## Adding Content
