// Unsent: The Micro-Confession Sprint — make.fun entry.
// Writes the two-part micro-confession to /output/entry.txt: a To: line
// naming who it was meant for, then the unsent message itself, one line
// written exactly as it was typed. The sealed gate requires 1–260 UTF-8
// chars of non-whitespace text, and the judge brief caps the message
// itself at 200 chars, so the program checks both limits before writing.
// Node 22, stdlib only, deterministic: no clock, no env, no randomness,
// no network. OUTPUT_DIR is only a local-test override; the grader runs
// with /output present, so the default path is used there.
import { mkdirSync, writeFileSync } from "node:fs";

// The confession itself: a small theft confessed only in a draft. The
// addressee is load-bearing — "your wallet" and "you pay for dinner"
// point at the brother, and the reason it stayed unsent is felt, not
// stated: too petty to confess after six years, too guilty to forget.
const CONFESSION =
  "To: my brother\n" +
  "I took the $40 from your wallet in 2019 and told you the bus ate it. " +
  "I still think about it every time you pay for dinner.";

// Self-check against the gate (1–260 total) and the judge's 200-char
// message cap before writing anything.
const message = CONFESSION.split("\n")[1];
if (
  CONFESSION.length < 1 ||
  CONFESSION.length > 260 ||
  CONFESSION.trim() === "" ||
  message.length > 200
) {
  throw new Error(
    `confession is ${CONFESSION.length} chars total, message ${message.length} chars — outside the gate`,
  );
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, CONFESSION, "utf8");
console.log(`wrote ${CONFESSION.length} chars to ${outDir}/entry.txt`);
