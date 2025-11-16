# 功能模組開發指南

## 概述

本指南詳細說明如何在專案中開發一個完整的功能模組。功能模組是指包含 API、路由、視圖、模型等完整功能的業務模組。

## 目錄

- [模組結構](#模組結構)
- [開發流程](#開發流程)
- [API 層開發](#api-層開發)
- [模型層開發](#模型層開發)
- [路由層開發](#路由層開發)
- [視圖層開發](#視圖層開發)
- [國際化](#國際化)
- [權限控制](#權限控制)
- [完整範例](#完整範例)

---

## 模組結構

### 標準模組目錄結構

所有功能模組位於 `src/@core/modules/` 目錄下，每個模組遵循以下結構：

```
@core/modules/{module-name}/
├── api/                         # API 層
│   ├── index.js                # API 導出入口
│   └── restful/
│       └── {resource}.js       # RESTful API 定義
├── models/                      # 數據模型層
│   ├── index.js                # 模型導出入口
│   └── modules/
│       ├── {Resource}Model.js       # 基礎模型
│       └── {Resource}ViewModel.js   # 視圖模型
├── router/                      # 路由層
│   ├── index.js                # 路由導出入口
│   └── modules/
│       └── {module}.js         # 路由定義
└── views/                       # 視圖層
    └── {module}-list/
        ├── {Module}List.vue         # 列表頁
        ├── {Module}Create.vue       # 新增頁
        ├── {Module}Edit.vue         # 編輯頁
        └── components/              # 頁面元件
            ├── {Module}ListSearchBlock.vue
            └── {module}-detail/
                └── {Module}Detail.vue
```

### 命名規範

- **模組目錄**：kebab-case（例如：`user`, `company-job`）
- **檔案命名**：
  - API 檔案：kebab-case（`user.js`）
  - 模型檔案：PascalCase（`UserModel.js`）
  - Vue 元件：PascalCase（`UserList.vue`）
  - 路由檔案：kebab-case（`user.js`）

---

## 開發流程

### 步驟總覽

```
1. 規劃模組功能和數據結構
   ↓
2. 創建模組目錄結構
   ↓
3. 開發 API 層（useResource）
   ↓
4. 開發模型層（可選）
   ↓
5. 開發路由層
   ↓
6. 開發視圖層
   ↓
7. 添加國際化翻譯
   ↓
8. 配置權限
   ↓
9. 測試功能
   ↓
10. 撰寫文檔
```

### 開始開發

假設我們要開發一個「產品管理」模組（Product）。

---

## API 層開發

### 步驟 1：創建 API 檔案

創建 `src/@core/modules/product/api/restful/product.js`：

```javascript
import useResource from '@/hooks/useResource'
import { ProductViewModel } from '@core/modules/product/models'
import request from '@core/utils/request'

export const ProductResource = ({
  uri = 'product',  // API 端點
}) => {
  // 自訂 API 方法（如有需要）
  const publish = ({ id }) => {
    return request({
      url: `/${uri}/${id}/publish`,
      method: 'post',
    }).then(res => res.data)
  }

  const unpublish = ({ id }) => {
    return request({
      url: `/${uri}/${id}/unpublish`,
      method: 'post',
    }).then(res => res.data)
  }

  // 使用 useResource 獲取標準 RESTful 方法
  const { list, get, post, patch, put, destroy, selectAll } = useResource({
    uri,
    listModel: ProductViewModel,  // 列表數據轉換
    getModel: ProductViewModel,    // 單筆數據轉換
  })

  return {
    // 標準 RESTful 方法
    list,        // GET /product?query
    get,         // GET /product/:id
    post,        // POST /product
    patch,       // PATCH /product/:id
    put,         // PUT /product/:id
    destroy,     // DELETE /product/:id
    selectAll,   // GET /product/select-all

    // 自訂方法
    publish,
    unpublish,
  }
}
```

### 步驟 2：創建 API 導出入口

創建 `src/@core/modules/product/api/index.js`：

```javascript
export { ProductResource } from './restful/product'
```

### useResource 說明

`useResource` 是專案的核心 Hook，提供標準 RESTful API 方法：

```javascript
const { list, get, post, patch, put, destroy, selectAll } = useResource({
  uri: 'product',                    // API 端點（必填）
  config: {},                        // 全域 axios 配置（可選）
  listModel: (item) => item,         // 列表數據轉換函數（可選）
  getModel: (item) => item,          // 單筆數據轉換函數（可選）
  postModel: (item) => item,         // 新增數據轉換函數（可選）
  patchModel: (item) => item,        // 更新數據轉換函數（可選）
})
```

**返回的方法**：

```javascript
// 列表查詢
const { list, total, count } = await list({ query: { page: 1, keyword: 'test' } })

// 單筆查詢
const data = await get({ id: 1 })

// 新增
const data = await post({ payload: { name: 'Product 1' } })

// 更新（PATCH）
const data = await patch({ id: 1, payload: { name: 'Updated' } })

// 更新（PUT）
const data = await put({ id: 1, payload: { ...fullData } })

// 刪除
const data = await destroy({ id: 1 })

// 下拉選項
const { list } = await selectAll({ query: {} })
```

---

## 模型層開發

模型層用於數據轉換和處理，讓前端數據格式與後端 API 解耦。

### 步驟 1：創建基礎模型

創建 `src/@core/modules/product/models/modules/ProductModel.js`：

```javascript
export const ProductModel = (item) => {
  const productObj = {
    id: item.id ?? null,
    name: item.name ?? '',
    description: item.description ?? '',
    price: item.price ?? 0,
    stock: item.stock ?? 0,
    category_id: item.category_id ?? null,
    status: item.status ?? 0,
    created_at: item.created_at ?? '',
    updated_at: item.updated_at ?? '',
  }

  return productObj
}
```

### 步驟 2：創建視圖模型

創建 `src/@core/modules/product/models/modules/ProductViewModel.js`：

```javascript
import Base from '@core/models/modules/Base'
import { ProductModel } from './ProductModel'

const Product = () => ({
  ...Base(),
  // 可擴展額外的欄位或計算屬性
  category_name: '',
  status_text: '',
})

export const ProductViewModel = (item) => {
  const viewModel = (item) => {
    const productObj = {
      ...ProductModel(item),
      ...Product(),

      // 關聯數據
      category_name: item.category?.name ?? '',

      // 計算屬性
      status_text: item.status === 1 ? '上架' : '下架',
    }

    return productObj
  }

  return viewModel(item)
}
```

### 步驟 3：創建模型導出入口

創建 `src/@core/modules/product/models/index.js`：

```javascript
export { ProductModel } from './modules/ProductModel'
export { ProductViewModel } from './modules/ProductViewModel'
```

---

## 路由層開發

### 步驟 1：創建路由定義

創建 `src/@core/modules/product/router/modules/product.js`：

```javascript
import MainLayout from '@/layouts/main-layout/MainLayout.vue'

export const productRouter = {
  path: '/product',
  name: 'product',
  component: MainLayout,
  meta: {
    title: 'product.title',              // i18n 翻譯鍵
    slug: 'link',
    permissions: ['view product'],        // 權限控制
  },
  redirect: { name: 'ProductList' },
  children: [
    {
      path: '',
      component: () => import('@core/modules/product/views/product-list/ProductList.vue'),
      name: 'ProductList',
      meta: {
        title: 'product.title',
        icon: 'fas fa-box',               // FontAwesome 圖標
        permissions: ['view product'],
      },
    },
    {
      path: 'create',
      component: () => import('@core/modules/product/views/product-list/ProductCreate.vue'),
      name: 'ProductCreate',
      meta: {
        title: 'product.detail.title',
        permissions: ['create product'],
      },
      hidden: true,  // 不顯示在選單
    },
    {
      path: 'edit/:id',
      component: () => import('@core/modules/product/views/product-list/ProductEdit.vue'),
      name: 'ProductEdit',
      meta: {
        title: 'product.detail.title',
        permissions: ['update product'],
      },
      hidden: true,
    },
  ],
}
```

### 步驟 2：創建路由導出入口

創建 `src/@core/modules/product/router/index.js`：

```javascript
export { productRouter } from './modules/product'
```

### 步驟 3：註冊路由

在 `src/router/index.js` 中導入並註冊：

```javascript
import { productRouter } from '@core/modules/product/router'

const routes = [
  // ... 其他路由
  productRouter,
]
```

---

## 視圖層開發

### 步驟 1：創建列表頁

創建 `src/@core/modules/product/views/product-list/ProductList.vue`：

```vue
<template>
  <base-page>
    <!-- 頁面標題 -->
    <page-header>
      {{ $t('product.title') }}
      <template #action>
        <add-button
          v-permission="['create product']"
          to="/product/create"
        />
      </template>
    </page-header>

    <!-- 主要內容 -->
    <q-card>
      <card-body>
        <!-- 搜尋區塊 -->
        <product-list-search-block
          v-model="search"
          class="q-mb-md"
          @change-filter="onChangeFilter"
          @reset="onReset"
        />

        <!-- 表格 -->
        <vxe-server-table
          ref="dataTable"
          :data="data"
          :total="total"
          :current="search.page"
          @sort-change="onChangeSort"
          @update:current="onChangePage"
          @update:page-size="onChangePageSize"
        >
          <!-- 表格欄位 -->
          <vxe-column
            v-for="{ field, title, min_width } in tableFields"
            :key="field"
            :field="field"
            :title="`${$t(title)}`"
            :min-width="min_width"
          />

          <!-- 操作欄 -->
          <vxe-column
            :title="`${$t('g.common.operate')}`"
            fixed="right"
            width="200"
          >
            <template #default="{ row }">
              <edit-icon-button
                v-permission="['update product']"
                :to="`/product/edit/${row.id}`"
              />
              <delete-icon-button
                v-permission="['delete product']"
                @click="onDelete(row)"
              />
            </template>
          </vxe-column>
        </vxe-server-table>
      </card-body>
    </q-card>
  </base-page>
</template>

<script>
import { defineComponent, reactive } from 'vue-demi'
import { ProductResource } from '@core/modules/product/api'
import { i18n } from '@/plugins/i18n'
import useCRUD from '@/hooks/useCRUD'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import useMessageDialog from '@/hooks/useMessageDialog'
import ProductListSearchBlock from './components/ProductListSearchBlock.vue'

const productResource = ProductResource({})

export default defineComponent({
  name: 'ProductList',

  components: {
    ProductListSearchBlock,
  },

  setup() {
    // 1. 篩選條件定義
    const filter = reactive({
      keyword: null,
      category_id: null,
      status: null,
    })

    // 2. 表格欄位定義
    const tableFields = reactive([
      { title: 'product.form.name', field: 'name', min_width: '150' },
      { title: 'product.form.category', field: 'category_name', min_width: '120' },
      { title: 'product.form.price', field: 'price', min_width: '100' },
      { title: 'product.form.stock', field: 'stock', min_width: '100' },
      { title: 'product.form.status', field: 'status_text', min_width: '100' },
      { title: 'g.common.created-at', field: 'created_at', min_width: '150' },
    ])

    // 3. API 方法
    const fetchData = (query) => productResource.list({ query })
    const delFetch = (id) => productResource.destroy({ id })
    const refreshFetch = () => callReadListFetch({ ...search })

    // 4. 刪除處理
    const onDelete = async (row) => {
      const res = await messageDelete({
        message: i18n.global.t('g.dialog.delete-message', {
          item: i18n.global.t('product.title'),
        }),
      })
      if (!res) return

      const [delRes] = await callDeleteFetch(row.id)
      if (delRes) {
        search.page = 1
        onRefresh()
      }
    }

    // 5. 使用表格 Hook
    const {
      dataTable,
      search,
      data,
      total,
      onChangePage,
      onChangePageSize,
      onChangeFilter,
      onChangeSort,
      onReset,
      onRefresh,
    } = useVxeServerDataTable({
      searchParames: filter,
      sortParames: [{ field: 'created_at', order: 'desc' }],
      sessionStorageKey: 'dashboardProductServerDataTable',
      callback: refreshFetch,
    })

    // 6. 使用訊息對話框 Hook
    const { messageDelete } = useMessageDialog()

    // 7. 使用 CRUD Hook
    const { callReadListFetch, callDeleteFetch } = useCRUD({
      deleteFetch: delFetch,
      readListFetch: fetchData,
    })

    return {
      dataTable,
      tableFields,
      data,
      total,
      search,
      onChangePage,
      onChangePageSize,
      onChangeFilter,
      onChangeSort,
      onReset,
      onDelete,
    }
  },
})
</script>
```

### 步驟 2：創建搜尋區塊

創建 `src/@core/modules/product/views/product-list/components/ProductListSearchBlock.vue`：

```vue
<template>
  <q-form class="row q-col-gutter-sm">
    <div class="col-12 col-md-3">
      <input-text
        v-model="observeValue.keyword"
        :label="$t('g.common.keyword')"
        :placeholder="$t('g.placeholder.keyword')"
        clearable
        @change="$emit('changeFilter')"
      />
    </div>

    <div class="col-12 col-md-3">
      <input-select
        v-model="observeValue.category_id"
        :label="$t('product.form.category')"
        :options="categoryOptions"
        clearable
        @change="$emit('changeFilter')"
      />
    </div>

    <div class="col-12 col-md-3">
      <input-select
        v-model="observeValue.status"
        :label="$t('product.form.status')"
        :options="statusOptions"
        clearable
        @change="$emit('changeFilter')"
      />
    </div>

    <div class="col-12 col-md-3 flex items-end">
      <reset-button
        class="full-width"
        @click="$emit('reset')"
      />
    </div>
  </q-form>
</template>

<script>
import { defineComponent, ref, onMounted } from 'vue-demi'
import { useVModel } from '@vueuse/core'
import { i18n } from '@/plugins/i18n'

export default defineComponent({
  name: 'ProductListSearchBlock',

  props: {
    modelValue: {
      type: Object,
      required: true,
    },
  },

  emits: ['update:modelValue', 'changeFilter', 'reset'],

  setup(props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)

    // 下拉選項
    const categoryOptions = ref([])
    const statusOptions = ref([
      { label: i18n.global.t('product.status.active'), value: 1 },
      { label: i18n.global.t('product.status.inactive'), value: 0 },
    ])

    // 載入分類選項
    const fetchCategoryOptions = async () => {
      // 調用 API 獲取分類選項
      // categoryOptions.value = await ...
    }

    onMounted(() => {
      fetchCategoryOptions()
    })

    return {
      observeValue,
      categoryOptions,
      statusOptions,
    }
  },
})
</script>
```

### 步驟 3：創建新增頁

創建 `src/@core/modules/product/views/product-list/ProductCreate.vue`：

```vue
<template>
  <product-detail mode="create" />
</template>

<script>
import ProductDetail from './components/product-detail/ProductDetail.vue'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'ProductCreate',

  components: {
    ProductDetail,
  },
})
</script>
```

### 步驟 4：創建編輯頁

創建 `src/@core/modules/product/views/product-list/ProductEdit.vue`：

```vue
<template>
  <product-detail mode="edit" />
</template>

<script>
import ProductDetail from './components/product-detail/ProductDetail.vue'
import { defineComponent } from 'vue-demi'

export default defineComponent({
  name: 'ProductEdit',

  components: {
    ProductDetail,
  },
})
</script>
```

### 步驟 5：創建詳細頁元件

創建 `src/@core/modules/product/views/product-list/components/product-detail/ProductDetail.vue`：

```vue
<template>
  <base-page>
    <page-header>
      {{ pageTitle }}
    </page-header>

    <q-card>
      <card-body>
        <q-form ref="form" class="q-gutter-md">
          <!-- 基本資訊 -->
          <div class="text-h6 q-mb-md">{{ $t('product.section.basic-info') }}</div>

          <input-text
            v-model="data.state.name"
            :label="$t('product.form.name')"
            :required="true"
          />

          <input-text
            v-model="data.state.description"
            :label="$t('product.form.description')"
            type="textarea"
          />

          <input-select
            v-model="data.state.category_id"
            :label="$t('product.form.category')"
            :options="categoryOptions"
            :required="true"
          />

          <input-number
            v-model="data.state.price"
            :label="$t('product.form.price')"
            :required="true"
            :min="0"
          />

          <input-number
            v-model="data.state.stock"
            :label="$t('product.form.stock')"
            :required="true"
            :min="0"
          />

          <input-toggle
            v-model="data.state.status"
            :label="$t('product.form.status')"
            :true-value="1"
            :false-value="0"
          />

          <!-- 操作按鈕 -->
          <div class="flex justify-end gap-2 q-mt-lg">
            <cancel-button @click="goBack" />
            <save-button @click="save" />
          </div>
        </q-form>
      </card-body>
    </q-card>
  </base-page>
</template>

<script>
import { defineComponent, computed, ref, onMounted } from 'vue-demi'
import { useRoute } from 'vue-router'
import { i18n } from '@/plugins/i18n'
import { ProductResource } from '@core/modules/product/api'
import useCRUD from '@/hooks/useCRUD'
import useQuickState from '@/hooks/useQuickState'
import useGoBack from '@/hooks/useGoBack'

const productResource = ProductResource({})

export default defineComponent({
  name: 'ProductDetail',

  props: {
    mode: {
      type: String,
      default: 'create',  // 'create' | 'edit'
      validator: (value) => ['create', 'edit'].includes(value),
    },
  },

  setup(props) {
    const route = useRoute()
    const form = ref()

    // 1. 頁面標題
    const pageTitle = computed(() => {
      return props.mode === 'create'
        ? i18n.global.t('product.action.create')
        : i18n.global.t('product.action.edit')
    })

    // 2. 表單數據
    const data = useQuickState({
      name: '',
      description: '',
      category_id: null,
      price: 0,
      stock: 0,
      status: 1,
    })

    // 3. 下拉選項
    const categoryOptions = ref([])

    // 4. API 方法
    const createFetch = (id, payload) => productResource.post({ payload })
    const updateFetch = (id, payload) => productResource.patch({ id, payload })
    const readFetch = (id) => productResource.get({ id })

    // 5. 儲存處理
    const save = async () => {
      const success = await form.value.validate()
      if (!success) return

      const payload = { ...data.state }

      if (props.mode === 'create') {
        const [res] = await callCreateFetch(null, payload)
        if (res) goBack()
      } else {
        const id = route.params.id
        const [res] = await callUpdateFetch(id, payload)
        if (res) goBack()
      }
    }

    // 6. 載入數據（編輯模式）
    const loadData = async () => {
      if (props.mode === 'edit') {
        const id = route.params.id
        const [res] = await callReadFetch(id)
        if (res) {
          data.assign(res.data)
        }
      }
    }

    // 7. 載入分類選項
    const fetchCategoryOptions = async () => {
      // categoryOptions.value = await ...
    }

    // 8. 初始化
    onMounted(() => {
      loadData()
      fetchCategoryOptions()
    })

    // 9. 使用 Hooks
    const { goBack } = useGoBack()
    const { callCreateFetch, callUpdateFetch, callReadFetch } = useCRUD({
      createFetch,
      updateFetch,
      readFetch,
    })

    return {
      form,
      pageTitle,
      data,
      categoryOptions,
      save,
      goBack,
    }
  },
})
</script>
```

---

## 國際化

### 步驟 1：添加翻譯檔案

在 `src/locales/zh-TW/` 目錄下創建 `product.json`：

```json
{
  "title": "產品管理",
  "action": {
    "create": "新增產品",
    "edit": "編輯產品"
  },
  "form": {
    "name": "產品名稱",
    "description": "產品描述",
    "category": "產品分類",
    "price": "價格",
    "stock": "庫存",
    "status": "狀態"
  },
  "status": {
    "active": "上架",
    "inactive": "下架"
  },
  "section": {
    "basic-info": "基本資訊"
  }
}
```

### 步驟 2：在其他語言中添加翻譯

在 `src/locales/en/product.json`、`src/locales/zh-CN/product.json` 等檔案中添加對應的英文、簡體中文翻譯。

---

## 權限控制

### 步驟 1：定義權限

在後端或權限配置中定義以下權限：

```
- view product      # 查看產品
- create product    # 新增產品
- update product    # 編輯產品
- delete product    # 刪除產品
```

### 步驟 2：在路由中配置權限

已在路由定義中配置：

```javascript
meta: {
  permissions: ['view product'],
}
```

### 步驟 3：在元件中使用權限指令

```vue
<add-button
  v-permission="['create product']"
  to="/product/create"
/>

<edit-icon-button
  v-permission="['update product']"
  :to="`/product/edit/${row.id}`"
/>

<delete-icon-button
  v-permission="['delete product']"
  @click="onDelete(row)"
/>
```

---

## 完整範例

以上步驟完成後，你將擁有一個完整的產品管理模組，包括：

✅ **API 層** - RESTful API 封裝
✅ **模型層** - 數據轉換
✅ **路由層** - 路由配置和權限
✅ **視圖層** - 列表、新增、編輯頁面
✅ **國際化** - 多語言支援
✅ **權限控制** - 精細的權限管理

---

## 進階功能

### 批次操作

在列表頁添加批次刪除、批次匯出等功能：

```vue
<template>
  <vxe-server-table
    ref="dataTable"
    :data="data"
    :checkbox-config="{ checkField: 'checked' }"
  >
    <!-- ... -->
  </vxe-server-table>

  <div class="q-mt-md">
    <base-button
      label="批次刪除"
      color="negative"
      @click="onBatchDelete"
    />
  </div>
</template>

<script>
setup() {
  const onBatchDelete = async () => {
    const selectedRows = dataTable.value.getCheckboxRecords()
    if (selectedRows.length === 0) {
      notify({ message: '請選擇要刪除的項目', type: 'warning' })
      return
    }

    const res = await messageDelete({ message: `確定要刪除 ${selectedRows.length} 筆資料嗎？` })
    if (!res) return

    // 批次刪除邏輯
  }

  return { onBatchDelete }
}
</script>
```

### 匯入/匯出

```vue
<template>
  <export-button @click="onExport" />
  <import-button @click="onImport" />
</template>

<script>
setup() {
  const onExport = async () => {
    const { download } = useDownload()
    await download({
      url: '/product/export',
      filename: 'products.xlsx',
    })
  }

  const onImport = () => {
    // 顯示匯入對話框
  }

  return { onExport, onImport }
}
</script>
```

---

## 檢查清單

開發功能模組時，請確認：

- [ ] 目錄結構符合規範
- [ ] API 層使用 `useResource`
- [ ] 路由配置正確（包含權限）
- [ ] 列表頁包含搜尋、排序、分頁
- [ ] 新增/編輯頁包含表單驗證
- [ ] 使用專案的核心元件（`InputText`、`BaseButton` 等）
- [ ] 使用專案的 Hooks（`useCRUD`、`useDialog` 等）
- [ ] 國際化翻譯完整（所有支援的語言）
- [ ] 權限控制正確
- [ ] 程式碼符合風格規範
- [ ] 功能已測試

---

## 參考資源

- [開發指南](./development-guidelines.md)
- [程式碼風格指南](./code-style-guide.md)
- [Composables/Hooks 使用指南](./composables-guide.md)
- [自訂元件使用指南](./components-guide.md)

---

## 範例模組參考

專案中已有多個完整的功能模組可供參考：

- **User 模組** - `src/@core/modules/user/`
- **Role 模組** - `src/@core/modules/role/`
- **Company 模組** - `src/@core/modules/company/`
- **Permission 模組** - `src/@core/modules/permission/`

建議先研究這些模組的實作，了解專案的開發模式。
