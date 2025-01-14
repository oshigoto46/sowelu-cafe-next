'use client';

import { useState, useEffect } from "react";
import AdminSidebar from "@/components/AdminSidebar";
import '../../../app/globals.css';

interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
  category: { id: number; name: string }; // カテゴリをオブジェクトとして保持
}

interface Category {
  id: number;
  name: string;
}

export default function InventoryPage() {
  const [inventory, setInventory] = useState<InventoryItem[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);
  const [newItemCategory, setNewItemCategory] = useState<number | null>(null); // カテゴリIDを保持
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  // カテゴリを取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) throw new Error("カテゴリの取得に失敗しました");

        const data: Category[] = await response.json();
        setCategories(data);
        if (data.length > 0) setNewItemCategory(data[0].id); // デフォルトカテゴリを最初のカテゴリに設定
      } catch (error) {
        console.error("カテゴリの取得エラー:", error);
        alert("カテゴリの取得中にエラーが発生しました");
      }
    };

    fetchCategories();
  }, []);

  // 在庫リストを取得
  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch("/api/inventories");

        const data: InventoryItem[] = await response.json();
        setInventory(data);
      } catch (error) {
        console.error("在庫リスト取得エラー:", error);
        alert("在庫リストの取得中にエラーが発生しました");
      }
    };

    fetchInventory();
  }, []);

  // 在庫を追加
  const handleAddItem = async () => {
    if (!newItemName || newItemQuantity <= 0 || newItemCategory === null) {
      alert("有効な名前、数量、カテゴリを入力してください");
      return;
    }
  
    const newItem = {
      name: newItemName,
      quantity: newItemQuantity,
      categoryId: newItemCategory,
    };
  
    try {
      const response = await fetch("/api/inventories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
  
      if (!response.ok) throw new Error("在庫の追加に失敗しました");
  
      const savedItem = await response.json();
  
      // `categoryId` を基に `categories` 配列から該当カテゴリを取得
      const category = categories.find((cat) => cat.id === savedItem.categoryId);
  
      if (!category) {
        console.error("カテゴリ情報が見つかりませんでした");
        alert("カテゴリ情報の補完に失敗しました");
        return;
      }
  
      // `category` を補完した新しいアイテム
      const completeItem: InventoryItem = {
        ...savedItem,
        category,
      };
  
      // ローカルステートを更新
      setInventory([...inventory, completeItem]);
      setNewItemName("");
      setNewItemQuantity(1);
      setNewItemCategory(categories[0]?.id || null); // デフォルトカテゴリに戻す
    } catch (error) {
      console.error("在庫登録エラー:", error);
      alert("在庫の登録中にエラーが発生しました");
    }
  };

  // カテゴリを追加
  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      alert("カテゴリ名を入力してください");
      return;
    }

    try {
      const response = await fetch("/api/categories", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newCategoryName }),
      });

      if (!response.ok) throw new Error("カテゴリの登録に失敗しました");

      const savedCategory: Category = await response.json();
      setCategories([...categories, savedCategory]);
      setNewCategoryName("");
    } catch (error) {
      console.error("カテゴリ登録エラー:", error);
      alert("カテゴリの登録中にエラーが発生しました");
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <AdminSidebar className="w-1/4" />
      <main className="flex-1 mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">在庫を登録</h2>

        <div className="flex flex-col sm:flex-row gap-4">
          {/* カテゴリ追加フォーム */}
          <div className="w-full sm:w-1/3 bg-gray-100 p-4 rounded-lg shadow">
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
          <div className="w-full sm:w-2/3 bg-gray-100 p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">新しい在庫を追加</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">在庫名</label>
              <input
                type="text"
                value={newItemName}
                onChange={(e) => setNewItemName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">数量</label>
              <input
                type="number"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                min="1"
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">カテゴリ</label>
              <select
                value={newItemCategory || ""}
                onChange={(e) => setNewItemCategory(Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
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
        </div>

        {/* 在庫リスト */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">在庫リスト</h2>
          {inventory.length === 0 ? (
            <p className="text-gray-500">在庫はまだありません。</p>
          ) : (
            <ul className="space-y-2">
              {inventory.map((item) => (
                <li
                  key={item.id}
                  className="bg-gray-100 p-4 rounded-lg shadow flex justify-between items-center"
                >
                  <span className="text-gray-800 font-medium">
                    {item.name} ({item.category?.name || "カテゴリ未設定"})
                  </span>
                  <span className="text-gray-600">数量: {item.quantity}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </main>
    </div>
  );
}
