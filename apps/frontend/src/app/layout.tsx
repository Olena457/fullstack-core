import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import { Header } from "../components/navigation/Header";
import ThemeRegistry from "../components/providers/ThemeRegistry"; 

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "ALTEREGO| Streetwear",
  description: "Define your style. No compromises.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>
        <ThemeRegistry>
          <Header />
          <main>{children}</main>
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            theme="dark"
            hideProgressBar={false}
          />
        </ThemeRegistry>
      </body>
    </html>
  );
}
