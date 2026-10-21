import { type Config } from "@react-router/dev/config";

export default {
  ssr: false, // 👈 关键：禁用运行时服务端渲染，生成静态 SPA
  basename: "/pu/", // 👈 如果你的仓库名是 my-blog，必须设置
} satisfies Config;
