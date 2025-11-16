# Composables/Hooks 使用指南

## 概述

專案包含 **32 個可重用的 Composables (Hooks)**，位於 `src/hooks/` 目錄。這些 Hooks 封裝了常見的業務邏輯和狀態管理模式，極大提升了開發效率和程式碼重用性。

## 目錄

- [核心 Hooks](#核心-hooks)
- [表格相關 Hooks](#表格相關-hooks)
- [對話框相關 Hooks](#對話框相關-hooks)
- [API 相關 Hooks](#api-相關-hooks)
- [儲存相關 Hooks](#儲存相關-hooks)
- [工具 Hooks](#工具-hooks)
- [自訂 Hook 開發](#自訂-hook-開發)

---

## 核心 Hooks

### useCRUD - CRUD 操作標準化

**最常用的 Hook**，提供標準化的 CRUD（Create、Read、Update、Delete）操作，包含錯誤處理、Loading 狀態管理、成功/失敗提示。

**位置**：`src/hooks/useCRUD.js`

**基本用法**：

```javascript
import useCRUD from '@/hooks/useCRUD'
import { UserResource } from '@core/modules/user/api'

const userResource = UserResource({})

const {
  form,
  isLoading,
  isCreate,
  isUpdate,
  isDelete,
  callCreateFetch,
  callReadFetch,
  callUpdateFetch,
  callDeleteFetch,
  callReadListFetch,
} = useCRUD({
  // API 方法
  createFetch: (id, payload) => userResource.post({ payload }),
  readFetch: (id) => userResource.get({ id }),
  updateFetch: (id, payload) => userResource.patch({ id, payload }),
  deleteFetch: (id) => userResource.destroy({ id }),
  readListFetch: (query) => userResource.list({ query }),

  // 成功提示訊息（可選）
  createSuccess: '新增成功',
  updateSuccess: '更新成功',
  deleteSuccess: '刪除成功',

  // 是否顯示提示（可選）
  isShowCreateSuccess: true,
  isShowUpdateSuccess: true,
  isShowDeleteSuccess: true,
})
```

**配置選項**：

| 選項 | 類型 | 說明 |
|------|------|------|
| `createFetch` | Function | 新增 API 方法 |
| `readFetch` | Function | 讀取單筆 API 方法 |
| `updateFetch` | Function | 更新 API 方法 |
| `deleteFetch` | Function | 刪除 API 方法 |
| `readListFetch` | Function | 讀取列表 API 方法 |
| `createSuccess` | String | 新增成功提示訊息 |
| `updateSuccess` | String | 更新成功提示訊息 |
| `deleteSuccess` | String | 刪除成功提示訊息 |
| `isShowCreateSuccess` | Boolean | 是否顯示新增成功提示 |
| `isShowUpdateSuccess` | Boolean | 是否顯示更新成功提示 |
| `isShowDeleteSuccess` | Boolean | 是否顯示刪除成功提示 |

**返回值**：

| 屬性/方法 | 類型 | 說明 |
|----------|------|------|
| `form` | Ref | 表單 ref |
| `isLoading` | Ref | 全域 loading 狀態 |
| `isCreate` | Ref | 正在新增 |
| `isUpdate` | Ref | 正在更新 |
| `isDelete` | Ref | 正在刪除 |
| `callCreateFetch(id, payload)` | Function | 調用新增 API |
| `callReadFetch(id, payload)` | Function | 調用讀取 API |
| `callUpdateFetch(id, payload)` | Function | 調用更新 API |
| `callDeleteFetch(id, payload)` | Function | 調用刪除 API |
| `callReadListFetch(query)` | Function | 調用列表 API |

**使用範例 - 列表頁**：

```javascript
setup() {
  const fetchData = (query) => userResource.list({ query })
  const delFetch = (id) => userResource.destroy({ id })

  const { callReadListFetch, callDeleteFetch } = useCRUD({
    readListFetch: fetchData,
    deleteFetch: delFetch,
  })

  const onDelete = async (row) => {
    const [res, error] = await callDeleteFetch(row.id)
    if (res) {
      // 刪除成功，重新載入資料
      await callReadListFetch({ page: 1 })
    }
  }

  return { onDelete }
}
```

**使用範例 - 詳細頁**：

```javascript
setup() {
  const route = useRoute()
  const data = useQuickState({ name: '', email: '' })

  const { callCreateFetch, callUpdateFetch, callReadFetch } = useCRUD({
    createFetch: (id, payload) => userResource.post({ payload }),
    updateFetch: (id, payload) => userResource.patch({ id, payload }),
    readFetch: (id) => userResource.get({ id }),
  })

  // 載入資料（編輯模式）
  const loadData = async () => {
    const id = route.params.id
    const [res] = await callReadFetch(id)
    if (res) {
      data.assign(res.data)
    }
  }

  // 儲存
  const save = async () => {
    const payload = { ...data.state }
    const id = route.params.id

    if (id) {
      await callUpdateFetch(id, payload)
    } else {
      await callCreateFetch(null, payload)
    }
  }

  onMounted(() => {
    if (route.params.id) {
      loadData()
    }
  })

  return { data, save }
}
```

**返回值格式**：

所有 `call*Fetch` 方法返回 `[res, error]` 陣列：

```javascript
const [res, error] = await callCreateFetch(null, payload)

if (res) {
  // 成功
  console.log(res)
} else if (error) {
  // 失敗（錯誤已自動顯示提示）
  console.error(error)
}
```

---

### useResource - RESTful API 資源

提供標準 RESTful API 方法封裝。

**位置**：`src/hooks/useResource.js`

**用法**：

```javascript
import useResource from '@/hooks/useResource'

const { list, get, post, patch, put, destroy, selectAll } = useResource({
  uri: 'user',                          // API 端點（必填）
  listModel: (item) => item,            // 列表數據轉換（可選）
  getModel: (item) => item,             // 單筆數據轉換（可選）
  postModel: (item) => item,            // 新增數據轉換（可選）
  patchModel: (item) => item,           // 更新數據轉換（可選）
})

// 列表查詢
const { list: users, total, count } = await list({
  query: { page: 1, keyword: 'test' },
})

// 單筆查詢
const user = await get({ id: 1 })

// 新增
const newUser = await post({
  payload: { name: 'John', email: 'john@example.com' },
})

// 更新（PATCH）
const updatedUser = await patch({
  id: 1,
  payload: { name: 'John Updated' },
})

// 刪除
await destroy({ id: 1 })

// 下拉選項
const { list: options } = await selectAll({ query: {} })
```

---

### useQuickState - 快速狀態管理

簡化 reactive 狀態管理，提供重置、克隆等實用方法。

**位置**：`src/hooks/useQuickState.js`

**用法**：

```javascript
import useQuickState from '@/hooks/useQuickState'

const data = useQuickState({
  name: '',
  email: '',
  age: 0,
})

// 訪問狀態
console.log(data.state.name)

// 修改狀態
data.state.name = 'John'

// 批次更新
data.assign({ name: 'Jane', email: 'jane@example.com' })

// 重置到初始狀態
data.reset()

// 克隆當前狀態
const cloned = data.clone()

// 克隆初始狀態
const backup = data.cloneBackup()
```

**返回值**：

| 屬性/方法 | 說明 |
|----------|------|
| `state` | 響應式狀態 |
| `backupState` | 初始狀態備份 |
| `reset()` | 重置到初始狀態 |
| `assign(newData)` | 批次更新狀態 |
| `clone()` | 克隆當前狀態 |
| `cloneBackup()` | 克隆初始狀態 |

---

## 表格相關 Hooks

### useVxeServerDataTable - 服務端分頁表格

**最常用的表格 Hook**，封裝服務端分頁表格的所有邏輯。

**位置**：`src/hooks/useVxeServerDataTable.js`

**用法**：

```javascript
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

const filter = reactive({
  keyword: null,
  status: null,
})

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
  searchParames: filter,                           // 搜尋參數
  sortParames: [{ field: 'created_at', order: 'desc' }],  // 預設排序
  sessionStorageKey: 'userTable',                  // SessionStorage 鍵（自動保存狀態）
  usePageSize: true,                               // 是否使用分頁大小選擇
  callback: async () => {                          // 資料載入回調
    const res = await userResource.list({ query: search })
    data.value = res.list
    total.value = res.total
  },
})
```

**完整範例**：

```vue
<template>
  <vxe-server-table
    ref="dataTable"
    :data="data"
    :total="total"
    :current="search.page"
    :page-size="search.page_size"
    @sort-change="onChangeSort"
    @update:current="onChangePage"
    @update:page-size="onChangePageSize"
  >
    <vxe-column field="name" title="名稱" sortable />
  </vxe-server-table>
</template>

<script>
import { reactive } from 'vue-demi'
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'
import { UserResource } from '@core/modules/user/api'

const userResource = UserResource({})

export default {
  setup() {
    const filter = reactive({
      keyword: null,
    })

    const fetchData = async () => {
      const res = await userResource.list({ query: search })
      data.value = res.list
      total.value = res.total
    }

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
      sessionStorageKey: 'userServerTable',
      callback: fetchData,
    })

    return {
      dataTable,
      search,
      data,
      total,
      onChangePage,
      onChangePageSize,
      onChangeFilter,
      onChangeSort,
      onReset,
    }
  },
}
</script>
```

**自動功能**：

- ✅ 自動從 SessionStorage 恢復搜尋條件和分頁狀態
- ✅ 自動儲存狀態到 SessionStorage
- ✅ 自動處理分頁、排序、篩選變更
- ✅ 頁面刷新後保持狀態

### useVxeClientDataTable - 客戶端分頁表格

用於客戶端分頁（一次載入所有資料）。

**位置**：`src/hooks/useVxeClientDataTable.js`

**用法**：

```javascript
const {
  dataTable,
  data,
  onRefresh,
} = useVxeClientDataTable({
  callback: async () => {
    const res = await userResource.list({ query: {} })
    data.value = res.list
  },
})
```

### useClientDataTable - 基礎客戶端表格

Quasar Table 版本的客戶端分頁。

### useServerDataTable - 基礎服務端表格

Quasar Table 版本的服務端分頁。

---

## 對話框相關 Hooks

### useDialog - 對話框邏輯封裝

封裝對話框的顯示、隱藏、表單處理等邏輯。

**位置**：`src/hooks/useDialog.js`

**用法**：

```javascript
import useDialog from '@/hooks/useDialog'
import { UserResource } from '@core/modules/user/api'

const userResource = UserResource({})

const {
  form,
  dialog,
  mode,
  data,
  isShowDialog,
  showDialog,
  hideDialog,
  save,
} = useDialog({
  formData: {
    name: '',
    email: '',
  },
  createFetch: (id, payload) => userResource.post({ payload }),
  readFetch: (id) => userResource.get({ id }),
  updateFetch: (id, payload) => userResource.patch({ id, payload }),
  deleteFetch: (id) => userResource.destroy({ id }),
  showDialogCallback: () => {
    // 對話框顯示後的回調
  },
})

// 顯示新增對話框
const handleCreate = () => {
  showDialog({ mode: 'create' })
}

// 顯示編輯對話框
const handleEdit = async (row) => {
  await showDialog({
    id: row.id,
    mode: 'edit',
    callRead: true,  // 自動調用 readFetch 載入資料
  })
}

// 顯示刪除對話框
const handleDelete = (row) => {
  showDialog({
    id: row.id,
    mode: 'delete',
  })
}
```

**完整範例**：

```vue
<template>
  <base-dialog
    v-model="isShowDialog"
    :title="dialogTitle"
  >
    <q-form ref="form">
      <input-text
        v-model="data.state.name"
        label="名稱"
        :required="true"
      />
      <input-email
        v-model="data.state.email"
        label="電子郵件"
        :required="true"
      />
    </q-form>

    <template #actions>
      <cancel-button @click="hideDialog" />
      <save-button @click="save" />
    </template>
  </base-dialog>
</template>

<script>
import { computed } from 'vue-demi'
import useDialog from '@/hooks/useDialog'
import { UserResource } from '@core/modules/user/api'

const userResource = UserResource({})

export default {
  setup() {
    const {
      form,
      mode,
      data,
      isShowDialog,
      showDialog,
      hideDialog,
      save,
    } = useDialog({
      formData: {
        name: '',
        email: '',
      },
      createFetch: (id, payload) => userResource.post({ payload }),
      updateFetch: (id, payload) => userResource.patch({ id, payload }),
      readFetch: (id) => userResource.get({ id }),
    })

    const dialogTitle = computed(() => {
      return mode.value === 'create' ? '新增使用者' : '編輯使用者'
    })

    return {
      form,
      mode,
      data,
      isShowDialog,
      showDialog,
      hideDialog,
      save,
      dialogTitle,
    }
  },
}
</script>
```

### useMessageDialog - 訊息對話框

提供常用的訊息對話框（確認、警告、刪除確認等）。

**位置**：`src/hooks/useMessageDialog.js`

**用法**：

```javascript
import useMessageDialog from '@/hooks/useMessageDialog'

const {
  messageAlert,
  messageConfirm,
  messageDelete,
  messagePrompt,
} = useMessageDialog()

// 警告訊息
await messageAlert({
  title: '提示',
  message: '操作成功！',
})

// 確認訊息
const confirmed = await messageConfirm({
  title: '確認',
  message: '確定要送出嗎？',
})

if (confirmed) {
  // 使用者點擊確認
}

// 刪除確認
const confirmed = await messageDelete({
  message: '確定要刪除這筆資料嗎？',
})

// 輸入提示
const value = await messagePrompt({
  title: '輸入',
  message: '請輸入新的名稱',
})
```

---

## API 相關 Hooks

### useNotify - 通知提示

提供統一的通知提示。

**位置**：`src/hooks/useNotify.js`

**用法**：

```javascript
import useNotify from '@/hooks/useNotify'

const { notify } = useNotify()

// 成功提示
notify({
  message: '操作成功',
  type: 'positive',
})

// 錯誤提示
notify({
  message: '操作失敗',
  type: 'negative',
})

// 警告提示
notify({
  message: '請注意',
  type: 'warning',
})

// 資訊提示
notify({
  message: '提示訊息',
  type: 'info',
})
```

---

## 儲存相關 Hooks

### useLocalStorage - LocalStorage

封裝 LocalStorage 操作。

**位置**：`src/hooks/useLocalStorage.js`

**用法**：

```javascript
import useLocalStorage from '@/hooks/useLocalStorage'

const { setLocalStorage, getLocalStorage, removeLocalStorage } = useLocalStorage()

// 儲存
setLocalStorage('user', { name: 'John', age: 30 })

// 讀取
const user = getLocalStorage('user')

// 刪除
removeLocalStorage('user')
```

### useSessionStorage - SessionStorage

封裝 SessionStorage 操作。

**位置**：`src/hooks/useSessionStorage.js`

**用法**：

```javascript
import useSessionStorage from '@/hooks/useSessionStorage'

const { setSessionStorage, getSessionStorage, removeSessionStorage } = useSessionStorage()

// 儲存
setSessionStorage('tableState', { page: 1, keyword: 'test' })

// 讀取
const tableState = getSessionStorage('tableState')

// 刪除
removeSessionStorage('tableState')
```

### useStorage - 通用儲存

提供統一的儲存介面。

---

## 工具 Hooks

### useGoBack - 返回處理

封裝返回邏輯。

**位置**：`src/hooks/useGoBack.js`

**用法**：

```javascript
import useGoBack from '@/hooks/useGoBack'

const { goBack } = useGoBack()

const handleCancel = () => {
  goBack()  // 返回上一頁
}
```

### useLogout - 登出處理

封裝登出邏輯。

**位置**：`src/hooks/useLogout.js`

**用法**：

```javascript
import useLogout from '@/hooks/useLogout'

const { logout, resetStore } = useLogout()

const handleLogout = async () => {
  await logout()  // 登出並跳轉到登入頁
}
```

### useDownload - 檔案下載

封裝檔案下載邏輯。

**位置**：`src/hooks/useDownload.js`

**用法**：

```javascript
import useDownload from '@/hooks/useDownload'

const { download } = useDownload()

const handleExport = async () => {
  await download({
    url: '/api/export',
    filename: 'export.xlsx',
  })
}
```

### useBatchDownload - 批次下載

批次下載多個檔案。

**位置**：`src/hooks/useBatchDownload.js`

### useBatchUpload - 批次上傳

批次上傳多個檔案。

**位置**：`src/hooks/useBatchUpload.js`

### useNavigation - 導航處理

封裝路由導航。

**位置**：`src/hooks/useNavigation.js`

**用法**：

```javascript
import useNavigation from '@/hooks/useNavigation'

const { navigateTo, navigateBack } = useNavigation()

navigateTo('/user/list')
navigateBack()
```

### useLoading - Loading 狀態

管理 Loading 狀態。

**位置**：`src/hooks/useLoading.js`

### useForm - 表單處理

封裝表單處理邏輯。

**位置**：`src/hooks/useForm.js`

### useAllSelect - 全選功能

實現全選/取消全選功能。

**位置**：`src/hooks/useAllSelect.js`

### useScreen - 螢幕適配

響應式螢幕適配。

**位置**：`src/hooks/useScreen.js`

**用法**：

```javascript
import useScreen from '@/hooks/useScreen'

const { isMobile, isTablet, isDesktop } = useScreen()

if (isMobile.value) {
  // 手機版邏輯
}
```

### useEventsBus - 事件總線

事件總線通訊。

**位置**：`src/hooks/useEventsBus.js`

### useBroadcastChannel - 廣播頻道

跨標籤頁通訊。

**位置**：`src/hooks/useBroadcastChannel.js`

---

## 自訂 Hook 開發

### 開發規範

創建自訂 Hook 遵循以下規範：

1. **命名**：使用 `use` 前綴，camelCase 命名
2. **位置**：放在 `src/hooks/` 目錄
3. **導出**：使用默認導出
4. **返回**：返回物件，包含狀態和方法

### 範例 - 創建自訂 Hook

```javascript
// src/hooks/useCounter.js
import { ref } from 'vue-demi'

export default function useCounter(initialValue = 0) {
  const count = ref(initialValue)

  const increment = () => {
    count.value++
  }

  const decrement = () => {
    count.value--
  }

  const reset = () => {
    count.value = initialValue
  }

  return {
    count,
    increment,
    decrement,
    reset,
  }
}
```

**使用**：

```javascript
import useCounter from '@/hooks/useCounter'

setup() {
  const { count, increment, decrement, reset } = useCounter(0)

  return {
    count,
    increment,
    decrement,
    reset,
  }
}
```

### 最佳實踐

1. **單一職責**：每個 Hook 只負責一個功能
2. **命名清晰**：名稱清楚表達功能
3. **參數配置**：支援配置選項
4. **錯誤處理**：妥善處理錯誤
5. **文檔註釋**：添加 JSDoc 註釋

---

## Hooks 完整列表

| Hook 名稱 | 用途 |
|----------|------|
| `useCRUD` | CRUD 操作標準化 ⭐ |
| `useResource` | RESTful API 資源 ⭐ |
| `useDialog` | 對話框邏輯 ⭐ |
| `useVxeServerDataTable` | 服務端分頁表格 ⭐ |
| `useVxeClientDataTable` | 客戶端分頁表格 |
| `useServerDataTable` | 服務端表格（Quasar） |
| `useClientDataTable` | 客戶端表格（Quasar） |
| `useQuickState` | 快速狀態管理 ⭐ |
| `useMessageDialog` | 訊息對話框 |
| `useNotify` | 通知提示 |
| `useForm` | 表單處理 |
| `useNavigation` | 導航處理 |
| `useGoBack` | 返回處理 |
| `useLogout` | 登出處理 |
| `useDownload` | 檔案下載 |
| `useBatchDownload` | 批次下載 |
| `useBatchUpload` | 批次上傳 |
| `useLocalStorage` | LocalStorage |
| `useSessionStorage` | SessionStorage |
| `useStorage` | 通用儲存 |
| `useFileStorage` | 檔案儲存 |
| `useImgStorage` | 圖片儲存 |
| `useAllSelect` | 全選功能 |
| `useLoading` | Loading 狀態 |
| `useScreen` | 螢幕適配 |
| `useChart` | 圖表處理 |
| `useWatermark` | 浮水印 |
| `useEditTitle` | 標題編輯 |
| `useEventsBus` | 事件總線 |
| `useAssetsFile` | 靜態資源 |
| `useEnv` | 環境變數 |
| `useBroadcastChannel` | 廣播頻道 |

**⭐ 標記為最常用的 Hook**

---

## 使用技巧

### 1. 組合多個 Hooks

```javascript
setup() {
  // 組合多個 Hooks
  const { callReadListFetch, callDeleteFetch } = useCRUD({ ... })
  const { dataTable, search, data, total, ... } = useVxeServerDataTable({ ... })
  const { messageDelete } = useMessageDialog()
  const { goBack } = useGoBack()

  const onDelete = async (row) => {
    const confirmed = await messageDelete({ ... })
    if (!confirmed) return

    const [res] = await callDeleteFetch(row.id)
    if (res) {
      await callReadListFetch({ ...search })
    }
  }

  return { onDelete }
}
```

### 2. 封裝業務 Hook

將常用的業務邏輯封裝成 Hook：

```javascript
// src/hooks/useUserManagement.js
import useCRUD from './useCRUD'
import useVxeServerDataTable from './useVxeServerDataTable'
import { UserResource } from '@core/modules/user/api'

export default function useUserManagement() {
  const userResource = UserResource({})

  const { callReadListFetch, callDeleteFetch } = useCRUD({
    readListFetch: (query) => userResource.list({ query }),
    deleteFetch: (id) => userResource.destroy({ id }),
  })

  const fetchData = () => callReadListFetch({ ...search })

  const { dataTable, search, data, total, ... } = useVxeServerDataTable({
    searchParames: { keyword: null },
    callback: fetchData,
  })

  return {
    dataTable,
    search,
    data,
    total,
    fetchData,
    callDeleteFetch,
    // ... 其他方法
  }
}
```

---

## 檢查清單

使用 Hooks 時，請確認：

- [ ] 優先使用專案的核心 Hooks
- [ ] `useCRUD` 用於所有 CRUD 操作
- [ ] `useVxeServerDataTable` 用於服務端分頁表格
- [ ] `useDialog` 用於對話框邏輯
- [ ] `useQuickState` 用於表單狀態管理
- [ ] 錯誤處理已妥善處理
- [ ] 返回值正確解構

---

## 參考資源

- [開發指南](./development-guidelines.md)
- [功能模組開發指南](./module-development-guide.md)
- [VueUse 官方文檔](https://vueuse.org/)
- [Vue Composition API 文檔](https://vuejs.org/guide/extras/composition-api-faq.html)

---

## Hook 原始碼位置

所有 Hooks 位於：`src/hooks/`

建議直接查看原始碼了解 Hook 的完整功能和參數。
