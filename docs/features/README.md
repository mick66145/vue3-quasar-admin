# 功能模組文件

此目錄存放前端功能模組的實作說明和使用文件。

## 目錄結構

每個功能模組都有自己的子目錄，可能包含：
- `implementation.md` - 實作說明（技術細節、架構設計）
- `usage.md` - 使用指南（如何使用該功能）
- `changelog.md` - 變更記錄
- `testing.md` - 測試說明

## 現有功能

### 模組化功能
- [news/](../../../src/@core/modules/news/) - 最新消息功能（模組化範例）

### 非模組化功能
- [article/](./article/) - 文章功能（非模組化範例）

## 與程式碼的對應關係

功能模組文件與 `src/@core/modules/` 目錄結構對應：
- docs/features/news/ → src/@core/modules/news/
- docs/features/user/ → src/@core/modules/user/
