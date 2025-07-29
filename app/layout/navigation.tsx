// app/layout/navigation.tsx
import { NavLink } from "react-router-dom"
import { Button } from "~/components/ui/button"
import { Badge } from "~/components/ui/badge"
import { Separator } from "~/components/ui/separator"
import { House, NotebookText, UserRound } from "lucide-react"

const navItems = [
  { to: "/home", icon: House, label: "主页", badge: null },
  { to: "/articles", icon: NotebookText, label: "我的文章", badge: null },
  { to: "/about", icon: UserRound, label: "About me", badge: null }
  // { to: "/services", icon: ShieldIcon, label: "深海服务", badge: "新" },
  // { to: "/docs", icon: BookIcon, label: "技术文档", badge: null },
  // { to: "/analytics", icon: ChartIcon, label: "数据分析", badge: "3" },
  // { to: "/settings", icon: SettingsIcon, label: "系统设置", badge: null },
]

export function Navigation() {
  return (
    <nav className="fixed left-0 top-0 h-screen w-80 z-20">
      {/* 导航背景 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-900/95 via-slate-800/90 to-slate-900/95 backdrop-blur-xl border-r border-slate-700/30"></div>

      {/* 导航内容 */}
      <div className="relative h-full flex flex-col">
        {/* Logo 区域
        <div className="p-8 border-b border-slate-700/20">
          <div className="flex items-center space-x-4">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-slate-700 to-slate-800 rounded-xl flex items-center justify-center shadow-lg shadow-slate-900/25">
                <WavesIcon />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-blue-400 rounded-full animate-pulse"></div>
            </div>
            <div>
              <h1 className="text-xl font-semibold text-slate-100 tracking-tight">深海领域</h1>
              <p className="text-sm text-slate-400 font-light">Abyssal Domain</p>
            </div>
          </div>
        </div> */}

        {/* 导航菜单 */}
        <div className="flex-1 p-6 space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `group relative flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 overflow-hidden ${
                  isActive
                    ? "bg-gradient-to-r from-slate-700/30 to-slate-800/20 border border-slate-600/30 shadow-lg"
                    : "hover:bg-slate-700/20 hover:border-slate-600/30 border border-transparent"
                }`
              }
            >
              {({ isActive }) => (
                <>
                  {/* 深海光效 - 由上而下的蓝色光 */}
                  {isActive && (
                    <>
                      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(96,165,250,0.15)_0%,transparent_60%)]"></div>
                      <div className="absolute top-0 left-0 right-0 h-8 bg-[radial-gradient(ellipse_at_top,rgba(96,165,250,0.2)_0%,transparent_70%)]"></div>
                    </>
                  )}
                  
                  <div className="flex items-center space-x-3 relative z-10">
                    <div
                      className={`p-2 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-blue-400 text-slate-900 shadow-md shadow-blue-400/30"
                          : "bg-slate-700/30 text-slate-300 group-hover:bg-slate-600 group-hover:text-slate-100"
                      }`}
                    >
                      <item.icon />
                    </div>
                    <span
                      className={`font-medium transition-colors ${
                        isActive ? "text-slate-100" : "text-slate-400 group-hover:text-slate-200"
                      }`}
                    >
                      {item.label}
                    </span>
                  </div>

                  {item.badge && (
                    <Badge variant="secondary" className="bg-blue-400/20 text-blue-300 border-blue-400/30 text-xs relative z-10">
                      {item.badge}
                    </Badge>
                  )}

                  {isActive && (
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-gradient-to-b from-blue-400 to-blue-600 rounded-r-full"></div>
                  )}
                </>
              )}
            </NavLink>
          ))}
        </div>

        <Separator className="bg-slate-700/20" />

        {/* 底部状态区域 */}
        <div className="p-6 space-y-4">
          {/* 系统状态 */}
          {/* <div className="flex items-center justify-between p-3 bg-slate-800/50 rounded-lg border border-slate-700/20">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-slate-400">系统运行中</span>
            </div>
            <Badge variant="outline" className="border-blue-400/30 text-blue-300 text-xs">
              正常
            </Badge>
          </div> */}

          {/* 升级按钮 */}
          {/* <Button
            className="w-full bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-600 hover:to-slate-700 text-slate-100 border-0 shadow-lg"
            size="sm"
          >
            <ShieldIcon />
            <span className="ml-2">升级专业版</span>
          </Button> */}
        </div>
      </div>
    </nav>
  )
}