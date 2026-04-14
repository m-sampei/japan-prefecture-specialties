# japan-prefecture-specialties
A web app to explore Japanese prefecture specialties by clicking an interactive map built with Next.js and TypeScript.  🇯🇵

## 都道府県名産品表示アプリ

学習用の最小サンプルとして作成した、React + TypeScript + Vite の Web アプリ
都道府県ボタンを選択すると、その都道府県の名産品一覧を表示する

## 機能
- 都道府県ボタン一覧を表示
- 選択した都道府県を state (`selectedPrefecture`) で保持
- 選択中の都道府県名を見出し表示
- 名産品を `ul/li` で一覧表示
- 初期状態では未選択メッセージを表示
- 選択中ボタンに `active` スタイルを適用

## 使用技術
- React
- TypeScript
- Vite
- CSS（素のCSS）
- Docker / Docker Compose

## 起動方法（Docker Compose）
前提: Docker Desktop（または Docker Engine + Compose）が利用可能なこと

```bash
docker compose up --build
```

起動後に以下へアクセス

```text
http://localhost:5173
```

停止コマンド

```bash
docker compose down
```

依存キャッシュも削除して停止する場合

```bash
docker compose down -v
```

## ローカル構成（主要ファイル）
```text
.
├── docker-compose.yml
├── Dockerfile
├── package.json
├── index.html
├── vite.config.ts
├── tsconfig.json
└── src
    ├── App.tsx
    ├── App.css
    ├── main.tsx
    └── index.css
```
