"use client"
import { useState, useEffect } from "react"
import { createClient } from "@supabase/supabase-js"

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

interface Camera {
  id: string; name: string; ip: string; store: string; status: string;
}

export default function Home() {
  const [cameras, setCameras] = useState<Camera[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadCameras()
  }, [])

  async function loadCameras() {
    const { data } = await supabase.from("cameras").select("*")
    if (data) setCameras(data)
    setLoading(false)
  }

  return (
    <main className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-8">🎥 小米摄像头训练平台</h1>
      
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="text-3xl font-bold text-green-600">{cameras.length}</div>
          <div className="text-gray-500 mt-1">在线摄像头</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="text-3xl font-bold text-blue-600">0</div>
          <div className="text-gray-500 mt-1">今日告警</div>
        </div>
        <div className="bg-white rounded-lg p-6 shadow">
          <div className="text-3xl font-bold text-purple-600">15</div>
          <div className="text-gray-500 mt-1">设备总数</div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-bold mb-4">📷 摄像头列表</h2>
        {loading ? (
          <p className="text-gray-400">加载中...</p>
        ) : cameras.length === 0 ? (
          <div className="text-center py-8 text-gray-400">
            <p className="text-lg mb-2">暂无摄像头数据</p>
            <p className="text-sm">连接 Supabase 后将自动显示</p>
            <div className="mt-4 p-4 bg-gray-50 rounded-lg text-left text-xs font-mono">
              <p>Supabase URL: {process.env.NEXT_PUBLIC_SUPABASE_URL || '未配置'}</p>
            </div>
          </div>
        ) : (
          <table className="w-full">
            <thead>
              <tr className="border-b text-left text-sm text-gray-500">
                <th className="pb-3">名称</th>
                <th className="pb-3">门店</th>
                <th className="pb-3">IP</th>
                <th className="pb-3">状态</th>
              </tr>
            </thead>
            <tbody>
              {cameras.map(c => (
                <tr key={c.id} className="border-b">
                  <td className="py-3">{c.name}</td>
                  <td className="py-3">{c.store}</td>
                  <td className="py-3 font-mono text-sm">{c.ip}</td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded text-xs ${c.status === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                      {c.status === 'online' ? '在线' : '离线'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </main>
  )
}
