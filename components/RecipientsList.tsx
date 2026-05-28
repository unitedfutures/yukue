"use client";

import { RecipientGroup, Recipient, IndividualSummary } from "@/data/recipients";
import { formatAmount } from "@/data/budget";
import { Building2, Globe, FlaskConical, Landmark, ExternalLink, Users } from "lucide-react";
import { useState } from "react";

const REGION_COLORS: Record<string, string> = {
  "北海道": "#06b6d4",
  "東北": "#10b981",
  "関東": "#6366f1",
  "中部": "#f59e0b",
  "近畿": "#ec4899",
  "中国": "#8b5cf6",
  "四国": "#14b8a6",
  "九州・沖縄": "#ef4444",
  "九州": "#ef4444",
  "南アジア": "#f97316",
  "東南アジア": "#06b6d4",
  "東アジア": "#6366f1",
  "アフリカ": "#10b981",
  "欧州": "#8b5cf6",
  "中東": "#a78bfa",
  "その他": "#64748b",
};

function IndividualSummaryCard({ summary, total }: { summary: IndividualSummary; total: number }) {
  return (
    <div className="rounded-xl border border-violet-500/25 bg-violet-500/6 px-5 py-4">
      <div className="flex items-center gap-2 mb-3">
        <Users size={14} className="text-violet-400 flex-shrink-0" />
        <span className="text-xs font-semibold text-violet-300 tracking-wide">個人給付の概算</span>
      </div>
      <div className="flex items-center gap-2 flex-wrap mb-1">
        <span className="text-xl font-bold text-white">{summary.avgLabel}</span>
        <span className="text-slate-400 text-lg">×</span>
        <span className="text-xl font-bold text-violet-300">{summary.countLabel}</span>
      </div>
      {summary.adminCost > 0 && (
        <div className="text-sm text-slate-400 mb-1">
          ＋ 事務経費 約{formatAmount(summary.adminCost)}
        </div>
      )}
      <div className="text-xs text-slate-500 mt-1">合計 {formatAmount(total)}</div>
      {summary.note && (
        <p className="text-xs text-slate-500 mt-3 pt-3 border-t border-white/8 leading-relaxed">
          {summary.note}
        </p>
      )}
    </div>
  );
}

function getCategoryIcon(itemId: string) {
  if (itemId.startsWith("localalloc")) return <Landmark size={16} className="text-indigo-400" />;
  if (itemId.startsWith("oda")) return <Globe size={16} className="text-cyan-400" />;
  if (itemId.startsWith("edu")) return <FlaskConical size={16} className="text-emerald-400" />;
  if (itemId.startsWith("defense")) return <Building2 size={16} className="text-orange-400" />;
  if (itemId.startsWith("social")) return <Users size={16} className="text-violet-400" />;
  if (itemId.startsWith("bond")) return <Landmark size={16} className="text-amber-400" />;
  if (itemId.startsWith("public")) return <Building2 size={16} className="text-teal-400" />;
  return <Building2 size={16} className="text-slate-400" />;
}

interface Props {
  group: RecipientGroup;
}

export default function RecipientsList({ group }: Props) {
  const [search, setSearch] = useState("");
  const [regionFilter, setRegionFilter] = useState<string | null>(null);

  const hasOrgList = group.recipients.length > 0;

  const regions = Array.from(
    new Set(group.recipients.map((r) => r.region).filter(Boolean) as string[])
  );

  const maxAmount = hasOrgList ? Math.max(...group.recipients.map((r) => r.amount)) : 0;

  const filtered = group.recipients.filter((r) => {
    const matchSearch = r.name.includes(search) || (r.note ?? "").includes(search);
    const matchRegion = !regionFilter || r.region === regionFilter;
    return matchSearch && matchRegion;
  });

  const shown = filtered.filter((r) => r.amount > 0);
  const zero = filtered.filter((r) => r.amount === 0);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center gap-2">
        {getCategoryIcon(group.itemId)}
        <h3 className="text-base font-bold text-white">{group.label}</h3>
        <span className="text-xs text-slate-500 ml-1">
          {group.year}年度
          {hasOrgList && ` · ${group.recipients.length}件`}
        </span>
      </div>

      {/* 個人給付サマリー */}
      {group.individualSummary && (
        <IndividualSummaryCard summary={group.individualSummary} total={group.total} />
      )}

      {/* 以下は団体向けリストがある場合のみ表示 */}
      {hasOrgList && (
        <>
          {/* Filters */}
          <div className="flex flex-wrap gap-2 items-center">
            <input
              type="text"
              placeholder="名称で絞り込み…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-slate-800 border border-white/10 rounded-xl px-3 py-1.5 text-sm text-slate-200 placeholder:text-slate-600 focus:outline-none focus:border-indigo-500/60 w-48"
            />
            {regions.length > 1 && (
              <div className="flex gap-1 flex-wrap">
                <button
                  onClick={() => setRegionFilter(null)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                    !regionFilter ? "bg-indigo-500 text-white" : "bg-slate-800 text-slate-400 hover:text-slate-200"
                  }`}
                >
                  全て
                </button>
                {regions.map((r) => (
                  <button
                    key={r}
                    onClick={() => setRegionFilter(r === regionFilter ? null : r)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                      regionFilter === r ? "text-white" : "bg-slate-800 text-slate-400 hover:text-slate-200"
                    }`}
                    style={regionFilter === r ? { background: REGION_COLORS[r] ?? "#6366f1" } : {}}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Summary bar */}
          <div className="flex items-center gap-4 text-xs text-slate-500 bg-slate-800/50 border border-white/8 rounded-xl px-4 py-2">
            <span>表示中: <span className="text-slate-300 font-medium">{shown.length}件</span></span>
            <span>合計: <span className="text-slate-300 font-medium">{formatAmount(shown.reduce((s, r) => s + r.amount, 0))}</span></span>
            <span className="ml-auto">{group.sourceNote}</span>
          </div>

          {/* Recipient rows */}
          <div className="space-y-1.5 max-h-[520px] overflow-y-auto pr-1">
            {shown.map((r, i) => {
              const barPct = maxAmount > 0 ? (r.amount / maxAmount) * 100 : 0;
              const regionColor = r.region ? (REGION_COLORS[r.region] ?? "#6366f1") : "#6366f1";
              const sharePct = group.total > 0 ? ((r.amount / group.total) * 100).toFixed(1) : "—";

              return (
                <div
                  key={r.name}
                  className="bg-white/4 border border-white/8 rounded-xl px-4 py-3 hover:border-white/15 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span
                      className={`w-6 text-right text-xs font-mono flex-shrink-0 ${
                        i === 0 ? "text-yellow-400" : i === 1 ? "text-slate-300" : i === 2 ? "text-amber-600" : "text-slate-600"
                      }`}
                    >
                      {i + 1}
                    </span>
                    {r.region && (
                      <span
                        className="text-xs px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: `${regionColor}22`, color: regionColor, border: `1px solid ${regionColor}44` }}
                      >
                        {r.region}
                      </span>
                    )}
                    <span className="flex-1 text-sm font-medium text-slate-200 min-w-0">{r.name}</span>
                    <span className="text-xs text-slate-500 flex-shrink-0 w-12 text-right">{sharePct}%</span>
                    <span className="text-sm font-mono text-slate-200 flex-shrink-0 w-28 text-right font-semibold">
                      {formatAmount(r.amount)}
                    </span>
                  </div>
                  {r.note && (
                    <p className="text-xs text-slate-500 ml-9 mb-2">{r.note}</p>
                  )}
                  <div className="ml-9 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${barPct}%`, background: regionColor }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* 不交付/0円 entities */}
          {zero.length > 0 && (
            <div className="border border-white/8 rounded-xl px-4 py-3 bg-slate-800/30">
              <p className="text-xs text-slate-500 mb-2">交付なし（{zero.length}団体）</p>
              <div className="flex flex-wrap gap-2">
                {zero.map((r) => (
                  <span key={r.name} className="text-xs bg-slate-800 border border-white/10 text-slate-500 px-2.5 py-1 rounded-lg">
                    {r.name}
                    {r.note && <span className="ml-1 text-slate-600">({r.note})</span>}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}

      {/* source note for individual-only groups */}
      {!hasOrgList && (
        <p className="text-xs text-slate-600">{group.sourceNote}</p>
      )}

      <div className="flex items-center gap-1.5 text-xs text-slate-600">
        <ExternalLink size={11} />
        <span>金額は公表データをもとにした概算値です。正確な数値は各省庁の公式資料をご確認ください。</span>
      </div>
    </div>
  );
}
