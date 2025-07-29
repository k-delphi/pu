
import { Outlet } from "react-router-dom"
import { Navigation } from "./navigation"

export default function Layout() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* 深海背景动画层 */}
      <div className="fixed inset-0 pointer-events-none">
        {/* 渐变背景叠加 */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(96,165,250,0.05)_0%,rgba(0,0,0,0)_70%)]"></div>
        
        {/* 半色调波浪效果 */}
        <div className="absolute inset-0 opacity-10">
          <div className="halftone-wave halftone-wave-1"></div>
          <div className="halftone-wave halftone-wave-2"></div>
          <div className="halftone-wave halftone-wave-3"></div>
        </div>
        
        {/* 浮动粒子效果 - 深海蓝色调 */}
        <div className="absolute inset-0">
          {[...Array(40)].map((_, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-blue-400/10 to-cyan-300/5"
              style={{
                width: `${Math.random() * 8 + 2}px`,
                height: `${Math.random() * 8 + 2}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animation: `float ${20 + Math.random() * 20}s infinite ease-in-out`,
                animationDelay: `${Math.random() * 5}s`,
                opacity: Math.random() * 0.4 + 0.1,
              }}
            />
          ))}
        </div>

        {/* 深海光束效果 - 蓝色调 */}
        <div className="absolute top-0 left-1/3 w-px h-full bg-gradient-to-b from-transparent via-blue-400/10 to-transparent animate-pulse"></div>
        <div
          className="absolute top-0 right-1/4 w-px h-full bg-gradient-to-b from-transparent via-cyan-300/10 to-transparent animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
      </div>

      {/* 主布局容器 */}
      <div className="relative z-10 flex min-h-screen">
        {/* 左侧导航 */}
        <Navigation />

        {/* 主内容区域 */}
        <div className="flex-1 flex flex-col ml-80">
          {/* 内容区域 */}
          <main className="flex-1 relative pt-6">
            {/* 内容背景 - 深海蓝色调 */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-900/20 via-transparent to-slate-800/10 backdrop-blur-sm"></div>

            {/* 实际内容 */}
            <div className="relative z-10 h-full px-8 pb-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}