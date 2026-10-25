"use client";

import {
  Fragment,
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type KeyboardEvent,
} from "react";
import { ArrowUp, MessageSquareText, X } from "lucide-react";
import { siteConfig } from "@/lib/site-config";
import type { ChatMessage } from "@/lib/chat";

/**
 * Floating "Ask JAV" chat widget.
 *
 * Opens a themed panel above the page (bottom-right), sends messages to
 * /api/chat, and renders replies as paragraphs/bullets. Several answers
 * can stay open; Escape and the header button close it.
 */

const GREETING: ChatMessage = {
  role: "assistant",
  content:
    "Hi! I'm the assistant for JAV Digital Engineering Studio. I can explain the services, pricing, process, and projects — or help you get started. What would you like to know?",
};

const SUGGESTIONS = [
  "What do you build?",
  "How much does a project cost?",
  "How long does it take?",
  "I have an idea — where do I start?",
];

/** Minimal rich-text: paragraphs, "- " bullets, **bold**. */
function RichText({ text }: { text: string }) {
  const blocks = text.split(/\n+/).map((b) => b.trim()).filter(Boolean);

  function inline(block: string, key: number) {
    const parts = block.split(/\*\*(.+?)\*\*/g);
    return (
      <Fragment key={key}>
        {parts.map((part, i) =>
          i % 2 === 1 ? (
            <strong key={i} className="font-semibold text-fg">
              {part}
            </strong>
          ) : (
            <Fragment key={i}>{part}</Fragment>
          ),
        )}
      </Fragment>
    );
  }

  return (
    <>
      {blocks.map((block, i) =>
        block.startsWith("- ") ? (
          <p key={i} className="flex gap-1.5">
            <span aria-hidden="true" className="text-accent">
              •
            </span>
            <span>{inline(block.slice(2), i)}</span>
          </p>
        ) : (
          <p key={i}>{inline(block, i)}</p>
        ),
      )}
    </>
  );
}

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([GREETING]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(false);

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const openedRef = useRef(false);

  // Focus the input the first time the panel opens.
  useEffect(() => {
    if (open && !openedRef.current) {
      openedRef.current = true;
      inputRef.current?.focus();
    }
  }, [open]);

  // Keep the newest message in view.
  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, sending, open]);

  // Escape closes the panel.
  useEffect(() => {
    if (!open) return;
    function onKey(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  async function send(text: string) {
    const message = text.trim();
    if (!message || sending) return;

    setError(false);
    setInput("");
    const nextUser: ChatMessage = { role: "user", content: message };
    const history = [...messages, nextUser];
    setMessages([...history, { role: "assistant", content: "" }]);
    setSending(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message,
          history: history.slice(0, -1).slice(-12),
        }),
      });
      const data = (await res.json()) as { ok?: boolean; reply?: string };

      setMessages((current) => {
        const updated = [...current];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            data.ok && data.reply
              ? data.reply
              : "Sorry — something went wrong on my side. Please use the contact form at /contact or email " +
                siteConfig.email +
                ".",
        };
        return updated;
      });
      if (!data.ok) setError(true);
    } catch {
      setMessages((current) => {
        const updated = [...current];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "I couldn't reach the assistant — please check your connection and try again, or use the contact form at /contact.",
        };
        return updated;
      });
      setError(true);
    } finally {
      setSending(false);
    }
  }

  function onSubmit(event: FormEvent) {
    event.preventDefault();
    void send(input);
  }

  function onKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void send(input);
    }
  }

  const onlyGreeting = messages.length === 1;

  return (
    <>
      {/* Toggle button */}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls="jav-chat-panel"
        aria-label={open ? "Close chat assistant" : "Open chat assistant"}
        className="fixed bottom-5 right-5 z-[70] flex h-14 w-14 items-center justify-center rounded-full bg-fg text-white shadow-lg transition-colors duration-200 hover:bg-accent motion-reduce:transition-none sm:bottom-6 sm:right-6"
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageSquareText className="h-6 w-6" aria-hidden="true" />
        )}
      </button>

      {/* Panel */}
      <div
        id="jav-chat-panel"
        role="dialog"
        aria-label="Chat with the JAV Digital assistant"
        className={`fixed bottom-[88px] right-4 z-[70] flex w-[min(390px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-line bg-card shadow-2xl transition-all duration-200 motion-reduce:transition-none sm:right-6 ${
          open
            ? "pointer-events-auto translate-y-0 opacity-100"
            : "pointer-events-none translate-y-3 opacity-0"
        }`}
        style={{ height: "min(580px, calc(100dvh - 160px))" }}
      >
        {/* Header */}
        <div className="flex items-center justify-between gap-3 bg-fg px-4 py-3.5 text-white">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-xs font-bold tracking-wide">
              JAV
            </span>
            <div className="leading-tight">
              <p className="text-sm font-semibold">JAV Digital Assistant</p>
              <p className="text-[11px] text-white/70">
                Answers about services, pricing &amp; process
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close chat"
            className="rounded-full p-1.5 text-white/70 transition-colors hover:bg-white/10 hover:text-white motion-reduce:transition-none"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        {/* Messages */}
        <div
          ref={scrollRef}
          role="log"
          aria-live="polite"
          aria-relevant="additions"
          className="flex flex-1 flex-col gap-3 overflow-y-auto bg-base px-4 py-4"
        >
          {messages.map((msg, i) => {
            if (msg.content === "" && sending && i === messages.length - 1) {
              return (
                <div
                  key={i}
                  className="flex max-w-[85%] items-center gap-1.5 self-start rounded-2xl rounded-tl-md border border-line bg-card px-4 py-3"
                  aria-label="Assistant is typing"
                >
                  {[0, 150, 300].map((delay) => (
                    <span
                      key={delay}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-fg-3 motion-reduce:animate-none"
                      style={{ animationDelay: `${delay}ms` }}
                    />
                  ))}
                </div>
              );
            }

            const isUser = msg.role === "user";
            return (
              <div
                key={i}
                className={`max-w-[85%] whitespace-pre-line px-3.5 py-2.5 text-sm leading-relaxed ${
                  isUser
                    ? "self-end rounded-2xl rounded-br-md bg-fg text-white"
                    : "flex flex-col gap-1.5 self-start rounded-2xl rounded-tl-md border border-line bg-card text-fg-2"
                }`}
              >
                {isUser ? msg.content : <RichText text={msg.content} />}
              </div>
            );
          })}

          {error && (
            <p className="text-center text-xs text-fg-3">
              Tip: urgent or detailed requests are best sent via the contact
              form.
            </p>
          )}
        </div>

        {/* Suggestions */}
        {onlyGreeting && (
          <div className="flex flex-wrap gap-2 border-t border-line bg-card px-4 pt-3">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => void send(s)}
                className="rounded-full border border-line bg-base px-3 py-1.5 text-xs font-medium text-fg transition-colors hover:border-accent hover:text-accent motion-reduce:transition-none"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form onSubmit={onSubmit} className="flex items-center gap-2 border-t border-line bg-card px-3 py-3">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={onKeyDown}
            maxLength={1000}
            placeholder="Ask about services, pricing, timeline…"
            aria-label="Your message"
            className="min-w-0 flex-1 rounded-full border border-line bg-base px-4 py-2.5 text-sm text-fg placeholder:text-fg-3 focus:border-accent focus:outline-none"
          />
          <button
            type="submit"
            disabled={sending || input.trim().length === 0}
            aria-label="Send message"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-fg text-white transition-colors hover:bg-accent disabled:cursor-not-allowed disabled:opacity-40 motion-reduce:transition-none"
          >
            <ArrowUp className="h-4 w-4" aria-hidden="true" />
          </button>
        </form>
      </div>
    </>
  );
}
