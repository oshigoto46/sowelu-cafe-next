import mysql from "mysql2/promise";
import dotenv from "dotenv";

// 環境変数の読み込み
dotenv.config();

// MySQL 接続プールを作成
const db = mysql.createPool({
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  port: Number(process.env.DATABASE_PORT),
});

export default db;
