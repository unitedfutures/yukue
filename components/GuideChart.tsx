import type { GuideChart as GuideChartData } from "@/data/guides";

/**
 * 解説コラム用の時系列折れ線グラフ。
 * サーバー描画の静的インライン SVG（クローラーがそのまま読める）＋データ表。
 * 配色は dataviz スキルの検証を通過（歳出=青・税収=teal・公債金=rose）。
 */

const W = 720;
const H = 380;
const PAD = { top: 20, right: 96, bottom: 36, left: 40 };

export default function GuideChart({ chart }: { chart: GuideChartData }) {
  const { years, xTickYears, yMax, yTicks, series, unit } = chart;
  const n = years.length;
  const plotW = W - PAD.left - PAD.right;
  const plotH = H - PAD.top - PAD.bottom;

  const x = (i: number) => PAD.left + (n === 1 ? 0 : (i / (n - 1)) * plotW);
  const y = (v: number) => PAD.top + (1 - v / yMax) * plotH;

  return (
    <figure className="my-8">
      <div className="rounded-2xl border border-slate-200 bg-white p-4 sm:p-5">
        {/* 凡例 */}
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2 mb-3">
          {series.map((s) => (
            <span key={s.label} className="flex items-center gap-1.5 text-xs font-medium text-slate-700">
              <span className="w-4 h-0.5 rounded-full" style={{ background: s.color }} />
              {s.label}
            </span>
          ))}
          <span className="ml-auto text-[11px] text-slate-400">単位: {unit}</span>
        </div>

        <div className="overflow-x-auto">
          <svg
            viewBox={`0 0 ${W} ${H}`}
            role="img"
            aria-label={chart.caption}
            className="w-full min-w-[560px] h-auto"
          >
            {/* Y グリッド＋目盛り */}
            {yTicks.map((t) => (
              <g key={t}>
                <line
                  x1={PAD.left}
                  y1={y(t)}
                  x2={W - PAD.right}
                  y2={y(t)}
                  stroke="#e2e8f0"
                  strokeWidth={1}
                />
                <text
                  x={PAD.left - 8}
                  y={y(t) + 4}
                  textAnchor="end"
                  className="fill-slate-400"
                  fontSize={11}
                >
                  {t}
                </text>
              </g>
            ))}

            {/* X 目盛り */}
            {xTickYears.map((yr) => {
              const i = years.indexOf(yr);
              if (i < 0) return null;
              return (
                <text
                  key={yr}
                  x={x(i)}
                  y={H - PAD.bottom + 20}
                  textAnchor="middle"
                  className="fill-slate-400"
                  fontSize={11}
                >
                  {yr}
                </text>
              );
            })}

            {/* 折れ線＋終点の直接ラベル */}
            {series.map((s) => {
              const pts = s.values.map((v, i) => `${x(i)},${y(v)}`).join(" ");
              const lastV = s.values[n - 1];
              return (
                <g key={s.label}>
                  <polyline
                    points={pts}
                    fill="none"
                    stroke={s.color}
                    strokeWidth={2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  />
                  {/* 終点マーカー */}
                  <circle cx={x(n - 1)} cy={y(lastV)} r={3} fill={s.color} />
                  {/* 終点の直接ラベル（二次符号化） */}
                  <text
                    x={x(n - 1) + 8}
                    y={y(lastV) + 4}
                    fontSize={11}
                    fontWeight={600}
                    style={{ fill: s.color }}
                  >
                    {s.label.replace("（借金）", "")} {lastV}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        <figcaption className="mt-3 text-xs text-slate-500 leading-relaxed">
          {chart.caption}
        </figcaption>
      </div>

      {/* データ表（アクセシビリティ・SEO用） */}
      <details className="mt-3 group">
        <summary className="cursor-pointer text-xs text-slate-500 hover:text-slate-800 transition-colors select-none">
          データ表を開く（{years[0]}〜{years[n - 1]}年度・{unit}）
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="w-full text-xs border-collapse">
            <caption className="sr-only">{chart.caption}</caption>
            <thead>
              <tr className="border-b border-slate-200 text-slate-500">
                <th className="text-left py-1.5 px-2 font-medium">年度</th>
                {series.map((s) => (
                  <th key={s.label} className="text-right py-1.5 px-2 font-medium whitespace-nowrap">
                    {s.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {years.map((yr, i) => (
                <tr key={yr} className="border-b border-slate-50">
                  <td className="py-1.5 px-2 text-slate-700 whitespace-nowrap">{yr}年度</td>
                  {series.map((s) => (
                    <td key={s.label} className="py-1.5 px-2 text-right font-mono text-slate-600">
                      {s.values[i].toFixed(1)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>

      <p className="mt-2 text-[11px] text-slate-400 leading-relaxed">{chart.note}</p>
    </figure>
  );
}
