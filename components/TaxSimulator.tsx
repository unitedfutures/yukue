"use client";

import { useState, useMemo } from "react";
import { budgetData } from "@/data/budget";
import { Calculator, Info } from "lucide-react";

const COLORS = [
  "#6366f1", "#06b6d4", "#10b981", "#f59e0b", "#ef4444",
  "#8b5cf6", "#ec4899", "#14b8a6", "#f97316", "#84cc16",
  "#3b82f6", "#a78bfa",
];

/** 給与所得控除（令和6年分以降） */
function salaryDeduction(income: number): number {
  if (income <= 1_625_000) return 550_000;
  if (income <= 1_800_000) return income * 0.4 - 100_000;
  if (income <= 3_600_000) return income * 0.3 + 80_000;
  if (income <= 6_600_000) return income * 0.2 + 440_000;
  if (income <= 8_500_000) return income * 0.1 + 1_100_000;
  return 1_950_000;
}

/** 所得税額（速算表・復興特別所得税込み） */
function incomeTax(taxable: number): number {
  if (taxable <= 0) return 0;
  let tax: number;
  if (taxable <= 1_950_000) tax = taxable * 0.05;
  else if (taxable <= 3_300_000) tax = taxable * 0.1 - 97_500;
  else if (taxable <= 6_950_000) tax = taxable * 0.2 - 427_500;
  else if (taxable <= 9_000_000) tax = taxable * 0.23 - 636_000;
  else if (taxable <= 18_000_000) tax = taxable * 0.33 - 1_536_000;
  else if (taxable <= 40_000_000) tax = taxable * 0.4 - 2_796_000;
  else tax = taxable * 0.45 - 4_796_000;
  return Math.floor(tax * 1.021); // 復興特別所得税 2.1%
}

function formatYen(yen: number): string {
  if (yen >= 10_000) {
    const man = yen / 10_000;
    return `${man >= 100 ? Math.round(man).toLocaleString() : man.toFixed(1)}万円`;
  }
  return `${Math.round(yen).toLocaleString()}円`;
}

export default function TaxSimulator() {
  const [incomeMan, setIncomeMan] = useState(500); // 年収（万円）

  const latestBudget = budgetData[0];

  const result = useMemo(() => {
    const income = incomeMan * 10_000;
    const deduction = salaryDeduction(income);
    const socialInsurance = Math.min(income * 0.15, 2_500_000); // 概算15%
    const basicDeduction = income <= 24_000_000 ? 480_000 : 0;
    const taxable =
      Math.floor(Math.max(income - deduction - socialInsurance - basicDeduction, 0) / 1000) *
      1000;
    const tax = incomeTax(taxable);
    return { income, deduction, socialInsurance, taxable, tax };
  }, [incomeMan]);

  const allocations = useMemo(() => {
    return latestBudget.items
      .map((item) => ({
        id: item.id,
        name: item.name,
        share: item.amount / latestBudget.total,
        yen: result.tax * (item.amount / latestBudget.total),
      }))
      .sort((a, b) => b.yen - a.yen);
  }, [latestBudget, result.tax]);

  return (
    <div className="space-y-8">
      {/* 入力エリア */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <label htmlFor="income" className="block text-sm font-medium text-slate-700 mb-3">
          年収（給与収入）
        </label>
        <div className="flex items-center gap-4 mb-4">
          <input
            type="number"
            id="income"
            min={100}
            max={3000}
            step={10}
            value={incomeMan}
            onChange={(e) => setIncomeMan(Math.max(0, Number(e.target.value)))}
            className="w-32 px-4 py-2.5 rounded-xl border border-slate-200 text-lg font-mono text-slate-900 text-right focus:outline-none focus:ring-2 focus:ring-[#1a365d]/20 focus:border-[#1a365d]"
          />
          <span className="text-sm text-slate-600">万円</span>
        </div>
        <input
          type="range"
          min={100}
          max={2000}
          step={10}
          value={Math.min(incomeMan, 2000)}
          onChange={(e) => setIncomeMan(Number(e.target.value))}
          className="w-full accent-[#1a365d]"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-1">
          <span>100万円</span>
          <span>1,000万円</span>
          <span>2,000万円</span>
        </div>
      </div>

      {/* 税額サマリー */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-slate-50 border border-slate-200 rounded-2xl p-5">
          <p className="text-xs text-slate-500 mb-1">課税所得（概算）</p>
          <p className="text-xl font-bold font-mono text-slate-700">
            {formatYen(result.taxable)}
          </p>
        </div>
        <div className="bg-[#1a365d] rounded-2xl p-5 sm:col-span-2">
          <p className="text-xs text-slate-300 mb-1">あなたの所得税額（概算・復興特別所得税込み）</p>
          <p className="text-3xl font-bold font-mono text-white">
            {result.tax.toLocaleString()}
            <span className="text-lg ml-1">円</span>
          </p>
        </div>
      </div>

      {/* 配分結果 */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center gap-2 mb-1">
          <Calculator size={17} className="text-[#1a365d]" />
          <h2 className="text-lg font-bold text-slate-900">
            あなたの所得税はこう使われる
          </h2>
        </div>
        <p className="text-xs text-slate-400 mb-5">
          {latestBudget.label}一般会計歳出の構成比で按分した試算
        </p>

        <div className="space-y-3">
          {allocations.map((a, i) => (
            <div key={a.id}>
              <div className="flex items-center gap-3 mb-1">
                <span
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: COLORS[i % COLORS.length] }}
                />
                <span className="flex-1 text-sm text-slate-800 truncate">{a.name}</span>
                <span className="text-xs text-slate-400 w-12 text-right">
                  {(a.share * 100).toFixed(1)}%
                </span>
                <span className="text-sm font-mono text-slate-700 w-28 text-right">
                  {a.yen >= 1
                    ? `${Math.round(a.yen).toLocaleString()}円`
                    : "1円未満"}
                </span>
              </div>
              <div className="ml-5.5 h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-300"
                  style={{
                    width: `${Math.max(a.share * 100, 0.5)}%`,
                    background: COLORS[i % COLORS.length],
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 注意書き */}
      <div className="flex items-start gap-3 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-xs text-amber-800 leading-relaxed">
        <Info size={14} className="mt-0.5 shrink-0" />
        <div>
          <p className="mb-1">この試算は以下の前提による概算です。実際の税額とは異なります。</p>
          <ul className="list-disc pl-4 space-y-0.5 text-amber-700">
            <li>給与所得者・独身・扶養なしを想定（各種控除は基礎控除48万円のみ）</li>
            <li>社会保険料は年収の15%で概算（上限250万円）</li>
            <li>住民税・消費税等は含まず、国の所得税のみを対象</li>
            <li>実際の税金は特定の使途に紐づかないため、歳出構成比による按分はあくまでイメージです</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
