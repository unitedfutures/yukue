import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";

export const metadata: Metadata = {
  title: "YUKUE | 税金の行き先",
  description: "日本の国家予算がどこに使われているかを分かりやすく可視化するサイトです。公開情報をもとに、税金の行方を追います。",
  other: {
    "google-adsense-account": "ca-pub-7223735417475623",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">
        {children}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-CDCVYGL0CK"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-CDCVYGL0CK');
          `}
        </Script>
      </body>
    </html>
  );
}
