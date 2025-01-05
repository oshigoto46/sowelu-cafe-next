import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import db from "../../lib/db"; // データベース接続をインポート

export async function POST(req: Request) {
  const { name, email, password } = await req.json();

  if (!name || !email || !password) {
    return NextResponse.json({ error: "すべてのフィールドを入力してください" }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    // ユーザー登録クエリの実行
    await db.execute(
      "INSERT INTO User (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return NextResponse.json({ message: "ユーザー登録が成功しました" });
  } catch (error) {
    // デバッグ用のログを出力
    console.log("接続設定:", {
        host: process.env.DATABASE_HOST,
        user: process.env.DATABASE_USER,
        database: process.env.DATABASE_NAME,
      });
    console.error("エラーが発生しました:");
    console.error("DATABASE_HOST:", process.env.DATABASE_HOST);
    console.error("DATABASE_USER:", process.env.DATABASE_USER);
    console.error("DATABASE_PASSWORD:", process.env.DATABASE_PASSWORD);
    console.error("DATABASE_NAME:", process.env.DATABASE_NAME);
    console.error("SQL エラーの詳細:", error.message);

    // エラーレスポンス
    return NextResponse.json({ error: "このメールアドレスは既に登録されています" }, { status: 400 });
  }
}
