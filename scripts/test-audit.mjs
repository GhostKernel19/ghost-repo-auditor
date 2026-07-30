import fs from 'fs';

async function getLastPublishDate(packageName) {
  try {
    const res = await fetch(`https://registry.npmjs.org/${packageName}`);
    const data = await res.json();
    const latestVersion = data['dist-tags']?.latest;
    const publishDate = data.time?.[latestVersion];
    return publishDate || null;
  } catch (err) {
    return null;
  }
}

function monthsAgo(dateString) {
  if (!dateString) return null;
  const then = new Date(dateString);
  const now = new Date();
  const months = (now.getFullYear() - then.getFullYear()) * 12 + (now.getMonth() - then.getMonth());
  return months;
}

async function main() {
  const pkgRaw = fs.readFileSync('./package.json', 'utf-8');
  const pkg = JSON.parse(pkgRaw);

  const deps = { ...pkg.dependencies, ...pkg.devDependencies };
  const packageList = Object.entries(deps).map(([name, version]) => ({
    name,
    version: version.replace(/[\^~]/, '')
  }));

  console.log(`Found ${packageList.length} dependencies. Checking vulnerabilities + staleness...`);

  // Vulnerability check (OSV.dev)
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

  // Staleness check (npm registry) — run for each package
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

  console.log(JSON.stringify(results, null, 2));

  // Save to a file so the frontend can use it later
  fs.writeFileSync('./scripts/audit-result.json', JSON.stringify(results, null, 2));
  console.log('\nSaved results to scripts/audit-result.json');
}

main();