import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HeroSection from "@/components/HeroSection";
import InputFormSection from "@/components/InputFormSection";
import ResultsSection from "@/components/ResultsSection";
import EducationSection from "@/components/EducationSection";
import FeedbackSection from "@/components/FeedbackSection";
import Footer from "@/components/Footer";
import DarkModeToggle from "@/components/DarkModeToggle";
import type { AnalysisResult } from "@/types/allType";
function App() {
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(
    null
  );
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleAnalysis = async (inputData: {
    type: string;
    content: string;
  }) => {
    setIsAnalyzing(true);

    // Simulate API call with 2-second delay
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Generate fake results based on input
    const fakeResult: AnalysisResult = {
      score: inputData.content.toLowerCase().includes("aliens")
        ? 10
        : inputData.content.toLowerCase().includes("covid")
        ? 25
        : inputData.content.toLowerCase().includes("election")
        ? 45
        : 75,
      classification: inputData.content.toLowerCase().includes("aliens")
        ? "Likely False"
        : inputData.content.toLowerCase().includes("covid")
        ? "Likely False"
        : inputData.content.toLowerCase().includes("election")
        ? "Undetermined"
        : "Likely True",
      explanation: inputData.content.toLowerCase().includes("aliens")
        ? "Claim debunked by Miami Police and USA Today. No evidence of aliens; event was a juvenile disturbance in 2023."
        : inputData.content.toLowerCase().includes("covid")
        ? "Medical claims require verification from health authorities. Check CDC and WHO guidelines for accurate information."
        : inputData.content.toLowerCase().includes("election")
        ? "Election-related claims should be verified through official election authorities and multiple credible news sources."
        : "Content appears to align with verified information from credible sources. Always cross-reference with multiple reliable outlets.",
      sources: [
        {
          title: "USA Today Fact Check",
          url: "https://usatoday.com/fact-check",
        },
        { title: "Snopes Verification", url: "https://snopes.com" },
        { title: "Reuters Fact Check", url: "https://reuters.com/fact-check" },
        {
          title: "AP News Fact Check",
          url: "https://apnews.com/hub/ap-fact-check",
        },
      ],
    };

    setAnalysisResult(fakeResult);
    setIsAnalyzing(false);
  };
  return (
    <>
      <div className="min-h-screen bg-background">
        <DarkModeToggle />

        <main className="relative">
          <HeroSection
            onStartAnalyzing={() => {
              const element = document.getElementById("input-form");
              element?.scrollIntoView({ behavior: "smooth" });
            }}
          />

          <div className="container mx-auto px-4 py-12 space-y-12">
            <InputFormSection
              onAnalysis={handleAnalysis}
              isAnalyzing={isAnalyzing}
            />

            <AnimatePresence>
              {(analysisResult || isAnalyzing) && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.5 }}
                  className="space-y-8"
                >
                  <ResultsSection
                    result={analysisResult}
                    isLoading={isAnalyzing}
                  />

                  {analysisResult && !isAnalyzing && (
                    <>
                      <EducationSection />
                      <FeedbackSection />
                    </>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </main>

        <Footer />
      </div>
    </>
  );
}

export default App;
