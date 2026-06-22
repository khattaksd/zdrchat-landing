# ZDR Chat — Agent Authentication

## Overview

ZDR Chat is a bring-your-own-key (BYOK) chat application. There is no traditional user registration or OAuth flow — users authenticate by providing their own OpenRouter API key.

## Authentication for Agents

### Identity Types Supported

- `api_key` — Users provide an OpenRouter API key

### Credential Types Supported

- `bearer_token` — API key passed as `Authorization: Bearer <key>` header

### Registering

To use ZDR Chat, get an API key from OpenRouter:

```
https://openrouter.ai/keys
```

### Making Authenticated Requests

```http
POST https://openrouter.ai/api/v1/chat/completions
Authorization: Bearer <your-openrouter-api-key>
Content-Type: application/json

{
  "model": "openai/gpt-4o",
  "messages": [{"role": "user", "content": "Hello"}]
}
```

### Resource Information

- **Issuer**: `https://zdr.chat`
- **Authorization Server**: `https://zdr.chat/.well-known/oauth-authorization-server`
- **Protected Resource Metadata**: `https://zdr.chat/.well-known/oauth-protected-resource`
- **API Catalog**: `https://zdr.chat/.well-known/api-catalog`

### Revocation

Revoke or manage your API keys at:

```
https://openrouter.ai/keys
```

### Privacy

ZDR Chat has zero data retention. Conversations and API keys stay in your browser. See [privacy policy](https://zdr.chat/privacy/).

---

*See [WorkOS auth.md spec](https://github.com/workos/auth.md) for the standard this follows.*