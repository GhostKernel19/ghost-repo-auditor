'use client';

import { useMemo, useState } from 'react';
import { ShieldAlert, Ghost, Play, AlertTriangle, Package, Clock, Fingerprint, X } from 'lucide-react';

const riskStyles = {
  high: { pill: 'bg-risk-high/15 text-risk-high border-risk-high/30', dot: 'bg-risk-high', node: 'fill-risk-high', label: 'High' },
  medium: { pill: 'bg-risk-medium/15 text-risk-medium border-risk-medium/30', dot: 'bg-risk-medium', node: 'fill-risk-medium', label: 'Medium' },
  low: { pill: 'bg-risk-low/15 text-risk-low border-risk-low/30', dot: 'bg-risk-low', node: 'fill-risk-low', label: 'Low' }
};

const RISK_ORDER = { high: 0, medium: 1, low: 2 };

function RiskBadge({ risk }) {
  const s = riskStyles[risk];
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${s.pill}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
      {s.label} risk
    </span>
  );
}

function buildAdvisory(item) {
  if (item.vulnCount > 0) return `${item.vulnCount} known vulnerability advisor${item.vulnCount === 1 ? 'y' : 'ies'} found via OSV.dev.`;
  if (item.monthsSinceUpdate !== null && item.monthsSinceUpdate > 24) return `No known vulnerabilities, but not updated in over ${Math.floor(item.monthsSinceUpdate / 12)} years.`;
  return 'No known advisories match this version.';
}

export default function AuditPage() {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleAudit() {
    setError(null);
    setLoading(true);
    setResults(null);

    try {
      JSON.parse(input); // quick validation before hitting the API
    } catch {
      setError('Invalid JSON. Paste a valid package manifest.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageJson: input })
      });
      const data = await res.json();

      if (!data.success) {
        setError(data.error || 'Audit failed.');
        setLoading(false);
        return;
      }

      const items = data.results
        .map(r => ({
          name: r.name,
          version: r.version,
          risk: r.riskLevel,
          vulnerabilities: r.vulnIds,
          lastUpdated: r.lastPublished ? r.lastPublished.slice(0, 10) : 'Unknown',
          advisory: buildAdvisory(r)
        }))
        .sort((a, b) => RISK_ORDER[a.risk] - RISK_ORDER[b.risk] || a.name.localeCompare(b.name));

      setResults(items);
      setSelected(items[0]?.name ?? null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const flaggedCount = useMemo(() => results?.filter(r => r.risk === 'high').length ?? 0, [results]);
  const selectedItem = results?.find(r => r.name === selected) ?? null;

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="border-b border-border">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card">
              <Ghost className="h-5 w-5 text-primary" />
            </div>
            <div className="leading-tight">
              <h1 className="text-sm font-semibold tracking-tight">Ghost Repo Auditor</h1>
              <p className="text-xs text-muted-foreground">Surface hidden vulnerabilities in your dependency graph</p>
            </div>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-6">
        <section className="rounded-xl border border-border bg-card p-4">
          <div className="mb-3 flex items-center justify-between">
            <label htmlFor="manifest" className="text-sm font-medium">Dependency manifest</label>
            <span className="text-xs text-muted-foreground">Paste package.json content</span>
          </div>
          <textarea
            id="manifest"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            spellCheck={false}
            rows={8}
            className="w-full resize-y rounded-lg border border-border bg-background px-3 py-2.5 font-mono text-xs leading-relaxed text-foreground outline-none focus:border-ring/60 focus:ring-2 focus:ring-ring/20"
            placeholder='{ "dependencies": { "react": "18.0.0" } }'
          />
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">
              {error ? <span className="text-risk-high">{error}</span> : 'Checked live against OSV.dev and the npm registry.'}
            </p>
            <button
              type="button"
              onClick={handleAudit}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              <Play className="h-4 w-4" />
              {loading ? 'Scanning...' : 'Audit'}
            </button>
          </div>
        </section>

        {results && flaggedCount > 0 && (
          <div role="alert" className="mt-4 flex items-center gap-3 rounded-xl border border-risk-high/30 bg-risk-high/10 px-4 py-3">
            <ShieldAlert className="h-5 w-5 shrink-0 text-risk-high" />
            <p className="text-sm font-medium text-risk-high">
              Security Risk Detected — {flaggedCount} package{flaggedCount === 1 ? '' : 's'} flagged
            </p>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-[1fr_340px]">
          <section className="rounded-xl border border-border bg-card p-4">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-medium">Dependency risk map</h2>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {['high', 'medium', 'low'].map((r) => (
                  <span key={r} className="inline-flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full ${riskStyles[r].dot}`} />
                    {riskStyles[r].label}
                  </span>
                ))}
              </div>
            </div>
            <DependencyGraph items={results} selected={selected} onSelect={setSelected} />
          </section>

          <aside className="rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <h2 className="text-sm font-medium">Package details</h2>
              {selectedItem && (
                <button type="button" onClick={() => setSelected(null)} className="rounded-md p-1 text-muted-foreground hover:bg-accent hover:text-foreground">
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>

            {selectedItem ? (
              <div className="space-y-5 px-4 py-4">
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-muted-foreground" />
                      <span className="font-mono text-sm font-medium">{selectedItem.name}</span>
                    </div>
                    <RiskBadge risk={selectedItem.risk} />
                  </div>
                  <p className="font-mono text-xs text-muted-foreground">v{selectedItem.version}</p>
                </div>

                {selectedItem.advisory && (
                  <div className="flex gap-2 rounded-lg border border-border bg-background p-3">
                    <AlertTriangle className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <p className="text-xs leading-relaxed text-muted-foreground">{selectedItem.advisory}</p>
                  </div>
                )}

                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                    <Fingerprint className="h-3.5 w-3.5" />
                    Vulnerability IDs
                  </div>
                  {selectedItem.vulnerabilities.length > 0 ? (
                    <ul className="space-y-1.5">
                      {selectedItem.vulnerabilities.map((v) => (
                        <li key={v} className="rounded-md border border-border bg-background px-2.5 py-1.5 font-mono text-xs">{v}</li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-muted-foreground">None reported.</p>
                  )}
                </div>

                <div className="flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" />
                  Last updated
                  <span className="ml-auto font-mono text-foreground">{selectedItem.lastUpdated}</span>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center gap-2 px-4 py-16 text-center">
                <Package className="h-6 w-6 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">{results ? 'Select a package to inspect it.' : 'Run an audit to see results.'}</p>
              </div>
            )}
          </aside>
        </div>
      </main>
    </div>
  );
}

function DependencyGraph({ items, selected, onSelect }) {
  const width = 640, height = 420, cx = width / 2, cy = height / 2;

  const nodes = useMemo(() => {
    if (!items) return [];
    const radius = Math.min(width, height) / 2 - 70;
    return items.map((item, i) => {
      const angle = (i / items.length) * Math.PI * 2 - Math.PI / 2;
      return { item, x: cx + radius * Math.cos(angle), y: cy + radius * Math.sin(angle) };
    });
  }, [items]);

  if (!items) {
    return (
      <div className="flex h-[420px] items-center justify-center rounded-lg border border-dashed border-border">
        <p className="text-sm text-muted-foreground">The dependency graph will render here after an audit.</p>
      </div>
    );
  }

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-[420px] w-full" role="img" aria-label="Dependency risk graph">
      {nodes.map((n) => (
        <line key={`edge-${n.item.name}`} x1={cx} y1={cy} x2={n.x} y2={n.y} className="stroke-border" strokeWidth={1} />
      ))}
      <circle cx={cx} cy={cy} r={20} className="fill-secondary stroke-border" strokeWidth={1} />
      <text x={cx} y={cy + 4} textAnchor="middle" className="fill-muted-foreground text-[10px] font-medium">root</text>
      {nodes.map((n) => {
        const isSelected = n.item.name === selected;
        return (
          <g key={n.item.name} transform={`translate(${n.x}, ${n.y})`} className="cursor-pointer" onClick={() => onSelect(n.item.name)}>
            {isSelected && <circle r={18} className="fill-none stroke-ring" strokeWidth={2} opacity={0.7} />}
            <circle r={12} className={`${riskStyles[n.item.risk].node} stroke-background`} strokeWidth={2} />
            <text y={30} textAnchor="middle" className={`text-[10px] ${isSelected ? 'fill-foreground font-medium' : 'fill-muted-foreground'}`}>{n.item.name}</text>
          </g>
        );
      })}
    </svg>
  );
}