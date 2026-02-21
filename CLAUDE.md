---
description: "React TypeScript 開發規範 - 全專案層級的程式碼、樣式與溝通規範"
globs: ["**/*.tsx", "**/*.ts", "**/*.jsx", "**/*.js"]
alwaysApply: true
---

# React TypeScript 開發規範

## 專案背景

- 本專案為 React TypeScript 專案
- 使用 TypeScript 語法，提供完整型別定義
- 所有程式碼必須相容 React 18 以上版本
- 使用現代 React Hooks 與函數式組件

## 回應風格

- 所有聊天回應皆需使用 **繁體中文**
- 除非另有說明，語氣請保持輕鬆
- 回覆簡潔有力
- 請將我視為專家對待
- 回覆必須準確且徹底
- 請直接給出答案，並提供詳細解釋。如有需要可重述我的問題來幫助釐清
- 請重視論點本身，不需倚賴權威或來源，來源無需說明
- 請考慮新技術或非主流觀點，不要僅侷限於主流做法
- 可進行高程度推測或預測，但請明確註明為推測
- 不需要任何道德說教
- 除非安全性問題重大且不明顯，否則不必討論安全議題
- 若內容政策限制你的回答，請提供最接近的可接受回應，並說明受限原因
- 有引用請在結尾提供，不要內嵌在文字中
- 不需提及知識截止日
- 不需自我揭露你是 AI
- 提供程式碼時，請尊重我設定的 Prettier 格式偏好
- 若單一回應無法完整回答問題，請拆分為多個回應

## 程式碼規範

### TypeScript 規範

- 所有內容文字請使用繁體中文撰寫
- 所有程式碼註解請使用繁體中文撰寫
- 必須提供完整的型別定義，避免使用 `any`
- 使用 `interface` 定義物件結構，`type` 定義聯合型別
- 優先使用型別推論，但在必要時明確標註型別
- 使用泛型提升程式碼重用性
- 不需詢問「是否要套用此更動」，請直接套用

### React Hooks 規範

- 優先使用函數式組件搭配 Hooks
- 遵循 React Hooks 規則，不在條件式或迴圈中呼叫 Hooks
- 使用 `useCallback` 和 `useMemo` 時，基於實際效能需求，不要過度優化
- 自訂 Hook 以 `use` 開頭命名
- 適當使用 `useEffect` 的清理函數避免記憶體洩漏

### 程式碼調整規範

- 若我提供原始碼要求調整，請勿重複整段原碼，只需提供修改前後數行即可，可使用多個 code block
- 避免任何需要特殊 compiler 配置的實驗性語法
- 遵循 React 18+ 的最佳實踐
- 所有程式碼皆需為合法的 TypeScript 語法

## 函數式風格與 API 串接規範

### 函數式編程原則

- 優先採用純函數、不可變資料與宣告式邏輯，避免命令式流程
- 除非在 React 的生命週期中有明確控制，否則應避免副作用與狀態改動
- 適當使用高階函數與函數組合提升邏輯抽象能力
- 避免使用 `for` 迴圈，優先使用 `map()`、`filter()`、`reduce()` 等陣列方法
- 業務邏輯請避免使用 `class` 語法，優先採用函數模組設計
- 請預設使用 `const`，僅在必要變動時使用 `let`

### API 串接規範

- 禁止不必要地額外包裝 Promise，請保持 `async` 調用語意簡潔清楚
- 所有 API 呼叫一律使用 `async/await + try/catch`，禁止使用 `.then()` / `.catch()`
- 禁止在組件中直接呼叫 API 服務，請封裝為具語意的函式後再使用
- 非同步函式名稱應具描述性，建議使用 `fetchUser()`、`submitForm()`、`loadData()` 等命名方式，避免使用模糊詞彙如 `handleSomething()`
- API 錯誤處理邏輯需集中於錯誤處理器，不應分散寫在各處
- 錯誤訊息需包含可追蹤的上下文資訊（如方法、URL、參數），以利除錯與記錄

### 型別定義規範

```typescript
// 介面定義 - 用於物件結構
interface UserProfile {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

// 型別別名 - 用於聯合型別或複雜型別
type Status = "loading" | "success" | "error";
type ApiResponse<T> = {
  data: T;
  status: Status;
  message?: string;
};

// 泛型使用
interface ApiHook<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}
```

## 組件架構規範

### 組件分層架構

- `components/base`：包含專案基礎樣式組件（如 Button、Card、Input 等），定義視覺識別
- `components/common`：包含以 base 組件構建的功能性組件（如 DataTable、FormField、Modal 等）
- `components/layout`：版面配置相關組件（如 Header、Sidebar、Layout 等）
- 所有組件皆須遵循此分層架構，透過組合而非繼承方式，確保視覺風格一致、結構清晰且具備良好維護性

### 組件開發原則

- 每個組件都要有明確的 Props 型別定義
- 使用 `React.FC` 或直接函數聲明，保持一致性
- 組件檔名使用 PascalCase，如 `UserProfile.tsx`
- 導出時使用 default export，內部子組件使用 named export
- 適當使用 `React.memo` 進行效能優化，但不要過度使用

### 自訂 Hook 規範

```typescript
// 良好的自訂 Hook 範例
interface UseApiOptions {
  immediate?: boolean;
  onSuccess?: (data: any) => void;
  onError?: (error: string) => void;
}

function useApi<T>(
  apiCall: () => Promise<T>,
  options: UseApiOptions = {}
): ApiHook<T> {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const executeCall = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await apiCall();
      setData(result);
      options.onSuccess?.(result);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "未知錯誤";
      setError(errorMessage);
      options.onError?.(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [apiCall, options]);

  useEffect(() => {
    if (options.immediate) {
      executeCall();
    }
  }, [executeCall, options.immediate]);

  return {
    data,
    loading,
    error,
    refetch: executeCall,
  };
}
```

## 設計規範

### 設計原則

1. **一致性優先**：建立統一的視覺語言和交互模式
2. **可讀性至上**：使用清晰的層級結構、適當的間距和字重
3. **響應式設計**：適配不同螢幕尺寸，提供良好的行動裝置體驗
4. **可訪問性**：遵循 WCAG 指南，確保良好的無障礙體驗
5. **效能考量**：動畫流暢，避免不必要的重渲染

### 組件設計指南

- 所有互動元素都必須有明確的視覺回饋（hover、active、disabled 狀態）
- 使用語義化的 HTML 標籤和適當的 ARIA 屬性
- 確保足夠的色彩對比度和觸控目標大小
- 組件應該是自包含的，不依賴外部樣式
- 提供合理的預設值和靈活的客製化選項

### 狀態管理建議

- 簡單狀態使用 `useState`
- 複雜狀態邏輯使用 `useReducer`
- 跨組件狀態可考慮 Context API
- 對於複雜應用，建議使用 Zustand 或 Redux Toolkit
- 避免 prop drilling，適時使用狀態提升或狀態管理庫

## 效能優化指南

### React 效能最佳實踐

- 不要輕易使用 `useMemo` 和 `useCallback`，只在實際遇到效能問題時使用
- 使用 React DevTools Profiler 來識別效能瓶頸
- 適當使用 `React.lazy` 和 `Suspense` 進行程式碼分割
- 避免在 render 函數中創建新的物件或函數
- 使用 key 屬性來幫助 React 正確地更新列表

### 建議的優化策略

```typescript
// ❌ 避免在 render 中創建新物件
function Component() {
  return <Child config={{ theme: "dark" }} />;
}

// ✅ 將物件提取到組件外部或使用 useMemo
const config = { theme: "dark" };
function Component() {
  return <Child config={config} />;
}

// ✅ 或使用 useMemo（僅在需要時）
function Component() {
  const config = useMemo(() => ({ theme: "dark" }), []);
  return <Child config={config} />;
}
```

## 測試規範

### 測試策略

- 優先寫集成測試，其次是單元測試
- 使用 React Testing Library 進行組件測試
- 測試用戶行為而非實作細節
- 為關鍵業務邏輯編寫單元測試
- API 呼叫使用 Mock 進行測試

### 測試範例

```typescript
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { UserProfile } from "./UserProfile";

describe("UserProfile", () => {
  it("應該顯示用戶姓名", () => {
    const user = { id: "1", name: "張三", email: "zhang@example.com" };
    render(<UserProfile user={user} />);

    expect(screen.getByText("張三")).toBeInTheDocument();
  });

  it("點擊編輯按鈕應該開啟編輯模式", async () => {
    const user = { id: "1", name: "張三", email: "zhang@example.com" };
    render(<UserProfile user={user} />);

    fireEvent.click(screen.getByRole("button", { name: "編輯" }));

    await waitFor(() => {
      expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
  });
});
```
