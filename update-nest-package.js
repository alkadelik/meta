#!/usr/bin/env node

const fs = require('fs');
const { execSync } = require('child_process');
const https = require('https');
const path = require('path');

const packageJsonPath = path.resolve(process.cwd(), 'package.json');
const packageLockPath = path.resolve(process.cwd(), 'package-lock.json');

if (!fs.existsSync(packageJsonPath)) {
  console.error('No package.json found in this directory.');
  process.exit(1);
}

const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));
const dependencies = packageJson.dependencies || {};
const devDependencies = packageJson.devDependencies || {};

function getLatestVersion(pkg) {
  return new Promise((resolve, reject) => {
    https.get(`https://registry.npmjs.org/${pkg}/latest`, (res) => {
      let rawData = '';
      res.on('data', chunk => rawData += chunk);
      res.on('end', () => {
        try {
          const parsed = JSON.parse(rawData);
          resolve(parsed.version);
        } catch (e) {
          reject(e);
        }
      });
    }).on('error', reject);
  });
}

async function updateNestPackages() {
  const allNestPackages = {
    ...Object.fromEntries(
      Object.entries(dependencies).filter(([k]) => k.startsWith('@nestjs/'))
    ),
    ...Object.fromEntries(
      Object.entries(devDependencies).filter(([k]) => k.startsWith('@nestjs/'))
    )
  };

  if (Object.keys(allNestPackages).length === 0) {
    console.log('No @nestjs packages found.');
    return;
  }

  console.log('Updating NestJS packages...');

  for (const pkg of Object.keys(allNestPackages)) {
    try {
      const latestVersion = await getLatestVersion(pkg);
      if (dependencies[pkg]) {
        dependencies[pkg] = `^${latestVersion}`;
      } else if (devDependencies[pkg]) {
        devDependencies[pkg] = `^${latestVersion}`;
      }
      console.log(`✔️ ${pkg} → ^${latestVersion}`);
    } catch (err) {
      console.error(`Failed to get version for ${pkg}`, err.message);
    }
  }

  packageJson.dependencies = dependencies;
  packageJson.devDependencies = devDependencies;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

  if (fs.existsSync(packageLockPath)) {
    console.log('Deleting package-lock.json...');
    fs.unlinkSync(packageLockPath);
  }

  console.log('\nRunning npm install...');
  execSync('npm install', { stdio: 'inherit' });

  console.log('\n✅ NestJS packages updated to latest versions!');
}

updateNestPackages();
