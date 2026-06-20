"use client";

import { useState } from "react";
import { budgetData, BudgetItem, BudgetYear, formatAmount } from "@/data/budget";
import { settlementData, hasSettlement } from "@/data/settlement";
import { recipientGroups, hasRecipients } from "@/data/recipients";
import BudgetChart from "@/components/BudgetChart";
import Breadcrumb from "@/components/Breadcrumb";
import RankingPanel from "@/components/RankingPanel";
import RecipientsList from "@/components/RecipientsList";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, ExternalLink, FileText, Clock, List, Info } from "lucide-react";

type DataMode = "budget" | "settlement";

/** パスの itemId 配列を新しい BudgetYear のツリーで辿り直す。
 *  途中で存在しない ID があればそこで打ち切る（浅い階層で表示） */
function resolvePath(year: BudgetYear, ids: string[]): BudgetItem[] {
  const result: BudgetItem[] = [];
  let items = year.items;
  for (const id of ids) {
    const found = items.find((item) => item.id === id);
    if (!found) break;
    result.push(found);
    items = found.children ?? [];
  }
  return result;
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState<BudgetYear>(budgetData[0]);
  const [dataMode, setDataMode] = useState<DataMode>("budget");
  const [path, setPath] = useState<BudgetItem[]>([]);
  const [activeTab, setActiveTab] = useState<"drill" | "ranking">("drill");
  // 支払先一覧を表示中の itemId（null = 非表示）
  const [recipientItemId, setRecipientItemId] = useState<string | null>(null);

  // 表示するデータ（予算 or 決算）
  const activeData: BudgetYear =
    dataMode === "settlement" && hasSettlement(selectedYear.year)
      ? (settlementData[selectedYear.year] as BudgetYear)
      : selectedYear;

  const currentItems =
    path.length === 0 ? activeData.items : path[path.length - 1].children ?? [];

  const currentTotal =
    path.length === 0 ? activeData.total : path[path.length - 1].amount;

  const settlementAvailable = hasSettlement(selectedYear.year);

  const handleSelect = (item: BudgetItem) => {
    if (item.children && item.children.length > 0) {
      setRecipientItemId(null);
      setPath([...path, item]);
    } else if (hasRecipients(item.id)) {
      setPath([...path, item]);
      setRecipientItemId(item.id);
    }
  };

  const handleNavigate = (index: number) => {
    setRecipientItemId(null);
    if (index === -1) setPath([]);
    else setPath(path.slice(0, index + 1));
  };

  const handleYearChange = (year: BudgetYear) => {
    // 現在のパスを新しい年度のツリーで辿り直す
    const idPath = path.map((item) => item.id);
    const newPath = resolvePath(year, idPath);
    setSelectedYear(year);
    setPath(newPath);
    // 支払先パネルは、末尾 itemId が一致する場合のみ維持
    const newLastId = newPath.at(-1)?.id ?? null;
    if (recipientItemId && newLastId !== recipientItemId) {
      setRecipientItemId(null);
    }
    if (!hasSettlement(year.year)) setDataMode("budget");
  };

  const handleModeChange = (mode: DataMode) => {
    // 予算↔決算は同じ item ID 体系なのでパスをそのまま維持
    // （決算データがある年度なら同じ階層を引き続き表示できる）
    setDataMode(mode);
  };

  const sourceLabel =
    dataMode === "settlement" ? "決算書" : "予算書";
  const totalLabel =
    dataMode === "settlement" ? "一般会計歳出決算額" : "一般会計歳出予算合計";

  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header
        className="border-b border-slate-200 sticky top-0 z-10 bg-white/95"
        style={{ backdropFilter: "blur(12px)" }}
      >
        {/* 1行目: ロゴ + 切替コントロール */}
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <Link href="/" className="flex items-center">
            <Logo variant="full" height={44} dark={true} />
          </Link>

          <div className="flex items-center gap-2 flex-wrap">
            {/* このサイトについて */}
            <Link
              href="/about"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Info size={14} />
              <span>このサイトについて</span>
            </Link>
            {/* 予算/決算 切替 */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1">
              <button
                onClick={() => handleModeChange("budget")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  dataMode === "budget"
                    ? "bg-[#1a365d] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <FileText size={13} />
                予算
              </button>
              <button
                onClick={() => settlementAvailable && handleModeChange("settlement")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  !settlementAvailable
                    ? "text-slate-300 cursor-not-allowed"
                    : dataMode === "settlement"
                    ? "bg-emerald-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
                title={!settlementAvailable ? "この年度の決算データは未公開です" : undefined}
              >
                <FileText size={13} />
                決算
                {!settlementAvailable && (
                  <Clock size={11} className="text-slate-300 ml-0.5" />
                )}
              </button>
            </div>

            {/* 年度セレクター */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1">
              {[...budgetData].reverse().map((bd) => (
                <button
                  key={bd.year}
                  onClick={() => handleYearChange(bd)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedYear.year === bd.year
                      ? "bg-[#1a365d] text-white shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {bd.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 2行目: パンくず（ドリルダウン中のみ表示） */}
        {activeTab === "drill" && path.length > 0 && (
          <div className="border-t border-slate-100 px-4 py-2 bg-slate-50">
            <div className="max-w-7xl mx-auto">
              <Breadcrumb
                path={path}
                onNavigate={handleNavigate}
                yearLabel={activeData.label}
              />
            </div>
          </div>
        )}
      </header>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        {/* 決算未公開バナー */}
        {dataMode === "budget" && !settlementAvailable && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-4 text-xs text-amber-700">
            <Clock size={13} />
            <span>
              {selectedYear.label}の決算データは未公開です（財務省が翌年秋頃に公表）。
              令和5年度・令和6年度は決算を表示できます。
            </span>
          </div>
        )}

        {/* タブ */}
        <div className="flex gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 w-fit mb-6">
          <button
            onClick={() => setActiveTab("drill")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "drill"
                ? "bg-[#1a365d] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            ドリルダウン
          </button>
          <button
            onClick={() => setActiveTab("ranking")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "ranking"
                ? "bg-[#1a365d] text-white shadow-sm"
                : "text-slate-500 hover:text-slate-800"
            }`}
          >
            ランキング
          </button>
        </div>

        {activeTab === "drill" && (
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
            {/* モードバッジ */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  dataMode === "settlement"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                }`}
              >
                {dataMode === "settlement" ? "決算（確定値）" : "予算（当初予算）"}
              </span>
            </div>

            {/* ヘッダー行 */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-slate-900">
                    {formatAmount(currentTotal)}
                  </span>
                  {path.length > 0 && (
                    <span className="text-sm text-slate-500">
                      歳出総額{formatAmount(activeData.total)}の{" "}
                      {((currentTotal / activeData.total) * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
                {path.length === 0 && (
                  <p className="text-sm text-slate-500 mt-1">
                    {activeData.label} {totalLabel}
                  </p>
                )}
              </div>

              {path.length > 0 && (
                <div className="flex items-center gap-2 self-start">
                  {hasRecipients(path[path.length - 1].id) && !recipientItemId && (
                    <button
                      onClick={() => setRecipientItemId(path[path.length - 1].id)}
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-50 hover:bg-cyan-100 border border-cyan-200 rounded-xl text-sm text-cyan-700 transition-colors"
                    >
                      <List size={14} />
                      支払先一覧
                    </button>
                  )}
                  <button
                    onClick={() => handleNavigate(path.length - 2)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 border border-slate-200 rounded-xl text-sm text-slate-700 transition-colors"
                  >
                    <ArrowLeft size={14} />
                    戻る
                  </button>
                </div>
              )}
            </div>

            {/* 支払先一覧 or チャート */}
            {recipientItemId ? (
              <RecipientsList group={recipientGroups[recipientItemId]} />
            ) : currentItems.length > 0 ? (
              <BudgetChart
                items={currentItems}
                total={currentTotal}
                onSelect={handleSelect}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <ExternalLink size={32} className="mb-3 opacity-40" />
                <p className="text-sm">これ以上の内訳データはありません</p>
              </div>
            )}

            {!recipientItemId && (
              <p className="text-xs text-slate-400 mt-5 text-right">
                ▶ のある項目はクリックでさらに内訳へ &nbsp;|&nbsp;
                <List size={11} className="inline mb-0.5 mx-1" />
                のある項目は支払先一覧へ &nbsp;|&nbsp; 出典: 財務省「
                {activeData.label}{sourceLabel}」
              </p>
            )}
          </div>
        )}

        {activeTab === "ranking" && <RankingPanel budget={activeData} topN={20} />}
      </div>

      <footer className="max-w-4xl mx-auto px-4 py-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>© {new Date().getFullYear()} YUKUE</span>
        <div className="flex items-center gap-4">
          <Link href="/about" className="hover:text-slate-700 transition-colors">このサイトについて</Link>
          <Link href="/contact" className="hover:text-slate-700 transition-colors">お問い合わせ</Link>
          <Link href="/privacy" className="hover:text-slate-700 transition-colors">プライバシーポリシー</Link>
        </div>
      </footer>
    </main>
  );
}
