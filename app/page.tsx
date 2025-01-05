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
