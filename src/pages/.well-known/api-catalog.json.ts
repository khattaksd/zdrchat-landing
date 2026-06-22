import type { APIRoute } from 'astro';

/**
 * API Catalog (RFC 9727)
 * Served at /.well-known/api-catalog
 *
 * Advertises the ZDR Chat API resources for automated agent discovery.
 */
export const GET: APIRoute = async () => {
  const catalog = {
    linkset: [
      {
        anchor: 'https://zdr.chat',
        rel: {
          'service-desc': [
            { href: 'https://app.zdr.chat', type: 'application/openapi+json' },
          ],
          'service-doc': [
            { href: 'https://zdr.chat/docs/', type: 'text/html' },
          ],
          'auth-md': [
            { href: 'https://zdr.chat/auth.md', type: 'text/markdown' },
          ],
          describedby: [
            { href: 'https://zdr.chat/', type: 'text/html' },
          ],
        },
      },
    ],
  };

  return new Response(JSON.stringify(catalog, null, 2), {
    status: 200,
    headers: {
      'Content-Type': 'application/linkset+json',
      'Access-Control-Allow-Origin': '*',
    },
  });
};