/**
 * 各予算項目の詳細説明文
 * 最深階層の項目にカーソルを当てたときに表示される
 */
export const itemDescriptions: Record<string, string> = {
  // ── 社会保障 > 年金 ──
  "social-pension-kosei-rourei":
    "65歳以上で厚生年金に加入していた人に支給。受給額は在職中の標準報酬月額と加入期間から算出。受給者は約4,600万人（令和6年度）。",
  "social-pension-kosei-shogai":
    "厚生年金加入中に初診日がある傷病で一定以上の障害が残った場合に支給（1〜3級）。1級は2級の1.25倍。",
  "social-pension-kosei-izoku":
    "厚生年金加入者が死亡した場合に配偶者・子・父母等の遺族に支給。報酬比例部分の3/4相当額。",

  "social-pension-kokumin-rourei":
    "40年間保険料を完納した場合の満額は月約6.8万円（令和6年度）。自営業者・フリーランス・学生等が対象。",
  "social-pension-kokumin-shogai":
    "国民年金加入中に初診日がある傷病で1・2級の障害が残った場合に支給。月額約8.1万円（1級）。",
  "social-pension-kokumin-izoku":
    "国民年金加入者が死亡した場合、子のある配偶者または18歳未満の子に支給。",

  // ── 社会保障 > 医療 ──
  "social-medical-kenko-ryoyo":
    "病院・診療所での診察・入院・手術・処方薬等の医療費のうち患者負担（原則3割）を除いた分を国が補助。",
  "social-medical-kenko-kogaku":
    "1か月の医療費が自己負担限度額を超えた場合に超過分を支給。上限額は所得区分で5段階に設定。",
  "social-medical-kenko-shobyo":
    "業務外の病気・ケガで連続4日以上休業した場合、標準報酬日額の2/3を最大1年6か月間支給。",
  "social-medical-kenko-shussan":
    "子1人の出産につき50万円を一括支給（産科医療補償制度加入の場合）。多胎出産は人数分支給。",

  "social-medical-roujin-kyufu":
    "75歳以上の医療費を支援する後期高齢者医療制度の給付費。窓口負担は1割（現役並み所得者は3割）。",
  "social-medical-roujin-shien":
    "後期高齢者医療制度を支えるための若年層保険者からの支援金。公費と合わせて財源を構成。",
  "social-medical-roujin-hoken":
    "後期高齢者が納付する保険料分への公費補助。低所得者には保険料軽減措置を適用。",

  "social-medical-kokaho-kyufu":
    "市区町村が運営する国民健康保険の給付費への国庫負担。自営業者・退職者等の医療費を支援。",
  "social-medical-kokaho-shien":
    "国民健康保険の財政安定化のための支援金。医療費の伸びを踏まえて毎年見直し。",
  "social-medical-kokaho-hoken":
    "低所得の国民健康保険加入者への保険料軽減分を国が補助。均等割・平等割の軽減措置。",

  // ── 社会保障 > 介護 ──
  "social-care-kyotaku":
    "訪問介護・訪問看護・デイサービス・ショートステイ等、自宅で生活しながら受ける介護サービスへの給付。",
  "social-care-shisetsu":
    "特別養護老人ホーム・介護老人保健施設・介護医療院等の施設に入所する場合の介護費用への給付。",
  "social-care-chiiki":
    "認知症グループホーム・小規模多機能型居宅介護等、地域密着型サービスへの給付。市区町村が指定・監督。",
  "social-care-yobo":
    "要支援1・2の方が利用する介護予防サービスおよび生活支援サービスへの給付。重度化防止が目的。",

  // ── 社会保障 > 少子化対策 ──
  "social-child-jido-ichiji":
    "0〜2歳は月1.5万円、3歳〜高校生は月1万円（第3子以降3万円）を支給。所得制限撤廃（令和6年度〜）。",
  "social-child-jido-shushoku":
    "高校生年代（16〜18歳）への児童手当支給（令和6年度より拡充）。月額1万円（第3子以降3万円）。",

  "social-child-hoiku-unei":
    "認可保育所・認定こども園等の運営費補助。施設の定員規模や地域区分に応じた公定価格で計算。",
  "social-child-hoiku-seibi":
    "待機児童解消のための保育所等新設・増設支援。施設整備費および関連インフラ整備への補助。",

  "social-child-kodomo-kyufu":
    "こども家庭庁が所管する各種給付（子育て支援給付・高等教育無償化拡充等）への費用。",
  "social-child-kodomo-shien":
    "地域の子育て支援拠点・産後ケア・ヤングケアラー支援等の地方交付金。市区町村の取り組みを支援。",

  // ── 社会保障 > 生活保護 ──
  "social-welfare-seikatsu-seikatsu":
    "衣食住等の日常生活費。受給者1人当たり月額は単身世帯で約7.5万円（居住地・年齢で異なる）。",
  "social-welfare-seikatsu-jutaku":
    "家賃実額を基準額の範囲内で支給。東京都内の単身世帯は上限53,700円。",
  "social-welfare-seikatsu-iryo":
    "医療保険の自己負担分を公費で賄う医療扶助。生活保護費の約半分を占める最大の費目。",
  "social-welfare-seikatsu-kyoiku":
    "義務教育就学中の子どもの学用品費・給食費・修学旅行費等。高校生の授業料・教材費も対象。",

  "social-welfare-shogai-kyotaku":
    "重度訪問介護・行動援護・就労継続支援A・B型等の障害福祉サービス費。障害者総合支援法に基づく。",
  "social-welfare-shogai-shisetsu":
    "障害者支援施設・グループホーム等への入所・利用に係る費用。施設の種類・利用状況で給付額が変動。",

  // ── 社会保障 > 雇用 ──
  "social-emp-koyohoken-kyufu":
    "失業した場合の基本手当（失業給付）。被保険者期間・年齢・離職理由により給付日数が90〜360日。",
  "social-emp-koyohoken-kyoshoku":
    "在職中のスキルアップのための教育訓練給付（一般・特定一般・専門実践）。最大112万円の補助。",

  "social-emp-other-koyo":
    "雇用調整助成金・キャリアアップ助成金・特定求職者雇用開発助成金等。企業の雇用維持・創出を支援。",
  "social-emp-other-shuroh":
    "ハローワーク（公共職業安定所）の運営費。職業紹介・職業訓練のあっせん等の就職支援サービス。",

  // ── 国債費 ──
  "bond-interest-naiku":
    "内国債（国内向け普通国債・財投債等）の利払い費。日銀保有分を含む。金利上昇の影響を大きく受ける。",
  "bond-interest-gaiku":
    "外国向け外貨建て債券の利払い費。円安が進むと円換算で増加する傾向がある。",
  "bond-interest-kariire":
    "政府が一時的な資金繰りのために行う借入金の利子。財政融資資金借入等が主体。",

  "bond-repay-teiri":
    "普通国債の定率繰上償還（借換除く）。償還財源として剰余金・国債整理基金の積立金を充当。",
  "bond-repay-zaimu":
    "財投債・政府保証債等の償還費。財政投融資特別会計からの繰入れで賄われる部分も含む。",

  // ── 地方交付税 ──
  "localalloc-kotei-futsuu":
    "人口・面積・産業構造等から算出した基準財政需要額と税収見込みとの差額を補填する交付金。使途は自由。",
  "localalloc-kotei-tokubetsu":
    "災害・過疎・寒冷補正等の特別の事情がある団体に対して普通交付税とは別枠で交付。",
  "localalloc-joto-kihatsu":
    "揮発油税の一定割合を都道府県・市区町村の道路財源として譲与。道路延長・面積等で按分。",
  "localalloc-joto-ton":
    "船舶のトン数に応じて課税される特別とん税の全額を港湾施設のある市町村へ譲与。",

  // ── 防衛 ──
  "defense-jinken-jinkensen":
    "自衛官・防衛省職員の給与・各種手当・退職金等。定員約24万人（令和6年度）の人件費。",
  "defense-jinken-ryoshoku":
    "自衛官の糧食（食事）・被服・営舎・光熱水料等の基本的な隊員生活を支える維持費。",

  "defense-busshi-kokuki":
    "F-35A/B戦闘機・F-2支援戦闘機・P-1哨戒機・C-2輸送機等の航空機購入・改修費。",
  "defense-busshi-kansetsu":
    "護衛艦（イージス艦含む）・潜水艦・補給艦・掃海艇等の建造・大規模改修費。",
  "defense-busshi-buki":
    "スタンド・オフミサイル（12式地対艦誘導弾能力向上型等）・各種弾薬の調達。防衛力抜本的強化の中核。",
  "defense-busshi-shatei":
    "10式戦車・16式機動戦闘車・19式自走榴弾砲・軽装甲機動車等の調達費。",

  "defense-kenkyu-kaihatsu":
    "次期戦闘機（F-X）・高エネルギーレーザー・電磁波対処能力等の先端技術研究開発費。",
  "defense-kenkyu-sangaku":
    "防衛省と大学・民間企業の共同研究。安全保障技術研究推進制度による競争的資金配分。",

  "defense-shisetsu-eizetsu":
    "自衛隊基地・駐屯地等の営舎・庁舎・格納庫等の整備・維持費。老朽化施設の更新が課題。",
  "defense-shisetsu-beigun":
    "在日米軍施設の共同使用・SACO（沖縄に関する特別行動委員会）関係経費。移転・跡地整備等。",

  "defense-usfj":
    "日米地位協定に基づき日本が負担する在日米軍の駐留経費（思いやり予算）。労務費・施設整備費・光熱水料が三本柱。5年ごとの特別協定で金額を決定。令和7年度は約2,680億円。",
  "defense-kichi":
    "基地周辺住民への防音工事・騒音対策、SACO合意に基づく沖縄基地の移設・返還経費、米軍再編関連（グアム移転等）の同盟強靭化予算を含む。",

  // ── 公共事業 ──
  "public-road-kosoku":
    "NEXCO3社・首都高・阪神高速等との連携事業および国土交通省直轄の高速道路建設・4車線化費用。",
  "public-road-chokukatsu":
    "国土交通省が直接管理する一般国道の新設・拡幅・改良・維持管理費。重要物流道路の機能強化も含む。",
  "public-road-hojo":
    "都道府県・市区町村が管理する幹線道路への国庫補助金。補助率は事業種別により1/2〜2/3。",

  "public-flood-chisui":
    "洪水・土石流・地滑り等を防ぐ砂防堰堤・護岸・遊砂池等の整備費。気候変動対応で重要度増加。",
  "public-flood-kasenhojo":
    "国土交通省が直接管理する一級河川の堤防強化・河道掘削・水門整備等の直轄・補助河川事業。",

  "public-housing-toshi":
    "市街地再開発・土地区画整理・都市公園・下水道整備等への国庫補助。コンパクトシティ化支援。",
  "public-housing-suido":
    "水道施設の老朽化更新・耐震化への支援。小規模水道の統廃合・広域化促進費も含む。",

  // ── 文教・科学 > 大学振興 ──
  "edu-daigaku-kokuritu":
    "86の国立大学法人に交付する運営費交付金。授業料収入だけでは賄えない教育・研究費用を国が補助。東大・京大等の研究大学から地方国立大まで規模に応じて配分。",
  "edu-daigaku-shiritsu":
    "全国約600校の私立大学・短期大学に交付する経常費補助。学生数・教職員数等に基づき日本私立学校振興・共済事業団を通じて配分。私立大学の授業料抑制にも貢献。",

  // ── 文教・科学 ──
  "edu-gikyo-kyouin":
    "義務教育（小中学校）の教職員給与の1/3を国が負担する制度。約30万人の公立学校教員の給与財源。",
  "edu-gikyo-tokushi":
    "特別支援学校・通級指導教室等の障害のある子どもへの教育支援のための加配措置費用。",

  "edu-science-jst":
    "科学技術振興機構（JST）への運営費交付金。CREST・さきがけ等の競争的資金配分事業を運営。",
  "edu-science-jaxa":
    "宇宙航空研究開発機構（JAXA）への運営費交付金。H3ロケット・X線天文衛星・月探査等の宇宙開発。",
  "edu-science-riken":
    "理化学研究所・産業技術総合研究所・物質・材料研究機構等の国立研究開発法人への運営費交付金。",
  "edu-science-kakenhi":
    "日本学術振興会が配分する科学研究費補助金（科研費）。大学・研究機関の基礎研究を支える最大規模の競争的資金。",

  "edu-ikuei-kyufu":
    "日本学生支援機構（JASSO）が運営する返済不要の給付型奨学金。住民税非課税世帯等を対象。",
  "edu-ikuei-kashitsuke":
    "第一種（無利子）・第二種（有利子）奨学金の原資。約130万人が利用。低所得者への返還支援制度あり。",

  // ── 食料安定供給 ──
  "food-kome-keiei":
    "農業収入が一定水準を下回った場合に補填する収入保険・ゲタ対策等の経営安定対策。農家の所得下支え。",
  "food-kome-kome":
    "主食用米の生産調整（転作奨励金）・備蓄米の買入・適正備蓄維持等の政策的コスト。",

  "food-shokuhin-suisan":
    "水産物の資源管理・漁業経営安定・漁業共済・水産物流通合理化等への支援。",
  "food-shokuhin-chiku":
    "畜産物（牛乳・食肉・鶏卵等）の価格安定・経営安定・生産基盤強化への補助金。",

  // ── エネルギー ──
  "energy-saisei-fitto":
    "再エネ固定価格買取制度（FIT/FIP）の買取費用に対する国費拠出。太陽光・風力・地熱等が対象。",
  "energy-saisei-kaihatsu":
    "洋上風力・水素・アンモニア等の次世代エネルギー技術の研究開発・実証事業への補助。",

  "energy-setsuyaku-kaden":
    "省エネ家電（エアコン・給湯器・LED等）の買替支援や省エネリフォーム補助。脱炭素化促進。",
  "energy-setsuyaku-sangyo":
    "工場・事業所の省エネ設備更新・エネルギーマネジメントシステム（EMS）導入への補助金。",

  // ── 中小企業 ──
  "sme-shien-hojo":
    "中小企業デジタル化・省エネ設備導入補助金（ものづくり補助金・IT導入補助金等）への拠出。",
  "sme-shien-kinyu":
    "中小企業信用補完制度（信用保証協会）への出資・補助。融資アクセス向上と貸し倒れリスク低減。",

  // ── ODA ──
  "oda-oda-kuni":
    "二国間援助のうち、受取国ごとの配分額。円借款はインド・バングラデシュ・インドネシアなどアジア新興国のインフラ整備が中心。無償資金協力はアフリカ・中東・島嶼国が重点地域。",
  "oda-oda-jica":
    "JICAが実施する三本柱（有償資金協力・無償資金協力・技術協力）のスキーム別事業費内訳。専門家派遣・研修員受入・国際緊急援助隊等を含む。",
  "oda-oda-ngo":
    "NGO・市民社会との連携による草の根援助・国際緊急援助・難民支援等への拠出。",

  "oda-kokusai-un":
    "国連・WHO・WFP・UNHCR等の国際機関への分担金・拠出金。国際社会における日本の責任分担。",
  "oda-kokusai-adb":
    "アジア開発銀行（ADB）・世界銀行・IMF等の国際金融機関への出資・拠出。",

  // ── その他 ──
  "other-reserve-tsujou":
    "年度途中の緊急経費や自然災害対応のための予備費。使用実績は翌年国会に報告。令和5年度実績は約3,200億円。",
  "other-gyosei-naikaku":
    "内閣府・各省庁の一般的な業務運営費（人件費除く）。デジタル庁・個人情報保護委員会等の新設省庁費も含む。",
  "other-justice-keisatsu":
    "警察庁・都道府県警察への国庫補助（給与の1/2等）。サイバー犯罪・テロ対策強化分野に重点配分。",
  "other-justice-shihoh":
    "最高裁判所・下級裁判所・検察庁・矯正施設（刑務所等）・法務局等の運営費。",

  // ── 社会保障 > 年金（追加） ──
  "social-pension-other":
    "独立行政法人福祉医療機構等への職域加算補助・共済年金関連の調整費・事務費など、主要年金区分以外の年金関連経費。",

  // ── 社会保障 > 医療（追加） ──
  "social-medical-other":
    "健康保険制度の調整交付金・事務費等、療養給付・高額療養・出産一時金以外の医療保険関連経費の合算。",
  "social-medical-kokaho":
    "市区町村が運営する国民健康保険への国庫負担の総額。療養給付費交付金・財政安定化支援金・保険料軽減補助の3区分で構成。自営業者・退職者等約2,600万人が加入。",

  // ── 社会保障 > 介護（追加） ──
  "social-care-other":
    "介護保険制度の調整交付金・事務費・システム整備費等、居宅・施設・地域密着・予防以外の介護関連経費。",
  "social-care-service":
    "介護保険制度に基づく介護サービス給付費への国庫負担（給付費の25%）。居宅・施設・地域密着・介護予防の各サービスへの支出合計。受給者は約680万人。",

  // ── 社会保障 > 少子化対策（追加） ──
  "social-child-hoiku":
    "認可保育所・認定こども園等の保育サービス全体への国費支援。施設の日常的な運営費補助と、待機児童解消のための新設・増設整備費の2本柱で構成。",
  "social-child-kodomo":
    "こども家庭庁が所管する子育て支援施策全般への国費。こども・子育て給付（育児休業給付等の制度拡充分）と地域子育て支援（産後ケア・ヤングケアラー支援等）の2区分。",

  // ── 社会保障 > 障害者（追加） ──
  "social-welfare-shogai":
    "障害者総合支援法に基づく障害福祉サービス費への国庫負担（給付費の50%）。訪問介護・就労支援等の居宅系と、障害者支援施設・グループホーム等の施設系の2区分で構成。",

  // ── 社会保障 > 雇用（追加） ──
  "social-emp-other":
    "雇用保険の失業給付・教育訓練給付以外の雇用対策費。雇用調整助成金等の雇用維持・創出補助と、ハローワーク（公共職業安定所）の運営費の2区分で構成。",

  // ── 社会保障 > その他 ──
  "social-other":
    "社会保障関係費のうち年金・医療・介護・子育て・生活保護・障害・雇用以外の調整費等。社会福祉施設整備費・社会保険制度全般の共通事務費等が含まれる。",

  // ── 国債費（追加） ──
  "bond-interest":
    "国が発行した国債・借入金の利子支払い費用の総額。内国債（普通国債・財投債等）の利子が大部分を占め、金利上昇の影響を強く受ける。令和7年度は約11兆円。",
  "bond-repay":
    "普通国債・財投債等の元本返済費用（定率繰上償還含む）。国債残高は約1,000兆円超で毎年度の償還費は一般会計歳出の約6割を占める。借換債（再発行分）は含まない。",

  // ── 地方交付税（追加） ──
  "localalloc-joto":
    "国税の一定割合を使途指定なしで地方公共団体へ配分する制度。道路財源の地方揮発油譲与税（約1.4兆円）と港湾財源の特別とん譲与税等が主体。",
  "localalloc-tokurei":
    "住宅ローン減税等の国税減収により地方税収が不足する分を補填する特例的な交付金。地方財政への影響を緩和するための財政調整措置。",

  // ── 防衛（追加） ──
  "defense-busshi":
    "航空機・艦船・弾薬・火器・車両等の装備品購入費の総計。防衛力抜本的強化計画（令和5〜9年度）のもとで大幅に増額。5年間で43兆円規模の防衛費拡充の中核。",
  "defense-busshi-other":
    "航空機・艦船・弾薬・戦車以外の装備品（通信機器・レーダー・電子戦装置・特殊車両等）の調達費。デジタル・情報領域の装備品調達が近年増加傾向。",
  "defense-ippan":
    "自衛隊の活動に必要な燃料・弾薬維持・装備品の維持整備・光熱水料・通信費・輸送費等の運営経費。演習・訓練の実施頻度に応じて変動する。",
  "defense-jinken":
    "自衛官・防衛省職員（約26万人）の給与・各種手当・退職金等の人件費と、隊員の食事・被服・営舎等の基本生活費（糧食費）の合計。防衛費の約4割を占める。",
  "defense-kenkyu":
    "将来の防衛装備技術確保のための研究開発費の合計。次世代戦闘機（F-X）等の先端技術研究と、大学・民間企業との産学連携研究（安全保障技術研究推進制度）の2本柱。",
  "defense-shisetsu":
    "自衛隊基地・駐屯地の営舎・庁舎・格納庫等の整備費と、在日米軍施設の日米共同使用に関連するSACO関連施設整備費の合計。老朽化対策が課題。",
  "defense-other-misc":
    "防衛省が所管する経費のうち人件費・物件費・装備品・研究開発・施設整備以外の経費。予備費・調整費・サイバー防衛関連費等が含まれる。",

  // ── 公共事業（追加） ──
  "public-flood":
    "洪水・土砂災害から人命・財産を守るための治山・治水事業費の総称。砂防堰堤・急傾斜地崩壊対策（林野庁・国交省）と一級河川の堤防強化・河道整備の2区分で構成。",
  "public-housing":
    "住みやすい都市環境整備への国費支援の総称。市街地再開発・土地区画整理・都市公園・下水道整備（国交省）と水道施設の老朽化更新・耐震化（厚労省）の2区分。",
  "public-agri":
    "農村地域の農地・用排水路・農道・圃場整備等の基盤整備事業への国庫補助。食料自給率向上と農業の生産性改善のためのインフラ整備。農林水産省が主管。",
  "public-disaster":
    "台風・豪雨・地震等による公共インフラ（道路・河川・農地等）の被災箇所を国庫補助で復旧する事業費。激甚災害指定で補助率が最大90%まで引き上げられる。",
  "public-port":
    "国際競争力強化のための国際拠点港湾整備、空港旅客ターミナル・滑走路の拡充、新幹線・鉄道ネットワーク整備への国庫補助。物流・交通インフラの根幹。",
  "public-forest":
    "山地・森林における治山ダム・砂防工事・林道・作業道整備等の公共事業。国土保全・水源涵養機能の維持と、林業の効率化・木材安定供給の両面に貢献。",
  "public-fishery":
    "漁港の整備・防波堤改良・漁場環境保全（藻場・干潟・人工礁）等への国庫補助。水産業の生産基盤強化と沿岸漁業の安定操業を支援。水産庁が主管。",
  "public-other":
    "公共事業費のうち道路・治水・農業・港湾・住宅・都市整備等の主要事業以外の経費。広域道路・国際空間整備等の調整費・小規模事業支援等が含まれる。",

  // ── 文教・科学（追加） ──
  "edu-shisetsu":
    "小中高・特別支援学校等の公立学校施設の耐震化・改築・大規模改修への国庫補助。全国の学校約3万校の施設老朽化対策・バリアフリー化推進が主要課題。",
  "edu-shien-other":
    "教育助成費のうち義務教育費国庫負担・特別支援教育加配以外の教育支援。教材費・ICT環境整備・就学援助・不登校・いじめ対策関連の補助金等。",
  "edu-ikuei":
    "日本学生支援機構（JASSO）が運営する返済不要の給付型奨学金と有利子・無利子の貸与型奨学金の原資。経済的理由による進学断念を防ぎ、教育機会の均等を保障。",
  "edu-koukou-musho":
    "公立高校は授業料相当額を無償化、私立高校は就学支援金（年収590万円未満世帯で上限約40万円）を支給する制度への国費。令和7年度から所得制限を見直し拡充。",
  "edu-kyushoku-musho":
    "小中学校の給食費負担を軽減するための国費支援。自治体が給食費を無料化・値上げ抑制する際の補助金。令和7年度から段階的に本格化し、完全無償化を後押し。",

  // ── 食料安定供給（追加） ──
  "food-kome":
    "農家の経営安定を図る収入保険・直接支払い・水田活用直接支払い・備蓄米政策等の総称。食料自給率向上と農業所得の下支えが目的。農林水産省が主管。",
  "food-shokuhin":
    "水産物・畜産物の安定供給を支える価格安定・経営支援・生産基盤強化策の総称。漁業への各種補助金と、牛肉・牛乳・鶏卵等の畜産経営安定資金で構成。",
  "food-other":
    "食料安定供給関係費のうち農業経営安定対策・水産・畜産以外の経費。食品安全対策・農林水産物の輸出促進・農業研究開発推進等が含まれる。",

  // ── エネルギー（追加） ──
  "energy-saisei":
    "再生可能エネルギーの普及拡大に向けた国費支援の総称。太陽光・風力・地熱・バイオマス等のFIT/FIP買取費用への拠出と、洋上風力・水素等の次世代技術開発補助の2本柱。",
  "energy-setsuyaku":
    "エネルギー消費効率の改善に向けた補助の総称。家庭向け省エネ家電・住宅設備の買替支援と、工場・事業所の省エネ設備導入・エネルギーマネジメントシステム（EMS）補助の2区分。",
  "energy-other":
    "エネルギー政策費のうち再生可能エネルギー・省エネルギー以外の経費。原子力安全対策・石油備蓄・液化天然ガス（LNG）の安定供給確保・鉱山保安等が含まれる。",

  // ── 中小企業（追加） ──
  "sme-shien":
    "中小企業支援の2本柱。①設備投資・デジタル化への補助金（ものづくり補助金・IT導入補助金等）と、②信用保証制度（信用保証協会への出資）による資金繰り支援の合計。",
  "sme-other":
    "中小企業政策のうち補助金・信用保証以外の経費。商工会議所等による経営相談・販路開拓支援、事業承継対策、地域資源活用促進、小規模企業者向け支援等。",

  // ── その他（追加） ──
  "other-reserve":
    "年度途中の緊急事態（自然災害・感染症・物価急騰等）に対応する予備費。国会の議決なしに内閣が使用でき、使用後に国会へ報告する。コロナ禍では年間10兆円規模が積まれた。",
  "other-gyosei":
    "内閣府・各省庁の一般的な業務運営費（物件費・委託費・情報システム費等）。デジタル庁・こども家庭庁等の新設省庁関連費も含む。行政DX推進経費が近年増加傾向。",
  "other-justice":
    "治安・司法機能を担う機関の運営費の総称。警察庁（サイバー犯罪・テロ対策強化費を含む）と、裁判所・検察庁・法務省（矯正施設・出入国在留管理）の経費で構成。",
  "other-misc":
    "その他経費のうち予備費・一般行政費・司法警察費以外の経費。外交費・情報収集衛星関連費・府省横断的な共通経費等が含まれる。",
  "other-gaikoku":
    "外国人の在留管理（出入国在留管理庁）・生活支援・多文化共生施策への経費。在留外国人は約340万人（令和6年）で過去最多を更新中。日本語教育支援等も含む。",

  // ── 歳入（税金の出どころ） ──
  "rev-tax":
    "国の収入の柱となる税金と印紙収入の合計。所得税・法人税・消費税の基幹3税で税収の約8割を占める。景気動向に大きく左右され、近年は物価上昇に伴い過去最高を更新し続けている。",
  "rev-tax-shohi":
    "商品・サービスの消費に10%（食料品等は軽減税率8%）課される税。景気に左右されにくく税収が安定するため、社会保障の主要財源に位置づけられている。今や最大の税目。",
  "rev-tax-shotoku":
    "個人の給与・事業・投資などの所得に課される税。所得が多いほど税率が上がる累進課税（5〜45%）。源泉徴収と確定申告で納付され、長らく国の基幹税だった。",
  "rev-tax-hojin":
    "企業の利益（所得）に課される税。基本税率は23.2%。企業業績に連動するため景気変動の影響を最も強く受け、好況期には税収が大きく伸びる。",
  "rev-tax-sozoku":
    "亡くなった人から財産を相続・遺贈された際に、その取得額に応じて課される税（贈与税を含む）。基礎控除を超える部分が対象で、資産の再分配機能を担う。",
  "rev-tax-kihatsu":
    "ガソリンなどに課される税（揮発油税・地方揮発油税）。かつては道路整備の特定財源だったが、現在は使途を限定しない一般財源。ガソリン価格の一部を構成する。",
  "rev-tax-shu":
    "酒類の製造・輸入に課される税。ビール・日本酒・ウイスキー等、種類ごとに税率が異なる。かつての主要税目だが、消費の多様化・減少で構成比は低下傾向。",
  "rev-tax-tabako":
    "たばこの製造・輸入に課される国税（別途、地方たばこ税・たばこ特別税もある）。1箱の価格の約6割が税金。健康志向による喫煙率低下で税収は減少傾向。",
  "rev-tax-kanzei":
    "輸入品に課される税。国内産業の保護と財政収入の両面を担う。品目ごとに税率が定められ、経済連携協定（EPA）の拡大により対象・税率は変化している。",
  "rev-tax-inshi":
    "契約書・領収書などの文書に課される税で、収入印紙を貼付して納める。電子契約の普及により対象文書が減り、税収は緩やかに減少している。",
  "rev-tax-other":
    "相続税・揮発油税・酒税・たばこ税・関税・印紙収入以外の各種税収の合計。石油石炭税・電源開発促進税・自動車重量税・関税以外の消費課税・登録免許税などが含まれる。",
  "rev-other":
    "税金・公債以外の収入（税外収入）。日本銀行の国庫納付金、国有財産の売却・貸付収入、各種手数料、特別会計からの受入金、外国為替資金特別会計の剰余金などで構成される。",
  "rev-bond":
    "歳出を賄うために国が新たに発行する借金（新規国債）。建設公債と特例公債からなり、歳入の約4分の1を占める。将来世代の負担となり、国債残高は1,000兆円を超える。",
  "rev-bond-tokurei":
    "社会保障費など、建設国債の対象とならない歳出を賄うために発行する国債。いわゆる「赤字国債」。本来は財政法で禁止されており、毎年度の特例法で発行を認めている。公債金の大部分を占める。",
  "rev-bond-kensetsu":
    "道路・港湾・公共施設など、後世に残る社会資本（インフラ）の整備費を賄うために発行する国債。財政法で発行が認められており、将来世代も便益を受けるという考えに基づく。",
};

/**
 * 各予算項目の公式ページURL
 * itemDescriptions と同じキーを使用
 */
export const itemSourceUrls: Record<string, string> = {
  // ── 社会保障 > 年金 ──
  "social-pension-kosei-rourei": "https://www.nenkin.go.jp/service/jukyu/rourei/index.html",
  "social-pension-kosei-shogai": "https://www.nenkin.go.jp/service/jukyu/shougainenkin/index.html",
  "social-pension-kosei-izoku": "https://www.nenkin.go.jp/service/jukyu/izokunenkin/index.html",
  "social-pension-kokumin-rourei": "https://www.nenkin.go.jp/service/jukyu/rourei/index.html",
  "social-pension-kokumin-shogai": "https://www.nenkin.go.jp/service/jukyu/shougainenkin/index.html",
  "social-pension-kokumin-izoku": "https://www.nenkin.go.jp/service/jukyu/izokunenkin/index.html",

  // ── 社会保障 > 医療 ──
  "social-medical-kenko-ryoyo": "https://www.kyoukaikenpo.or.jp/g3/cat310/",
  "social-medical-kenko-kogaku": "https://www.kyoukaikenpo.or.jp/g3/cat310/sb3030/",
  "social-medical-kenko-shobyo": "https://www.kyoukaikenpo.or.jp/g3/cat310/sb3040/",
  "social-medical-kenko-shussan": "https://www.kyoukaikenpo.or.jp/g3/cat310/sb3060/",
  "social-medical-roujin-kyufu": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/iryouhoken/iryouhoken01/index.html",
  "social-medical-roujin-shien": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/iryouhoken/iryouhoken01/index.html",
  "social-medical-roujin-hoken": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/iryouhoken/iryouhoken01/index.html",
  "social-medical-kokaho-kyufu": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/iryouhoken/iryouhoken13/index.html",
  "social-medical-kokaho-shien": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/iryouhoken/iryouhoken13/index.html",
  "social-medical-kokaho-hoken": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/iryouhoken/iryouhoken13/index.html",

  // ── 社会保障 > 介護 ──
  "social-care-kyotaku": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/index.html",
  "social-care-shisetsu": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/index.html",
  "social-care-chiiki": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/index.html",
  "social-care-yobo": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/yobou/index.html",

  // ── 社会保障 > 少子化対策 ──
  "social-child-jido-ichiji": "https://www.cfa.go.jp/policies/jido_teate/",
  "social-child-jido-shushoku": "https://www.cfa.go.jp/policies/jido_teate/",
  "social-child-hoiku-unei": "https://www.cfa.go.jp/policies/hoiku/",
  "social-child-hoiku-seibi": "https://www.cfa.go.jp/policies/hoiku/",
  "social-child-kodomo-kyufu": "https://www.cfa.go.jp/",
  "social-child-kodomo-shien": "https://www.cfa.go.jp/policies/kosodateshien/",

  // ── 社会保障 > 生活保護 ──
  "social-welfare-seikatsu-seikatsu": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/index.html",
  "social-welfare-seikatsu-jutaku": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/index.html",
  "social-welfare-seikatsu-iryo": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/index.html",
  "social-welfare-seikatsu-kyoiku": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/seikatsuhogo/index.html",
  "social-welfare-shogai-kyotaku": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/index.html",
  "social-welfare-shogai-shisetsu": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/index.html",

  // ── 社会保障 > 雇用 ──
  "social-emp-koyohoken-kyufu": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/koyouhoken/index.html",
  "social-emp-koyohoken-kyoshoku": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/kyouiku/index.html",
  "social-emp-other-koyo": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/index.html",
  "social-emp-other-shuroh": "https://www.hellowork.mhlw.go.jp/",

  // ── 国債費 ──
  "bond-interest-naiku": "https://www.mof.go.jp/jgbs/index.html",
  "bond-interest-gaiku": "https://www.mof.go.jp/jgbs/index.html",
  "bond-interest-kariire": "https://www.mof.go.jp/budget/fiscal_condition/index.html",
  "bond-repay-teiri": "https://www.mof.go.jp/jgbs/reference/index.html",
  "bond-repay-zaimu": "https://www.mof.go.jp/policy/zaito/index.html",

  // ── 地方交付税 ──
  "localalloc-kotei-futsuu": "https://www.soumu.go.jp/main_sosiki/c-zaisei/koufuzei/koufuzei.html",
  "localalloc-kotei-tokubetsu": "https://www.soumu.go.jp/main_sosiki/c-zaisei/koufuzei/koufuzei.html",
  "localalloc-joto-kihatsu": "https://www.soumu.go.jp/main_sosiki/c-zaisei/joto_zei.html",
  "localalloc-joto-ton": "https://www.soumu.go.jp/main_sosiki/c-zaisei/joto_zei.html",

  // ── 防衛 ──
  "defense-jinken-jinkensen": "https://www.mod.go.jp/gsdf/jieikanbosyu/treatment/",
  "defense-jinken-ryoshoku": "https://www.mod.go.jp/gsdf/jieikanbosyu/treatment/",
  "defense-busshi-kokuki": "https://www.mod.go.jp/atla/choutatsu.html",
  "defense-busshi-kansetsu": "https://www.mod.go.jp/atla/choutatsu.html",
  "defense-busshi-buki": "https://www.mod.go.jp/atla/choutatsu.html",
  "defense-busshi-shatei": "https://www.mod.go.jp/atla/choutatsu.html",
  "defense-kenkyu-kaihatsu": "https://www.mod.go.jp/atla/kenkyuu.html",
  "defense-kenkyu-sangaku": "https://www.mod.go.jp/atla/funding.html",
  "defense-shisetsu-eizetsu": "https://www.mod.go.jp/j/approach/chouwa/sisetsuseibi/index.html",
  "defense-shisetsu-beigun": "https://www.mod.go.jp/j/approach/zaibeigun/us_sisetsu/",

  // ── 公共事業 ──
  "public-road-kosoku": "https://www.mlit.go.jp/road/index.html",
  "public-road-chokukatsu": "https://www.mlit.go.jp/road/index.html",
  "public-road-hojo": "https://www.mlit.go.jp/road/index.html",
  "public-flood-chisui": "https://www.mlit.go.jp/mizukokudo/sabo/index.html",
  "public-flood-kasenhojo": "https://www.mlit.go.jp/river/index.html",
  "public-housing-toshi": "https://www.mlit.go.jp/toshi/index.html",
  "public-housing-suido": "https://www.mlit.go.jp/mizukokudo/sewerage/index.html",

  // ── 文教・科学 ──
  "edu-gikyo-kyouin": "https://www.mext.go.jp/a_menu/shotou/kyoin/index.htm",
  "edu-gikyo-tokushi": "https://www.mext.go.jp/a_menu/shotou/tokubetu/main.htm",
  "edu-science-jst": "https://www.jst.go.jp/",
  "edu-science-jaxa": "https://www.jaxa.jp/",
  "edu-science-riken": "https://www.mext.go.jp/a_menu/kagaku/pdfa/index.htm",
  "edu-science-kakenhi": "https://www.jsps.go.jp/j-grantsinaid/",
  "edu-ikuei-kyufu": "https://www.jasso.go.jp/shogakukin/kyufu/index.html",
  "edu-ikuei-kashitsuke": "https://www.jasso.go.jp/shogakukin/index.html",

  // ── 食料安定供給 ──
  "food-kome-keiei": "https://www.maff.go.jp/j/keiei/index.html",
  "food-kome-kome": "https://www.maff.go.jp/j/syouan/keikaku/index.html",
  "food-shokuhin-suisan": "https://www.jfa.maff.go.jp/",
  "food-shokuhin-chiku": "https://www.maff.go.jp/j/chikusan/index.html",

  // ── エネルギー ──
  "energy-saisei-fitto": "https://www.enecho.meti.go.jp/category/saving_and_new/saiene/",
  "energy-saisei-kaihatsu": "https://www.nedo.go.jp/",
  "energy-setsuyaku-kaden": "https://www.enecho.meti.go.jp/category/saving_and_new/saving/",
  "energy-setsuyaku-sangyo": "https://www.enecho.meti.go.jp/category/saving_and_new/saving/",

  // ── 中小企業 ──
  "sme-shien-hojo": "https://www.chusho.meti.go.jp/keiei/index.html",
  "sme-shien-kinyu": "https://www.chusho.meti.go.jp/kinyu/index.html",

  // ── 文教・科学 > 大学振興 ──
  "edu-daigaku-kokuritu": "https://www.mext.go.jp/a_menu/koutou/houjin/index.htm",
  "edu-daigaku-shiritsu": "https://www.shigaku.go.jp/s_subsidy.htm",

  // ── 防衛 > 在日米軍・基地 ──
  "defense-usfj": "https://www.mod.go.jp/j/approach/zaibeigun/us_keihi/index.html",
  "defense-kichi": "https://www.mod.go.jp/j/approach/chouwa/index.html",

  // ── ODA ──
  "oda-oda-kuni": "https://www.mofa.go.jp/mofaj/gaiko/oda/shiryo/hakusyo/index.html",
  "oda-oda-jica": "https://www.jica.go.jp/about/profile/publication/annual/index.html",
  "oda-oda-ngo": "https://www.mofa.go.jp/mofaj/gaiko/oda/shimin/oda_ngo/index.html",
  "oda-kokusai-un": "https://www.mofa.go.jp/mofaj/ic/index.html",
  "oda-kokusai-adb": "https://www.mof.go.jp/policy/international_policy/imf/index.htm",

  // ── 追加項目のURL ──
  "social-pension-other": "https://www.nenkin.go.jp/",
  "social-medical-other": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/iryouhoken/",
  "social-medical-kokaho": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/iryouhoken/iryouhoken13/index.html",
  "social-care-other": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/index.html",
  "social-care-service": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/kaigo_koureisha/index.html",
  "social-child-hoiku": "https://www.cfa.go.jp/policies/hoiku/",
  "social-child-kodomo": "https://www.cfa.go.jp/",
  "social-welfare-shogai": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/hukushi_kaigo/shougaishahukushi/index.html",
  "social-emp-other": "https://www.mhlw.go.jp/stf/seisakunitsuite/bunya/koyou_roudou/koyou/index.html",
  "social-other": "https://www.mhlw.go.jp/",
  "bond-interest": "https://www.mof.go.jp/jgbs/index.html",
  "bond-repay": "https://www.mof.go.jp/jgbs/reference/index.html",
  "localalloc-joto": "https://www.soumu.go.jp/main_sosiki/c-zaisei/joto_zei.html",
  "localalloc-tokurei": "https://www.soumu.go.jp/main_sosiki/c-zaisei/",
  "defense-busshi": "https://www.mod.go.jp/atla/choutatsu.html",
  "defense-busshi-other": "https://www.mod.go.jp/atla/choutatsu.html",
  "defense-ippan": "https://www.mod.go.jp/j/profile/mod_jsdf/",
  "defense-jinken": "https://www.mod.go.jp/gsdf/jieikanbosyu/treatment/",
  "defense-kenkyu": "https://www.mod.go.jp/atla/kenkyuu.html",
  "defense-shisetsu": "https://www.mod.go.jp/j/approach/chouwa/sisetsuseibi/index.html",
  "defense-other-misc": "https://www.mod.go.jp/",
  "public-flood": "https://www.mlit.go.jp/mizukokudo/",
  "public-housing": "https://www.mlit.go.jp/toshi/index.html",
  "public-agri": "https://www.maff.go.jp/j/nousin/index.html",
  "public-disaster": "https://www.mlit.go.jp/river/bousai/saigai/",
  "public-port": "https://www.mlit.go.jp/kowan/index.html",
  "public-forest": "https://www.rinya.maff.go.jp/",
  "public-fishery": "https://www.jfa.maff.go.jp/j/gyoko_gyojyo/",
  "public-other": "https://www.mlit.go.jp/",
  "edu-shisetsu": "https://www.mext.go.jp/a_menu/shisetu/",
  "edu-shien-other": "https://www.mext.go.jp/",
  "edu-ikuei": "https://www.jasso.go.jp/shogakukin/",
  "edu-koukou-musho": "https://www.mext.go.jp/a_menu/shotou/mushouka/index.htm",
  "edu-kyushoku-musho": "https://www.mext.go.jp/",
  "food-kome": "https://www.maff.go.jp/j/keiei/",
  "food-shokuhin": "https://www.maff.go.jp/j/syouan/",
  "food-other": "https://www.maff.go.jp/",
  "energy-saisei": "https://www.enecho.meti.go.jp/category/saving_and_new/saiene/",
  "energy-setsuyaku": "https://www.enecho.meti.go.jp/category/saving_and_new/saving/",
  "energy-other": "https://www.enecho.meti.go.jp/",
  "sme-shien": "https://www.chusho.meti.go.jp/",
  "sme-other": "https://www.chusho.meti.go.jp/",
  "other-reserve": "https://www.mof.go.jp/budget/budger_workflow/budget/",
  "other-gyosei": "https://www.cao.go.jp/",
  "other-justice": "https://www.npa.go.jp/",
  "other-misc": "https://www.mof.go.jp/",
  "other-gaikoku": "https://www.moj.go.jp/isa/",

  // ── 歳入 ──
  "rev-tax": "https://www.mof.go.jp/tax_policy/summary/condition/a03.htm",
  "rev-tax-shohi": "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shohi/shohi.htm",
  "rev-tax-shotoku": "https://www.nta.go.jp/taxes/shiraberu/taxanswer/shotoku/shotoku.htm",
  "rev-tax-hojin": "https://www.nta.go.jp/taxes/shiraberu/taxanswer/hojin/hojin.htm",
  "rev-tax-sozoku": "https://www.nta.go.jp/taxes/shiraberu/taxanswer/sozoku/sozoku.htm",
  "rev-tax-kihatsu": "https://www.nta.go.jp/taxes/shiraberu/taxanswer/kansetsu/kansetsu.htm",
  "rev-tax-shu": "https://www.nta.go.jp/taxes/sake/index.htm",
  "rev-tax-tabako": "https://www.nta.go.jp/taxes/shiraberu/taxanswer/kansetsu/kansetsu.htm",
  "rev-tax-kanzei": "https://www.customs.go.jp/",
  "rev-tax-inshi": "https://www.nta.go.jp/taxes/shiraberu/taxanswer/inshi/inshi.htm",
  "rev-tax-other": "https://www.mof.go.jp/tax_policy/summary/condition/a03.htm",
  "rev-other": "https://www.mof.go.jp/policy/budget/budger_workflow/budget/",
  "rev-bond": "https://www.mof.go.jp/jgbs/index.html",
  "rev-bond-tokurei": "https://www.mof.go.jp/jgbs/reference/appendix/index.html",
  "rev-bond-kensetsu": "https://www.mof.go.jp/jgbs/reference/appendix/index.html",
};
