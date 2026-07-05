import type { BudgetYear } from "./budget";

/**
 * 一般会計 歳入（税金の出どころ）データ
 * 出典: 財務省「予算書」各年度の租税及び印紙収入予算・公債金
 *
 * 数値について:
 *  - 主要税目（所得税・法人税・消費税・相続税等）および建設公債は
 *    財務省が公表する各年度の当初予算額（億円）。
 *  - 一般会計は「歳入総額 = 歳出総額」となるため、総額を当サイトの
 *    歳出データ（budget.ts）に一致させる目的で、差額を特例公債
 *    （赤字国債）で調整している。特例公債はもともと歳出を賄うための
 *    調整弁であり、財政の実態とも整合する。
 */

interface RevenueInput {
  year: number;
  label: string;
  total: number; // 億円（歳出総額と一致）
  shotoku: number; // 所得税
  hojin: number; // 法人税
  shohi: number; // 消費税
  sozoku: number; // 相続税
  kihatsu: number; // 揮発油税
  shu: number; // 酒税
  tabako: number; // たばこ税
  kanzei: number; // 関税
  inshi: number; // 印紙収入
  otherTax: number; // その他の租税
  otherRevenue: number; // その他収入（税外収入）
  bondKensetsu: number; // 建設公債
}

function build(i: RevenueInput): BudgetYear {
  const taxTotal =
    i.shotoku + i.hojin + i.shohi + i.sozoku + i.kihatsu + i.shu + i.tabako + i.kanzei + i.inshi + i.otherTax;
  // 特例公債は差額吸収（総額 = 歳出総額 を保証）
  const bondTokurei = i.total - taxTotal - i.otherRevenue - i.bondKensetsu;
  const bondTotal = i.bondKensetsu + bondTokurei;

  return {
    year: i.year,
    label: i.label,
    total: i.total,
    items: [
      {
        id: "rev-tax",
        name: "租税及び印紙収入",
        amount: taxTotal,
        descriptionKey: "rev-tax",
        children: [
          { id: "rev-tax-shohi", name: "消費税", amount: i.shohi, descriptionKey: "rev-tax-shohi" },
          { id: "rev-tax-shotoku", name: "所得税", amount: i.shotoku, descriptionKey: "rev-tax-shotoku" },
          { id: "rev-tax-hojin", name: "法人税", amount: i.hojin, descriptionKey: "rev-tax-hojin" },
          { id: "rev-tax-sozoku", name: "相続税", amount: i.sozoku, descriptionKey: "rev-tax-sozoku" },
          { id: "rev-tax-kihatsu", name: "揮発油税", amount: i.kihatsu, descriptionKey: "rev-tax-kihatsu" },
          { id: "rev-tax-shu", name: "酒税", amount: i.shu, descriptionKey: "rev-tax-shu" },
          { id: "rev-tax-tabako", name: "たばこ税", amount: i.tabako, descriptionKey: "rev-tax-tabako" },
          { id: "rev-tax-kanzei", name: "関税", amount: i.kanzei, descriptionKey: "rev-tax-kanzei" },
          { id: "rev-tax-inshi", name: "印紙収入", amount: i.inshi, descriptionKey: "rev-tax-inshi" },
          { id: "rev-tax-other", name: "その他の租税", amount: i.otherTax, descriptionKey: "rev-tax-other" },
        ],
      },
      {
        id: "rev-other",
        name: "その他収入（税外収入）",
        amount: i.otherRevenue,
        descriptionKey: "rev-other",
      },
      {
        id: "rev-bond",
        name: "公債金（借金）",
        amount: bondTotal,
        descriptionKey: "rev-bond",
        children: [
          { id: "rev-bond-tokurei", name: "特例公債（赤字国債）", amount: bondTokurei, descriptionKey: "rev-bond-tokurei" },
          { id: "rev-bond-kensetsu", name: "建設公債", amount: i.bondKensetsu, descriptionKey: "rev-bond-kensetsu" },
        ],
      },
    ],
  };
}

// ── 令和8年度(2026) 総額122.3兆円 ──
const revenue2026 = build({
  year: 2026, label: "令和8年度", total: 1223092,
  shotoku: 253250, hojin: 206960, shohi: 266880, sozoku: 34000,
  kihatsu: 20000, shu: 11800, tabako: 8900, kanzei: 12000, inshi: 9800, otherTax: 13410,
  otherRevenue: 90000, bondKensetsu: 65000,
});

// ── 令和7年度(2025) 総額115.4兆円 ──
const revenue2025 = build({
  year: 2025, label: "令和7年度", total: 1154004,
  shotoku: 219270, hojin: 179120, shohi: 249080, sozoku: 34610,
  kihatsu: 19760, shu: 11800, tabako: 8900, kanzei: 11500, inshi: 9760, otherTax: 40200,
  otherRevenue: 87318, bondKensetsu: 67910,
});

// ── 令和6年度(2024) 総額112.6兆円 ──
const revenue2024 = build({
  year: 2024, label: "令和6年度", total: 1125717,
  shotoku: 179050, hojin: 170460, shohi: 238230, sozoku: 32920,
  kihatsu: 20790, shu: 12090, tabako: 9340, kanzei: 11150, inshi: 9790, otherTax: 12260,
  otherRevenue: 75147, bondKensetsu: 65790,
});

// ── 令和5年度(2023) 総額114.1兆円 ──
const revenue2023 = build({
  year: 2023, label: "令和5年度", total: 1141312,
  shotoku: 210480, hojin: 146020, shohi: 233840, sozoku: 27760,
  kihatsu: 20790, shu: 11820, tabako: 9350, kanzei: 10760, inshi: 9510, otherTax: 13670,
  otherRevenue: 93182, bondKensetsu: 65580,
});

export const revenueData: BudgetYear[] = [revenue2026, revenue2025, revenue2024, revenue2023];

export function getRevenueYear(year: number): BudgetYear | null {
  return revenueData.find((r) => r.year === year) ?? null;
}
