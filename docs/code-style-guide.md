# 程式碼風格指南

## 概述

本指南定義了專案的程式碼風格規範，確保程式碼的一致性、可讀性和可維護性。所有開發人員都應遵循這些規範。

## 目錄

- [JavaScript/Vue 風格](#javascriptvue-風格)
- [命名規範](#命名規範)
- [檔案組織](#檔案組織)
- [Vue 元件規範](#vue-元件規範)
- [Composition API 規範](#composition-api-規範)
- [CSS/SCSS 風格](#cssscss-風格)
- [註釋規範](#註釋規範)
- [Import/Export 規範](#importexport-規範)

---

## JavaScript/Vue 風格

### 基本規則

專案使用 **ESLint** 和 **Prettier** 自動格式化程式碼，配置如下：

```javascript
// .eslintrc.cjs
module.exports = {
  extends: ['@sientech/frontend/lib/vue3-essential'],
  rules: {
    'vue/multi-word-component-names': 'off',
  },
}
```

```javascript
// prettier.config.js
module.exports = {
  printWidth: 100,           // 單行最大長度
  tabWidth: 2,               // 縮排空格數
  useTabs: false,            // 使用空格縮排
  semi: true,                // 使用分號
  singleQuote: true,         // 使用單引號
  trailingComma: 'all',      // 末尾逗號
  bracketSpacing: true,      // 物件括號間空格
  arrowParens: 'always',     // 箭頭函式參數括號
  endOfLine: 'lf',           // 換行符
}
```

### 程式碼格式化

**在提交前自動格式化**：

專案配置了 Husky + lint-staged，會在 commit 前自動執行 ESLint 和 Prettier。

**手動格式化**：

```bash
# 格式化所有檔案
npm run lint

# 僅檢查不修復
npm run lint:check
```

---

## 命名規範

### 檔案命名

#### Vue 元件檔案

使用 **PascalCase**（大駝峰）：

```
✅ 正確
UserList.vue
InputText.vue
BaseButton.vue
AddIconButton.vue

❌ 錯誤
userList.vue
input-text.vue
basebutton.vue
```

#### JavaScript/Hook 檔案

使用 **camelCase**（小駝峰）：

```
✅ 正確
useCRUD.js
useDialog.js
useServerDataTable.js
request.js

❌ 錯誤
UseCRUD.js
use-dialog.js
Request.js
```

#### 路由模組檔案

使用 **kebab-case**（短橫線）：

```
✅ 正確
user-manage.js
role-permission.js
system-log.js

❌ 錯誤
UserManage.js
rolePermission.js
system_log.js
```

### 變數命名

#### 常規變數

使用 **camelCase**：

```javascript
✅ 正確
const userData = ref([])
const isLoading = ref(false)
const totalCount = computed(() => data.value.length)

❌ 錯誤
const UserData = ref([])
const is_loading = ref(false)
const TotalCount = computed(() => data.value.length)
```

#### 常數

使用 **UPPER_SNAKE_CASE**：

```javascript
✅ 正確
const API_BASE_URL = 'https://api.example.com'
const MAX_RETRY_COUNT = 3
const DEFAULT_PAGE_SIZE = 10

❌ 錯誤
const apiBaseUrl = 'https://api.example.com'
const maxRetryCount = 3
```

#### 私有變數/方法

使用 `_` 前綴（可選）：

```javascript
✅ 建議
const _internalState = ref(null)
const _handlePrivateEvent = () => { ... }
```

#### 布林值變數

使用 `is`、`has`、`should`、`can` 等前綴：

```javascript
✅ 正確
const isLoading = ref(false)
const hasPermission = computed(() => ...)
const shouldShowDialog = ref(false)
const canEdit = ref(true)

❌ 錯誤
const loading = ref(false)      // 不明確
const permission = computed(() => ...)
const showDialog = ref(false)
```

### 函式命名

#### 一般函式

使用 **動詞開頭 + camelCase**：

```javascript
✅ 正確
const fetchUserData = async () => { ... }
const handleSubmit = () => { ... }
const validateForm = () => { ... }
const calculateTotal = (items) => { ... }

❌ 錯誤
const userData = async () => { ... }     // 應該是 fetchUserData
const submit = () => { ... }             // 應該是 handleSubmit
const total = (items) => { ... }         // 應該是 calculateTotal
```

#### 事件處理函式

使用 `on` 或 `handle` 前綴：

```javascript
✅ 正確
const onSubmit = () => { ... }
const onClick = () => { ... }
const handleInputChange = (e) => { ... }
const onChangeFilter = () => { ... }

❌ 錯誤
const submit = () => { ... }
const click = () => { ... }
const inputChange = (e) => { ... }
```

#### Composables/Hooks

使用 `use` 前綴：

```javascript
✅ 正確
export default function useCRUD() { ... }
export default function useDialog() { ... }
export default function useServerDataTable() { ... }

❌ 錯誤
export default function CRUD() { ... }
export default function dialog() { ... }
```

### 元件命名

#### 基礎元件

使用 `Base` 前綴：

```vue
✅ 正確
<BaseButton />
<BaseDialog />
<BaseForm />
<BasePage />
```

#### 功能元件

使用描述性名稱：

```vue
✅ 正確
<UserList />
<ProductCard />
<OrderDetail />
<ImageUploader />
```

#### 表單輸入元件

使用 `Input` 前綴：

```vue
✅ 正確
<InputText />
<InputSelect />
<InputDate />
<InputFileUpload />
```

#### 按鈕元件

使用功能動詞 + `Button` 後綴：

```vue
✅ 正確
<AddButton />
<EditButton />
<DeleteButton />
<SaveButton />
<CancelButton />
```

---

## 檔案組織

### 目錄結構

```
src/
├── @core/                    # 核心可重用模組
│   ├── components/          # 核心元件庫
│   ├── modules/             # 業務功能模組
│   └── utils/               # 核心工具函數
├── components/              # 專案特定元件
├── views/                   # 頁面視圖
├── router/                  # 路由配置
├── stores/                  # Pinia 狀態管理
├── hooks/                   # Composables
├── api/                     # API 接口
├── plugins/                 # 插件
├── directive/               # 自訂指令
├── utils/                   # 工具函數
├── locales/                 # 國際化
├── styles/                  # 樣式
├── config/                  # 配置
├── layouts/                 # 佈局
└── models/                  # 數據模型
```

### 功能模組組織

每個功能模組應包含以下結構：

```
@core/modules/user/
├── api/                     # API 層
│   ├── index.js            # 導出所有 API
│   └── restful/
│       └── user.js         # RESTful API
├── models/                  # 數據模型
│   ├── index.js
│   └── modules/
│       ├── UserModel.js
│       └── UserViewModel.js
├── router/                  # 路由配置
│   ├── index.js
│   └── modules/
│       └── user.js
└── views/                   # 視圖頁面
    └── user-list/
        ├── UserList.vue
        ├── UserCreate.vue
        ├── UserEdit.vue
        └── components/      # 頁面元件
```

---

## Vue 元件規範

### 元件結構順序

Vue SFC (Single File Component) 的區塊順序：

```vue
<template>
  <!-- 模板 -->
</template>

<script>
// 腳本
</script>

<style lang="scss" scoped>
/* 樣式 */
</style>
```

### Script 區塊結構

```vue
<script>
import { defineComponent, ref, computed, reactive, onMounted } from 'vue-demi'
import { useRouter } from 'vue-router'
// 1. 外部依賴導入

import useCRUD from '@/hooks/useCRUD'
import useDialog from '@/hooks/useDialog'
// 2. 內部 Composables 導入

import { UserResource } from '@core/modules/user/api'
// 3. API 導入

import UserListSearchBlock from './components/UserListSearchBlock.vue'
// 4. 元件導入

export default defineComponent({
  name: 'UserList',  // 5. 元件名稱（可選，但建議）

  components: {
    UserListSearchBlock,
  },  // 6. 註冊元件

  props: {
    // 7. Props 定義
    modelValue: { type: String, default: '' },
    label: { type: String },
    required: { type: Boolean, default: false },
  },

  emits: ['update:modelValue', 'change'],  // 8. Emits 定義

  setup(props, { emit }) {
    // 9. Setup 函式

    // 9.1 響應式數據
    const data = ref([])
    const isLoading = ref(false)
    const search = reactive({
      keyword: null,
      page: 1,
    })

    // 9.2 計算屬性
    const totalPages = computed(() => Math.ceil(total.value / search.pageSize))

    // 9.3 方法
    const fetchData = async () => { ... }
    const handleSubmit = () => { ... }

    // 9.4 生命週期
    onMounted(() => {
      fetchData()
    })

    // 9.5 Composables
    const { callReadListFetch } = useCRUD({ ... })
    const router = useRouter()

    // 9.6 返回
    return {
      data,
      isLoading,
      search,
      totalPages,
      fetchData,
      handleSubmit,
    }
  },
})
</script>
```

### Props 定義規範

**完整定義 Props**：

```javascript
✅ 正確 - 包含類型、預設值、驗證
props: {
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: [String, Number, Object, null],
    default: '',
  },
  options: {
    type: Array,
    default() {
      return []
    },
  },
  size: {
    type: String,
    default: 'md',
    validator(value) {
      return ['sm', 'md', 'lg'].includes(value)
    },
  },
}

❌ 錯誤 - 缺少類型定義
props: ['label', 'modelValue']
```

### Emits 定義規範

**明確定義 Emits**：

```javascript
✅ 正確
emits: ['update:modelValue', 'change', 'submit']

// 或帶驗證
emits: {
  'update:modelValue': (value) => typeof value === 'string',
  'change': null,
}

❌ 錯誤 - 未定義直接使用
setup(props, { emit }) {
  emit('some-event')  // 未在 emits 中聲明
}
```

---

## Composition API 規範

### 使用 vue-demi

專案使用 `vue-demi` 確保 Vue 2/3 相容性：

```javascript
✅ 正確
import { defineComponent, ref, computed, reactive } from 'vue-demi'

❌ 錯誤
import { defineComponent, ref, computed } from 'vue'
```

### Ref vs Reactive

**選擇原則**：

- **簡單值**（字串、數字、布林）：使用 `ref`
- **物件/陣列（需要整體替換）**：使用 `ref`
- **物件（僅修改屬性）**：使用 `reactive`

```javascript
✅ 正確
const count = ref(0)
const isLoading = ref(false)
const user = ref({ name: 'John', age: 30 })  // 可能整體替換
const search = reactive({                    // 僅修改屬性
  keyword: '',
  page: 1,
})

❌ 避免
const count = reactive({ value: 0 })  // 簡單值不需要 reactive
```

### 解構 Props 保持響應性

使用 `toRefs` 解構 props：

```javascript
✅ 正確
import { toRefs } from 'vue-demi'

setup(props) {
  const { label, required } = toRefs(props)

  const inputLabel = computed(() => {
    return required.value ? `${label.value} *` : label.value
  })
}

❌ 錯誤 - 失去響應性
setup(props) {
  const { label, required } = props  // 失去響應性
}
```

### v-model 實現

使用 `@vueuse/core` 的 `useVModel`：

```javascript
✅ 正確
import { useVModel } from '@vueuse/core'

export default defineComponent({
  props: {
    modelValue: { type: String },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)

    return {
      observeValue,  // 直接綁定到 template
    }
  },
})

// Template
<q-input v-model="observeValue" />
```

### 生命週期 Hook

```javascript
✅ 正確
import { onMounted, onBeforeUnmount } from 'vue-demi'

setup() {
  onMounted(() => {
    console.log('Component mounted')
  })

  onBeforeUnmount(() => {
    console.log('Component will unmount')
  })
}
```

### Watch 使用

```javascript
✅ 正確
import { watch } from 'vue-demi'

// 監聽單個 ref
watch(count, (newVal, oldVal) => {
  console.log(`Count changed from ${oldVal} to ${newVal}`)
})

// 監聽多個源
watch([count, name], ([newCount, newName], [oldCount, oldName]) => {
  console.log('Count or name changed')
})

// 監聽 reactive 物件的屬性
watch(
  () => search.keyword,
  (newVal) => {
    console.log(`Keyword changed to ${newVal}`)
  }
)
```

---

## CSS/SCSS 風格

### 使用 SCSS

專案支援 SCSS，優先使用 SCSS 而非純 CSS：

```vue
<style lang="scss" scoped>
.user-list {
  &__header {
    display: flex;
    justify-content: space-between;
  }

  &__content {
    padding: 1rem;
  }
}
</style>
```

### Scoped 樣式

**預設使用 `scoped`**：

```vue
✅ 正確
<style lang="scss" scoped>
.button {
  color: red;
}
</style>

⚠️ 全域樣式 - 僅在必要時使用
<style lang="scss">
.global-class {
  color: blue;
}
</style>
```

### 類別命名 - BEM

使用 **BEM (Block Element Modifier)** 命名：

```scss
✅ 正確
.user-list {                    // Block
  &__header {                   // Element
    &--large {                  // Modifier
      font-size: 1.5rem;
    }
  }

  &__item {
    &--active {
      background: blue;
    }
  }
}

// 編譯後
.user-list { }
.user-list__header { }
.user-list__header--large { }
.user-list__item { }
.user-list__item--active { }
```

### 使用 Tailwind CSS

專案整合了 Tailwind CSS，優先使用 Tailwind 工具類別：

```vue
✅ 建議 - 使用 Tailwind
<template>
  <div class="flex justify-between items-center p-4">
    <h1 class="text-2xl font-bold">Title</h1>
  </div>
</template>

✅ 也可以 - 混合使用
<template>
  <div class="user-list__header flex justify-between">
    <h1 class="text-2xl font-bold">Title</h1>
  </div>
</template>

<style lang="scss" scoped>
.user-list__header {
  background: var(--q-primary);
}
</style>
```

### 使用 CSS 變數

使用 Quasar CSS 變數保持主題一致性：

```scss
✅ 正確
.custom-button {
  background: var(--q-primary);
  color: var(--q-dark);
  border-radius: var(--q-border-radius);
}

❌ 避免 - 硬編碼顏色
.custom-button {
  background: #1976d2;
  color: #000000;
}
```

---

## 註釋規範

### 檔案頭註釋

**複雜模組或工具函數應加檔案頭註釋**：

```javascript
/**
 * useCRUD - CRUD 操作統一封裝
 *
 * 提供標準化的 Create、Read、Update、Delete 操作，
 * 包含錯誤處理、Loading 狀態管理、成功提示等功能。
 *
 * @example
 * const { callCreateFetch, callReadFetch } = useCRUD({
 *   createFetch: userResource.post,
 *   readFetch: userResource.get,
 * })
 */
export default function useCRUD({ ... }) {
  // ...
}
```

### 函式註釋

**公開的 API、複雜的函式應加註釋**：

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

### 區塊註釋

**複雜邏輯應加說明**：

```javascript
setup() {
  // 1. 初始化表格篩選條件
  const search = reactive({
    keyword: null,
    page: 1,
    pageSize: 10,
  })

  // 2. 構建表格欄位定義
  const tableFields = [
    { title: 'g.common.account', field: 'account', minWidth: '130' },
    // ...
  ]

  // 3. 處理分頁變更
  // 當使用者切換頁碼時，更新 SessionStorage 並重新載入數據
  const onChangePage = async (page) => {
    search.page = page
    setSessionStorage(storageKey, { search })
    await refreshFetch()
  }

  return { ... }
}
```

### TODO/FIXME 註釋

```javascript
// TODO: 實作批次刪除功能
// FIXME: 修正排序錯誤的問題
// NOTE: 這裡的邏輯比較複雜，需要注意...
// HACK: 暫時的解決方案，待優化
```

---

## Import/Export 規範

### Import 順序

```javascript
// 1. Vue 相關
import { defineComponent, ref, computed } from 'vue-demi'
import { useRouter } from 'vue-router'

// 2. 第三方庫
import { useVModel } from '@vueuse/core'
import dayjs from 'dayjs'
import { Notify } from 'quasar'

// 3. Composables/Hooks
import useCRUD from '@/hooks/useCRUD'
import useDialog from '@/hooks/useDialog'

// 4. API
import { UserResource } from '@core/modules/user/api'

// 5. Utils
import { formatDate } from '@/utils/date'

// 6. Stores
import { useUser } from '@/stores/user'

// 7. 元件
import UserListSearchBlock from './components/UserListSearchBlock.vue'

// 8. 類型/常數
import { USER_STATUS } from '@/constants'
```

### 使用路徑別名

```javascript
✅ 正確
import { UserResource } from '@core/modules/user/api'
import useNotify from '@/hooks/useNotify'
import { formatDate } from '@/utils/date'

❌ 錯誤 - 使用相對路徑
import { UserResource } from '../../../@core/modules/user/api'
import useNotify from '../../hooks/useNotify'
```

### 模組導出

**統一入口導出**：

```javascript
// @core/modules/user/api/index.js
export { UserResource } from './restful/user'
export { UserPermissionResource } from './restful/user-permission'

// 使用
import { UserResource, UserPermissionResource } from '@core/modules/user/api'
```

**命名導出 vs 默認導出**：

```javascript
✅ 元件 - 使用默認導出
export default defineComponent({ ... })

✅ Composables - 使用默認導出
export default function useCRUD() { ... }

✅ API/工具函數 - 使用命名導出
export const formatDate = () => { ... }
export const parseDate = () => { ... }

export const UserResource = () => { ... }
```

---

## 其他規範

### 避免 Magic Number

```javascript
❌ 錯誤
if (user.status === 1) { ... }

✅ 正確
const USER_STATUS = {
  ACTIVE: 1,
  INACTIVE: 0,
}

if (user.status === USER_STATUS.ACTIVE) { ... }
```

### 使用可選鏈和空值合併

```javascript
✅ 正確
const userName = user?.profile?.name ?? 'Unknown'
const count = data?.length ?? 0

❌ 避免
const userName = user && user.profile && user.profile.name || 'Unknown'
```

### 解構賦值

```javascript
✅ 正確
const { name, email } = user
const [first, second, ...rest] = items

❌ 避免
const name = user.name
const email = user.email
```

### 使用 async/await

```javascript
✅ 正確
const fetchData = async () => {
  try {
    const res = await userResource.list({ query: search })
    data.value = res.list
  } catch (error) {
    console.error(error)
  }
}

❌ 避免 - Promise 鏈
const fetchData = () => {
  userResource.list({ query: search })
    .then(res => {
      data.value = res.list
    })
    .catch(error => {
      console.error(error)
    })
}
```

---

## 工具支援

### VS Code 擴充套件推薦

專案根目錄的 `.vscode/extensions.json` 推薦以下擴充套件：

- **Volar** - Vue 3 語言支援
- **ESLint** - 程式碼檢查
- **Prettier** - 程式碼格式化
- **Tailwind CSS IntelliSense** - Tailwind 自動完成
- **SCSS Formatter** - SCSS 格式化

### 編輯器設定

`.vscode/settings.json` 已配置自動格式化：

```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  }
}
```

---

## 檢查清單

提交程式碼前，請確認：

- [ ] 程式碼已通過 ESLint 檢查（無錯誤）
- [ ] 程式碼已通過 Prettier 格式化
- [ ] 變數和函式命名符合規範
- [ ] 元件結構符合規範
- [ ] 複雜邏輯已添加註釋
- [ ] Import 順序正確
- [ ] 無 console.log 殘留（除非必要）
- [ ] 無未使用的變數和 import
