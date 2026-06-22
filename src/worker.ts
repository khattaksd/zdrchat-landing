/**
 * ZDR Chat Landing — Agent Readiness Worker
 *
 * Custom Cloudflare Worker that:
 * 1. Serves static assets from the ASSETS binding (pre-built by Astro)
 * 2. Handles Markdown content negotiation (Accept: text/markdown)
 * 3. Adds Link response headers for agent discovery (RFC 8288)
 */
const AGENT_LINKS = [
  '</.well-known/api-catalog>; rel="api-catalog"',
  '</.well-known/mcp/server-card.json>; rel="mcp-server-card"',
  '</.well-known/agent-skills/index.json>; rel="agent-skills"',
  '</auth.md>; rel="auth-md"',
  '</docs/>; rel="service-doc"',
  '</privacy/>; rel="privacy-policy"',
].join(', ');

const MARKDOWN_RESPONSES = new Map([
  [
    '/',
    `# ZDR Chat — Private AI, Your Keys, Zero Servers

Serverless, BYOK chat app powered by OpenRouter. No accounts, no logs, no backend. Pay OpenRouter directly — no subscription, no data mining.

## Why ZDR Chat?

Privacy-first by design. No compromises.

### Bring Your Own Key
Paste your OpenRouter API key. It's stored in your browser only. Never sent anywhere except directly to OpenRouter. We never see it.

### Pay-as-You-Go, No Subscription
No monthly bills. Add as little as $1 to OpenRouter and it lasts until you spend it. The status bar tracks every cent.

### Zero Servers
No backend. No accounts. No sign-up. The entire app runs in your browser as a static PWA. Hosting costs us ~$0/month.

### Zero Data Retention
Every message and setting stays in your browser's IndexedDB. We don't store your conversations — we can't; there's nowhere to put them.

## Pricing
ZDR Chat is free to use. You only pay for the AI models you use through OpenRouter. No markup, no subscription fees.

## How It Works
1. Get an API key from OpenRouter
2. Paste it into ZDR Chat (stored locally in your browser)
3. Start chatting with 300+ AI models

## Ready to chat privately?
No sign-up, no data collection, no servers. Just you and 300+ models.

→ Launch ZDR Chat: https://app.zdr.chat
→ Documentation: https://zdr.chat/docs/
→ Privacy: https://zdr.chat/privacy/
→ Blog: https://zdr.chat/blog/
`,
  ],
  [
    '/docs/',
    `# ZDR Chat Documentation

Learn how to use ZDR Chat — get started, understand privacy, explore features, and find answers.

## Getting Started
Learn how to set up ZDR Chat with your OpenRouter API key: https://zdr.chat/docs/getting-started

## Features
Explore all ZDR Chat features: https://zdr.chat/docs/features

## FAQ
Frequently asked questions: https://zdr.chat/docs/faq

## Privacy & Security
How ZDR Chat protects your data: https://zdr.chat/docs/privacy-and-security
`,
  ],
  [
    '/privacy/',
    `# Privacy & Data Handling — ZDR Chat

ZDR Chat is a zero-data-retention chat application. Your data stays in your browser — always.

## The ZDR Pledge
Zero Data Retention. Zero Compromise.

We collect nothing. We store nothing. We log nothing. Your conversation history lives in your browser's IndexedDB. Your API key is stored locally. We run no servers, maintain no databases, and have no backend — the entire app is a static PWA deployed to Cloudflare. When you close the tab, the connection to the world is gone.

## Where Your Data Lives
- **Conversations**: In your browser's IndexedDB
- **Your API Key**: In localStorage
- **Preferences**: In localStorage

## The Only Data Flow
There is exactly one network request in ZDR Chat: from your browser to OpenRouter. Nothing more.

## Third-Party Services
The only external service ZDR Chat connects to is OpenRouter. We use no analytics, no tracking scripts, no CDN fonts, and no external embeds.

→ Full privacy policy: https://zdr.chat/privacy/
`,
  ],
]);

const MARKDOWN_FALLBACK = `# ZDR Chat

Private, serverless AI chat. Bring your own key, zero data retention.

→ Home: https://zdr.chat/
→ Docs: https://zdr.chat/docs/
→ Blog: https://zdr.chat/blog/
→ Privacy: https://zdr.chat/privacy/
→ Launch App: https://app.zdr.chat
`;

export default {
  async fetch(request, env, context) {
    const url = new URL(request.url);
    const accept = request.headers.get('Accept') || '';
    const path = url.pathname.replace(/\/+$/, '') || '/';

    // ── Markdown for Agents (Accept: text/markdown) ──────────────────
    if (accept.includes('text/markdown') && !accept.includes('text/html')) {
      const mdContent = MARKDOWN_RESPONSES.get(path);
      if (mdContent) {
        return new Response(mdContent, {
          status: 200,
          headers: {
            'Content-Type': 'text/markdown',
            'Link': AGENT_LINKS,
            'Access-Control-Allow-Origin': '*',
          },
        });
      }

      // Return 404 markdown for unknown paths
      return new Response(MARKDOWN_FALLBACK, {
        status: 404,
        headers: {
          'Content-Type': 'text/markdown',
          'Link': AGENT_LINKS,
          'Access-Control-Allow-Origin': '*',
        },
      });
    }

    // ── Serve static assets with Link headers ────────────────────────
    try {
      const response = await env.ASSETS.fetch(request);

      // Add Link response headers for agent discovery (RFC 8288)
      const existingLink = response.headers.get('Link');
      const linkHeader = existingLink
        ? `${existingLink}, ${AGENT_LINKS}`
        : AGENT_LINKS;

      const newHeaders = new Headers(response.headers);
      newHeaders.set('Link', linkHeader);

      return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders,
      });
    } catch {
      return new Response('Not found', {
        status: 404,
        headers: { 'Link': AGENT_LINKS },
      });
    }
  },
};