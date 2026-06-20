import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

interface ContactPayload {
  company?: string;
  name: string;
  email: string;
  phone?: string;
  type: string;
  message: string;
}

const INQUIRY_TYPES = ["不具合報告", "開発要望", "業務提携", "メディア掲載", "その他"];

async function sendBrevoEmail(data: ContactPayload) {
  const html = `
    <div style="font-family:sans-serif;max-width:600px;margin:0 auto;color:#1a202c">
      <div style="background:#1a365d;padding:24px 32px;border-radius:8px 8px 0 0">
        <h2 style="margin:0;color:#fff;font-size:18px">YUKUEへのお問い合わせ</h2>
      </div>
      <div style="border:1px solid #e2e8f0;border-top:none;padding:32px;border-radius:0 0 8px 8px">
        <table style="width:100%;border-collapse:collapse;font-size:14px">
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b;width:140px">会社名・屋号</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9">${data.company || "（未記入）"}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b">お名前</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9">${data.name}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b">メールアドレス</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9"><a href="mailto:${data.email}" style="color:#4f46e5">${data.email}</a></td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b">電話番号</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9">${data.phone || "（未記入）"}</td></tr>
          <tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9;color:#64748b">お問い合わせ種別</td><td style="padding:10px 0;border-bottom:1px solid #f1f5f9"><span style="background:#e0e7ff;color:#4338ca;padding:2px 8px;border-radius:4px;font-size:12px;font-weight:600">${data.type}</span></td></tr>
        </table>
        <div style="margin-top:24px">
          <p style="margin:0 0 8px;font-size:14px;color:#64748b">お問い合わせ内容</p>
          <div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:6px;padding:16px;font-size:14px;line-height:1.7;white-space:pre-wrap">${data.message}</div>
        </div>
        <div style="margin-top:24px;padding-top:16px;border-top:1px solid #e2e8f0;font-size:12px;color:#94a3b8">
          このメールは YUKUE（yukue.net）のお問い合わせフォームから自動送信されました。<br>
          返信する際は送信者（${data.email}）へ直接ご連絡ください。
        </div>
      </div>
    </div>
  `;

  const res = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      "api-key": process.env.BREVO_API_KEY!,
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "YUKUE お問い合わせフォーム",
        email: process.env.BREVO_SENDER_EMAIL ?? "contact@yukue.net",
      },
      to: [{ email: "support@united-futures.com", name: "United Futures Support" }],
      replyTo: { email: data.email, name: data.name },
      subject: `[YUKUE] ${data.type}のお問い合わせ - ${data.name}様`,
      htmlContent: html,
    }),
  });

  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Brevo error ${res.status}: ${body}`);
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json() as ContactPayload;
    const { company, name, email, phone, type, message } = body;

    // Validate
    if (!name?.trim() || !email?.trim() || !type || !message?.trim()) {
      return NextResponse.json({ error: "必須項目が未入力です" }, { status: 400 });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: "メールアドレスの形式が正しくありません" }, { status: 400 });
    }
    if (!INQUIRY_TYPES.includes(type)) {
      return NextResponse.json({ error: "無効なお問い合わせ種別です" }, { status: 400 });
    }

    const payload: ContactPayload = {
      company: company?.trim() || undefined,
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || undefined,
      type,
      message: message.trim(),
    };

    // DB保存
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );
    const { error: dbError } = await supabase
      .from("contact_submissions")
      .insert({
        company: payload.company ?? null,
        name: payload.name,
        email: payload.email,
        phone: payload.phone ?? null,
        inquiry_type: payload.type,
        message: payload.message,
      });
    if (dbError) throw new Error(`Supabase error: ${dbError.message}`);

    // メール送信
    await sendBrevoEmail(payload);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[contact] error:", error);
    return NextResponse.json({ error: "送信中にエラーが発生しました" }, { status: 500 });
  }
}
