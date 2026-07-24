import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Logo from "@/components/Logo";
import GuideChart from "@/components/GuideChart";
import { getGuide, getAllGuideSlugs, guides } from "@/data/guides";
import { ArrowLeft, Clock, ChevronRight, HelpCircle, BookOpen } from "lucide-react";

export function generateStaticParams() {
  return getAllGuideSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) return {};
  return {
    title: `${g.title} | YUKUE`,
    description: g.description,
    alternates: { canonical: `/guide/${slug}` },
    openGraph: {
      title: g.title,
      description: g.description,
      type: "article",
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const g = getGuide(slug);
  if (!g) notFound();

  const others = guides.filter((x) => x.slug !== slug).slice(0, 3);

  const articleLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: g.title,
    description: g.description,
    articleBody: [g.lead, ...g.sections.flatMap((s) => [s.heading, ...s.paragraphs])].join("\n\n"),
    inLanguage: "ja",
    dateModified: `${g.updated}-01`,
    isPartOf: { "@type": "WebSite", name: "YUKUE", url: "https://yukue.net/" },
    mainEntityOfPage: `https://yukue.net/guide/${slug}`,
    publisher: { "@type": "Organization", name: "YUKUE" },
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "YUKUE", item: "https://yukue.net/" },
      { "@type": "ListItem", position: 2, name: "解説コラム", item: "https://yukue.net/guide" },
      { "@type": "ListItem", position: 3, name: g.title, item: `https://yukue.net/guide/${slug}` },
    ],
  };

  const faqLd =
    g.faqs && g.faqs.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: g.faqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }
      : null;

  return (
    <main className="min-h-screen bg-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbLd) }} />
      {faqLd && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      )}

      {/* Header */}
      <header
        className="border-b border-slate-200 sticky top-0 z-10 bg-white/95"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/guide"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-sm"
          >
            <ArrowLeft size={15} />
            <span>コラム一覧へ</span>
          </Link>
          <div className="w-px h-4 bg-slate-200" />
          <Link href="/">
            <Logo variant="symbol" height={36} dark={true} />
          </Link>
        </div>
      </header>

      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* パンくず */}
        <nav className="flex items-center flex-wrap gap-1 text-xs text-slate-500 mb-6">
          <Link href="/" className="hover:text-slate-900 transition-colors">ホーム</Link>
          <ChevronRight size={11} className="text-slate-300" />
          <Link href="/guide" className="hover:text-slate-900 transition-colors">解説コラム</Link>
          <ChevronRight size={11} className="text-slate-300" />
          <span className="text-slate-800 font-medium truncate max-w-[200px]">{g.category}</span>
        </nav>

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-semibold text-[#1a365d] bg-indigo-50 border border-indigo-100 rounded-full px-2 py-0.5">
            {g.category}
          </span>
          <span className="flex items-center gap-1 text-xs text-slate-400">
            <Clock size={11} />
            約{g.readMinutes}分で読めます
          </span>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 leading-snug mb-5">
          {g.title}
        </h1>

        <p className="text-base text-slate-700 leading-relaxed mb-8 pb-8 border-b border-slate-200">
          {g.lead}
        </p>

        {/* グラフ（任意） */}
        {g.chart && <GuideChart chart={g.chart} />}

        {/* 本文 */}
        <div className="space-y-10">
          {g.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="text-lg font-bold text-slate-900 mb-4">{s.heading}</h2>
              <div className="space-y-4">
                {s.paragraphs.map((p, i) => (
                  <p key={i} className="text-sm sm:text-[15px] text-slate-700 leading-loose">
                    {p}
                  </p>
                ))}
              </div>
            </section>
          ))}
        </div>

        {/* FAQ */}
        {g.faqs && g.faqs.length > 0 && (
          <section className="mt-12">
            <h2 className="flex items-center gap-2 text-lg font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
              <HelpCircle size={17} className="text-[#1a365d]" />
              よくある質問
            </h2>
            <div className="space-y-4">
              {g.faqs.map((f) => (
                <div key={f.q} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                  <p className="text-sm font-semibold text-slate-900 mb-1.5">Q. {f.q}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">A. {f.a}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 関連項目 */}
        {g.relatedItems && g.relatedItems.length > 0 && (
          <section className="mt-12">
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">
              関連する予算項目
            </h2>
            <div className="flex flex-wrap gap-2">
              {g.relatedItems.map((r) => (
                <Link
                  key={r.id}
                  href={`/items/${r.id}`}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-white hover:border-[#1a365d] text-xs text-slate-700 hover:text-[#1a365d] transition-all"
                >
                  {r.label}
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* 他のコラム */}
        <section className="mt-12">
          <h2 className="flex items-center gap-2 text-base font-bold text-slate-900 mb-4 pb-2 border-b border-slate-200">
            <BookOpen size={15} className="text-[#1a365d]" />
            ほかのコラムを読む
          </h2>
          <div className="space-y-2">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/guide/${o.slug}`}
                className="flex items-center gap-3 px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300 transition-all"
              >
                <span className="flex-1 text-sm text-slate-800">{o.title}</span>
                <ChevronRight size={14} className="text-slate-300 shrink-0" />
              </Link>
            ))}
          </div>
        </section>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-[#1a365d] px-6 py-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <p className="text-white text-sm font-semibold mb-1">税金の行方をデータで確かめる</p>
            <p className="text-slate-300 text-xs">国家予算をインタラクティブに可視化しています</p>
          </div>
          <Link
            href="/"
            className="px-5 py-2.5 bg-white text-[#1a365d] text-sm font-medium rounded-xl hover:bg-slate-100 transition-colors whitespace-nowrap"
          >
            ダッシュボードへ
          </Link>
        </div>

        {/* フッター */}
        <div className="pt-8 mt-10 border-t border-slate-200 text-xs text-slate-400">
          <p className="mb-2">
            本コラムは財務省・各省庁の公表資料をもとに作成した解説記事です。最終更新: {g.updated}
          </p>
          <Link href="/guide" className="text-slate-500 hover:text-slate-900 transition-colors">
            ← 解説コラム一覧
          </Link>
        </div>
      </article>
    </main>
  );
}
