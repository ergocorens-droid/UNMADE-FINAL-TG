#!/usr/bin/env node
/**
 * Ensures src/i18n/dictionaries/pl.json and en.json have identical key trees.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dictDir = path.join(__dirname, "..", "src", "i18n", "dictionaries");

function collectKeys(obj, prefix = "") {
  const keys = [];
  if (obj === null || typeof obj !== "object" || Array.isArray(obj)) {
    throw new Error(`Expected object at ${prefix || "<root>"}`);
  }
  for (const k of Object.keys(obj).sort()) {
    const path = prefix ? `${prefix}.${k}` : k;
    const v = obj[k];
    if (v !== null && typeof v === "object" && !Array.isArray(v)) {
      keys.push(...collectKeys(v, path));
    } else {
      keys.push(path);
    }
  }
  return keys;
}

function main() {
  const pl = JSON.parse(
    fs.readFileSync(path.join(dictDir, "pl.json"), "utf8"),
  );
  const en = JSON.parse(
    fs.readFileSync(path.join(dictDir, "en.json"), "utf8"),
  );
  const plKeys = collectKeys(pl);
  const enKeys = collectKeys(en);

  const plSet = new Set(plKeys);
  const enSet = new Set(enKeys);
  const onlyPl = plKeys.filter((k) => !enSet.has(k));
  const onlyEn = enKeys.filter((k) => !plSet.has(k));

  if (onlyPl.length === 0 && onlyEn.length === 0) {
    console.log(`i18n OK: ${plKeys.length} keys match in pl.json and en.json`);
    process.exit(0);
  }

  console.error("i18n key mismatch:");
  if (onlyPl.length) {
    console.error("  Only in pl.json:");
    onlyPl.forEach((k) => console.error(`    ${k}`));
  }
  if (onlyEn.length) {
    console.error("  Only in en.json:");
    onlyEn.forEach((k) => console.error(`    ${k}`));
  }
  process.exit(1);
}

main();
