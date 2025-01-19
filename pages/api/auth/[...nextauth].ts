import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

// authOptions を定義
export const authOptions = {
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
        const user = await prisma.user.findUnique({ where: { email: username } });
        if (user && bcrypt.compareSync(password, user.password)) {
          return { id: user.id, name: user.name, email: user.email };
        }
        return null; // 認証失敗
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "database",
  },
  callbacks: {
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
  secret: process.env.NEXTAUTH_SECRET,
};

// NextAuth をデフォルトエクスポート
export default NextAuth(authOptions);
