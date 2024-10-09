import { EyeOpenIcon, FileIcon, TrashIcon } from '@radix-ui/react-icons';
import {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from '@radix-ui/react-tooltip';
import { Button } from '@shadcn/components/ui/button';

function ListView({
  files,
  searchTerm,
  outputDir,
  setPreviewFile,
  handleOpenFile,
  handleDeleteFile,
}: {
  files: string[];
  searchTerm: string;
  outputDir: string;
  setPreviewFile: (file: string) => void;
  handleOpenFile: (file: string) => void;
  handleDeleteFile: (file: string) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      {files
        .filter(
          (file) =>
            ['.png', '.jpg', '.jpeg'].some((ext) => file.endsWith(ext)) &&
            file.includes(searchTerm),
        )
        .map((file) => (
          <div
            key={file}
            className="flex flex-row justify-between gap-2 items-center text-md bg-gray-800 px-3 py-2 rounded-md"
          >
            <div className="flex justify-between items-center w-full">
              <pre className="text-gray-50 flex-grow">
                {(() => {
                  const parts = file.split(new RegExp(`(${searchTerm})`, 'gi'));
                  return (
                    <span>
                      {' '}
                      {parts.map((part, i) => (
                        <span
                          // eslint-disable-next-line react/no-array-index-key
                          key={i}
                          className={
                            part.toLowerCase() === searchTerm.toLowerCase()
                              ? 'font-extrabold'
                              : ''
                          }
                        >
                          {part}
                        </span>
                      ))}{' '}
                    </span>
                  );
                })()}
              </pre>
              <div className="flex gap-2">
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-gray-950"
                        onClick={() => setPreviewFile(file)}
                      >
                        <EyeOpenIcon className="text-white size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Preview</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-gray-950"
                        onClick={() => handleOpenFile(`${outputDir}/${file}`)}
                      >
                        <FileIcon className="text-white size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Open File</p>
                    </TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        className="bg-gray-950"
                        onClick={() => handleDeleteFile(`${outputDir}/${file}`)}
                      >
                        <TrashIcon className="text-white size-5" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="bottom">
                      <p>Delete File</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          </div>
        ))}
    </div>
  );
}

export default ListView;
