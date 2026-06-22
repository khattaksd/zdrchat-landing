# auth.md — ZDR Chat Agent Authentication

ZDR Chat is a **bring-your-own-key (BYOK)** chat application. There is no traditional user registration or OAuth flow. Users authenticate by providing their own OpenRouter API key directly in the browser.

## Agent Audience

This authentication model is designed for **agent-to-service** scenarios where an AI agent needs to make authenticated requests to OpenRouter's API on behalf of a user who already has an API key.

## Registration

Users obtain an API key from OpenRouter:

```
https://openrouter.ai/keys
```

There is no separate registration with ZDR Chat — the app has no accounts, no backend, and no user database.

## Supported Authentication Methods

| Method | Description |
|--------|-------------|
| `api_key` | Bearer token passed as `Authorization: Bearer <key>` header |
| `bearer_token` | API key used directly |

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

The API key is sent directly from the user's browser to OpenRouter. ZDR Chat never sees or stores the key.

## Resource Information

- **Service**: `https://zdr.chat`
- **API Catalog**: `https://zdr.chat/.well-known/api-catalog`
- **Documentation**: `https://zdr.chat/docs/`

## Revocation

Users can revoke or manage API keys at any time:

```
https://openrouter.ai/keys
```

## Privacy

ZDR Chat has zero data retention. Conversations and API keys stay in your browser. See [privacy policy](https://zdr.chat/privacy/).

---

*See [WorkOS auth.md spec](https://github.com/workos/auth.md) for the standard this follows.*