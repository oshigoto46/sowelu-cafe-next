import { useState } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import "../../app/globals.css";

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  category: string;
}

interface Category {
  id: number;
  name: string;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    { id: 1, name: "食品" },
    { id: 2, name: "日用品" },
    { id: 3, name: "衣類" },
  ]);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);
  const [newItemCategory, setNewItemCategory] = useState<string>("食品");
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  const handleAddItem = () => {
    if (!newItemName || newItemQuantity <= 0) {
      alert("有効な名前と数量を入力してください");
      return;
    }

    const newItem: InventoryItem = {
      id: Date.now(),
      name: newItemName,
      quantity: newItemQuantity,
      category: newItemCategory,
    };

    setInventory([...inventory, newItem]);
    setNewItemName("");
    setNewItemQuantity(1);
    setNewItemCategory(categories[0]?.name || "");
  };
  const handleAddCategory = async () => {
    if (!newCategoryName) {
      alert("カテゴリ名を入力してください");
      return;
    }
  
    const newCategory: Category = {
      id: Date.now(),
      name: newCategoryName,
    };
  
    try {
      // API リクエスト
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newCategory),
      });
  
      if (!response.ok) {
        throw new Error("カテゴリの登録に失敗しました");
      }
  
      // 成功時のレスポンス処理
      const savedCategory = await response.json();
      setCategories([...categories, savedCategory]);
      setNewCategoryName("");
    } catch (error) {
      console.error(error);
      alert("カテゴリの登録中にエラーが発生しました");
    }
  };
  
  return (
    <div className="min-h-screen flex">
      <AdminSidebar />
      {/* メインコンテンツ */}
      <main className="max-w-4xl mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">在庫を登録</h2>

        {/* カテゴリ追加フォーム */}
        <div className="bg-gray-100 p-4 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">カテゴリを追加</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              新しいカテゴリ名
            </label>
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <button
            onClick={handleAddCategory}
            className="w-full bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-600"
          >
            追加
          </button>
        </div>

        {/* 在庫登録フォーム */}
        <div className="bg-gray-100 p-4 rounded-lg shadow mb-8">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">新しい在庫を追加</h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              在庫名
            </label>
            <input
              type="text"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              数量
            </label>
            <input
              type="number"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(Number(e.target.value))}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              min="1"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              カテゴリ
            </label>
            <select
              value={newItemCategory}
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
            >
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={handleAddItem}
            className="w-full bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600"
          >
            追加
          </button>
        </div>

        {/* 在庫リスト */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 mb-4">在庫リスト</h3>
          {inventory.length === 0 ? (
            <p className="text-gray-500">在庫はまだありません。</p>
          ) : (
            <ul className="space-y-2">
              {inventory.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <span className="text-gray-800 font-medium">{item.name}</span>
                  <span className="text-gray-600">数量: {item.quantity}</span>
                  <span className="text-gray-500">カテゴリ: {item.category}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
