# japan-prefecture-specialties
A web app to explore Japanese prefecture specialties by clicking an interactive map built with Next.js and TypeScript.  🇯🇵

## 都道府県名産品表示アプリ
React + TypeScript + Vite で作成した学習用Webアプリ
日本地図（SVG）の都道府県をクリックすると、選択した都道府県の名産品を表示する

## 機能
- 日本地図（SVG）を表示
- 都道府県クリックで `selectedPrefecture` を更新
- 選択した都道府県名を表示
- 名産品を `ul/li` で一覧表示
- 初期状態は「都道府県を選択してください」を表示
- 名産品データ未定義の都道府県は「データなし」を表示
- ホバー時にクリック可能な見た目を表示
- 選択中の都道府県をハイライト表示

## 使用技術
- React
- TypeScript
- Vite
- CSS（素のCSS）
- Docker / Docker Compose

## 事前準備
SVGファイル取得元: https://github.com/geolonia/japanese-prefectures （`map-full.svg`）

## ローカル起動
```bash
npm install
npm run dev
```

起動後にアクセス
```text
http://localhost:5173
```

## Docker Compose起動
```bash
docker compose up --build
```

起動後にアクセス
```text
http://localhost:5173
```

停止
```bash
docker compose down
```

依存キャッシュも削除して停止
```bash
docker compose down -v
```

## 都道府県ごとのデータ
- 都道府県データは `src/data/*.json` で管理

## 主要ファイル
```text
.
└── src
    ├── App.tsx
    ├── assets
    │   └── map-full.svg
    ├── data
    │   └── prefectures.json
    ├── main.tsx
    └── index.css
```
