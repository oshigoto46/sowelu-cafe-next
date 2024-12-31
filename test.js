const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    // User テーブルに新しいユーザーを作成
    const user = await prisma.user.create({
      data: {
        name: "John Doe",
        email: "johndoe@example.com",
      },
    });
    console.log("User created:", user);

    // Attendance テーブルに出退勤記録を作成
    const attendance = await prisma.attendance.create({
      data: {
        userId: user.id, // 作成したユーザーの ID を使用
      },
    });
    console.log("Attendance record created:", attendance);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
