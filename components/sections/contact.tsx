"use client";

import emailjs from "@emailjs/browser";
import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Check, Copy, LoaderCircle, Mail, MapPin, Send } from "lucide-react";
import { useState } from "react";
import { emailjsConfig, profile } from "@/lib/data";
import { cn, ease } from "@/lib/utils";
import { GithubIcon, LinkedinIcon } from "../ui/icons";
import { Reveal } from "../ui/reveal";

type Status = "idle" | "sending" | "sent" | "error";

const fieldClass =
  "w-full rounded-xl border border-line-strong bg-bg px-4 py-3 text-[15px] text-fg outline-none transition-colors placeholder:text-faint focus:border-accent focus:ring-4 focus:ring-accent/10";
const labelClass = "mb-2 block text-sm font-medium text-fg-soft";

export function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    await navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    setStatus("sending");
    try {
      await emailjs.send(
        emailjsConfig.serviceId,
        emailjsConfig.templateId,
        {
          from_name: data.get("name"),
          from_email: data.get("email"),
          to_name: profile.name,
          to_email: profile.email,
          message: data.get("message"),
        },
        { publicKey: emailjsConfig.publicKey },
      );
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="px-6 py-20 sm:px-10 sm:py-28">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative grid overflow-hidden rounded-[2rem] panel-surface text-panel-fg shadow-[0_50px_100px_-50px_rgb(var(--shadow)/0.6)] lg:grid-cols-12">
          <div
            aria-hidden
            className="absolute -top-40 -left-24 size-[420px] rounded-full opacity-[0.12] blur-3xl"
            style={{ background: "var(--gold)" }}
          />

          <div className="relative flex flex-col p-8 sm:p-12 lg:col-span-5">
            <p className="inline-flex w-fit items-center gap-2 rounded-full border border-panel-line px-3 py-1 font-mono text-[11px] tracking-[0.16em] text-panel-muted uppercase">
              <span className="font-semibold text-gold">05</span>
              <span className="size-1 rounded-full bg-gold" />
              Contact
            </p>
            <h2 className="mt-6 font-serif text-5xl leading-[1.02] sm:text-6xl">
              Let&apos;s work <em className="text-gold">together.</em>
            </h2>
            <p className="mt-5 max-w-sm text-lg leading-relaxed text-panel-muted text-pretty">
              Hiring for a role, or have a product that needs building? I&apos;d love to hear about it.
            </p>

            <ul className="mt-10 space-y-3">
              <li className="flex items-center gap-3 rounded-2xl border border-panel-line bg-panel-2/60 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold text-panel">
                  <Mail className="size-[18px]" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-panel-muted">Email</span>
                  <a href={`mailto:${profile.email}`} className="block truncate text-[15px] hover:text-gold">
                    {profile.email}
                  </a>
                </span>
                <button
                  type="button"
                  onClick={copyEmail}
                  aria-label="Copy email address"
                  className="grid size-9 shrink-0 place-items-center rounded-lg text-panel-muted transition-colors hover:bg-panel hover:text-gold"
                >
                  {copied ? <Check className="size-4 text-gold" /> : <Copy className="size-4" />}
                </button>
              </li>
              <li className="flex items-center gap-3 rounded-2xl border border-panel-line bg-panel-2/60 p-4">
                <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-gold text-panel">
                  <MapPin className="size-[18px]" />
                </span>
                <span>
                  <span className="block text-xs text-panel-muted">Location</span>
                  <span className="block text-[15px]">{profile.location}</span>
                </span>
              </li>
            </ul>

            <div className="mt-8 flex flex-wrap gap-2 lg:mt-auto lg:pt-10">
              <SocialLink href={profile.github} icon={<GithubIcon className="size-4" />} label="GitHub" />
              {profile.linkedin && (
                <SocialLink href={profile.linkedin} icon={<LinkedinIcon className="size-4" />} label="LinkedIn" />
              )}
            </div>
          </div>

          <div className="relative p-3 sm:p-4 lg:col-span-7">
            <form onSubmit={onSubmit} className="h-full space-y-5 rounded-[1.6rem] bg-bg-elevated p-7 text-fg sm:p-10">
              <div>
                <h3 className="font-serif text-3xl">Send a message</h3>
                <p className="mt-1 text-sm text-muted">It goes straight to my inbox.</p>
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className={labelClass}>
                    Name
                  </label>
                  <input id="name" name="name" required placeholder="Your name" autoComplete="name" className={fieldClass} />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@company.com"
                    autoComplete="email"
                    className={fieldClass}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className={labelClass}>
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  placeholder="Tell me about the role or project…"
                  className={cn(fieldClass, "resize-none")}
                />
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-1">
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="group inline-flex h-12 items-center gap-2.5 rounded-full bg-accent px-7 text-sm font-medium text-accent-fg hover:bg-accent-hover transition-transform duration-300 hover:-translate-y-0.5 disabled:opacity-60"
                >
                  {status === "sending" ? (
                    <>
                      Sending <LoaderCircle className="size-4 animate-spin" />
                    </>
                  ) : (
                    <>
                      Send message
                      <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
                    </>
                  )}
                </button>
                <AnimatePresence mode="wait">
                  {(status === "sent" || status === "error") && (
                    <motion.p
                      key={status}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.4, ease }}
                      role="status"
                      className={cn("text-sm", status === "sent" ? "text-accent" : "text-muted")}
                    >
                      {status === "sent" ? (
                        "Thank you — your message is on its way."
                      ) : (
                        <>
                          Something went wrong. Please email{" "}
                          <a href={`mailto:${profile.email}`} className="underline">
                            {profile.email}
                          </a>
                          .
                        </>
                      )}
                    </motion.p>
                  )}
                </AnimatePresence>
              </div>
            </form>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function SocialLink({ href, icon, label }: { href: string; icon: React.ReactNode; label: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex h-11 items-center gap-2.5 rounded-full border border-panel-line px-5 text-sm transition-colors hover:border-gold hover:text-gold"
    >
      {icon}
      {label}
      <ArrowUpRight className="size-3.5 opacity-60 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </a>
  );
}
