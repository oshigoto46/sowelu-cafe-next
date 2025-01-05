import Image from "next/image";
import './globals.css';

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <h1 className="text-lg text-black mb-6">会員の方は下記からログインしてください</h1>
      <button className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
        ログイン
      </button>
    </div>
  );
}