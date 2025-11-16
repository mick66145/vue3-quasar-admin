# 功能組織方式指南

本專案支援兩種功能組織方式，開發者可根據功能的複雜度和規模選擇適合的方式。

## 📋 目錄

- [兩種組織方式對比](#兩種組織方式對比)
- [模組化功能](#模組化功能)
- [非模組化功能](#非模組化功能)
- [如何選擇](#如何選擇)
- [範例參考](#範例參考)

---

## 兩種組織方式對比

### 1. 模組化功能（Module-based）

**目錄結構：**
```
src/@core/modules/{module-name}/
├── api/
├── models/
├── router/
└── views/
```

**特點：**
- ✅ 功能完整獨立
- ✅ 易於維護和管理
- ✅ 可重用性高
- ✅ 團隊協作友好
- ⚠️ 結構較複雜

**適用場景：**
- 完整的業務功能模組
- 需要多頁面、多路由的功能
- 需要獨立的 API 和數據模型
- 大型功能或系統核心模組

**範例：** 最新消息、用戶管理、角色管理

---

### 2. 非模組化功能（Standalone）

**目錄結構：**
```
src/
├── views/{feature-name}/
├── api/{feature-name}.js
├── models/{feature-name}.js
└── router/modules/{feature-name}.js
```

**特點：**
- ✅ 結構簡單直接
- ✅ 快速開發
- ✅ 適合小型功能
- ⚠️ 文件分散在不同目錄
- ⚠️ 可重用性較低

**適用場景：**
- 簡單的單一頁面功能
- 工具型頁面
- 不需要複雜數據模型的功能
- 快速原型開發

**範例：** Dashboard、個人資料頁、文章列表

---

## 模組化功能

### 完整結構

```
src/@core/modules/news/
├── api/
│   ├── index.js                     # API 導出
│   └── restful/
│       └── news.js                  # API 定義
├── models/
│   ├── index.js                     # 模型導出
│   └── modules/
│       ├── NewsModel.js             # 基礎模型
│       └── NewsViewModel.js         # 視圖模型
├── router/
│   ├── index.js                     # 路由導出
│   └── modules/
│       └── news.js                  # 路由定義
└── views/
    └── news-list/
        ├── NewsList.vue             # 列表頁
        ├── NewsCreate.vue           # 新增頁
        ├── NewsEdit.vue             # 編輯頁
        └── components/              # 頁面組件
            ├── NewsListSearchBlock.vue
            └── news-detail/
                └── NewsDetail.vue
```

### 開發步驟

1. 創建模組目錄結構
2. 開發 API 層
3. 開發模型層
4. 開發路由層
5. 開發視圖層
6. 添加國際化
7. 註冊路由

詳細請參考：[模組開發指南](./module-development-guide.md)

---

## 非模組化功能

### 完整結構

```
src/
├── api/
│   ├── index.js                     # 總導出
│   └── article.js                   # 文章 API
├── models/
│   ├── index.js                     # 總導出
│   └── ArticleModel.js              # 文章模型
├── router/
│   └── modules/
│       └── article.js               # 文章路由
└── views/
    └── article/
        ├── ArticleList.vue          # 文章列表
        └── components/
            └── ArticleCard.vue      # 文章卡片組件
```

### 開發步驟

#### 1. 創建 API 層

**檔案位置：** `src/api/article.js`

```javascript
import useResource from '@/hooks/useResource'
import request from '@core/utils/request'

export const ArticleResource = ({ uri = 'article' }) => {
  const { list, get, post, patch, destroy } = useResource({ uri })

  return {
    list,
    get,
    post,
    patch,
    destroy,
  }
}
```

**註冊到總導出：** `src/api/index.js`

```javascript
export { ArticleResource } from './article'
```

#### 2. 創建模型層（可選）

**檔案位置：** `src/models/ArticleModel.js`

```javascript
export const ArticleModel = (item = {}) => {
  return {
    id: item?.id ?? null,
    title: item?.title ?? '',
    content: item?.content ?? '',
    author: item?.author ?? '',
    created_at: item?.created_at ?? '',
  }
}
```

**註冊到總導出：** `src/models/index.js`

```javascript
export { ArticleModel } from './ArticleModel'
```

#### 3. 創建路由

**檔案位置：** `src/router/modules/article.js`

```javascript
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export default {
  path: '/article',
  name: 'Article',
  component: MainLayout,
  redirect: { name: 'ArticleList' },
  children: [
    {
      path: '',
      component: () => import('@/views/article/ArticleList.vue'),
      name: 'ArticleList',
      meta: {
        title: 'article.title',
        icon: 'fas fa-file-alt',
      },
    },
  ],
}
```

**註冊到主路由：** `src/router/index.js`

```javascript
import articleRouter from './modules/article'

export const asyncRoutes = [
  // ... 其他路由
  articleRouter,
]
```

#### 4. 創建視圖

**檔案位置：** `src/views/article/ArticleList.vue`

```vue
<template>
  <base-page>
    <page-header>{{ $t('article.title') }}</page-header>

    <q-card>
      <card-body>
        <div class="row q-col-gutter-md">
          <div
            v-for="article in articles"
            :key="article.id"
            class="col-12 col-md-6 col-lg-4"
          >
            <article-card :article="article" />
          </div>
        </div>
      </card-body>
    </q-card>
  </base-page>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue-demi'
import { ArticleResource } from '@/api'
import ArticleCard from './components/ArticleCard.vue'

const articleResource = ArticleResource({})

export default defineComponent({
  name: 'ArticleList',

  components: {
    ArticleCard,
  },

  setup() {
    const articles = ref([])

    const fetchArticles = async () => {
      const { list } = await articleResource.list({ query: {} })
      articles.value = list
    }

    onMounted(() => {
      fetchArticles()
    })

    return {
      articles,
    }
  },
})
</script>
```

#### 5. 添加國際化

**檔案位置：** `src/locales/zh-TW.json`

```json
{
  "article": {
    "title": "文章",
    "form": {
      "title": "標題",
      "content": "內容",
      "author": "作者"
    }
  }
}
```

---

## 如何選擇

### 使用模組化方式當：

- ✅ 功能包含多個相關頁面（列表、新增、編輯）
- ✅ 需要完整的 CRUD 操作
- ✅ 需要複雜的數據模型
- ✅ 功能可能被其他模組重用
- ✅ 需要多人協作開發
- ✅ 是系統的核心業務功能

**範例：** 用戶管理、訂單系統、商品管理、最新消息

### 使用非模組化方式當：

- ✅ 簡單的單一頁面
- ✅ 主要是資料展示
- ✅ 不需要複雜的狀態管理
- ✅ 功能相對獨立且簡單
- ✅ 快速開發原型

**範例：** Dashboard、統計頁面、簡單的文章列表、關於我們頁面

---

## 範例參考

### 模組化範例

- **最新消息模組**：`src/@core/modules/news/`
- **用戶管理模組**：`src/@core/modules/user/`
- **角色管理模組**：`src/@core/modules/role/`

### 非模組化範例

- **Dashboard**：`src/views/dashboard/`
- **個人資料**：`src/views/profile/`
- **文章列表**：`src/views/article/` （本文範例）

---

## 遷移指南

### 從非模組化轉為模組化

當非模組化功能成長到需要更複雜的結構時：

1. 在 `src/@core/modules/` 創建新模組目錄
2. 將 API 移動到 `modules/{name}/api/`
3. 將 Model 移動到 `modules/{name}/models/`
4. 將 Router 移動到 `modules/{name}/router/`
5. 將 Views 移動到 `modules/{name}/views/`
6. 更新所有引用路徑
7. 更新路由註冊

---

## 最佳實踐

### 通用原則

- 保持一致的命名規範
- 使用專案提供的 Hooks（useCRUD, useResource 等）
- 遵循專案的程式碼風格指南
- 添加完整的國際化翻譯

### 模組化功能

- 保持模組的獨立性
- 避免模組間的強耦合
- 使用清晰的模型定義
- 提供完整的文件說明

### 非模組化功能

- 保持代碼簡潔
- 避免過度設計
- 考慮未來是否需要轉為模組化
- 適時重構為模組化結構

---

## 相關文件

- [模組開發指南](./module-development-guide.md)
- [開發規範](./development-guidelines.md)
- [程式碼風格指南](./code-style-guide.md)
- [組件使用指南](./components-guide.md)
- [Hooks 使用指南](./composables-guide.md)
