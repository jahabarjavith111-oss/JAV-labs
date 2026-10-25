import {
  buildSystemPrompt,
  scriptedAnswer,
  CHAT_DEFAULT_MODEL,
  CHAT_MAX_HISTORY,
  CHAT_MAX_HISTORY_LENGTH,
  CHAT_MAX_MESSAGE_LENGTH,
  type ChatMessage,
} from "@/lib/chat";

/**
 * Site chat endpoint ("Ask JAV").
 *
 * Calls Groq (OpenAI-compatible API) with the server-side GROQ_API_KEY —
 * the key never reaches the browser. The model is grounded in the real
 * site content via the system prompt in lib/chat.ts, with the site's
 * honesty rules baked in.
 *
 * Behavior:
 *  - validates input server-side (lengths, roles, history cap)
 *  - best-effort per-IP rate limiting (in-memory; resets on cold starts)
 *  - no GROQ_API_KEY configured → answers from the scripted brain, so the
 *    chat still works honestly instead of erroring
 *  - provider failure → falls back to the scripted answer as well
 */

const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 8;

/** Best-effort in-memory rate limit: sliding window per client IP. */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  // Keep the map small on long-lived instances.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function sanitizeHistory(value: unknown): ChatMessage[] {
  if (!Array.isArray(value)) return [];
  return value
    .filter((item): item is ChatMessage => {
      if (!item || typeof item !== "object") return false;
      const role = (item as { role?: unknown }).role;
      return role === "user" || role === "assistant";
    })
    .map((item) => ({
      role: item.role,
      content: String(item.content ?? "").slice(0, CHAT_MAX_HISTORY_LENGTH),
    }))
    .filter((item) => item.content.trim().length > 0)
    .slice(-CHAT_MAX_HISTORY);
}

export async function POST(request: Request) {
  let message = "";
  let history: ChatMessage[] = [];

  try {
    const body = (await request.json()) as {
      message?: unknown;
      history?: unknown;
    };
    message = String(body.message ?? "").trim().slice(0, CHAT_MAX_MESSAGE_LENGTH);
    history = sanitizeHistory(body.history);
  } catch {
    return Response.json({ ok: false }, { status: 400 });
  }

  if (message.length === 0) {
    return Response.json({ ok: false }, { status: 400 });
  }

  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      { ok: false, error: "Too many messages — please pause for a moment." },
      { status: 429 },
    );
  }

  const apiKey = process.env.GROQ_API_KEY;

  // No key configured → scripted assistant (honest, zero cost).
  if (!apiKey) {
    return Response.json({ ok: true, reply: scriptedAnswer(message) });
  }

  try {
    const response = await fetch(GROQ_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: process.env.GROQ_MODEL ?? CHAT_DEFAULT_MODEL,
        temperature: 0.4,
        max_tokens: 600,
        messages: [
          { role: "system", content: buildSystemPrompt() },
          ...history,
          { role: "user", content: message },
        ],
      }),
      signal: AbortSignal.timeout(20_000),
    });

    if (!response.ok) throw new Error(`Groq responded ${response.status}`);

    const data = (await response.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) throw new Error("Empty reply from provider");

    return Response.json({ ok: true, reply });
  } catch {
    // Provider failed → still answer from the scripted brain.
    return Response.json({ ok: true, reply: scriptedAnswer(message) });
  }
}
