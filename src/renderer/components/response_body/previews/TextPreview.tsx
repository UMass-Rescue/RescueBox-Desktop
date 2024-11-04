import { useReadFile } from 'src/renderer/lib/hooks';
import LoadingScreen from '../../LoadingScreen';

export default function TextPreview({ filePath }: { filePath: string }) {
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
    <div className="max-w-full border border-gray-300 rounded-lg p-4 bg-white">
      <div className="overflow-auto max-h-96 px-2 whitespace-pre-wrap">
        {fileContents}
      </div>
    </div>
  );
}
