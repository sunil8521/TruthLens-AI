
import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, FileText, Link, ImageIcon } from "lucide-react"

interface InputFormSectionProps {
  onAnalysis: (data: { type: string; content: string }) => void
  isAnalyzing: boolean
}

 function InputFormSection({ onAnalysis, isAnalyzing }: InputFormSectionProps) {
  const [activeTab, setActiveTab] = useState("text")
  const [textInput, setTextInput] = useState("")
  const [urlInput, setUrlInput] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {}

    if (activeTab === "text" && !textInput.trim()) {
      newErrors.text = "Please enter some text to analyze"
    } else if (activeTab === "url" && !urlInput.trim()) {
      newErrors.url = "Please enter a URL to analyze"
    } else if (activeTab === "image" && !imageFile) {
      newErrors.image = "Please upload an image to analyze"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      const content = activeTab === "text" ? textInput : activeTab === "url" ? urlInput : imageFile?.name || ""

      onAnalysis({ type: activeTab, content })
    }
  }

  return (
    <section id="input-form" className="max-w-2xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <Card className="shadow-lg hover:shadow-xl transition-shadow duration-300">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold">Analyze Content</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="text" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  Text
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <Link className="h-4 w-4" />
                  URL
                </TabsTrigger>
                <TabsTrigger value="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4" />
                  Image
                </TabsTrigger>
              </TabsList>

              <div className="mt-6">
                <TabsContent value="text" className="space-y-4">
                  <div>
                    <Label htmlFor="text-input">Enter text to analyze</Label>
                    <Textarea
                      id="text-input"
                      placeholder="Enter a news headline, e.g., 'Aliens landed in Miami 2023'"
                      value={textInput}
                      onChange={(e) => setTextInput(e.target.value)}
                      className="min-h-[100px] mt-2"
                      aria-describedby={errors.text ? "text-error" : undefined}
                    />
                    {errors.text && (
                      <p id="text-error" className="text-destructive text-sm mt-1">
                        {errors.text}
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="url" className="space-y-4">
                  <div>
                    <Label htmlFor="url-input">Enter URL to analyze</Label>
                    <Input
                      id="url-input"
                      type="url"
                      placeholder="https://example.com/news"
                      value={urlInput}
                      onChange={(e) => setUrlInput(e.target.value)}
                      className="mt-2"
                      aria-describedby={errors.url ? "url-error" : undefined}
                    />
                    {errors.url && (
                      <p id="url-error" className="text-destructive text-sm mt-1">
                        {errors.url}
                      </p>
                    )}
                  </div>
                </TabsContent>

                <TabsContent value="image" className="space-y-4">
                  <div>
                    <Label htmlFor="image-input">Upload image to analyze</Label>
                    <Input
                      id="image-input"
                      type="file"
                      accept=".jpg,.jpeg,.png"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="mt-2"
                      aria-describedby={errors.image ? "image-error" : undefined}
                    />
                    <p className="text-sm text-muted-foreground mt-1">Upload an image or meme (.jpg, .png)</p>
                    {errors.image && (
                      <p id="image-error" className="text-destructive text-sm mt-1">
                        {errors.image}
                      </p>
                    )}
                  </div>
                </TabsContent>
              </div>

              <Button
                onClick={handleSubmit}
                disabled={isAnalyzing}
                className="w-full mt-6 text-lg py-6 hover:scale-[1.02] transition-transform duration-200"
                size="lg"
              >
                {isAnalyzing ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  "Analyze Now"
                )}
              </Button>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </section>
  )
}
export default InputFormSection