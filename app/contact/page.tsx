"use client";

import { useState } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { ArrowLeft, Send, CheckCircle, AlertCircle, Loader2 } from "lucide-react";

const INQUIRY_TYPES = ["不具合報告", "開発要望", "業務提携", "メディア掲載", "その他"];

interface FormData {
  company: string;
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  type?: string;
  message?: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<FormData>({
    company: "",
    name: "",
    email: "",
    phone: "",
    type: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [serverError, setServerError] = useState("");

  const validate = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "お名前を入力してください";
    if (!formData.email.trim()) {
      newErrors.email = "メールアドレスを入力してください";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "正しいメールアドレスを入力してください";
    }
    if (!formData.type) newErrors.type = "お問い合わせ種別を選択してください";
    if (!formData.message.trim()) newErrors.message = "お問い合わせ内容を入力してください";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setStatus("loading");
    setServerError("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setServerError(data.error ?? "送信中にエラーが発生しました");
        setStatus("error");
        return;
      }

      setStatus("success");
    } catch {
      setServerError("ネットワークエラーが発生しました。しばらく経ってから再度お試しください。");
      setStatus("error");
    }
  };

  const inputClass = (error?: string) =>
    `w-full px-4 py-2.5 rounded-xl border text-sm text-slate-900 placeholder-slate-300 focus:outline-none focus:ring-2 transition-colors ${
      error
        ? "border-red-300 focus:ring-red-200 focus:border-red-400"
        : "border-slate-200 focus:ring-[#1a365d]/20 focus:border-[#1a365d]"
    }`;

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
          <p className="text-xs font-semibold tracking-widest text-[#1a365d] uppercase mb-3">Contact</p>
          <h1 className="text-3xl font-bold text-slate-900 mb-4">お問い合わせ</h1>
          <p className="text-sm text-slate-600 leading-relaxed">
            YUKUEに関するお問い合わせは、以下のフォームからお送りください。<br />
            内容を確認のうえ、メールにてご返信いたします。
          </p>
        </div>

        {status === "success" ? (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <CheckCircle size={48} className="text-emerald-500 mb-4" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">送信完了しました</h2>
            <p className="text-sm text-slate-600 leading-relaxed mb-8">
              お問い合わせいただきありがとうございます。<br />
              内容を確認のうえ、担当者よりご連絡いたします。
            </p>
            <button
              onClick={() => {
                setStatus("idle");
                setFormData({ company: "", name: "", email: "", phone: "", type: "", message: "" });
              }}
              className="text-sm text-slate-500 hover:text-slate-900 transition-colors underline underline-offset-2"
            >
              フォームに戻る
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate className="space-y-6">
            {/* サーバーエラー */}
            {status === "error" && serverError && (
              <div className="flex items-start gap-3 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-sm text-red-700">
                <AlertCircle size={16} className="mt-0.5 shrink-0" />
                <span>{serverError}</span>
              </div>
            )}

            {/* 会社名・屋号 */}
            <div>
              <label htmlFor="company" className="block text-sm font-medium text-slate-700 mb-1.5">
                会社名・屋号
                <span className="ml-2 text-xs font-normal text-slate-400">任意</span>
              </label>
              <input
                type="text"
                id="company"
                name="company"
                value={formData.company}
                onChange={handleChange}
                placeholder="株式会社〇〇 / 個人の方は空欄で構いません"
                className={inputClass()}
              />
            </div>

            {/* お名前 */}
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1.5">
                お名前
                <span className="ml-2 text-xs font-normal text-red-500">必須</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="山田 太郎"
                className={inputClass(errors.name)}
              />
              {errors.name && <p className="mt-1.5 text-xs text-red-500">{errors.name}</p>}
            </div>

            {/* メールアドレス */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1.5">
                メールアドレス
                <span className="ml-2 text-xs font-normal text-red-500">必須</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="example@email.com"
                className={inputClass(errors.email)}
              />
              {errors.email && <p className="mt-1.5 text-xs text-red-500">{errors.email}</p>}
            </div>

            {/* 電話番号 */}
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-slate-700 mb-1.5">
                電話番号
                <span className="ml-2 text-xs font-normal text-slate-400">任意</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="03-0000-0000"
                className={inputClass()}
              />
            </div>

            {/* お問い合わせ種別 */}
            <div>
              <label htmlFor="type" className="block text-sm font-medium text-slate-700 mb-1.5">
                お問い合わせ種別
                <span className="ml-2 text-xs font-normal text-red-500">必須</span>
              </label>
              <select
                id="type"
                name="type"
                value={formData.type}
                onChange={handleChange}
                className={`${inputClass(errors.type)} appearance-none bg-white ${
                  formData.type ? "text-slate-900" : "text-slate-400"
                }`}
              >
                <option value="" disabled>選択してください</option>
                {INQUIRY_TYPES.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
              {errors.type && <p className="mt-1.5 text-xs text-red-500">{errors.type}</p>}
            </div>

            {/* お問い合わせ内容 */}
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-slate-700 mb-1.5">
                お問い合わせ内容
                <span className="ml-2 text-xs font-normal text-red-500">必須</span>
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                rows={6}
                placeholder="お問い合わせ内容をご記入ください"
                className={`${inputClass(errors.message)} resize-none`}
              />
              {errors.message && <p className="mt-1.5 text-xs text-red-500">{errors.message}</p>}
            </div>

            {/* 送信ボタン */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={status === "loading"}
                className="flex items-center gap-2 px-8 py-3 bg-[#1a365d] hover:bg-[#1e4080] disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium rounded-xl transition-colors shadow-sm"
              >
                {status === "loading" ? (
                  <>
                    <Loader2 size={15} className="animate-spin" />
                    送信中…
                  </>
                ) : (
                  <>
                    <Send size={15} />
                    送信する
                  </>
                )}
              </button>
            </div>
          </form>
        )}

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
