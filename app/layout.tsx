import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "税金の行き先 | 国家予算可視化",
  description: "日本の国家予算がどこに使われているかを分かりやすく可視化するサイトです。",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
