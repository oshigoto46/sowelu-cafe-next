"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MyPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  // セッションが存在する場合にユーザーデータを取得

  useEffect(() => {
    alert(`useSessionが呼び出されました: status=${status}`);
  }, [status]);

  
  useEffect(() => {
    if (session) {
      fetch(`/api/user/${session.user.email}`)
        .then((res) => {
          if (!res.ok) {
            throw new Error("ユーザー情報の取得に失敗しました");
          }
          return res.json();
        })
        .then((data) => setUserData(data))
        .catch((error) => console.error("Error fetching user data:", error));
    }
  }, [session]);

  // セッションのロード中
  if (status === "loading") {
    return <p>読み込み中...</p>;
  }

  // セッションがない場合
  if (!session) {
    return <p>セッションがありません。ログインしてください。</p>;
  }

  return (
    <div>
      <h1>My Page</h1>
      <p>ログイン中: {session.user?.name}</p>
      <p>メールアドレス: {session.user?.email}</p>
      {userData ? (
        <>
          <p>役割: {userData.role}</p>
          <p>ポイント: {userData.points}</p>
        </>
      ) : (
        <p>ユーザー情報を取得中...</p>
      )}
    </div>
  );
}
