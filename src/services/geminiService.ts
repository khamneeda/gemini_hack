import { GoogleGenAI } from '@google/genai';
import type { FactCheckResult, FactCheckVerdict } from '../types/post';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!apiKey) {
  console.warn('[Gemini] VITE_GEMINI_API_KEY is not set in .env');
}

const ai = new GoogleGenAI({ apiKey: apiKey ?? '' });

// ---------------------------------------------------------------------------
// Entity Analysis (streaming)
// ---------------------------------------------------------------------------

export interface GeminiStreamCallbacks {
  /** Called once when the concept label has been parsed from the stream */
  onConcept: (concept: string) => void;
  /** Called for every incremental chunk of the summary text */
  onSummaryChunk: (chunk: string) => void;
}

/**
 * Stream an AI entity analysis from Gemini.
 *
 * Model response format:
 *   CONCEPT: <3–6 word label>
 *   ---
 *   <2–3 sentence analytical summary>
 *
 * Edit `buildAnalysisContent()` in ResultsPage to control what gets sent.
 */
export async function analyzeEntityStream(
  entityName: string,
  contentToAnalyze: string,
  callbacks: GeminiStreamCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  const prompt = `You are an AI analyst for a K-pop knowledge database.
Analyze the following information about "${entityName}".

Respond in EXACTLY this format — no extra text, no markdown:
CONCEPT: <3–6 word label capturing the core concept or theme>
---
<2–3 sentence analytical summary in an insightful, encyclopedic tone>

Content to analyze:
${contentToAnalyze}`;

  const stream = await ai.models.generateContentStream({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  let buffer = '';
  let conceptExtracted = false;

  for await (const response of stream) {
    if (signal?.aborted) break;

    const text = response.text ?? '';
    if (!text) continue;

    if (!conceptExtracted) {
      buffer += text;
      const sepIdx = buffer.indexOf('---');
      if (sepIdx !== -1) {
        const rawConcept = buffer.slice(0, sepIdx).replace(/^CONCEPT:\s*/i, '').trim();
        callbacks.onConcept(rawConcept);
        conceptExtracted = true;
        const afterSep = buffer.slice(sepIdx + 3).replace(/^\n/, '');
        if (afterSep) callbacks.onSummaryChunk(afterSep);
        buffer = '';
      }
    } else {
      callbacks.onSummaryChunk(text);
    }
  }
}

export async function factCheckPost(
  apiKey: string,
  postContent: string,
  entityName: string,
): Promise<FactCheckResult> {
  const ai = new GoogleGenAI({ apiKey });

  const prompt = `You are a fact-checker for a knowledge graph wiki about K-pop (Korean pop music), including artists, groups, labels, albums, and industry events.

A user submitted the following community post about the entity "${entityName}":

"${postContent}"

Analyze this post and determine if the claims are factual, misleading, or unverified.

Respond in valid JSON format only, with no markdown formatting:
{
  "verdict": "factual" | "misleading" | "unverified",
  "confidence": <number 0-100>,
  "reasoning": "<2-3 sentence explanation>"
}

Guidelines:
- "factual": Claims are accurate based on known K-pop facts (official profiles, chart records, news)
- "misleading": Claims contain errors, exaggerations, or misattributions
- "unverified": Claims are speculative theories or rumors that cannot be confirmed
- Be specific about which parts are accurate or inaccurate`;

  const response = await ai.models.generateContent({
    model: 'gemini-2.5-flash',
    contents: prompt,
  });

  const text = response.text ?? '';
  const cleaned = text
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();

  const parsed = JSON.parse(cleaned);

  return {
    verdict: parsed.verdict as FactCheckVerdict,
    confidence: Math.min(100, Math.max(0, parsed.confidence)),
    reasoning: parsed.reasoning,
    checkedAt: new Date().toISOString(),
  };
}
