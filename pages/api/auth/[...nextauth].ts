import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    CredentialsProvider({
      // 認証ロジックをカスタマイズ
      name: "Basic Auth",
      credentials: {
        username: { label: "ユーザー名", type: "text", placeholder: "username" },
        password: { label: "パスワード", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};

        // ユーザー名とパスワードを検証
        if (username === "admin" && password === "password123") {
          // 認証成功
          return { id: 1, name: "Admin User" };
        }

        // 認証失敗
        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login", // カスタムログインページ
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET, // 環境変数に設定
});
