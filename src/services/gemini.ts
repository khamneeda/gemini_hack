import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string;

if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  console.warn('[Gemini] VITE_GEMINI_API_KEY is not set. Please update your .env file.');
}

const genAI = new GoogleGenerativeAI(apiKey ?? '');

export interface GeminiStreamCallbacks {
  /** Called once when the concept label has been parsed */
  onConcept: (concept: string) => void;
  /** Called for each incremental chunk of the summary text */
  onSummaryChunk: (chunk: string) => void;
}

/**
 * Stream an entity analysis from Gemini.
 *
 * The model responds in this format:
 *   CONCEPT: <3-6 word label>
 *   ---
 *   <summary paragraphs>
 *
 * `onConcept` fires as soon as the separator is detected.
 * `onSummaryChunk` fires for every subsequent text chunk.
 *
 * @param entityName      - The entity being analyzed (e.g. 'LE SSERAFIM')
 * @param contentToAnalyze - The context/content to send to Gemini.
 *                           Edit `buildAnalysisContent()` in ResultsPage to control this.
 * @param callbacks        - Streaming event callbacks
 * @param signal           - Optional AbortSignal to cancel mid-stream
 */
export async function analyzeEntityStream(
  entityName: string,
  contentToAnalyze: string,
  callbacks: GeminiStreamCallbacks,
  signal?: AbortSignal,
): Promise<void> {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' });

  const prompt = `You are an AI analyst for a K-pop knowledge database.
Analyze the following information about "${entityName}".

Respond in EXACTLY this format — no extra text, no markdown:
CONCEPT: <3–6 word label capturing the core concept or theme>
---
<2–3 sentence analytical summary in an insightful, encyclopedic tone>

Content to analyze:
${contentToAnalyze}`;

  const result = await model.generateContentStream(prompt);

  let buffer = '';
  let conceptExtracted = false;

  for await (const chunk of result.stream) {
    if (signal?.aborted) break;

    const text = chunk.text();
    if (!text) continue;

    if (!conceptExtracted) {
      buffer += text;
      const separatorIdx = buffer.indexOf('---');

      if (separatorIdx !== -1) {
        // Parse concept from everything before the separator
        const rawConcept = buffer
          .slice(0, separatorIdx)
          .replace(/^CONCEPT:\s*/i, '')
          .trim();

        callbacks.onConcept(rawConcept);
        conceptExtracted = true;

        // Emit any summary text that arrived in the same chunk after the separator
        const afterSeparator = buffer.slice(separatorIdx + 3).replace(/^\n/, '');
        if (afterSeparator) callbacks.onSummaryChunk(afterSeparator);
        buffer = '';
      }
    } else {
      callbacks.onSummaryChunk(text);
    }
  }
}
