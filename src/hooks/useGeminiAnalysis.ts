import { useState, useEffect, useRef, useCallback } from 'react';
import { analyzeEntityStream } from '../services/gemini';

interface UseGeminiAnalysisOptions {
  entityName: string;
  contentToAnalyze: string;
  /** Only fires the API call when this is true */
  enabled: boolean;
}

interface UseGeminiAnalysisReturn {
  concept: string | null;
  streamingSummary: string;
  /** True while the stream is in progress */
  isStreaming: boolean;
  error: string | null;
  refetch: () => void;
}

export function useGeminiAnalysis({
  entityName,
  contentToAnalyze,
  enabled,
}: UseGeminiAnalysisOptions): UseGeminiAnalysisReturn {
  const [concept, setConcept] = useState<string | null>(null);
  const [streamingSummary, setStreamingSummary] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchedRef = useRef(false);
  const abortRef = useRef<AbortController | null>(null);

  const fetchAnalysis = useCallback(async () => {
    // Cancel any in-flight stream
    abortRef.current?.abort();
    const controller = new AbortController();
    abortRef.current = controller;

    setConcept(null);
    setStreamingSummary('');
    setError(null);
    setIsStreaming(true);

    try {
      await analyzeEntityStream(
        entityName,
        contentToAnalyze,
        {
          onConcept: (c) => setConcept(c),
          onSummaryChunk: (chunk) =>
            setStreamingSummary((prev) => prev + chunk),
        },
        controller.signal,
      );
      fetchedRef.current = true;
    } catch (err) {
      if ((err as Error).name === 'AbortError') return;
      setError(err instanceof Error ? err.message : 'Failed to fetch analysis');
    } finally {
      setIsStreaming(false);
    }
  }, [entityName, contentToAnalyze]);

  // Trigger once when the page becomes visible
  useEffect(() => {
    if (enabled && !fetchedRef.current) {
      fetchAnalysis();
    }
  }, [enabled, fetchAnalysis]);

  // Reset cache and cancel stream when entity changes
  useEffect(() => {
    fetchedRef.current = false;
    abortRef.current?.abort();
    setConcept(null);
    setStreamingSummary('');
  }, [entityName]);

  // Cleanup on unmount
  useEffect(() => {
    return () => { abortRef.current?.abort(); };
  }, []);

  return { concept, streamingSummary, isStreaming, error, refetch: fetchAnalysis };
}
