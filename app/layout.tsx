import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "YUKUE | 税金の行き先",
  description: "日本の国家予算がどこに使われているかを分かりやすく可視化するサイトです。公開情報をもとに、税金の行方を追います。",
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
