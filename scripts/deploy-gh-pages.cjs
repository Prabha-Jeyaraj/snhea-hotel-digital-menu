const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const dist = path.resolve(__dirname, '..', 'dist', 'public');
console.log('Deploying build from:', dist);

if (!fs.existsSync(dist)) {
  console.error('dist/public does not exist. Run build first.');
  process.exit(1);
}

const distGit = path.join(dist, '.git');
if (fs.existsSync(distGit)) {
  fs.rmSync(distGit, { recursive: true, force: true });
}

function run(cmd) {
  execSync(cmd, { cwd: dist, stdio: 'inherit' });
}

run('git init -b gh-pages');
run('git config user.name "Prabha-Jeyaraj"');
run('git config user.email "prabhaprasanna848@gmail.com"');
run('git remote add origin https://github.com/Prabha-Jeyaraj/snhea-hotel-digital-menu.git');

// Step 1: Add all web app assets except media first
console.log('--- Step 1: Deploying core app bundle ---');
run('git add index.html 404.html .nojekyll placeholder-dish.svg hotel-sneha-logo.jpg assets');
run('git commit -m "Deploy core app bundle to GitHub Pages"');
run('git push -f origin gh-pages');
console.log('Core app bundle deployed.');

// Step 2: Add media files incrementally
console.log('--- Step 2: Deploying media assets incrementally ---');
function walk(dir) {
  let results = [];
  if (!fs.existsSync(dir)) return results;
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else {
      results.push(path.relative(dist, fullPath).replace(/\\/g, '/'));
    }
  }
  return results;
}

const mediaFiles = walk(path.join(dist, 'media'));
console.log(`Found ${mediaFiles.length} media files to push to gh-pages.`);

const BATCH_SIZE = 2; // 2 files per commit/push (~15MB max)
for (let i = 0; i < mediaFiles.length; i += BATCH_SIZE) {
  const batch = mediaFiles.slice(i, i + BATCH_SIZE);
  console.log(`Pushing media batch ${Math.floor(i / BATCH_SIZE) + 1}/${Math.ceil(mediaFiles.length / BATCH_SIZE)}: ${batch.join(', ')}`);
  for (const f of batch) {
    run(`git add "${f}"`);
  }
  run(`git commit -m "Deploy media batch: ${batch.map(b => path.basename(b)).join(', ')}"`);
  run('git push origin gh-pages');
}

fs.rmSync(distGit, { recursive: true, force: true });
console.log('Done! Successfully deployed all assets to gh-pages branch.');

