import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    try {
      const inventories = await prisma.inventory.findMany({
        include: { category: true }, // カテゴリ情報を含めて取得
      });
      res.status(200).json(inventories);
    } catch (error) {
      console.error("在庫取得エラー:", error);
      res.status(500).json({ error: "在庫データの取得中にエラーが発生しました。" });
    }
  } else if (req.method === "POST") {
    const { name, quantity, categoryId } = req.body;

    console.log("Request Body:", req.body);
    console.log("Name:", req.body.name);
    console.log("Quantity:", req.body.quantity);
    console.log("CategoryId:", req.body.categoryId);
    console.log(quantity === undefined)
    console.log(!name);
    console.log(!categoryId);

    if (!name || quantity === undefined || !categoryId) {
      res.status(400).json({ error: "すべての項目を入力してください。" });
      return;
    }

    try {
      const categoryRecord = await prisma.category.findUnique({
        where: { id: categoryId },
      });

      if (!categoryRecord) {
        res.status(400).json({ error: "指定されたカテゴリが存在しません。" });
        return;
      }

      const newInventory = await prisma.inventory.create({
        data: {
          name,
          quantity: Number(quantity),
          category: {
            connect: { id: categoryRecord.id },
          },
        },
      });
      res.status(201).json(newInventory);
    } catch (error) {
      console.error("在庫作成エラー:", error);
      res.status(500).json({ error: "在庫データの登録中にエラーが発生しました。" });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
