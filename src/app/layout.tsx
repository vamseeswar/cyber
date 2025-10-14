
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Providers from "./providers";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VNC Data Exfiltration Testbed",
  description: "Dashboard to monitor and simulate VNC data exfiltration",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} flex`}>
        <Providers>
          <Navbar />
          <main className="w-full pt-20 p-4 sm:p-6 lg:p-8 bg-background-primary">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
