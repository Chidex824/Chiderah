#!/usr/bin/env node

/**
 * Security Audit Script
 * Runs various security checks on the React application
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🔒 Running Security Audit...\n');

// Check for package vulnerabilities
function checkPackageVulnerabilities() {
  console.log('📦 Checking package vulnerabilities...');
  try {
    const result = execSync('npm audit --audit-level moderate --json', { encoding: 'utf8' });
    const audit = JSON.parse(result);

    if (audit.metadata.vulnerabilities.total > 0) {
      console.log(`⚠️  Found ${audit.metadata.vulnerabilities.total} vulnerabilities:`);
      console.log(`   - ${audit.metadata.vulnerabilities.low} low`);
      console.log(`   - ${audit.metadata.vulnerabilities.moderate} moderate`);
      console.log(`   - ${audit.metadata.vulnerabilities.high} high`);
      console.log(`   - ${audit.metadata.vulnerabilities.critical} critical`);
      console.log('\n💡 Run "npm audit fix" to fix automatically resolvable issues\n');
    } else {
      console.log('✅ No package vulnerabilities found\n');
    }
  } catch (error) {
    console.log('❌ Error checking package vulnerabilities\n');
  }
}

// Check for sensitive files
function checkSensitiveFiles() {
  console.log('🔍 Checking for sensitive files...');

  const sensitiveFiles = [
    '.env',
    '.env.local',
    '.env.production',
    'config.json',
    'secrets.json',
    'private.key',
    'id_rsa'
  ];

  const sensitivePatterns = [
    /API_KEY/i,
    /SECRET/i,
    /PASSWORD/i,
    /TOKEN/i,
    /PRIVATE_KEY/i
  ];

  let foundIssues = false;

  sensitiveFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`⚠️  Sensitive file found: ${file}`);
      foundIssues = true;
    }
  });

  // Check .env.local for hardcoded secrets
  if (fs.existsSync('.env.local')) {
    const envContent = fs.readFileSync('.env.local', 'utf8');
    sensitivePatterns.forEach(pattern => {
      if (pattern.test(envContent)) {
        console.log(`⚠️  Potential sensitive data found in .env.local matching: ${pattern}`);
        foundIssues = true;
      }
    });
  }

  if (!foundIssues) {
    console.log('✅ No sensitive files or hardcoded secrets found\n');
  } else {
    console.log('');
  }
}

// Check Content Security Policy
function checkCSP() {
  console.log('🛡️  Checking Content Security Policy...');

  const indexPath = path.join(__dirname, '..', 'index.html');
  if (fs.existsSync(indexPath)) {
    const content = fs.readFileSync(indexPath, 'utf8');
    if (content.includes('Content-Security-Policy')) {
      console.log('✅ Content Security Policy found in index.html\n');
    } else {
      console.log('⚠️  No Content Security Policy found in index.html\n');
    }
  } else {
    console.log('❌ index.html not found\n');
  }
}

// Check for console.logs in production build
function checkConsoleLogs() {
  console.log('📝 Checking for console statements...');

  const srcDir = path.join(__dirname, '..', 'src');
  let consoleCount = 0;

  function scanDirectory(dir) {
    const files = fs.readdirSync(dir);

    files.forEach(file => {
      const filePath = path.join(dir, file);
      const stat = fs.statSync(filePath);

      if (stat.isDirectory() && !file.startsWith('.') && file !== 'node_modules') {
        scanDirectory(filePath);
      } else if (file.endsWith('.js') || file.endsWith('.jsx') || file.endsWith('.ts') || file.endsWith('.tsx')) {
        const content = fs.readFileSync(filePath, 'utf8');
        const consoleMatches = content.match(/console\./g);
        if (consoleMatches) {
          consoleCount += consoleMatches.length;
        }
      }
    });
  }

  scanDirectory(srcDir);

  if (consoleCount > 0) {
    console.log(`⚠️  Found ${consoleCount} console statements (will be removed in production build)\n`);
  } else {
    console.log('✅ No console statements found\n');
  }
}

// Check build configuration
function checkBuildConfig() {
  console.log('🔧 Checking build configuration...');

  const viteConfigPath = path.join(__dirname, '..', 'vite.config.js');
  if (fs.existsSync(viteConfigPath)) {
    const content = fs.readFileSync(viteConfigPath, 'utf8');

    const checks = [
      { name: 'Source maps disabled in production', pattern: /sourcemap.*development/ },
      { name: 'Console logs removed in production', pattern: /drop_console.*production/ },
      { name: 'Security headers configured', pattern: /X-Frame-Options/ },
    ];

    checks.forEach(check => {
      if (check.pattern.test(content)) {
        console.log(`✅ ${check.name}`);
      } else {
        console.log(`⚠️  ${check.name} - not found`);
      }
    });
  } else {
    console.log('❌ vite.config.js not found');
  }

  console.log('');
}

// Run all checks
checkPackageVulnerabilities();
checkSensitiveFiles();
checkCSP();
checkConsoleLogs();
checkBuildConfig();

console.log('🔒 Security audit completed!\n');
console.log('💡 Recommendations:');
console.log('   - Regularly run "npm audit" and fix vulnerabilities');
console.log('   - Avoid committing sensitive data to version control');
console.log('   - Keep dependencies updated');
console.log('   - Use HTTPS in production');
console.log('   - Implement proper authentication for admin features\n');