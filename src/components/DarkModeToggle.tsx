import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from './ui/button'


export function DarkModeToggle({
  isDark,
  setIsDark,
}) {
  
  // const [isDark, setIsDark] = useState(false); 

  
  useEffect(() => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true' || isDark; 
    setIsDark(isDarkMode)
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    }
  }, [])
  const toggleDarkMode = () => {
    const newDarkMode = !isDark
    setIsDark(newDarkMode)
    localStorage.setItem('darkMode', newDarkMode.toString())
    if (newDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={toggleDarkMode}
      className="fixed top-4 right-4 z-50 bg-white/80 dark:bg-slate-800/80 backdrop-blur-sm"
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </Button>
  );
};

