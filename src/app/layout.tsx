import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Japan Trip PWA",
  description: "Japan trip planner",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-Hant">
      <body>{children}</body>
    </html>
  );
}
