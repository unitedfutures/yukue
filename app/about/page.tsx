import type { Metadata } from "next";
import Link from "next/link";
import { BarChart3, Eye, FileSearch, BookOpen, ArrowLeft, ExternalLink, MessageSquare } from "lucide-react";

export const metadata: Metadata = {
  title: "このサイトについて | YUKUE",
  description: "YUKUEのコンセプト・データの出典・制作の背景を説明するページです。税金の行方を公開情報をもとに可視化しています。",
};

export default function AboutPage() {
  return (
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a1628 100%)" }}
    >
      {/* Header */}
      <header
        className="border-b border-white/10 sticky top-0 z-10"
        style={{ background: "rgba(10,15,30,0.85)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-400 hover:text-white transition-colors text-sm"
          >
            <ArrowLeft size={15} />
            <span>ダッシュボードへ</span>
          </Link>
          <div className="w-px h-4 bg-white/10" />
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <BarChart3 size={14} className="text-indigo-400" />
            </div>
            <span className="text-sm font-semibold text-white tracking-wider">YUKUE</span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-14">

        {/* Hero */}
        <div className="mb-14">
          <p className="text-xs font-semibold tracking-widest text-indigo-400 uppercase mb-3">About this site</p>
          <h1 className="text-3xl font-bold text-white mb-4 leading-snug">
            私たちの税金は、<br />どこに行っているのか。
          </h1>
          <p className="text-slate-400 text-base leading-relaxed">
            国家予算は毎年100兆円を超える規模で動いています。<br />
            でも、その中身を自分の言葉で説明できる人は多くありません。<br />
            このサイトは、その「行き先」を少しでも見えやすくしたいという思いで作りました。
          </p>
        </div>

        {/* コンセプト3本柱 */}
        <div className="grid gap-4 mb-14">
          <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-indigo-500/15 border border-indigo-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Eye size={18} className="text-indigo-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold mb-2">税の行方を可視化する</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  社会保障・防衛・公共事業・教育・国債費……予算書に並ぶ項目を、金額の大小が直感的に伝わるグラフで表現しています。数字を眺めるだけでなく、「全体の中でこの項目がどれくらいの割合か」が分かることを目指しています。
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-sky-500/15 border border-sky-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                <BookOpen size={18} className="text-sky-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold mb-2">公開情報を元にまとめている</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  掲載しているデータはすべて財務省・各省庁が公表している予算書・決算書・白書を出典としています。独自の推計や政治的主張は加えず、公式数値をそのまま整理することを基本方針としています。
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {[
                    { label: "財務省 予算・決算", url: "https://www.mof.go.jp/policy/budget/budger_detail/index.htm" },
                    { label: "財務省 決算書", url: "https://www.mof.go.jp/policy/budget/report/account/index.html" },
                    { label: "e-Gov 法令データ", url: "https://laws.e-gov.go.jp/" },
                  ].map(({ label, url }) => (
                    <a
                      key={label}
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-xs text-sky-400 hover:text-sky-300 border border-sky-500/20 rounded-full px-2.5 py-1 transition-colors"
                    >
                      {label}
                      <ExternalLink size={10} />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-white/8 p-6" style={{ background: "rgba(255,255,255,0.03)" }}>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/15 border border-emerald-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
                <FileSearch size={18} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-white font-semibold mb-2">なるべく詳細まで追う</h2>
                <p className="text-slate-400 text-sm leading-relaxed">
                  「社会保障費」のような大きなくくりで終わらせず、その内訳（年金・医療・介護・少子化対策……）、さらにその先（年金なら老齢・障害・遺族の別）まで掘り下げられるようにしています。支払先となる機関・制度名も、分かる範囲で記載しています。
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 公開情報への願い */}
        <div
          className="rounded-2xl border border-amber-500/20 p-7 mb-14"
          style={{ background: "rgba(245,158,11,0.04)" }}
        >
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-amber-500/15 border border-amber-500/25 flex items-center justify-center flex-shrink-0 mt-0.5">
              <MessageSquare size={18} className="text-amber-400" />
            </div>
            <div>
              <h2 className="text-white font-semibold mb-3">それでも、見えない部分が多い</h2>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                公開されている情報を丹念に集めても、「どの事業に、いくら使われたか」の詳細が分からない項目は少なくありません。大括りの数字は公表されていても、その内訳が省庁内部にとどまっているケース、PDFの形式が機械処理しにくいケース、事後の決算データがそもそも細かく公表されないケース――壁は様々です。
              </p>
              <p className="text-slate-400 text-sm leading-relaxed mb-3">
                予算は「使う前の計画」であり、決算は「使った後の記録」です。どちらも国民が知る権利を持つ情報のはずです。より細かく・より使いやすい形で公開情報が整備されれば、無駄の発見にも、政策議論の質の向上にも、きっとつながります。
              </p>
              <p className="text-amber-300/80 text-sm font-medium">
                このサイトは、情報公開がもっと進む日を願いながら、今ある情報を少しずつ整理し続けます。
              </p>
            </div>
          </div>
        </div>

        {/* データの更新方針 */}
        <div className="mb-14">
          <h2 className="text-white font-semibold mb-4 text-base">データの更新方針</h2>
          <div className="space-y-3 text-sm text-slate-400">
            <div className="flex gap-3">
              <span className="text-indigo-400 font-semibold flex-shrink-0">予算</span>
              <span>毎年3〜4月に成立する当初予算をもとに更新します。補正予算は原則反映しません（決算に反映されます）。</span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex gap-3">
              <span className="text-sky-400 font-semibold flex-shrink-0">決算</span>
              <span>財務省が翌年夏〜秋に公表する決算書をもとに更新します。現在は令和5年度・令和6年度の決算を掲載しています。</span>
            </div>
            <div className="w-full h-px bg-white/5" />
            <div className="flex gap-3">
              <span className="text-slate-400 font-semibold flex-shrink-0">精度</span>
              <span>詳細な内訳が公表されていない項目は、関連資料から按分・推計しています。公式数値との差異が生じる場合があります。</span>
            </div>
          </div>
        </div>

        {/* フッターリンク */}
        <div className="pt-6 border-t border-white/8 flex items-center justify-between">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-400 hover:text-white transition-colors"
          >
            <ArrowLeft size={14} />
            ダッシュボードに戻る
          </Link>
          <p className="text-xs text-slate-600">
            掲載データに誤りを見つけた場合はご連絡ください。
          </p>
        </div>
      </div>
    </main>
  );
}
