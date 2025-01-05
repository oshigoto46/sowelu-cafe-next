## 取り急ぎの構成

-  next 15 / node 18で動くはず。。

- 手動で、prismaのmigrationが必要、appのDockerの中に入ってやる..

## 手動デプロイ概要図

![スクリーンショット 2025-01-05 23 54 38](https://github.com/user-attachments/assets/2b3a6295-5748-4282-9736-62513d755eda)

- お名前.comでDNSひいてる (田渕EC2 `18.178.110.13`)
- .envでめっちゃパスワード晒してる
- Lets encryptでSSL構成（３ヶ月後きれちゃう。。）
- git pull と docker-compose up & down でデプロイ
