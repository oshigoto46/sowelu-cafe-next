import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/login", // 未認証時にリダイレクトするページ
  },
});

export const config = {
  matcher: ["/admin/:path*"], // `/admin` 配下のすべてのルートを保護
};
