import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: 'Todo app',
  description: 'Best way to handle your todos in kanban style boards.',
  keywords: ['todos', 'kanban'],
  openGraph: {
    title: 'Todo app',
    description: 'Best way to handle your todos in kanban style boards.',
    url: '/',
    siteName: 'Todo app',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Todo app',
    description: 'Best way to handle your todos in kanban style boards.',
  },
  icons: {
    icon: '/favicon.ico',
  },
  robots: {
    index: true,
    follow: true,
  },
  viewport: 'width=device-width, initial-scale=1',
  alternates: {
    canonical: '/',
  },
  other: {
    'google-site-verification': 'xyz789',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
