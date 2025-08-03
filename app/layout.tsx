import type { Metadata } from "next";
import "./globals.css";
import { spectral } from "@/lib/fonts";

export const metadata: Metadata = {
  title: "Deco color - generateur de palette ",
  description:
    " Gnerer une palette de couleur pour un design d'interieur avec une IA avancée",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${spectral.className} scroll-smooth antialiased`}>
        {children}
      </body>
    </html>
  );
}
