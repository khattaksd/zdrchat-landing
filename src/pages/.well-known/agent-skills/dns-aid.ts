import type { APIRoute } from 'astro';

/**
 * DNS-AID (DNS for AI Discovery) Overview
 * Served at /.well-known/agent-skills/dns-aid
 *
 * Documents the DNS-AID records that should be configured for
 * DNS-based agent discovery (draft-mozleywilliams-dnsop-dnsaid).
 */
export const GET: APIRoute = async () => {
  const body = `# DNS for AI Discovery (DNS-AID)

## Overview

DNS-AID enables AI agents to discover services via DNS records.
The following records should be configured in the zdr.chat DNS zone.

## Required Records

### Agent Service Discovery (SVCB/HTTPS)

\`\`\`
_index._agents.zdr.chat.   IN SVCB 1 . alpn="h2" endpoint="zdr.chat"
_a2a._agents.zdr.chat.     IN SVCB 1 . alpn="h2" endpoint="zdr.chat"
\`\`\`

### Service Parameters

- **Service**: \`_agents\`
- **Protocol**: \`_index\` (general discovery) and \`_a2a\` (agent-to-agent)
- **Priority**: 1 (highest)
- **Target**: \`.\` (alias at the zone apex)
- **Params**: \`alpn="h2"\`, \`endpoint="zdr.chat"\`

## DNSSEC

Ensure the \`zdr.chat\` zone is signed with DNSSEC so that
validating resolvers return authenticated data.

## Verification

\`\`\`bash
dig _index._agents.zdr.chat SVCB +short
# Expected: 1 . alpn="h2" endpoint="zdr.chat"

dig _a2a._agents.zdr.chat SVCB +short
# Expected: 1 . alpn="h2" endpoint="zdr.chat"
\`\`\`

## References

- https://datatracker.ietf.org/doc/draft-mozleywilliams-dnsop-dnsaid/
- https://www.rfc-editor.org/rfc/rfc9460 (SVCB/HTTPS)
`;

  return new Response(body, {
    status: 200,
    headers: {
      'Content-Type': 'text/markdown',
      'Access-Control-Allow-Origin': '*',
    },
  });
};