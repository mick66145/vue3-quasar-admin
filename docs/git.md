# Git 規範

## 分支規範

### 分支類型

本專案採用簡化的 Git 分支管理策略，包含以下分支類型：

- **`master`** - **正式環境分支**，代表生產就緒的穩定程式碼。\
- **`beta`** -
  **測試環境分支**，用於整合功能並進行驗證，模擬正式環境進行測試，確保功能穩定性與相容性。\
- **`dev`** -
  **開發整合分支**，所有功能分支會先合併到此分支進行整合測試。\
- **`feat/`** - **功能開發分支**，以 `feat/`
  為前綴，用於新增或擴充應用程式功能。\
- **`docs/`** - **文件維護分支**，以 `docs/`
  為前綴，用於新增、修改或優化專案文件（例如 README、設計規範）。\
- **`fix/`** - **問題修正分支**，以 `fix/`
  為前綴，用於修復程式錯誤或異常行為。\
- **`refactor/`** - **重構分支**，以 `refactor/`
  為前綴，用於優化程式碼結構，而不改變既有功能行為。

（可選補充：**`chore/`** -
用於雜項維護，例如建置流程、依賴套件更新；**`test/`** -
專門針對測試程式碼的新增與修改。）

---

### 分支流程

1.  **功能開發**
    - 從 `dev` 分支切出 `feat/`、`fix/`、`docs/` 或 `refactor/`
      分支進行開發。\
2.  **整合測試**
    - 開發完成後向 `dev` 發送 Pull Request (PR)，經過 **Code Review**
      通過後合併。\
3.  **測試環境驗證**
    - `dev` 分支的穩定版本合併到 `beta`
      分支，部署至測試環境進行驗證。\
4.  **正式上線**
    - 測試完成後，將 `beta` 分支合併到 `master`，進行正式環境發佈。

---

### 命名規範

功能分支必須以對應前綴開頭，後接具體功能描述，命名一律使用 **小寫英文 +
中線 (-)**：

```bash
# 正確範例
feat/dataset-upload
fix/login-bug
docs/api-guidelines
refactor/user-service
```

---

### 工作流程

```bash
# 1. 切換到 dev 分支並更新
git checkout dev
git pull origin dev

# 2. 從 dev 切出功能分支
git checkout -b feat/your-feature-name

# 3. 開發完成後推送分支
git push -u origin feat/your-feature-name

# 4. 在 GitHub/GitLab 開啟 Pull Request 到 dev
# 5. Code Review 通過後合併到 dev
# 6. 測試通過後合併 dev → beta → master
```

---

## Git Commit 規範

### 規範

Commit 訊息遵循 [Conventional
Commits](https://www.conventionalcommits.org/en/v1.0.0/)
規範，格式如下：

```text
<type>(<scope>): <description>

[可選內容]

[BREAKING CHANGE: 描述重大變更]
```

#### 常見 type 類型

- **feat**: 新功能\
- **fix**: 錯誤修復\
- **docs**: 文件修改\
- **style**: 程式碼風格修改（不影響程式邏輯，例如縮排、空白）\
- **refactor**: 程式碼重構（非新增功能或修復 bug）\
- **perf**: 效能優化\
- **test**: 測試程式碼相關修改\
- **chore**: 建置流程或開發工具的維護（不影響程式碼執行）

#### 範例

```text
feat(auth): 新增 JWT 驗證機制
fix(api): 修正 user service 404 錯誤
docs(readme): 更新專案啟動方式
refactor(order): 優化訂單查詢邏輯
```

---

### Commit 工具建議

---
