import { useEffect, useState } from "react";

export function useTheme() {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return window.matchMedia("(prefers-color-scheme: dark)").matches;
    }
    return false;
  })

  useEffect(() => {
    const controller = new AbortController();
    window.matchMedia("(prefers-color-scheme: dark)").addEventListener(
      "change",
      e => {
        setIsDarkMode(e.matches)
      },
      { signal: controller.signal }
    )

    return () => {
      controller.abort()
    }
  }, [])
  return [isDarkMode];
}