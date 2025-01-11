import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export default NextAuth({
  providers: [
    // 管理者の Basic 認証
    CredentialsProvider({
      name: "Basic Auth",
      credentials: {
        username: { label: "ユーザー名", type: "text", placeholder: "username" },
        password: { label: "パスワード", type: "password", placeholder: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};

        // 管理者の認証ロジック
        if (username === "admin" && password === "password123") {
          return { id: 1, name: "Admin User", isAdmin: true };
        }

        return null; // 認証失敗
      },
    }),

    // 一般ユーザー認証
    CredentialsProvider({
      name: "User Login",
      credentials: {
        username: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { username, password } = credentials ?? {};

        // 一般ユーザーをデータベースで検索
        const user = await prisma.user.findUnique({
          where: { email: username },
        });

        if (user && bcrypt.compareSync(password, user.password)) {
          return { id: user.id, name: user.name, email: user.email };
        }

        return null; // 認証失敗
      },
    }),
  ],
  pages: {
    signIn: "/login", // 一般ユーザー用ログインページ
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.isAdmin = user.isAdmin || false; // 管理者の場合 `isAdmin` を追加
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id,
        name: token.name,
        email: token.email,
        isAdmin: token.isAdmin || false,
      };
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET, // 環境変数に設定
});
