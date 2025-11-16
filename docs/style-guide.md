# UI 樣式指南

## 概述

本指南定義了專案的 UI 設計和樣式規範，確保使用者介面的一致性和美觀性。

## 目錄

- [設計系統](#設計系統)
- [佈局規範](#佈局規範)
- [顏色系統](#顏色系統)
- [間距系統](#間距系統)
- [字體規範](#字體規範)
- [元件樣式規範](#元件樣式規範)
- [響應式設計](#響應式設計)
- [深色模式](#深色模式)

---

## 設計系統

專案使用 **Quasar Framework** 作為基礎 UI 框架，並整合 **Tailwind CSS** 提供額外的工具類別。

### 技術棧

```
UI 框架: Quasar Framework v2
CSS 框架: Tailwind CSS v3
CSS 預處理器: SCSS
```

### Quasar 配置

主題變數定義在 `src/styles/abstracts/quasar-variables.scss`：

```scss
// 主色調
$primary: #1976d2;
$secondary: #26a69a;
$accent: #9c27b0;

// 狀態色
$positive: #21ba45;
$negative: #c10015;
$info: #31ccec;
$warning: #f2c037;

// 中性色
$dark: #1d1d1d;
$dark-page: #121212;

// 其他
$border-radius: 4px;
$generic-border-radius: 4px;
```

---

## 佈局規範

### 頁面結構

標準頁面結構：

```vue
<template>
  <base-page>
    <!-- 頁面標題 -->
    <page-header>
      {{ $t('user.title') }}
      <template #action>
        <add-button
          v-permission="['create user']"
          to="/user/create"
        />
      </template>
    </page-header>

    <!-- 主要內容 -->
    <q-card>
      <card-body>
        <!-- 搜尋區塊 -->
        <search-block class="q-mb-md" />

        <!-- 表格或其他內容 -->
        <vxe-server-table :data="data" />
      </card-body>
    </q-card>
  </base-page>
</template>
```

### 佈局元件

**BasePage** - 頁面容器：

```vue
<base-page>
  <!-- 頁面內容 -->
</base-page>
```

**PageHeader** - 頁面標題：

```vue
<page-header>
  標題文字
  <template #action>
    <add-button />
  </template>
</page-header>
```

**Card 系列** - 卡片容器：

```vue
<q-card>
  <card-header>標題</card-header>
  <card-body>內容</card-body>
</q-card>
```

### 網格系統

使用 **Quasar Grid** 或 **Tailwind Flex/Grid**：

```vue
<!-- Quasar Row/Col -->
<q-row>
  <q-col cols="12" md="6">
    左側內容
  </q-col>
  <q-col cols="12" md="6">
    右側內容
  </q-col>
</q-row>

<!-- Tailwind Flex -->
<div class="flex gap-4">
  <div class="flex-1">左側</div>
  <div class="flex-1">右側</div>
</div>

<!-- Tailwind Grid -->
<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
  <div>項目 1</div>
  <div>項目 2</div>
</div>
```

---

## 顏色系統

### 主題色彩

專案定義了以下主題色：

| 色彩名稱 | 變數名稱 | 預設值 | 用途 |
|---------|---------|--------|------|
| Primary | `$primary` / `var(--q-primary)` | #1976d2 | 主要動作、連結 |
| Secondary | `$secondary` / `var(--q-secondary)` | #26a69a | 次要動作 |
| Accent | `$accent` / `var(--q-accent)` | #9c27b0 | 強調元素 |
| Positive | `$positive` / `var(--q-positive)` | #21ba45 | 成功狀態 |
| Negative | `$negative` / `var(--q-negative)` | #c10015 | 錯誤、刪除 |
| Info | `$info` / `var(--q-info)` | #31ccec | 資訊提示 |
| Warning | `$warning` / `var(--q-warning)` | #f2c037 | 警告提示 |
| Dark | `$dark` / `var(--q-dark)` | #1d1d1d | 深色文字、背景 |

### 使用方式

#### 在 SCSS 中使用

```scss
.custom-button {
  background: var(--q-primary);
  color: white;

  &:hover {
    background: var(--q-secondary);
  }
}
```

#### 在 Tailwind 中使用

```vue
<template>
  <div class="bg-primary text-white">
    主要色彩背景
  </div>
</template>
```

Tailwind 配置整合了 Quasar 色彩（`tailwind.config.js`）：

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: 'var(--q-primary)',
        secondary: 'var(--q-secondary)',
        accent: 'var(--q-accent)',
        positive: 'var(--q-positive)',
        negative: 'var(--q-negative)',
        info: 'var(--q-info)',
        warning: 'var(--q-warning)',
      },
    },
  },
}
```

#### 在 Quasar 元件中使用

```vue
<q-btn color="primary" label="主要按鈕" />
<q-btn color="negative" label="刪除" />
<q-chip color="positive" text-color="white" label="成功" />
```

### 灰階色彩

使用 Tailwind 的灰階系統：

```vue
<div class="bg-gray-50">   淺灰背景</div>
<div class="bg-gray-100">  更淺灰背景</div>
<div class="bg-gray-200">  淺灰</div>
...
<div class="bg-gray-900">  深灰</div>
```

### 文字顏色

```vue
<!-- Quasar 色彩 -->
<div class="text-primary">主色文字</div>
<div class="text-negative">錯誤文字</div>

<!-- 灰階 -->
<div class="text-gray-600">次要文字</div>
<div class="text-gray-400">提示文字</div>
```

---

## 間距系統

### Quasar 間距類別

Quasar 提供簡潔的間距類別：

| 類別 | 間距值 |
|------|--------|
| `q-pa-xs` | 4px |
| `q-pa-sm` | 8px |
| `q-pa-md` | 16px |
| `q-pa-lg` | 24px |
| `q-pa-xl` | 48px |

- `q-pa-*` - padding (all)
- `q-px-*` - padding-left + padding-right
- `q-py-*` - padding-top + padding-bottom
- `q-pt-*` - padding-top
- `q-pr-*` - padding-right
- `q-pb-*` - padding-bottom
- `q-pl-*` - padding-left

- `q-ma-*` - margin (all)
- `q-mx-*` / `q-my-*` / `q-mt-*` / `q-mr-*` / `q-mb-*` / `q-ml-*` - margin

範例：

```vue
<div class="q-pa-md">16px padding</div>
<div class="q-px-lg q-py-sm">24px 左右, 8px 上下</div>
<div class="q-mb-md">16px margin-bottom</div>
```

### Tailwind 間距類別

Tailwind 提供更細緻的間距控制（以 4px 為基準）：

```vue
<div class="p-1">   4px padding</div>
<div class="p-2">   8px padding</div>
<div class="p-3">   12px padding</div>
<div class="p-4">   16px padding</div>
<div class="p-6">   24px padding</div>
<div class="p-8">   32px padding</div>

<!-- 同樣支援 px, py, pt, pr, pb, pl -->
<div class="px-4 py-2">16px 左右, 8px 上下</div>

<!-- margin 同理 -->
<div class="m-4">16px margin</div>
<div class="mb-6">24px margin-bottom</div>
```

### 間距規範

**建議的間距使用**：

- **元件內部間距**：`q-pa-md` 或 `p-4`（16px）
- **元件之間間距**：`q-mb-md` 或 `mb-4`（16px）
- **區塊之間間距**：`q-mb-lg` 或 `mb-6`（24px）
- **頁面邊距**：`q-pa-lg` 或 `p-6`（24px）

範例：

```vue
<template>
  <base-page>
    <!-- 頁面標題，底部間距 -->
    <page-header class="q-mb-md">標題</page-header>

    <!-- 卡片 -->
    <q-card>
      <!-- 卡片內部間距 -->
      <card-body class="q-pa-md">
        <!-- 搜尋區塊，底部間距 -->
        <search-block class="q-mb-md" />

        <!-- 表格 -->
        <vxe-server-table :data="data" />
      </card-body>
    </q-card>
  </base-page>
</template>
```

---

## 字體規範

### 字體大小

使用 Tailwind 的字體大小類別：

| 類別 | 大小 | 用途 |
|------|------|------|
| `text-xs` | 12px | 輔助文字、標籤 |
| `text-sm` | 14px | 次要文字 |
| `text-base` | 16px | 正文（預設） |
| `text-lg` | 18px | 小標題 |
| `text-xl` | 20px | 標題 |
| `text-2xl` | 24px | 大標題 |
| `text-3xl` | 30px | 頁面標題 |

範例：

```vue
<h1 class="text-3xl font-bold">頁面標題</h1>
<h2 class="text-2xl font-semibold">區塊標題</h2>
<p class="text-base">正文內容</p>
<span class="text-sm text-gray-600">次要資訊</span>
<label class="text-xs text-gray-400">輔助文字</label>
```

### 字體粗細

```vue
<div class="font-thin">100</div>
<div class="font-light">300</div>
<div class="font-normal">400（預設）</div>
<div class="font-medium">500</div>
<div class="font-semibold">600</div>
<div class="font-bold">700</div>
```

### 行高

```vue
<div class="leading-tight">1.25</div>
<div class="leading-normal">1.5（預設）</div>
<div class="leading-relaxed">1.75</div>
```

---

## 元件樣式規範

### 按鈕

#### 主要按鈕

```vue
<base-button color="primary" label="主要動作" />
<add-button />
<save-button />
```

#### 次要按鈕

```vue
<base-button color="secondary" label="次要動作" />
<cancel-button />
```

#### 危險按鈕

```vue
<delete-button />
<base-button color="negative" label="刪除" />
```

#### 文字按鈕

```vue
<q-btn flat color="primary" label="文字按鈕" />
```

#### 圖標按鈕

```vue
<base-icon-button icon="edit" />
<edit-icon-button />
<delete-icon-button />
```

#### 按鈕大小

```vue
<base-button size="sm" label="小按鈕" />
<base-button size="md" label="中按鈕（預設）" />
<base-button size="lg" label="大按鈕" />
```

### 表單元件

#### 表單佈局

```vue
<q-form ref="form" class="q-gutter-md">
  <input-text
    v-model="data.state.name"
    label="名稱"
    :required="true"
  />

  <input-email
    v-model="data.state.email"
    label="電子郵件"
  />

  <input-select
    v-model="data.state.role"
    label="角色"
    :options="roleOptions"
  />

  <div class="flex justify-end gap-2">
    <cancel-button @click="cancel" />
    <save-button @click="save" />
  </div>
</q-form>
```

#### 表單樣式

- 預設使用 `outlined` 樣式
- 預設使用 `dense` 模式（緊湊）
- 統一的錯誤提示樣式

```vue
<input-text
  outlined
  dense
  v-model="value"
  label="標籤"
/>
```

### 表格

#### VXE 表格樣式

```vue
<vxe-server-table
  :data="data"
  :total="total"
  :current="search.page"
>
  <vxe-column
    field="name"
    title="名稱"
    min-width="150"
  />
  <vxe-column
    field="email"
    title="電子郵件"
    min-width="200"
  />
  <vxe-column
    title="操作"
    fixed="right"
    width="150"
  >
    <template #default="{ row }">
      <edit-icon-button />
      <delete-icon-button />
    </template>
  </vxe-column>
</vxe-server-table>
```

### 卡片

```vue
<q-card>
  <card-header>
    標題
  </card-header>

  <card-body>
    內容
  </card-body>

  <q-card-actions align="right">
    <cancel-button />
    <save-button />
  </q-card-actions>
</q-card>
```

### 對話框

```vue
<base-dialog
  v-model="isShowDialog"
  title="對話框標題"
>
  <q-form ref="form">
    <!-- 表單內容 -->
  </q-form>

  <template #actions>
    <cancel-button @click="hideDialog" />
    <save-button @click="save" />
  </template>
</base-dialog>
```

### 標籤頁

```vue
<base-tabs v-model="currentTab">
  <q-tab name="tab1" label="標籤 1" />
  <q-tab name="tab2" label="標籤 2" />
</base-tabs>

<q-tab-panels v-model="currentTab">
  <q-tab-panel name="tab1">
    標籤 1 內容
  </q-tab-panel>
  <q-tab-panel name="tab2">
    標籤 2 內容
  </q-tab-panel>
</q-tab-panels>
```

---

## 響應式設計

### 斷點系統

專案使用與 Quasar 一致的斷點：

| 斷點名稱 | 寬度 | 裝置 |
|---------|------|------|
| xs | 0-575px | 手機 |
| sm | 576-767px | 大手機 |
| md | 768-991px | 平板 |
| lg | 992-1199px | 桌面 |
| xl | 1200-1399px | 大桌面 |
| 2xl | 1400px+ | 超大桌面 |

### Quasar 響應式

使用 Quasar 的 `$q.screen`：

```vue
<script>
import { useQuasar } from 'quasar'

export default {
  setup() {
    const $q = useQuasar()

    const isMobile = computed(() => $q.screen.lt.md)  // 小於 md
    const isDesktop = computed(() => $q.screen.gt.sm) // 大於 sm

    return { isMobile, isDesktop }
  }
}
</script>

<template>
  <div v-if="isMobile">手機版</div>
  <div v-else>桌面版</div>
</template>
```

### Tailwind 響應式

```vue
<!-- 預設手機，md 以上桌面 -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div>項目 1</div>
  <div>項目 2</div>
  <div>項目 3</div>
</div>

<!-- 響應式文字大小 -->
<h1 class="text-2xl md:text-3xl lg:text-4xl">標題</h1>

<!-- 響應式間距 -->
<div class="p-4 md:p-6 lg:p-8">內容</div>

<!-- 響應式顯示/隱藏 -->
<div class="hidden md:block">桌面版顯示</div>
<div class="block md:hidden">手機版顯示</div>
```

### Quasar Grid 響應式

```vue
<q-row>
  <!-- 手機 12 列，平板 6 列，桌面 4 列 -->
  <q-col cols="12" sm="6" md="4">
    內容
  </q-col>
</q-row>
```

### 響應式表格

```vue
<!-- 使用專案的響應式標籤頁元件 -->
<responsive-tabs
  :tabs="tabs"
  v-model="currentTab"
>
  <!-- 內容 -->
</responsive-tabs>
```

---

## 深色模式

### 主題切換

專案支援多主題，可在佈局設定中切換：

```javascript
// stores/app.js
export const useApp = defineStore({
  state: () => ({
    theme: {
      mode: 'light',  // 'light' | 'dark'
    },
  }),
})
```

### 深色模式樣式

使用 Quasar 的深色模式支援：

```scss
// 自動適應深色模式
.my-component {
  background: var(--q-dark-page);

  .body--dark & {
    // 深色模式特定樣式
    background: #1d1d1d;
  }
}
```

---

## 圖標系統

### FontAwesome

專案使用 FontAwesome 圖標：

```vue
<q-icon name="fas fa-user" />
<q-icon name="fas fa-edit" color="primary" />
```

### SVG 圖標

使用 `SvgIcon` 元件：

```vue
<svg-icon name="custom-icon" size="24" />
```

SVG 檔案放置在 `src/icons/` 目錄。

---

## 動畫和過渡

### Quasar 過渡

```vue
<transition
  appear
  enter-active-class="animated fadeIn"
  leave-active-class="animated fadeOut"
>
  <div v-if="show">內容</div>
</transition>
```

### Tailwind 過渡

```vue
<div class="transition duration-300 ease-in-out hover:scale-105">
  內容
</div>
```

---

## 無障礙設計 (A11y)

### 語義化 HTML

```vue
✅ 正確
<button @click="submit">提交</button>
<nav>...</nav>
<main>...</main>

❌ 避免
<div @click="submit">提交</div>
```

### ARIA 屬性

```vue
<button
  aria-label="關閉對話框"
  @click="closeDialog"
>
  <q-icon name="close" />
</button>
```

### 鍵盤導航

確保所有互動元素可用鍵盤操作：

```vue
<div
  tabindex="0"
  @keyup.enter="handleEnter"
  @keyup.space="handleSpace"
>
  可鍵盤操作的元素
</div>
```

---

## 檢查清單

設計/開發 UI 時，請確認：

- [ ] 使用了專案定義的主題色彩
- [ ] 間距符合規範（通常使用 16px 的倍數）
- [ ] 響應式設計已測試（手機、平板、桌面）
- [ ] 使用了專案的核心元件而非自己重複造輪子
- [ ] 按鈕大小和樣式一致
- [ ] 表單樣式統一（outlined + dense）
- [ ] 文字大小和顏色符合規範
- [ ] 考慮了深色模式的顯示效果
- [ ] 無障礙設計（語義化 HTML、ARIA 屬性）
