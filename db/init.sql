-- お問い合わせ保存テーブル
CREATE TABLE IF NOT EXISTS contact_submissions (
  id            SERIAL PRIMARY KEY,
  company       TEXT,
  name          TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT,
  inquiry_type  TEXT        NOT NULL,
  message       TEXT        NOT NULL,
  created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- 新着確認用インデックス
CREATE INDEX IF NOT EXISTS idx_contact_created_at ON contact_submissions (created_at DESC);
