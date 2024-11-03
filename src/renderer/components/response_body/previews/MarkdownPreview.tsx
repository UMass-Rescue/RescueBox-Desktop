import Markdown from 'react-markdown';
import rehypeExternalLinks from 'rehype-external-links';
import remarkGfm from 'remark-gfm';
import { useReadFile } from 'src/renderer/lib/hooks';
import LoadingScreen from '../../LoadingScreen';

export default function MarkdownPreview({ filePath }: { filePath: string }) {
  const {
    data: fileContents,
    error: fileContentsError,
    isLoading: fileContentsIsLoading,
  } = useReadFile(filePath);

  if (fileContentsIsLoading) {
    return <LoadingScreen />;
  }
  if (fileContentsError) {
    return <div>Error: {fileContentsError.message}</div>;
  }
  if (!fileContents) {
    return <div>File not found {filePath}</div>;
  }

  return (
    <div className="px-1">
      <div className="prose max-w-full markdown border border-gray-300 rounded-lg p-4 bg-white">
        <div className="overflow-auto max-h-96 px-2">
          <Markdown
            rehypePlugins={[[rehypeExternalLinks, { target: '_blank' }]]}
            className="text-black"
            remarkPlugins={[remarkGfm]}
          >
            {fileContents}
          </Markdown>
        </div>
      </div>
    </div>
  );
}
