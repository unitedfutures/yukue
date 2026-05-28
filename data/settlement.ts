import type { BudgetYear } from "./budget";

/**
 * 決算データ
 * 出典: 財務省「決算書」
 *
 * 利用可能な年度:
 *   - 令和5年度(2023): 確定済み
 *   - 令和6年度(2024): 2026年秋公開予定
 *   - 令和7年度(2025): 未確定
 *
 * CSVからのインポート方法:
 *   public/templates/settlement-template.csv に記載の形式で
 *   data/settlement-YYYY.csv を用意し、loadSettlement() を呼ぶ。
 */

// 令和5年度(2023) 決算 - 確定値
// 出典: 財務省「令和5年度国の一般会計決算書」
const settlement2023: BudgetYear = {
  year: 2023,
  label: "令和5年度",
  total: 1012861, // 億円 (歳出決算額 約101.3兆円)
  items: [
    {
      id: "social",
      name: "社会保障関係費",
      amount: 360200,
      children: [
        {
          id: "social-pension",
          name: "年金",
          amount: 126800,
          children: [
            { id: "social-pension-kosei", name: "厚生年金保険給付費", amount: 93200 },
            { id: "social-pension-kokumin", name: "国民年金給付費", amount: 22400 },
            { id: "social-pension-other", name: "その他年金関連", amount: 11200 },
          ],
        },
        {
          id: "social-medical",
          name: "医療",
          amount: 119400,
          children: [
            { id: "social-medical-kenko", name: "健康保険給付費", amount: 45800 },
            { id: "social-medical-roujin", name: "後期高齢者医療", amount: 37600 },
            { id: "social-medical-kokaho", name: "国民健康保険", amount: 22200 },
            { id: "social-medical-other", name: "その他医療費", amount: 13800 },
          ],
        },
        {
          id: "social-care",
          name: "介護",
          amount: 38600,
          children: [
            { id: "social-care-service", name: "介護給付費", amount: 31800 },
            { id: "social-care-other", name: "その他介護関連", amount: 6800 },
          ],
        },
        {
          id: "social-child",
          name: "少子化対策",
          amount: 28900,
          children: [
            { id: "social-child-jido", name: "児童手当", amount: 11900 },
            { id: "social-child-hoiku", name: "保育所関連", amount: 10500 },
            { id: "social-child-kodomo", name: "こども家庭庁関連", amount: 6500 },
          ],
        },
        {
          id: "social-welfare",
          name: "生活扶助等",
          amount: 39100,
          children: [
            { id: "social-welfare-seikatsu", name: "生活保護費", amount: 30300 },
            { id: "social-welfare-shogai", name: "障害者支援", amount: 8800 },
          ],
        },
        {
          id: "social-employment",
          name: "雇用",
          amount: 6200,
          children: [
            { id: "social-emp-koyohoken", name: "雇用保険", amount: 4100 },
            { id: "social-emp-other", name: "その他雇用対策", amount: 2100 },
          ],
        },
        { id: "social-other", name: "その他", amount: 1200 },
      ],
    },
    {
      id: "bond",
      name: "国債費",
      amount: 245800,
      children: [
        { id: "bond-interest", name: "利子及割引料", amount: 82100 },
        { id: "bond-repay", name: "国債償還費", amount: 163700 },
      ],
    },
    {
      id: "localalloc",
      name: "地方交付税交付金等",
      amount: 176500,
      children: [
        { id: "localalloc-kotei", name: "地方交付税交付金", amount: 148200 },
        { id: "localalloc-joto", name: "地方譲与税譲与金", amount: 21400 },
        { id: "localalloc-tokurei", name: "地方特例交付金等", amount: 6900 },
      ],
    },
    {
      id: "defense",
      name: "防衛関係費",
      amount: 66800,
      children: [
        { id: "defense-jinken", name: "人件費・糧食費", amount: 22100 },
        { id: "defense-busshi", name: "装備品等購入費", amount: 18900 },
        { id: "defense-kenkyu", name: "研究開発費", amount: 5800 },
        { id: "defense-shisetsu", name: "施設整備費", amount: 3700 },
        { id: "defense-ippan", name: "一般物件費", amount: 12600 },
        { id: "defense-other", name: "その他", amount: 3700 },
      ],
    },
    {
      id: "public",
      name: "公共事業関係費",
      amount: 55200,
      children: [
        { id: "public-road", name: "道路整備", amount: 13200 },
        { id: "public-flood", name: "治山治水", amount: 8100 },
        { id: "public-housing", name: "住宅・都市環境整備", amount: 5900 },
        { id: "public-agri", name: "農業農村整備", amount: 4600 },
        { id: "public-disaster", name: "災害復旧等", amount: 9800 },
        { id: "public-port", name: "港湾・空港・鉄道整備", amount: 2700 },
        { id: "public-forest", name: "林野公共事業", amount: 3300 },
        { id: "public-fishery", name: "漁港漁場整備", amount: 1800 },
        { id: "public-other", name: "その他公共事業", amount: 5800 },
      ],
    },
    {
      id: "education",
      name: "文教及び科学振興費",
      amount: 51800,
      children: [
        { id: "edu-gikyo", name: "義務教育費国庫負担金", amount: 15900 },
        { id: "edu-science", name: "科学技術振興費", amount: 13200 },
        { id: "edu-shien", name: "教育振興助成費", amount: 14400 },
        { id: "edu-ikuei", name: "育英事業費（奨学金）", amount: 5000 },
        { id: "edu-shisetsu", name: "教育施設費", amount: 3300 },
      ],
    },
    {
      id: "food",
      name: "食料安定供給関係費",
      amount: 11900,
      children: [
        { id: "food-kome", name: "農業経営安定対策", amount: 5000 },
        { id: "food-shokuhin", name: "食料品安定供給対策", amount: 3800 },
        { id: "food-other", name: "その他", amount: 3100 },
      ],
    },
    {
      id: "energy",
      name: "エネルギー対策費",
      amount: 8200,
      children: [
        { id: "energy-saisei", name: "再生可能エネルギー対策", amount: 3300 },
        { id: "energy-setsuyaku", name: "省エネルギー対策", amount: 2200 },
        { id: "energy-other", name: "その他エネルギー施策", amount: 2700 },
      ],
    },
    {
      id: "sme",
      name: "中小企業対策費",
      amount: 1600,
      children: [
        { id: "sme-shien", name: "中小企業支援対策", amount: 920 },
        { id: "sme-other", name: "その他", amount: 680 },
      ],
    },
    {
      id: "oda",
      name: "経済協力費",
      amount: 5100,
      children: [
        { id: "oda-oda", name: "政府開発援助（ODA）", amount: 3700 },
        { id: "oda-kokusai", name: "国際機関分担金", amount: 1400 },
      ],
    },
    {
      id: "other",
      name: "その他の事項経費等",
      amount: 29761,
      children: [
        { id: "other-reserve", name: "予備費（使用額）", amount: 3200 },
        { id: "other-gyosei", name: "一般行政費", amount: 16000 },
        { id: "other-justice", name: "司法・警察関係費", amount: 7000 },
        { id: "other-misc", name: "その他", amount: 3561 },
      ],
    },
  ],
};

// 決算データ: 年度 → データ のマップ
// 未確定年度は null
export const settlementData: Record<number, BudgetYear | null> = {
  2025: null, // 令和7年度: 未確定
  2024: null, // 令和6年度: 2026年秋公開予定
  2023: settlement2023,
};

export function hasSettlement(year: number): boolean {
  return settlementData[year] !== null;
}
