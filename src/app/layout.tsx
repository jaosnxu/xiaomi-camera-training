import type { Metadata } from "next"
import "./globals.css"

export const metadata: Metadata = {
  title: "Xiaomi Camera Training",
  description: "门店卫生监控与 AI 训练平台",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh">
      <body>{children}</body>
    </html>
  )
}
