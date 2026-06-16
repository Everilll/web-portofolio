import type { Metadata } from "next";
import { Fraunces, Inter, Geist_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { ThemeProvider } from "@/components/layout/theme-provider";
import { MotionProvider } from "@/components/layout/MotionProvider";
import { AuthProvider } from "@/hooks/use-auth";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Cursor } from "@/components/motion/Cursor";

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const fraunces = Fraunces({
  subsets: ['latin'],
  axes: ['SOFT', 'WONK', 'opsz'],
  variable: '--font-heading',
  display: 'swap',
});

const geistMono = Geist_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: "Everil | Portfolio & Digital Craft",
  description: "Personal portfolio and technical studies of Everil. Crafted with warm aesthetics, fine grain, and starlight details.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={cn(
        "h-full antialiased scroll-smooth",
        inter.variable,
        fraunces.variable,
        geistMono.variable
      )}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col grain bg-background text-foreground transition-colors duration-200">
        <AuthProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >
            <MotionProvider>
              <TooltipProvider>
                {/* Custom animated trailing cursor for desktop */}
                <Cursor />
                
                {/* Navigation Bar */}
                <Navbar />
                
                {/* Main Content Area */}
                <main className="flex-1 flex flex-col">{children}</main>
                
                {/* Footer Sign-off */}
                <Footer />
                
                {/* Toast Notification engine */}
                <Toaster closeButton position="bottom-right" />
              </TooltipProvider>
            </MotionProvider>
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
