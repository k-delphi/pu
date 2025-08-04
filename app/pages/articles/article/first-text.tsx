// pages/articles/article/first-text.tsx
import ReactMarkdown from 'react-markdown';
import MarkdownViewer from '~/components/ui/markdownView';
import readmeContent from '../md/container.md?raw';

export default function FirstText() {
  return <MarkdownViewer content={readmeContent} />;
}