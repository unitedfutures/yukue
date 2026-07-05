import { budgetData, BudgetItem } from "./budget";
import { settlementData } from "./settlement";

/**
 * 項目別ページ（/items/[id]）用のデータインデックス
 * 全年度の予算ツリーを走査し、項目IDごとに
 * 祖先パス・年度別金額・子項目をまとめる。
 */

export interface ItemYearAmount {
  year: number;
  label: string;
  budget: number | null; // 億円
  settlement: number | null; // 億円
}

export interface ItemPageData {
  id: string;
  name: string;
  descriptionKey?: string;
  /** 祖先（トップ階層→親の順）。自身は含まない */
  ancestors: { id: string; name: string }[];
  /** 最新年度の子項目 */
  children: { id: string; name: string; amount: number }[];
  /** 兄弟項目（最新年度・自身を除く） */
  siblings: { id: string; name: string }[];
  /** 年度別金額（古い順） */
  years: ItemYearAmount[];
  /** 最新年度の金額・年度・歳出総額 */
  latest: { year: number; label: string; amount: number; total: number };
}

interface IndexEntry {
  item: BudgetItem;
  ancestors: { id: string; name: string }[];
  siblings: { id: string; name: string }[];
  year: number;
  label: string;
  total: number;
}

// 年度ごとの id → 金額マップと、最新出現年度のツリー情報を構築
const budgetAmountByYear = new Map<number, Map<string, number>>();
const settlementAmountByYear = new Map<number, Map<string, number>>();
const latestEntry = new Map<string, IndexEntry>(); // 最新年度を優先

function walk(
  items: BudgetItem[],
  ancestors: { id: string; name: string }[],
  year: number,
  label: string,
  total: number,
  amounts: Map<string, number>,
  register: boolean
) {
  for (const item of items) {
    amounts.set(item.id, item.amount);
    if (register && !latestEntry.has(item.id)) {
      latestEntry.set(item.id, {
        item,
        ancestors,
        siblings: items
          .filter((s) => s.id !== item.id)
          .map((s) => ({ id: s.id, name: s.name })),
        year,
        label,
        total,
      });
    }
    if (item.children) {
      walk(
        item.children,
        [...ancestors, { id: item.id, name: item.name }],
        year,
        label,
        total,
        amounts,
        register
      );
    }
  }
}

// budgetData は新しい年度順 [2026, 2025, 2024, 2023]
for (const by of budgetData) {
  const amounts = new Map<string, number>();
  walk(by.items, [], by.year, by.label, by.total, amounts, true);
  budgetAmountByYear.set(by.year, amounts);
}
for (const [yearStr, sy] of Object.entries(settlementData)) {
  if (!sy) continue;
  const amounts = new Map<string, number>();
  walk(sy.items, [], sy.year, sy.label, sy.total, amounts, false);
  settlementAmountByYear.set(Number(yearStr), amounts);
}

const allYears = budgetData
  .map((b) => ({ year: b.year, label: b.label }))
  .sort((a, b) => a.year - b.year);

export function getAllItemIds(): string[] {
  return [...latestEntry.keys()];
}

export function getItemData(id: string): ItemPageData | null {
  const entry = latestEntry.get(id);
  if (!entry) return null;

  const years: ItemYearAmount[] = allYears.map(({ year, label }) => ({
    year,
    label,
    budget: budgetAmountByYear.get(year)?.get(id) ?? null,
    settlement: settlementAmountByYear.get(year)?.get(id) ?? null,
  }));

  return {
    id,
    name: entry.item.name,
    descriptionKey: entry.item.descriptionKey,
    ancestors: entry.ancestors,
    children: (entry.item.children ?? []).map((c) => ({
      id: c.id,
      name: c.name,
      amount: c.amount,
    })),
    siblings: entry.siblings,
    years,
    latest: {
      year: entry.year,
      label: entry.label,
      amount: entry.item.amount,
      total: entry.total,
    },
  };
}
