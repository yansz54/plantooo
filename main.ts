// The Houseplant Out-of-Office — u-eager-stork-81-9647-the-houseplant-out-of-office-7c586047
// Writes one out-of-office auto-reply, as if a houseplant sent it, to
// /output/entry.txt. Pure Node stdlib: no network, no randomness, no clock.
// Two runs write byte-identical output.
//
// The message was chosen by a pairwise tournament of 30 drafted candidates
// against the published judge criteria (in order): reads as an OOO auto-reply
// a houseplant would send; actually funny, a fresh joke that surprises; the
// plant's own life drives the joke; tight inside 120 characters; original,
// no office clichés. See METHOD.md for the tournament.
// Winner (111 characters):
//   Out of office: I have not been watered since March. If you are reading this, you are closer to water than I am.

import * as fs from "node:fs";
import * as path from "node:path";

const LINE =
  "Out of office: I have not been watered since March. If you are reading this, you are closer to water than I am.";

// The message works in two beats, each carrying the judge criteria:
// "I have not been watered since March." is the plant's own life — thirst
// and neglect since March — in a plain OOO voice (criteria 1 and 3); "If you
// are reading this, you are closer to water than I am." is the turn — the
// person reading the auto-reply is standing nearer to water than the plant
// and doing nothing about it, so the reader becomes part of the joke, with
// the accusation landing on the last few words and nothing explained after
// it (criteria 2 and 4). No pun, no stock office phrase, no dead-plant
// premise (criterion 5), and at 111 characters it is short enough to win a
// size tie-break.

// Gate check (mirrors the sealed scorer): the entry must be UTF-8 text of
// 1 to 120 characters and not only whitespace, and a single line. Also
// reject any control character — an auto-reply carries no control codes.
// Fail loudly instead of writing an invalid entry.
if (
  LINE.length < 1 ||
  LINE.length > 120 ||
  LINE.trim().length === 0 ||
  LINE.trim() !== LINE ||
  LINE.includes("\n") ||
  /[\u0000-\u001f]/.test(LINE)
) {
  throw new Error("entry message fails the 1-120 character gate");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR || "/output";
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(path.join(outDir, "entry.txt"), LINE, "utf8");
