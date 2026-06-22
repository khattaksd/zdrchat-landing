import type { APIRoute } from 'astro';

/**
 * MCP Server Card (SEP-1649 draft)
 * Served at /.well-known/mcp/server-card.json
 *
 * Exposes the ZDR Chat MCP server capabilities for model context protocol.
 */
export const GET: APIRoute = async () => {
  const serverCard = {
    schema: 'https://modelcontextprotocol.io/schemas/server-card.json',
    serverInfo: {
      name: 'zdrchat',
      version: '0.0.1',
      description: 'ZDR Chat MCP server for accessing private AI chat capabilities',
    },
    transport: {
      type: 'http',
      endpoint: 'https://zdr.chat/mcp',
      protocols: ['http'],
    },
    capabilities: {
      tools: {
        listChanged: false,
      },
      resources: {
        subscribe: false,
        listChanged: false,
      },
      prompts: {
        listChanged: false,
      },
      logging: {},
    },
    documentation: 'https://zdr.chat/docs/',
    contact: {
      url: 'https://github.com/khattaksd/zdrchat',
    },
  };

  return new Response(JSON.stringify(serverCard, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};