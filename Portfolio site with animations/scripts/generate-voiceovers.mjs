#!/usr/bin/env node
// Generates ElevenLabs voiceover MP3s (+ word-level timing) for every case study and blog post.
//
// Usage:
//   ELEVENLABS_API_KEY=sk_... node scripts/generate-voiceovers.mjs
//
// This runs locally, once, whenever narration text changes — the API key never
// touches the published site (it's a static GitHub Pages deploy with no backend,
// so a key embedded in client code would be publicly extractable and billable
// by anyone).
//
// Reads narration text from scripts/narration/case-study/<slug>.txt and
// scripts/narration/blog/<slug>.txt — edit those files to change what gets
// read aloud, then re-run. Paragraphs are separated by a blank line; for blog
// posts this MUST match BlogPost.body in BlogDetail.tsx paragraph-for-paragraph,
// since the timing file is what drives the karaoke-style word highlight in
// BlogPostDrawer.tsx — if the text drifts from what's displayed, the highlight
// will drift too.
//
// Output per slug:
//   public/audio/<kind>/<slug>.mp3         — the narration audio
//   public/audio/<kind>/<slug>.words.json  — [[{word,start,end}, ...], ...] one
//                                             array per paragraph, times in seconds
//
// Filenames must match CaseStudyInfo.slug / BlogPost.slug exactly — that's how
// the app looks up which files to load.

import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, "..");
const VOICE_ID = "EXAVITQu4vr4xnSDxMaL"; // Sarah — Mature, Reassuring, Confident (premade, free-tier)
const API_KEY = process.env.ELEVENLABS_API_KEY;

if (!API_KEY) {
  console.error("Missing ELEVENLABS_API_KEY. Run as:\n  ELEVENLABS_API_KEY=sk_... node scripts/generate-voiceovers.mjs");
  process.exit(1);
}

// Groups ElevenLabs' per-character alignment into per-word {word, start, end} timing,
// then splits that flat word list back into paragraphs using the same blank-line
// boundaries the source text was split on (so it can be zipped against post.body).
function wordsByParagraph(text, alignment) {
  const { characters, character_start_times_seconds: starts, character_end_times_seconds: ends } = alignment;

  const flatWords = [];
  let word = "";
  let wordStart = null;
  for (let i = 0; i < characters.length; i++) {
    const ch = characters[i];
    if (/\s/.test(ch)) {
      if (word) {
        flatWords.push({ word, start: wordStart, end: ends[i - 1] });
        word = "";
        wordStart = null;
      }
      continue;
    }
    if (wordStart === null) wordStart = starts[i];
    word += ch;
  }
  if (word) flatWords.push({ word, start: wordStart, end: ends[ends.length - 1] });

  // Re-walk the paragraphs in the same order, consuming words as we go, so word
  // counts per paragraph line up even though whitespace collapsed during alignment.
  const paragraphs = text.split(/\n\s*\n/).map((p) => p.trim()).filter(Boolean);
  let cursor = 0;
  return paragraphs.map((p) => {
    const count = p.split(/\s+/).filter(Boolean).length;
    const slice = flatWords.slice(cursor, cursor + count);
    cursor += count;
    return slice;
  });
}

async function generate(text, mp3Path, wordsPath) {
  const res = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/with-timestamps`, {
    method: "POST",
    headers: {
      "xi-api-key": API_KEY,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      text,
      model_id: "eleven_multilingual_v2",
      voice_settings: { stability: 0.5, similarity_boost: 0.75 },
    }),
  });
  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`ElevenLabs API error ${res.status}: ${body}`);
  }
  const { audio_base64, alignment } = await res.json();

  mkdirSync(path.dirname(mp3Path), { recursive: true });
  writeFileSync(mp3Path, Buffer.from(audio_base64, "base64"));
  writeFileSync(wordsPath, JSON.stringify(wordsByParagraph(text, alignment)));
}

async function processDir(kind) {
  const narrationDir = path.join(ROOT, "scripts", "narration", kind);
  const outDir = path.join(ROOT, "public", "audio", kind);
  if (!existsSync(narrationDir)) return;
  const files = readdirSync(narrationDir).filter((f) => f.endsWith(".txt"));
  for (const file of files) {
    const slug = file.replace(/\.txt$/, "");
    const text = readFileSync(path.join(narrationDir, file), "utf8").trim();
    if (!text) {
      console.warn(`Skipping ${kind}/${slug} — narration file is empty`);
      continue;
    }
    const mp3Path = path.join(outDir, `${slug}.mp3`);
    const wordsPath = path.join(outDir, `${slug}.words.json`);
    console.log(`Generating ${kind}/${slug} (${text.length} chars)...`);
    await generate(text, mp3Path, wordsPath);
    console.log(`  -> ${path.relative(ROOT, mp3Path)}`);
    console.log(`  -> ${path.relative(ROOT, wordsPath)}`);
  }
}

await processDir("case-study");
await processDir("blog");
console.log("Done.");
