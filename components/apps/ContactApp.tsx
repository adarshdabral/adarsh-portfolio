"use client";

import { useState, type FormEvent } from "react";
import { Mail, Send } from "lucide-react";

import Ash from "@/components/os/Ash";
import socialLinks from "@/content/social-links.json";
import { SOCIAL_ICONS } from "@/lib/social-icons";
import type { SocialLinksContent } from "@/lib/content-types";

const { links: allLinks, email } = socialLinks as SocialLinksContent;
const links = allLinks.filter((link) => link.visible !== false);

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactApp() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      message: String(data.get("message") ?? ""),
    };

    setStatus("submitting");
    setErrorMessage(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) {
        throw new Error(json.error ?? "Something went wrong.");
      }
      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setErrorMessage(err instanceof Error ? err.message : "Something went wrong.");
    }
  }

  if (status === "success") {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 p-6 text-center">
        <Ash size={64} pose="excited" />
        <p className="text-sm font-medium text-neutral-800 dark:text-neutral-100">
          Message sent — thanks for reaching out!
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="text-xs text-blue-600 underline underline-offset-2"
        >
          Send another
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-auto p-5">
      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label htmlFor="contact-name" className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-300">
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            required
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="contact-email" className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-300">
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            className="w-full rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>
        <div>
          <label htmlFor="contact-message" className="mb-1 block text-xs font-medium text-neutral-600 dark:text-neutral-300">
            Message
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            className="w-full resize-none rounded-md border border-neutral-300 bg-white px-3 py-1.5 text-sm text-neutral-800 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100"
          />
        </div>

        {status === "error" && (
          <p className="text-xs text-red-500">{errorMessage}</p>
        )}

        <button
          type="submit"
          disabled={status === "submitting"}
          className="flex w-full items-center justify-center gap-1.5 rounded-md bg-blue-600 px-3 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-60"
        >
          <Send className="h-3.5 w-3.5" />
          {status === "submitting" ? "Sending..." : "Send message"}
        </button>
      </form>

      <div className="mt-5 border-t border-neutral-200 pt-4 dark:border-neutral-800">
        <a
          href={`mailto:${email}`}
          className="flex items-center gap-1.5 text-xs text-neutral-500 hover:text-blue-600"
        >
          <Mail className="h-3.5 w-3.5" />
          {email}
        </a>
        <div className="mt-3 flex gap-3">
          {links.map((link) => {
            const Icon = SOCIAL_ICONS[link.icon];
            return (
              <a
                key={link.id}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={link.label}
                className="transition hover:scale-110"
              >
                <Icon className="h-6 w-6" />
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}
