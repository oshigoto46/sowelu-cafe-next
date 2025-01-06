"use client";

import './globals.css';
import { useState } from "react";

export default function Home() {
  const [isRegister, setIsRegister] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
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

  const handleSubmit = async () => {
    const endpoint = isRegister ? "/api/register" : "/api/login";

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    const data = await response.json();
    alert(data.message || data.error);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-2xl font-bold text-black mb-6">
        {isRegister ? "会員登録してください" : "ログインしてください"}
      </h1>
      <div className="w-full max-w-sm">
        {isRegister && (
          <input
            type="text"
            name="name"
            placeholder="名前"
            value={formData.name}
            onChange={handleChange}
            className="mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        )}
        <input
          type="email"
          name="email"
          placeholder="メールアドレス"
          value={formData.email}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="password"
          name="password"
          placeholder="パスワード"
          value={formData.password}
          onChange={handleChange}
          className="mb-4 w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSubmit}
          className="w-full bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
        >
          {isRegister ? "登録" : "ログイン"}
        </button>
        <button
          onClick={() => setIsRegister(!isRegister)}
          className="mt-4 text-blue-500 underline w-full text-center"
        >
          {isRegister ? "既存のアカウントでログイン" : "新規登録はこちら"}
        </button>
      </div>
    </div>
  );
}
