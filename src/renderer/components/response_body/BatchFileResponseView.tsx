import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible';
import {
  ChevronDownIcon,
  CopyIcon,
  OpenInNewWindowIcon,
} from '@radix-ui/react-icons';
import { BatchFileResponse, FileResponse } from 'src/shared/generated_models';
import { useFileIcons } from 'src/renderer/lib/hooks';
import { Button } from '@shadcn/button';
import PreviewFileResponse from '../PreviewFileResponse';
import LoadingScreen from '../LoadingScreen';

function BatchFileResponseView({
  batchFileResponse,
}: {
  batchFileResponse: BatchFileResponse;
}) {
  const { files: allFiles } = batchFileResponse;

  const {
    data: fileIcons,
    error: fileIconsError,
    isLoading: fileIconsIsLoading,
  } = useFileIcons(allFiles.map((file) => file.path));

  if (fileIconsIsLoading) return <LoadingScreen />;
  if (fileIconsError) return <div>Error loading file icons</div>;
  if (!fileIcons) return <div>No file icons available</div>;

  const filesByType: Record<string, FileResponse[]> = {
    img: allFiles.filter((file) => file.file_type === 'img'),
    csv: allFiles.filter((file) => file.file_type === 'csv'),
    json: allFiles.filter((file) => file.file_type === 'json'),
    text: allFiles.filter((file) => file.file_type === 'text'),
    audio: allFiles.filter((file) => file.file_type === 'audio'),
    video: allFiles.filter((file) => file.file_type === 'video'),
    markdown: allFiles.filter((file) => file.file_type === 'markdown'),
  };

  const typeToTitle: Record<string, string> = {
    img: 'Image Results',
    csv: 'CSV Results',
    json: 'JSON Results',
    text: 'Text Results',
    audio: 'Audio Results',
    video: 'Video Results',
    markdown: 'Markdown Results',
  };

  const handleCopy = async (filePath: string): Promise<void> => {
    await navigator.clipboard.writeText(filePath);
  };

  const handleOpen = async (filePath: string) => {
    await window.fileSystem.openPath({ path: filePath });
  };

  return (
    <div className="flex flex-col gap-1">
      {Object.entries(filesByType)
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        .filter(([type, files]) => files.length > 0)
        .map(([type, files]) => (
          <Collapsible>
            <CollapsibleTrigger className="font-semibold text-md flex justify-between w-full border rounded-lg hover:bg-slate-100 p-3">
              <span>{typeToTitle[type]}</span>
              <ChevronDownIcon className="size-4 xl:size-5" />
            </CollapsibleTrigger>
            <CollapsibleContent className="grid grid-cols-4 gap-2 my-2">
              {files.map((file) => (
                <div className="border rounded-md p-2 h-52 hover:bg-slate-200 flex flex-col">
                  <div className="flex flex-col items-center justify-center h-full">
                    <div className="h-24 w-24 flex items-center justify-center">
                      <img
                        src={
                          type === 'img'
                            ? `file://${file.path}`
                            : fileIcons[file.path]
                        }
                        alt=""
                        className={type === 'img' ? 'h-24 w-24' : 'h-12 w-12'}
                      />
                    </div>
                    <span className="mt-2 text-center break-words">
                      {file.path.split(/[/\\]/).pop()}
                    </span>
                  </div>
                  <div className="border-t px-2 pt-2 mx-3 flex justify-between">
                    <Button
                      type="button"
                      className="bg-transparent hover:bg-gray-300 shadow-none p-1"
                      onClick={() => handleOpen(file.path)}
                    >
                      <OpenInNewWindowIcon className="size-6 text-gray-800" />
                    </Button>
                    <Button
                      type="button"
                      className="bg-transparent hover:bg-gray-300 shadow-none p-1"
                      onClick={() => handleCopy(file.path)}
                    >
                      <CopyIcon className="size-6 text-gray-800" />
                    </Button>
                    <PreviewFileResponse response={file} />
                  </div>
                </div>
              ))}
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  );
}

export default BatchFileResponseView;
