
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { CheckCircle, XCircle, Lightbulb } from "lucide-react"

const tips = [
  "Check official sources like police reports and government agencies",
  "Avoid unverified social media posts as primary sources",
  "Look for multiple credible news outlets reporting the same story",
  "Be skeptical of sensational headlines and emotional language",
  "Verify images and videos haven't been manipulated or taken out of context",
]

const quizQuestions = [
  {
    question: "Is a viral tweet always a reliable source of information?",
    options: ["True", "False"],
    correct: "False",
    explanation: "Viral tweets can spread misinformation quickly. Always verify with credible sources.",
  },
  {
    question: "Which source is generally more reliable for breaking news?",
    options: ["Anonymous social media account", "Established news organization"],
    correct: "Established news organization",
    explanation: "Established news organizations have editorial standards and fact-checking processes.",
  },
]

 function EducationSection() {
  const [quizAnswers, setQuizAnswers] = useState<Record<number, string>>({})
  const [showResults, setShowResults] = useState(false)

  const handleQuizSubmit = () => {
    setShowResults(true)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="max-w-2xl mx-auto"
    >
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold flex items-center gap-2">
            <Lightbulb className="h-6 w-6 text-accent" />
            Learn to Verify
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Tips Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Verification Tips</h3>
            <div className="space-y-3">
              {tips.map((tip, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                >
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <p className="text-sm leading-relaxed">{tip}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Knowledge Check</h3>
            <div className="space-y-6">
              {quizQuestions.map((question, questionIndex) => (
                <div key={questionIndex} className="space-y-3">
                  <p className="font-medium">{question.question}</p>
                  <RadioGroup
                    value={quizAnswers[questionIndex] || ""}
                    onValueChange={(value) => setQuizAnswers((prev) => ({ ...prev, [questionIndex]: value }))}
                  >
                    {question.options.map((option, optionIndex) => (
                      <div
                        key={optionIndex}
                        className="flex items-center space-x-2 hover:bg-muted/50 p-2 rounded transition-colors"
                      >
                        <RadioGroupItem value={option} id={`q${questionIndex}-${optionIndex}`} />
                        <Label htmlFor={`q${questionIndex}-${optionIndex}`} className="cursor-pointer">
                          {option}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>

                  {showResults && quizAnswers[questionIndex] && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-3 rounded-lg flex items-start gap-2 ${
                        quizAnswers[questionIndex] === question.correct
                          ? "bg-green-50 dark:bg-green-950/20 text-green-800 dark:text-green-200"
                          : "bg-red-50 dark:bg-red-950/20 text-red-800 dark:text-red-200"
                      }`}
                    >
                      {quizAnswers[questionIndex] === question.correct ? (
                        <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                      ) : (
                        <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                      )}
                      <div>
                        <p className="font-medium">
                          {quizAnswers[questionIndex] === question.correct ? "Correct!" : "Incorrect"}
                        </p>
                        <p className="text-sm mt-1">{question.explanation}</p>
                      </div>
                    </motion.div>
                  )}
                </div>
              ))}

              {!showResults && (
                <Button
                  onClick={handleQuizSubmit}
                  disabled={Object.keys(quizAnswers).length < quizQuestions.length}
                  className="w-full"
                >
                  Check Answers
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
export default EducationSection