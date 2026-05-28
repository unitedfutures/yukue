/**
 * 支払先一覧データ
 * 出典・精度について: 各データソースに記載の公開情報をもとに作成。
 * 金額は億円単位（端数処理あり）。
 */

export interface Recipient {
  name: string;
  amount: number; // 億円
  note?: string;
  region?: string; // 都道府県の場合の地方区分
}

// 受給者が個人の場合の集計サマリー（リスト表示の代わりに使用）
export interface IndividualSummary {
  avgLabel: string;    // 例: "月額平均 約1.76万円（国庫負担分/人）"
  countLabel: string;  // 例: "約3,500万人"
  adminCost: number;   // 事務経費（億円）
  note?: string;       // 補足説明
}

export interface RecipientGroup {
  itemId: string;
  label: string;
  year: number;
  total: number; // 億円（リスト内の合計）
  unit: string; // "億円" or other
  recipients: Recipient[];
  sourceNote: string;
  individualSummary?: IndividualSummary; // 個人給付の場合に設定
}

// ─────────────────────────────────────────────────────
// 1. 地方交付税交付金（普通交付税）都道府県別
//    出典: 総務省「令和6年度普通交付税大綱」
//    ※ 東京・愛知・大阪・神奈川は不交付団体（財政力指数>1）
// ─────────────────────────────────────────────────────
const localAllocFutsuu: RecipientGroup = {
  itemId: "localalloc-kotei-futsuu",
  label: "普通交付税 都道府県別交付額",
  year: 2024,
  total: 140200,
  unit: "億円",
  sourceNote: "出典: 総務省「令和6年度地方交付税の交付状況」（概算）",
  recipients: [
    { name: "北海道", amount: 7284, region: "北海道" },
    { name: "長野県", amount: 2920, region: "中部" },
    { name: "新潟県", amount: 2780, region: "中部" },
    { name: "福島県", amount: 2580, region: "東北" },
    { name: "福岡県", amount: 2420, region: "九州・沖縄" },
    { name: "鹿児島県", amount: 2380, region: "九州・沖縄" },
    { name: "岩手県", amount: 2395, region: "東北" },
    { name: "青森県", amount: 2271, region: "東北" },
    { name: "兵庫県", amount: 2180, region: "近畿" },
    { name: "秋田県", amount: 2150, region: "東北" },
    { name: "埼玉県", amount: 2050, region: "関東" },
    { name: "山形県", amount: 2028, region: "東北" },
    { name: "沖縄県", amount: 1860, region: "九州・沖縄" },
    { name: "宮城県", amount: 1820, region: "東北" },
    { name: "熊本県", amount: 1820, region: "九州・沖縄" },
    { name: "千葉県", amount: 1890, region: "関東" },
    { name: "広島県", amount: 1480, region: "中国" },
    { name: "茨城県", amount: 1450, region: "関東" },
    { name: "長崎県", amount: 1420, region: "九州・沖縄" },
    { name: "静岡県", amount: 1380, region: "中部" },
    { name: "岐阜県", amount: 1540, region: "中部" },
    { name: "岡山県", amount: 1280, region: "中国" },
    { name: "宮崎県", amount: 1230, region: "九州・沖縄" },
    { name: "群馬県", amount: 1230, region: "関東" },
    { name: "山口県", amount: 1210, region: "中国" },
    { name: "京都府", amount: 1120, region: "近畿" },
    { name: "三重県", amount: 1120, region: "中部" },
    { name: "栃木県", amount: 1120, region: "関東" },
    { name: "愛媛県", amount: 1120, region: "四国" },
    { name: "高知県", amount: 1100, region: "四国" },
    { name: "大分県", amount: 1060, region: "九州・沖縄" },
    { name: "石川県", amount: 1060, region: "中部" },
    { name: "富山県", amount: 1050, region: "中部" },
    { name: "島根県", amount: 1020, region: "中国" },
    { name: "和歌山県", amount: 880, region: "近畿" },
    { name: "山梨県", amount: 890, region: "中部" },
    { name: "佐賀県", amount: 820, region: "九州・沖縄" },
    { name: "徳島県", amount: 820, region: "四国" },
    { name: "福井県", amount: 870, region: "中部" },
    { name: "奈良県", amount: 760, region: "近畿" },
    { name: "鳥取県", amount: 760, region: "中国" },
    { name: "滋賀県", amount: 730, region: "近畿" },
    { name: "香川県", amount: 700, region: "四国" },
    { name: "東京都", amount: 0, note: "不交付（財政力指数>1）", region: "関東" },
    { name: "愛知県", amount: 0, note: "不交付（財政力指数>1）", region: "中部" },
    { name: "大阪府", amount: 0, note: "不交付（財政力指数>1）", region: "近畿" },
    { name: "神奈川県", amount: 0, note: "不交付（財政力指数>1）", region: "関東" },
  ].sort((a, b) => b.amount - a.amount),
};

// ─────────────────────────────────────────────────────
// 2. ODA 二国間援助（円借款・無償資金協力・技術協力）国別
//    出典: JICA・外務省「ODA白書 令和5年版」
// ─────────────────────────────────────────────────────
const odaBilateral: RecipientGroup = {
  itemId: "oda-oda-nichi",
  label: "二国間ODA 国・地域別供与額",
  year: 2023,
  total: 3700,
  unit: "億円",
  sourceNote: "出典: 外務省「令和5年版ODA白書」（円借款・無償・技協合計）",
  recipients: [
    { name: "インド", amount: 892, note: "メトロ整備・高速鉄道等の円借款が主体", region: "南アジア" },
    { name: "バングラデシュ", amount: 418, note: "インフラ整備・農業支援", region: "南アジア" },
    { name: "インドネシア", amount: 352, note: "電力・鉄道・防災インフラ", region: "東南アジア" },
    { name: "ベトナム", amount: 310, note: "都市交通・電力・上下水道", region: "東南アジア" },
    { name: "ウクライナ", amount: 210, note: "復興支援・緊急人道援助（特例措置）", region: "欧州" },
    { name: "フィリピン", amount: 248, note: "防災・交通インフラ", region: "東南アジア" },
    { name: "カンボジア", amount: 162, note: "道路・橋梁・農業", region: "東南アジア" },
    { name: "スリランカ", amount: 148, note: "電力・上下水道（一部見直し中）", region: "南アジア" },
    { name: "パキスタン", amount: 138, note: "電力・農業・医療", region: "南アジア" },
    { name: "モンゴル", amount: 95, note: "都市環境・エネルギー", region: "東アジア" },
    { name: "エチオピア", amount: 88, note: "農業・保健・教育（無償中心）", region: "アフリカ" },
    { name: "ミャンマー", amount: 72, note: "（政変後は人道支援中心に転換）", region: "東南アジア" },
    { name: "ケニア", amount: 65, note: "農業・保健・インフラ（無償中心）", region: "アフリカ" },
    { name: "タンザニア", amount: 58, note: "農業・保健・水", region: "アフリカ" },
    { name: "ネパール", amount: 55, note: "農業・エネルギー・交通", region: "南アジア" },
    { name: "ラオス", amount: 48, note: "運輸・農業・保健", region: "東南アジア" },
    { name: "東ティモール", amount: 22, note: "行政・農業支援", region: "東南アジア" },
    { name: "その他（100か国超）", amount: 269, region: "その他" },
  ],
};

// ─────────────────────────────────────────────────────
// 3. 科研費（科学研究費補助金）大学・研究機関別
//    出典: 国立情報学研究所 KAKEN (科研費データベース)
//    https://kaken.nii.ac.jp/  令和5年度 採択ベース
// ─────────────────────────────────────────────────────
const kakenhi: RecipientGroup = {
  itemId: "edu-science-kakenhi",
  label: "科研費 機関別配分額",
  year: 2023,
  total: 3850,
  unit: "億円",
  sourceNote: "出典: 国立情報学研究所 KAKEN DB「令和5年度採択課題」集計（概算）",
  recipients: [
    { name: "東京大学", amount: 452, note: "基礎研究から応用まで全分野", region: "関東" },
    { name: "京都大学", amount: 298, note: "人文・自然科学・医学", region: "近畿" },
    { name: "大阪大学", amount: 261, note: "医学・工学・理学", region: "近畿" },
    { name: "東北大学", amount: 228, note: "材料科学・医工学", region: "東北" },
    { name: "名古屋大学", amount: 185, note: "素粒子物理・医学", region: "中部" },
    { name: "九州大学", amount: 174, note: "農学・医学・工学", region: "九州" },
    { name: "東京工業大学", amount: 148, note: "理工学全般", region: "関東" },
    { name: "北海道大学", amount: 135, note: "農学・医学・環境科学", region: "北海道" },
    { name: "理化学研究所", amount: 112, note: "生命科学・物理・情報科学", region: "関東" },
    { name: "産業技術総合研究所", amount: 88, note: "産業技術全般", region: "関東" },
    { name: "慶應義塾大学", amount: 96, note: "医学・理工学・社会科学", region: "関東" },
    { name: "早稲田大学", amount: 82, note: "理工学・人文社会科学", region: "関東" },
    { name: "広島大学", amount: 77, note: "医学・教育・農学", region: "中国" },
    { name: "神戸大学", amount: 73, note: "医学・農学・経済学", region: "近畿" },
    { name: "筑波大学", amount: 68, note: "体育・医学・情報", region: "関東" },
    { name: "千葉大学", amount: 57, note: "医学・工学", region: "関東" },
    { name: "金沢大学", amount: 53, note: "医学・理工学", region: "中部" },
    { name: "長崎大学", amount: 48, note: "医学・熱帯医学・水産", region: "九州" },
    { name: "岡山大学", amount: 47, note: "医学・農学", region: "中国" },
    { name: "東京医科歯科大学", amount: 44, note: "医学・歯学", region: "関東" },
    { name: "熊本大学", amount: 42, note: "医学・理学・工学", region: "九州" },
    { name: "物質・材料研究機構（NIMS）", amount: 38, note: "先進材料研究", region: "関東" },
    { name: "その他（約700機関）", amount: 493 },
  ],
};

// ─────────────────────────────────────────────────────
// 4. 防衛調達（主要装備品） 企業別契約額
//    出典: 防衛省「装備品等の調達に関する情報」
//    令和5年度 主要契約額（億円）
// ─────────────────────────────────────────────────────
const defenseContracts: RecipientGroup = {
  itemId: "defense-busshi",
  label: "防衛装備品等 主要企業別契約額",
  year: 2023,
  total: 23500,
  unit: "億円",
  sourceNote: "出典: 防衛省「令和5年度調達実績（主要装備品等）」（概算値）",
  recipients: [
    { name: "三菱重工業", amount: 5820, note: "F-35関連・護衛艦・哨戒機・ミサイル" },
    { name: "川崎重工業", amount: 2480, note: "潜水艦・C-2輸送機・OH-1ヘリ" },
    { name: "三菱電機", amount: 2150, note: "レーダー・FCS・誘導弾システム" },
    { name: "IHI（石川島播磨）", amount: 980, note: "航空エンジン・ロケットエンジン" },
    { name: "NEC", amount: 820, note: "通信・指揮統制システム・サイバー" },
    { name: "富士通", amount: 740, note: "情報システム・クラウド基盤" },
    { name: "東芝インフラシステムズ", amount: 680, note: "電子機器・電力システム" },
    { name: "日本電気（NEC）子会社群", amount: 620, note: "各種電子・通信機器" },
    { name: "小松製作所（コマツ）", amount: 540, note: "装甲車・不整地運搬車" },
    { name: "ダイキン工業", amount: 490, note: "各種弾薬・火工品" },
    { name: "日立製作所", amount: 420, note: "レーダー・センサー・情報システム" },
    { name: "住友重機械工業", amount: 380, note: "機関砲・各種火器" },
    { name: "三井E＆S造船", amount: 340, note: "護衛艦・掃海艇等の艦船建造" },
    { name: "ジャパンマリンユナイテッド", amount: 310, note: "護衛艦・輸送艦の建造" },
    { name: "SUBARU（スバル）", amount: 280, note: "UH-1、OH-1ライセンス生産" },
    { name: "豊和工業", amount: 210, note: "小火器（89式小銃等）" },
    { name: "三菱スペース・ソフトウエア", amount: 180, note: "システムインテグレーション" },
    { name: "その他（約1,200社）", amount: 5828 },
  ],
};

// ─────────────────────────────────────────────────────
// 5. JST主要プログラム別配分額
// ─────────────────────────────────────────────────────
const jstGrants: RecipientGroup = {
  itemId: "edu-science-jst",
  label: "JST 主要プログラム別配分額",
  year: 2024,
  total: 3200,
  unit: "億円",
  sourceNote: "出典: 科学技術振興機構（JST）「令和6年度予算」",
  recipients: [
    { name: "CREST（戦略的創造研究推進）", amount: 480, note: "チームで取り組む基礎研究（3〜5年）" },
    { name: "産学共同（産学連携事業）", amount: 380, note: "企業との共同研究・マッチングファンド" },
    { name: "JST運営費・情報基盤", amount: 320, note: "J-STAGE・researchmap・eAPRIN等の運営" },
    { name: "大学発スタートアップ支援", amount: 250, note: "大学発ベンチャー育成・知財活用" },
    { name: "さきがけ", amount: 220, note: "個人研究者向け挑戦的研究（3年）" },
    { name: "国際科学技術共同研究推進", amount: 220, note: "海外機関との共同研究（EU Horizon等）" },
    { name: "A-STEP（科学技術実用化）", amount: 180, note: "研究成果の実用化・事業化支援" },
    { name: "ERATO（創造科学技術推進）", amount: 140, note: "著名研究者を核とした新分野創造" },
    { name: "ACT-X", amount: 60, note: "35歳以下の若手研究者向け" },
    { name: "その他・間接費", amount: 950 },
  ],
};

// ─────────────────────────────────────────────────────
// 6. 老齢厚生年金（個人給付）
//    国庫負担分: 年金給付費の1/2 相当の国庫負担が基礎年金経由で支出
// ─────────────────────────────────────────────────────
const pensionKoseiRourei: RecipientGroup = {
  itemId: "social-pension-kosei-rourei",
  label: "老齢厚生年金 国庫負担分",
  year: 2025,
  total: 74000,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額平均 約1.76万円（国庫分/人）",
    countLabel: "約3,500万人",
    adminCost: 0,
    note: "厚生年金の老齢給付のうち、国が一般財源から負担する基礎年金拠出金の分。実際の年金月額は平均約14.5万円だが、うち国庫負担は基礎年金部分（約6.5万円）の1/2相当。",
  },
};

// ─────────────────────────────────────────────────────
// 7. 障害厚生年金（個人給付）
// ─────────────────────────────────────────────────────
const pensionKoseiShogai: RecipientGroup = {
  itemId: "social-pension-kosei-shogai",
  label: "障害厚生年金 国庫負担分",
  year: 2025,
  total: 9800,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額平均 約5.1万円（国庫分/人）",
    countLabel: "約160万人",
    adminCost: 0,
    note: "障害等級1・2級を対象とした厚生年金。国庫は基礎年金相当部分の1/2を負担。1級は2級の1.25倍。",
  },
};

// ─────────────────────────────────────────────────────
// 8. 遺族厚生年金（個人給付）
// ─────────────────────────────────────────────────────
const pensionKoseiIzoku: RecipientGroup = {
  itemId: "social-pension-kosei-izoku",
  label: "遺族厚生年金 国庫負担分",
  year: 2025,
  total: 14440,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額平均 約3.1万円（国庫分/人）",
    countLabel: "約390万人",
    adminCost: 0,
    note: "被保険者・受給者の死亡時に遺族（配偶者・子等）に支給。受給者の約8割は女性（主に妻）。",
  },
};

// ─────────────────────────────────────────────────────
// 9. 老齢基礎年金（個人給付）
// ─────────────────────────────────────────────────────
const pensionKokuminRourei: RecipientGroup = {
  itemId: "social-pension-kokumin-rourei",
  label: "老齢基礎年金 国庫負担分",
  year: 2025,
  total: 18200,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額平均 約0.52万円（国庫分/人）",
    countLabel: "約2,900万人",
    adminCost: 0,
    note: "国民年金（1階部分）の老齢給付。満額は月約6.8万円（令和7年度）で、国庫はその1/2を負担。実際の受給額は納付期間により異なる。",
  },
};

// ─────────────────────────────────────────────────────
// 10. 障害基礎年金（個人給付）
// ─────────────────────────────────────────────────────
const pensionKokuminShogai: RecipientGroup = {
  itemId: "social-pension-kokumin-shogai",
  label: "障害基礎年金 国庫負担分",
  year: 2025,
  total: 3560,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額平均 約3.3万円（国庫分/人）",
    countLabel: "約90万人",
    adminCost: 0,
    note: "1級：月約8.2万円、2級：月約6.6万円（令和7年度）。子の加算あり。国庫はその1/2を負担。",
  },
};

// ─────────────────────────────────────────────────────
// 11. 後期高齢者医療 医療給付費（個人給付）
// ─────────────────────────────────────────────────────
const medicalRoujinKyufu: RecipientGroup = {
  itemId: "social-medical-roujin-kyufu",
  label: "後期高齢者医療 給付費（国庫分）",
  year: 2025,
  total: 31200,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "年間平均 約16.4万円（国庫分/人）",
    countLabel: "約1,900万人（75歳以上）",
    adminCost: 0,
    note: "75歳以上全員が加入する後期高齢者医療制度の給付費。1人当たり年間医療費は約100万円で、うち国庫公費負担（約50%）の中から16万円相当が一般財源。残りは保険料・支援金で賄われる。",
  },
};

// ─────────────────────────────────────────────────────
// 12. 健康保険 療養給付費（個人給付）
// ─────────────────────────────────────────────────────
const medicalKenkoRyoyo: RecipientGroup = {
  itemId: "social-medical-kenko-ryoyo",
  label: "健康保険 療養給付費（国庫分）",
  year: 2025,
  total: 32200,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "年間平均 約9,500円（国庫分/人）",
    countLabel: "約3,400万人（協会けんぽ加入者）",
    adminCost: 0,
    note: "協会けんぽ（全国健康保険協会）への国庫補助。加入者の医療費のうち給付費総額の約16.4%を国庫が補助。診療所・病院の医療費として患者に代わり支払われる。",
  },
};

// ─────────────────────────────────────────────────────
// 13. 児童手当 0〜15歳分（個人給付）
// ─────────────────────────────────────────────────────
const childJidoIchiji: RecipientGroup = {
  itemId: "social-child-jido-ichiji",
  label: "児童手当（0〜15歳）",
  year: 2025,
  total: 10800,
  unit: "億円",
  sourceNote: "出典: こども家庭庁「令和7年度予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額平均 約1.0万円/人",
    countLabel: "約1,500万人（0〜15歳の子ども）",
    adminCost: 180,
    note: "3歳未満：月1.5万円、3歳〜小学生：月1万円（第3子以降は3万円）、中学生：月1万円。所得制限撤廃（令和6年10月〜）。国が2/3、地方が1/3を負担。",
  },
};

// ─────────────────────────────────────────────────────
// 14. 児童手当 高校生年代拡充分（個人給付）
// ─────────────────────────────────────────────────────
const childJidoShushoku: RecipientGroup = {
  itemId: "social-child-jido-shushoku",
  label: "児童手当（高校生年代拡充分）",
  year: 2025,
  total: 3400,
  unit: "億円",
  sourceNote: "出典: こども家庭庁「令和7年度予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額 1.0万円/人",
    countLabel: "約330万人（16〜18歳）",
    adminCost: 40,
    note: "令和6年10月から高校生年代（16〜18歳）まで支給対象を拡大。月1万円（第3子以降は3万円）。",
  },
};

// ─────────────────────────────────────────────────────
// 15. 生活保護 生活扶助（個人給付）
// ─────────────────────────────────────────────────────
const welfareSeikatsuSeikatsu: RecipientGroup = {
  itemId: "social-welfare-seikatsu-seikatsu",
  label: "生活保護 生活扶助",
  year: 2025,
  total: 10200,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額平均 約4.25万円/人",
    countLabel: "約200万人（被保護者）",
    adminCost: 250,
    note: "生活保護の中核となる扶助で、食費・光熱費などの日常生活費を賄う。単身・世帯人数・居住地域（級地）により基準額が異なる。国が3/4、地方が1/4を負担。",
  },
};

// ─────────────────────────────────────────────────────
// 16. 生活保護 住宅扶助（個人給付）
// ─────────────────────────────────────────────────────
const welfareSeikatsuJutaku: RecipientGroup = {
  itemId: "social-welfare-seikatsu-jutaku",
  label: "生活保護 住宅扶助",
  year: 2025,
  total: 5300,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "月額平均 約2.2万円/世帯",
    countLabel: "約164万世帯（被保護世帯）",
    adminCost: 0,
    note: "家賃・間代などを実費で支給（上限額は地域・世帯規模により設定）。東京23区単身は月最大5.3万円。",
  },
};

// ─────────────────────────────────────────────────────
// 17. 生活保護 医療扶助（個人給付）
// ─────────────────────────────────────────────────────
const welfareSeikatsuIryo: RecipientGroup = {
  itemId: "social-welfare-seikatsu-iryo",
  label: "生活保護 医療扶助",
  year: 2025,
  total: 12000,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "年間平均 約60万円/人",
    countLabel: "約200万人（被保護者）",
    adminCost: 0,
    note: "生活保護費で最大の費目。被保護者の医療費は全額公費で賄われる（自己負担ゼロ）。高齢者の増加と慢性疾患の長期治療が費用を押し上げている。",
  },
};

// ─────────────────────────────────────────────────────
// 18. 失業給付（雇用保険）（個人給付）
// ─────────────────────────────────────────────────────
const empKoyohokenKyufu: RecipientGroup = {
  itemId: "social-emp-koyohoken-kyufu",
  label: "雇用保険 失業給付（国庫分）",
  year: 2025,
  total: 3200,
  unit: "億円",
  sourceNote: "出典: 厚生労働省「令和7年度社会保障関係予算」",
  recipients: [],
  individualSummary: {
    avgLabel: "日額平均 約5,600円",
    countLabel: "年間延べ約150万人",
    adminCost: 280,
    note: "基本手当（失業給付）は離職前6ヶ月の賃金日額の50〜80%（年齢・賃金により異なる）。給付日数は被保険者期間・離職理由で90〜360日。国庫は給付費の1/4を負担。",
  },
};

// ─────────────────────────────────────────────────────
// 19. 国連・WHO・UNHCR等への拠出金
//    出典: 外務省「国際機関への拠出金等」
// ─────────────────────────────────────────────────────
const odaKokusaiUn: RecipientGroup = {
  itemId: "oda-kokusai-un",
  label: "国連・WHO・UNHCR等 分担金・拠出金",
  year: 2024,
  total: 900,
  unit: "億円",
  sourceNote: "出典: 外務省「国際機関への拠出・出資状況（令和6年度）」",
  recipients: [
    { name: "国連（UN）通常予算分担金", amount: 198, note: "分担率 8.033%（第3位）。安保理・総会等の運営費", region: "その他" },
    { name: "国連平和維持活動（PKO）", amount: 154, note: "分担率 8.033%。世界各地のPKO部隊経費", region: "その他" },
    { name: "世界保健機関（WHO）", amount: 89, note: "通常予算分担金＋任意拠出。保健・感染症対策", region: "その他" },
    { name: "国連難民高等弁務官事務所（UNHCR）", amount: 78, note: "難民支援・国内避難民保護", region: "その他" },
    { name: "国連児童基金（UNICEF）", amount: 62, note: "子どもの教育・保健・栄養支援", region: "その他" },
    { name: "国連開発計画（UNDP）", amount: 54, note: "途上国の持続可能な開発支援", region: "その他" },
    { name: "国連世界食糧計画（WFP）", amount: 48, note: "食料援助・人道支援", region: "その他" },
    { name: "国連環境計画（UNEP）", amount: 32, note: "気候変動・生物多様性等の環境課題", region: "その他" },
    { name: "国際原子力機関（IAEA）", amount: 28, note: "核不拡散・原子力安全保障", region: "その他" },
    { name: "国連教育科学文化機関（UNESCO）", amount: 25, note: "教育・科学・文化遺産保護", region: "その他" },
    { name: "国際労働機関（ILO）", amount: 18, note: "労働基準・雇用政策", region: "その他" },
    { name: "その他国際機関", amount: 114, region: "その他" },
  ],
};

// ─────────────────────────────────────────────────────
// 20. 国際金融機関（ADB・世銀等）拠出金
//    出典: 財務省「国際機関への出資・拠出」
// ─────────────────────────────────────────────────────
const odaKokusaiAdb: RecipientGroup = {
  itemId: "oda-kokusai-adb",
  label: "国際金融機関 拠出・出資額",
  year: 2024,
  total: 501,
  unit: "億円",
  sourceNote: "出典: 財務省「令和6年度国際機関等への拠出金・出資金」",
  recipients: [
    { name: "アジア開発銀行（ADB）", amount: 182, note: "日本は米国と並ぶ最大出資国（15.6%）。アジア太平洋のインフラ・開発融資" },
    { name: "世界銀行グループ（IBRD/IDA）", amount: 143, note: "途上国への開発融資・技術協力" },
    { name: "国際通貨基金（IMF）", amount: 68, note: "国際収支危機国への融資・国際金融安定化" },
    { name: "アジアインフラ投資銀行（AIIB）", amount: 0, note: "日本は未加盟（G7各国の方針と整合性を理由に参加を見送り）" },
    { name: "米州開発銀行（IDB）", amount: 38, note: "中南米地域の開発支援" },
    { name: "アフリカ開発銀行（AfDB）", amount: 42, note: "アフリカの開発・インフラ整備" },
    { name: "欧州復興開発銀行（EBRD）", amount: 18, note: "中東欧・中央アジアの市場経済移行支援" },
    { name: "その他国際金融機関", amount: 10 },
  ],
};

// ─────────────────────────────────────────────────────
// 21. 直轄国道整備 主要企業別受注額
//    出典: 国土交通省「建設工事施工統計調査」（概算）
// ─────────────────────────────────────────────────────
const publicRoadChokukatsu: RecipientGroup = {
  itemId: "public-road-chokukatsu",
  label: "直轄国道整備 主要ゼネコン受注額",
  year: 2024,
  total: 6800,
  unit: "億円",
  sourceNote: "出典: 国土交通省「令和5年度建設工事施工統計」（直轄道路工事、概算）",
  recipients: [
    { name: "大林組", amount: 620, note: "高速道路・大型橋梁・トンネル" },
    { name: "鹿島建設", amount: 598, note: "大型土木・トンネル・橋梁" },
    { name: "清水建設", amount: 542, note: "都市型道路・交差点改良" },
    { name: "大成建設", amount: 510, note: "高速道路・長大トンネル" },
    { name: "竹中土木", amount: 340, note: "橋梁・高架道路" },
    { name: "西松建設", amount: 298, note: "トンネル・山岳道路" },
    { name: "前田建設工業", amount: 265, note: "道路・橋梁・土工" },
    { name: "戸田建設", amount: 230, note: "道路舗装・改良工事" },
    { name: "五洋建設", amount: 185, note: "臨海道路・港湾アクセス道路" },
    { name: "東急建設", amount: 152, note: "都市道路・歩道整備" },
    { name: "飛島建設", amount: 138, note: "道路・橋梁" },
    { name: "安藤ハザマ", amount: 125, note: "トンネル・山岳工事" },
    { name: "地方中堅・中小ゼネコン（NEXCO発注含む）", amount: 2797 },
  ],
};

// ─────────────────────────────────────────────────────
// 22. 義務教育費 教職員給与 都道府県別
//    出典: 文部科学省「義務教育費国庫負担金」
// ─────────────────────────────────────────────────────
const eduGikyoKyouin: RecipientGroup = {
  itemId: "edu-gikyo-kyouin",
  label: "義務教育費国庫負担金（教職員給与）都道府県別",
  year: 2025,
  total: 13600,
  unit: "億円",
  sourceNote: "出典: 文部科学省「令和7年度義務教育費国庫負担金の配分」（概算）",
  recipients: [
    { name: "北海道", amount: 890, note: "公立小中学校教職員給与の国庫負担", region: "北海道" },
    { name: "東京都", amount: 780, note: "", region: "関東" },
    { name: "大阪府", amount: 710, note: "", region: "近畿" },
    { name: "愛知県", amount: 680, note: "", region: "中部" },
    { name: "神奈川県", amount: 650, note: "", region: "関東" },
    { name: "埼玉県", amount: 580, note: "", region: "関東" },
    { name: "千葉県", amount: 540, note: "", region: "関東" },
    { name: "福岡県", amount: 520, note: "", region: "九州・沖縄" },
    { name: "兵庫県", amount: 490, note: "", region: "近畿" },
    { name: "静岡県", amount: 410, note: "", region: "中部" },
    { name: "茨城県", amount: 380, note: "", region: "関東" },
    { name: "広島県", amount: 360, note: "", region: "中国" },
    { name: "長野県", amount: 350, note: "", region: "中部" },
    { name: "新潟県", amount: 330, note: "", region: "中部" },
    { name: "宮城県", amount: 300, note: "", region: "東北" },
    { name: "岐阜県", amount: 290, note: "", region: "中部" },
    { name: "栃木県", amount: 270, note: "", region: "関東" },
    { name: "群馬県", amount: 265, note: "", region: "関東" },
    { name: "岡山県", amount: 255, note: "", region: "中国" },
    { name: "京都府", amount: 250, note: "", region: "近畿" },
    { name: "福島県", amount: 248, note: "", region: "東北" },
    { name: "岩手県", amount: 230, note: "", region: "東北" },
    { name: "熊本県", amount: 228, note: "", region: "九州・沖縄" },
    { name: "鹿児島県", amount: 225, note: "", region: "九州・沖縄" },
    { name: "三重県", amount: 210, note: "", region: "中部" },
    { name: "青森県", amount: 205, note: "", region: "東北" },
    { name: "秋田県", amount: 185, note: "", region: "東北" },
    { name: "山形県", amount: 182, note: "", region: "東北" },
    { name: "長崎県", amount: 178, note: "", region: "九州・沖縄" },
    { name: "滋賀県", amount: 168, note: "", region: "近畿" },
    { name: "奈良県", amount: 155, note: "", region: "近畿" },
    { name: "和歌山県", amount: 148, note: "", region: "近畿" },
    { name: "富山県", amount: 145, note: "", region: "中部" },
    { name: "石川県", amount: 140, note: "", region: "中部" },
    { name: "山口県", amount: 138, note: "", region: "中国" },
    { name: "大分県", amount: 132, note: "", region: "九州・沖縄" },
    { name: "宮崎県", amount: 128, note: "", region: "九州・沖縄" },
    { name: "山梨県", amount: 115, note: "", region: "中部" },
    { name: "島根県", amount: 112, note: "", region: "中国" },
    { name: "愛媛県", amount: 178, note: "", region: "四国" },
    { name: "高知県", amount: 112, note: "", region: "四国" },
    { name: "香川県", amount: 108, note: "", region: "四国" },
    { name: "徳島県", amount: 105, note: "", region: "四国" },
    { name: "鳥取県", amount: 88, note: "", region: "中国" },
    { name: "佐賀県", amount: 105, note: "", region: "九州・沖縄" },
    { name: "沖縄県", amount: 182, note: "", region: "九州・沖縄" },
    { name: "福井県", amount: 95, note: "", region: "中部" },
  ].sort((a, b) => b.amount - a.amount),
};

// ─────────────────────────────────────────────────────
// 23. JAXA 事業費内訳
//    出典: 宇宙航空研究開発機構（JAXA）「令和6年度運営費交付金・補助金」
// ─────────────────────────────────────────────────────
const eduScienceJaxa: RecipientGroup = {
  itemId: "edu-science-jaxa",
  label: "JAXA 事業分野別予算",
  year: 2024,
  total: 2100,
  unit: "億円",
  sourceNote: "出典: JAXA「令和6年度予算・事業計画」",
  recipients: [
    { name: "H3ロケット開発・打上", amount: 380, note: "次世代基幹ロケット。2024年初号機打上成功" },
    { name: "国際宇宙ステーション（ISS）・きぼう", amount: 280, note: "ISS日本実験棟きぼうの維持・運用" },
    { name: "人工衛星開発（地球観測・通信）", amount: 310, note: "だいち・ひまわり・みちびき等" },
    { name: "月探査・惑星探査（SLIM・MMX等）", amount: 220, note: "月面着陸実証機SLIM、火星衛星探査MMX等" },
    { name: "HTV-X（新型宇宙ステーション補給機）", amount: 180, note: "ISSへの物資補給船の次世代機開発" },
    { name: "宇宙科学研究（ISAS）", amount: 168, note: "はやぶさ2・あかつき後継機等の科学ミッション" },
    { name: "安全保障・防衛宇宙利用", amount: 145, note: "自衛隊との連携、宇宙状況監視（SSA）" },
    { name: "航空技術研究", amount: 98, note: "次世代航空機・無人機・空飛ぶクルマ研究" },
    { name: "研究開発センター・施設維持", amount: 165, note: "筑波・種子島・相模原等の施設運営" },
    { name: "その他・一般管理費", amount: 154 },
  ],
};

// ─────────────────────────────────────────────────────
// 24. 国立研究開発法人交付金 機関別
//    出典: 文部科学省・各府省「令和6年度運営費交付金」
// ─────────────────────────────────────────────────────
const eduScienceRiken: RecipientGroup = {
  itemId: "edu-science-riken",
  label: "国立研究開発法人 交付金別額",
  year: 2024,
  total: 4600,
  unit: "億円",
  sourceNote: "出典: 各府省「令和6年度運営費交付金等の配分状況」（概算）",
  recipients: [
    { name: "理化学研究所（RIKEN）", amount: 980, note: "生命科学・物理・計算科学。富岳スパコン運用" },
    { name: "物質・材料研究機構（NIMS）", amount: 280, note: "先進材料・ナノテクノロジー研究" },
    { name: "国立がん研究センター", amount: 250, note: "がん研究・臨床試験・がん登録" },
    { name: "情報通信研究機構（NICT）", amount: 380, note: "通信・量子ICT・サイバーセキュリティ研究" },
    { name: "産業技術総合研究所（AIST）", amount: 680, note: "エネルギー・環境・材料・情報等の産業技術" },
    { name: "国立環境研究所（NIES）", amount: 155, note: "地球環境・生態系・廃棄物研究" },
    { name: "防災科学技術研究所（NIED）", amount: 132, note: "地震・津波・火山・豪雨の防災研究" },
    { name: "農業・食品産業技術総合研究機構（NARO）", amount: 380, note: "農業品種改良・農業技術開発" },
    { name: "国立医薬品食品衛生研究所（NIHS）", amount: 78, note: "医薬品・食品の安全性評価" },
    { name: "国立感染症研究所（NIID）", amount: 145, note: "感染症サーベイランス・ワクチン研究" },
    { name: "国立循環器病研究センター", amount: 98, note: "心臓・脳血管病の研究・診療" },
    { name: "その他の国立研究開発法人", amount: 1042 },
  ],
};

// ─────────────────────────────────────────────────────
// まとめ: itemId → RecipientGroup マップ
// ─────────────────────────────────────────────────────
export const recipientGroups: Record<string, RecipientGroup> = {
  // 地方交付税
  "localalloc-kotei-futsuu": localAllocFutsuu,

  // ODA
  "oda-oda-nichi": odaBilateral,
  "oda-kokusai-un": odaKokusaiUn,
  "oda-kokusai-adb": odaKokusaiAdb,

  // 教育・科学
  "edu-science-kakenhi": kakenhi,
  "edu-science-jst": jstGrants,
  "edu-science-jaxa": eduScienceJaxa,
  "edu-science-riken": eduScienceRiken,
  "edu-gikyo-kyouin": eduGikyoKyouin,

  // 防衛
  "defense-busshi": defenseContracts,

  // 公共事業
  "public-road-chokukatsu": publicRoadChokukatsu,

  // 社会保障 — 年金（個人給付）
  "social-pension-kosei-rourei": pensionKoseiRourei,
  "social-pension-kosei-shogai": pensionKoseiShogai,
  "social-pension-kosei-izoku": pensionKoseiIzoku,
  "social-pension-kokumin-rourei": pensionKokuminRourei,
  "social-pension-kokumin-shogai": pensionKokuminShogai,

  // 社会保障 — 医療（個人給付）
  "social-medical-roujin-kyufu": medicalRoujinKyufu,
  "social-medical-kenko-ryoyo": medicalKenkoRyoyo,

  // 社会保障 — 子育て（個人給付）
  "social-child-jido-ichiji": childJidoIchiji,
  "social-child-jido-shushoku": childJidoShushoku,

  // 社会保障 — 生活保護（個人給付）
  "social-welfare-seikatsu-seikatsu": welfareSeikatsuSeikatsu,
  "social-welfare-seikatsu-jutaku": welfareSeikatsuJutaku,
  "social-welfare-seikatsu-iryo": welfareSeikatsuIryo,

  // 社会保障 — 雇用（個人給付）
  "social-emp-koyohoken-kyufu": empKoyohokenKyufu,
};

export function hasRecipients(itemId: string): boolean {
  return itemId in recipientGroups;
}
