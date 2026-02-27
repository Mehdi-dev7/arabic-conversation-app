import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "تعلم العربية بالمحادثة - Arabic Conversation Practice",
  description: "Apprenez l'arabe moderne standard (MSA) ou le dialecte marocain (Darija) par la conversation avec l'IA",
  keywords: ["arabic", "learning", "conversation", "MSA", "darija", "moroccan", "AI"],
  manifest: "/manifest.json",
  themeColor: "#1a2332",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="ltr">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
