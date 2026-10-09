import { budgetData, BudgetItem, BudgetYear } from "./budget";

/**
 * 支出の「性質別」分類。
 * 既存の目的別ツリー（budget.ts）を横断し、各予算項目を
 * 「お金の性質」でとらえ直して集計する。
 *
 * 金額は財務省ベースの budget.ts から算出するため総額は正確。
 * ただし、どの事業をどの性質に入れるかの分類は当サイトの編集判断であり、
 * 政府の公式統計分類とは異なる。補助金の対象（大企業/中小/個人）の内訳は
 * 事業単位の推計を含む。
 */

export interface NatureCategory {
  key: string;
  label: string;
  short: string;
  description: string;
  /** 代表的な内訳項目（/items/{id} へリンク） */
  examples: { id: string; label: string }[];
}

export const natureCategories: NatureCategory[] = [
  {
    key: "kyufu",
    label: "個人・世帯への給付",
    short: "個人向け",
    description:
      "年金・医療・介護・児童手当・生活保護・失業給付・奨学金など、国民一人ひとりや世帯に直接届く給付（現金・現物）。ご提示の「補助金（個人向け）」にあたり、歳出の最大の塊です。",
    examples: [
      { id: "social-pension", label: "年金" },
      { id: "social-medical", label: "医療" },
      { id: "social-welfare-seikatsu", label: "生活保護費" },
      { id: "edu-ikuei", label: "奨学金" },
    ],
  },
  {
    key: "saimu",
    label: "国債費（借金の返済・利払い）",
    short: "国債費",
    description:
      "過去に発行した国債（国の借金）の元本返済と利子の支払い。政策的な支出ではなく、過去の借金のツケを払う義務的経費です。",
    examples: [
      { id: "bond-repay", label: "国債償還費" },
      { id: "bond-interest", label: "利子及割引料" },
    ],
  },
  {
    key: "chiho",
    label: "地方への財政移転",
    short: "地方移転",
    description:
      "地方交付税・地方譲与税など、国の税収の一部を地方公共団体に配分するお金。使い道は自治体に委ねられ、地域の行政サービスを支えます。",
    examples: [
      { id: "localalloc-kotei", label: "地方交付税交付金" },
      { id: "localalloc-joto", label: "地方譲与税譲与金" },
    ],
  },
  {
    key: "chokusetsu",
    label: "国の事業費・行政運営費（直接支出）",
    short: "直接支出",
    description:
      "公共事業（道路・河川・港湾）、防衛装備の調達、研究開発、施設整備、各省庁の行政運営費など、国が自ら行う事業への支出。ご提示の「直接支出」にあたります。",
    examples: [
      { id: "public", label: "公共事業関係費" },
      { id: "defense-busshi", label: "装備品等購入費" },
      { id: "other-gyosei", label: "一般行政費" },
    ],
  },
  {
    key: "hojo",
    label: "企業・事業者等への補助金",
    short: "補助金",
    description:
      "中小企業・農林漁業者・エネルギー事業者・学校法人などへの補助金。ご提示の「補助金（大企業向け・中小向け）」にあたります。対象別の内訳は推計を含みます。",
    examples: [
      { id: "edu-shien", label: "私学助成等" },
      { id: "food-kome", label: "農業経営安定対策" },
      { id: "sme-shien", label: "中小企業支援対策" },
    ],
  },
  {
    key: "jinken",
    label: "人件費",
    short: "人件費",
    description:
      "国が雇う人への給与。自衛官の人件費や、国が1/3を負担する公立小中学校の教職員給与などを計上。国会議員の歳費もこの性質に含まれます（下記参照）。",
    examples: [
      { id: "defense-jinken", label: "防衛省 人件費・糧食費" },
      { id: "edu-gikyo", label: "義務教育費国庫負担金" },
    ],
  },
  {
    key: "kokusai",
    label: "国際協力（ODA等）",
    short: "国際協力",
    description:
      "開発途上国への政府開発援助（ODA）や、国連・国際機関への分担金・拠出金など、対外的な協力に使われるお金。",
    examples: [
      { id: "oda-oda", label: "政府開発援助（ODA）" },
      { id: "oda-kokusai", label: "国際機関分担金" },
    ],
  },
  {
    key: "sonota",
    label: "予備費・その他",
    short: "その他",
    description:
      "年度途中の緊急事態に備える予備費や、上記のいずれにも分類しにくい経費。",
    examples: [
      { id: "other-reserve", label: "予備費" },
      { id: "other-misc", label: "その他" },
    ],
  },
];

export const natureCategoryMap: Record<string, NatureCategory> = Object.fromEntries(
  natureCategories.map((c) => [c.key, c])
);

/**
 * 予算項目ID → 性質カテゴリ。
 * 指定した項目とその子孫に適用され、より深い項目で上書きできる。
 */
const natureMap: Record<string, string> = {
  // 社会保障 → 個人・世帯への給付
  social: "kyufu",
  // 国債費 → 国債費
  bond: "saimu",
  // 地方交付税等 → 地方移転
  localalloc: "chiho",
  // 防衛 → 直接支出（人件費のみ上書き）
  defense: "chokusetsu",
  "defense-jinken": "jinken",
  // 公共事業 → 直接支出
  public: "chokusetsu",
  // 文教・科学 → 既定は直接支出。内訳で上書き
  education: "chokusetsu",
  "edu-gikyo": "jinken", // 教職員給与負担
  "edu-shien": "hojo", // 私学助成等
  "edu-ikuei": "kyufu", // 奨学金（個人向け）
  // 食料・エネルギー・中小企業 → 補助金
  food: "hojo",
  energy: "hojo",
  sme: "hojo",
  // ODA → 国際協力
  oda: "kokusai",
  // その他 → 既定はその他。行政・司法等は直接支出に
  other: "sonota",
  "other-gyosei": "chokusetsu",
  "other-gaikoku": "chokusetsu",
  "other-justice": "chokusetsu",
};

export interface NatureResult {
  category: NatureCategory;
  amount: number; // 億円
  share: number; // %
}

/** 指定年度の歳出を性質別に集計する */
export function computeNatureBreakdown(year: BudgetYear): NatureResult[] {
  const totals: Record<string, number> = {};

  const walk = (items: BudgetItem[], inherited: string) => {
    for (const it of items) {
      const cat = natureMap[it.id] ?? inherited;
      if (it.children && it.children.length > 0) {
        walk(it.children, cat);
      } else {
        totals[cat] = (totals[cat] ?? 0) + it.amount;
      }
    }
  };
  walk(year.items, "sonota");

  return natureCategories
    .map((category) => ({
      category,
      amount: totals[category.key] ?? 0,
      share: ((totals[category.key] ?? 0) / year.total) * 100,
    }))
    .filter((r) => r.amount > 0)
    .sort((a, b) => b.amount - a.amount);
}

export function getLatestNatureBreakdown(): { year: BudgetYear; results: NatureResult[] } {
  const year = budgetData[0];
  return { year, results: computeNatureBreakdown(year) };
}

/**
 * 「企業・事業者等への補助金」の対象別内訳（推計）。
 * 当初予算ベース。大企業向けの大型補助（半導体・GX等）は主に補正予算・基金で
 * 計上されるため、当初予算のこの区分には大きくは現れない点に注意。
 */
export interface SubsidyBreakdownRow {
  label: string;
  target: string; // 大企業向け / 中小・小規模向け / 個人・家計向け 等
  amount: number;
  note?: string;
}

export const subsidyBreakdown: SubsidyBreakdownRow[] = [
  { label: "私学助成・学校法人等への補助", target: "学校法人・団体向け", amount: 19650 },
  { label: "農業・畜産・漁業の経営安定・価格対策", target: "中小・小規模（農林漁業者）向け", amount: 13300 },
  { label: "再生可能エネルギー・省エネルギー対策", target: "事業者・家計向け", amount: 9500, note: "省エネ家電補助など個人・家計向けを含む" },
  { label: "中小企業支援（ものづくり・IT導入等）", target: "中小・小規模向け", amount: 1730 },
];

export const subsidyNote =
  "当初予算ベースの推計。大企業向けの大型補助（半導体・GX・価格激変緩和等）は主に補正予算や基金を通じて措置されるため、当初予算のこの区分には大きくは現れません。";

/**
 * 国会議員の歳費（参考値）。
 * 一般会計の目的別ツリーでは国会費（その他）に内包され、単独では現れないため、
 * 公開情報（歳費法・議員数）から算出した参考値として別掲する。
 */
export const legislatorSalary = {
  perMemberManYen: 2181, // 1人あたり年額（歳費＋期末手当、万円）
  members: 713, // 衆465＋参248
  totalOku: 156, // 概算 約156億円
  note: "歳費（月129.4万円）と期末手当を合わせた議員1人あたり年額（約2,181万円）に議員数713人を乗じた概算。別途、調査研究広報滞在費（旧・文書通信交通滞在費／月100万円）が支給される。国会費は一般会計では「その他（一般行政費等）」に含まれる。出典: 国会議員の歳費、旅費及び手当等に関する法律。",
};
