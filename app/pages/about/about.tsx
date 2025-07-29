
import type React from "react";

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#1e2a47] text-white overflow-hidden relative">
      {/* 左上角文字 */}
      <div className="absolute top-4 left-4">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
          Bloger
        </h2>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-screen">
        <div className="max-w-4xl w-full">
          {/* 页面标题 */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#37e6dc]">
              About Me
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-[#64ffda] to-[#37e6dc] mx-auto rounded-full"></div>
          </div>

          {/* 个人介绍卡片 */}
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 md:p-12 mb-12">
            <div className="flex flex-col md:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-[#64ffda]/30">
                  <img 
                    src="https://img2.baidu.com/it/u=398693015,1744340932&fm=253&fmt=auto&app=120&f=JPEG?w=475&h=356" 
                    alt="Kmorsun" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-2xl font-bold mb-4 text-[#64ffda]">Kmorsun</h2>
                <p className="text-lg text-gray-300 mb-6">
                  刚入门计算机专业的初学者，现在正在学习并增多自己的技术栈
                </p>
                <div className="inline-flex items-center px-4 py-2 bg-blue-900/50 rounded-full">
                  <span className="text-[#64ffda] font-medium">FROM QIT</span>
                </div>
              </div>
            </div>
          </div>

          {/* 学习内容区域 - 文字式 */}
          <div className="bg-gray-900/30 backdrop-blur-sm rounded-2xl border border-gray-700/50 p-8 md:p-12 mb-12">
            <div className="prose prose-lg prose-invert max-w-none">
              <p className="text-gray-300 mb-6 leading-relaxed">
                作为一名刚刚踏入计算机领域的新手，我对编程和技术充满了热情。目前我正在努力扩展自己的技术视野，
                通过系统学习来构建坚实的知识基础。
              </p>
              
              <h3 className="text-2xl font-bold mb-6 text-[#64ffda] flex items-center">
                <span className="mr-3">⚡</span>
                Go 语言学习
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                我目前正在深入学习 Go 语言，这门语言以其简洁、高效和强大的并发处理能力而闻名。
                通过学习 Go，我希望能够掌握现代后端开发的核心技能，包括：
              </p>
              <ul className="text-gray-300 mb-8 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#64ffda] mr-2">•</span>
                  <span>并发编程模型和 goroutine 的使用</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#64ffda] mr-2">•</span>
                  <span>RESTful API 设计与开发</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#64ffda] mr-2">•</span>
                  <span>微服务架构的设计与实现</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#64ffda] mr-2">•</span>
                  <span>性能优化和调试技巧</span>
                </li>
              </ul>
              
              <h3 className="text-2xl font-bold mb-6 text-[#64ffda] flex items-center">
                <span className="mr-3">🗄️</span>
                SQL Server 数据库学习
              </h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                数据库是任何应用程序的核心组成部分，我正在学习 Microsoft SQL Server 来掌握关系型数据库的管理与优化。
                学习重点包括：
              </p>
              <ul className="text-gray-300 mb-8 space-y-2">
                <li className="flex items-start">
                  <span className="text-[#64ffda] mr-2">•</span>
                  <span>SQL语言的高级特性和查询优化</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#64ffda] mr-2">•</span>
                  <span>数据库设计和规范化</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#64ffda] mr-2">•</span>
                  <span>性能监控和调优技术</span>
                </li>
                <li className="flex items-start">
                  <span className="text-[#64ffda] mr-2">•</span>
                  <span>数据安全和备份策略</span>
                </li>
              </ul>
              
              <div className="bg-blue-900/20 border-l-4 border-[#64ffda] p-6 rounded-r-lg">
                <p className="text-[#64ffda] italic">
                  "学习是一个持续的过程，每一天都在积累新的知识和技能。我相信通过不懈的努力和实践，
                  我能够逐步成长为一名优秀的开发者。"
                </p>
              </div>
            </div>
          </div>

          {/* 联系按钮 */}
          {/* <div className="text-center">
            <a 
              href="https://github.com/k-delphi" 
              className="inline-flex items-center px-6 py-3 bg-[#64ffda] rounded-full text-[#0a192f] font-medium hover:bg-[#37e6dc] transition-colors duration-300"
            >
              <span>联系我</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
            </a>
          </div> */}
        </div>
      </div>

      {/* 右上角按钮 */}
      <div className="absolute top-4 right-4">
        <a href="/work-with-me" className="px-4 py-2 bg-[#64ffda] rounded-full text-[#0a192f] font-medium">
          Work with me
        </a>
      </div>
    </div>
  );
}