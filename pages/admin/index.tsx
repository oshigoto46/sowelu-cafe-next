import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import "../../app/globals.css";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  category: string;
  minQuantity: number;
}

export default function AdminDashboard() {
  const [inventory] = useState<InventoryItem[]>([
    { id: 1, name: "牛乳", quantity: 2, category: "食品", minQuantity: 5 },
    { id: 2, name: "パン", quantity: 10, category: "食品", minQuantity: 3 },
    { id: 3, name: "トイレットペーパー", quantity: 1, category: "日用品", minQuantity: 2 },
    { id: 4, name: "リンゴ", quantity: 8, category: "食品", minQuantity: 6 },
  ]);

  return (
    <div className="min-h-screen flex">
      {/* サイドメニュー */}
      <AdminSidebar />

      {/* メインコンテンツ */}
      <main className="flex-1 bg-gray-50 p-6">
        <section id="dashboard">
          <h2 className="text-xl font-semibold mb-4">ダッシュボード</h2>
          <p className="text-gray-700">ここに全体的な情報を表示します。</p>
        </section>

        <section id="inventory" className="mt-8">
          <h2 className="text-xl font-semibold mb-4">在庫管理</h2>
          {inventory.length === 0 ? (
            <p className="text-gray-500">在庫データはありません。</p>
          ) : (
            <ul className="space-y-2">
              {inventory.map((item) => (
                <li
                  key={item.id}
                  className={`p-4 rounded-lg shadow flex justify-between items-center ${
                    item.quantity <= item.minQuantity
                      ? "bg-red-50 border border-red-200"
                      : "bg-gray-100"
                  }`}
                >
                  <span className="text-gray-800 font-medium">
                    {item.name} ({item.category})
                  </span>
                  <span className="text-gray-600">
                    在庫: {item.quantity} / 最低: {item.minQuantity}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </section>

        <section id="orders" className="mt-8">
          <h2 className="text-xl font-semibold mb-4">注文管理</h2>
          <p className="text-gray-700">ここに注文情報を表示します。</p>
        </section>

        <section id="settings" className="mt-8">
          <h2 className="text-xl font-semibold mb-4">設定</h2>
          <p className="text-gray-700">ここに設定オプションを表示します。</p>
        </section>
      </main>
    </div>
  );
}
