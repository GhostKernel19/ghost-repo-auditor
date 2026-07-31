import Link from 'next/link';
import { Ghost, ShieldAlert, ClipboardPaste, DatabaseZap, Share2, ArrowRight, Sparkles } from 'lucide-react';

const GITHUB_URL = "https://github.com/GhostKernel19/ghost-repo-auditor";
const LINKEDIN_URL = "https://www.linkedin.com/in/aryan-s-2081b3376";
const INSTAGRAM_URL = "https://www.instagram.com/aryan_5190_19";
const AUTHOR_NAME = "Aryan Sawant";

function GithubIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.21 11.39.6.11.82-.26.82-.58 0-.28-.01-1.04-.02-2.05-3.34.73-4.04-1.61-4.04-1.61-.55-1.39-1.34-1.76-1.34-1.76-1.09-.75.08-.73.08-.73 1.21.09 1.84 1.24 1.84 1.24 1.07 1.84 2.81 1.31 3.5 1 .11-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.95 0-1.31.47-2.39 1.24-3.23-.12-.31-.54-1.53.12-3.19 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 3-.4c1.02 0 2.05.14 3 .4 2.29-1.55 3.3-1.23 3.3-1.23.66 1.66.24 2.88.12 3.19.77.84 1.24 1.92 1.24 3.23 0 4.62-2.81 5.64-5.49 5.94.43.37.81 1.1.81 2.22 0 1.61-.01 2.9-.01 3.29 0 .32.21.7.82.58A12.01 12.01 0 0 0 24 12.5C24 5.87 18.63.5 12 .5z" />
    </svg>
  );
}
function LinkedinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.68h-3.56V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.38-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.07 2.07 0 1 1 0-4.13 2.07 2.07 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  );
}

function InstagramIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.24 2.22.41.56.21.96.47 1.38.89.42.42.68.82.89 1.38.17.42.36 1.05.41 2.22.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.24 1.8-.41 2.22-.21.56-.47.96-.89 1.38-.42.42-.82.68-1.38.89-.42.17-1.05.36-2.22.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.24-2.22-.41-.56-.21-.96-.47-1.38-.89-.42-.42-.68-.82-.89-1.38-.17-.42-.36-1.05-.41-2.22-.06-1.27-.07-1.65-.07-4.85s.01-3.58.07-4.85c.05-1.17.24-1.8.41-2.22.21-.56.47-.96.89-1.38.42-.42.82-.68 1.38-.89.42-.17 1.05-.36 2.22-.41 1.27-.06 1.65-.07 4.85-.07zM12 0C8.74 0 8.33.01 7.05.07c-1.28.06-2.15.26-2.91.56-.79.31-1.46.72-2.13 1.39C1.35 2.68.94 3.35.63 4.14c-.3.76-.5 1.63-.56 2.91C.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.28.26 2.15.56 2.91.31.79.72 1.46 1.39 2.13.67.67 1.34 1.08 2.13 1.39.76.3 1.63.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.28-.06 2.15-.26 2.91-.56.79-.31 1.46-.72 2.13-1.39.67-.67 1.08-1.34 1.39-2.13.3-.76.5-1.63.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.28-.26-2.15-.56-2.91-.31-.79-.72-1.46-1.39-2.13C21.32 1.35 20.65.94 19.86.63c-.76-.3-1.63-.5-2.91-.56C15.67.01 15.26 0 12 0zm0 5.84A6.16 6.16 0 1 0 12 18.16 6.16 6.16 0 0 0 12 5.84zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-10.85a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0z" />
    </svg>
  );
}

const steps = [
  { icon: ClipboardPaste, step: '01', title: 'Paste your package.json', description: 'Drop in your dependency manifest. No install, no signup — just your dependency list.' },
  { icon: DatabaseZap, step: '02', title: 'We check the real databases', description: 'Every package is cross-referenced against OSV.dev for known vulnerabilities and npm registry data to surface stale, abandoned, or unmaintained dependencies.' },
  { icon: Share2, step: '03', title: 'See your risk graph', description: 'Results render as an interactive graph so you can trace exactly which ghosts are haunting your tree and how severe they are.' }
];

export default function Page() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-primary/15 blur-[120px]" />
        <div className="absolute top-1/3 -right-40 h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-[120px]" />
      </div>

      <div className="relative">
        <SiteHeader />
        <main>
          <Hero />
          <HowItWorks />
          <WhyIBuilt />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}

function SiteHeader() {
  return (
    <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
      <Link href="/" className="flex items-center gap-2">
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
          <Ghost className="h-4 w-4 text-primary" />
        </span>
        <span className="text-sm font-semibold tracking-tight">Ghost Repo Auditor</span>
      </Link>
      <div className="flex items-center gap-2">
        <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="hidden items-center gap-1.5 rounded-lg px-3 py-1.5 text-sm text-muted-foreground hover:text-foreground sm:inline-flex">
          <GithubIcon className="h-4 w-4" />
          GitHub
        </a>
        <Link href="/audit" className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-sm font-medium text-primary-foreground hover:opacity-90">
          Launch Tool
        </Link>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-20 pt-16 md:pt-24">
      <div className="mx-auto max-w-3xl text-center">
        <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-card/50 px-3 py-1 text-xs font-medium text-muted-foreground backdrop-blur">
          <span className="flex h-1.5 w-1.5 rounded-full bg-primary" />
          Powered by OSV.dev + npm registry data
        </div>
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Find the ghosts hiding in your dependencies
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Ghost Repo Auditor scans your <code className="rounded bg-muted px-1.5 py-0.5 font-mono text-sm text-foreground">package.json</code>, flags known vulnerabilities and abandoned packages, and maps your real security risk in an interactive graph.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link href="/audit" className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 sm:w-auto">
            Launch Audit Tool
            <ArrowRight className="h-4 w-4" />
          </Link>
          <a href="#how-it-works" className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-border px-6 py-3 text-sm font-medium hover:bg-muted sm:w-auto">
            See how it works
          </a>
        </div>
      </div>

      <RiskGraphPreview />
    </section>
  );
}

function RiskGraphPreview() {
  const nodes = [
    { cx: 300, cy: 150, r: 26, level: 'core' },
    { cx: 150, cy: 80, r: 16, level: 'safe' },
    { cx: 470, cy: 90, r: 18, level: 'stale' },
    { cx: 110, cy: 210, r: 14, level: 'safe' },
    { cx: 480, cy: 220, r: 20, level: 'vuln' },
    { cx: 300, cy: 270, r: 15, level: 'safe' },
    { cx: 210, cy: 250, r: 12, level: 'stale' },
    { cx: 390, cy: 250, r: 13, level: 'safe' }
  ];
  const edges = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [0, 7], [2, 4]];
  const color = (level) =>
    level === 'vuln' ? 'var(--color-primary)' :
    level === 'stale' ? 'var(--color-chart-3)' :
    level === 'core' ? 'var(--color-foreground)' : 'var(--color-chart-5)';

  return (
    <div className="relative mx-auto mt-16 max-w-4xl">
      <div className="overflow-hidden rounded-xl border border-border bg-card/60 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-2 border-b border-border px-4 py-3">
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          <span className="ml-3 font-mono text-xs text-muted-foreground">risk-graph — my-project</span>
          <span className="ml-auto inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-2 py-0.5 text-xs font-medium text-primary">
            <ShieldAlert className="h-3 w-3" />2 risks found
          </span>
        </div>
        <div className="grid gap-0 md:grid-cols-[1fr_auto]">
          <svg viewBox="0 0 600 340" className="h-full w-full" role="img" aria-label="Interactive dependency risk graph">
            {edges.map(([a, b], i) => (
              <line key={i} x1={nodes[a].cx} y1={nodes[a].cy} x2={nodes[b].cx} y2={nodes[b].cy} stroke="var(--color-border)" strokeWidth={1.5} />
            ))}
            {nodes.map((n, i) => (
              <g key={i}>
                {(n.level === 'vuln' || n.level === 'stale') && (
                  <circle cx={n.cx} cy={n.cy} r={n.r + 8} fill={color(n.level)} opacity={0.15} />
                )}
                <circle cx={n.cx} cy={n.cy} r={n.r} fill={color(n.level)} opacity={n.level === 'safe' ? 0.6 : 1} />
              </g>
            ))}
          </svg>
          <div className="flex flex-col gap-4 border-t border-border p-6 md:border-l md:border-t-0">
            <Legend swatch="var(--color-primary)" label="Vulnerable" hint="Known CVE" />
            <Legend swatch="var(--color-chart-3)" label="Stale" hint="Unmaintained" />
            <Legend swatch="var(--color-chart-5)" label="Healthy" hint="Up to date" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Legend({ swatch, label, hint }) {
  return (
    <div className="flex items-center gap-3">
      <span className="h-3 w-3 flex-none rounded-full" style={{ backgroundColor: swatch }} />
      <div className="leading-tight">
        <div className="text-sm font-medium">{label}</div>
        <div className="text-xs text-muted-foreground">{hint}</div>
      </div>
    </div>
  );
}

function HowItWorks() {
  return (
    <section id="how-it-works" className="mx-auto max-w-6xl px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">How it works</h2>
        <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">Three steps between you and a clear picture of your dependency risk.</p>
      </div>
      <div className="mt-14 grid gap-6 md:grid-cols-3">
        {steps.map((s) => (
          <div key={s.step} className="group relative rounded-xl border border-border bg-card/60 p-6 backdrop-blur transition-colors hover:border-primary/40">
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/25">
                <s.icon className="h-5 w-5 text-primary" />
              </span>
              <span className="font-mono text-sm text-muted-foreground">{s.step}</span>
            </div>
            <h3 className="mt-5 text-lg font-semibold">{s.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

function WhyIBuilt() {
  return (
    <section className="mx-auto max-w-6xl px-6 pb-24">
      <div className="relative overflow-hidden rounded-2xl border border-border bg-card/60 p-8 backdrop-blur md:p-12">
        <div className="mx-auto max-w-2xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/50 px-3 py-1 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Why I built this
          </div>
          <h2 className="mt-6 text-balance text-2xl font-bold tracking-tight sm:text-3xl">My first coding project — built to learn, and to solve a real problem</h2>
          <div className="mt-5 space-y-4 text-pretty leading-relaxed text-muted-foreground">
            <p>Ghost Repo Auditor is my first real full-stack project. I wanted to learn how the whole picture fits together — Next.js, working with live APIs, and data visualization — instead of just following tutorials.</p>
            <p>So I picked a problem I actually run into: hidden security risk buried in outdated dependencies. This tool makes that invisible risk visible, using real data from <span className="font-medium text-foreground">OSV.dev</span> and the npm registry.</p>
            <p>It&apos;s a learning project, built in the open. Feedback, issues, and pull requests are genuinely welcome.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-6 py-10 sm:flex-row">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/15 ring-1 ring-primary/30">
            <Ghost className="h-4 w-4 text-primary" />
          </span>
          <span className="text-sm text-muted-foreground">
            Built by <span className="font-medium text-foreground">{AUTHOR_NAME}</span> — a learning project by a developer, for developers.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted hover:text-foreground text-muted-foreground">
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-border hover:bg-muted hover:text-foreground text-muted-foreground">
            <InstagramIcon className="h-4 w-4" />
          </a>
          <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2 text-sm font-medium hover:bg-muted">
            <GithubIcon className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </div>
    </footer>
  );
}