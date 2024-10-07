# Dummy__SNS
# ローカルでの前提情件
以下インストール
VsCode
Node.js(v20.18.0)
Node.jsをインストール後、以下のコマンドを叩きyarnをインストールすること
npm install -g yarn

# 環境構築編
Git HubからDUMMY__SNSリポジトリをクローン
VsCodeでプロジェクトを開く
ターミナルで今のプロジェクトフォルダーに移動したら以下コマンドを実行
npm init
聞かれる項目は以下に従うこと
　package name: (realsns) realsns
　version:
　gitrepository:
　keywords:                                                                                                                                                                        license: (ISC) IS

次に同じディレクトリで以下のコマンドを実行
npm i express mongoose nodemon helmet

作成されたpackage.jsonファイルの変更を破棄する
ターミナルで以下コマンドを叩き（サーバーが起動しますた）のメッセージがコンソールに表示されたら完了
npm run dev