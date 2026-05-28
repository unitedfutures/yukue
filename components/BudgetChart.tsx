"use client";

import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useState } from "react";
import { BudgetItem, formatAmount, formatPercent } from "@/data/budget";
import { itemDescriptions, itemSourceUrls } from "@/data/descriptions";
import { Info, List, ExternalLink } from "lucide-react";
import { hasRecipients } from "@/data/recipients";

const COLORS = [
  "#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#84cc16",
  "#3b82f6", "#a78bfa",
];

interface Props {
  items: BudgetItem[];
  total: number;
  onSelect: (item: BudgetItem) => void;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function CustomTooltip({ active, payload }: any) {
  if (!active || !payload?.[0]) return null;
  const item: BudgetItem = payload[0].payload;
  const tot: number = payload[0].payload.__total;
  return (
    <div
      className="rounded-xl border border-indigo-500/30 px-4 py-3 text-sm shadow-xl max-w-[220px]"
      style={{ background: "rgba(15,23,42,0.97)" }}
    >
      <p className="font-semibold text-white mb-1">{item.name}</p>
      <p className="text-indigo-300 font-mono">{formatAmount(item.amount)}</p>
      <p className="text-slate-400 text-xs">{formatPercent(item.amount, tot)}</p>
    </div>
  );
}

export default function BudgetChart({ items, total, onSelect }: Props) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [descItem, setDescItem] = useState<BudgetItem | null>(null);

  const data = items.map((item, i) => ({
    ...item,
    __total: total,
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
        onMouseLeave={() => { setHoveredId(null); setDescItem(null); }}
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
                  // 別の項目にカーソルが当たったとき、descItemを更新または消去
                  if (leaf && desc && !hasRecipients(item.id)) {
                    setDescItem(item);
                  } else {
                    setDescItem(null);
                  }
                }}
                onMouseLeave={() => {
                  setHoveredId(null);
                  // descItem はここでは消さない — リスト外に出るまで維持
                }}
                className={`budget-card flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left w-full transition-all ${
                  isActive
                    ? leaf && !hasRecipients(item.id)
                      ? "border-emerald-400/60 bg-emerald-500/8"
                      : "border-cyan-400/60 bg-cyan-500/8"
                    : "border-white/8 bg-white/4 hover:border-white/15"
                } ${isDrillable(item) ? "cursor-pointer" : "cursor-default"}`}
              >
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="flex-1 text-sm text-slate-200 truncate">{item.name}</span>
                {leaf && desc && !hasRecipients(item.id) && (
                  <Info size={13} className={`flex-shrink-0 ${isActive ? "text-emerald-400" : "text-slate-600"}`} />
                )}
                {hasRecipients(item.id) && (
                  <List size={13} className={`flex-shrink-0 ${isActive ? "text-cyan-400" : "text-slate-500"}`} />
                )}
                <span className="text-xs text-slate-500 flex-shrink-0 w-12 text-right">
                  {formatPercent(item.amount, total)}
                </span>
                <span className="text-sm font-mono text-slate-300 flex-shrink-0 w-28 text-right">
                  {formatAmount(item.amount)}
                </span>
                {!leaf && !hasRecipients(item.id) && (
                  <span className="text-slate-500 text-xs flex-shrink-0">▶</span>
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
            <div className="rounded-xl border border-emerald-500/25 bg-emerald-500/6 px-4 py-3">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Info size={13} className="text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-emerald-400">{descItem.name}</span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                {getDesc(descItem)}
              </p>
              {getSourceUrl(descItem) && (
                <a
                  href={getSourceUrl(descItem)!}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="inline-flex items-center gap-1 mt-2 text-xs text-emerald-400 hover:text-emerald-300 underline underline-offset-2 transition-colors"
                >
                  <ExternalLink size={11} />
                  公式サイト
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

