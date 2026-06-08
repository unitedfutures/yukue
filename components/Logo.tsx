/**
 * YUKUEロゴ SVGコンポーネント
 * ─ 虫眼鏡（¥マーク入り）＋点線矢印 ＋ YUKUE ＋ キャッチコピー ─
 *
 * Props:
 *   variant  "full"     = 横長ロゴ（ヘッダー・フッター用）
 *            "symbol"   = 虫眼鏡＋矢印のみ（アイコン用）
 *   height   表示高さ(px)。widthは自動計算（アスペクト比維持）
 *   dark     true = 白背景用ネイビー（デフォルト） false = 暗背景用白
 */

type LogoVariant = "full" | "symbol";

interface LogoProps {
  variant?: LogoVariant;
  height?: number;
  dark?: boolean;
  className?: string;
}

// カラーパレット
const NAVY = "#1a365d";
const GOLD = "#f0a800";

export default function Logo({
  variant = "full",
  height = 48,
  dark = true,
  className = "",
}: LogoProps) {
  const primary = dark ? NAVY : "#ffffff";
  const gold    = GOLD;

  if (variant === "symbol") {
    // 虫眼鏡＋矢印のみ (viewBox 0 0 290 220)
    const aspect = 290 / 220;
    return (
      <svg
        viewBox="0 0 290 220"
        width={height * aspect}
        height={height}
        className={className}
        aria-label="YUKUE"
      >
        <SymbolMark primary={primary} gold={gold} />
      </svg>
    );
  }

  // full: 虫眼鏡 ＋ YUKUE ＋ キャッチコピー (viewBox 0 0 900 220)
  const aspect = 900 / 220;
  return (
    <svg
      viewBox="0 0 900 220"
      width={height * aspect}
      height={height}
      className={className}
      aria-label="YUKUE 我々が収めた税金の行方"
    >
      <SymbolMark primary={primary} gold={gold} />

      {/* YUKUE */}
      <text
        x="302"
        y="148"
        fontFamily="'Helvetica Neue', Helvetica, Arial, sans-serif"
        fontWeight="800"
        fontSize="108"
        letterSpacing="2"
        fill={primary}
      >
        YUKUE
      </text>

      {/* キャッチコピー */}
      <text
        x="306"
        y="192"
        fontFamily="'Hiragino Sans', 'Noto Sans JP', 'Yu Gothic', sans-serif"
        fontWeight="400"
        fontSize="28"
        letterSpacing="6"
        fill={primary}
      >
        我々が収めた税金の行方
      </text>
    </svg>
  );
}

/* ─── 虫眼鏡＋矢印 シンボル ─────────────────────────────────────────────── */

function SymbolMark({ primary, gold }: { primary: string; gold: string }) {
  // レンズ中心
  const cx = 112, cy = 106, r = 78;

  // ¥ の座標（レンズ中央基準）
  const yTop   = cy - 44;   // 対角線の上端 y
  const yMid   = cy - 8;    // 対角線の合流点 y（Y字の股）
  const yBot   = cy + 48;   // 縦棒の下端 y
  const xLeft  = cx - 42;   // 左対角線の上端 x
  const xRight = cx + 42;   // 右対角線の上端 x
  const bar1y  = cy + 14;   // 横棒1 y
  const bar2y  = cy + 28;   // 横棒2 y
  const barX1  = cx - 30;   // 横棒の左端 x
  const barX2  = cx + 30;   // 横棒の右端 x

  return (
    <g>
      {/* ── レンズ円 ── */}
      <circle
        cx={cx} cy={cy} r={r}
        fill="none"
        stroke={primary}
        strokeWidth="14"
        strokeLinecap="round"
      />

      {/* ── ¥ シンボル ── */}
      {/* 左対角線 */}
      <line x1={xLeft} y1={yTop} x2={cx} y2={yMid}
        stroke={primary} strokeWidth="12" strokeLinecap="round" />
      {/* 右対角線 */}
      <line x1={xRight} y1={yTop} x2={cx} y2={yMid}
        stroke={primary} strokeWidth="12" strokeLinecap="round" />
      {/* 縦棒 */}
      <line x1={cx} y1={yMid} x2={cx} y2={yBot}
        stroke={primary} strokeWidth="12" strokeLinecap="round" />
      {/* 横棒1 */}
      <line x1={barX1} y1={bar1y} x2={barX2} y2={bar1y}
        stroke={primary} strokeWidth="8" strokeLinecap="round" />
      {/* 横棒2 */}
      <line x1={barX1} y1={bar2y} x2={barX2} y2={bar2y}
        stroke={primary} strokeWidth="8" strokeLinecap="round" />

      {/* ── ハンドル（柄） ── */}
      <line
        x1={cx - 50} y1={cy + 58}
        x2={cx - 100} y2={cy + 108}
        stroke={primary}
        strokeWidth="22"
        strokeLinecap="round"
      />

      {/* ── 点線矢印 ── */}
      {/* 矢印のパス（レンズ右上付近から右上へ弧を描く） */}
      <path
        d={`M ${cx + r - 6},${cy - 22} C ${cx + r + 30},${cy - 55} ${cx + r + 70},${cy - 80} ${cx + r + 108},${cy - 92}`}
        fill="none"
        stroke={gold}
        strokeWidth="9"
        strokeDasharray="13 8"
        strokeLinecap="round"
      />

      {/* 矢印の先端（実線三角形）*/}
      {/* 先端位置: cx+r+108, cy-92 ≈ (218, 14) 方向: 右上45° */}
      <polygon
        points={`${cx+r+112},${cy-96} ${cx+r+96},${cy-78} ${cx+r+84},${cy-90}`}
        fill={gold}
      />
    </g>
  );
}
