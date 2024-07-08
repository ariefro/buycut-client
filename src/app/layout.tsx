import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BuyCut",
  description:
    "Sebuah platform yang mempromosikan konsumerisme yang bijaksana dengan memfasilitasi akses informasi mengenai perusahaan-perusahaan yang mendukung pendudukan ilegal Israel di Palestina.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
        <Toaster
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 3000,
            },
          }}
        />
      </body>
    </html>
  );
}
