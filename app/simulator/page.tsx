import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import TaxSimulator from "@/components/TaxSimulator";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "納税額シミュレーター | YUKUE",
  description:
    "年収を入力すると、あなたが納めた所得税が国家予算のどの分野にいくら使われているかを試算できます。",
  alternates: {
    canonical: "/simulator",
  },
};

export default function SimulatorPage() {
  return (
    <main className="min-h-screen bg-white">
      {/* Header */}
      <header
        className="border-b border-slate-200 sticky top-0 z-10 bg-white/95"
        style={{ backdropFilter: "blur(12px)" }}
      >
        <div className="max-w-3xl mx-auto px-4 py-3 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-1.5 text-slate-500 hover:text-slate-900 transition-colors text-sm"
          >
            <ArrowLeft size={15} />
            <span>ダッシュボードへ</span>
          </Link>
          <div className="w-px h-4 bg-slate-200" />
          <Link href="/">
            <Logo variant="symbol" height={36} dark={true} />
          </Link>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 py-14">
        <div className="mb-10">
          <p className="text-xs font-semibold tracking-widest text-[#1a365d] uppercase mb-3">
            Tax Simulator
          </p>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">納税額シミュレーター</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            年収を入力すると、あなたが納めている所得税の概算と、
            <br className="hidden sm:block" />
            その税金が国家予算のどの分野にいくら相当使われているかを試算します。
          </p>
        </div>

        <TaxSimulator />

        {/* フッター */}
        <div className="pt-8 mt-10 border-t border-slate-200">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-slate-900 transition-colors"
          >
            <ArrowLeft size={14} />
            ダッシュボードに戻る
          </Link>
        </div>
      </div>
    </main>
  );
}
