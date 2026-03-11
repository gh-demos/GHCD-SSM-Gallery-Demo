import type { Metadata } from "next";
import { Geist } from "next/font/google";
import Link from "next/link";
import { Camera } from "lucide-react";
import { ThemeProvider } from "@/components/ui/theme/ThemeProvider";
import { ThemeToggle } from "@/components/ui/theme/ThemeToggle";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Photo Gallery & Portfolio",
  description: "A curated collection of photographs and creative works showcasing a personal portfolio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Anti-FOUC: apply dark class before first paint based on stored preference or system setting */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=window.matchMedia('(prefers-color-scheme: dark)').matches;if(t==='dark'||(t!=='light'&&d)){document.documentElement.classList.add('dark');}}catch(e){}})();`,
          }}
        />
      </head>
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider>
          {/* Navigation Header */}
          <header className="border-b bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm sticky top-0 z-40">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <Link href="/" className="flex items-center gap-2">
                  <Camera className="h-8 w-8 text-blue-600" />
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
                    Portfolio Gallery
                  </h1>
                </Link>
                <nav className="flex items-center gap-6">
                  <Link href="/gallery" className="nav-link">
                    Gallery
                  </Link>
                  <Link href="/upload" className="nav-link">
                    Upload
                  </Link>
                  <Link href="/admin" className="btn-primary">
                    Admin
                  </Link>
                  <ThemeToggle />
                </nav>
              </div>
            </div>
          </header>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
