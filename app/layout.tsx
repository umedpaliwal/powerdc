import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import theme from "./theme";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { AuthProvider } from "@/contexts/AuthContext";
import BurgerMenu from "@/app/components/BurgerMenu";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Surplus Interconnection",
  description: "Exploring innovative solutions for renewable energy deployment",
  icons: {
    icon: "/surplus_logo_wo_text.svg",
    apple: "/surplus_logo_wo_text.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className}>
      <body className={inter.className}>
        <AuthProvider>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <BurgerMenu />
            {children}
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
