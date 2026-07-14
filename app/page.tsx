"use client";

import { useState, useMemo } from "react";
import { budgetData, BudgetItem, BudgetYear, formatAmount } from "@/data/budget";
import { settlementData, hasSettlement } from "@/data/settlement";
import { revenueData, getRevenueYear } from "@/data/revenue";
import { recipientGroups, hasRecipients } from "@/data/recipients";
import {
  getPrevYearAmounts,
  getPrevYearTotal,
  getExecutionRates,
  flattenAmounts,
  yoyPercent,
  perCapitaYen,
  formatPerCapita,
} from "@/data/analysis";
import BudgetChart from "@/components/BudgetChart";
import Breadcrumb from "@/components/Breadcrumb";
import RankingPanel from "@/components/RankingPanel";
import RecipientsList from "@/components/RecipientsList";
import HomeContent from "@/components/HomeContent";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, ExternalLink, FileText, Clock, List, Info, Calculator, TrendingDown, TrendingUp } from "lucide-react";

type DataMode = "budget" | "settlement";
type SideMode = "spending" | "revenue";

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
  const [sideMode, setSideMode] = useState<SideMode>("spending");
  const [path, setPath] = useState<BudgetItem[]>([]);
  const [activeTab, setActiveTab] = useState<"drill" | "ranking">("drill");
  // 支払先一覧を表示中の itemId（null = 非表示）
  const [recipientItemId, setRecipientItemId] = useState<string | null>(null);

  const isRevenue = sideMode === "revenue";

  // 表示するデータ（歳入 / 歳出予算 / 歳出決算）
  const activeData: BudgetYear = isRevenue
    ? (getRevenueYear(selectedYear.year) as BudgetYear)
    : dataMode === "settlement" && hasSettlement(selectedYear.year)
    ? (settlementData[selectedYear.year] as BudgetYear)
    : selectedYear;

  const currentItems =
    path.length === 0 ? activeData.items : path[path.length - 1].children ?? [];

  const currentTotal =
    path.length === 0 ? activeData.total : path[path.length - 1].amount;

  const settlementAvailable = hasSettlement(selectedYear.year);

  // ── 分析データ ──
  // 歳入は年度別（予算）どうしで前年比を取る
  const revenuePrevAmounts = useMemo(() => {
    if (!isRevenue) return null;
    const prev = getRevenueYear(selectedYear.year - 1);
    return prev ? flattenAmounts(prev) : null;
  }, [isRevenue, selectedYear.year]);

  const prevAmounts = isRevenue
    ? revenuePrevAmounts
    : getPrevYearAmounts(selectedYear.year, dataMode);

  const execRates = useMemo(
    () =>
      !isRevenue && dataMode === "settlement"
        ? getExecutionRates(selectedYear.year)
        : null,
    [isRevenue, selectedYear.year, dataMode]
  );
  // 現在表示中の階層の前年比
  const prevYearRevenue = isRevenue ? getRevenueYear(selectedYear.year - 1) : null;
  const prevTotal =
    path.length === 0
      ? isRevenue
        ? prevYearRevenue?.total ?? null
        : getPrevYearTotal(selectedYear.year, dataMode)
      : prevAmounts?.get(path[path.length - 1].id) ?? null;
  const totalYoy = yoyPercent(currentTotal, prevTotal ?? undefined);

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

  const handleSideChange = (mode: SideMode) => {
    // 歳出↔歳入は item ID 体系が異なるためパスをリセット
    setSideMode(mode);
    setPath([]);
    setRecipientItemId(null);
    if (mode === "revenue") setDataMode("budget");
  };

  const sourceLabel = isRevenue
    ? "予算書（歳入）"
    : dataMode === "settlement"
    ? "決算書"
    : "予算書";
  const totalLabel = isRevenue
    ? "一般会計歳入予算合計"
    : dataMode === "settlement"
    ? "一般会計歳出決算額"
    : "一般会計歳出予算合計";

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
            {/* 納税額シミュレーター */}
            <Link
              href="/simulator"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Calculator size={14} />
              <span>シミュレーター</span>
            </Link>
            {/* このサイトについて */}
            <Link
              href="/about"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm text-slate-500 hover:text-slate-800 transition-colors"
            >
              <Info size={14} />
              <span>このサイトについて</span>
            </Link>
            {/* 歳出/歳入 切替 */}
            <div className="flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1">
              <button
                onClick={() => handleSideChange("spending")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  !isRevenue
                    ? "bg-[#1a365d] text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <TrendingDown size={13} />
                歳出
              </button>
              <button
                onClick={() => handleSideChange("revenue")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  isRevenue
                    ? "bg-teal-600 text-white shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                <TrendingUp size={13} />
                歳入
              </button>
            </div>

            {/* 予算/決算 切替（歳入時は無効表示にして位置を固定） */}
            <div
              className={`flex items-center gap-1 bg-slate-100 border border-slate-200 rounded-xl p-1 transition-opacity ${
                isRevenue ? "opacity-40 pointer-events-none" : ""
              }`}
              aria-disabled={isRevenue}
              title={isRevenue ? "歳入は当初予算のみ表示できます" : undefined}
            >
              <button
                onClick={() => handleModeChange("budget")}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                  !isRevenue && dataMode === "budget"
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
                    : !isRevenue && dataMode === "settlement"
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
        {/* 決算未公開バナー（歳出時のみ） */}
        {!isRevenue && dataMode === "budget" && !settlementAvailable && (
          <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 mb-4 text-xs text-amber-700">
            <Clock size={13} />
            <span>
              {selectedYear.label}の決算データは未公開です（財務省が翌年秋頃に公表）。
              令和5年度・令和6年度は決算を表示できます。
            </span>
          </div>
        )}

        {/* 歳入の説明バナー */}
        {isRevenue && (
          <div className="flex items-start gap-2 bg-teal-50 border border-teal-200 rounded-xl px-4 py-2.5 mb-4 text-xs text-teal-700">
            <Info size={13} className="mt-0.5 shrink-0" />
            <span>
              「税金の出どころ」＝一般会計の歳入です。歳入総額は歳出総額と一致します。
              約4分の1が公債金（借金）で賄われている点にご注目ください。
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
                  isRevenue
                    ? "bg-teal-50 text-teal-700 border border-teal-200"
                    : dataMode === "settlement"
                    ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                    : "bg-indigo-50 text-indigo-700 border border-indigo-200"
                }`}
              >
                {isRevenue
                  ? "歳入（当初予算）"
                  : dataMode === "settlement"
                  ? "決算（確定値）"
                  : "予算（当初予算）"}
              </span>
            </div>

            {/* ヘッダー行 */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
              <div>
                <div className="flex items-baseline gap-3 flex-wrap">
                  <span className="text-4xl font-bold text-slate-900">
                    {formatAmount(currentTotal)}
                  </span>
                  {totalYoy !== null && (
                    <span
                      className={`text-sm font-mono ${
                        totalYoy > 0.05
                          ? "text-rose-500"
                          : totalYoy < -0.05
                          ? "text-emerald-600"
                          : "text-slate-400"
                      }`}
                      title="前年度比"
                    >
                      前年比 {totalYoy > 0.05 ? "+" : ""}
                      {totalYoy.toFixed(1)}%
                    </span>
                  )}
                  {path.length > 0 && (
                    <span className="text-sm text-slate-500">
                      歳出総額{formatAmount(activeData.total)}の{" "}
                      {((currentTotal / activeData.total) * 100).toFixed(1)}%
                    </span>
                  )}
                </div>
                <p className="text-sm text-slate-500 mt-1">
                  {path.length === 0 && (
                    <>
                      {activeData.label} {totalLabel}
                      <span className="mx-2 text-slate-300">|</span>
                    </>
                  )}
                  国民1人あたり{" "}
                  {formatPerCapita(perCapitaYen(currentTotal, selectedYear.year))}
                </p>
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
                prevAmounts={prevAmounts}
                execRates={execRates}
                year={selectedYear.year}
              />
            ) : (
              <div className="flex flex-col items-center justify-center py-16 text-slate-400">
                <ExternalLink size={32} className="mb-3 opacity-40" />
                <p className="text-sm">これ以上の内訳データはありません</p>
              </div>
            )}

            {!recipientItemId && (
              <p className="text-xs text-slate-400 mt-5 text-right">
                ▶ のある項目はクリックでさらに内訳へ
                {!isRevenue && (
                  <>
                    &nbsp;|&nbsp;
                    <List size={11} className="inline mb-0.5 mx-1" />
                    のある項目は支払先一覧へ
                  </>
                )}
                &nbsp;|&nbsp; 出典: 財務省「{activeData.label}{sourceLabel}」
              </p>
            )}
          </div>
        )}

        {activeTab === "ranking" && <RankingPanel budget={activeData} topN={20} />}
      </div>

      {/* 解説文＋項目インデックス（SEO・内部リンク） */}
      <div className="border-t border-slate-100 pt-12 mt-4">
        <HomeContent />
      </div>

      <footer className="max-w-4xl mx-auto px-4 py-6 mt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
        <span>© {new Date().getFullYear()} YUKUE</span>
        <div className="flex items-center gap-4">
          <Link href="/simulator" className="hover:text-slate-700 transition-colors">納税額シミュレーター</Link>
          <Link href="/about" className="hover:text-slate-700 transition-colors">このサイトについて</Link>
          <a href="https://united-futures.com/contact/" target="_blank" rel="noopener noreferrer" className="hover:text-slate-700 transition-colors">お問い合わせ</a>
          <Link href="/privacy" className="hover:text-slate-700 transition-colors">プライバシーポリシー</Link>
        </div>
      </footer>
    </main>
  );
}
