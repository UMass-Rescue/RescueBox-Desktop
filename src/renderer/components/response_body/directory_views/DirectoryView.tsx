import { useDirFiles } from 'src/renderer/lib/hooks';
import { DirectoryResponse, InputSchema } from 'src/shared/generated_models';
import DataTable from '../DataTable';
import { fileColumns } from './DirectoryColumns';
import DirectoryField from '../../input_fields/DirectoryField';

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
    <div className="flex flex-col">
      <div>
        <h1 className="font-bold my-4 text-lg lg:text-xl">Directory</h1>
      </div>
      <div className="flex flex-col gap-2 text-md rounded-md">
        <DirectoryField
          disabled
          value={response.path}
          inputSchema={
            {
              key: response.title,
              inputType: 'directory',
              label: response.title,
              subtitle: response.subtitle || null,
            } satisfies InputSchema
          }
          onChange={() => {}}
        />
        <div className="text-sm text-gray-500 mt-1">
          Files in <b>{response.path}</b>
        </div>
        <DataTable columns={fileColumns} data={files} />
      </div>
    </div>
  );
}
