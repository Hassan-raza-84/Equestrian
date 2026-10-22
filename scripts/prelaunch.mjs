#!/usr/bin/env node
/**
 * Pre-launch check. Fails while the site still contains placeholder content.
 * Run with: npm run prelaunch
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join } from "node:path";

const root = new URL("../src/", import.meta.url).pathname;
const issues = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) walk(path);
    else if (/\.(ts|tsx)$/.test(name)) check(path);
  }
}

function check(path) {
  if (path.endsWith("Copy.tsx")) return; // defines the placeholder syntax itself
  const text = readFileSync(path, "utf8");
  const rel = path.replace(root, "src/");
  const verify = text.match(/\[VERIFY:[^\]]*\]/g);
  if (verify) issues.push([rel, `${verify.length} placeholder(s) marked [VERIFY: ...]`]);
  if (/placeholder:\s*true/.test(text)) issues.push([rel, "case study still marked placeholder: true"]);
  if (/example\.com/.test(text) && !rel.includes("HeroScene") && !rel.includes("MockSite"))
    issues.push([rel, "contains example.com (set the real domain and email)"]);
  if (/"Studio Name"/.test(text)) issues.push([rel, 'company name is still "Studio Name"']);
}

walk(root);

if (issues.length === 0) {
  console.log("Prelaunch check passed. No placeholders found.");
  process.exit(0);
}
console.log("\nNot ready to launch. Fix these first:\n");
for (const [file, message] of issues) console.log(`  ${file}\n    ${message}`);
console.log(`\n${issues.length} issue(s). See LAUNCH.md for the full checklist.\n`);
process.exit(1);
