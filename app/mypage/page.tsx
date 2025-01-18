"use client";

import { useSession } from "next-auth/react";

export default function MyPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <p>読み込み中...</p>;
  }

  if (!session) {
    return <p>セッションがありません。ログインしてください。</p>;
  }

  return (
    <div>
      <h1>My Page</h1>
      <p>ログイン中: {session.user?.name}</p>
      <p>メールアドレス: {session.user?.email}</p>
    </div>
  );
}
