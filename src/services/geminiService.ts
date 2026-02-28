import { GoogleGenAI } from '@google/genai';
import type { FactCheckResult, FactCheckVerdict } from '../types/post';

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
