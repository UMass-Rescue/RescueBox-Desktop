import { useReadFile } from 'src/renderer/lib/hooks';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import LoadingScreen from '../../LoadingScreen';

export default function JSONPreview({ filePath }: { filePath: string }) {
  const {
    data: fileContents,
    error: fileContentsError,
    isLoading: fileContentsIsLoading,
  } = useReadFile(filePath);

  if (fileContentsIsLoading) return <LoadingScreen />;
  if (fileContentsError)
    return (
      <div>Error loading file contents: {fileContentsError.toString()}</div>
    );
  if (!fileContents) return <div>File contents not found</div>;

  return (
    <div className="px-1">
      <div className="border border-gray-300 rounded-lg p-4 bg-[#f8f8f8]">
        <div className="overflow-auto max-h-96 px-2">
          <SyntaxHighlighter style={github} language="json">
            {fileContents}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
}
