import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Dog-Hub",
  description: "i think you are furry u sus",
  icons: {
    icon: "http://localhost:3000/_next/image?url=https%3A%2F%2Fimages.dog.ceo%2Fbreeds%2Fredbone%2Fn02090379_3320.jpg&w=828&q=75",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
