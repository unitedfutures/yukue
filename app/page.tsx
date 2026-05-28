"use client";

import { useState } from "react";
import { budgetData, BudgetItem, BudgetYear, formatAmount } from "@/data/budget";
import { settlementData, hasSettlement } from "@/data/settlement";
import { recipientGroups, hasRecipients } from "@/data/recipients";
import BudgetChart from "@/components/BudgetChart";
import Breadcrumb from "@/components/Breadcrumb";
import RankingPanel from "@/components/RankingPanel";
import RecipientsList from "@/components/RecipientsList";
import { ArrowLeft, ExternalLink, BarChart3, FileText, Clock, List } from "lucide-react";

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
    <main
      className="min-h-screen"
      style={{ background: "linear-gradient(135deg, #0a0f1e 0%, #0f172a 50%, #0a1628 100%)" }}
    >
      {/* Header */}
      <header
        className="border-b border-white/10 sticky top-0 z-10"
        style={{ background: "rgba(10,15,30,0.85)", backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center">
              <BarChart3 size={16} className="text-indigo-400" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white">税金の行き先</h1>
              <p className="text-xs text-slate-500">国家予算可視化ダッシュボード</p>
            </div>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* 予算/決算 切替 */}
            <div className="flex items-center gap-1 bg-slate-900/80 border border-white/10 rounded-xl p-1">
              <button
                onClick={() => handleModeChange("budget")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  dataMode === "budget"
                    ? "bg-indigo-500 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                <FileText size={13} />
                予算
              </button>
              <button
                onClick={() => settlementAvailable && handleModeChange("settlement")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  !settlementAvailable
                    ? "text-slate-600 cursor-not-allowed"
                    : dataMode === "settlement"
                    ? "bg-emerald-600 text-white shadow-lg"
                    : "text-slate-400 hover:text-slate-200"
                }`}
                title={!settlementAvailable ? "この年度の決算データは未公開です" : undefined}
              >
                <FileText size={13} />
                決算
                {!settlementAvailable && (
                  <Clock size={11} className="text-slate-600 ml-0.5" />
                )}
              </button>
            </div>

            {/* 年度セレクター */}
            <div className="flex items-center gap-1 bg-slate-900/80 border border-white/10 rounded-xl p-1">
              {[...budgetData].reverse().map((bd) => (
                <button
                  key={bd.year}
                  onClick={() => handleYearChange(bd)}
                  className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                    selectedYear.year === bd.year
                      ? "bg-indigo-500 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-200"
                  }`}
                >
                  {bd.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 pt-6 pb-12">
        {/* 決算未公開バナー */}
        {dataMode === "budget" && !settlementAvailable && (
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/20 rounded-xl px-4 py-2.5 mb-4 text-xs text-amber-400">
            <Clock size={13} />
            <span>
              {selectedYear.label}の決算データは未公開です（財務省が翌年秋頃に公表）。
              令和5年度は決算を表示できます。
            </span>
          </div>
        )}

        {/* タブ */}
        <div className="flex gap-1 bg-slate-900/60 border border-white/10 rounded-xl p-1 w-fit mb-6">
          <button
            onClick={() => setActiveTab("drill")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "drill"
                ? "bg-indigo-500 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ドリルダウン
          </button>
          <button
            onClick={() => setActiveTab("ranking")}
            className={`px-5 py-2 rounded-lg text-sm font-medium transition-all ${
              activeTab === "ranking"
                ? "bg-indigo-500 text-white"
                : "text-slate-400 hover:text-slate-200"
            }`}
          >
            ランキング
          </button>
        </div>

        {activeTab === "drill" && (
          <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
            {/* モードバッジ */}
            <div className="flex items-center gap-2 mb-4">
              <span
                className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                  dataMode === "settlement"
                    ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                    : "bg-indigo-500/15 text-indigo-400 border border-indigo-500/30"
                }`}
              >
                {dataMode === "settlement" ? "決算（確定値）" : "予算（当初予算）"}
              </span>
            </div>

            {/* ヘッダー行 */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <Breadcrumb
                  path={path}
                  onNavigate={handleNavigate}
                  yearLabel={activeData.label}
                />
                <div className="mt-3 flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-white">
                    {formatAmount(currentTotal)}
                  </span>
                  {path.length > 0 && (
                    <span className="text-sm text-slate-400">
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
                      className="flex items-center gap-2 px-4 py-2 bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/30 rounded-xl text-sm text-cyan-400 transition-colors"
                    >
                      <List size={14} />
                      支払先一覧
                    </button>
                  )}
                  <button
                    onClick={() => handleNavigate(path.length - 2)}
                    className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 border border-white/10 rounded-xl text-sm text-slate-300 transition-colors"
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
              <div className="flex flex-col items-center justify-center py-16 text-slate-500">
                <ExternalLink size={32} className="mb-3 opacity-40" />
                <p className="text-sm">これ以上の内訳データはありません</p>
              </div>
            )}

            {!recipientItemId && (
              <p className="text-xs text-slate-600 mt-5 text-right">
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
    </main>
  );
}
