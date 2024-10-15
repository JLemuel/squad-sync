'use client';

import { useTheme } from 'next-themes';
import { useState, useEffect, useCallback } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => setMounted(true), []);

  const handleToggleTheme = useCallback(() => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  }, [theme, setTheme]);

  if (!mounted) return null;

  return (
    <button
      className="p-2 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors duration-200"
      onClick={handleToggleTheme}
    >
      {theme === 'light' ? '🌙' : '☀️'}
    </button>
  );
}