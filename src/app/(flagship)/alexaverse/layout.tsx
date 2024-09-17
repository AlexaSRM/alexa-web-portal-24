import type { Metadata } from "next";
// import { Inter as FontSans } from "next/font/google"
import { Nunito as FontSans } from "next/font/google";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";
import { cn } from "@/lib/utils";
import "./globals.css";
import Header from "@/components/alexaverse/header";
import localFont from "next/font/local";
import ContactUs from "@/components/global/contact-us";
import { ThemeProvider } from "@/components/alexaverse/theme-providor";
import { Toaster } from "@/components/ui/toaster";

const myFont = localFont({ src: "./RogueHero-rggMA.otf" });

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "AlexaVerse | ADS!",
  description: "Created with ♥️ by the ADS team.",
  icons: {
    icon: "/icon.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen min-w-screen bg-black antialiased",
          "bg-[url('/background.png')] bg-cover",
          `${myFont.className}`
          // fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Header />
          {children}
          <Toaster />
        </ThemeProvider>
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}
