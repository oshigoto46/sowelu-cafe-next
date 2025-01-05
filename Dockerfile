# Node.js 18 イメージを使用
FROM node:18

# 作業ディレクトリの作成
WORKDIR /usr/src/app

# パッケージのインストール
COPY package*.json ./
RUN npm ci

# ソースコードをコピー
COPY . .

# Next.js アプリケーションのビルド
RUN npm run build

# コンテナのポート3001を公開
EXPOSE 3001

# Next.js アプリケーションを実行
CMD ["npm", "start"]
