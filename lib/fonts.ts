import { Rubik, Spectral } from "next/font/google";

export const rubik = Rubik({
  subsets: ["latin"],
  variable: "--font-rubik",
});

export const spectral = Spectral({
  subsets: ["latin"],
  variable: "--font-spectral",
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});
