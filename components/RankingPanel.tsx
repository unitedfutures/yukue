"use client";

import { BudgetYear, BudgetItem, formatAmount, formatPercent } from "@/data/budget";
import { Trophy } from "lucide-react";

const COLORS = [
  "#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#84cc16",
  "#3b82f6", "#a78bfa",
];

function flattenItems(items: BudgetItem[], depth = 0): { item: BudgetItem; depth: number }[] {
  return items.flatMap((item) => [
    { item, depth },
    ...(item.children ? flattenItems(item.children, depth + 1) : []),
  ]);
}

interface Props {
  budget: BudgetYear;
  topN?: number;
}

export default function RankingPanel({ budget, topN = 20 }: Props) {
  const all = flattenItems(budget.items);
  const ranked = [...all]
    .sort((a, b) => b.item.amount - a.item.amount)
    .slice(0, topN);

  return (
    <div className="bg-slate-900/60 border border-white/10 rounded-2xl p-6">
      <div className="flex items-center gap-2 mb-5">
        <Trophy size={18} className="text-yellow-400" />
        <h2 className="text-lg font-bold text-white">予算項目ランキング TOP{topN}</h2>
        <span className="text-xs text-slate-500 ml-1">（全階層）</span>
      </div>

      <div className="space-y-2">
        {ranked.map(({ item, depth }, i) => {
          const pct = (item.amount / budget.total) * 100;
          const barWidth = Math.max((item.amount / ranked[0].item.amount) * 100, 2);
          const color = COLORS[i % COLORS.length];

          return (
            <div key={`${item.id}-${i}`} className="group">
              <div className="flex items-center gap-3 mb-1">
                <span
                  className={`w-6 text-right text-xs font-mono flex-shrink-0 ${
                    i === 0 ? "text-yellow-400" : i === 1 ? "text-slate-300" : i === 2 ? "text-amber-600" : "text-slate-500"
                  }`}
                >
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1">
                    {depth > 0 && (
                      <span className="text-slate-600 text-xs flex-shrink-0">
                        {"└".repeat(1)}&nbsp;
                      </span>
                    )}
                    <span className="text-sm text-slate-200 truncate">{item.name}</span>
                  </div>
                </div>
                <span className="text-xs text-slate-500 flex-shrink-0 w-12 text-right">
                  {pct.toFixed(1)}%
                </span>
                <span className="text-sm font-mono text-slate-300 flex-shrink-0 w-28 text-right">
                  {formatAmount(item.amount)}
                </span>
              </div>
              <div className="ml-9 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${barWidth}%`, background: color }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-5 text-xs text-slate-600 text-right">
        出典: 財務省「{budget.label}予算書」
      </p>
    </div>
  );
}
