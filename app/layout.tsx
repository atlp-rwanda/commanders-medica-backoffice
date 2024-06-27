import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const urbanist = localFont({
  src: [
    {
      path: "../assets/fonts/Urbanist-Regular.ttf",
      weight: "400",
      style: "normal",
    },
    {
      path: "../assets/fonts/Urbanist-Medium.ttf",
      weight: "500",
      style: "normal",
    },
    {
      path: "../assets/fonts/Urbanist-SemiBold.ttf",
      weight: "600",
      style: "normal",
    },
    {
      path: "../assets/fonts/Urbanist-Bold.ttf",
      weight: "700",
      style: "normal",
    },
  ],
  display: "swap",
  preload: true,
  variable: "--font-urbanist",
});

export const metadata: Metadata = {
  title: "Home | Medica Back Office",
  description: "Medica Back Office",
  applicationName: "Medica Back Office",
  icons: [
    {
      rel: "apple-touch-icon",
      sizes: "120x120",
      url: "/apple-touch-icon.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "32x32",
      url: "/favicon-32x32.png",
    },
    {
      rel: "icon",
      type: "image/png",
      sizes: "16x16",
      url: "/favicon-16x16.png",
    },
    {
      rel: "mask-icon",
      color: "#5bbad5",
      url: "/safari-pinned-tab.svg",
    },
    {
      rel: "shortcut icon",
      url: "/favicon.ico",
    },
  ],
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${urbanist.variable} font-sans`}>{children}</body>
    </html>
  );
}
