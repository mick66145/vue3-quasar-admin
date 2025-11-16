# 自訂元件使用指南

## 概述

專案包含 **147 個全域註冊的核心元件**，位於 `src/@core/components/` 目錄。所有元件都已全域註冊，可直接在任何 Vue 元件中使用，無需手動導入。

## 目錄

- [元件分類](#元件分類)
- [表單元件](#表單元件)
- [按鈕元件](#按鈕元件)
- [佈局元件](#佈局元件)
- [表格元件](#表格元件)
- [對話框元件](#對話框元件)
- [卡片元件](#卡片元件)
- [其他元件](#其他元件)

---

## 元件分類

### 元件總覽

| 分類 | 數量 | 目錄 | 說明 |
|------|------|------|------|
| 表單元件 | 49 | `form/` | 各種表單輸入元件 |
| 按鈕元件 | 28 | `button/` | 各種功能按鈕 |
| 卡片元件 | 7 | `card/` | 卡片容器元件 |
| 對話框元件 | 5 | `dialog/` | 對話框元件 |
| 表格元件 | 3 | `table/` | VXE 表格元件 |
| 標籤頁元件 | 4 | `tabs/` | 標籤頁元件 |
| 上傳元件 | 3 | `upload/` | 檔案/圖片上傳 |
| 其他 | 48 | 各目錄 | 其他工具元件 |

---

## 表單元件

### InputText - 文字輸入

基礎文字輸入元件，封裝 Quasar 的 q-input。

**位置**：`src/@core/components/form/InputText.vue`

```vue
<template>
  <input-text
    v-model="form.name"
    label="姓名"
    :required="true"
    :maxlength="50"
    placeholder="請輸入姓名"
  />
</template>
```

**Props**：

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `modelValue` | String/Number | - | v-model 綁定值 |
| `label` | String | - | 標籤文字 |
| `placeholder` | String | - | 提示文字 |
| `required` | Boolean | `false` | 是否必填 |
| `maxlength` | Number | `255` | 最大長度 |
| `clearable` | Boolean | `true` | 是否顯示清除按鈕 |
| `outlined` | Boolean | `true` | 是否使用外框樣式 |
| `dense` | Boolean | `true` | 是否使用緊湊模式 |
| `rules` | Array | `[]` | 自訂驗證規則 |

**自動驗證**：

- 必填驗證（當 `required=true`）
- 長度驗證（當設定 `maxlength`）

### InputEmail - 電子郵件輸入

```vue
<input-email
  v-model="form.email"
  label="電子郵件"
  :required="true"
/>
```

**自動驗證**：
- Email 格式驗證
- 必填驗證

### InputPassword - 密碼輸入

```vue
<input-password
  v-model="form.password"
  label="密碼"
  :required="true"
  :min-length="8"
/>
```

**Props**：
- `minLength` - 最小長度（預設：8）
- 支援密碼顯示/隱藏切換

### InputNumber - 數字輸入

```vue
<input-number
  v-model="form.price"
  label="價格"
  :required="true"
  :min="0"
  :max="999999"
  :step="0.01"
/>
```

**Props**：
- `min` - 最小值
- `max` - 最大值
- `step` - 步進值

### InputSelect - 下拉選擇

```vue
<template>
  <input-select
    v-model="form.role_id"
    label="角色"
    :options="roleOptions"
    :required="true"
    clearable
  />
</template>

<script>
setup() {
  const roleOptions = ref([
    { label: '管理員', value: 1 },
    { label: '使用者', value: 2 },
  ])

  return { roleOptions }
}
</script>
```

**Props**：
- `options` - 選項陣列，格式：`[{ label, value }]`
- `optionLabel` - 選項顯示欄位（預設：`label`）
- `optionValue` - 選項值欄位（預設：`value`）
- `emitValue` - 是否只回傳值（預設：`true`）

### InputMultipleSelect - 多選下拉

```vue
<input-multiple-select
  v-model="form.tags"
  label="標籤"
  :options="tagOptions"
  multiple
/>
```

### InputDate - 日期選擇

```vue
<input-date
  v-model="form.birthday"
  label="生日"
  :required="true"
/>
```

**格式**：預設使用 `YYYY-MM-DD` 格式。

### InputDateRange - 日期範圍選擇

```vue
<input-date-range
  v-model="form.dateRange"
  label="日期範圍"
/>
```

**返回格式**：
```javascript
{
  start_date: '2024-01-01',
  end_date: '2024-01-31'
}
```

### InputToggle - 開關

```vue
<input-toggle
  v-model="form.is_active"
  label="啟用"
  :true-value="1"
  :false-value="0"
/>
```

### InputCheckbox - 複選框

```vue
<input-checkbox
  v-model="form.agree"
  label="我同意服務條款"
  :true-value="1"
  :false-value="0"
/>
```

### InputRadio - 單選按鈕

```vue
<input-radio
  v-model="form.gender"
  label="性別"
  :options="genderOptions"
/>
```

### InputImageUpload - 圖片上傳

```vue
<input-image-upload
  v-model="form.avatar"
  label="頭像"
  :max-file-size="2"
  :aspect-ratio="1"
/>
```

**Props**：
- `maxFileSize` - 最大檔案大小（MB）
- `aspectRatio` - 裁切比例
- `accept` - 接受的檔案類型

### InputFileUpload - 檔案上傳

```vue
<input-file-upload
  v-model="form.document"
  label="文件"
  :max-file-size="10"
  accept=".pdf,.doc,.docx"
/>
```

### InputEditor - 富文本編輯器

```vue
<input-editor
  v-model="form.content"
  label="內容"
  :required="true"
  :height="400"
/>
```

**基於**：TinyMCE

### InputTel - 電話輸入

```vue
<input-tel
  v-model="form.phone"
  label="電話"
  :required="true"
/>
```

### InputCitySelect - 城市選擇

```vue
<input-city-select
  v-model="form.city_id"
  label="城市"
  :country-id="form.country_id"
/>
```

### InputAreaSelect - 地區選擇

```vue
<input-area-select
  v-model="form.area_id"
  label="地區"
  :city-id="form.city_id"
/>
```

### 表單元件完整列表

| 元件名稱 | 用途 |
|---------|------|
| `InputText` | 文字輸入 |
| `InputEmail` | 電子郵件 |
| `InputPassword` | 密碼 |
| `InputNumber` | 數字 |
| `InputTel` | 電話 |
| `InputSelect` | 下拉選擇 |
| `InputMultipleSelect` | 多選下拉 |
| `InputDate` | 日期 |
| `InputDateRange` | 日期範圍 |
| `InputTime` | 時間 |
| `InputToggle` | 開關 |
| `InputCheckbox` | 複選框 |
| `InputRadio` | 單選按鈕 |
| `InputImageUpload` | 圖片上傳 |
| `InputFileUpload` | 檔案上傳 |
| `InputEditor` | 富文本編輯器 |
| `InputAddress` | 地址輸入 |
| `InputCitySelect` | 城市選擇 |
| `InputAreaSelect` | 地區選擇 |
| `InputGender` | 性別選擇 |
| `InputBirthday` | 生日選擇 |
| `InputCreditCard` | 信用卡 |
| `InputTwPassport` | 台灣護照 |
| `InputTwUniformNumber` | 台灣統編 |
| `InputEsign` | 電子簽名 |
| ... 更多 25 個表單元件 |

---

## 按鈕元件

### BaseButton - 基礎按鈕

所有按鈕的基礎元件。

```vue
<base-button
  label="送出"
  color="primary"
  icon="save"
  @click="handleSubmit"
/>
```

**Props**：

| 屬性 | 類型 | 預設值 | 說明 |
|------|------|--------|------|
| `label` | String | - | 按鈕文字 |
| `color` | String | `primary` | 顏色（primary/secondary/negative 等） |
| `icon` | String | - | FontAwesome 圖標 |
| `size` | String | `md` | 大小（sm/md/lg） |
| `disable` | Boolean | `false` | 是否禁用 |
| `useLoading` | Boolean | `true` | 是否使用全域 loading |

**自動 Loading**：

當全域狀態處於 `isCreate`、`isUpdate`、`isDelete` 或 `isSubmit` 時，按鈕會自動顯示 loading 並禁用。

### AddButton - 新增按鈕

```vue
<add-button to="/user/create" />
<!-- 或 -->
<add-button @click="showCreateDialog" />
```

### EditButton - 編輯按鈕

```vue
<edit-button :to="`/user/edit/${row.id}`" />
<!-- 或 -->
<edit-button @click="showEditDialog(row)" />
```

### DeleteButton - 刪除按鈕

```vue
<delete-button @click="handleDelete(row)" />
```

### SaveButton - 儲存按鈕

```vue
<save-button @click="handleSave" />
```

### CancelButton - 取消按鈕

```vue
<cancel-button @click="handleCancel" />
```

### ConfirmButton - 確認按鈕

```vue
<confirm-button @click="handleConfirm" />
```

### ResetButton - 重置按鈕

```vue
<reset-button @click="handleReset" />
```

### ExportButton - 匯出按鈕

```vue
<export-button @click="handleExport" />
```

### ImportButton - 匯入按鈕

```vue
<import-button @click="handleImport" />
```

### 圖標按鈕

所有按鈕都有對應的圖標版本（IconButton）：

```vue
<base-icon-button
  icon="save"
  label="儲存"
  @click="handleSave"
/>

<edit-icon-button @click="handleEdit" />
<delete-icon-button @click="handleDelete" />
<view-icon-button @click="handleView" />
```

### 按鈕元件完整列表

| 元件名稱 | 用途 |
|---------|------|
| `BaseButton` | 基礎按鈕 |
| `AddButton` | 新增 |
| `EditButton` | 編輯 |
| `DeleteButton` | 刪除 |
| `ViewButton` | 查看 |
| `SaveButton` | 儲存 |
| `CancelButton` | 取消 |
| `ConfirmButton` | 確認 |
| `ResetButton` | 重置 |
| `ExportButton` | 匯出 |
| `ImportButton` | 匯入 |
| `SubmitButton` | 送出 |
| `BackButton` | 返回 |
| ... 以上每個都有對應的 IconButton 版本 |

---

## 佈局元件

### BasePage - 頁面容器

所有頁面的根容器。

```vue
<template>
  <base-page>
    <page-header>頁面標題</page-header>
    <!-- 頁面內容 -->
  </base-page>
</template>
```

### PageHeader - 頁面標題

```vue
<page-header>
  {{ $t('user.title') }}

  <template #action>
    <add-button to="/user/create" />
    <export-button @click="handleExport" />
  </template>
</page-header>
```

**插槽**：
- `default` - 標題文字
- `action` - 右側操作按鈕

### SectionHeader - 區塊標題

```vue
<section-header>基本資訊</section-header>
```

---

## 表格元件

### VxeServerTable - 服務端分頁表格

用於服務端分頁的表格。

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
    <vxe-column
      field="name"
      title="名稱"
      min-width="150"
      sortable
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
        <edit-icon-button :to="`/user/edit/${row.id}`" />
        <delete-icon-button @click="handleDelete(row)" />
      </template>
    </vxe-column>
  </vxe-server-table>
</template>

<script>
import useVxeServerDataTable from '@/hooks/useVxeServerDataTable'

setup() {
  const { dataTable, search, data, total, onChangePage, onChangePageSize, onChangeSort } = useVxeServerDataTable({
    searchParames: { keyword: null },
    sortParames: [{ field: 'created_at', order: 'desc' }],
    sessionStorageKey: 'userTable',
    callback: fetchData,
  })

  return { dataTable, search, data, total, onChangePage, onChangePageSize, onChangeSort }
}
</script>
```

**Props**：
- `data` - 表格資料
- `total` - 總筆數
- `current` - 當前頁碼
- `pageSize` - 每頁筆數

**Events**：
- `@sort-change` - 排序變更
- `@update:current` - 頁碼變更
- `@update:page-size` - 每頁筆數變更

### VxeClientTable - 客戶端分頁表格

用於客戶端分頁（一次載入所有資料）。

```vue
<vxe-client-table
  :data="allData"
  :page-size="10"
>
  <!-- 欄位定義同上 -->
</vxe-client-table>
```

### VxeClientTreeTable - 樹狀表格

```vue
<vxe-client-tree-table
  :data="treeData"
  :tree-config="{ children: 'children' }"
>
  <!-- 欄位定義 -->
</vxe-client-tree-table>
```

---

## 對話框元件

### BaseDialog - 基礎對話框

```vue
<template>
  <base-dialog
    v-model="isShowDialog"
    title="對話框標題"
    :width="600"
  >
    <!-- 對話框內容 -->
    <q-form ref="form">
      <input-text v-model="data.name" label="名稱" />
    </q-form>

    <template #actions>
      <cancel-button @click="hideDialog" />
      <save-button @click="handleSave" />
    </template>
  </base-dialog>
</template>

<script>
setup() {
  const isShowDialog = ref(false)
  const form = ref()
  const data = reactive({ name: '' })

  const showDialog = () => {
    isShowDialog.value = true
  }

  const hideDialog = () => {
    isShowDialog.value = false
  }

  const handleSave = async () => {
    const success = await form.value.validate()
    if (!success) return

    // 儲存邏輯
    hideDialog()
  }

  return { isShowDialog, showDialog, hideDialog, handleSave, form, data }
}
</script>
```

**Props**：
- `modelValue` (v-model) - 是否顯示
- `title` - 標題
- `width` - 寬度（預設：600）
- `persistent` - 點擊外部是否不關閉

**插槽**：
- `default` - 內容
- `actions` - 底部操作按鈕

### MessageDialog - 訊息對話框

使用 `useMessageDialog` Hook：

```vue
<script>
import useMessageDialog from '@/hooks/useMessageDialog'

setup() {
  const { messageAlert, messageConfirm, messageDelete } = useMessageDialog()

  const handleDelete = async () => {
    const confirmed = await messageDelete({
      message: '確定要刪除嗎？',
    })

    if (confirmed) {
      // 執行刪除
    }
  }

  const handleSubmit = async () => {
    const confirmed = await messageConfirm({
      title: '確認送出',
      message: '確定要送出資料嗎？',
    })

    if (confirmed) {
      // 執行送出
    }
  }

  return { handleDelete, handleSubmit }
}
</script>
```

### ImagePreviewDialog - 圖片預覽對話框

```vue
<image-preview-dialog
  v-model="isShowPreview"
  :image-url="previewUrl"
/>
```

---

## 卡片元件

### CardHeader - 卡片標題

```vue
<q-card>
  <card-header>標題</card-header>
  <card-body>內容</card-body>
</q-card>
```

### CardBody - 卡片內容

```vue
<q-card>
  <card-body class="q-pa-md">
    <!-- 內容 -->
  </card-body>
</q-card>
```

### SocialCard - 社群卡片

```vue
<social-card
  :title="item.title"
  :description="item.description"
  :image="item.image"
  @click="handleClick"
/>
```

---

## 其他元件

### SvgIcon - SVG 圖標

```vue
<svg-icon
  name="custom-icon"
  size="24"
  color="primary"
/>
```

SVG 檔案放在 `src/icons/` 目錄。

### ImageGallery - 圖片畫廊

```vue
<image-gallery
  v-model="images"
  :max-files="10"
  :max-file-size="5"
/>
```

### SkeletonTable - 骨架屏（表格）

```vue
<skeleton-table
  v-if="isLoading"
  :rows="10"
/>
<vxe-server-table v-else :data="data" />
```

### BaseTabs - 標籤頁

```vue
<template>
  <base-tabs v-model="currentTab">
    <q-tab name="tab1" label="標籤 1" />
    <q-tab name="tab2" label="標籤 2" />
  </base-tabs>

  <q-tab-panels v-model="currentTab">
    <q-tab-panel name="tab1">
      內容 1
    </q-tab-panel>
    <q-tab-panel name="tab2">
      內容 2
    </q-tab-panel>
  </q-tab-panels>
</template>

<script>
setup() {
  const currentTab = ref('tab1')
  return { currentTab }
}
</script>
```

### LanguageTabs - 多語言標籤頁

用於多語言內容編輯。

```vue
<language-tabs v-model="currentLang">
  <template #zh-TW>
    <input-text v-model="form.name_zh_tw" label="名稱（繁中）" />
  </template>
  <template #en>
    <input-text v-model="form.name_en" label="名稱（英文）" />
  </template>
</language-tabs>
```

### ResponsiveTabs - 響應式標籤頁

自動適應手機/桌面顯示。

```vue
<responsive-tabs
  v-model="currentTab"
  :tabs="tabs"
/>
```

---

## 使用技巧

### 1. 表單驗證

所有表單元件都整合了 Vuelidate 驗證：

```vue
<template>
  <q-form ref="form">
    <input-text
      v-model="data.name"
      label="姓名"
      :required="true"
      :rules="[customRule]"
    />
  </q-form>
</template>

<script>
setup() {
  const form = ref()
  const data = reactive({ name: '' })

  // 自訂驗證規則
  const customRule = (val) => {
    return val.length >= 3 || '至少 3 個字元'
  }

  const handleSubmit = async () => {
    const success = await form.value.validate()
    if (success) {
      // 提交表單
    }
  }

  return { form, data, customRule, handleSubmit }
}
</script>
```

### 2. 元件插槽

許多元件提供插槽供自訂：

```vue
<input-text v-model="value" label="金額">
  <template #prepend>
    <q-icon name="attach_money" />
  </template>
  <template #append>
    元
  </template>
</input-text>
```

### 3. 元件組合

結合多個元件實現複雜功能：

```vue
<base-dialog v-model="isShowDialog" title="編輯使用者">
  <q-form ref="form">
    <base-tabs v-model="currentTab">
      <q-tab name="basic" label="基本資訊" />
      <q-tab name="permissions" label="權限設定" />
    </base-tabs>

    <q-tab-panels v-model="currentTab">
      <q-tab-panel name="basic">
        <input-text v-model="data.name" label="姓名" />
        <input-email v-model="data.email" label="電子郵件" />
      </q-tab-panel>
      <q-tab-panel name="permissions">
        <input-multiple-select
          v-model="data.permissions"
          label="權限"
          :options="permissionOptions"
        />
      </q-tab-panel>
    </q-tab-panels>
  </q-form>

  <template #actions>
    <cancel-button @click="hideDialog" />
    <save-button @click="handleSave" />
  </template>
</base-dialog>
```

---

## 擴展自訂元件

如果核心元件無法滿足需求，可以在 `src/components/` 創建專案特定元件：

```
src/components/
└── custom/
    └── CustomSelect.vue
```

元件開發遵循核心元件的模式：

```vue
<template>
  <q-select
    v-model="observeValue"
    :label="label"
    :options="options"
    outlined
    dense
  />
</template>

<script>
import { defineComponent } from 'vue-demi'
import { useVModel } from '@vueuse/core'

export default defineComponent({
  name: 'CustomSelect',

  props: {
    modelValue: { type: [String, Number] },
    label: { type: String },
    options: { type: Array, default: () => [] },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const observeValue = useVModel(props, 'modelValue', emit)
    return { observeValue }
  },
})
</script>
```

---

## 檢查清單

使用元件時，請確認：

- [ ] 優先使用專案的核心元件
- [ ] 表單元件配置適當的驗證規則
- [ ] 按鈕元件使用語義化的專用按鈕（AddButton、EditButton 等）
- [ ] 對話框使用 BaseDialog 或 useDialog Hook
- [ ] 表格使用 VxeServerTable + useVxeServerDataTable
- [ ] 元件 Props 設定正確
- [ ] 響應式設計已測試

---

## 參考資源

- [開發指南](./development-guidelines.md)
- [程式碼風格指南](./code-style-guide.md)
- [UI 樣式指南](./style-guide.md)
- [Quasar 元件文檔](https://quasar.dev/vue-components/)
- [VXE Table 文檔](https://vxetable.cn/)

---

## 元件原始碼位置

所有核心元件位於：`src/@core/components/`

建議直接查看原始碼了解元件的完整功能和 Props。
