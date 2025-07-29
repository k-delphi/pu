
import type React from "react";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a192f] to-[#1e2a47] text-white overflow-hidden relative">
      {/* 左上角文字 */}
      <div className="absolute top-4 left-4 z-20">
        <h2 className="text-2xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-blue-500">
          Bloger
        </h2>
      </div>

      {/* 右上角按钮 */}
      <div className="absolute top-4 right-4 z-20">
        <a href="/work-with-me" className="px-4 py-2 bg-[#64ffda] rounded-full text-[#0a192f] font-medium hover:bg-[#37e6dc] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
          Work with me
        </a>
      </div>

      {/* 主要内容区域 */}
      <div className="relative z-10 container mx-auto px-4 py-12 flex flex-col lg:flex-row items-center justify-between min-h-screen">
        {/* 左侧文字内容 */}
        <div className="flex-1 text-center lg:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#37e6dc]">
            Kmorsun
          </h1>
          <p className="text-2xl md:text-3xl font-semibold mb-6">
            I AM A <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#64ffda] to-[#37e6dc]">DEVELOPER</span>
          </p>
          <p className="text-base md:text-lg text-gray-400 mb-8">
            who is learning computer web knowledge
          </p>

          {/* GitHub SVG图标 */}
          <div className="mt-4">
            {/* <a href="https://github.com/k-delphi" target="_blank" rel="noopener noreferrer">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="32" 
                height="32" 
                viewBox="0 0 24 24"
                className="text-[#64ffda] hover:text-[#37e6dc] transition-colors duration-300"
              >
                <path 
                  fill="currentColor" 
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a> */}
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mt-8">
            <a href="https://github.com/k-delphi" className="px-6 py-3 bg-[#64ffda] rounded-full text-[#0a192f] font-medium hover:bg-[#37e6dc] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              Contact me
            </a>
            <a href="/portfolio" className="px-6 py-3 bg-transparent border border-[#64ffda] rounded-full text-[#64ffda] font-medium hover:bg-[#64ffda] hover:text-[#0a192f] transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg">
              My technical stack
            </a>
          </div>

          <div className="mt-8 flex justify-center lg:justify-start gap-4">
            <a href="https://github.com/k-delphi" className="text-[#64ffda] hover:text-[#37e6dc] transition-colors duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path 
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                />
              </svg>
            </a>
            {/* <a href="https://www.linkedin.com/in/yourprofile" className="text-[#64ffda] hover:text-[#37e6dc] transition-colors duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path 
                  d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
                />
              </svg>
            </a>
            <a href="https://twitter.com/yourusername" className="text-[#64ffda] hover:text-[#37e6dc] transition-colors duration-300">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="24" 
                height="24" 
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path 
                  d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"
                />
              </svg>
            </a> */}
          </div>
        </div>

        {/* 右侧头像区域 */}
        <div className="flex-1 flex justify-center items-center mt-8 lg:mt-0">
          <div className="w-64 h-64 relative">
            <div className="absolute inset-0 rounded-full overflow-hidden">
              <img src="https://img2.baidu.com/it/u=398693015,1744340932&fm=253&fmt=auto&app=120&f=JPEG?w=475&h=356" alt="Avatar" className="w-full h-full object-cover" />
            </div>
            <div className="absolute inset-0 bg-[#64ffda] opacity-20 rounded-full"></div>
          </div>
        </div>
      </div>
    </div>
  );
}