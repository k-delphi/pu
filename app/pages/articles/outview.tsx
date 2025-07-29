
import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "~/components/ui/card";
import FirstText from "./article/first-text";
import twoText from "./article/two-text";

interface Article {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  Component: React.FC;
  tags?: string[];
}

const articles: Article[] = [
  {
    id: "first-text",
    title: "我的第一篇文章",
    description: "这是我的第一篇文章的简介",
    imageUrl: "https://img1.baidu.com/it/u=1673000011,316051295&fm=253&fmt=auto&app=138&f=PNG?w=800&h=500",
    Component: FirstText,
    tags: ["GO", "后端开发"],
  },
];

export default function ArticleCards() {
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const selectedArticle = articles.find(a => a.id === selectedArticleId);
  
  function ArticleImage({ src, alt, fallbackSvg }: { src: string; alt: string; fallbackSvg: string }) {
    const [error, setError] = useState(false);
  
    if (error) {
      return (
        <div className="w-full h-40 rounded-t-xl overflow-hidden">
          <div dangerouslySetInnerHTML={{ __html: fallbackSvg }} className="w-full h-full" />
        </div>
      );
    }
  
    return <img src={src} alt={alt} onError={() => setError(true)} className="w-full h-40 object-cover rounded-t-xl" />;
  }
  
  // SVG 备用图像 - 调整为适应卡片大小
  const fallbackSvg = `<?xml version="1.0" encoding="UTF-8"?>
  <svg width="100%" height="100%" viewBox="0 0 800 400" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet">
    <rect width="800" height="400" fill="#1a1a1a" />
    <g>
      <rect x="0" y="0" width="800" height="400" fill="#333" />
      <line x1="100" y1="0" x2="100" y2="400" stroke="#555" stroke-width="2" />
      <line x1="300" y1="0" x2="300" y2="400" stroke="#555" stroke-width="2" />
      <line x1="500" y1="0" x2="500" y2="400" stroke="#555" stroke-width="2" />
      <line x1="700" y1="0" x2="700" y2="400" stroke="#555" stroke-width="2" />
    </g>
    <g>
      <path d="M400,100 C400,100 450,200 400,300" stroke="#666" stroke-width="2" fill="none" />
      <circle cx="400" cy="150" r="50" stroke="#666" stroke-width="2" fill="none" />
    </g>
    <text x="350" y="200" font-size="40" fill="#fff" font-family="Arial, sans-serif">MOSTIMA</text>
  </svg>`;

  return (
    <div className="p-6">
      {selectedArticle ? (
        <div className="relative">
          <button
            className="absolute top-4 right-4 px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
            onClick={() => setSelectedArticleId(null)}
          >
            返回
          </button>
          <selectedArticle.Component />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {articles.map(article => (
            <Card
              key={article.id}
              className="cursor-pointer relative"
              onClick={() => setSelectedArticleId(article.id)}
            >
              <ArticleImage src={article.imageUrl} alt={article.title} fallbackSvg={fallbackSvg} />
              <CardHeader>
                <CardTitle>{article.title}</CardTitle>
                <CardDescription>{article.description}</CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                {article.tags && article.tags.length > 0 && (
                  <div className="absolute bottom-4 right-4 flex flex-wrap gap-2">
                    {article.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-xs font-medium bg-[#0a192f] text-[#64ffda] border border-[#64ffda] rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}