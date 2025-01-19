import { NextApiRequest, NextApiResponse } from "next";
import { parse } from "cookie";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "GET") {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({ error: `Method ${req.method} Not Allowed` });
  }

  const cookies = parse(req.headers.cookie || "");
  const sessionToken = cookies.sessionToken;

  if (!sessionToken) {
    return res.status(401).json({ error: "Not authenticated." });
  }

  try {
    // セッションをデータベースから取得
    const session = await prisma.session.findUnique({
      where: { sessionToken },
      include: { user: true }, // ユーザー情報も取得
    });

    // セッションが存在しない、または期限切れの場合
    if (!session || session.expires < new Date()) {
      return res.status(401).json({ error: "Session expired or invalid." });
    }

    // ユーザー情報を返す
    return res.status(200).json({
      user: {
        id: session.user.id,
        email: session.user.email,
        name: session.user.name,
      },
    });
  } catch (error) {
    console.error("Session validation error:", error);
    return res.status(500).json({ error: "Internal Server Error" });
  }
}
