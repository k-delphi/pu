// components/MarkdownViewer.tsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github-dark.css';

interface MarkdownViewerProps {
  content: string;
  className?: string;
}

export default function MarkdownViewer({ content, className = '' }: MarkdownViewerProps) {
  return (
    <div className={`prose max-w-none ${className}`}>
      <style>{`
        .prose {
          color: white; /* 设置文本颜色 */
        }
        .prose h1, .prose h2, .prose h3, .prose h4, .prose h5, .prose h6 {
          font-weight: bold;
          margin-top: 1.5em;
          margin-bottom: 1em;
        }
        .prose h1 {
          font-size: 2em;
          border-bottom: 1px solid #eaecef;
          padding-bottom: 0.3em;
        }
        .prose h2 {
          font-size: 1.5em;
          border-bottom: 1px solid #eaecef;
          padding-bottom: 0.3em;
        }
        .prose h3 {
          font-size: 1.25em;
        }
        .prose h4 {
          font-size: 1em;
        }
        .prose h5 {
          font-size: 0.875em;
        }
        .prose h6 {
          font-size: 0.85em;
          color: #6a737d;
        }
        .prose blockquote {
          margin: 0;
          padding: 0 1em;
          border-left: 0.25em solid #4a90e2;
          color: #bbb;
          background-color: #1a1a1a;
          padding: 10px 20px;
          margin-bottom: 16px;
        }
        .prose blockquote p {
          margin: 0;
        }
        .prose sup {
          font-size: 0.8em;
          vertical-align: super;
          color: #4a90e2; /* 添加颜色使上标更明显 */
        }
        .prose ul {
          list-style-type: disc;
          margin-top: 1em;
          margin-bottom: 1em;
          padding-left: 1.5em;
        }
        .prose ul li {
          margin-top: 0.5em;
          margin-bottom: 0.5em;
        }
        /* 添加对上标链接的特殊处理 */
        .prose a[href^="#fn-"], 
        .prose a[href^="#fnref-"] {
          text-decoration: none;
          color: #4a90e2;
        }
        .prose .footnotes {
          margin-top: 2em;
          padding-top: 1em;
          border-top: 1px solid #444;
        }
        .prose .footnotes ol {
          padding-left: 1.5em;
        }
        .prose .footnotes li {
          margin-bottom: 0.5em;
        }
        .prose .data-footnote-backref {
          text-decoration: none;
        }
      `}</style>
      <ReactMarkdown 
        children={content} 
        rehypePlugins={[[rehypeHighlight, { ignoreMissing: true }]]}
        components={{
          code({node, inline, className, children, ...props}: any) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <pre className="code-block">
                <code
                  className={className}
                  {...props}
                >
                  {children}
                </code>
              </pre>
            ) : (
              <code className={className} {...props}>
                {children}
              </code>
            );
          },
          // 添加对sup标签的显式支持
          sup({node, children, ...props}) {
            return <sup {...props}>{children}</sup>;
          },
          // 添加对脚注的特殊处理
          a({node, children, href, ...props}) {
            // 处理脚注链接
            if (href && (href.startsWith('#fn-') || href.startsWith('#fnref-'))) {
              return (
                <a href={href} className="footnote-ref" {...props}>
                  {children}
                </a>
              );
            }
            return <a href={href} {...props}>{children}</a>;
          }
        }}
      />
    </div>
  );
}