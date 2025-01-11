import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      // 全カテゴリを取得
      const categories = await prisma.category.findMany();
      res.status(200).json(categories);
    } catch (error) {
      console.error("カテゴリ取得エラー:", error);
      res.status(500).json({ error: "カテゴリデータの取得中にエラーが発生しました。" });
    }
  } else if (req.method === "POST") {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ error: "カテゴリ名を入力してください。" });
      return;
    }

    try {
      // 新しいカテゴリを作成
      const newCategory = await prisma.category.create({
        data: { name },
      });
      res.status(201).json(newCategory);
    } catch (error) {
      console.error("カテゴリ作成エラー:", error);
      res.status(500).json({ error: "カテゴリの作成中にエラーが発生しました。" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
