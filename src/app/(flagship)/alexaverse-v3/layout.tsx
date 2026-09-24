import "../../globals.css";
import "./globals.css";
import type { Metadata } from "next";
import {
  Nunito,
  Moul,
  Roboto,
  Space_Grotesk,
  Anton,
  Inter,
  Montserrat,
  Cinzel,
} from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--font-nunito",
});

const moul = Moul({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-moul",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-roboto",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-spaceGrotesk",
  display: "swap",
});

const anton = Anton({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-anton",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const montserrat = Montserrat({
  weight: ["400", "700"],
  subsets: ["latin"],
  variable: "--font-monsterrat",
});

const cinzel = Cinzel({
  weight: ["400", "600", "700"],
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AlexaVerse 3.0 | ADS!",
  description: "Created with ♥️ by the ADS team.",
  icons: {
    icon: "/icon2.png",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`
        ${nunito.variable}
        ${moul.variable}
        ${roboto.variable}
        ${spaceGrotesk.variable}
        ${anton.variable}
        ${inter.variable}
        ${montserrat.variable}
        ${cinzel.variable}
      `}
    >
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Crimson+Pro:wght@400;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-screen bg-dark_bg" suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
