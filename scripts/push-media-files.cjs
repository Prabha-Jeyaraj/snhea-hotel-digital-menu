const { execSync } = require('child_process');
const fs = require('fs');

function getUntracked() {
  const status = execSync('git status --porcelain', { encoding: 'utf8' });
  const lines = status.split('\n').filter(l => l.startsWith('?? '));
  const files = [];
  for (const line of lines) {
    const p = line.slice(3).trim();
    if (fs.existsSync(p)) {
      const stat = fs.statSync(p);
      if (stat.isDirectory()) {
        const sub = fs.readdirSync(p, { recursive: true });
        for (const s of sub) {
          const full = `${p}/${s}`.replace(/\\/g, '/');
          if (fs.statSync(full).isFile()) files.push(full);
        }
      } else {
        files.push(p);
      }
    }
  }
  return files;
}

const files = getUntracked();
console.log(`Found ${files.length} untracked media files to push.`);

for (let i = 0; i < files.length; i++) {
  const f = files[i];
  console.log(`[${i + 1}/${files.length}] Pushing ${f}...`);
  execSync(`git add "${f}"`, { stdio: 'inherit' });
  execSync(`git commit -m "feat(media): add ${f.split('/').pop()}"`, { stdio: 'inherit' });
  execSync('git push origin main', { stdio: 'inherit' });
  console.log(`Done pushing ${f}`);
}

console.log('All media files pushed successfully!');
