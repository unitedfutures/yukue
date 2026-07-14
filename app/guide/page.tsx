import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { guides } from "@/data/guides";
import { ArrowLeft, BookOpen, Clock, ChevronRight } from "lucide-react";

export const metadata: Metadata = {
  title: "税金と予算の解説コラム | YUKUE",
  description:
    "国の予算・税金・国債のしくみをわかりやすく解説するコラム一覧。国家予算の全体像、国の借金、防衛費、消費税、社会保障費など、知っておきたいテーマを平易に紹介します。",
  alternates: { canonical: "/guide" },
};

export default function GuideIndexPage() {
  const itemListLd = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: guides.map((g, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `https://yukue.net/guide/${g.slug}`,
      name: g.title,
    })),
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListLd) }}
      />

      {/* Header */}
      <header
        className="border-b border-slate-200 sticky top-0 z-10 bg-white/95"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-sm"
          >
            <ArrowLeft size={15} />
            <span>ダッシュボードへ</span>
          </Link>
          <div className="w-px h-4 bg-slate-200" />
          <Link href="/">
            <Logo variant="symbol" height={36} dark={true} />
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-[#1a365d] uppercase mb-3">
            Guide
          </p>
          <h1 className="flex items-center gap-2 text-3xl font-bold text-slate-900 mb-4">
            <BookOpen size={26} className="text-[#1a365d]" />
            税金と予算の解説コラム
          </h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            国の予算・税金・国債のしくみを、できるだけ平易に解説するコラムです。
            ニュースではわかりにくい財政の話を、私たちの税金の目線でひもときます。
          </p>
        </div>

        <div className="space-y-4">
          {guides.map((g) => (
            <Link
              key={g.slug}
              href={`/guide/${g.slug}`}
              className="block rounded-2xl border border-slate-200 bg-white hover:border-[#1a365d] hover:shadow-sm transition-all p-5 group"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs font-semibold text-[#1a365d] bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5">
                  {g.category}
                </span>
                <span className="flex items-center gap-1 text-xs text-slate-400">
                  <Clock size={11} />
                  約{g.readMinutes}分
                </span>
              </div>
              <h2 className="text-base font-bold text-slate-900 mb-1.5 group-hover:text-[#1a365d] transition-colors">
                {g.title}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed line-clamp-2">
                {g.lead}
              </p>
              <span className="inline-flex items-center gap-1 mt-3 text-xs text-[#1a365d] font-medium">
                続きを読む
                <ChevronRight size={13} />
              </span>
            </Link>
          ))}
        </div>

        {/* フッター */}
        <div className="pt-8 mt-10 border-t border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            ダッシュボードに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
