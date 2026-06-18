export interface BudgetItem {
  id: string;
  name: string;
  amount: number; // 億円
  children?: BudgetItem[];
  source?: string;
  descriptionKey?: string; // → data/descriptions.ts のキー
}

export interface BudgetYear {
  year: number;
  label: string;
  total: number; // 億円
  items: BudgetItem[];
}

// 財務省 一般会計歳出予算データ
// 出典: 財務省「予算書」https://www.mof.go.jp/budget/

const budget2025: BudgetYear = {
  year: 2025,
  label: "令和7年度",
  total: 1154004,
  items: [
    {
      id: "social",
      name: "社会保障関係費",
      amount: 381516,
      children: [
        {
          id: "social-pension",
          name: "年金",
          amount: 133605,
          children: [
            {
              id: "social-pension-kosei", name: "厚生年金保険給付費", amount: 98240,
              children: [
                { id: "social-pension-kosei-rourei", name: "老齢厚生年金", amount: 74000, descriptionKey: "social-pension-kosei-rourei" },
                { id: "social-pension-kosei-shogai", name: "障害厚生年金", amount: 9800, descriptionKey: "social-pension-kosei-shogai" },
                { id: "social-pension-kosei-izoku", name: "遺族厚生年金", amount: 14440, descriptionKey: "social-pension-kosei-izoku" },
              ],
            },
            {
              id: "social-pension-kokumin", name: "国民年金給付費", amount: 23840,
              children: [
                { id: "social-pension-kokumin-rourei", name: "老齢基礎年金", amount: 18200, descriptionKey: "social-pension-kokumin-rourei" },
                { id: "social-pension-kokumin-shogai", name: "障害基礎年金", amount: 3560, descriptionKey: "social-pension-kokumin-shogai" },
                { id: "social-pension-kokumin-izoku", name: "遺族基礎年金", amount: 2080, descriptionKey: "social-pension-kokumin-izoku" },
              ],
            },
            { id: "social-pension-other", name: "その他年金関連", amount: 11525, descriptionKey: "social-pension-other" },
          ],
        },
        {
          id: "social-medical",
          name: "医療",
          amount: 125328,
          children: [
            {
              id: "social-medical-kenko", name: "健康保険給付費", amount: 48200,
              children: [
                { id: "social-medical-kenko-ryoyo", name: "療養給付費", amount: 32200, descriptionKey: "social-medical-kenko-ryoyo" },
                { id: "social-medical-kenko-kogaku", name: "高額療養費", amount: 9100, descriptionKey: "social-medical-kenko-kogaku" },
                { id: "social-medical-kenko-shobyo", name: "傷病手当金", amount: 3900, descriptionKey: "social-medical-kenko-shobyo" },
                { id: "social-medical-kenko-shussan", name: "出産育児一時金等", amount: 3000, descriptionKey: "social-medical-kenko-shussan" },
              ],
            },
            {
              id: "social-medical-roujin", name: "後期高齢者医療", amount: 39600,
              children: [
                { id: "social-medical-roujin-kyufu", name: "医療給付費", amount: 31200, descriptionKey: "social-medical-roujin-kyufu" },
                { id: "social-medical-roujin-shien", name: "支援金", amount: 5400, descriptionKey: "social-medical-roujin-shien" },
                { id: "social-medical-roujin-hoken", name: "保険料軽減補助", amount: 3000, descriptionKey: "social-medical-roujin-hoken" },
              ],
            },
            {
              id: "social-medical-kokaho", name: "国民健康保険", amount: 23700, descriptionKey: "social-medical-kokaho",
              children: [
                { id: "social-medical-kokaho-kyufu", name: "療養給付費等交付金", amount: 15800, descriptionKey: "social-medical-kokaho-kyufu" },
                { id: "social-medical-kokaho-shien", name: "財政安定化支援金", amount: 4800, descriptionKey: "social-medical-kokaho-shien" },
                { id: "social-medical-kokaho-hoken", name: "保険料軽減補助", amount: 3100, descriptionKey: "social-medical-kokaho-hoken" },
              ],
            },
            { id: "social-medical-other", name: "その他医療費", amount: 13828, descriptionKey: "social-medical-other" },
          ],
        },
        {
          id: "social-care",
          name: "介護",
          amount: 42560,
          children: [
            {
              id: "social-care-service", name: "介護給付費", amount: 35200, descriptionKey: "social-care-service",
              children: [
                { id: "social-care-kyotaku", name: "居宅介護サービス", amount: 16400, descriptionKey: "social-care-kyotaku" },
                { id: "social-care-shisetsu", name: "施設介護サービス", amount: 12600, descriptionKey: "social-care-shisetsu" },
                { id: "social-care-chiiki", name: "地域密着型サービス", amount: 4200, descriptionKey: "social-care-chiiki" },
                { id: "social-care-yobo", name: "介護予防サービス", amount: 2000, descriptionKey: "social-care-yobo" },
              ],
            },
            { id: "social-care-other", name: "その他介護関連", amount: 7360, descriptionKey: "social-care-other" },
          ],
        },
        {
          id: "social-child",
          name: "少子化対策",
          amount: 35840,
          children: [
            {
              id: "social-child-jido", name: "児童手当", amount: 14200,
              children: [
                { id: "social-child-jido-ichiji", name: "0〜15歳分", amount: 10800, descriptionKey: "social-child-jido-ichiji" },
                { id: "social-child-jido-shushoku", name: "高校生年代拡充分", amount: 3400, descriptionKey: "social-child-jido-shushoku" },
              ],
            },
            {
              id: "social-child-hoiku", name: "保育所関連", amount: 11500, descriptionKey: "social-child-hoiku",
              children: [
                { id: "social-child-hoiku-unei", name: "保育所等運営費", amount: 8600, descriptionKey: "social-child-hoiku-unei" },
                { id: "social-child-hoiku-seibi", name: "保育所等整備費", amount: 2900, descriptionKey: "social-child-hoiku-seibi" },
              ],
            },
            {
              id: "social-child-kodomo", name: "こども家庭庁関連", amount: 10140, descriptionKey: "social-child-kodomo",
              children: [
                { id: "social-child-kodomo-kyufu", name: "こども・子育て給付", amount: 6800, descriptionKey: "social-child-kodomo-kyufu" },
                { id: "social-child-kodomo-shien", name: "地域子育て支援", amount: 3340, descriptionKey: "social-child-kodomo-shien" },
              ],
            },
          ],
        },
        {
          id: "social-welfare",
          name: "生活扶助等",
          amount: 36850,
          children: [
            {
              id: "social-welfare-seikatsu", name: "生活保護費", amount: 29500,
              children: [
                { id: "social-welfare-seikatsu-seikatsu", name: "生活扶助", amount: 10200, descriptionKey: "social-welfare-seikatsu-seikatsu" },
                { id: "social-welfare-seikatsu-jutaku", name: "住宅扶助", amount: 5300, descriptionKey: "social-welfare-seikatsu-jutaku" },
                { id: "social-welfare-seikatsu-iryo", name: "医療扶助", amount: 12000, descriptionKey: "social-welfare-seikatsu-iryo" },
                { id: "social-welfare-seikatsu-kyoiku", name: "教育扶助等", amount: 2000, descriptionKey: "social-welfare-seikatsu-kyoiku" },
              ],
            },
            {
              id: "social-welfare-shogai", name: "障害者支援", amount: 7350, descriptionKey: "social-welfare-shogai",
              children: [
                { id: "social-welfare-shogai-kyotaku", name: "居宅系サービス", amount: 4200, descriptionKey: "social-welfare-shogai-kyotaku" },
                { id: "social-welfare-shogai-shisetsu", name: "施設系サービス", amount: 3150, descriptionKey: "social-welfare-shogai-shisetsu" },
              ],
            },
          ],
        },
        {
          id: "social-employment",
          name: "雇用",
          amount: 7333,
          children: [
            {
              id: "social-emp-koyohoken", name: "雇用保険", amount: 4800,
              children: [
                { id: "social-emp-koyohoken-kyufu", name: "失業給付", amount: 3200, descriptionKey: "social-emp-koyohoken-kyufu" },
                { id: "social-emp-koyohoken-kyoshoku", name: "教育訓練給付", amount: 1600, descriptionKey: "social-emp-koyohoken-kyoshoku" },
              ],
            },
            {
              id: "social-emp-other", name: "その他雇用対策", amount: 2533, descriptionKey: "social-emp-other",
              children: [
                { id: "social-emp-other-koyo", name: "雇用維持・創出補助", amount: 1580, descriptionKey: "social-emp-other-koyo" },
                { id: "social-emp-other-shuroh", name: "ハローワーク運営", amount: 953, descriptionKey: "social-emp-other-shuroh" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "bond",
      name: "国債費",
      amount: 285745,
      children: [
        {
          id: "bond-interest", name: "利子及割引料", amount: 109830, descriptionKey: "bond-interest",
          children: [
            { id: "bond-interest-naiku", name: "内国債利子", amount: 96400, descriptionKey: "bond-interest-naiku" },
            { id: "bond-interest-gaiku", name: "外債利子", amount: 8200, descriptionKey: "bond-interest-gaiku" },
            { id: "bond-interest-kariire", name: "借入金利子等", amount: 5230, descriptionKey: "bond-interest-kariire" },
          ],
        },
        {
          id: "bond-repay", name: "国債償還費", amount: 175915, descriptionKey: "bond-repay",
          children: [
            { id: "bond-repay-teiri", name: "普通国債償還費", amount: 142000, descriptionKey: "bond-repay-teiri" },
            { id: "bond-repay-zaimu", name: "財投債等償還費", amount: 33915, descriptionKey: "bond-repay-zaimu" },
          ],
        },
      ],
    },
    {
      id: "localalloc",
      name: "地方交付税交付金等",
      amount: 182004,
      children: [
        {
          id: "localalloc-kotei", name: "地方交付税交付金", amount: 152860,
          children: [
            { id: "localalloc-kotei-futsuu", name: "普通交付税", amount: 140200, descriptionKey: "localalloc-kotei-futsuu" },
            { id: "localalloc-kotei-tokubetsu", name: "特別交付税", amount: 12660, descriptionKey: "localalloc-kotei-tokubetsu" },
          ],
        },
        {
          id: "localalloc-joto", name: "地方譲与税譲与金", amount: 22580, descriptionKey: "localalloc-joto",
          children: [
            { id: "localalloc-joto-kihatsu", name: "地方揮発油譲与税", amount: 14400, descriptionKey: "localalloc-joto-kihatsu" },
            { id: "localalloc-joto-ton", name: "特別とん譲与税等", amount: 8180, descriptionKey: "localalloc-joto-ton" },
          ],
        },
        { id: "localalloc-tokurei", name: "地方特例交付金等", amount: 6564, descriptionKey: "localalloc-tokurei" },
      ],
    },
    {
      id: "defense",
      name: "防衛関係費",
      amount: 87844,
      children: [
        {
          id: "defense-jinken", name: "人件費・糧食費", amount: 23600, descriptionKey: "defense-jinken",
          children: [
            { id: "defense-jinken-jinkensen", name: "給与・手当・退職金", amount: 20200, descriptionKey: "defense-jinken-jinkensen" },
            { id: "defense-jinken-ryoshoku", name: "糧食・被服・営舎費", amount: 3400, descriptionKey: "defense-jinken-ryoshoku" },
          ],
        },
        {
          id: "defense-busshi", name: "装備品等購入費", amount: 26800, descriptionKey: "defense-busshi",
          children: [
            { id: "defense-busshi-kokuki", name: "航空機等", amount: 8500, descriptionKey: "defense-busshi-kokuki" },
            { id: "defense-busshi-kansetsu", name: "艦船等", amount: 7200, descriptionKey: "defense-busshi-kansetsu" },
            { id: "defense-busshi-buki", name: "誘導弾・弾薬", amount: 5800, descriptionKey: "defense-busshi-buki" },
            { id: "defense-busshi-shatei", name: "車両・火器", amount: 3300, descriptionKey: "defense-busshi-shatei" },
            { id: "defense-busshi-other", name: "その他装備品", amount: 2000, descriptionKey: "defense-busshi-other" },
          ],
        },
        {
          id: "defense-kenkyu", name: "研究開発費", amount: 8200, descriptionKey: "defense-kenkyu",
          children: [
            { id: "defense-kenkyu-kaihatsu", name: "次世代装備研究開発", amount: 5800, descriptionKey: "defense-kenkyu-kaihatsu" },
            { id: "defense-kenkyu-sangaku", name: "産学連携・安全保障技術", amount: 2400, descriptionKey: "defense-kenkyu-sangaku" },
          ],
        },
        {
          id: "defense-shisetsu", name: "施設整備費", amount: 4400, descriptionKey: "defense-shisetsu",
          children: [
            { id: "defense-shisetsu-eizetsu", name: "基地・駐屯地整備", amount: 2800, descriptionKey: "defense-shisetsu-eizetsu" },
            { id: "defense-shisetsu-beigun", name: "在日米軍関連", amount: 1600, descriptionKey: "defense-shisetsu-beigun" },
          ],
        },
        { id: "defense-ippan", name: "一般物件費", amount: 16200, descriptionKey: "defense-ippan" },
        {
          id: "defense-other", name: "その他", amount: 8644,
          children: [
            { id: "defense-usfj", name: "在日米軍駐留経費負担（思いやり予算）", amount: 2680, descriptionKey: "defense-usfj" },
            { id: "defense-kichi", name: "基地対策費・SACO・同盟強靭化", amount: 1850, descriptionKey: "defense-kichi" },
            { id: "defense-other-misc", name: "その他防衛関連経費", amount: 4114, descriptionKey: "defense-other-misc" },
          ],
        },
      ],
    },
    {
      id: "public",
      name: "公共事業関係費",
      amount: 61080,
      children: [
        {
          id: "public-road", name: "道路整備", amount: 14850,
          children: [
            { id: "public-road-kosoku", name: "高速道路整備", amount: 4200, descriptionKey: "public-road-kosoku" },
            { id: "public-road-chokukatsu", name: "直轄国道整備", amount: 6800, descriptionKey: "public-road-chokukatsu" },
            { id: "public-road-hojo", name: "補助道路整備", amount: 3850, descriptionKey: "public-road-hojo" },
          ],
        },
        {
          id: "public-flood", name: "治山治水", amount: 9200, descriptionKey: "public-flood",
          children: [
            { id: "public-flood-chisui", name: "砂防・急傾斜地対策", amount: 3800, descriptionKey: "public-flood-chisui" },
            { id: "public-flood-kasenhojo", name: "河川整備", amount: 5400, descriptionKey: "public-flood-kasenhojo" },
          ],
        },
        {
          id: "public-housing", name: "住宅・都市環境整備", amount: 6800, descriptionKey: "public-housing",
          children: [
            { id: "public-housing-toshi", name: "都市再開発・公園整備", amount: 4100, descriptionKey: "public-housing-toshi" },
            { id: "public-housing-suido", name: "水道施設整備", amount: 2700, descriptionKey: "public-housing-suido" },
          ],
        },
        { id: "public-agri", name: "農業農村整備", amount: 5300, descriptionKey: "public-agri" },
        { id: "public-disaster", name: "災害復旧等", amount: 10600, descriptionKey: "public-disaster" },
        { id: "public-port", name: "港湾・空港・鉄道整備", amount: 3100, descriptionKey: "public-port" },
        { id: "public-forest", name: "林野公共事業", amount: 3800, descriptionKey: "public-forest" },
        { id: "public-fishery", name: "漁港漁場整備", amount: 2100, descriptionKey: "public-fishery" },
        { id: "public-other", name: "その他公共事業", amount: 5330, descriptionKey: "public-other" },
      ],
    },
    {
      id: "education",
      name: "文教及び科学振興費",
      amount: 53685,
      children: [
        {
          id: "edu-gikyo", name: "義務教育費国庫負担金", amount: 16400,
          children: [
            { id: "edu-gikyo-kyouin", name: "教職員給与負担", amount: 13600, descriptionKey: "edu-gikyo-kyouin" },
            { id: "edu-gikyo-tokushi", name: "特別支援教育加配", amount: 2800, descriptionKey: "edu-gikyo-tokushi" },
          ],
        },
        {
          id: "edu-science", name: "科学技術振興費", amount: 13800,
          children: [
            { id: "edu-science-jst", name: "JST（科学技術振興機構）", amount: 3200, descriptionKey: "edu-science-jst" },
            { id: "edu-science-jaxa", name: "JAXA（宇宙航空研究開発）", amount: 2100, descriptionKey: "edu-science-jaxa" },
            { id: "edu-science-riken", name: "国立研究開発法人交付金", amount: 4600, descriptionKey: "edu-science-riken" },
            { id: "edu-science-kakenhi", name: "科研費（競争的研究資金）", amount: 3900, descriptionKey: "edu-science-kakenhi" },
          ],
        },
        {
          id: "edu-shien", name: "教育振興助成費", amount: 15200,
          children: [
            { id: "edu-daigaku-kokuritu", name: "国立大学法人運営費交付金", amount: 10900, descriptionKey: "edu-daigaku-kokuritu" },
            { id: "edu-daigaku-shiritsu", name: "私立大学等経常費補助", amount: 3200, descriptionKey: "edu-daigaku-shiritsu" },
            { id: "edu-shien-other", name: "その他教育助成", amount: 1100, descriptionKey: "edu-shien-other" },
          ],
        },
        {
          id: "edu-ikuei", name: "育英事業費（奨学金）", amount: 5200, descriptionKey: "edu-ikuei",
          children: [
            { id: "edu-ikuei-kyufu", name: "給付型奨学金", amount: 1800, descriptionKey: "edu-ikuei-kyufu" },
            { id: "edu-ikuei-kashitsuke", name: "貸付型奨学金原資", amount: 3400, descriptionKey: "edu-ikuei-kashitsuke" },
          ],
        },
        { id: "edu-shisetsu", name: "教育施設費", amount: 3085, descriptionKey: "edu-shisetsu" },
      ],
    },
    {
      id: "food",
      name: "食料安定供給関係費",
      amount: 13049,
      children: [
        {
          id: "food-kome", name: "農業経営安定対策", amount: 5800, descriptionKey: "food-kome",
          children: [
            { id: "food-kome-keiei", name: "収入保険・経営安定対策", amount: 3600, descriptionKey: "food-kome-keiei" },
            { id: "food-kome-kome", name: "米政策・備蓄米", amount: 2200, descriptionKey: "food-kome-kome" },
          ],
        },
        {
          id: "food-shokuhin", name: "食料品安定供給対策", amount: 4200, descriptionKey: "food-shokuhin",
          children: [
            { id: "food-shokuhin-suisan", name: "水産業振興", amount: 1800, descriptionKey: "food-shokuhin-suisan" },
            { id: "food-shokuhin-chiku", name: "畜産経営安定", amount: 2400, descriptionKey: "food-shokuhin-chiku" },
          ],
        },
        { id: "food-other", name: "その他", amount: 3049, descriptionKey: "food-other" },
      ],
    },
    {
      id: "energy",
      name: "エネルギー対策費",
      amount: 9238,
      children: [
        {
          id: "energy-saisei", name: "再生可能エネルギー対策", amount: 3800, descriptionKey: "energy-saisei",
          children: [
            { id: "energy-saisei-fitto", name: "FIT/FIP制度拠出", amount: 2200, descriptionKey: "energy-saisei-fitto" },
            { id: "energy-saisei-kaihatsu", name: "次世代エネルギー研究開発", amount: 1600, descriptionKey: "energy-saisei-kaihatsu" },
          ],
        },
        {
          id: "energy-setsuyaku", name: "省エネルギー対策", amount: 2600, descriptionKey: "energy-setsuyaku",
          children: [
            { id: "energy-setsuyaku-kaden", name: "省エネ家電・住宅補助", amount: 1500, descriptionKey: "energy-setsuyaku-kaden" },
            { id: "energy-setsuyaku-sangyo", name: "産業省エネ設備補助", amount: 1100, descriptionKey: "energy-setsuyaku-sangyo" },
          ],
        },
        { id: "energy-other", name: "その他エネルギー施策", amount: 2838, descriptionKey: "energy-other" },
      ],
    },
    {
      id: "sme",
      name: "中小企業対策費",
      amount: 1692,
      children: [
        {
          id: "sme-shien", name: "中小企業支援対策", amount: 980, descriptionKey: "sme-shien",
          children: [
            { id: "sme-shien-hojo", name: "デジタル化・設備補助金", amount: 560, descriptionKey: "sme-shien-hojo" },
            { id: "sme-shien-kinyu", name: "信用補完・融資支援", amount: 420, descriptionKey: "sme-shien-kinyu" },
          ],
        },
        { id: "sme-other", name: "その他", amount: 712, descriptionKey: "sme-other" },
      ],
    },
    {
      id: "oda",
      name: "経済協力費",
      amount: 5201,
      children: [
        {
          id: "oda-oda", name: "政府開発援助（ODA）", amount: 3800,
          children: [
            {
              id: "oda-oda-nichi", name: "二国間援助（円借款・無償・技協）", amount: 2800,
              children: [
                { id: "oda-oda-kuni", name: "国別援助額", amount: 2200, descriptionKey: "oda-oda-kuni" },
                { id: "oda-oda-jica", name: "JICAスキーム別内訳", amount: 600, descriptionKey: "oda-oda-jica" },
              ],
            },
            { id: "oda-oda-ngo", name: "NGO・緊急人道支援", amount: 1000, descriptionKey: "oda-oda-ngo" },
          ],
        },
        {
          id: "oda-kokusai", name: "国際機関分担金", amount: 1401,
          children: [
            { id: "oda-kokusai-un", name: "国連・WHO・UNHCR等", amount: 900, descriptionKey: "oda-kokusai-un" },
            { id: "oda-kokusai-adb", name: "国際金融機関（ADB・世銀等）", amount: 501, descriptionKey: "oda-kokusai-adb" },
          ],
        },
      ],
    },
    {
      id: "other",
      name: "その他の事項経費等",
      amount: 62950,
      children: [
        { id: "other-reserve", name: "予備費", amount: 10000, descriptionKey: "other-reserve" },
        { id: "other-gyosei", name: "一般行政費", amount: 32000, descriptionKey: "other-gyosei" },
        { id: "other-justice", name: "司法・警察関係費", amount: 12000, descriptionKey: "other-justice" },
        { id: "other-misc", name: "その他", amount: 8950, descriptionKey: "other-misc" },
      ],
    },
  ],
};

const budget2024: BudgetYear = {
  year: 2024,
  label: "令和6年度",
  total: 1125717,
  items: [
    {
      id: "social",
      name: "社会保障関係費",
      amount: 377193,
      children: [
        {
          id: "social-pension",
          name: "年金",
          amount: 131305,
          children: [
            {
              id: "social-pension-kosei", name: "厚生年金保険給付費", amount: 96500,
              children: [
                { id: "social-pension-kosei-rourei", name: "老齢厚生年金", amount: 72700, descriptionKey: "social-pension-kosei-rourei" },
                { id: "social-pension-kosei-shogai", name: "障害厚生年金", amount: 9600, descriptionKey: "social-pension-kosei-shogai" },
                { id: "social-pension-kosei-izoku", name: "遺族厚生年金", amount: 14200, descriptionKey: "social-pension-kosei-izoku" },
              ],
            },
            {
              id: "social-pension-kokumin", name: "国民年金給付費", amount: 23300,
              children: [
                { id: "social-pension-kokumin-rourei", name: "老齢基礎年金", amount: 17800, descriptionKey: "social-pension-kokumin-rourei" },
                { id: "social-pension-kokumin-shogai", name: "障害基礎年金", amount: 3500, descriptionKey: "social-pension-kokumin-shogai" },
                { id: "social-pension-kokumin-izoku", name: "遺族基礎年金", amount: 2000, descriptionKey: "social-pension-kokumin-izoku" },
              ],
            },
            { id: "social-pension-other", name: "その他年金関連", amount: 11505, descriptionKey: "social-pension-other" },
          ],
        },
        {
          id: "social-medical",
          name: "医療",
          amount: 123945,
          children: [
            {
              id: "social-medical-kenko", name: "健康保険給付費", amount: 47500,
              children: [
                { id: "social-medical-kenko-ryoyo", name: "療養給付費", amount: 31700, descriptionKey: "social-medical-kenko-ryoyo" },
                { id: "social-medical-kenko-kogaku", name: "高額療養費", amount: 9000, descriptionKey: "social-medical-kenko-kogaku" },
                { id: "social-medical-kenko-shobyo", name: "傷病手当金", amount: 3800, descriptionKey: "social-medical-kenko-shobyo" },
                { id: "social-medical-kenko-shussan", name: "出産育児一時金等", amount: 3000, descriptionKey: "social-medical-kenko-shussan" },
              ],
            },
            {
              id: "social-medical-roujin", name: "後期高齢者医療", amount: 39000,
              children: [
                { id: "social-medical-roujin-kyufu", name: "医療給付費", amount: 30700, descriptionKey: "social-medical-roujin-kyufu" },
                { id: "social-medical-roujin-shien", name: "支援金", amount: 5300, descriptionKey: "social-medical-roujin-shien" },
                { id: "social-medical-roujin-hoken", name: "保険料軽減補助", amount: 3000, descriptionKey: "social-medical-roujin-hoken" },
              ],
            },
            { id: "social-medical-kokaho", name: "国民健康保険", amount: 23200, descriptionKey: "social-medical-kokaho" },
            { id: "social-medical-other", name: "その他医療費", amount: 14245, descriptionKey: "social-medical-other" },
          ],
        },
        {
          id: "social-care",
          name: "介護",
          amount: 41234,
          children: [
            { id: "social-care-service", name: "介護給付費", amount: 34000, descriptionKey: "social-care-service" },
            { id: "social-care-other", name: "その他介護関連", amount: 7234, descriptionKey: "social-care-other" },
          ],
        },
        {
          id: "social-child",
          name: "少子化対策",
          amount: 31946,
          children: [
            {
              id: "social-child-jido", name: "児童手当", amount: 13000,
              children: [
                { id: "social-child-jido-ichiji", name: "0〜15歳分", amount: 12500, descriptionKey: "social-child-jido-ichiji" },
                { id: "social-child-jido-shushoku", name: "高校生年代拡充分（10月〜）", amount: 500, descriptionKey: "social-child-jido-shushoku" },
              ],
            },
            { id: "social-child-hoiku", name: "保育所関連", amount: 11200, descriptionKey: "social-child-hoiku" },
            { id: "social-child-kodomo", name: "こども家庭庁関連", amount: 7746, descriptionKey: "social-child-kodomo" },
          ],
        },
        {
          id: "social-welfare",
          name: "生活扶助等",
          amount: 39663,
          children: [
            {
              id: "social-welfare-seikatsu", name: "生活保護費", amount: 30800,
              children: [
                { id: "social-welfare-seikatsu-seikatsu", name: "生活扶助", amount: 10600, descriptionKey: "social-welfare-seikatsu-seikatsu" },
                { id: "social-welfare-seikatsu-jutaku", name: "住宅扶助", amount: 5500, descriptionKey: "social-welfare-seikatsu-jutaku" },
                { id: "social-welfare-seikatsu-iryo", name: "医療扶助", amount: 12500, descriptionKey: "social-welfare-seikatsu-iryo" },
                { id: "social-welfare-seikatsu-kyoiku", name: "教育扶助等", amount: 2200, descriptionKey: "social-welfare-seikatsu-kyoiku" },
              ],
            },
            { id: "social-welfare-shogai", name: "障害者支援", amount: 8863, descriptionKey: "social-welfare-shogai" },
          ],
        },
        {
          id: "social-employment",
          name: "雇用",
          amount: 7252,
          children: [
            {
              id: "social-emp-koyohoken", name: "雇用保険", amount: 4700,
              children: [
                { id: "social-emp-koyohoken-kyufu", name: "失業給付", amount: 3100, descriptionKey: "social-emp-koyohoken-kyufu" },
                { id: "social-emp-koyohoken-kyoshoku", name: "教育訓練給付", amount: 1600, descriptionKey: "social-emp-koyohoken-kyoshoku" },
              ],
            },
            { id: "social-emp-other", name: "その他雇用対策", amount: 2552, descriptionKey: "social-emp-other" },
          ],
        },
        { id: "social-other", name: "その他", amount: 1848, descriptionKey: "social-other" },
      ],
    },
    {
      id: "bond",
      name: "国債費",
      amount: 279738,
      children: [
        { id: "bond-interest", name: "利子及割引料", amount: 105714, descriptionKey: "bond-interest" },
        { id: "bond-repay", name: "国債償還費", amount: 174024, descriptionKey: "bond-repay" },
      ],
    },
    {
      id: "localalloc",
      name: "地方交付税交付金等",
      amount: 181024,
      children: [
        {
          id: "localalloc-kotei", name: "地方交付税交付金", amount: 152766,
          children: [
            { id: "localalloc-kotei-futsuu", name: "普通交付税", amount: 140000, descriptionKey: "localalloc-kotei-futsuu" },
            { id: "localalloc-kotei-tokubetsu", name: "特別交付税", amount: 12766, descriptionKey: "localalloc-kotei-tokubetsu" },
          ],
        },
        { id: "localalloc-joto", name: "地方譲与税譲与金", amount: 22115, descriptionKey: "localalloc-joto" },
        { id: "localalloc-tokurei", name: "地方特例交付金等", amount: 6143, descriptionKey: "localalloc-tokurei" },
      ],
    },
    {
      id: "defense",
      name: "防衛関係費",
      amount: 79172,
      children: [
        { id: "defense-jinken", name: "人件費・糧食費", amount: 23200, descriptionKey: "defense-jinken" },
        { id: "defense-busshi", name: "装備品等購入費", amount: 23500, descriptionKey: "defense-busshi" },
        { id: "defense-kenkyu", name: "研究開発費", amount: 7800, descriptionKey: "defense-kenkyu" },
        { id: "defense-shisetsu", name: "施設整備費", amount: 4200, descriptionKey: "defense-shisetsu" },
        { id: "defense-ippan", name: "一般物件費", amount: 14800, descriptionKey: "defense-ippan" },
        {
          id: "defense-other", name: "その他", amount: 5672,
          children: [
            { id: "defense-usfj", name: "在日米軍駐留経費負担（思いやり予算）", amount: 2320, descriptionKey: "defense-usfj" },
            { id: "defense-kichi", name: "基地対策費・SACO・同盟強靭化", amount: 1200, descriptionKey: "defense-kichi" },
            { id: "defense-other-misc", name: "その他防衛関連経費", amount: 2152, descriptionKey: "defense-other-misc" },
          ],
        },
      ],
    },
    {
      id: "public",
      name: "公共事業関係費",
      amount: 60936,
      children: [
        {
          id: "public-road", name: "道路整備", amount: 14500,
          children: [
            { id: "public-road-kosoku", name: "高速道路整備", amount: 4100, descriptionKey: "public-road-kosoku" },
            { id: "public-road-chokukatsu", name: "直轄国道整備", amount: 6600, descriptionKey: "public-road-chokukatsu" },
            { id: "public-road-hojo", name: "補助道路整備", amount: 3800, descriptionKey: "public-road-hojo" },
          ],
        },
        { id: "public-flood", name: "治山治水", amount: 9000, descriptionKey: "public-flood" },
        { id: "public-housing", name: "住宅・都市環境整備", amount: 6600, descriptionKey: "public-housing" },
        { id: "public-agri", name: "農業農村整備", amount: 5100, descriptionKey: "public-agri" },
        { id: "public-disaster", name: "災害復旧等", amount: 10500, descriptionKey: "public-disaster" },
        { id: "public-port", name: "港湾・空港・鉄道整備", amount: 3000, descriptionKey: "public-port" },
        { id: "public-forest", name: "林野公共事業", amount: 3700, descriptionKey: "public-forest" },
        { id: "public-fishery", name: "漁港漁場整備", amount: 2100, descriptionKey: "public-fishery" },
        { id: "public-other", name: "その他公共事業", amount: 6436, descriptionKey: "public-other" },
      ],
    },
    {
      id: "education",
      name: "文教及び科学振興費",
      amount: 53685,
      children: [
        {
          id: "edu-gikyo", name: "義務教育費国庫負担金", amount: 16400,
          children: [
            { id: "edu-gikyo-kyouin", name: "教職員給与負担", amount: 13600, descriptionKey: "edu-gikyo-kyouin" },
            { id: "edu-gikyo-tokushi", name: "特別支援教育加配", amount: 2800, descriptionKey: "edu-gikyo-tokushi" },
          ],
        },
        {
          id: "edu-science", name: "科学技術振興費", amount: 13800,
          children: [
            { id: "edu-science-jst", name: "JST（科学技術振興機構）", amount: 3200, descriptionKey: "edu-science-jst" },
            { id: "edu-science-jaxa", name: "JAXA（宇宙航空研究開発）", amount: 2100, descriptionKey: "edu-science-jaxa" },
            { id: "edu-science-riken", name: "国立研究開発法人交付金", amount: 4600, descriptionKey: "edu-science-riken" },
            { id: "edu-science-kakenhi", name: "科研費（競争的研究資金）", amount: 3900, descriptionKey: "edu-science-kakenhi" },
          ],
        },
        {
          id: "edu-shien", name: "教育振興助成費", amount: 14985,
          children: [
            { id: "edu-daigaku-kokuritu", name: "国立大学法人運営費交付金", amount: 10700, descriptionKey: "edu-daigaku-kokuritu" },
            { id: "edu-daigaku-shiritsu", name: "私立大学等経常費補助", amount: 3185, descriptionKey: "edu-daigaku-shiritsu" },
            { id: "edu-shien-other", name: "その他教育助成", amount: 1100, descriptionKey: "edu-shien-other" },
          ],
        },
        { id: "edu-ikuei", name: "育英事業費（奨学金）", amount: 5200, descriptionKey: "edu-ikuei" },
        { id: "edu-shisetsu", name: "教育施設費", amount: 3300, descriptionKey: "edu-shisetsu" },
      ],
    },
    {
      id: "food",
      name: "食料安定供給関係費",
      amount: 13049,
      children: [
        { id: "food-kome", name: "農業経営安定対策", amount: 5600, descriptionKey: "food-kome" },
        { id: "food-shokuhin", name: "食料品安定供給対策", amount: 4100, descriptionKey: "food-shokuhin" },
        { id: "food-other", name: "その他", amount: 3349, descriptionKey: "food-other" },
      ],
    },
    {
      id: "energy",
      name: "エネルギー対策費",
      amount: 9238,
      children: [
        { id: "energy-saisei", name: "再生可能エネルギー対策", amount: 3700, descriptionKey: "energy-saisei" },
        { id: "energy-setsuyaku", name: "省エネルギー対策", amount: 2500, descriptionKey: "energy-setsuyaku" },
        { id: "energy-other", name: "その他エネルギー施策", amount: 3038, descriptionKey: "energy-other" },
      ],
    },
    {
      id: "sme",
      name: "中小企業対策費",
      amount: 1692,
      children: [
        { id: "sme-shien", name: "中小企業支援対策", amount: 980, descriptionKey: "sme-shien" },
        { id: "sme-other", name: "その他", amount: 712, descriptionKey: "sme-other" },
      ],
    },
    {
      id: "oda",
      name: "経済協力費",
      amount: 5201,
      children: [
        {
          id: "oda-oda", name: "政府開発援助（ODA）", amount: 3800,
          children: [
            {
              id: "oda-oda-nichi", name: "二国間援助（円借款・無償・技協）", amount: 2800,
              children: [
                { id: "oda-oda-kuni", name: "国別援助額", amount: 2200, descriptionKey: "oda-oda-kuni" },
                { id: "oda-oda-jica", name: "JICAスキーム別内訳", amount: 600, descriptionKey: "oda-oda-jica" },
              ],
            },
            { id: "oda-oda-ngo", name: "NGO・緊急人道支援", amount: 1000, descriptionKey: "oda-oda-ngo" },
          ],
        },
        {
          id: "oda-kokusai", name: "国際機関分担金", amount: 1401,
          children: [
            { id: "oda-kokusai-un", name: "国連・WHO・UNHCR等", amount: 900, descriptionKey: "oda-kokusai-un" },
            { id: "oda-kokusai-adb", name: "国際金融機関（ADB・世銀等）", amount: 501, descriptionKey: "oda-kokusai-adb" },
          ],
        },
      ],
    },
    {
      id: "other",
      name: "その他の事項経費等",
      amount: 65789,
      children: [
        { id: "other-reserve", name: "予備費", amount: 10000, descriptionKey: "other-reserve" },
        { id: "other-gyosei", name: "一般行政費", amount: 32000, descriptionKey: "other-gyosei" },
        { id: "other-justice", name: "司法・警察関係費", amount: 12000, descriptionKey: "other-justice" },
        { id: "other-misc", name: "その他", amount: 11789, descriptionKey: "other-misc" },
      ],
    },
  ],
};

const budget2023: BudgetYear = {
  year: 2023,
  label: "令和5年度",
  total: 1141312,
  items: [
    {
      id: "social",
      name: "社会保障関係費",
      amount: 368889,
      children: [
        {
          id: "social-pension",
          name: "年金",
          amount: 128500,
          children: [
            {
              id: "social-pension-kosei", name: "厚生年金保険給付費", amount: 94500,
              children: [
                { id: "social-pension-kosei-rourei", name: "老齢厚生年金", amount: 71200, descriptionKey: "social-pension-kosei-rourei" },
                { id: "social-pension-kosei-shogai", name: "障害厚生年金", amount: 9400, descriptionKey: "social-pension-kosei-shogai" },
                { id: "social-pension-kosei-izoku", name: "遺族厚生年金", amount: 13900, descriptionKey: "social-pension-kosei-izoku" },
              ],
            },
            {
              id: "social-pension-kokumin", name: "国民年金給付費", amount: 22700,
              children: [
                { id: "social-pension-kokumin-rourei", name: "老齢基礎年金", amount: 17300, descriptionKey: "social-pension-kokumin-rourei" },
                { id: "social-pension-kokumin-shogai", name: "障害基礎年金", amount: 3400, descriptionKey: "social-pension-kokumin-shogai" },
                { id: "social-pension-kokumin-izoku", name: "遺族基礎年金", amount: 2000, descriptionKey: "social-pension-kokumin-izoku" },
              ],
            },
            { id: "social-pension-other", name: "その他年金関連", amount: 11300, descriptionKey: "social-pension-other" },
          ],
        },
        {
          id: "social-medical",
          name: "医療",
          amount: 121200,
          children: [
            {
              id: "social-medical-kenko", name: "健康保険給付費", amount: 46500,
              children: [
                { id: "social-medical-kenko-ryoyo", name: "療養給付費", amount: 31000, descriptionKey: "social-medical-kenko-ryoyo" },
                { id: "social-medical-kenko-kogaku", name: "高額療養費", amount: 8800, descriptionKey: "social-medical-kenko-kogaku" },
                { id: "social-medical-kenko-shobyo", name: "傷病手当金", amount: 3700, descriptionKey: "social-medical-kenko-shobyo" },
                { id: "social-medical-kenko-shussan", name: "出産育児一時金等", amount: 3000, descriptionKey: "social-medical-kenko-shussan" },
              ],
            },
            {
              id: "social-medical-roujin", name: "後期高齢者医療", amount: 38200,
              children: [
                { id: "social-medical-roujin-kyufu", name: "医療給付費", amount: 30100, descriptionKey: "social-medical-roujin-kyufu" },
                { id: "social-medical-roujin-shien", name: "支援金", amount: 5200, descriptionKey: "social-medical-roujin-shien" },
                { id: "social-medical-roujin-hoken", name: "保険料軽減補助", amount: 2900, descriptionKey: "social-medical-roujin-hoken" },
              ],
            },
            { id: "social-medical-kokaho", name: "国民健康保険", amount: 22600, descriptionKey: "social-medical-kokaho" },
            { id: "social-medical-other", name: "その他医療費", amount: 13900, descriptionKey: "social-medical-other" },
          ],
        },
        {
          id: "social-care",
          name: "介護",
          amount: 39800,
          children: [
            { id: "social-care-service", name: "介護給付費", amount: 32800, descriptionKey: "social-care-service" },
            { id: "social-care-other", name: "その他介護関連", amount: 7000, descriptionKey: "social-care-other" },
          ],
        },
        {
          id: "social-child",
          name: "少子化対策",
          amount: 30000,
          children: [
            {
              id: "social-child-jido", name: "児童手当", amount: 12400,
              children: [
                { id: "social-child-jido-ichiji", name: "0〜15歳分", amount: 12400, descriptionKey: "social-child-jido-ichiji" },
              ],
            },
            { id: "social-child-hoiku", name: "保育所関連", amount: 10900, descriptionKey: "social-child-hoiku" },
            { id: "social-child-kodomo", name: "こども家庭庁関連", amount: 6700, descriptionKey: "social-child-kodomo" },
          ],
        },
        {
          id: "social-welfare",
          name: "生活扶助等",
          amount: 40700,
          children: [
            {
              id: "social-welfare-seikatsu", name: "生活保護費", amount: 31500,
              children: [
                { id: "social-welfare-seikatsu-seikatsu", name: "生活扶助", amount: 10900, descriptionKey: "social-welfare-seikatsu-seikatsu" },
                { id: "social-welfare-seikatsu-jutaku", name: "住宅扶助", amount: 5700, descriptionKey: "social-welfare-seikatsu-jutaku" },
                { id: "social-welfare-seikatsu-iryo", name: "医療扶助", amount: 12800, descriptionKey: "social-welfare-seikatsu-iryo" },
                { id: "social-welfare-seikatsu-kyoiku", name: "教育扶助等", amount: 2100, descriptionKey: "social-welfare-seikatsu-kyoiku" },
              ],
            },
            { id: "social-welfare-shogai", name: "障害者支援", amount: 9200, descriptionKey: "social-welfare-shogai" },
          ],
        },
        {
          id: "social-employment",
          name: "雇用",
          amount: 7089,
          children: [
            {
              id: "social-emp-koyohoken", name: "雇用保険", amount: 4600,
              children: [
                { id: "social-emp-koyohoken-kyufu", name: "失業給付", amount: 3100, descriptionKey: "social-emp-koyohoken-kyufu" },
                { id: "social-emp-koyohoken-kyoshoku", name: "教育訓練給付", amount: 1500, descriptionKey: "social-emp-koyohoken-kyoshoku" },
              ],
            },
            { id: "social-emp-other", name: "その他雇用対策", amount: 2489, descriptionKey: "social-emp-other" },
          ],
        },
        { id: "social-other", name: "その他", amount: 1600, descriptionKey: "social-other" },
      ],
    },
    {
      id: "bond",
      name: "国債費",
      amount: 255164,
      children: [
        { id: "bond-interest", name: "利子及割引料", amount: 87600, descriptionKey: "bond-interest" },
        { id: "bond-repay", name: "国債償還費", amount: 167564, descriptionKey: "bond-repay" },
      ],
    },
    {
      id: "localalloc",
      name: "地方交付税交付金等",
      amount: 181123,
      children: [
        {
          id: "localalloc-kotei", name: "地方交付税交付金", amount: 152300,
          children: [
            { id: "localalloc-kotei-futsuu", name: "普通交付税", amount: 139700, descriptionKey: "localalloc-kotei-futsuu" },
            { id: "localalloc-kotei-tokubetsu", name: "特別交付税", amount: 12600, descriptionKey: "localalloc-kotei-tokubetsu" },
          ],
        },
        { id: "localalloc-joto", name: "地方譲与税譲与金", amount: 21900, descriptionKey: "localalloc-joto" },
        { id: "localalloc-tokurei", name: "地方特例交付金等", amount: 6923, descriptionKey: "localalloc-tokurei" },
      ],
    },
    {
      id: "defense",
      name: "防衛関係費",
      amount: 68219,
      children: [
        { id: "defense-jinken", name: "人件費・糧食費", amount: 22800, descriptionKey: "defense-jinken" },
        { id: "defense-busshi", name: "装備品等購入費", amount: 19500, descriptionKey: "defense-busshi" },
        { id: "defense-kenkyu", name: "研究開発費", amount: 6200, descriptionKey: "defense-kenkyu" },
        { id: "defense-shisetsu", name: "施設整備費", amount: 3900, descriptionKey: "defense-shisetsu" },
        { id: "defense-ippan", name: "一般物件費", amount: 12100, descriptionKey: "defense-ippan" },
        {
          id: "defense-other", name: "その他", amount: 3719,
          children: [
            { id: "defense-usfj", name: "在日米軍駐留経費負担（思いやり予算）", amount: 2110, descriptionKey: "defense-usfj" },
            { id: "defense-kichi", name: "基地対策費・SACO・同盟強靭化", amount: 980, descriptionKey: "defense-kichi" },
            { id: "defense-other-misc", name: "その他防衛関連経費", amount: 629, descriptionKey: "defense-other-misc" },
          ],
        },
      ],
    },
    {
      id: "public",
      name: "公共事業関係費",
      amount: 60828,
      children: [
        {
          id: "public-road", name: "道路整備", amount: 14200,
          children: [
            { id: "public-road-kosoku", name: "高速道路整備", amount: 4000, descriptionKey: "public-road-kosoku" },
            { id: "public-road-chokukatsu", name: "直轄国道整備", amount: 6500, descriptionKey: "public-road-chokukatsu" },
            { id: "public-road-hojo", name: "補助道路整備", amount: 3700, descriptionKey: "public-road-hojo" },
          ],
        },
        { id: "public-flood", name: "治山治水", amount: 8900, descriptionKey: "public-flood" },
        { id: "public-housing", name: "住宅・都市環境整備", amount: 6500, descriptionKey: "public-housing" },
        { id: "public-agri", name: "農業農村整備", amount: 5000, descriptionKey: "public-agri" },
        { id: "public-disaster", name: "災害復旧等", amount: 10800, descriptionKey: "public-disaster" },
        { id: "public-port", name: "港湾・空港・鉄道整備", amount: 2900, descriptionKey: "public-port" },
        { id: "public-forest", name: "林野公共事業", amount: 3600, descriptionKey: "public-forest" },
        { id: "public-fishery", name: "漁港漁場整備", amount: 2000, descriptionKey: "public-fishery" },
        { id: "public-other", name: "その他公共事業", amount: 6928, descriptionKey: "public-other" },
      ],
    },
    {
      id: "education",
      name: "文教及び科学振興費",
      amount: 53341,
      children: [
        {
          id: "edu-gikyo", name: "義務教育費国庫負担金", amount: 16300,
          children: [
            { id: "edu-gikyo-kyouin", name: "教職員給与負担", amount: 13500, descriptionKey: "edu-gikyo-kyouin" },
            { id: "edu-gikyo-tokushi", name: "特別支援教育加配", amount: 2800, descriptionKey: "edu-gikyo-tokushi" },
          ],
        },
        {
          id: "edu-science", name: "科学技術振興費", amount: 13700,
          children: [
            { id: "edu-science-jst", name: "JST（科学技術振興機構）", amount: 3100, descriptionKey: "edu-science-jst" },
            { id: "edu-science-jaxa", name: "JAXA（宇宙航空研究開発）", amount: 2000, descriptionKey: "edu-science-jaxa" },
            { id: "edu-science-riken", name: "国立研究開発法人交付金", amount: 4600, descriptionKey: "edu-science-riken" },
            { id: "edu-science-kakenhi", name: "科研費（競争的研究資金）", amount: 4000, descriptionKey: "edu-science-kakenhi" },
          ],
        },
        {
          id: "edu-shien", name: "教育振興助成費", amount: 14741,
          children: [
            { id: "edu-daigaku-kokuritu", name: "国立大学法人運営費交付金", amount: 10500, descriptionKey: "edu-daigaku-kokuritu" },
            { id: "edu-daigaku-shiritsu", name: "私立大学等経常費補助", amount: 3141, descriptionKey: "edu-daigaku-shiritsu" },
            { id: "edu-shien-other", name: "その他教育助成", amount: 1100, descriptionKey: "edu-shien-other" },
          ],
        },
        { id: "edu-ikuei", name: "育英事業費（奨学金）", amount: 5100, descriptionKey: "edu-ikuei" },
        { id: "edu-shisetsu", name: "教育施設費", amount: 3500, descriptionKey: "edu-shisetsu" },
      ],
    },
    {
      id: "food",
      name: "食料安定供給関係費",
      amount: 13045,
      children: [
        { id: "food-kome", name: "農業経営安定対策", amount: 5500, descriptionKey: "food-kome" },
        { id: "food-shokuhin", name: "食料品安定供給対策", amount: 4000, descriptionKey: "food-shokuhin" },
        { id: "food-other", name: "その他", amount: 3545, descriptionKey: "food-other" },
      ],
    },
    {
      id: "energy",
      name: "エネルギー対策費",
      amount: 8681,
      children: [
        { id: "energy-saisei", name: "再生可能エネルギー対策", amount: 3500, descriptionKey: "energy-saisei" },
        { id: "energy-setsuyaku", name: "省エネルギー対策", amount: 2300, descriptionKey: "energy-setsuyaku" },
        { id: "energy-other", name: "その他エネルギー施策", amount: 2881, descriptionKey: "energy-other" },
      ],
    },
    {
      id: "sme",
      name: "中小企業対策費",
      amount: 1785,
      children: [
        { id: "sme-shien", name: "中小企業支援対策", amount: 1050, descriptionKey: "sme-shien" },
        { id: "sme-other", name: "その他", amount: 735, descriptionKey: "sme-other" },
      ],
    },
    {
      id: "oda",
      name: "経済協力費",
      amount: 5362,
      children: [
        {
          id: "oda-oda", name: "政府開発援助（ODA）", amount: 3900,
          children: [
            {
              id: "oda-oda-nichi", name: "二国間援助（円借款・無償・技協）", amount: 2900,
              children: [
                { id: "oda-oda-kuni", name: "国別援助額", amount: 2280, descriptionKey: "oda-oda-kuni" },
                { id: "oda-oda-jica", name: "JICAスキーム別内訳", amount: 620, descriptionKey: "oda-oda-jica" },
              ],
            },
            { id: "oda-oda-ngo", name: "NGO・緊急人道支援", amount: 1000, descriptionKey: "oda-oda-ngo" },
          ],
        },
        {
          id: "oda-kokusai", name: "国際機関分担金", amount: 1462,
          children: [
            { id: "oda-kokusai-un", name: "国連・WHO・UNHCR等", amount: 962, descriptionKey: "oda-kokusai-un" },
            { id: "oda-kokusai-adb", name: "国際金融機関（ADB・世銀等）", amount: 500, descriptionKey: "oda-kokusai-adb" },
          ],
        },
      ],
    },
    {
      id: "other",
      name: "その他の事項経費等",
      amount: 124875,
      children: [
        { id: "other-reserve", name: "予備費", amount: 51000, descriptionKey: "other-reserve" },
        { id: "other-gyosei", name: "一般行政費", amount: 34000, descriptionKey: "other-gyosei" },
        { id: "other-justice", name: "司法・警察関係費", amount: 11800, descriptionKey: "other-justice" },
        { id: "other-misc", name: "その他", amount: 28075, descriptionKey: "other-misc" },
      ],
    },
  ],
};

// ─── 令和8年度予算（2026年4月7日成立・過去最高） ───────────────────────────
// 出典: 財務省「令和8年度予算のポイント」
// 歳出総額: 122兆3,092億円
const budget2026: BudgetYear = {
  year: 2026,
  label: "令和8年度",
  total: 1223092,
  items: [
    {
      id: "social",
      name: "社会保障関係費",
      amount: 390559,
      children: [
        {
          id: "social-pension",
          name: "年金",
          amount: 136905,
          children: [
            {
              id: "social-pension-kosei", name: "厚生年金保険給付費", amount: 100700,
              children: [
                { id: "social-pension-kosei-rourei", name: "老齢厚生年金", amount: 76000, descriptionKey: "social-pension-kosei-rourei" },
                { id: "social-pension-kosei-shogai", name: "障害厚生年金", amount: 10100, descriptionKey: "social-pension-kosei-shogai" },
                { id: "social-pension-kosei-izoku", name: "遺族厚生年金", amount: 14600, descriptionKey: "social-pension-kosei-izoku" },
              ],
            },
            {
              id: "social-pension-kokumin", name: "国民年金給付費", amount: 24430,
              children: [
                { id: "social-pension-kokumin-rourei", name: "老齢基礎年金", amount: 18650, descriptionKey: "social-pension-kokumin-rourei" },
                { id: "social-pension-kokumin-shogai", name: "障害基礎年金", amount: 3620, descriptionKey: "social-pension-kokumin-shogai" },
                { id: "social-pension-kokumin-izoku", name: "遺族基礎年金", amount: 2160, descriptionKey: "social-pension-kokumin-izoku" },
              ],
            },
            { id: "social-pension-other", name: "その他年金関連", amount: 11775, descriptionKey: "social-pension-other" },
          ],
        },
        {
          id: "social-medical",
          name: "医療",
          amount: 127128,
          children: [
            {
              id: "social-medical-kenko", name: "健康保険給付費", amount: 49300,
              children: [
                { id: "social-medical-kenko-ryoyo", name: "療養給付費", amount: 33100, descriptionKey: "social-medical-kenko-ryoyo" },
                { id: "social-medical-kenko-kogaku", name: "高額療養費", amount: 9300, descriptionKey: "social-medical-kenko-kogaku" },
                { id: "social-medical-kenko-shobyo", name: "傷病手当金", amount: 3900, descriptionKey: "social-medical-kenko-shobyo" },
                { id: "social-medical-kenko-shussan", name: "出産育児一時金等", amount: 3000, descriptionKey: "social-medical-kenko-shussan" },
              ],
            },
            {
              id: "social-medical-roujin", name: "後期高齢者医療", amount: 40600,
              children: [
                { id: "social-medical-roujin-kyufu", name: "医療給付費", amount: 32000, descriptionKey: "social-medical-roujin-kyufu" },
                { id: "social-medical-roujin-shien", name: "支援金", amount: 5500, descriptionKey: "social-medical-roujin-shien" },
                { id: "social-medical-roujin-hoken", name: "保険料軽減補助", amount: 3100, descriptionKey: "social-medical-roujin-hoken" },
              ],
            },
            {
              id: "social-medical-kokaho", name: "国民健康保険", amount: 24000, descriptionKey: "social-medical-kokaho",
              children: [
                { id: "social-medical-kokaho-kyufu", name: "療養給付費等交付金", amount: 16000, descriptionKey: "social-medical-kokaho-kyufu" },
                { id: "social-medical-kokaho-shien", name: "財政安定化支援金", amount: 4900, descriptionKey: "social-medical-kokaho-shien" },
                { id: "social-medical-kokaho-hoken", name: "保険料軽減補助", amount: 3100, descriptionKey: "social-medical-kokaho-hoken" },
              ],
            },
            { id: "social-medical-other", name: "その他医療費", amount: 13228, descriptionKey: "social-medical-other" },
          ],
        },
        {
          id: "social-care",
          name: "介護",
          amount: 43260,
          children: [
            {
              id: "social-care-service", name: "介護給付費", amount: 35900, descriptionKey: "social-care-service",
              children: [
                { id: "social-care-kyotaku", name: "居宅介護サービス", amount: 16800, descriptionKey: "social-care-kyotaku" },
                { id: "social-care-shisetsu", name: "施設介護サービス", amount: 12800, descriptionKey: "social-care-shisetsu" },
                { id: "social-care-chiiki", name: "地域密着型サービス", amount: 4300, descriptionKey: "social-care-chiiki" },
                { id: "social-care-yobo", name: "介護予防サービス", amount: 2000, descriptionKey: "social-care-yobo" },
              ],
            },
            { id: "social-care-other", name: "その他介護関連", amount: 7360, descriptionKey: "social-care-other" },
          ],
        },
        {
          id: "social-child",
          name: "少子化対策",
          amount: 38340,
          children: [
            {
              id: "social-child-jido", name: "児童手当", amount: 14700,
              children: [
                { id: "social-child-jido-ichiji", name: "0〜15歳分", amount: 11200, descriptionKey: "social-child-jido-ichiji" },
                { id: "social-child-jido-shushoku", name: "高校生年代拡充分", amount: 3500, descriptionKey: "social-child-jido-shushoku" },
              ],
            },
            {
              id: "social-child-hoiku", name: "保育所関連", amount: 12200, descriptionKey: "social-child-hoiku",
              children: [
                { id: "social-child-hoiku-unei", name: "保育所等運営費", amount: 9100, descriptionKey: "social-child-hoiku-unei" },
                { id: "social-child-hoiku-seibi", name: "保育所等整備費", amount: 3100, descriptionKey: "social-child-hoiku-seibi" },
              ],
            },
            {
              id: "social-child-kodomo", name: "こども家庭庁関連", amount: 11440, descriptionKey: "social-child-kodomo",
              children: [
                { id: "social-child-kodomo-kyufu", name: "こども・子育て給付", amount: 7900, descriptionKey: "social-child-kodomo-kyufu" },
                { id: "social-child-kodomo-shien", name: "地域子育て支援", amount: 3540, descriptionKey: "social-child-kodomo-shien" },
              ],
            },
          ],
        },
        {
          id: "social-welfare",
          name: "生活扶助等",
          amount: 37553,
          children: [
            {
              id: "social-welfare-seikatsu", name: "生活保護費", amount: 30253,
              children: [
                { id: "social-welfare-seikatsu-seikatsu", name: "生活扶助", amount: 10400, descriptionKey: "social-welfare-seikatsu-seikatsu" },
                { id: "social-welfare-seikatsu-jutaku", name: "住宅扶助", amount: 5400, descriptionKey: "social-welfare-seikatsu-jutaku" },
                { id: "social-welfare-seikatsu-iryo", name: "医療扶助", amount: 12300, descriptionKey: "social-welfare-seikatsu-iryo" },
                { id: "social-welfare-seikatsu-kyoiku", name: "教育扶助等", amount: 2153, descriptionKey: "social-welfare-seikatsu-kyoiku" },
              ],
            },
            {
              id: "social-welfare-shogai", name: "障害者支援", amount: 7300, descriptionKey: "social-welfare-shogai",
              children: [
                { id: "social-welfare-shogai-kyotaku", name: "居宅系サービス", amount: 4200, descriptionKey: "social-welfare-shogai-kyotaku" },
                { id: "social-welfare-shogai-shisetsu", name: "施設系サービス", amount: 3100, descriptionKey: "social-welfare-shogai-shisetsu" },
              ],
            },
          ],
        },
        {
          id: "social-employment",
          name: "雇用",
          amount: 7373,
          children: [
            {
              id: "social-emp-koyohoken", name: "雇用保険", amount: 4900,
              children: [
                { id: "social-emp-koyohoken-kyufu", name: "失業給付", amount: 3300, descriptionKey: "social-emp-koyohoken-kyufu" },
                { id: "social-emp-koyohoken-kyoshoku", name: "教育訓練給付", amount: 1600, descriptionKey: "social-emp-koyohoken-kyoshoku" },
              ],
            },
            {
              id: "social-emp-other", name: "その他雇用対策", amount: 2473, descriptionKey: "social-emp-other",
              children: [
                { id: "social-emp-other-koyo", name: "雇用維持・創出補助", amount: 1550, descriptionKey: "social-emp-other-koyo" },
                { id: "social-emp-other-shuroh", name: "ハローワーク運営", amount: 923, descriptionKey: "social-emp-other-shuroh" },
              ],
            },
          ],
        },
      ],
    },
    {
      id: "bond",
      name: "国債費",
      amount: 312758,
      children: [
        {
          id: "bond-interest", name: "利子及割引料", amount: 130500, descriptionKey: "bond-interest",
          children: [
            { id: "bond-interest-naiku", name: "内国債利子", amount: 115000, descriptionKey: "bond-interest-naiku" },
            { id: "bond-interest-gaiku", name: "外債利子", amount: 9000, descriptionKey: "bond-interest-gaiku" },
            { id: "bond-interest-kariire", name: "借入金利子等", amount: 6500, descriptionKey: "bond-interest-kariire" },
          ],
        },
        {
          id: "bond-repay", name: "国債償還費", amount: 182258, descriptionKey: "bond-repay",
          children: [
            { id: "bond-repay-teiri", name: "普通国債償還費", amount: 147000, descriptionKey: "bond-repay-teiri" },
            { id: "bond-repay-zaimu", name: "財投債等償還費", amount: 35258, descriptionKey: "bond-repay-zaimu" },
          ],
        },
      ],
    },
    {
      id: "localalloc",
      name: "地方交付税交付金等",
      amount: 208778,
      children: [
        {
          id: "localalloc-kotei", name: "地方交付税交付金", amount: 175000,
          children: [
            { id: "localalloc-kotei-futsuu", name: "普通交付税", amount: 160000, descriptionKey: "localalloc-kotei-futsuu" },
            { id: "localalloc-kotei-tokubetsu", name: "特別交付税", amount: 15000, descriptionKey: "localalloc-kotei-tokubetsu" },
          ],
        },
        {
          id: "localalloc-joto", name: "地方譲与税譲与金", amount: 25000, descriptionKey: "localalloc-joto",
          children: [
            { id: "localalloc-joto-kihatsu", name: "地方揮発油譲与税", amount: 16000, descriptionKey: "localalloc-joto-kihatsu" },
            { id: "localalloc-joto-ton", name: "特別とん譲与税等", amount: 9000, descriptionKey: "localalloc-joto-ton" },
          ],
        },
        { id: "localalloc-tokurei", name: "地方特例交付金等", amount: 8778, descriptionKey: "localalloc-tokurei" },
      ],
    },
    {
      id: "defense",
      name: "防衛関係費",
      amount: 88093,
      children: [
        {
          id: "defense-jinken", name: "人件費・糧食費", amount: 24400, descriptionKey: "defense-jinken",
          children: [
            { id: "defense-jinken-jinkensen", name: "給与・手当・退職金", amount: 20900, descriptionKey: "defense-jinken-jinkensen" },
            { id: "defense-jinken-ryoshoku", name: "糧食・被服・営舎費", amount: 3500, descriptionKey: "defense-jinken-ryoshoku" },
          ],
        },
        {
          id: "defense-busshi", name: "装備品等購入費", amount: 27800, descriptionKey: "defense-busshi",
          children: [
            { id: "defense-busshi-kokuki", name: "航空機等", amount: 8700, descriptionKey: "defense-busshi-kokuki" },
            { id: "defense-busshi-kansetsu", name: "艦船等", amount: 7400, descriptionKey: "defense-busshi-kansetsu" },
            { id: "defense-busshi-buki", name: "誘導弾・弾薬", amount: 6200, descriptionKey: "defense-busshi-buki" },
            { id: "defense-busshi-shatei", name: "車両・火器", amount: 3400, descriptionKey: "defense-busshi-shatei" },
            { id: "defense-busshi-other", name: "その他装備品", amount: 2100, descriptionKey: "defense-busshi-other" },
          ],
        },
        {
          id: "defense-kenkyu", name: "研究開発費", amount: 8500, descriptionKey: "defense-kenkyu",
          children: [
            { id: "defense-kenkyu-kaihatsu", name: "次世代装備研究開発", amount: 5900, descriptionKey: "defense-kenkyu-kaihatsu" },
            { id: "defense-kenkyu-sangaku", name: "産学連携・安全保障技術", amount: 2600, descriptionKey: "defense-kenkyu-sangaku" },
          ],
        },
        {
          id: "defense-shisetsu", name: "施設整備費", amount: 4600, descriptionKey: "defense-shisetsu",
          children: [
            { id: "defense-shisetsu-eizetsu", name: "基地・駐屯地整備", amount: 2950, descriptionKey: "defense-shisetsu-eizetsu" },
            { id: "defense-shisetsu-beigun", name: "在日米軍関連", amount: 1650, descriptionKey: "defense-shisetsu-beigun" },
          ],
        },
        { id: "defense-ippan", name: "一般物件費", amount: 14144, descriptionKey: "defense-ippan" },
        {
          id: "defense-other", name: "その他", amount: 8649,
          children: [
            { id: "defense-usfj", name: "在日米軍駐留経費負担（思いやり予算）", amount: 2780, descriptionKey: "defense-usfj" },
            { id: "defense-kichi", name: "基地対策費・SACO・同盟強靭化", amount: 1900, descriptionKey: "defense-kichi" },
            { id: "defense-other-misc", name: "その他防衛関連経費", amount: 3969, descriptionKey: "defense-other-misc" },
          ],
        },
      ],
    },
    {
      id: "public",
      name: "公共事業関係費",
      amount: 61078,
      children: [
        {
          id: "public-road", name: "道路整備", amount: 14860,
          children: [
            { id: "public-road-kosoku", name: "高速道路整備", amount: 4200, descriptionKey: "public-road-kosoku" },
            { id: "public-road-chokukatsu", name: "直轄国道整備", amount: 6900, descriptionKey: "public-road-chokukatsu" },
            { id: "public-road-hojo", name: "補助道路整備", amount: 3760, descriptionKey: "public-road-hojo" },
          ],
        },
        {
          id: "public-flood", name: "治山治水", amount: 9200, descriptionKey: "public-flood",
          children: [
            { id: "public-flood-chisui", name: "砂防・急傾斜地対策", amount: 3800, descriptionKey: "public-flood-chisui" },
            { id: "public-flood-kasenhojo", name: "河川整備", amount: 5400, descriptionKey: "public-flood-kasenhojo" },
          ],
        },
        {
          id: "public-housing", name: "住宅・都市環境整備", amount: 6800, descriptionKey: "public-housing",
          children: [
            { id: "public-housing-toshi", name: "都市再開発・公園整備", amount: 4100, descriptionKey: "public-housing-toshi" },
            { id: "public-housing-suido", name: "水道施設整備", amount: 2700, descriptionKey: "public-housing-suido" },
          ],
        },
        { id: "public-agri", name: "農業農村整備", amount: 5300, descriptionKey: "public-agri" },
        { id: "public-disaster", name: "災害復旧等", amount: 10600, descriptionKey: "public-disaster" },
        { id: "public-port", name: "港湾・空港・鉄道整備", amount: 3100, descriptionKey: "public-port" },
        { id: "public-forest", name: "林野公共事業", amount: 3800, descriptionKey: "public-forest" },
        { id: "public-fishery", name: "漁港漁場整備", amount: 2100, descriptionKey: "public-fishery" },
        { id: "public-other", name: "その他公共事業", amount: 5318, descriptionKey: "public-other" },
      ],
    },
    {
      id: "education",
      name: "文教及び科学振興費",
      amount: 60406,
      children: [
        {
          id: "edu-gikyo", name: "義務教育費国庫負担金", amount: 17906,
          children: [
            { id: "edu-gikyo-kyouin", name: "教職員給与負担", amount: 14980, descriptionKey: "edu-gikyo-kyouin" },
            { id: "edu-gikyo-tokushi", name: "特別支援教育加配", amount: 2926, descriptionKey: "edu-gikyo-tokushi" },
          ],
        },
        {
          id: "edu-science", name: "科学技術振興費", amount: 14250,
          children: [
            { id: "edu-science-jst", name: "JST（科学技術振興機構）", amount: 3349, descriptionKey: "edu-science-jst" },
            { id: "edu-science-jaxa", name: "JAXA（宇宙航空研究開発）", amount: 2200, descriptionKey: "edu-science-jaxa" },
            { id: "edu-science-riken", name: "国立研究開発法人交付金", amount: 4700, descriptionKey: "edu-science-riken" },
            { id: "edu-science-kakenhi", name: "科研費（競争的研究資金）", amount: 4001, descriptionKey: "edu-science-kakenhi" },
          ],
        },
        {
          id: "edu-shien", name: "教育振興助成費", amount: 19650,
          children: [
            { id: "edu-daigaku-kokuritu", name: "国立大学法人運営費交付金", amount: 11088, descriptionKey: "edu-daigaku-kokuritu" },
            { id: "edu-daigaku-shiritsu", name: "私立大学等経常費補助", amount: 3250, descriptionKey: "edu-daigaku-shiritsu" },
            { id: "edu-koukou-musho", name: "高校無償化（就学支援金拡充）", amount: 1876, descriptionKey: "edu-koukou-musho" },
            { id: "edu-kyushoku-musho", name: "給食無償化（給食費負担軽減）", amount: 1649, descriptionKey: "edu-kyushoku-musho" },
            { id: "edu-shien-other", name: "その他教育助成", amount: 1787, descriptionKey: "edu-shien-other" },
          ],
        },
        {
          id: "edu-ikuei", name: "育英事業費（奨学金）", amount: 5300, descriptionKey: "edu-ikuei",
          children: [
            { id: "edu-ikuei-kyufu", name: "給付型奨学金", amount: 1900, descriptionKey: "edu-ikuei-kyufu" },
            { id: "edu-ikuei-kashitsuke", name: "貸付型奨学金原資", amount: 3400, descriptionKey: "edu-ikuei-kashitsuke" },
          ],
        },
        { id: "edu-shisetsu", name: "教育施設費", amount: 3300, descriptionKey: "edu-shisetsu" },
      ],
    },
    {
      id: "food",
      name: "食料安定供給関係費",
      amount: 13300,
      children: [
        {
          id: "food-kome", name: "農業経営安定対策", amount: 5900, descriptionKey: "food-kome",
          children: [
            { id: "food-kome-keiei", name: "収入保険・経営安定対策", amount: 3700, descriptionKey: "food-kome-keiei" },
            { id: "food-kome-kome", name: "米政策・備蓄米", amount: 2200, descriptionKey: "food-kome-kome" },
          ],
        },
        {
          id: "food-shokuhin", name: "食料品安定供給対策", amount: 4200, descriptionKey: "food-shokuhin",
          children: [
            { id: "food-shokuhin-suisan", name: "水産業振興", amount: 1800, descriptionKey: "food-shokuhin-suisan" },
            { id: "food-shokuhin-chiku", name: "畜産経営安定", amount: 2400, descriptionKey: "food-shokuhin-chiku" },
          ],
        },
        { id: "food-other", name: "その他", amount: 3200, descriptionKey: "food-other" },
      ],
    },
    {
      id: "energy",
      name: "エネルギー対策費",
      amount: 9500,
      children: [
        {
          id: "energy-saisei", name: "再生可能エネルギー対策", amount: 3900, descriptionKey: "energy-saisei",
          children: [
            { id: "energy-saisei-fitto", name: "FIT/FIP制度拠出", amount: 2300, descriptionKey: "energy-saisei-fitto" },
            { id: "energy-saisei-kaihatsu", name: "次世代エネルギー研究開発", amount: 1600, descriptionKey: "energy-saisei-kaihatsu" },
          ],
        },
        {
          id: "energy-setsuyaku", name: "省エネルギー対策", amount: 2700, descriptionKey: "energy-setsuyaku",
          children: [
            { id: "energy-setsuyaku-kaden", name: "省エネ家電・住宅補助", amount: 1600, descriptionKey: "energy-setsuyaku-kaden" },
            { id: "energy-setsuyaku-sangyo", name: "産業省エネ設備補助", amount: 1100, descriptionKey: "energy-setsuyaku-sangyo" },
          ],
        },
        { id: "energy-other", name: "その他エネルギー施策", amount: 2900, descriptionKey: "energy-other" },
      ],
    },
    {
      id: "sme",
      name: "中小企業対策費",
      amount: 1730,
      children: [
        {
          id: "sme-shien", name: "中小企業支援対策", amount: 1020, descriptionKey: "sme-shien",
          children: [
            { id: "sme-shien-hojo", name: "デジタル化・設備補助金", amount: 580, descriptionKey: "sme-shien-hojo" },
            { id: "sme-shien-kinyu", name: "信用補完・融資支援", amount: 440, descriptionKey: "sme-shien-kinyu" },
          ],
        },
        { id: "sme-other", name: "その他", amount: 710, descriptionKey: "sme-other" },
      ],
    },
    {
      id: "oda",
      name: "経済協力費",
      amount: 5234,
      children: [
        {
          id: "oda-oda", name: "政府開発援助（ODA）", amount: 3833,
          children: [
            {
              id: "oda-oda-nichi", name: "二国間援助（円借款・無償・技協）", amount: 2833,
              children: [
                { id: "oda-oda-kuni", name: "国別援助額", amount: 2233, descriptionKey: "oda-oda-kuni" },
                { id: "oda-oda-jica", name: "JICAスキーム別内訳", amount: 600, descriptionKey: "oda-oda-jica" },
              ],
            },
            { id: "oda-oda-ngo", name: "NGO・緊急人道支援", amount: 1000, descriptionKey: "oda-oda-ngo" },
          ],
        },
        {
          id: "oda-kokusai", name: "国際機関分担金", amount: 1401,
          children: [
            { id: "oda-kokusai-un", name: "国連・WHO・UNHCR等", amount: 900, descriptionKey: "oda-kokusai-un" },
            { id: "oda-kokusai-adb", name: "国際金融機関（ADB・世銀等）", amount: 501, descriptionKey: "oda-kokusai-adb" },
          ],
        },
      ],
    },
    {
      id: "other",
      name: "その他の事項経費等",
      amount: 71656,
      children: [
        { id: "other-reserve", name: "予備費", amount: 10000, descriptionKey: "other-reserve" },
        { id: "other-gyosei", name: "一般行政費", amount: 35000, descriptionKey: "other-gyosei" },
        { id: "other-gaikoku", name: "外国人施策等", amount: 2250, descriptionKey: "other-gaikoku" },
        { id: "other-justice", name: "司法・警察関係費", amount: 12590, descriptionKey: "other-justice" },
        { id: "other-misc", name: "その他", amount: 11816, descriptionKey: "other-misc" },
      ],
    },
  ],
};

export const budgetData: BudgetYear[] = [budget2026, budget2025, budget2024, budget2023];

export function formatAmount(amount: number): string {
  if (amount >= 10000) {
    return `${(amount / 10000).toFixed(1)}兆円`;
  }
  return `${amount.toLocaleString()}億円`;
}

export function formatPercent(amount: number, total: number): string {
  return `${((amount / total) * 100).toFixed(1)}%`;
}
