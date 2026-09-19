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

execSync('git init -b gh-pages', { cwd: dist, stdio: 'inherit' });
execSync('git config user.name "Prabha-Jeyaraj"', { cwd: dist, stdio: 'inherit' });
execSync('git config user.email "prabhaprasanna848@gmail.com"', { cwd: dist, stdio: 'inherit' });
execSync('git add -A', { cwd: dist, stdio: 'inherit' });
execSync('git commit -m "Deploy Hotel Sneha digital menu to GitHub Pages"', { cwd: dist, stdio: 'inherit' });
execSync('git remote add origin https://github.com/Prabha-Jeyaraj/snhea-hotel-digital-menu.git', { cwd: dist, stdio: 'inherit' });

console.log('Pushing to gh-pages branch...');
execSync('git push -f origin gh-pages', { cwd: dist, stdio: 'inherit' });

fs.rmSync(distGit, { recursive: true, force: true });
console.log('Done! Successfully deployed to gh-pages branch.');
