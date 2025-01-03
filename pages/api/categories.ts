import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    // カテゴリを追加
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ error: "カテゴリ名が必要です" });
    }

    try {
      const newCategory = await prisma.category.create({
        data: {
          name,
        },
      });
      return res.status(201).json(newCategory);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "カテゴリの作成に失敗しました" });
    }
  }

  if (req.method === "GET") {
    // カテゴリのリストを返す
    try {
      const categories = await prisma.category.findMany();
      return res.status(200).json(categories);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "カテゴリの取得に失敗しました" });
    }
  }

  // その他のメソッドは405エラー
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}
