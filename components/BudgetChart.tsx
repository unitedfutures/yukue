"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState, useEffect } from "react";
import Link from "next/link";
import { BudgetItem, formatAmount, formatPercent } from "@/data/budget";
import { itemDescriptions, itemSourceUrls } from "@/data/descriptions";
import { Info, List, ExternalLink, Users } from "lucide-react";
import { hasRecipients } from "@/data/recipients";
import { yoyPercent, perCapitaYen, formatPerCapita } from "@/data/analysis";

const COLORS = [
  "#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#84cc16",
  "#3b82f6", "#a78bfa",
];

interface Props {
  items: BudgetItem[];
  total: number;
  onSelect: (item: BudgetItem) => void;
  /** 前年度の id → 金額マップ（前年比表示用）。null なら非表示 */
  prevAmounts?: Map<string, number> | null;
  /** 執行率マップ（決算表示時のみ渡す）。null なら非表示 */
  execRates?: Map<string, number> | null;
  /** 1人あたり換算に使う年度 */
  year?: number;
}

function YoyBadge({ current, prev }: { current: number; prev: number | undefined }) {
  const pct = yoyPercent(current, prev);
  if (pct === null) {
    return (
      <span className="hidden sm:block text-[11px] text-slate-300 flex-shrink-0 w-14 text-right">
        —
      </span>
    );
  }
  const cls =
    pct > 0.05 ? "text-rose-500" : pct < -0.05 ? "text-emerald-600" : "text-slate-400";
  const sign = pct > 0.05 ? "+" : "";
  return (
    <span
      className={`hidden sm:block text-[11px] font-mono flex-shrink-0 w-14 text-right ${cls}`}
    >
      {sign}
      {pct.toFixed(1)}%
    </span>
  );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.[0]) return null;
  const item: BudgetItem = payload[0].payload;
  const tot: number = payload[0].payload.__total;
  const year: number | undefined = payload[0].payload.__year;
  return (
    <div
      className="rounded-xl border border-slate-200 px-4 py-3 text-sm max-w-[220px] bg-white"
      style={{ boxShadow: "0 4px 16px rgba(0,0,0,0.10)" }}
    >
      <p className="font-semibold text-slate-900 mb-1">{item.name}</p>
      <p className="text-indigo-600 font-mono">{formatAmount(item.amount)}</p>
      <p className="text-slate-500 text-xs">{formatPercent(item.amount, tot)}</p>
      {year && (
        <p className="text-slate-500 text-xs mt-1">
          国民1人あたり {formatPerCapita(perCapitaYen(item.amount, year))}
        </p>
      )}
    </div>
  );
}

export default function BudgetChart({
  items,
  total,
  onSelect,
  prevAmounts = null,
  execRates = null,
  year,
}: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [descItem, setDescItem] = useState<BudgetItem | null>(null);

  // items が変わったとき（ドリルダウン・戻る・年度切替）だけパネルをリセット
  useEffect(() => {
    setDescItem(null);
  }, [items]);

  const data = items.map((item, i) => ({
    ...item,
    __total: total,
    __year: year,
    fill: COLORS[i % COLORS.length],
  }));

  const isLeaf = (item: BudgetItem) => !item.children || item.children.length === 0;
  const isDrillable = (item: BudgetItem) => !isLeaf(item) || hasRecipients(item.id);
  const getDesc = (item: BudgetItem) =>
    item.descriptionKey ? itemDescriptions[item.descriptionKey] : null;
  const getSourceUrl = (item: BudgetItem) =>
    item.descriptionKey ? (itemSourceUrls[item.descriptionKey] ?? null) : null;

  return (
    <div className="flex flex-col lg:flex-row items-start gap-6">
      {/* Donut chart */}
      <div className="w-full lg:w-[340px] h-[320px] flex-shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={82}
              outerRadius={132}
              dataKey="amount"
              paddingAngle={1}
              onClick={(entry) => onSelect(entry as unknown as BudgetItem)}
              onMouseEnter={(entry) => setHoveredId((entry as unknown as BudgetItem).id)}
              onMouseLeave={() => setHoveredId(null)}
              style={{ cursor: "pointer" }}
            >
              {data.map((entry) => (
                <Cell
                  key={entry.id}
                  fill={entry.fill}
                  opacity={hoveredId && hoveredId !== entry.id ? 0.4 : 1}
                  stroke={hoveredId === entry.id ? "#fff" : "transparent"}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Right column: list + description panel */}
      <div
        className="flex-1 w-full flex flex-col gap-3"
        onMouseLeave={() => setHoveredId(null)}
      >
        {/* Item list */}
        <div className="grid grid-cols-1 gap-1.5">
          {data.map((item, i) => {
            const leaf = isLeaf(item);
            const desc = getDesc(item);
            const isActive = hoveredId === item.id;

            return (
              <button
                key={item.id}
                onClick={() => isDrillable(item) && onSelect(item)}
                onMouseEnter={() => {
                  setHoveredId(item.id);
                  // 説明付き葉項目のときだけパネルを更新
                  // それ以外の項目を通過してもパネルは消えない
                  if (leaf && desc && !hasRecipients(item.id)) {
                    setDescItem(item);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                }}
                className={`budget-card flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left w-full transition-all ${
                  isActive
                    ? leaf && !hasRecipients(item.id)
                      ? "border-emerald-300 bg-emerald-50"
                      : "border-cyan-300 bg-cyan-50"
                    : "border-slate-200 bg-slate-50 hover:border-slate-300 hover:bg-white"
                } ${isDrillable(item) ? "cursor-pointer" : "cursor-default"}`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="flex-1 text-sm text-slate-800 truncate">{item.name}</span>
                {leaf && desc && !hasRecipients(item.id) && (
                  <Info size={13} className={`flex-shrink-0 ${isActive ? "text-emerald-600" : "text-slate-400"}`} />
                )}
                {hasRecipients(item.id) && (
                  <List size={13} className={`flex-shrink-0 ${isActive ? "text-cyan-600" : "text-slate-400"}`} />
                )}
                {execRates && execRates.has(item.id) && (
                  <span className="hidden sm:block text-[10px] px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 border border-emerald-200 flex-shrink-0">
                    執行率{Math.round(execRates.get(item.id)! * 100)}%
                  </span>
                )}
                {prevAmounts && (
                  <YoyBadge current={item.amount} prev={prevAmounts.get(item.id)} />
                )}
                <span className="hidden sm:block text-xs text-slate-400 flex-shrink-0 w-12 text-right">
                  {formatPercent(item.amount, total)}
                </span>
                <span className="text-sm font-mono text-slate-700 flex-shrink-0 w-20 sm:w-28 text-right">
                  {formatAmount(item.amount)}
                </span>
                {!leaf && !hasRecipients(item.id) && (
                  <span className="text-slate-400 text-xs flex-shrink-0">▶</span>
                )}
              </button>
            );
          })}
        </div>

        {/* Description panel — appears when hovering a leaf with description */}
        <div
          className={`overflow-hidden transition-all duration-200 ${
            descItem ? "max-h-52 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {descItem && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1.5 flex-wrap">
                <Info size={13} className="text-emerald-600 flex-shrink-0" />
                <span className="text-xs font-semibold text-emerald-700">{descItem.name}</span>
                {year && (
                  <span className="inline-flex items-center gap-1 text-[10px] text-emerald-600 bg-white border border-emerald-200 rounded-md px-1.5 py-0.5 ml-auto">
                    <Users size={10} />
                    国民1人あたり {formatPerCapita(perCapitaYen(descItem.amount, year))}
                  </span>
                )}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {getDesc(descItem)}
              </p>
              <div className="flex items-center gap-4 mt-2">
                <Link
                  href={`/items/${descItem.id}`}
                  className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 underline underline-offset-2 transition-colors"
                >
                  詳細ページへ
                </Link>
                {getSourceUrl(descItem) && (
                  <a
                    href={getSourceUrl(descItem)!}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="inline-flex items-center gap-1 text-xs text-emerald-600 hover:text-emerald-800 underline underline-offset-2 transition-colors"
                  >
                    <ExternalLink size={11} />
                    公式サイト
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

