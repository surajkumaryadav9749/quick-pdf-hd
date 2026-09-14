import { readFileSync } from "node:fs";
import process from "node:process";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { pdfGuides } from "../src/config/pdfGuides.js";
import documentTools from "../src/config/documentTools.js";

const root = path.dirname(fileURLToPath(import.meta.url));
const sitemap = readFileSync(path.join(root, "../public/sitemap.xml"), "utf8");
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);

const staticRoutes = [
  "/",
  "/about",
  "/contact",
  "/privacy-policy",
  "/terms",
  "/all-services",
  "/jpg-to-pdf",
  "/jpeg-to-pdf",
  "/png-to-pdf",
  "/webp-to-pdf",
  "/document-scanner",
  "/pdf-to-zip",
  "/resize-image",
  "/word-to-pdf",
  "/pdf-to-word",
  "/excel-to-pdf",
  "/pdf-to-excel",
  "/split-pdf",
  "/merge-pdf",
  "/pdf-to-jpg",
  "/pdf-guides",
];

const expected = new Set([
  ...staticRoutes.map((route) => `https://quickpdfhd.com${route === "/" ? "/" : route}`),
  ...pdfGuides.map((guide) => `https://quickpdfhd.com/pdf-guides/${guide.slug}`),
]);

const problems = [];

for (const url of expected) {
  if (!locs.includes(url)) problems.push(`Missing from sitemap: ${url}`);
}
for (const url of locs) {
  if (!expected.has(url)) problems.push(`Sitemap URL has no matching route/guide: ${url}`);
}

const descSet = new Set();
for (const tool of Object.values(documentTools)) {
  if (descSet.has(tool.description)) problems.push(`Duplicate description: ${tool.description.slice(0, 40)}`);
  descSet.add(tool.description);
}

const related = pdfGuides.flatMap((guide) => guide.relatedGuides || []);
for (const slug of related) {
  if (!pdfGuides.some((guide) => guide.slug === slug)) problems.push(`Broken related guide slug: ${slug}`);
}

if (problems.length) {
  console.error(problems.join("\n"));
  process.exit(1);
}

console.log(`OK: ${locs.length} sitemap URLs, ${pdfGuides.length} guides.`);
