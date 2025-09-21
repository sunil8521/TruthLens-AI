export interface AnalysisResult {
  score: number
  classification: "Likely True" | "Likely False" | "Undetermined"
  explanation: string
  sources: Array<{ title: string; url: string }>
}
