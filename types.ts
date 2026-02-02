
export interface AnalysisResult {
  physiognomyAnalysis: string;
  partnerDescription: string;
  compatibilityScore: number;
  traits: string[];
  partnerVisualPrompt: string;
}

export interface AppState {
  image: string | null;
  loading: boolean;
  loadingStep: string;
  result: AnalysisResult | null;
  sketchUrl: string | null;
  error: string | null;
}
