"use client";

import { motion } from "motion/react";
import { Bot, FileText, Sparkles, Wrench } from "lucide-react";
import { ease } from "@/lib/utils";

const appear = (delay: number) => ({
  initial: { opacity: 0, y: 10 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.7, ease, delay },
});

function Window({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex h-full w-full flex-col overflow-hidden rounded-xl border border-line bg-bg shadow-[0_30px_60px_-30px_rgb(var(--shadow)/0.35)]">
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="size-2 rounded-full bg-line-strong" />
        <span className="mx-auto font-mono text-[10px] text-faint">{title}</span>
      </div>
      <div className="relative flex-1">{children}</div>
    </div>
  );
}

/* ——— SALMA: AI assistant chat with tool calls and retrieved sources ——— */
export function SalmaVisual() {
  return (
    <Window title="salma.assistant">
      <div className="flex h-full flex-col gap-3 p-4 text-[12px] sm:p-5 sm:text-[13px]">
        <motion.div {...appear(0.1)} className="ml-auto max-w-[80%] rounded-2xl rounded-br-md bg-accent px-4 py-2.5 text-accent-fg">
          Raise a high-priority bug for the checkout timeout and link any related incidents.
        </motion.div>

        <motion.div {...appear(0.5)} className="flex flex-wrap items-center gap-2 text-muted">
          <span className="grid size-6 place-items-center rounded-full bg-accent-soft text-accent">
            <Bot className="size-3.5" />
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px]">
            <Wrench className="size-3" /> jira.create_issue
          </span>
          <span className="inline-flex items-center gap-1.5 rounded-full border border-line px-2.5 py-1 font-mono text-[10.5px]">
            <Wrench className="size-3" /> servicenow.search
          </span>
        </motion.div>

        <motion.div {...appear(0.9)} className="max-w-[88%] rounded-2xl rounded-bl-md border border-line bg-bg-elevated px-4 py-3 leading-relaxed text-fg-soft">
          Created <span className="font-medium text-fg">PAY-1284</span> with priority{" "}
          <span className="rounded bg-accent-soft px-1.5 py-0.5 text-accent">High</span> and linked 2 related incidents
          from ServiceNow.
          <div className="mt-3 flex flex-wrap gap-1.5">
            {["Runbook: Payments", "INC-20931", "INC-20977"].map((s) => (
              <span key={s} className="inline-flex items-center gap-1 rounded-md bg-surface px-2 py-1 text-[10.5px] text-muted">
                <FileText className="size-3" /> {s}
              </span>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...appear(1.3)}
          className="mt-auto flex items-center gap-2 rounded-xl border border-line bg-bg-elevated px-3 py-2.5 text-faint"
        >
          <Sparkles className="size-3.5 text-accent" />
          Ask SALMA anything about your tickets…
        </motion.div>
      </div>
    </Window>
  );
}

/* ——— Invoice platform: admin dashboard with bulk generation ——— */
const invoiceRows = [
  { id: "INV-24081", client: "Northwind Ltd.", amount: "₹1,82,400", status: "Paid" },
  { id: "INV-24082", client: "Acme Retail", amount: "₹64,150", status: "Pending" },
  { id: "INV-24083", client: "Globex Corp.", amount: "₹2,10,000", status: "Paid" },
  { id: "INV-24084", client: "Initech", amount: "₹38,920", status: "Draft" },
];
const bars = [38, 52, 44, 68, 60, 82, 74, 90, 70, 96, 88, 100];

export function InvoiceVisual() {
  return (
    <Window title="invoices / dashboard">
      <div className="space-y-4 p-4 text-[12px] sm:p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-faint uppercase">Overview</p>
            <p className="mt-0.5 text-sm font-medium">Invoices</p>
          </div>
          <span className="rounded-full bg-accent px-3 py-1.5 text-[11px] text-accent-fg">Generate bulk</span>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            ["Generated", "1,248"],
            ["Pending", "32"],
            ["Collected", "96%"],
          ].map(([k, v]) => (
            <div key={k} className="rounded-lg border border-line bg-bg-elevated p-2.5">
              <p className="text-[10px] text-faint">{k}</p>
              <p className="mt-1 font-serif text-xl leading-none">{v}</p>
            </div>
          ))}
        </div>

        <div className="flex h-16 items-end gap-1.5 rounded-lg border border-line bg-bg-elevated p-2.5">
          {bars.map((h, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease, delay: 0.2 + i * 0.04 }}
              style={{ height: `${h}%` }}
              className={`flex-1 origin-bottom rounded-sm ${i === bars.length - 1 ? "bg-accent" : "bg-line-strong"}`}
            />
          ))}
        </div>

        <div className="rounded-lg border border-line">
          {invoiceRows.map((row, i) => (
            <motion.div
              key={row.id}
              {...appear(0.3 + i * 0.08)}
              className="flex items-center gap-3 border-b border-line px-3 py-2 last:border-0"
            >
              <span className="font-mono text-[10.5px] text-faint">{row.id}</span>
              <span className="flex-1 truncate text-fg-soft">{row.client}</span>
              <span className="hidden text-fg-soft sm:block">{row.amount}</span>
              <span
                className={`rounded-full px-2 py-0.5 text-[10px] ${
                  row.status === "Paid"
                    ? "bg-accent-soft text-accent"
                    : row.status === "Pending"
                      ? "bg-surface-strong text-fg-soft"
                      : "border border-line text-faint"
                }`}
              >
                {row.status}
              </span>
            </motion.div>
          ))}
        </div>

        <div>
          <div className="mb-1.5 flex justify-between text-[10.5px] text-faint">
            <span>Bulk run · 248 invoices</span>
            <span className="text-accent">Complete</span>
          </div>
          <div className="h-1.5 overflow-hidden rounded-full bg-surface-strong">
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.2, ease, delay: 0.4 }}
              className="h-full origin-left rounded-full bg-accent"
            />
          </div>
        </div>
      </div>
    </Window>
  );
}

/* ——— OPWI: semiconductor wafer defect map ——— */
// Integer hash so server and browser always agree (no float drift across engines).
function hash(x: number, y: number) {
  let h = Math.imul(x + 1000, 374761393) ^ Math.imul(y + 1000, 668265263);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967296;
}

const WAFER = 260;
const R = 118;
const DIE = 13;
const dies = (() => {
  const out: { x: number; y: number; state: 0 | 1 | 2 }[] = [];
  const c = WAFER / 2;
  for (let gy = -R; gy < R; gy += DIE) {
    for (let gx = -R; gx < R; gx += DIE) {
      const corners = [
        [gx, gy],
        [gx + DIE, gy],
        [gx, gy + DIE],
        [gx + DIE, gy + DIE],
      ];
      if (!corners.every(([px, py]) => px * px + py * py <= R * R)) continue;
      const h = hash(gx, gy);
      // A defect cluster near the lower-right edge, plus sparse random defects.
      const dist2 = (gx - 55) ** 2 + (gy - 50) ** 2;
      const state: 0 | 1 | 2 = dist2 < 34 * 34 && h < 0.7 ? 2 : h < 0.06 ? 2 : h < 0.14 ? 1 : 0;
      out.push({ x: c + gx + 1, y: c + gy + 1, state });
    }
  }
  return out;
})();
const defectCount = dies.filter((d) => d.state === 2).length;
const yieldPct = (((dies.length - defectCount) / dies.length) * 100).toFixed(1);

export function OpwiVisual() {
  return (
    <Window title="opwi / wafer-map">
      <div className="grid h-full gap-4 p-4 sm:grid-cols-[1fr_auto] sm:p-5">
        <div className="relative mx-auto aspect-square w-full max-w-[280px]">
          <svg viewBox={`0 0 ${WAFER} ${WAFER}`} className="h-full w-full">
            <circle cx={WAFER / 2} cy={WAFER / 2} r={R + 6} fill="var(--surface)" stroke="var(--line-strong)" />
            {dies.map((d, i) => (
              <motion.rect
                key={i}
                x={d.x}
                y={d.y}
                width={DIE - 2}
                height={DIE - 2}
                rx={1.5}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 + (d.y / WAFER) * 0.9 }}
                fill={d.state === 2 ? "var(--accent)" : d.state === 1 ? "var(--faint)" : "var(--bg-elevated)"}
                stroke="var(--line)"
                strokeWidth={0.5}
              />
            ))}
            <path
              d={`M ${WAFER / 2 - 8} ${WAFER / 2 + R + 6} l 8 -7 l 8 7`}
              fill="var(--bg)"
              stroke="var(--line-strong)"
            />
          </svg>
          <motion.div
            aria-hidden
            initial={{ top: "8%" }}
            whileInView={{ top: ["8%", "90%", "8%"] }}
            viewport={{ once: false }}
            transition={{ duration: 6, ease: "easeInOut", repeat: Infinity }}
            className="absolute inset-x-[6%] h-px bg-accent/70 shadow-[0_0_14px_2px_var(--accent)]"
          />
        </div>

        <div className="flex flex-row flex-wrap gap-3 text-[11px] sm:w-36 sm:flex-col">
          <div className="rounded-lg border border-line bg-bg-elevated p-3">
            <p className="text-faint">Yield</p>
            <p className="mt-1 font-serif text-2xl leading-none">{yieldPct}%</p>
          </div>
          <div className="rounded-lg border border-line bg-bg-elevated p-3">
            <p className="text-faint">Dies inspected</p>
            <p className="mt-1 font-serif text-2xl leading-none">{dies.length}</p>
          </div>
          <div className="space-y-1.5 rounded-lg border border-line bg-bg-elevated p-3 text-muted">
            <p className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm bg-accent" /> Defect
            </p>
            <p className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm bg-faint" /> Review
            </p>
            <p className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm border border-line bg-bg-elevated" /> Pass
            </p>
          </div>
        </div>
      </div>
    </Window>
  );
}
