import type { APIRoute } from 'astro';

/**
 * Agent Skills Discovery Index (Agent Skills Discovery RFC v0.2.0)
 * Served at /.well-known/agent-skills/index.json
 *
 * Lists all agent skills supported by this site for AI agent discovery.
 */
export const GET: APIRoute = async () => {
  const index = {
    $schema: 'https://agentskills.io/schemas/index.json',
    site: 'https://zdr.chat',
    description: 'ZDR Chat - Private AI Chat Platform',
    skills: [
      {
        name: 'link-headers',
        type: 'well-known',
        description: 'RFC 8288 Link headers for agent resource discovery',
        url: 'https://zdr.chat/.well-known/api-catalog',
        sha256: 'not-applicable-dynamic-endpoint',
      },
      {
        name: 'api-catalog',
        type: 'well-known',
        description: 'API catalog for automated API discovery (RFC 9727)',
        url: 'https://zdr.chat/.well-known/api-catalog',
        sha256: 'not-applicable-dynamic-endpoint',
      },
      {
        name: 'auth-md',
        type: 'well-known',
        description: 'Agent registration and authentication instructions',
        url: 'https://zdr.chat/auth.md',
        sha256: 'not-applicable-dynamic-endpoint',
      },
      {
        name: 'mcp-server-card',
        type: 'well-known',
        description: 'MCP server card for model context protocol discovery',
        url: 'https://zdr.chat/.well-known/mcp/server-card.json',
        sha256: 'not-applicable-dynamic-endpoint',
      },
      {
        name: 'markdown-negotiation',
        type: 'content-negotiation',
        description: 'Markdown content negotiation via Accept: text/markdown',
        url: 'https://zdr.chat/',
        sha256: 'not-applicable-dynamic-endpoint',
      },
      {
        name: 'content-signals',
        type: 'robots-txt',
        description: 'Content Signal directives in robots.txt for AI training preferences',
        url: 'https://zdr.chat/robots.txt',
        sha256: 'not-applicable-dynamic-endpoint',
      },
      {
        name: 'dns-aid',
        type: 'dns',
        description: 'DNS for AI Discovery records',
        url: 'https://zdr.chat/.well-known/agent-skills/dns-aid',
        sha256: 'not-applicable-dynamic-endpoint',
      },
    ],
  };

  return new Response(JSON.stringify(index, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};