import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Leckerli_One,
  Noto_Sans_Display,
} from "next/font/google";
import "./globals.css";
import ThemeRegistry from "./components/ThemeRegistry";
import AppBackground from "./components/AppBackground";
import Loading from "./components/Loading";
import TransparentLoading from "./components/TransparentLoading";
import { ToastProvider } from "./contexts/ToastProvider";

const leckerliOne = Leckerli_One({
  variable: "--font-leckerli-one",
  subsets: ["latin"],
  weight: "400", // Leckerli One only has one weight
});

const notoSansDisplayBold = Noto_Sans_Display({
  variable: "--font-noto-sans-display-bold",
  subsets: ["latin"],
  weight: "900",
});

const notoSansDisplay = Noto_Sans_Display({
  variable: "--font-noto-sans-display",
  subsets: ["latin"],
  weight: "400",
});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Plate My Pantry",
  description: "Tell us what's in your fridge. We'll tell you what's cooking.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${notoSansDisplay.variable} ${notoSansDisplayBold.variable}`}
    >
      <body>
        <ThemeRegistry>
          <ToastProvider>
            <Loading>
              <TransparentLoading>
                <AppBackground>{children}</AppBackground>
              </TransparentLoading>
            </Loading>
          </ToastProvider>
        </ThemeRegistry>
      </body>
    </html>
  );
}
