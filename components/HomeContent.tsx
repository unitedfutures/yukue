import Link from "next/link";
import { budgetData, formatAmount, BudgetItem } from "@/data/budget";
import { revenueData } from "@/data/revenue";
import { BookOpen, Compass, Coins, TrendingUp } from "lucide-react";

/**
 * トップページ下部に表示する静的コンテンツ。
 * - サイトの解説文（読み物コンテンツ）
 * - 予算項目インデックス（全項目ページへの内部リンク）
 * クローラビリティと SEO・AdSense 対策を兼ねる。
 */

const latest = budgetData[0]; // 令和8年度
const latestRevenue = revenueData[0];

function CategoryBlock({ item }: { item: BudgetItem }) {
  const children = item.children ?? [];
  return (
    <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
      <Link
        href={`/items/${item.id}`}
        className="flex items-baseline justify-between gap-2 group"
      >
        <span className="text-sm font-bold text-slate-900 group-hover:text-[#1a365d] transition-colors">
          {item.name}
        </span>
        <span className="text-xs font-mono text-slate-500 flex-shrink-0">
          {formatAmount(item.amount)}
        </span>
      </Link>
      {children.length > 0 && (
        <div className="mt-2.5 flex flex-wrap gap-x-3 gap-y-1.5">
          {children.map((c) => (
            <Link
              key={c.id}
              href={`/items/${c.id}`}
              className="text-xs text-slate-500 hover:text-[#1a365d] hover:underline underline-offset-2 transition-colors"
            >
              {c.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default function HomeContent() {
  return (
    <div className="max-w-7xl mx-auto px-4 pb-16">
      {/* 解説文 */}
      <section className="max-w-3xl mb-14">
        <div className="flex items-center gap-2 mb-4">
          <BookOpen size={18} className="text-[#1a365d]" />
          <h2 className="text-xl font-bold text-slate-900">
            国家予算の「入口」と「出口」を、税金の目線で
          </h2>
        </div>
        <div className="space-y-4 text-sm text-slate-700 leading-relaxed">
          <p>
            YUKUE（ゆくえ）は、私たちが納めた税金がどこから来て、どこへ使われているのかを、
            財務省が公表する予算書・決算書などの公開情報をもとに可視化するサイトです。
            {latest.label}の一般会計予算は
            <strong className="text-slate-900">{formatAmount(latest.total)}</strong>
            と過去最大の規模に達し、国民1人あたりに換算するとおよそ100万円にのぼります。
            これほど巨額でありながら、その全体像や使いみちは意外と知られていません。
          </p>
          <p>
            上のダッシュボードでは、<strong className="text-slate-900">「歳出」（税金の使いみち）</strong>と
            <strong className="text-slate-900">「歳入」（税金の出どころ）</strong>を切り替えながら、
            円グラフの項目をクリックして大分類から細目まで階層をたどれます。
            社会保障・防衛・公共事業といった分野の内訳や、実際にどの企業・自治体へ
            お金が支払われたか（支払先一覧）まで掘り下げられるのが特徴です。
          </p>
          <p>
            {latest.label}予算のポイントは3つあります。第一に、
            <strong className="text-slate-900">社会保障関係費が歳出の約3分の1</strong>を占め、
            高齢化とともに増え続けていること。第二に、過去の借金の返済にあたる
            <strong className="text-slate-900">国債費が年々膨らみ</strong>、金利上昇がその負担をさらに重くしていること。
            そして第三に、歳入を見ると
            <strong className="text-slate-900">約4分の1が公債金（新たな借金）</strong>で
            賄われており、税収だけでは支出をまかなえていないという現実です。
          </p>
          <p>
            各項目のページでは、その予算が何に使われるのかの詳しい解説、年度別の推移、
            よくある質問（FAQ）まで確認できます。数字の羅列ではなく、
            「自分が納めた税金の行方」として国の財政を身近に感じてもらうことが、
            このサイトの目的です。
          </p>
        </div>
      </section>

      {/* 歳出インデックス */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <Compass size={17} className="text-[#1a365d]" />
          <h2 className="text-lg font-bold text-slate-900">
            歳出（税金の使いみち）から探す
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          {latest.label}一般会計歳出 {formatAmount(latest.total)} ・
          分野をクリックすると詳しい解説ページへ
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {latest.items.map((item) => (
            <CategoryBlock key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 歳入インデックス */}
      <section className="mb-12">
        <div className="flex items-center gap-2 mb-1">
          <Coins size={17} className="text-teal-600" />
          <h2 className="text-lg font-bold text-slate-900">
            歳入（税金の出どころ）から探す
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          {latestRevenue.label}一般会計歳入 {formatAmount(latestRevenue.total)} ・
          税目や公債金の内訳を解説
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {latestRevenue.items.map((item) => (
            <CategoryBlock key={item.id} item={item} />
          ))}
        </div>
      </section>

      {/* 便利ツールへの導線 */}
      <section>
        <div className="flex items-center gap-2 mb-5">
          <TrendingUp size={17} className="text-[#1a365d]" />
          <h2 className="text-lg font-bold text-slate-900">もっと詳しく知る</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Link
            href="/simulator"
            className="rounded-xl border border-slate-200 bg-white hover:border-[#1a365d] hover:shadow-sm transition-all p-5"
          >
            <p className="text-sm font-bold text-slate-900 mb-1">納税額シミュレーター</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              年収を入力すると、あなたの所得税が国家予算のどの分野に
              いくら使われているかを試算できます。
            </p>
          </Link>
          <Link
            href="/about"
            className="rounded-xl border border-slate-200 bg-white hover:border-[#1a365d] hover:shadow-sm transition-all p-5"
          >
            <p className="text-sm font-bold text-slate-900 mb-1">このサイトについて</p>
            <p className="text-xs text-slate-500 leading-relaxed">
              YUKUEのコンセプト、データの出典、更新方針などを説明しています。
            </p>
          </Link>
        </div>
      </section>
    </div>
  );
}
