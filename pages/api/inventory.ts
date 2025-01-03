import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, quantity, categoryId } = req.body;

    if (!name || !quantity || !categoryId) {
      return res.status(400).json({ error: "全ての項目を入力してください" });
    }

    try {
      const item = await prisma.inventoryItem.create({
        data: {
          name,
          quantity,
          categoryId: parseInt(categoryId, 10),
        },
      });
      res.status(201).json(item);
    } catch (error) {
      res.status(500).json({ error: "在庫アイテムの作成に失敗しました" });
    }
  } else if (req.method === "GET") {
    const items = await prisma.inventoryItem.findMany({
      include: { category: true }, // カテゴリ情報を含む
    });
    res.status(200).json(items);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
