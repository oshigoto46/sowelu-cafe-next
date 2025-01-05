module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brown: {
          600: "#8B5E3C", // RESERVEボタンの茶色
          700: "#70482E", // ホバー用
        },
        black: {
          DEFAULT: "#333333", // MY PAGE ボタンの背景
          light: "#555555",   // ログインボタンの枠線色
        },
        gray: {
          50: "#F9F9F9", // 背景色
          200: "#CCCCCC", // 枠線色
        },
      },
    },
  },
  plugins: [],
};
