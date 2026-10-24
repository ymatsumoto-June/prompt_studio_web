# AI Prompt Studio（Webツール）デプロイ＆自動収益化マニュアル
**〜サーバー代0円で永久稼働し、noteへ読者を送り込むマイクロWebツール〜**

---

## 📌 概要
本ツールは、HTML/Tailwind CSS/JavaScriptで構築された、完全クライアントサイド動作の「ビジネス特化型AIプロンプト自動生成Webツール」です。

- **サーバー代・API費用**: **完全0円**（利用者のブラウザ上で全て完結）
- **機能**: メール辞退、納期遅延謝罪、議事録要約、辛口壁打ち、Excel関数生成、Claude向けXMLタグ構文切り替えなど
- **導線**: ツール画面下部に、noteの有料3商品（特に1,980円のプロンプト50選、980円バイブル）への**高CVRバナーが常時表示**され、無料ツールから有料コンテンツへの購入を自然に促します。

---

## 🚀 0円デプロイ（世界中へ無料公開）の2つの方法

### 方法1: Vercel にデプロイ（最もおすすめ・所要時間3分）
1. [Vercel](https://vercel.com/) に無料登録（GitHubアカウントでログイン）。
2. 「Add New...」> 「Project」をクリック。
3. 本リポジトリ（または本フォルダ）をGitHubにプッシュし、Vercelで「Import」をクリック。
4. 「Deploy」ボタンを押すだけで、世界最高速のCDNサーバー上に**即座に公開URL（https://xxx.vercel.app）が発行**されます。

### 方法2: GitHub Pages にデプロイ
1. GitHubのリポジトリ設定（Settings）> 「Pages」を開く。
2. Sourceを「Deploy from a branch」にし、`main` ブランチの `tools/prompt_studio_web`（またはルート）を指定して保存するだけ。

---

## 💡 ローカルでのプレビュー方法
ブラウザで直接 `tools/prompt_studio_web/index.html` をダブルクリックして開くだけで、今すぐ手元のPCで完全に動作します。
