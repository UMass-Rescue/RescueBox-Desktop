import { useDirFiles } from 'src/renderer/lib/hooks';
import { DirectoryResponse } from 'src/shared/generated_models';

export default function DirectoryView({
  response,
}: {
  response: DirectoryResponse;
}) {
  const {
    data: files,
    error: filesError,
    isLoading: filesIsLoading,
  } = useDirFiles(response.path);

  // Handle error cases
  if (filesIsLoading) return <div>loading files..</div>;
  if (filesError)
    return <div>failed to load files. Error: {filesError.toString()}</div>;
  if (!files) return <div>no files</div>;

  return (
    <div className="flex flex-col gap-4">
      <div>
        <h1 className="font-bold my-4 text-lg lg:text-xl">{response.title}</h1>
        {response.subtitle && <p className="text-sm">{response.subtitle}</p>}
      </div>
      <div className="flex flex-col gap-2 text-md bg-gray-900 text-gray-50 p-5 rounded-md max-h-96 overflow-y-scroll">
        {files.length > 0 ? (
          <pre>{files.join('\n')}</pre>
        ) : (
          <pre>No files found</pre>
        )}
      </div>
    </div>
  );
}
