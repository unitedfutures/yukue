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
  "defense-jinken-jinkensen": "https://www.mod.go.jp/j/approach/hyouka/about/index.html",
  "defense-jinken-ryoshoku": "https://www.mod.go.jp/j/approach/hyouka/about/index.html",
  "defense-busshi-kokuki": "https://www.mod.go.jp/atla/souhon/supply/",
  "defense-busshi-kansetsu": "https://www.mod.go.jp/atla/souhon/supply/",
  "defense-busshi-buki": "https://www.mod.go.jp/atla/souhon/supply/",
  "defense-busshi-shatei": "https://www.mod.go.jp/atla/souhon/supply/",
  "defense-kenkyu-kaihatsu": "https://www.mod.go.jp/atla/research/index.html",
  "defense-kenkyu-sangaku": "https://www.mod.go.jp/atla/research/program/index.html",
  "defense-shisetsu-eizetsu": "https://www.mod.go.jp/j/approach/facilities/index.html",
  "defense-shisetsu-beigun": "https://www.mod.go.jp/j/approach/anpo/beigun/index.html",

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
  "defense-usfj": "https://www.mod.go.jp/j/approach/zaibeigun/us_japan_deference/index.html",
  "defense-kichi": "https://www.mod.go.jp/j/budget/index.html",

  // ── ODA ──
  "oda-oda-kuni": "https://www.mofa.go.jp/mofaj/gaiko/oda/shiryo/hakusyo/index.html",
  "oda-oda-jica": "https://www.jica.go.jp/about/profile/publication/annual/index.html",
  "oda-oda-ngo": "https://www.mofa.go.jp/mofaj/gaiko/oda/shimin/oda_ngo/index.html",
  "oda-kokusai-un": "https://www.mofa.go.jp/mofaj/ic/index.html",
  "oda-kokusai-adb": "https://www.mof.go.jp/policy/international_policy/imf/index.htm",
};
