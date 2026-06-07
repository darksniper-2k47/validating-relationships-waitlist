import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/lenis-provider";
import Cursor from "@/components/cursor";
import Particles from "@/components/particles";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
  display: "swap",
});
const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://validating-relationships-waitlist.vercel.app"
  ),
  title: "Validating Relationships — by Dr. Joshua N. Simeon",
  description:
    "Buy Validating Relationships — Bishop Dr. Joshua N. Simeon's blueprint for the wounded, the betrayed, and the believer who is confused by the word friend. Instant digital download, R299.",
  openGraph: {
    title: "Validating Relationships — by Dr. Joshua N. Simeon",
    description:
      "The extent to which you make it in life is dependent on the kind of relationships you allow into your life. Get the book — instant download, R299.",
    images: ["/images/cover-front.jpg"],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Validating Relationships — by Dr. Joshua N. Simeon",
    description:
      "The blueprint for the wounded, the betrayed, and the believer who is confused by the word friend.",
    images: ["/images/cover-front.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#0A0A0F",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="bg-obsidian text-parchment font-body antialiased">
        <div aria-hidden className="fixed inset-0 -z-10 pointer-events-none">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(61,36,26,0.7)_0%,transparent_60%),radial-gradient(ellipse_60%_60%_at_80%_30%,rgba(212,175,55,0.12)_0%,transparent_70%),radial-gradient(ellipse_100%_60%_at_20%_90%,rgba(139,0,0,0.1)_0%,transparent_70%),linear-gradient(180deg,#0A0A0F_0%,#14141E_50%,#1F140E_100%)]" />
          <div className="absolute inset-0 noise-overlay opacity-[0.06] mix-blend-overlay" />
          <Particles />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(0,0,0,0.5)_100%)]" />
        </div>
        <Cursor />
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}
