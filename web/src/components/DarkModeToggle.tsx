import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Switch } from "@/components/ui/switch"
import { Moon, Sun } from "lucide-react"

 function DarkModeToggle() {
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  const toggleDarkMode = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)

    if (newIsDark) {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
    } else {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="fixed top-4 right-4 z-50"
    >
      <div className="flex items-center gap-2 bg-card/80 backdrop-blur-sm border rounded-full px-3 py-2 shadow-lg">
        <Sun className={`h-4 w-4 transition-colors ${isDark ? "text-muted-foreground" : "text-yellow-500"}`} />
        <Switch checked={isDark} onCheckedChange={toggleDarkMode} aria-label="Toggle dark mode" />
        <Moon className={`h-4 w-4 transition-colors ${isDark ? "text-blue-400" : "text-muted-foreground"}`} />
      </div>
    </motion.div>
  )
}

export default DarkModeToggle