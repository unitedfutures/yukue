import { budgetData, BudgetItem, BudgetYear } from "./budget";
import { settlementData } from "./settlement";

/**
 * 分析用ユーティリティ
 * - 前年比（予算・決算）
 * - 執行率（決算額 ÷ 予算額)
 * - 国民1人あたり換算
 */

// 総務省「人口推計」各年10月1日時点の総人口（2025以降は将来推計）
export const populationByYear: Record<number, number> = {
  2023: 124_352_000,
  2024: 123_802_000,
  2025: 123_300_000,
  2026: 122_800_000,
};

const DEFAULT_POPULATION = 123_000_000;

/** BudgetYear ツリーを id → amount のマップに変換 */
export function flattenAmounts(year: BudgetYear): Map<string, number> {
  const map = new Map<string, number>();
  const walk = (items: BudgetItem[]) => {
    for (const item of items) {
      map.set(item.id, item.amount);
      if (item.children) walk(item.children);
    }
  };
  walk(year.items);
  return map;
}

/** 前年度の金額マップを取得（予算 or 決算）。前年度データがなければ null */
export function getPrevYearAmounts(
  year: number,
  mode: "budget" | "settlement"
): Map<string, number> | null {
  const prevYear = year - 1;
  const source =
    mode === "settlement"
      ? settlementData[prevYear] ?? null
      : budgetData.find((b) => b.year === prevYear) ?? null;
  return source ? flattenAmounts(source) : null;
}

/** 前年度の歳出総額（予算 or 決算）。なければ null */
export function getPrevYearTotal(
  year: number,
  mode: "budget" | "settlement"
): number | null {
  const prevYear = year - 1;
  const source =
    mode === "settlement"
      ? settlementData[prevYear] ?? null
      : budgetData.find((b) => b.year === prevYear) ?? null;
  return source?.total ?? null;
}

/** 執行率マップ（決算額 ÷ 予算額）。決算データがない年度は null */
export function getExecutionRates(year: number): Map<string, number> | null {
  const settlement = settlementData[year];
  const budget = budgetData.find((b) => b.year === year);
  if (!settlement || !budget) return null;

  const budgetAmounts = flattenAmounts(budget);
  const rates = new Map<string, number>();
  for (const [id, settled] of flattenAmounts(settlement)) {
    const budgeted = budgetAmounts.get(id);
    if (budgeted && budgeted > 0) {
      rates.set(id, settled / budgeted);
    }
  }
  return rates;
}

/** 前年比（%）。前年データがない・前年0 の場合は null */
export function yoyPercent(current: number, prev: number | undefined): number | null {
  if (prev === undefined || prev === 0) return null;
  return ((current - prev) / prev) * 100;
}

/** 億円 → 国民1人あたりの円 */
export function perCapitaYen(amountOku: number, year: number): number {
  const population = populationByYear[year] ?? DEFAULT_POPULATION;
  return (amountOku * 1e8) / population;
}

/** 1人あたり金額の表示用フォーマット */
export function formatPerCapita(yen: number): string {
  if (yen >= 10000) {
    const man = yen / 10000;
    return `約${man >= 10 ? Math.round(man).toLocaleString() : man.toFixed(1)}万円`;
  }
  if (yen >= 100) return `約${Math.round(yen).toLocaleString()}円`;
  if (yen >= 1) return `約${yen.toFixed(0)}円`;
  return `1円未満`;
}
