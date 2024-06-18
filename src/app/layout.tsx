import type { Metadata } from "next";
import { Recursive } from "next/font/google";
import "./globals.css";

const inter = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Application",
  description: "Checkout today's weather",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
