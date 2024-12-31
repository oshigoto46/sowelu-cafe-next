import { PrismaClient } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  
  if (req.method === "POST") {
    const { userId }: { userId: number } = req.body;
    console.log(`-----${JSON.stringify(req.body)}-----44455--------`);
    console.log("-------------------")
    console.log("-------------------")
    console.log("-------------------")
    console.log("-------------------")
    // バリデーション: 必須フィールドの確認
    if (!userId) {
      return res.status(400).json({ error: "userId is required" });
    }

    try {
      // 出退勤記録を作成
      const attendance = await prisma.attendance.create({
        data: {
          userId,
        },
      });

      res.status(201).json(attendance);
    } catch (error) {
      console.log(`-----${JSON.stringify(error)}------444--------`);
      console.error("Error creating attendance:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else if (req.method === "GET") {
    try {
      // 出退勤記録を全件取得
      const attendances = await prisma.attendance.findMany({
        include: {
          user: true, // リレーション情報を含む
        },
      });

      res.status(200).json(attendances);
    } catch (error) {
      console.log(`-----${JSON.stringify(req.body)}----111----------`);
      console.log(`-----${JSON.stringify(error)}--------------`);
      console.log("-------------------")
      console.log("-------------------")
      console.log("-------------------")
      console.log("-------------------")
      console.error("Error fetching attendances:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
