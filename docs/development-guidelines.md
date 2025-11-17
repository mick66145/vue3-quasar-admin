# 開發指南

## 概述

本指南旨在為專案的開發提供一系列規範和準則，確保程式碼品質、可維護性、可擴展性及團隊協作效率。

## 目錄

- [快速開始](#快速開始)
- [專案架構](#專案架構)
- [開發流程](#開發流程)
- [功能組織方式](#功能組織方式)
- [程式碼規範](#程式碼規範)
- [Git 規範](#git-規範)
- [文件撰寫](#文件撰寫)
- [測試規範](#測試規範)
- [部署流程](#部署流程)
- [常見問題](#常見問題)

---

## 快速開始

### 環境要求

```bash
Node.js: >= 18.x
npm: >= 9.x
```

### 安裝依賴

```bash
# 安裝依賴
npm install

# 啟動開發伺服器
npm run dev

# 構建生產版本
npm run build

# 預覽生產構建
npm run preview

# 執行 Lint
npm run lint
```

### 開發環境配置

專案支援多環境配置：

```bash
# 本地開發
npm run dev

# 使用開發環境配置
npm run dev:dev

# 使用測試環境配置
npm run dev:beta

# 使用正式環境配置
npm run dev:prod
```

環境配置檔案：

```
.env.localhost       # 本地開發環境
.env.dev            # 開發環境
.env.beta           # 測試環境
.env.production     # 正式環境
```

---

## 專案架構

### 目錄結構

```
vue3-quasar-backend/
├── public/                      # 靜態資源
├── server/mock/                 # Mock 數據
├── src/
│   ├── @core/                  # 核心可重用模組 ⭐
│   │   ├── components/        # 核心元件庫（147個全域元件）
│   │   ├── modules/           # 業務功能模組（22個模組）
│   │   └── utils/             # 核心工具函數
│   ├── components/            # 專案特定元件
│   ├── views/                 # 頁面視圖
│   ├── router/                # 路由配置
│   ├── stores/                # Pinia 狀態管理
│   ├── hooks/                 # Composables（32個）
│   ├── api/                   # API 接口
│   ├── plugins/               # 插件
│   ├── directive/             # 自訂指令
│   ├── utils/                 # 工具函數
│   ├── locales/               # 國際化
│   ├── styles/                # 樣式
│   ├── config/                # 配置
│   ├── layouts/               # 佈局
│   ├── models/                # 數據模型
│   └── icons/                 # SVG 圖標
├── docs/                       # 文檔
├── docker/                     # Docker 配置
└── ... 配置檔案
```

### 核心概念

#### @core 目錄

`@core` 目錄包含所有可重用的核心程式碼：

- **components/** - 147 個全域註冊的 UI 元件
  - `form/` - 表單元件（49 個）
  - `button/` - 按鈕元件（28 個）
  - `card/` - 卡片元件
  - `dialog/` - 對話框元件
  - `table/` - 表格元件
  - 等等...

- **modules/** - 業務功能模組，每個模組包含：
  - `api/` - API 層
  - `models/` - 數據模型
  - `router/` - 路由配置
  - `views/` - 視圖頁面

- **utils/** - 核心工具函數

#### hooks 目錄

32 個可重用的 Composables：

- `useCRUD.js` - CRUD 操作標準化
- `useDialog.js` - 對話框邏輯
- `useServerDataTable.js` - 服務端分頁表格
- `useResource.js` - RESTful API 資源
- 更多...

詳細說明請參考 [Composables/Hooks 使用指南](./composables-guide.md)。

---

## 開發流程

### 功能開發流程

```
1. 從 dev 分支切出功能分支
   ↓
2. 開發功能（遵循規範）
   ↓
3. 自測通過
   ↓
4. 提交程式碼（符合 Commit 規範）
   ↓
5. 發起 Pull Request 到 dev
   ↓
6. Code Review
   ↓
7. 合併到 dev
   ↓
8. 測試環境驗證（beta）
   ↓
9. 正式上線（master）
```

### 開發新功能

#### 步驟 1：創建功能分支

```bash
# 切換到 dev 並更新
git checkout dev
git pull origin dev

# 切出功能分支
git checkout -b feat/your-feature-name
```

#### 步驟 2：開發功能

根據功能類型選擇適當的開發方式：

**情況 A：新增功能**

首先閱讀 [功能組織方式指南](./feature-organization-guide.md) 了解如何選擇開發方式：
- **模組化方式** - 適合完整的業務功能（參考 [功能模組開發指南](./module-development-guide.md)）
- **非模組化方式** - 適合簡單的單一頁面功能

**情況 B：修改現有功能**

1. 找到對應的模組或功能目錄
2. 修改相關檔案
3. 更新相關文檔

**情況 C：新增/修改元件**

參考 [自訂元件使用指南](./components-guide.md)。

#### 步驟 3：自測

```bash
# 執行 Lint 檢查
npm run lint

# 手動測試功能
npm run dev

# 執行單元測試（如有）
npm run test
```

#### 步驟 4：提交程式碼

遵循 [Git 規範](#git-規範)：

```bash
# 添加變更
git add .

# 提交（會自動執行 lint-staged）
git commit -m "feat(user): 新增使用者管理功能"

# 推送
git push -u origin feat/your-feature-name
```

#### 步驟 5：發起 Pull Request

1. 在 GitHub/GitLab 開啟 Pull Request
2. 填寫 PR 描述（說明變更內容）
3. 指定 Reviewer
4. 等待 Code Review

### Code Review 指南

#### Reviewer 檢查項目

- [ ] 程式碼符合風格規範
- [ ] 邏輯正確，無明顯 bug
- [ ] 變數和函式命名清晰
- [ ] 複雜邏輯有註釋
- [ ] 無多餘的 console.log
- [ ] 無未使用的變數和 import
- [ ] 效能考慮（如有大量數據處理）
- [ ] 安全性考慮（無 XSS、SQL Injection 等）

#### 開發者回應 Review

- 及時回應 Reviewer 的意見
- 對於建議的修改，說明原因或進行調整
- 修改完成後通知 Reviewer 再次審查

---

## 功能組織方式

專案支援兩種功能組織方式，請根據功能的複雜度和需求選擇合適的方式：

### 1. 模組化功能（Module-based）

**適用場景：**
- 完整的業務功能模組（如：用戶管理、訂單系統）
- 需要多個頁面（列表、新增、編輯）
- 需要完整的 CRUD 操作
- 功能可能被其他模組重用

**目錄結構：**
```
src/@core/modules/{module-name}/
├── api/
├── models/
├── router/
└── views/
```

**範例：** News（最新消息）、User（用戶管理）

詳細說明請參考 [功能模組開發指南](./module-development-guide.md)。

### 2. 非模組化功能（Standalone）

**適用場景：**
- 簡單的單一頁面
- 主要是資料展示
- 不需要複雜的狀態管理
- 快速開發原型

**目錄結構：**
```
src/
├── api/{feature}.js
├── models/{Feature}Model.js
├── router/modules/{feature}.js
└── views/{feature}/
```

**範例：** Article（文章列表）、Dashboard（儀表板）

### 如何選擇？

詳細的選擇指南、開發步驟、最佳實踐請參考 [功能組織方式指南](./feature-organization-guide.md)。

---

## 程式碼規範

### 基本規範

請參考 [code-style-guide.md](./code-style-guide.md)。

重點摘要：

1. **命名規範**
   - 元件檔案：PascalCase（`UserList.vue`）
   - Hook 檔案：camelCase（`useCRUD.js`）
   - 變數：camelCase（`userData`）
   - 常數：UPPER_SNAKE_CASE（`API_BASE_URL`）

2. **Vue 元件結構**
   ```vue
   <template>...</template>
   <script>...</script>
   <style lang="scss" scoped>...</style>
   ```

3. **Composition API**
   - 使用 `vue-demi` 導入
   - 優先使用 `ref` 和 `reactive`
   - 解構 props 使用 `toRefs`

4. **程式碼格式化**
   - ESLint + Prettier 自動格式化
   - 提交前自動執行 lint-staged

### UI 樣式規範

請參考 [style-guide.md](./style-guide.md)。

重點摘要：

1. **顏色系統** - 使用專案定義的主題色
2. **間距系統** - 使用 Quasar (`q-pa-md`) 或 Tailwind (`p-4`)
3. **響應式設計** - 確保手機、平板、桌面都能正常顯示
4. **元件一致性** - 使用專案的核心元件

---

## Git 規範

### 分支規範

請參考 [git.md](./git.md)。

**分支類型**：

- `master` - 正式環境
- `beta` - 測試環境
- `dev` - 開發整合分支
- `feat/` - 功能開發
- `fix/` - Bug 修復
- `docs/` - 文件維護
- `refactor/` - 程式碼重構

### Commit 規範

遵循 [Conventional Commits](https://www.conventionalcommits.org/)：

```
<type>(<scope>): <description>

[可選內容]
```

**常見 type**：

- `feat` - 新功能
- `fix` - 錯誤修復
- `docs` - 文件修改
- `style` - 程式碼風格（不影響邏輯）
- `refactor` - 程式碼重構
- `perf` - 效能優化
- `test` - 測試程式碼
- `chore` - 建置流程或工具維護

**範例**：

```bash
feat(user): 新增使用者列表頁面
fix(api): 修正登入 API 回傳格式錯誤
docs(readme): 更新專案啟動方式
refactor(auth): 優化認證邏輯
```

---

## 文件撰寫

### 必讀文件

在進行文件撰寫前，請務必先閱讀以下文件風格指南：

- **系統架構文件風格指南**: [sa-documentation-style-guide.md](./sa-documentation-style-guide.md)
- **系統設計文件風格指南**: [sd-documentation-style-guide.md](./sd-documentation-style-guide.md)

### 一般規範

- 所有公開的類別、方法、函式都應該有清晰的 JSDoc 或 TypeScript Doc 註釋，說明其用途、參數、返回值和可能拋出的錯誤。
- 複雜的業務邏輯或演算法應在程式碼中添加適當的註釋，解釋其實現細節。
- API 文件應保持更新，與實際程式碼行為一致。
- 當有更新或調整相關功能時，請務必同步更新對應的文件（如 API 文件、設計規範、開發指南等），以確保文件內容與實際功能保持一致。

### 功能開發文件命名規範

- 功能開發文件請使用「global-keys」這種命名風格：全部小寫英文，單詞之間用短橫線（-）連接，簡明描述功能主題。
- 例如：`global-keys.md`、`user-login.md`
- 文件存放於 `docs/features/` 目錄下。

### 註釋範例

#### 函式註釋

```javascript
/**
 * 格式化日期為指定格式
 *
 * @param {string|Date} date - 日期
 * @param {string} format - 格式字串，預設 'YYYY-MM-DD'
 * @returns {string} 格式化後的日期字串
 *
 * @example
 * formatDate(new Date(), 'YYYY/MM/DD')  // '2024/01/15'
 */
export const formatDate = (date, format = 'YYYY-MM-DD') => {
  return dayjs(date).format(format)
}
```

#### 元件註釋

```vue
<script>
/**
 * UserList - 使用者列表頁面
 *
 * 功能：
 * - 顯示使用者列表
 * - 支援搜尋、排序、分頁
 * - 支援新增、編輯、刪除使用者
 * - 支援重置密碼
 */
export default defineComponent({
  name: 'UserList',
  // ...
})
</script>
```

---

## 測試規範

### 單元測試

專案使用 **Vitest** 作為測試框架。

#### 測試檔案位置

```
src/
├── utils/
│   ├── date.js
│   └── __tests__/
│       └── date.test.js
```

#### 測試範例

```javascript
import { describe, it, expect } from 'vitest'
import { formatDate } from '../date'

describe('formatDate', () => {
  it('應該正確格式化日期', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date, 'YYYY-MM-DD')).toBe('2024-01-15')
  })

  it('應該使用預設格式', () => {
    const date = new Date('2024-01-15')
    expect(formatDate(date)).toBe('2024-01-15')
  })
})
```

#### 執行測試

```bash
# 執行所有測試
npm run test

# 執行測試並生成覆蓋率報告
npm run test:coverage

# 監聽模式
npm run test:watch
```

### 測試原則

1. **單元測試** - 測試獨立的函式和方法
2. **整合測試** - 測試元件和模組的整合
3. **測試覆蓋率** - 目標 80% 以上（重要業務邏輯）

---

## 部署流程

### 環境部署流程

```
本地開發 (localhost)
  ↓ 提交到 dev
開發環境 (dev)
  ↓ 合併到 beta
測試環境 (beta)
  ↓ 測試通過，合併到 master
正式環境 (production)
```

### 構建

```bash
# 開發環境構建
npm run build:dev

# 測試環境構建
npm run build:beta

# 正式環境構建
npm run build:prod
```

### Docker 部署

專案包含 Docker 配置：

```bash
# 構建 Docker 映像
docker build -t vue3-quasar-backend .

# 執行容器
docker run -p 3553:3553 vue3-quasar-backend
```

---

## 安全規範

### 防範常見漏洞

#### XSS (跨站腳本攻擊)

```vue
✅ 正確 - Vue 自動轉義
<div>{{ userInput }}</div>

❌ 危險 - 使用 v-html
<div v-html="userInput"></div>  <!-- 僅在信任的內容使用 -->
```

#### SQL Injection

```javascript
❌ 錯誤
const query = `SELECT * FROM users WHERE id = ${userId}`

✅ 正確 - 使用參數化查詢（後端）
const query = 'SELECT * FROM users WHERE id = ?'
db.query(query, [userId])
```

#### CSRF (跨站請求偽造)

專案的 API 使用 Token 認證，自動防範 CSRF。

### 敏感資訊保護

```javascript
❌ 錯誤 - 硬編碼 API Key
const API_KEY = 'sk-1234567890abcdef'

✅ 正確 - 使用環境變數
const API_KEY = import.meta.env.VITE_API_KEY
```

**不要提交**：

- `.env` 檔案（已在 `.gitignore`）
- API Keys、密碼
- 敏感配置

---

## 效能優化

### 前端效能

1. **代碼分割** - 路由懶加載
   ```javascript
   {
     path: '/user',
     component: () => import('@core/modules/user/views/UserList.vue'),
   }
   ```

2. **圖片優化** - 使用適當的圖片格式和大小

3. **避免不必要的重新渲染** - 使用 `computed` 和 `memo`

4. **虛擬滾動** - 大量數據使用虛擬滾動（VXE Table 已內建）

### API 優化

1. **分頁** - 大量數據使用分頁
2. **快取** - 適當使用快取
3. **批次請求** - 合併多個請求

---

## 語言規範

- 所有中文內容都應使用**繁體中文**。
- 程式碼註釋、commit message、文檔都使用繁體中文。
- 變數和函式命名使用英文。

---

## 常見問題

### Q: 如何新增一個功能？

首先閱讀 [功能組織方式指南](./feature-organization-guide.md) 了解如何選擇合適的開發方式（模組化 vs 非模組化）。

然後參考對應的開發指南：
- 模組化功能：[功能模組開發指南](./module-development-guide.md)
- 非模組化功能：參考 Article 範例（`src/views/article/`）

### Q: 如何使用專案的核心元件？

參考 [自訂元件使用指南](./components-guide.md)。

### Q: 如何使用 Composables/Hooks？

參考 [Composables/Hooks 使用指南](./composables-guide.md)。

### Q: 如何處理 API 錯誤？

使用 `useCRUD` Hook 自動處理：

```javascript
const { callReadListFetch } = useCRUD({
  readListFetch: userResource.list,
})

// 錯誤會自動顯示通知
const [res, error] = await callReadListFetch({ ...search })
```

### Q: 如何添加新的路由？

1. 在對應模組的 `router/modules/` 目錄新增路由檔案
2. 在 `router/index.js` 中導入並註冊

### Q: 如何添加國際化翻譯？

#### 翻譯檔案結構

專案支援 2 種語言，翻譯檔案位於 `src/locales/` 目錄：

- `zh-TW.json` - 繁體中文
- `en.json` - 英文

#### 命名規範

**1. 通用名稱（g.common）**

在 `g.common` 區塊中添加功能的通用名稱：

```json
{
  "g": {
    "common": {
      "property-usage-category": "資產使用類型",
      "user": "人員"
    }
  }
}
```

- 使用 kebab-case（小寫字母，單詞間用短橫線連接）
- 適用於選單、通用標籤等場景

**2. 功能專屬翻譯區塊**

為每個功能建立獨立的翻譯區塊，使用 kebab-case 命名：

```json
{
  "property-usage-category": {
    "title": "資產使用類型",
    "create": "新增資產使用類型",
    "edit": "編輯資產使用類型",
    "form": {
      "name": "使用類型名稱"
    },
    "detail": {
      "title": "資產使用類型詳情"
    }
  }
}
```

**標準結構：**

- `title` - 功能主標題
- `create` - 新增頁面標題
- `edit` - 編輯頁面標題
- `form.*` - 表單欄位標籤
- `detail.title` - 詳情頁面標題
- `detail.card.*` - 詳情卡片區塊標題

#### 使用方式

在 Vue 組件中使用 `$t()` 函數：

```vue
<template>
  <div>
    <!-- 功能標題 -->
    <page-header>{{ $t('property-usage-category.title') }}</page-header>

    <!-- 表單欄位 -->
    <input-text :label="$t('property-usage-category.form.name')" />

    <!-- 通用標籤 -->
    <span>{{ $t('g.common.property-usage-category') }}</span>
  </div>
</template>
```

#### 添加新功能翻譯的步驟

1. **在 g.common 添加通用名稱**（2 種語言）
2. **建立功能專屬區塊**（2 種語言）
3. **遵循標準結構**：title, create, edit, form, detail
4. **測試翻譯**：切換語言確保所有文字正確顯示

---

## 參考資源

### 外部文檔

- [Vue 3 官方文檔](https://vuejs.org/)
- [Quasar 官方文檔](https://quasar.dev/)
- [Pinia 官方文檔](https://pinia.vuejs.org/)
- [VueUse 文檔](https://vueuse.org/)
- [Tailwind CSS 文檔](https://tailwindcss.com/)

### 內部文檔

**開發指南：**
- [功能組織方式指南](./feature-organization-guide.md) ⭐ 新增功能必讀
- [功能模組開發指南](./module-development-guide.md)
- [自訂元件使用指南](./components-guide.md)
- [Composables/Hooks 使用指南](./composables-guide.md)

**規範文檔：**
- [程式碼風格指南](./code-style-guide.md)
- [UI 樣式指南](./style-guide.md)
- [Git 規範](./git.md)
- [系統架構文件風格指南](./sa-documentation-style-guide.md)
- [系統設計文件風格指南](./sd-documentation-style-guide.md)

---

## 檢查清單

開發功能前，請確認：

- [ ] 已閱讀相關開發指南
- [ ] 了解專案架構和規範
- [ ] 環境配置正確
- [ ] 已從最新的 dev 分支切出功能分支

開發功能時，請確認：

- [ ] 遵循程式碼風格規範
- [ ] 遵循 UI 樣式規範
- [ ] 使用專案的核心元件和 Hooks
- [ ] 複雜邏輯已添加註釋
- [ ] 已處理錯誤情況

提交程式碼前，請確認：

- [ ] 程式碼已通過 Lint 檢查
- [ ] 功能已自測通過
- [ ] Commit message 符合規範
- [ ] 無敏感資訊（API Key、密碼等）
- [ ] 相關文檔已更新
