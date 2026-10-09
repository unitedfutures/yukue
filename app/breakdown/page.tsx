import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import Copyright from "@/components/Copyright";
import { formatAmount } from "@/data/budget";
import {
  getLatestNatureBreakdown,
  subsidyBreakdown,
  subsidyNote,
  legislatorSalary,
} from "@/data/natureClassification";
import { ArrowLeft, ChevronRight, Info, Layers, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "税金は性質別にどう使われているか｜給付・補助金・直接支出・人件費 | YUKUE",
  description:
    "国の歳出を「お金の性質」で分類。個人への給付・地方交付税・国債費・企業への補助金・直接支出・人件費・国際協力に振り分けて、税金が何に使われているかを集計しました。",
  alternates: { canonical: "/breakdown" },
};

export default function BreakdownPage() {
  const { year, results } = getLatestNatureBreakdown();
  const max = results[0]?.amount ?? 1;
  const subsidyTotal = subsidyBreakdown.reduce((s, r) => s + r.amount, 0);

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "YUKUE", item: "https://yukue.net/" },
      { "@type": "ListItem", position: 2, name: "支出の性質別分類", item: "https://yukue.net/breakdown" },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />

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

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* パンくず */}
        <nav className="flex items-center gap-1 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">ホーム</Link>
          <ChevronRight size={11} className="text-slate-300" />
          <span className="text-slate-800 font-medium">支出の性質別分類</span>
        </nav>

        <div className="mb-8">
          <p className="text-xs font-semibold tracking-widest text-[#1a365d] uppercase mb-3">Breakdown</p>
          <h1 className="flex items-center gap-2 text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
            <Layers size={26} className="text-[#1a365d]" />
            税金は「性質別」にどう使われているか
          </h1>
          <p className="text-sm text-slate-700 leading-relaxed">
            いつもの「分野別（社会保障・防衛…）」とは別の切り口で、{year.label}の一般会計歳出
            {formatAmount(year.total)}を「お金の性質」で分類しました。
            個人への給付なのか、地方や国際機関への移転なのか、企業への補助金なのか、
            国が自ら行う事業への支出なのか——同じ予算でも、見方を変えると姿が変わります。
          </p>
        </div>

        {/* 性質別バーチャート */}
        <section className="mb-10">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
            <div className="space-y-3.5">
              {results.map((r) => (
                <div key={r.category.key}>
                  <div className="flex items-baseline justify-between gap-3 mb-1">
                    <span className="text-sm font-medium text-slate-800">{r.category.label}</span>
                    <span className="flex items-baseline gap-2 shrink-0">
                      <span className="text-sm font-mono font-semibold text-slate-900">
                        {formatAmount(r.amount)}
                      </span>
                      <span className="text-xs text-slate-400 w-10 text-right">
                        {r.share.toFixed(1)}%
                      </span>
                    </span>
                  </div>
                  <div className="h-2.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full"
                      style={{ width: `${(r.amount / max) * 100}%`, background: "#1a365d" }}
                    />
                  </div>
                </div>
              ))}
            </div>
            <p className="mt-4 text-xs text-slate-400">
              {year.label} 一般会計歳出 {formatAmount(year.total)} の性質別内訳
            </p>
          </div>
        </section>

        {/* 各カテゴリの解説 */}
        <section className="mb-10 space-y-5">
          <h2 className="text-lg font-bold text-slate-900 pb-2 border-b border-slate-200">
            分類ごとの中身
          </h2>
          {results.map((r) => (
            <div key={r.category.key} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-baseline justify-between gap-3 mb-1.5">
                <h3 className="text-sm font-bold text-slate-900">{r.category.label}</h3>
                <span className="text-sm font-mono font-semibold text-[#1a365d] shrink-0">
                  {formatAmount(r.amount)}（{r.share.toFixed(1)}%）
                </span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed mb-2.5">
                {r.category.description}
              </p>
              <div className="flex flex-wrap gap-x-3 gap-y-1">
                {r.category.examples.map((ex) => (
                  <Link
                    key={ex.id}
                    href={`/items/${ex.id}`}
                    className="text-xs text-indigo-600 hover:text-indigo-800 hover:underline underline-offset-2 transition-colors"
                  >
                    {ex.label}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* 補助金の対象別内訳（推計） */}
        <section className="mb-10">
          <h2 className="text-lg font-bold text-slate-900 mb-1 pb-2 border-b border-slate-200">
            補助金はどこへ？（対象別の推計）
          </h2>
          <p className="text-xs text-slate-500 mb-4 mt-2">
            「企業・事業者等への補助金」{formatAmount(subsidyTotal)}の対象別内訳です。
          </p>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-200">
                  <th className="text-left py-2 px-2 font-medium">補助の内容</th>
                  <th className="text-left py-2 px-2 font-medium">主な対象</th>
                  <th className="text-right py-2 px-2 font-medium">金額</th>
                </tr>
              </thead>
              <tbody>
                {subsidyBreakdown.map((row) => (
                  <tr key={row.label} className="border-b border-slate-50">
                    <td className="py-2.5 px-2 text-slate-800">
                      {row.label}
                      {row.note && (
                        <span className="block text-[11px] text-slate-400">{row.note}</span>
                      )}
                    </td>
                    <td className="py-2.5 px-2 text-slate-600 whitespace-nowrap">{row.target}</td>
                    <td className="py-2.5 px-2 text-right font-mono text-slate-700 whitespace-nowrap">
                      {formatAmount(row.amount)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="flex items-start gap-2 mt-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
            <Info size={14} className="mt-0.5 shrink-0" />
            <span>{subsidyNote}</span>
          </div>
        </section>

        {/* 議員歳費（参考） */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            <Users size={17} className="text-[#1a365d]" />
            参考: 国会議員の歳費
          </h2>
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
            <div className="flex items-baseline gap-3 flex-wrap mb-2">
              <span className="text-2xl font-bold text-slate-900">
                約{legislatorSalary.totalOku}億円
              </span>
              <span className="text-xs text-slate-500">
                議員1人あたり年 約{legislatorSalary.perMemberManYen.toLocaleString()}万円 ×{" "}
                {legislatorSalary.members}人
              </span>
            </div>
            <p className="text-xs text-slate-500 leading-relaxed">{legislatorSalary.note}</p>
          </div>
        </section>

        {/* 方法論 */}
        <section className="mb-10">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <h2 className="flex items-center gap-2 text-sm font-bold text-slate-900 mb-2">
              <Info size={15} className="text-slate-400" />
              この集計について
            </h2>
            <p className="text-xs text-slate-500 leading-relaxed">
              金額はすべて財務省の{year.label}一般会計歳出予算（当サイト掲載データ）にもとづき、
              合計は歳出総額{formatAmount(year.total)}と一致します。一方、各事業を
              どの性質に分類するかは当サイトの編集上の判断であり、政府の公式な分類
              （使途別分類・主要経費別分類など）とは異なります。社会保障は大半が個人・世帯への
              給付のため一括で「給付」に、各省庁の一般的な公務員人件費は特定が難しいため
              防衛・教職員など明確なもののみを「人件費」に計上しています。
            </p>
          </div>
        </section>

        {/* CTA */}
        <div className="rounded-2xl bg-[#1a365d] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm font-semibold mb-1">分野別の内訳もチェック</p>
            <p className="text-slate-300 text-xs">ダッシュボードで各分野を階層的にたどれます</p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 bg-white text-[#1a365d] text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            ダッシュボードへ
          </Link>
        </div>

        {/* フッター */}
        <div className="pt-8 mt-10 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            ダッシュボードに戻る
          </Link>
          <p className="text-xs text-slate-400">
            <Copyright />
          </p>
        </div>
      </div>
    </main>
  );
}
