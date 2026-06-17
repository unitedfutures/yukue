import type { Metadata } from "next";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "プライバシーポリシー | YUKUE",
  description: "YUKUEのプライバシーポリシーです。Cookie・広告・アクセス解析に関する方針を説明します。",
};

export default function PrivacyPage() {
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
          <p className="text-xs font-semibold tracking-widest text-[#1a365d] uppercase mb-3">Privacy Policy</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">プライバシーポリシー</h1>
          <p className="text-sm text-slate-500">最終更新日：2025年6月</p>
        </div>

        <div className="space-y-10 text-sm text-slate-700 leading-relaxed">

          {/* 基本方針 */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">基本方針</h2>
            <p>
              YUKUE（以下「当サイト」）は、日本の国家予算に関する公開情報を可視化するウェブサイトです。
              当サイトは、利用者の個人情報を適切に取り扱い、プライバシーの保護に努めます。
              本プライバシーポリシーは、当サイトにおける個人情報の取り扱いについて説明するものです。
            </p>
          </section>

          {/* 収集する情報 */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">収集する情報</h2>
            <p className="mb-3">当サイトでは、以下の情報を自動的に収集することがあります。</p>
            <ul className="list-disc pl-5 space-y-2">
              <li>アクセスしたページのURL</li>
              <li>アクセス日時</li>
              <li>ブラウザの種類・バージョン</li>
              <li>オペレーティングシステム</li>
              <li>リファラー（参照元URL）</li>
              <li>IPアドレス（個人を特定するためには使用しません）</li>
            </ul>
            <p className="mt-3">
              当サイトは、氏名・住所・電話番号・メールアドレス等の個人を直接特定できる情報を収集するフォームや会員登録機能を持っていません。
            </p>
          </section>

          {/* Cookie */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">Cookieについて</h2>
            <p className="mb-3">
              当サイトでは、広告配信・アクセス解析のためにCookie（クッキー）を使用しています。
              CookieはWebブラウザに保存される小さなテキストファイルであり、サイトの利便性向上や利用状況の把握に使用されます。
            </p>
            <p className="mb-3">
              ブラウザの設定によりCookieを無効化することができますが、一部の機能が正常に動作しなくなる場合があります。
              Cookie の管理方法はご利用のブラウザのヘルプをご確認ください。
            </p>
          </section>

          {/* 広告（AdSense） */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">広告の配信について</h2>
            <p className="mb-3">
              当サイトでは、Google LLC が提供する広告配信サービス「Google AdSense」を利用しています。
              Google AdSense は、利用者の興味・関心に基づいた広告（インタレストベース広告）を表示するために Cookie を使用します。
            </p>
            <p className="mb-3">
              Google による Cookie の使用については、
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
              >
                Google のポリシーと規約
              </a>
              をご確認ください。
            </p>
            <p className="mb-3">
              パーソナライズ広告の配信を無効化したい場合は、
              <a
                href="https://www.google.com/settings/ads"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
              >
                Google 広告設定ページ
              </a>
              から設定を変更できます。また、
              <a
                href="https://optout.aboutads.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
              >
                aboutads.info
              </a>
              でも第三者配信事業者による広告のオプトアウトが可能です。
            </p>
          </section>

          {/* アクセス解析 */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">アクセス解析について</h2>
            <p>
              当サイトでは、サービスの改善・利用状況の把握を目的として、アクセス解析ツールを利用する場合があります。
              これらのツールはCookieを使用してデータを収集しますが、個人を特定する情報は含まれません。
              収集されたデータは、各ツールのプライバシーポリシーに従い管理されます。
            </p>
          </section>

          {/* 免責事項 */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">免責事項</h2>
            <p className="mb-3">
              当サイトに掲載している情報は、財務省・各省庁の公表資料をもとに作成していますが、
              内容の正確性・完全性を保証するものではありません。
              掲載情報の利用により生じた損害について、当サイトは一切の責任を負いません。
            </p>
            <p>
              当サイトからリンクされている外部サイトの内容については、各サイトの運営者が責任を負うものとし、
              当サイトは関与しません。
            </p>
          </section>

          {/* 著作権 */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">著作権</h2>
            <p>
              当サイトのデザイン・構成・プログラムに関する著作権は当サイト運営者に帰属します。
              掲載しているデータは財務省等の公表資料に基づくものであり、出典を明記した上での引用・共有は歓迎します。
            </p>
          </section>

          {/* ポリシーの変更 */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">プライバシーポリシーの変更</h2>
            <p>
              当サイトは、法令の改正やサービスの変更に応じて、本プライバシーポリシーを予告なく変更することがあります。
              変更後のポリシーは、当ページへの掲載をもって効力を生じるものとします。
            </p>
          </section>

          {/* お問い合わせ */}
          <section>
            <h2 className="text-base font-bold text-slate-900 mb-3 pb-2 border-b border-slate-200">お問い合わせ</h2>
            <p>
              本プライバシーポリシーに関するお問い合わせは、
              <a
                href="mailto:info@yukue.net"
                className="text-indigo-600 hover:text-indigo-800 underline underline-offset-2"
              >
                info@yukue.net
              </a>
              までご連絡ください。
            </p>
          </section>

        </div>

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
