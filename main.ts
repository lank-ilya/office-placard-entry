// Office Artifacts: The One-Line Placard Contest
// One line, at most 180 characters: a museum placard for an ordinary
// office object, written as if it were an ancient artifact.
// The program writes the placard to /output/entry.txt.
// Outside the grader's container, MAKEFUN_OUTPUT_DIR stands in for /output:
//   mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

function arg(name: string, fallback: string): string {
  const at = process.argv.indexOf(`--${name}`);
  if (at >= 0 && at + 1 < process.argv.length) return process.argv[at + 1]!;
  const withEquals = process.argv.find((a) => a.startsWith(`--${name}=`));
  return withEquals === undefined ? fallback : withEquals.slice(name.length + 3);
}

const placard =
  "Stapler, c. 1997. Pressed steel. Gift of the Facilities Department. Priests pressed it once to bind a contract, twice to end a meeting, and never a third time.";

if (placard.length > 180) {
  process.stderr.write(`office placard: placard is ${placard.length} characters, over the 180 cap\n`);
  process.exit(1);
}

const out = arg('output', process.env.MAKEFUN_OUTPUT_DIR ?? '/output');
mkdirSync(out, { recursive: true });
writeFileSync(join(out, 'entry.txt'), placard);
process.stdout.write(`office placard: wrote ${join(out, 'entry.txt')} (${placard.length} characters)\n`);
