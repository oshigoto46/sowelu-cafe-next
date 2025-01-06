import { useState, useEffect } from "react";
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
  const [categories, setCategories] = useState<Category[]>([]); // カテゴリ用のステート
  const [newItemName, setNewItemName] = useState<string>("");
  const [newItemQuantity, setNewItemQuantity] = useState<number>(1);
  const [newItemCategory, setNewItemCategory] = useState<string>(""); // カテゴリを管理
  const [newCategoryName, setNewCategoryName] = useState<string>("");

  // カテゴリを取得
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories");
        if (!response.ok) {
          throw new Error("カテゴリの取得に失敗しました");
        }
        const data = await response.json();
        setCategories(data);
        if (data.length > 0) {
          setNewItemCategory(data[0].name); // デフォルトカテゴリを最初のカテゴリに設定
        }
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
        const response = await fetch("/api/inventory");
        if (!response.ok) {
          throw new Error("在庫リストの取得に失敗しました");
        }
        const data = await response.json();
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
    if (!newItemName || newItemQuantity <= 0) {
      alert("有効な名前と数量を入力してください");
      return;
    }

    const newItem = {
      name: newItemName,
      quantity: newItemQuantity,
      category: newItemCategory,
    };

    try {
      const response = await fetch("/api/inventory", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      if (!response.ok) {
        throw new Error("在庫の追加に失敗しました");
      }

      const savedItem = await response.json();
      setInventory([...inventory, savedItem]); // ローカルステートに新しい在庫を追加
      setNewItemName("");
      setNewItemQuantity(1);
      setNewItemCategory(categories[0]?.name || ""); // デフォルトカテゴリに戻す
    } catch (error) {
      console.error(error);
      alert("在庫の登録中にエラーが発生しました");
    }
  };

  // カテゴリを追加
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

      const savedCategory = await response.json();
      setCategories([...categories, savedCategory]);
      setNewCategoryName("");
    } catch (error) {
      console.error(error);
      alert("カテゴリの登録中にエラーが発生しました");
    }
  };

  return (
    <div className="min-h-screen flex w-full">
      <AdminSidebar className="w-1/4" />
      <main className="flex-1 mx-auto mt-8 bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-6">在庫を登録</h2>

        {/* 横並びのフォーム (レスポンシブ対応) */}
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
