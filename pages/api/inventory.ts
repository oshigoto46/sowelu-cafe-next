import { NextApiRequest, NextApiResponse } from "next";

let inventoryData = []; // 仮のデータストア（データベースに置き換える）

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    // 在庫リストを返す
    res.status(200).json(inventoryData);
  } else if (req.method === "POST") {
    // 新しい在庫アイテムを追加
    const { name, quantity, category } = req.body;

    if (!name || quantity === undefined || !category) {
      res.status(400).json({ error: "すべての項目を入力してください。" });
      return;
    }

    const newItem = {
      id: Date.now(),
      name,
      quantity: Number(quantity),
      category,
    };

    inventoryData.push(newItem);
    res.status(201).json(newItem);
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
