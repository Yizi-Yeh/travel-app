# Japan Trip PWA

日本旅行全程管理的 PWA（Next.js + Prisma + PostgreSQL + NextAuth）。

## Features

- 13 個旅程模組路由
- Google-only 登入（NextAuth.js）
- 多旅程 + 協作（Owner/Member）
- 附件上傳（PostgreSQL bytea）
- 離線快取 + mutation queue（IndexedDB）
- PWA（manifest + service worker）

## Setup

### 1) Install

```bash
npm install
```

### 2) Environment Variables

建立 `.env`：

```
DATABASE_URL=postgresql://user:pass@localhost:5432/japan_trip
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-secret
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

### 3) Prisma

```bash
npx prisma migrate dev
npx prisma generate
```

### 4) Dev server

```bash
npm run dev
```

## Notes

- 附件上傳使用 base64 JSON 上傳，適合小檔案。大型檔案未最佳化。
- PWA 使用 `next-pwa`（optionalDependencies），若未安裝則不啟用 SW。
