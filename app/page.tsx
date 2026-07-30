'use client';

import { useState } from 'react';

export default function Home() {
  const [packageJson, setPackageJson] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  async function handleAudit() {
    setLoading(true);
    setError(null);
    setResults(null);

    try {
      const res = await fetch('/api/audit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ packageJson })
      });
      const data = await res.json();

      if (data.success) {
        setResults(data.results);
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <main style={{ maxWidth: 800, margin: '40px auto', padding: 20, fontFamily: 'sans-serif' }}>
      <h1>Ghost Repo Auditor</h1>
      <p>Paste your package.json contents below to audit for vulnerabilities and stale dependencies.</p>

      <textarea
        value={packageJson}
        onChange={(e) => setPackageJson(e.target.value)}
        placeholder='{"dependencies": {"react": "18.0.0"}}'
        style={{ width: '100%', height: 200, fontFamily: 'monospace', padding: 10 }}
      />

      <br /><br />
      <button onClick={handleAudit} disabled={loading} style={{ padding: '10px 20px', fontSize: 16 }}>
        {loading ? 'Auditing...' : 'Audit'}
      </button>

      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {results && (
        <table style={{ width: '100%', marginTop: 30, borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>Package</th>
              <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>Version</th>
              <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>Risk</th>
              <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>Vulnerabilities</th>
              <th style={{ textAlign: 'left', borderBottom: '2px solid #ccc' }}>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {results.map((r) => (
              <tr key={r.name}>
                <td>{r.name}</td>
                <td>{r.version}</td>
                <td style={{
                  color: r.riskLevel === 'high' ? 'red' : r.riskLevel === 'medium' ? 'orange' : 'green',
                  fontWeight: 'bold'
                }}>
                  {r.riskLevel.toUpperCase()}
                </td>
                <td>{r.vulnIds.join(', ') || 'None'}</td>
                <td>{r.monthsSinceUpdate !== null ? `${r.monthsSinceUpdate} months ago` : 'Unknown'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </main>
  );
}