import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer";
import { baseUrl } from "@/url";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Riskycase's link shortener",
  description: `Generate short ${baseUrl.hostname} links for your applications!`,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
