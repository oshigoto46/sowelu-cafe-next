"use client";

import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function MyPage() {
  const { data: session, status } = useSession();
  const [userData, setUserData] = useState(null);

  // useEffect(() => {
  //   if (session) {
  //     fetch(`/api/user/${session.user.email}`)
  //       .then((res) => res.json())
  //       .then((data) => setUserData(data))
  //       .catch((error) => console.error("Error fetching user data:", error));
  //   }
  // }, [session]);

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
