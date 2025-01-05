# Node.js 18 イメージを使用
FROM node:18

# 作業ディレクトリの作成
WORKDIR /usr/src/app

# パッケージのインストール
COPY package*.json ./
RUN npm install

# ソースコードをコピー
COPY . .

# コンテナのポート3000を公開
EXPOSE 3000

# Next.js アプリケーションを実行
CMD ["npm", "run", "dev"]
