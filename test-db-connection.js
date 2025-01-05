const mysql = require("mysql2/promise");

async function insertData() {
  // データベース接続情報
  const dbConfig = {
    host: "127.0.0.1",          // ホスト名
    user: "root",               // ユーザー名
    password: ".Passw0rd",      // パスワード
    database: "sowelu_development", // データベース名
    port: 3306,                 // ポート番号
  };

  const insertSQL = `
    INSERT INTO User (name, email, password)
    VALUES (?, ?, ?);
  `;

  // 挿入するデータ
  const values = ["John Doe", "john.doe@example.com", "securepassword123"];

  try {
    console.log("データベースに接続を試みます...");
    const connection = await mysql.createConnection(dbConfig);
    console.log("データベース接続成功!");

    console.log("データを挿入中...");
    const [result] = await connection.query(insertSQL, values);
    console.log("データ挿入成功!", result);

    await connection.end();
    console.log("接続を終了しました。");
  } catch (error) {
    console.error("エラーが発生しました:", error);
  }
}

// スクリプト実行
insertData();
