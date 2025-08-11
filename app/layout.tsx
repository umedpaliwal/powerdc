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
import NavigationHeader from "@/app/components/navigation/NavigationHeader";
import Footer from "@/app/components/navigation/Footer";
import Breadcrumbs from "@/app/components/navigation/Breadcrumbs";
import { Box } from "@mui/material";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "WattCanvas",
  description: "Exploring innovative solutions for renewable energy deployment",
  icons: {
    icon: "/logo_header.svg",
    apple: "/logo_header.svg",
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
            <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
              {/* Desktop Navigation Header */}
              <Box sx={{ display: { xs: 'none', md: 'block' } }}>
                <NavigationHeader />
              </Box>
              
              {/* Mobile Burger Menu */}
              <Box sx={{ display: { xs: 'block', md: 'none' } }}>
                <BurgerMenu />
              </Box>
              
              {/* Breadcrumbs */}
              <Breadcrumbs />
              
              {/* Main Content */}
              <Box component="main" sx={{ flexGrow: 1 }}>
                {children}
              </Box>
              
              {/* Footer */}
              <Footer />
            </Box>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
