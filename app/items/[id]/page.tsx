import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import RecipientsList from "@/components/RecipientsList";
import { formatAmount } from "@/data/budget";
import { itemDescriptions, itemSourceUrls } from "@/data/descriptions";
import { recipientGroups, hasRecipients } from "@/data/recipients";
import { getAllItemIds, getItemData } from "@/data/itemIndex";
import { yoyPercent, perCapitaYen, formatPerCapita } from "@/data/analysis";
import { ArrowLeft, ExternalLink, ChevronRight, Users, TrendingUp } from "lucide-react";

export function generateStaticParams() {
  return getAllItemIds().map((id) => ({ id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const data = getItemData(id);
  if (!data) return {};

  const desc = data.descriptionKey ? itemDescriptions[data.descriptionKey] : null;
  const amountStr = formatAmount(data.latest.amount);
  const description = desc
    ? `${data.name}（${data.latest.label}予算 ${amountStr}）: ${desc}`.slice(0, 155)
    : `${data.name}の${data.latest.label}予算は${amountStr}。国家予算に占める割合・年度別推移・税金の使われ方を解説します。`;

  return {
    title: `${data.name}とは？予算${amountStr}の使われ方 | YUKUE`,
    description,
    alternates: {
      canonical: `/items/${id}`,
    },
  };
}

function TrendBadge({ pct }: { pct: number | null }) {
  if (pct === null) return null;
  const cls =
    pct > 0.05 ? "text-rose-500" : pct < -0.05 ? "text-emerald-600" : "text-slate-400";
  return (
    <span className={`text-sm font-mono ${cls}`}>
      前年比 {pct > 0.05 ? "+" : ""}
      {pct.toFixed(1)}%
    </span>
  );
}

export default async function ItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const data = getItemData(id);
  if (!data) notFound();

  const desc = data.descriptionKey ? itemDescriptions[data.descriptionKey] : null;
  const sourceUrl = data.descriptionKey ? itemSourceUrls[data.descriptionKey] : null;
  const share = (data.latest.amount / data.latest.total) * 100;

  // 前年比（予算ベース）
  const yearsWithBudget = data.years.filter((y) => y.budget !== null);
  const latestIdx = yearsWithBudget.findIndex((y) => y.year === data.latest.year);
  const prevBudget = latestIdx > 0 ? yearsWithBudget[latestIdx - 1].budget : null;
  const yoy = yoyPercent(data.latest.amount, prevBudget ?? undefined);

  const recipientGroup = hasRecipients(id) ? recipientGroups[id] : null;

  // パンくず構造化データ
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "YUKUE", item: "https://yukue.net/" },
      ...data.ancestors.map((a, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: a.name,
        item: `https://yukue.net/items/${a.id}`,
      })),
      {
        "@type": "ListItem",
        position: data.ancestors.length + 2,
        name: data.name,
        item: `https://yukue.net/items/${id}`,
      },
    ],
  };

  return (
    <main className="min-h-screen bg-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }}
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

      <div className="max-w-3xl mx-auto px-4 py-10">
        {/* パンくず */}
        <nav className="flex items-center flex-wrap gap-1 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">
            国家予算
          </Link>
          {data.ancestors.map((a) => (
            <span key={a.id} className="flex items-center gap-1">
              <ChevronRight size={11} className="text-slate-300" />
              <Link
                href={`/items/${a.id}`}
                className="hover:text-slate-900 transition-colors"
              >
                {a.name}
              </Link>
            </span>
          ))}
          <span className="flex items-center gap-1">
            <ChevronRight size={11} className="text-slate-300" />
            <span className="text-slate-800 font-medium">{data.name}</span>
          </span>
        </nav>

        {/* タイトル・金額 */}
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-4">
          {data.name}
        </h1>
        <div className="flex items-baseline gap-3 flex-wrap mb-1">
          <span className="text-4xl font-bold text-slate-900">
            {formatAmount(data.latest.amount)}
          </span>
          <TrendBadge pct={yoy} />
        </div>
        <p className="text-sm text-slate-500 mb-8">
          {data.latest.label}予算 ・ 歳出総額の{share.toFixed(2)}% ・ 国民1人あたり{" "}
          {formatPerCapita(perCapitaYen(data.latest.amount, data.latest.year))}
        </p>

        {/* 説明文 */}
        {desc && (
          <section className="mb-10">
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
              {data.name}とは
            </h2>
            <p className="text-sm text-slate-700 leading-relaxed">{desc}</p>
            {sourceUrl && (
              <a
                href={sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 mt-3 text-xs text-indigo-600 hover:text-indigo-800 underline underline-offset-2 transition-colors"
              >
                <ExternalLink size={11} />
                公式サイトで詳しく見る
              </a>
            )}
          </section>
        )}

        {/* 年度別推移 */}
        <section className="mb-10">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
            <TrendingUp size={15} className="text-[#1a365d]" />
            年度別推移
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-100">
                  <th className="text-left py-2 font-medium">年度</th>
                  <th className="text-right py-2 font-medium">当初予算</th>
                  <th className="text-right py-2 font-medium">決算額</th>
                  <th className="text-right py-2 font-medium">執行率</th>
                </tr>
              </thead>
              <tbody>
                {data.years.map((y) => {
                  const rate =
                    y.budget && y.settlement ? (y.settlement / y.budget) * 100 : null;
                  return (
                    <tr key={y.year} className="border-b border-slate-50">
                      <td className="py-2.5 text-slate-700">{y.label}</td>
                      <td className="py-2.5 text-right font-mono text-slate-800">
                        {y.budget !== null ? formatAmount(y.budget) : "—"}
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-600">
                        {y.settlement !== null ? formatAmount(y.settlement) : "—"}
                      </td>
                      <td className="py-2.5 text-right font-mono text-slate-600">
                        {rate !== null ? `${rate.toFixed(0)}%` : "—"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-slate-400 mt-2">
            出典: 財務省「予算書」「決算書」。決算額が未表示の年度は未公表。
          </p>
        </section>

        {/* 内訳（子項目） */}
        {data.children.length > 0 && (
          <section className="mb-10">
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
              内訳
            </h2>
            <div className="grid grid-cols-1 gap-1.5">
              {data.children.map((c) => (
                <Link
                  key={c.id}
                  href={`/items/${c.id}`}
                  className="flex items-center gap-3 px-4 py-2.5 rounded-xl border border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white transition-all"
                >
                  <span className="flex-1 text-sm text-slate-800">{c.name}</span>
                  <span className="text-xs text-slate-400">
                    {((c.amount / data.latest.amount) * 100).toFixed(1)}%
                  </span>
                  <span className="text-sm font-mono text-slate-700 w-28 text-right">
                    {formatAmount(c.amount)}
                  </span>
                  <ChevronRight size={14} className="text-slate-300" />
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 支払先一覧 */}
        {recipientGroup && (
          <section className="mb-10">
            <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
              <Users size={15} className="text-[#1a365d]" />
              支払先・交付先
            </h2>
            <RecipientsList group={recipientGroup} />
          </section>
        )}

        {/* 関連項目（兄弟） */}
        {data.siblings.length > 0 && (
          <section className="mb-10">
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
              関連項目
            </h2>
            <div className="flex flex-wrap gap-2">
              {data.siblings.map((s) => (
                <Link
                  key={s.id}
                  href={`/items/${s.id}`}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 text-xs text-slate-600 hover:text-slate-900 transition-all"
                >
                  {s.name}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* CTA */}
        <div className="rounded-2xl bg-[#1a365d] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm font-semibold mb-1">
              国家予算全体をインタラクティブに見る
            </p>
            <p className="text-slate-300 text-xs">
              ドリルダウンで税金の行方を階層的にたどれます
            </p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 bg-white text-[#1a365d] text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            ダッシュボードへ
          </Link>
        </div>

        {/* フッター */}
        <div className="pt-8 mt-10 border-t border-slate-200 flex items-center justify-between flex-wrap gap-4 text-xs text-slate-400">
          <span>© {new Date().getFullYear()} YUKUE</span>
          <div className="flex items-center gap-4">
            <Link href="/simulator" className="hover:text-slate-700 transition-colors">
              納税額シミュレーター
            </Link>
            <Link href="/about" className="hover:text-slate-700 transition-colors">
              このサイトについて
            </Link>
            <Link href="/privacy" className="hover:text-slate-700 transition-colors">
              プライバシーポリシー
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
