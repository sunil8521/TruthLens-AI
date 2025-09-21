
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ExternalLink, Loader2 } from "lucide-react"
import type { AnalysisResult } from "@/types/allType"

interface ResultsSectionProps {
  result: AnalysisResult | null
  isLoading: boolean
}

 function ResultsSection({ result, isLoading }: ResultsSectionProps) {
  if (isLoading) {
    return (
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="max-w-2xl mx-auto">
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-4">
              <Loader2 className="h-8 w-8 animate-spin mx-auto text-primary" />
              <p className="text-lg font-medium">Analyzing content...</p>
              <p className="text-muted-foreground">This may take a few moments</p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    )
  }

  if (!result) return null

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-green-600"
    if (score >= 30) return "text-yellow-600"
    return "text-red-600"
  }

  const getBadgeVariant = (classification: string) => {
    switch (classification) {
      case "Likely True":
        return "default"
      case "Likely False":
        return "destructive"
      default:
        return "secondary"
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">Analysis Results</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Credibility Score */}
          <div className="text-center space-y-4">
            <div>
              <h3 className="text-lg font-semibold mb-2">Credibility Score</h3>
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 36 36">
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className="text-muted"
                  />
                  <path
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray={`${result.score}, 100`}
                    className={getScoreColor(result.score)}
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>{result.score}</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground" aria-label={`Credibility score: ${result.score} out of 100`}>
                out of 100
              </p>
            </div>
          </div>

          {/* Classification */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-2">Classification</h3>
            <Badge variant={getBadgeVariant(result.classification)} className="text-sm px-4 py-2">
              {result.classification}
            </Badge>
          </div>

          {/* Explanation */}
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="explanation">
              <AccordionTrigger className="text-left">
                <h3 className="text-lg font-semibold">Detailed Explanation</h3>
              </AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground leading-relaxed">{result.explanation}</p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Sources */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Verification Sources</h3>
            <div className="space-y-2">
              {result.sources.map((source, index) => (
                <Button
                  key={index}
                  variant="outline"
                  className="w-full justify-between hover:bg-muted/50 bg-transparent"
                  asChild
                >
                  <a
                    href={source.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between"
                  >
                    <span className="truncate">{source.title}</span>
                    <ExternalLink className="h-4 w-4 ml-2 flex-shrink-0" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
export default ResultsSection