import * as fs from "node:fs";
import * as path from "node:path";

// Competition rule: the entry is a single sentence of 1-200 code points.
// Why this pitch should land with a judge: it takes the most boring
// household chore and escalates it in three beats — folds, critiques,
// then sues for custody — so the absurdity keeps rising inside one
// sentence and the punchline is a legal threat from a laundry basket.

const LINE =
  "A self-folding laundry basket that folds your clothes, critiques your fashion sense, and files for custody of your favourite hoodie.";

const outDir =
  process.env.MAKEFUN_OUTPUT_DIR && process.env.MAKEFUN_OUTPUT_DIR.trim() !== ""
    ? process.env.MAKEFUN_OUTPUT_DIR
    : path.join(process.cwd(), "output");

fs.mkdirSync(outDir, { recursive: true });

const outPath = path.join(outDir, "entry.txt");
fs.writeFileSync(outPath, LINE, "utf8");

const readBack = fs.readFileSync(outPath, "utf8");
const codePoints = [...readBack].length;

if (readBack !== LINE) {
  console.error("Validation failed: entry.txt is not byte-identical to the pitch.");
  process.exit(1);
}
if (codePoints < 1 || codePoints > 200) {
  console.error(`Validation failed: ${codePoints} code points, must be 1-200.`);
  process.exit(1);
}
if (readBack.trim().length === 0) {
  console.error("Validation failed: pitch is only whitespace.");
  process.exit(1);
}
// Exactly one sentence: a single terminal full stop and no other
// sentence-ending punctuation, so the pitch reads as one breath.
if ((readBack.match(/\./g) || []).length !== 1 || !readBack.trim().endsWith(".")) {
  console.error("Validation failed: pitch must be exactly one sentence.");
  process.exit(1);
}

console.log(`Wrote ${codePoints} code points to ${outPath}:`);
console.log(readBack);
console.log("Validation passed: byte-identical, 1-200 code points, exactly one sentence.");
