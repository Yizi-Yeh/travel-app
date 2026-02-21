export type ModuleName =
  | "period"
  | "itinerary"
  | "todo"
  | "flight"
  | "transport"
  | "accommodation"
  | "internet"
  | "entry-qrcode"
  | "insurance"
  | "expense"
  | "checklist"
  | "shopping"
  | "coupons";

export type FieldType = "string" | "text" | "date" | "datetime" | "number" | "boolean" | "select";

export type ModuleField = {
  name: string;
  label: string;
  type: FieldType;
  options?: string[];
  required?: boolean;
};

export type ModuleConfig = {
  name: ModuleName;
  title: string;
  fields: ModuleField[];
  hasAttachments?: boolean;
};

const modules: ModuleConfig[] = [
  {
    name: "period",
    title: "旅遊期間",
    fields: [
      { name: "startDate", label: "開始日", type: "date", required: true },
      { name: "endDate", label: "結束日", type: "date", required: true },
      { name: "members", label: "成員", type: "text" },
      { name: "notes", label: "備註", type: "text" },
    ],
  },
  {
    name: "itinerary",
    title: "每日行程",
    fields: [
      { name: "date", label: "日期", type: "date", required: true },
      { name: "time", label: "時間", type: "string" },
      { name: "place", label: "地點", type: "string" },
      { name: "description", label: "行程說明", type: "text" },
      { name: "transport", label: "交通", type: "string" },
      { name: "bookingInfo", label: "預約資訊", type: "text" },
      { name: "notes", label: "備註", type: "text" },
    ],
  },
  {
    name: "todo",
    title: "待辦事項",
    fields: [
      { name: "title", label: "事項名稱", type: "string", required: true },
      { name: "status", label: "狀態", type: "select", options: ["PENDING", "DONE"], required: true },
      { name: "dueDate", label: "截止日", type: "date" },
      { name: "relatedType", label: "關聯模組", type: "string" },
      { name: "relatedId", label: "關聯 ID", type: "string" },
      { name: "category", label: "分類", type: "select", options: ["PRE_TRIP", "IN_TRIP", "POST_TRIP"] },
    ],
  },
  {
    name: "flight",
    title: "航班資訊",
    hasAttachments: true,
    fields: [
      { name: "direction", label: "方向", type: "select", options: ["OUTBOUND", "RETURN"], required: true },
      { name: "airline", label: "航空公司", type: "string" },
      { name: "flightNo", label: "航班編號", type: "string" },
      { name: "depAirport", label: "出發機場", type: "string" },
      { name: "arrAirport", label: "抵達機場", type: "string" },
      { name: "depTime", label: "起飛時間", type: "datetime" },
      { name: "arrTime", label: "抵達時間", type: "datetime" },
      { name: "notes", label: "備註", type: "text" },
    ],
  },
  {
    name: "transport",
    title: "交通資訊",
    hasAttachments: true,
    fields: [
      { name: "type", label: "交通類型", type: "select", options: ["SKYLINER", "JR", "SUBWAY", "OTHER"], required: true },
      { name: "segment", label: "搭乘區間", type: "text" },
      { name: "schedule", label: "班次/時刻", type: "text" },
      { name: "transferNotes", label: "轉乘注意事項", type: "text" },
    ],
  },
  {
    name: "accommodation",
    title: "住宿資訊",
    hasAttachments: true,
    fields: [
      { name: "name", label: "住宿名稱", type: "string", required: true },
      { name: "address", label: "地址", type: "text" },
      { name: "checkIn", label: "Check-in", type: "datetime" },
      { name: "checkOut", label: "Check-out", type: "datetime" },
      { name: "room", label: "房型", type: "string" },
      { name: "wifiSsid", label: "Wi-Fi SSID", type: "string" },
      { name: "wifiPass", label: "Wi-Fi 密碼", type: "string" },
      { name: "phone", label: "聯絡方式", type: "string" },
      { name: "notes", label: "備註", type: "text" },
    ],
  },
  {
    name: "internet",
    title: "網路管理",
    hasAttachments: true,
    fields: [
      { name: "type", label: "類型", type: "select", options: ["ESIM", "WIFI", "OTHER"], required: true },
      { name: "startDate", label: "啟用日期", type: "date" },
      { name: "usage", label: "使用說明", type: "text" },
      { name: "contacts", label: "客服/聯絡方式", type: "text" },
      { name: "notes", label: "備註", type: "text" },
    ],
  },
  {
    name: "entry-qrcode",
    title: "入境 QR Code",
    hasAttachments: true,
    fields: [
      { name: "label", label: "標籤", type: "string" },
    ],
  },
  {
    name: "insurance",
    title: "旅平險管理",
    hasAttachments: true,
    fields: [
      { name: "company", label: "保險公司", type: "string" },
      { name: "planName", label: "方案名稱", type: "string" },
      { name: "policyNo", label: "保單號碼", type: "string" },
      { name: "startDate", label: "起日", type: "date" },
      { name: "endDate", label: "迄日", type: "date" },
      { name: "insured", label: "被保險人", type: "text" },
      { name: "coverage", label: "保障內容摘要", type: "text" },
      { name: "contacts", label: "緊急聯絡資訊", type: "text" },
      { name: "notes", label: "理賠備註", type: "text" },
    ],
  },
  {
    name: "expense",
    title: "費用管理",
    fields: [
      { name: "type", label: "類型", type: "select", options: ["TRANSPORT", "ACCOMMODATION", "FOOD", "SHOPPING", "OTHER"], required: true },
      { name: "amount", label: "金額", type: "number", required: true },
      { name: "currency", label: "幣別", type: "string", required: true },
      { name: "date", label: "日期", type: "date", required: true },
      { name: "itineraryDayId", label: "關聯行程", type: "string" },
      { name: "notes", label: "備註", type: "text" },
    ],
  },
  {
    name: "checklist",
    title: "出國物品清單",
    fields: [
      { name: "category", label: "分類", type: "string", required: true },
      { name: "title", label: "項目", type: "string", required: true },
      { name: "checked", label: "已完成", type: "boolean" },
    ],
  },
  {
    name: "shopping",
    title: "要買的東西",
    fields: [
      { name: "name", label: "商品名稱", type: "string", required: true },
      { name: "category", label: "分類", type: "string" },
      { name: "price", label: "預估價格", type: "number" },
      { name: "place", label: "購買地點", type: "string" },
      { name: "purchased", label: "是否已購買", type: "boolean" },
      { name: "notes", label: "備註", type: "text" },
    ],
  },
  {
    name: "coupons",
    title: "日本優惠券",
    hasAttachments: true,
    fields: [
      { name: "title", label: "優惠名稱", type: "string", required: true },
      { name: "store", label: "適用店家", type: "string" },
      { name: "conditions", label: "使用條件", type: "text" },
      { name: "expiry", label: "有效期限", type: "date" },
      { name: "notes", label: "備註", type: "text" },
    ],
  },
];

export function getModuleConfig(name: ModuleName) {
  const module = modules.find((m) => m.name === name);
  if (!module) {
    throw new Error("Unknown module");
  }
  return module;
}

export function listModules() {
  return modules;
}
