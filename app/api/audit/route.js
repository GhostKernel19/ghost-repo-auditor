export async function POST(request) {
    try {
      const body = await request.json();
      const pkgText = body.packageJson;
  
      const pkg = JSON.parse(pkgText);
      const deps = { ...pkg.dependencies, ...pkg.devDependencies };
      const packageList = Object.entries(deps).map(([name, version]) => ({
        name,
        version: version.replace(/[\^~]/, '')
      }));
  
      // Vulnerability check
      const osvQueries = packageList.map(p => ({
        package: { name: p.name, ecosystem: "npm" },
        version: p.version
      }));
  
      const osvRes = await fetch('https://api.osv.dev/v1/querybatch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ queries: osvQueries })
      });
      const osvData = await osvRes.json();
  
      // Staleness check
      async function getLastPublishDate(packageName) {
        try {
          const res = await fetch(`https://registry.npmjs.org/${packageName}`);
          const data = await res.json();
          const latestVersion = data['dist-tags']?.latest;
          return data.time?.[latestVersion] || null;
        } catch {
          return null;
        }
      }
  
      function monthsAgo(dateString) {
        if (!dateString) return null;
        const then = new Date(dateString);
        const now = new Date();
        return (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth());
      }
  
      const results = [];
      for (let i = 0; i < packageList.length; i++) {
        const p = packageList[i];
        const vulns = osvData.results[i]?.vulns || [];
        const lastPublished = await getLastPublishDate(p.name);
        const age = monthsAgo(lastPublished);
  
        let riskLevel = 'low';
        if (vulns.length > 0) riskLevel = 'high';
        else if (age !== null && age > 24) riskLevel = 'medium';
  
        results.push({
          name: p.name,
          version: p.version,
          vulnCount: vulns.length,
          vulnIds: vulns.map(v => v.id),
          lastPublished,
          monthsSinceUpdate: age,
          riskLevel
        });
      }
  
      return Response.json({ success: true, results });
    } catch (err) {
      return Response.json({ success: false, error: err.message }, { status: 400 });
    }
  }