import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Header } from "./components/ui/Header";
import { Footer } from "./components/ui/Footer";
import { Providers } from "./providers";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "3DNAV.TOP - Ultimate Navigation for 3D Designers",
  description: "Curated resources for Cinema 4D and Blender designers",
  keywords: "3D design, Cinema 4D, Blender, 3D navigation, 3D resources",
  authors: { name: "3DNAV.TOP" },
  creator: "3DNAV.TOP",
  publisher: "3DNAV.TOP",
  openGraph: {
    title: "3DNAV.TOP - Ultimate Navigation for 3D Designers",
    description: "Curated resources for Cinema 4D and Blender designers",
    url: "https://3dnav.top",
    siteName: "3DNAV.TOP",
    images: [
      {
        url: "https://3dnav.top/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "3DNAV.TOP",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "3DNAV.TOP - Ultimate Navigation for 3D Designers",
    description: "Curated resources for Cinema 4D and Blender designers",
    images: ["https://3dnav.top/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="canonical" href="https://3dnav.top" />
        {/* Google Analytics */}
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-49YKL1MW8H"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-49YKL1MW8H');
          `}
        </Script>
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col bg-gray-50`}>
        <Providers>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
