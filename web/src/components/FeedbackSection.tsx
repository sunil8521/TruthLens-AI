
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, MessageSquare } from "lucide-react"

 function FeedbackSection() {
  const [rating, setRating] = useState<"positive" | "negative" | null>(null)
  const [feedback, setFeedback] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = () => {
    // Simulate feedback submission
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setRating(null)
      setFeedback("")
    }, 3000)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-2xl mx-auto"
      >
        <Card className="shadow-lg border-green-200 dark:border-green-800">
          <CardContent className="text-center py-8">
            <div className="text-green-600 mb-4">
              <MessageSquare className="h-12 w-12 mx-auto" />
            </div>
            <h3 className="text-xl font-semibold text-green-800 dark:text-green-200 mb-2">
              Thank you for your feedback!
            </h3>
            <p className="text-green-600 dark:text-green-400">Your input helps us improve TruthLens AI.</p>
          </CardContent>
        </Card>
      </motion.div>
    )
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
          <CardTitle className="text-2xl font-bold text-center">Help us improve!</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Rating Buttons */}
          <div className="flex justify-center gap-4">
            <Button
              variant={rating === "positive" ? "default" : "outline"}
              size="lg"
              onClick={() => setRating("positive")}
              className={`flex items-center gap-2 hover:scale-105 transition-transform ${
                rating === "positive"
                  ? "bg-green-600 hover:bg-green-700"
                  : "hover:bg-green-50 hover:text-green-600 hover:border-green-300"
              }`}
            >
              <ThumbsUp className="h-5 w-5" />
              Helpful
            </Button>
            <Button
              variant={rating === "negative" ? "destructive" : "outline"}
              size="lg"
              onClick={() => setRating("negative")}
              className="flex items-center gap-2 hover:scale-105 transition-transform"
            >
              <ThumbsDown className="h-5 w-5" />
              Not Helpful
            </Button>
          </div>

          {/* Feedback Textarea */}
          <div>
            <Textarea
              placeholder="Your thoughts..."
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          {/* Submit Button */}
          <Button onClick={handleSubmit} disabled={!rating && !feedback.trim()} variant="secondary" className="w-full">
            Send Feedback
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  )
}
export default FeedbackSection