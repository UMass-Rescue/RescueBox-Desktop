import {
  Collapsible,
  CollapsibleTrigger,
  CollapsibleContent,
} from '@radix-ui/react-collapsible';
import {
  ChevronDownIcon,
  CopyIcon,
  MagnifyingGlassIcon,
  OpenInNewWindowIcon,
} from '@radix-ui/react-icons';
import { BatchFileResponse } from 'src/shared/generated_models';
import { useFileIcons } from 'src/renderer/lib/hooks';
import { Button } from '@shadcn/button';
import { Input } from '@shadcn/input';
import { useState } from 'react';
import { partitionFilesByType } from 'src/renderer/lib/utils';
import PreviewFileResponse from '../PreviewFileResponse';
import LoadingScreen from '../LoadingScreen';

function BatchFileResponseView({
  batchFileResponse,
}: {
  batchFileResponse: BatchFileResponse;
}) {
  const { files: allFiles } = batchFileResponse;
  const [searchTerms, setSearchTerms] = useState<Record<string, string>>({
    img: '',
    csv: '',
    json: '',
    text: '',
    audio: '',
    video: '',
    markdown: '',
  });

  const {
    data: fileIcons,
    error: fileIconsError,
    isLoading: fileIconsIsLoading,
  } = useFileIcons(allFiles.map((file) => file.path));

  if (fileIconsIsLoading) return <LoadingScreen />;
  if (fileIconsError) return <div>Error loading file icons</div>;
  if (!fileIcons) return <div>No file icons available</div>;

  const filesByType = partitionFilesByType(allFiles, searchTerms);

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
        .filter(
          ([type, files]) => files.length > 0 || searchTerms[type].length > 0,
        )
        .map(([type, files]) => (
          <Collapsible key={type}>
            <CollapsibleTrigger className="font-semibold text-md flex justify-between w-full border rounded-lg hover:bg-slate-100 p-3">
              <span className="flex-grow text-left self-center">
                {typeToTitle[type]}
              </span>
              <Input
                type="text"
                key={type}
                onChange={(e) => {
                  setSearchTerms({ ...searchTerms, [type]: e.target.value });
                }}
                placeholder="Search..."
                className="border border-gray-300 rounded-lg mx-3 w-1/2 hidden"
                onClick={(e) => e.stopPropagation()}
              />
              <Button
                type="button"
                className="bg-transparent hover:bg-gray-300 shadow-none p-1 py-0"
                onClick={(e) => {
                  e.stopPropagation();
                  const input = e.currentTarget.previousElementSibling;
                  if (input) {
                    input.classList.toggle('hidden');
                  }
                }}
              >
                <MagnifyingGlassIcon className="size-5 text-gray-800 -mt-1" />
              </Button>
              <ChevronDownIcon className="size-5 ml-2 mt-1" />
            </CollapsibleTrigger>
            <CollapsibleContent className="grid grid-cols-4 gap-2 mt-2">
              {files.length > 0 ? (
                files.map((file) => (
                  <div className="border rounded-md p-2 h-52 hover:bg-slate-200 mb-1 flex flex-col">
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
                ))
              ) : (
                <div className="col-span-4 flex items-center justify-center h-52 mb-1">
                  <span>No Matches.</span>
                </div>
              )}
            </CollapsibleContent>
          </Collapsible>
        ))}
    </div>
  );
}

export default BatchFileResponseView;
