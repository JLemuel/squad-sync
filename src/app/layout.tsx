import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from 'next-themes';
import ThemeToggle from './components/ThemeToggle';

export const metadata: Metadata = {
  title: "SquadSync",
  description: "Team formation made easy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-poppins antialiased h-screen flex flex-col">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <div className="fixed top-4 right-10 z-50">
            <ThemeToggle />
          </div>
          <main className="flex-grow overflow-auto">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
